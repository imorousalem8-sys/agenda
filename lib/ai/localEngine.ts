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

  // 1. GREETING / CHAT
  const isGreeting =
    /^(bonjour|salut|hello|coucou|bonsoir|hey|hi|yo)[\s!.,?]*$/i.test(text) ||
    textLower === "ça va ?" ||
    textLower === "comment vas tu" ||
    textLower === "comment ça va";

  if (isGreeting) {
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

  const isThanksOrBye =
    /^(merci|super|parfait|merci beaucoup|génial|au revoir|bonne journée|à plus)[\s!.,?]*$/i.test(textLower);

  if (isThanksOrBye) {
    const reply = textLower.includes("au revoir") || textLower.includes("bonne journée")
      ? `Bonne journée à vous ! N'hésitez pas si vous avez besoin de quoi que ce soit.`
      : `Avec plaisir ! Je reste à votre disposition.`;
    return { reply, spokenReply: reply, action: null, executed: true };
  }

  // 2. QUERY TODAY / WEEK
  const isQuery =
    (textLower.includes("aujourd'hui") && (textLower.includes("prévu") || textLower.includes("planning") || textLower.includes("programme") || textLower.includes("agenda") || textLower.includes("quoi"))) ||
    textLower.includes("mes tâches") ||
    textLower.includes("mon planning") ||
    textLower.includes("fais le point") ||
    textLower.includes("mes rendez-vous") ||
    textLower.includes("mes rdv") ||
    textLower.includes("cette semaine");

  if (isQuery) {
    const actionResult = await executeAITool("list_today_events", {}, context);
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

  // 7. EXPLICIT SCHEDULING
  const isExplicitScheduling =
    textLower.startsWith("mets") || textLower.startsWith("ajoute") || textLower.startsWith("crée") ||
    textLower.startsWith("programme") || textLower.startsWith("planifie") || textLower.startsWith("bloque") ||
    textLower.startsWith("rappelle-moi") || textLower.startsWith("rappelle moi") ||
    textLower.includes("rendez-vous") || textLower.includes("rdv");

  if (!isExplicitScheduling) {
    const reply = "Je suis à votre écoute. Vous pouvez me dicter un rendez-vous, une tâche, me demander d'organiser votre journée ou consulter votre planning.";
    return { reply, spokenReply: reply, action: null, executed: true };
  }

  // Check if clarification needed when time is vague (Rule 4: Zero hallucination)
  const hasTimeKeyword = /(\d{1,2})[h:H](\d{2})?/i.test(text) || textLower.includes("ce soir") || textLower.includes("ce midi") || textLower.includes("dans ");
  if (!hasTimeKeyword && (textLower.startsWith("rappelle-moi") || textLower.startsWith("rappelle moi") || textLower.includes("mets un rdv demain") || textLower.includes("demain matin"))) {
    return { reply: `À quelle heure précise souhaitez-vous programmer cette activité ? (Par exemple : *« À 14h30 »* ou *« À 8h »*)`, spokenReply: "À quelle heure précise ?", action: null, executed: true };
  }

  // Extract Time & Date
  const timeMatch = text.match(/(?:à|vers|pour)?\s*(\d{1,2})[h:H](\d{2})?/i);
  let hours = now.getHours();
  let minutes = now.getMinutes() + 15;
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

  if (hasExplicitTime && timeMatch) {
    targetDate = setMinutes(setHours(targetDate, hours), minutes);
    if (targetDate < now && !dayMentioned) targetDate = addDays(targetDate, 1);
  } else if (!hasExplicitTime && !dayMentioned) {
    targetDate = now.getHours() >= 20 ? setMinutes(setHours(addDays(now, 1), 9), 0) : addHours(now, 1);
  }

  const contactMatch = text.match(/(?:avec|chez|pour|de la part de|dr|docteur|m\.|mr|mme)\s+([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)?)/i);
  let contactName = contactMatch ? contactMatch[1].trim() : undefined;
  if (contactName && ["Demain", "Aujourd", "Midi", "Soir", "Moi", "Lui", "Cette", "Une", "Un", "Le", "La"].includes(contactName)) {
    contactName = undefined;
  }

  const isEvent = textLower.includes("rdv") || textLower.includes("rendez-vous") || textLower.includes("réunion") || textLower.includes("docteur") || textLower.includes("dentiste") || textLower.includes("chantier");
  const isTask = !isEvent && (textLower.includes("tâche") || textLower.includes("faire") || textLower.includes("acheter") || textLower.includes("payer") || textLower.includes("finir"));

  let cleanTitle = text
    .replace(/^(?:bonjour|salut|hey|dis|peux[-\s]tu|s'il te plaît|stp)?\s*/i, "")
    .replace(/^(?:je veux que tu|je voudrais|il faut que|j'aimerais|merci de|n'oublie pas de|ajoute[-\s]moi|mets[-\s]moi|crée[-\s]moi|programme[-\s]moi)\s*/i, "")
    .replace(/^(?:la tâche|le rdv|le rendez-vous|le rappel|une tâche|un rdv|un rendez-vous|un rappel)\s*/i, "")
    .replace(/(?:à|vers|pour)?\s*\d{1,2}[h:H]\d{0,2}/gi, "")
    .replace(/\b(demain|après-demain|apres demain|ce soir|aujourd'hui|ce midi|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/gi, "")
    .replace(/\bdans \d+ (?:min|minutes|h|heure|heures)\b/gi, "")
    .replace(/(?:urgent|très important|important|prioritaire)/gi, "")
    .trim();

  if (!cleanTitle || cleanTitle.length < 3 || cleanTitle.toLowerCase() === "rendez-vous" || cleanTitle.toLowerCase() === "rdv") {
    return { reply: `Précisez le motif du rendez-vous (ex: *« Rdv dentiste »*).`, spokenReply: "Précisez le motif.", action: null, executed: true };
  }
  cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

  const isUrgent = textLower.includes("urgent") || textLower.includes("important") || textLower.includes("prioritaire");
  const priority = isUrgent ? "URGENT" : "NORMAL";

  let actionResult: AIActionExecutionResult;
  let reply = "";

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
    reply, spokenReply: reply.replace(/\*\*/g, "").replace(/[📅✅🔔]/g, ""), action: actionResult,
    activeTarget: { type: actionResult.type as "EVENT" | "TASK" | "REMINDER", id: actionResult.id || "", title: actionResult.title, scheduledAt: actionResult.dateTime },
    saved: true, executed: true,
  };
}
