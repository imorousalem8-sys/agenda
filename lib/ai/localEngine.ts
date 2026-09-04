import { AIUserContext, AIEngineResponse, AIChatMessage, AIActionExecutionResult } from "./types";
import { executeAITool } from "./tools";
import { addDays, addHours, setHours, setMinutes, formatISO } from "date-fns";

/**
 * Local Contextual Intelligence Engine (0 API Keys, 0 Cost, High Precision Fallback)
 */
export async function executeLocalContextualAgent(
  userMessage: string,
  _history: AIChatMessage[],
  context: AIUserContext
): Promise<AIEngineResponse> {
  const text = userMessage.trim();
  const textLower = text.toLowerCase();
  const now = new Date();

  // 1. GREETING / CHAT / CONVERSATION / EMPATHY / QUESTIONS
  const isGreeting =
    /^(bonjour|salut|hello|coucou|cc|bonsoir|hey|hi|yo)[\s!.,?/]*$/i.test(text) ||
    textLower.includes("ça va") ||
    textLower.includes("comment vas-tu") ||
    textLower.includes("comment vas tu") ||
    textLower.includes("comment tu vas") ||
    textLower.includes("comment allez-vous") ||
    textLower.includes("comment allez vous") ||
    textLower.includes("fatigué") ||
    textLower.includes("crevé") ||
    textLower.includes("épuisé") ||
    textLower.includes("en train de travailler") ||
    textLower.includes("je travaille");

  if (isGreeting) {
    if (textLower.includes("fatigué") || textLower.includes("crevé") || textLower.includes("épuisé")) {
      const reply = "Prenez soin de vous et accordez-vous une pause si nécessaire. Je reste à votre écoute si vous souhaitez ajuster votre planning ou déléguer des rappels.";
      return { reply, spokenReply: reply, action: null, executed: true };
    }
    if (textLower.includes("travaille") || textLower.includes("en train de travailler")) {
      const reply = "Bon courage pour votre travail ! Je reste en veille pour noter vos tâches ou rendez-vous dès que vous en aurez besoin.";
      return { reply, spokenReply: reply, action: null, executed: true };
    }

    const name = context.userName ? ` ${context.userName.split(" ")[0]}` : "";
    const todayEvents = context.eventsSummary.filter((e) => {
      const d = new Date(e.startAt);
      return d.toDateString() === now.toDateString();
    });
    const taskCount = context.tasksSummary.length;

    let greeting = `Bonjour${name} ! `;
    if (todayEvents.length > 0) {
      greeting += `Tu as **${todayEvents.length} rendez-vous** aujourd'hui. `;
      if (todayEvents[0]) greeting += `Le prochain : **${todayEvents[0].title}** à ${todayEvents[0].startFormatted}. `;
    } else {
      greeting += "Ta journée est libre côté rendez-vous. ";
    }
    if (taskCount > 0) {
      greeting += `Tu as **${taskCount} tâche(s)** en cours.`;
    }
    greeting += "\n\nQue puis-je faire pour toi ?";

    return {
      reply: greeting,
      spokenReply: greeting.replace(/\*\*/g, ""),
      action: null,
      executed: true,
    };
  }

  // 1.05 CAPABILITIES & SYSTEM HELP
  const isHelpOrCapabilities =
    textLower.includes("qui es-tu") ||
    textLower.includes("qui es tu") ||
    textLower.includes("que peux-tu faire") ||
    textLower.includes("que sais-tu faire") ||
    textLower.includes("comment ça marche") ||
    textLower.includes("comment ca marche") ||
    textLower.includes("comment tu fonctionnes") ||
    textLower.includes("aide") ||
    textLower.includes("help") ||
    textLower.includes("fonctionnalité");

  if (isHelpOrCapabilities) {
    const reply = `Je suis votre **Copilote & Agence d'Action d'AlarmAgenda**.\n\nVoici ce que je peux accomplir pour vous en temps réel :\n• **Planifier vos rendez-vous** (ex: *« Rendez-vous dentiste mardi à 15h »*)\n• **Créer vos tâches & priorités** (ex: *« Tâche urgente acheter fournitures »*)\n• **Programmer des alarmes & rappels vocaux** (ex: *« Réveille-moi demain à 7h »*)\n• **Organiser votre journée** (ex: *« Organise ma journée de demain »*)\n• **Consulter votre planning** (ex: *« Qu'ai-je de prévu demain ? »*)\n\nVous pouvez me donner vos instructions par écrit ou me parler directement via le micro ou le Mode Vocal Live.`;
    return {
      reply,
      spokenReply: "Je suis votre copilote personnel d'AlarmAgenda. Je gère vos rendez-vous, tâches, alarmes et plannings par simple consigne textuelle ou vocale.",
      action: null,
      executed: true,
    };
  }

  const isThanksOrBye =
    /^(merci|super|parfait|merci beaucoup|génial|au revoir|bonne journée|à plus)[\s!.,?]*$/i.test(textLower);

  if (isThanksOrBye) {
    const reply = textLower.includes("au revoir") || textLower.includes("bonne journée")
      ? `Bonne journée à vous ! N'hésitez pas si vous avez besoin de quoi que ce soit.`
      : `Avec plaisir ! Je reste à votre disposition.`;
    return { reply, spokenReply: reply, action: null, executed: true };
  }

  // 1.1 AMBIGUOUS REQUESTS (Zero action, ask clarification)
  const isAmbiguous =
    textLower.includes("fais le truc") ||
    textLower.includes("le truc de") ||
    textLower.includes("fais quelque chose") ||
    textLower.includes("occupe-toi de mes trucs") ||
    textLower.includes("gère le machin");

  if (isAmbiguous) {
    const reply = "Bien sûr, je veux bien vous aider ! Pouvez-vous préciser ce que vous souhaitez faire (consulter l'agenda, créer un rappel ou enregistrer une tâche) ?";
    return { reply, spokenReply: reply, action: null, executed: true };
  }

  // 2. QUERY TODAY / TOMORROW / WEEK (Information Only)
  const isActionIntent =
    textLower.includes("ajoute") || textLower.includes("crée") || textLower.includes("creer") ||
    textLower.includes("programme") || textLower.includes("planifie") || textLower.includes("bloque") ||
    textLower.includes("mets") || textLower.includes("rappelle") || textLower.includes("réveille") ||
    textLower.includes("reveille") || textLower.includes("alarme") || textLower.includes("note ");

  const isTomorrowQuery =
    !isActionIntent &&
    textLower.includes("demain") &&
    (textLower.includes("quoi") || textLower.includes("qu'est-ce") || textLower.includes("programme") || textLower.includes("planning") || textLower.includes("prévu") || textLower.includes("rdv") || textLower.includes("rendez-vous"));

  const isQuery =
    !isActionIntent &&
    (isTomorrowQuery ||
      (textLower.includes("aujourd'hui") && (textLower.includes("prévu") || textLower.includes("planning") || textLower.includes("programme") || textLower.includes("agenda") || textLower.includes("quoi"))) ||
      textLower.includes("mes tâches") ||
      textLower.includes("mon planning") ||
      textLower.includes("fais le point") ||
      textLower.includes("mes rendez-vous") ||
      textLower.includes("mes rdv") ||
      textLower.includes("cette semaine") ||
      textLower.startsWith("consulte") ||
      textLower.startsWith("affiche") ||
      textLower.startsWith("liste"));

  if (isQuery) {
    const actionResult = isTomorrowQuery 
      ? await executeAITool("search_events", { dateFrom: formatISO(addDays(now, 1)), dateTo: formatISO(addDays(now, 1)) }, context)
      : await executeAITool("list_today_events", {}, context);
    return {
      reply: actionResult.notes || "Rien de prévu.",
      spokenReply: (actionResult.notes || "").replace(/[*•📅✅🔔⚠️]/g, "").replace(/\n+/g, " "),
      action: actionResult,
      executed: true,
    };
  }

  // 3. ORGANIZE DAY
  if (textLower.includes("organise") && (textLower.includes("journée") || textLower.includes("planning") || textLower.includes("demain"))) {
    const actionResult = await executeAITool("organize_day", {}, context);
    return {
      reply: actionResult.notes || "Planning organisé.",
      spokenReply: (actionResult.notes || "").replace(/[*•📅✅🔔⚠️]/g, "").replace(/\n+/g, " "),
      action: actionResult,
      executed: true,
    };
  }

  // 4. RESCHEDULING
  const isRescheduling =
    textLower.includes("décale") ||
    textLower.includes("repousse") ||
    textLower.includes("avance") ||
    textLower.includes("change l'heure");

  if (isRescheduling) {
    const timeMatch = text.match(/(\d{1,2})[h:H](\d{2})?/i);
    if (timeMatch && (context.activeTarget || context.eventsSummary.length > 0)) {
      const hours = parseInt(timeMatch[1], 10);
      const minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
      let targetDate = new Date(now);
      targetDate = setMinutes(setHours(targetDate, hours), minutes);
      if (targetDate < now) targetDate = addDays(targetDate, 1);

      const targetId = context.activeTarget?.id || context.eventsSummary[0].id;
      const targetTitle = context.activeTarget?.title || context.eventsSummary[0].title;

      const action = await executeAITool("update_event", { eventId: targetId, newStartAt: formatISO(targetDate) }, context);
      const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      const reply = `C'est fait ! J'ai décalé « **${targetTitle}** » à **${timeFormatted}**. Le rappel a été synchronisé.`;

      return {
        reply, spokenReply: reply.replace(/\*\*/g, ""), action,
        activeTarget: { type: "EVENT", id: targetId, title: targetTitle, scheduledAt: formatISO(targetDate) },
        saved: true, executed: true,
      };
    } else if (!timeMatch) {
      return { reply: `À quelle heure souhaitez-vous décaler ce rendez-vous ?`, spokenReply: "À quelle heure ?", action: null, executed: true };
    }
  }

  // 5. DELETION
  const isDeletion = textLower.includes("supprime") || textLower.includes("annule") || textLower.includes("efface");
  if (isDeletion && (context.activeTarget || context.eventsSummary.length > 0)) {
    const targetId = context.activeTarget?.id || context.eventsSummary[0].id;
    const targetTitle = context.activeTarget?.title || context.eventsSummary[0].title;

    return {
      reply: `Voulez-vous vraiment supprimer « **${targetTitle}** » ? Répondez *« Oui supprime »* ou *« Non »*.`,
      spokenReply: `Voulez-vous vraiment supprimer ${targetTitle} ?`,
      action: { id: targetId, type: "DELETE_CONFIRM", title: targetTitle, requiresConfirmation: true, level: 2, confirmationPayload: { action: "DELETE_EVENT", targetId, targetTitle } },
      executed: true,
    };
  }

  // 6. COMPLETE TASK
  if ((textLower.includes("terminé") || textLower.includes("fini") || textLower.includes("fait")) && context.tasksSummary.length > 0) {
    const action = await executeAITool("complete_task", {}, context);
    return { reply: action.title, spokenReply: action.title, action, saved: true, executed: true };
  }

  // 7. EXPLICIT SCHEDULING & ALARMS / TASKS
  const isExplicitScheduling =
    textLower.includes("mets") || textLower.includes("ajoute") || textLower.includes("crée") || textLower.includes("creer") ||
    textLower.includes("programme") || textLower.includes("planifie") || textLower.includes("bloque") ||
    textLower.includes("rappelle-moi") || textLower.includes("rappelle moi") || textLower.includes("rappel") ||
    textLower.includes("réveille") || textLower.includes("reveille") || textLower.includes("réveil") || textLower.includes("reveil") ||
    textLower.includes("alarme") || textLower.includes("sonne") || textLower.includes("tâche") || textLower.includes("tache") ||
    textLower.includes("rendez-vous") || textLower.includes("rdv") || textLower.includes("note ");

  if (!isExplicitScheduling) {
    const reply = "Je suis à votre écoute. Vous pouvez me dicter un rendez-vous, une tâche, une alarme réveil ou me demander de consulter votre planning.";
    return { reply, spokenReply: reply, action: null, executed: true };
  }

  // Detect Wake-up / Alarm intent
  const isWakeUp =
    textLower.includes("réveil") || textLower.includes("reveil") ||
    textLower.includes("réveille") || textLower.includes("reveille") ||
    textLower.includes("alarme") || textLower.includes("sonne");

  // Check if clarification needed when time is vague (Rule: Zero hallucination, but smart default for wake-up if not specified)
  const hasTimeKeyword = /(\d{1,2})[h:H](\d{2})?/i.test(text) || textLower.includes("ce soir") || textLower.includes("ce midi") || textLower.includes("dans ");
  if (!hasTimeKeyword && !isWakeUp && (textLower.includes("rappelle-moi") || textLower.includes("mets un rdv demain") || textLower.includes("demain matin"))) {
    return { reply: `À quelle heure précise souhaitez-vous programmer cette activité ? (Par exemple : *« À 14h30 »* ou *« À 8h »*)`, spokenReply: "À quelle heure précise ?", action: null, executed: true };
  }

  // Extract Time & Date
  const timeMatch = text.match(/(?:à|vers|pour)?\s*(\d{1,2})[h:H](\d{2})?/i);
  let hours = isWakeUp ? 7 : now.getHours();
  let minutes = 0;
  let hasExplicitTime = false;

  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    hasExplicitTime = true;
  }

  let targetDate = new Date(now);
  let dayMentioned = false;

  if (textLower.includes("après-demain") || textLower.includes("apres demain")) {
    targetDate = addDays(now, 2); dayMentioned = true;
  } else if (textLower.includes("demain")) {
    targetDate = addDays(now, 1); dayMentioned = true;
  } else if (textLower.includes("ce soir")) {
    hours = hours < 18 ? 19 : hours; minutes = 0; hasExplicitTime = true; dayMentioned = true;
  } else {
    const relMin = textLower.match(/dans\s+(\d+)\s*(?:min|minute|minutes)/);
    const relHour = textLower.match(/dans\s+(\d+)\s*(?:h|heure|heures)/);
    if (relMin) { targetDate = new Date(now.getTime() + parseInt(relMin[1], 10) * 60 * 1000); hasExplicitTime = true; dayMentioned = true; }
    else if (relHour) { targetDate = addHours(now, parseInt(relHour[1], 10)); hasExplicitTime = true; dayMentioned = true; }
    else {
      const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
      for (let i = 0; i < days.length; i++) {
        if (textLower.includes(days[i])) {
          let diff = i - now.getDay();
          if (diff <= 0) diff += 7;
          targetDate = addDays(now, diff);
          dayMentioned = true;
          break;
        }
      }
    }
  }

  if (hasExplicitTime || isWakeUp) {
    targetDate = setMinutes(setHours(targetDate, hours), minutes);
    if (targetDate < now && !dayMentioned) targetDate = addDays(targetDate, 1);
  } else if (!hasExplicitTime && !dayMentioned) {
    targetDate = now.getHours() >= 20 ? setMinutes(setHours(addDays(now, 1), 9), 0) : addHours(now, 1);
  }

  const contactMatch = text.match(/(?:avec|de la part de|m\.|mr|mme)\s+([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)?)/i);
  let contactName = contactMatch ? contactMatch[1].trim() : undefined;
  if (contactName) {
    const ignoredContacts = ["demain", "aujourd'hui", "ce soir", "midi", "moi", "lui", "cette", "une", "un", "le", "la", "mon", "ma", "alarme", "reveil", "réveil", "tache", "tâche", "rendez-vous", "rdv"];
    if (ignoredContacts.includes(contactName.toLowerCase())) {
      contactName = undefined;
    }
  }

  // If no action intent and no explicit date/time, provide polite guidance rather than creating a random reminder
  if (!isActionIntent && !hasExplicitTime && !dayMentioned && !isWakeUp) {
    const reply = "Je suis à votre écoute ! Que souhaitez-vous planifier ou organiser ? Vous pouvez par exemple me demander d'ajouter un rendez-vous, une tâche urgente, un réveil ou de résumer votre journée.";
    return {
      reply,
      spokenReply: "Je suis à votre écoute. Que souhaitez-vous planifier ou organiser ?",
      action: null,
      executed: true,
    };
  }

  const isEvent = textLower.includes("rdv") || textLower.includes("rendez-vous") || textLower.includes("réunion") || textLower.includes("docteur") || textLower.includes("dentiste") || textLower.includes("chantier");
  const isTask = !isEvent && (isWakeUp || textLower.includes("tâche") || textLower.includes("tache") || textLower.includes("faire") || textLower.includes("acheter") || textLower.includes("payer") || textLower.includes("finir"));

  let cleanTitle = text
    .replace(/^(?:bonjour|salut|hey|dis|peux[-\s]tu|s'il te plaît|stp)?\s*/i, "")
    .replace(/^(?:moi\s+)?(?:je\s+)?(?:veux\s+que\s+tu\s+|voudrais\s+|aimerais\s+|peux[-\s]tu\s+|merci\s+de\s+|n'oublie\s+pas\s+de\s+|ajoute[-\s]moi\s+|mets[-\s]moi\s+|crée[-\s]moi\s+|programme[-\s]moi\s+)?/i, "")
    .replace(/^(?:un\s+|une\s+|le\s+|la\s+|les\s+|mon\s+|ma\s+|mes\s+)?(?:rendez-vous|rdv|tâche|tache|rappel|alarme|réveil|reveil)(?:\s+qui\s+va\s+me\s+réveiller|\s+pour\s+me\s+réveiller|\s+pour|\s+de|\s+d')?\s+/i, "")
    .replace(/(?:à|vers|pour)?\s*\d{1,2}[h:H]\d{0,2}/gi, "")
    .replace(/\b(demain|après-demain|apres demain|ce soir|aujourd'hui|ce midi|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/gi, "")
    .replace(/\bdans\s+\d+\s*(?:min|minutes|h|heure|heures)\b/gi, "")
    .replace(/\b(urgent|très important|important|prioritaire)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();

  if (isWakeUp && (!cleanTitle || cleanTitle.length < 3 || cleanTitle.toLowerCase().includes("réveill") || cleanTitle.toLowerCase().includes("reveill") || cleanTitle.toLowerCase() === "alarme")) {
    cleanTitle = "Réveil & Début de journée";
  } else if (!cleanTitle || cleanTitle.length < 2 || cleanTitle.toLowerCase() === "rendez-vous" || cleanTitle.toLowerCase() === "rdv") {
    cleanTitle = isEvent ? "Rendez-vous" : "Tâche programmée";
  }

  cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

  const isUrgent = textLower.includes("urgent") || textLower.includes("important") || textLower.includes("prioritaire");
  const priority = isUrgent ? "URGENT" : "NORMAL";

  let actionResult: AIActionExecutionResult;
  let reply = "";

  try {
    if (isEvent) {
      actionResult = await executeAITool("create_event", { title: cleanTitle, startAt: formatISO(targetDate), contactName, priority, reminderMinutesBefore: 15 }, context);
      const dateFormatted = targetDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      reply = `📅 Rendez-vous « **${cleanTitle}** » planifié pour le **${dateFormatted} à ${timeFormatted}**${contactName ? ` avec **${contactName}**` : ""}.`;
    } else if (isTask) {
      actionResult = await executeAITool("create_task", { title: cleanTitle, dueAt: formatISO(targetDate), contactName, priority, reminderAt: formatISO(targetDate) }, context);
      const dateFormatted = targetDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      reply = `✅ Tâche « **${cleanTitle}** » créée pour le **${dateFormatted} à ${timeFormatted}**${contactName ? ` avec **${contactName}**` : ""}.`;
    } else {
      actionResult = await executeAITool("create_reminder", { title: cleanTitle, fireAt: formatISO(targetDate) }, context);
      const dateFormatted = targetDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      reply = `🔔 Rappel « **${cleanTitle}** » programmé pour le **${dateFormatted} à ${timeFormatted}**.`;
    }

    return {
      reply,
      spokenReply: reply.replace(/\*\*/g, "").replace(/[📅✅🔔]/g, ""),
      action: actionResult,
      activeTarget: { type: actionResult.type as "EVENT" | "TASK" | "REMINDER", id: actionResult.id || "", title: actionResult.title, scheduledAt: actionResult.dateTime },
      saved: true,
      executed: true,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      reply: `Je n'ai pas pu enregistrer cette entrée (${errorMsg}). Pouvez-vous préciser l'heure ou la date ?`,
      spokenReply: "Je n'ai pas pu enregistrer cette entrée. Pouvez-vous préciser l'horaire ?",
      action: null,
      executed: false,
    };
  }
}
