import { AIUserContext, AIEngineResponse, AIChatMessage, AIActionExecutionResult } from "./types";
import { buildUserAIContext } from "./context";
import { executeAITool, AI_TOOL_DEFINITIONS } from "./tools";
import { addDays, addHours, setHours, setMinutes, formatISO } from "date-fns";

export async function processUserAIMessage(
  userId: string,
  userMessage: string,
  conversationHistory: AIChatMessage[] = [],
  activeTarget?: AIUserContext["activeTarget"]
): Promise<AIEngineResponse> {
  const context = await buildUserAIContext(userId);
  if (activeTarget) {
    context.activeTarget = activeTarget;
  }

  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  // 1. If Gemini API key is configured, use Gemini 1.5/2.0 Flash with native Function Calling
  if (geminiApiKey) {
    try {
      return await executeGeminiAgent(geminiApiKey, userMessage, conversationHistory, context);
    } catch (err) {
      console.warn("Gemini agent call failed, falling back to local contextual engine:", err);
    }
  }

  // 2. Local Contextual Intelligence Engine (0 API Keys, 0 Cost, High Precision)
  return await executeLocalContextualAgent(userMessage, conversationHistory, context);
}

/**
 * GEMINI AGENT (Tool Calling & Deep Contextual Reasoning)
 */
async function executeGeminiAgent(
  apiKey: string,
  userMessage: string,
  conversationHistory: AIChatMessage[],
  context: AIUserContext
): Promise<AIEngineResponse> {
  const systemPrompt = `Tu es l'Agent IA & Copilote Personnel d'Agenda (AlarmAgenda).
Tu es DIRECTEMENT intégré à l'application. Tu as accès aux données réelles de l'utilisateur.

CONTEXTE ACTUEL :
- Date et Heure actuelle : ${context.currentDateFormatted} (ISO: ${context.currentTime})
- Fuseau horaire : ${context.timezone}
- Mode actif : ${context.mode === "PROFESSIONAL" ? "Professionnel / Chantiers" : "Personnel / Vie Privée"}
- Utilisateur : ${context.userName || "Utilisateur"}
${
  context.activeTarget
    ? `- DERNIER OBJET MANIPULÉ (pour résoudre 'le', 'la', 'ce rendez-vous') : ${context.activeTarget.type} id=${context.activeTarget.id} titre="${context.activeTarget.title}" heure="${context.activeTarget.scheduledAt || ""}"`
    : ""
}

AGENDA DE L'UTILISATEUR (Prochains 7 jours) :
${
  context.eventsSummary.length > 0
    ? context.eventsSummary
        .map((e) => `• [${e.id}] ${e.startFormatted} : "${e.title}" ${e.location ? `(Lieu: ${e.location})` : ""} ${e.contactName ? `(Contact: ${e.contactName})` : ""}`)
        .join("\n")
    : "Aucun rendez-vous sur les 7 prochains jours."
}

TÂCHES ACTIVES :
${
  context.tasksSummary.length > 0
    ? context.tasksSummary
        .map((t) => `• [${t.id}] "${t.title}" ${t.dueFormatted ? `(Échéance: ${t.dueFormatted})` : ""} ${t.priority === "URGENT" ? "⚠️ Urgent" : ""}`)
        .join("\n")
    : "Aucune tâche en attente."
}

RAPPELS ACTIFS :
${
  context.remindersSummary.length > 0
    ? context.remindersSummary.map((r) => `• "${r.title}" prévu pour ${r.fireFormatted} (${r.method})`).join("\n")
    : "Aucun rappel en attente."
}

RÈGLES D'INTELLIGENCE ET DE CONVERSATION :
1. DISTINGUER LA SIMPLE CONVERSATION DES ACTIONS RÉELLES :
   - Si l'utilisateur discute simplement, te salue ("Bonjour", "Ça va ?"), te pose une question générale, te remercie ou te demande un conseil, RÉPONDS CONVERSATIONNELLEMENT ET POLIMENT SANS CRÉER DE RENDEZ-VOUS OU DE TÂCHE INUTILE.
   - N'utilise les outils de création/modification (create_event, create_task, create_reminder, update_event, delete_event) QUE si l'utilisateur exprime UNE VOLONTÉ EXPLICITE d'ajouter, programmer, modifier, décaler ou supprimer une activité.
2. CLARIFICATION OBLIGATOIRE :
   - Si l'utilisateur demande une planification mais qu'une information essentielle manque (ex: "Rappelle-moi demain" sans heure), DEMANDE-LUI POLIMENT : "À quelle heure souhaitez-vous que je programme ce rappel demain ?". Ne devine pas une heure au hasard.
3. RÉSOLUTION DES ANAPHORES :
   - Résous les pronoms ("décale-le à 16h", "rappelle-moi 2h avant", "supprime-le") en te basant sur le dernier objet en contexte.
4. VÉRACITÉ ABSOLUE :
   - Ne JAMAIS inventer un rendez-vous qui n'existe pas dans la liste ci-dessus.
5. HUMOUR, ESPRIT & DIVERTISSEMENT :
   - Si l'utilisateur demande une blague, une vanne, ou de l'humour, sois VRAIMENT drôle, fin et percutant !
   - Varie les thèmes : l'absurdité du quotidien, les astronautes dans l'espace, les animaux malins, les références de cinéma cultes, le monde du travail. Ne raconte jamais des blagues éculées ou répétitives, sois créatif, vif et surprenant !
6. STYLE :
   - Réponds en français naturel, précis, chaleureux, complice et professionnel.`;

  const toolsDeclaration = [
    {
      function_declarations: AI_TOOL_DEFINITIONS.map((tool) => ({
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
      })),
    },
  ];

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const contents = [
    {
      role: "user",
      parts: [{ text: systemPrompt }],
    },
    ...conversationHistory.slice(-6).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage }],
    },
  ];

  const payload = {
    contents,
    tools: toolsDeclaration,
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 600,
    },
  };

  const targetModels = ["gemini-3.6-flash", "gemini-3.7-flash", "gemini-flash-latest", "gemini-3.5-flash"];
  let response: Response | null = null;
  let lastError = "";

  for (const model of targetModels) {
    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) break;
      lastError = await response.text();
    } catch (e: any) {
      lastError = e.message;
    }
  }

  if (!response || !response.ok) {
    console.warn("Gemini API call failed across target models:", lastError);
    throw new Error(`Gemini API failed: ${lastError}`);
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const functionCalls = candidate?.content?.parts?.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) => p.functionCall
  );

  let actionResult: AIActionExecutionResult | null = null;
  let textResponse = "";

  if (functionCalls && functionCalls.length > 0) {
    const call = functionCalls[0].functionCall;
    actionResult = await executeAITool(call.name, call.args, context);
  }

  const textPart = candidate?.content?.parts?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) => p.text
  );
  textResponse = textPart?.text || "";

  if (!textResponse && actionResult) {
    if (actionResult.type === "EVENT") {
      textResponse = `Parfait ! J'ai enregistré votre rendez-vous « **${actionResult.title}** » avec rappel programmé.`;
    } else if (actionResult.type === "TASK") {
      textResponse = `C'est noté ! La tâche « **${actionResult.title}** » a été créée et ajoutée à vos priorités.`;
    } else if (actionResult.type === "REMINDER") {
      textResponse = `Entendu ! J'ai programmé votre rappel « **${actionResult.title}** ».`;
    } else if (actionResult.type === "DELETE_CONFIRM") {
      textResponse = `Êtes-vous certain de vouloir supprimer le rendez-vous « **${actionResult.title}** » ?`;
    }
  }

  const newActiveTarget = actionResult
    ? {
        type: actionResult.type as "EVENT" | "TASK" | "REMINDER",
        id: actionResult.id || "",
        title: actionResult.title,
        scheduledAt: actionResult.dateTime,
      }
    : context.activeTarget;

  return {
    reply: textResponse || "Je suis à votre écoute.",
    spokenReply: textResponse.replace(/\*\*/g, ""),
    action: actionResult,
    activeTarget: newActiveTarget,
    saved: !!actionResult,
    executed: !!actionResult,
  };
}

/**
 * LOCAL CONTEXTUAL AGENT (Discriminated Intent Engine)
 */
async function executeLocalContextualAgent(
  userMessage: string,
  _history: AIChatMessage[],
  context: AIUserContext
): Promise<AIEngineResponse> {
  const text = userMessage.trim();
  const textLower = text.toLowerCase();
  const now = new Date();

  // =========================================================================
  // 1. INTENT: SIMPLE GREETING / CHAT / COURTESY (NO DATABASE MODIFICATION)
  // =========================================================================
  const isGreeting =
    /^(bonjour|salut|hello|coucou|bonsoir|hey|hi|yo)[\s!.,?]*$/i.test(text) ||
    textLower === "ça va ?" ||
    textLower === "comment vas tu" ||
    textLower === "comment ça va" ||
    textLower === "comment tu vas";

  if (isGreeting) {
    const greetingReplies = [
      `Bonjour ! Je vais très bien, merci. Comment puis-je vous aider aujourd'hui ? Vous pouvez me demander le point sur votre planning ou me dicter une tâche.`,
      `Bonjour ! Ravi de vous retrouver. Que prévoyez-vous aujourd'hui ?`,
      `Salut ! Tout est prêt. Avez-vous des rendez-vous ou des tâches à organiser ?`,
    ];
    const reply = greetingReplies[Math.floor(Math.random() * greetingReplies.length)];
    return {
      reply,
      spokenReply: reply,
      action: null,
      executed: true,
    };
  }

  const isThanksOrBye =
    /^(merci|super|parfait|merci beaucoup|génial|au revoir|bonne journée|à plus)[\s!.,?]*$/i.test(textLower);

  if (isThanksOrBye) {
    const reply = textLower.includes("au revoir") || textLower.includes("bonne journée")
      ? `Bonne journée à vous ! N'hésitez pas si vous avez besoin de quoi que ce soit d'autre.`
      : `Avec grand plaisir ! Je reste à votre disposition si vous souhaitez ajouter ou modifier une activité.`;
    return {
      reply,
      spokenReply: reply,
      action: null,
      executed: true,
    };
  }

  const isQuestionAboutCapabilities =
    textLower.includes("qui es-tu") ||
    textLower.includes("tu sais faire quoi") ||
    textLower.includes("que peux-tu faire") ||
    textLower.includes("aide-moi") ||
    textLower.includes("comment ça marche");

  if (isQuestionAboutCapabilities) {
    const reply = `Je suis votre assistant d'agenda et copilote IA personnel.\n\nVoici ce que je peux faire pour vous :\n• **Consulter votre planning** : *« Qu'est-ce que j'ai aujourd'hui ? »*, *« Fais le point sur ma semaine »*\n• **Planifier un rendez-vous** : *« Mets un rdv avec Moussa vendredi à 10h »*\n• **Ajouter une tâche** : *« Ajoute la tâche acheter les raccords demain matin »*\n• **Décaler un horaire** : *« Décale-le à 16h »*\n• **Programmer un rappel vocal** : *« Rappelle-moi dans 30 minutes d'appeler le médecin »*`;
    return {
      reply,
      spokenReply: "Je suis votre copilote d'agenda. Je peux planifier vos rendez-vous, ajouter vos tâches, décaler vos horaires et déclencher vos rappels vocaux. Que souhaitez-vous faire ?",
      action: null,
      executed: true,
    };
  }

  // =========================================================================
  // 2. INTENT: AGENDA / TASK QUERY
  // =========================================================================
  const isQuery =
    (textLower.includes("aujourd'hui") && (textLower.includes("prévu") || textLower.includes("planning") || textLower.includes("programme") || textLower.includes("agenda") || textLower.includes("quoi"))) ||
    textLower.includes("mes tâches") ||
    textLower.includes("mon planning") ||
    textLower.includes("fais le point") ||
    textLower.includes("mes rendez-vous") ||
    textLower.includes("mes rdv") ||
    textLower.includes("cette semaine") ||
    textLower.includes("suis-je libre") ||
    textLower.includes("créneaux libres");

  if (isQuery) {
    let reply = `Voici le point sur votre planning :\n\n`;

    if (context.eventsSummary.length > 0) {
      reply += `📅 **Rendez-vous à venir (${context.eventsSummary.length})** :\n`;
      context.eventsSummary.forEach((e) => {
        reply += `• **${e.startFormatted}** : ${e.title} ${e.location ? `(📍 ${e.location})` : ""} ${e.contactName ? `(👤 ${e.contactName})` : ""}\n`;
      });
      reply += "\n";
    } else {
      reply += `📅 Aucun rendez-vous prévu pour les prochains jours.\n\n`;
    }

    if (context.tasksSummary.length > 0) {
      reply += `✅ **Tâches en cours (${context.tasksSummary.length})** :\n`;
      context.tasksSummary.slice(0, 5).forEach((t) => {
        reply += `• ${t.title} ${t.priority === "URGENT" ? "⚠️ Urgent" : ""}\n`;
      });
    } else {
      reply += `✅ Aucune tâche en attente, vous êtes à jour !\n`;
    }

    return {
      reply,
      spokenReply: reply.replace(/[*•📍👤✅📅⚠️]/g, "").replace(/\n+/g, " "),
      action: null,
      executed: true,
    };
  }

  // =========================================================================
  // 3. INTENT: RESCHEDULING / PRONOUN UPDATE ("décale-le à 16h", "repousse à 15h")
  // =========================================================================
  const isRescheduling =
    textLower.includes("décale") ||
    textLower.includes("repousse") ||
    textLower.includes("avance") ||
    textLower.includes("change l'heure") ||
    textLower.includes("modifie l'heure");

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

      const action = await executeAITool(
        "update_event",
        {
          eventId: targetId,
          newStartAt: formatISO(targetDate),
        },
        context
      );

      const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      const reply = `C'est fait ! J'ai décalé votre rendez-vous « **${targetTitle}** » à **${timeFormatted}**. Le rappel vocal persistant a été synchronisé à cette nouvelle heure.`;

      return {
        reply,
        spokenReply: reply.replace(/\*\*/g, ""),
        action,
        activeTarget: { type: "EVENT", id: targetId, title: targetTitle, scheduledAt: formatISO(targetDate) },
        saved: true,
        executed: true,
      };
    } else if (!timeMatch) {
      return {
        reply: `À quelle heure souhaitez-vous décaler ce rendez-vous ? (Exemple : *« À 16h30 »*)`,
        spokenReply: "À quelle heure souhaitez-vous décaler ce rendez-vous ?",
        action: null,
        executed: true,
      };
    }
  }

  // =========================================================================
  // 4. INTENT: DELETION ("supprime mon rendez-vous", "annule la tâche")
  // =========================================================================
  const isDeletion =
    textLower.includes("supprime") ||
    textLower.includes("annule") ||
    textLower.includes("efface") ||
    textLower.includes("retire le rendez-vous");

  if (isDeletion && (context.activeTarget || context.eventsSummary.length > 0)) {
    const targetId = context.activeTarget?.id || context.eventsSummary[0].id;
    const targetTitle = context.activeTarget?.title || context.eventsSummary[0].title;

    return {
      reply: `Voulez-vous vraiment supprimer le rendez-vous « **${targetTitle}** » ? Répondez *« Oui supprime »* ou *« Non »*.`,
      spokenReply: `Voulez-vous vraiment supprimer le rendez-vous ${targetTitle} ?`,
      action: {
        id: targetId,
        type: "DELETE_CONFIRM",
        title: targetTitle,
        requiresConfirmation: true,
        confirmationPayload: {
          action: "DELETE_EVENT",
          targetId,
          targetTitle,
        },
      },
      executed: true,
    };
  }

  // Natural questions asking if the AI can take an appointment / task / reminder
  if (
    textLower.includes("peux-tu me prendre") ||
    textLower.includes("peux tu me prendre") ||
    textLower.includes("tu peux me prendre") ||
    textLower.includes("peux-tu m'enregistrer") ||
    textLower.includes("tu peux m'enregistrer") ||
    textLower.includes("tu peux enregistrer") ||
    textLower.includes("je veux un rdv") ||
    textLower.includes("je veux un rendez-vous") ||
    textLower.includes("prendre un rendez-vous") ||
    textLower.includes("prendre un rdv") ||
    textLower === "tu peux me prendre un rdv" ||
    textLower === "tu peux me prendre un rendez vous" ||
    textLower === "tu peux me prendre un rendez-vous"
  ) {
    const reply = "Oui, avec plaisir ! Quel est le motif ou sujet de ce rendez-vous, et pour quel jour et quelle heure souhaitez-vous que je le programme ?";
    return {
      reply,
      spokenReply: reply,
      action: null,
      executed: true,
    };
  }

  if (
    textLower.includes("tu peux me créer une tâche") ||
    textLower.includes("peux-tu ajouter une tâche") ||
    textLower.includes("créer une tâche") ||
    textLower.includes("ajouter une tâche")
  ) {
    const reply = "Bien sûr ! Quel est l'intitulé de la tâche et quelle est sa date d'échéance ?";
    return {
      reply,
      spokenReply: reply,
      action: null,
      executed: true,
    };
  }

  if (
    textLower.includes("tu peux me rappeler") ||
    textLower.includes("peux-tu me rappeler")
  ) {
    const reply = "Absolument ! Que souhaitez-vous que je vous rappelle et à quel moment précis ?";
    return {
      reply,
      spokenReply: reply,
      action: null,
      executed: true,
    };
  }

  const isExplicitScheduling =
    textLower.startsWith("mets") ||
    textLower.startsWith("ajoute") ||
    textLower.startsWith("crée") ||
    textLower.startsWith("creer") ||
    textLower.startsWith("programme") ||
    textLower.startsWith("planifie") ||
    textLower.startsWith("bloque") ||
    textLower.startsWith("rappelle-moi") ||
    textLower.startsWith("rappelle moi") ||
    textLower.includes("nouveau rdv") ||
    textLower.includes("nouveau rendez-vous") ||
    textLower.includes("nouvelle tâche") ||
    textLower.includes("nouvelle tache") ||
    textLower.includes("nouveau rappel") ||
    textLower.includes("rendez-vous avec") ||
    textLower.includes("rdv avec") ||
    textLower.includes("rendez-vous demain") ||
    textLower.includes("rdv demain") ||
    textLower.includes("rendez-vous à") ||
    textLower.includes("rdv à");

  // If the user did NOT express an explicit action intent, treat as conversational reply!
  if (!isExplicitScheduling) {
    const reply = "Je suis à votre écoute ! Souhaitez-vous planifier un rendez-vous, ajouter une tâche ou consulter votre planning du jour ?";
    return {
      reply,
      spokenReply: reply,
      action: null,
      executed: true,
    };
  }

  // Check if a time is missing when user asks "rappelle-moi demain"
  const hasTimeKeyword = /(\d{1,2})[h:H](\d{2})?/i.test(text) || textLower.includes("ce soir") || textLower.includes("ce midi") || textLower.includes("dans ");
  if (!hasTimeKeyword && (textLower.startsWith("rappelle-moi") || textLower.startsWith("rappelle moi") || textLower.includes("mets un rdv demain"))) {
    return {
      reply: `À quelle heure souhaitez-vous être rappelé pour cette activité ? (Par exemple : *« Demain à 14h »* ou *« Dans 30 minutes »*).`,
      spokenReply: "À quelle heure souhaitez-vous être rappelé pour cette activité ?",
      action: null,
      executed: true,
    };
  }

  // Extract Time
  const timeMatch = text.match(/(?:à|vers|pour)?\s*(\d{1,2})[h:H](\d{2})?/i);
  let hours = now.getHours();
  let minutes = now.getMinutes() + 15;
  let hasExplicitTime = false;

  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = timeMatch[2] ? parseInt(timeMatch[2], 10) : 0;
    hasExplicitTime = true;
  }

  // Extract Date
  let targetDate = new Date(now);
  let dayMentioned = false;

  if (textLower.includes("après-demain") || textLower.includes("apres demain")) {
    targetDate = addDays(now, 2);
    dayMentioned = true;
  } else if (textLower.includes("demain")) {
    targetDate = addDays(now, 1);
    dayMentioned = true;
  } else if (textLower.includes("ce soir")) {
    hours = hours < 18 ? 19 : hours;
    minutes = 0;
    hasExplicitTime = true;
    dayMentioned = true;
  } else {
    const relMin = textLower.match(/dans\s+(\d+)\s*(?:min|minute|minutes)/);
    const relHour = textLower.match(/dans\s+(\d+)\s*(?:h|heure|heures)/);

    if (relMin) {
      targetDate = new Date(now.getTime() + parseInt(relMin[1], 10) * 60 * 1000);
      hasExplicitTime = true;
      dayMentioned = true;
    } else if (relHour) {
      targetDate = addHours(now, parseInt(relHour[1], 10));
      hasExplicitTime = true;
      dayMentioned = true;
    } else {
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

  // Extract Contact
  const contactMatch = text.match(/(?:avec|chez|pour|de la part de|dr|docteur|m\.|mr|mme)\s+([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+)?)/i);
  let contactName = contactMatch ? contactMatch[1].trim() : undefined;
  if (contactName && ["Demain", "Aujourd", "Midi", "Soir", "Moi", "Lui", "Cette", "Une", "Un", "Le", "La"].includes(contactName)) {
    contactName = undefined;
  }

  // Type identification
  const isEvent = textLower.includes("rdv") || textLower.includes("rendez-vous") || textLower.includes("réunion") || textLower.includes("docteur") || textLower.includes("dentiste") || textLower.includes("chantier");
  const isTask = !isEvent && (textLower.includes("tâche") || textLower.includes("faire") || textLower.includes("acheter") || textLower.includes("payer") || textLower.includes("finir") || textLower.includes("prendre"));

  // Clean title
  let cleanTitle = text
    .replace(/^(?:bonjour|salut|hey|dis|peux[- ]tu|s'il te plaît|stp)?\s*/i, "")
    .replace(/^(?:je veux que tu|je voudrais|il faut que|j'aimerais|merci de|n'oublie pas de|ajoute[- ]moi|mets[- ]moi|crée[- ]moi|programme[- ]moi)\s*/i, "")
    .replace(/^(?:la tâche|le rdv|le rendez-vous|le rappel|une tâche|un rdv|un rendez-vous|un rappel)\s*/i, "")
    .replace(/(?:à|vers|pour)?\s*\d{1,2}[h:H]\d{0,2}/gi, "")
    .replace(/\b(demain|après-demain|apres demain|ce soir|aujourd'hui|ce midi|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche)\b/gi, "")
    .replace(/\bdans \d+ (?:min|minutes|h|heure|heures)\b/gi, "")
    .replace(/(?:urgent|très important|important|prioritaire)/gi, "")
    .trim();

  if (!cleanTitle || cleanTitle.length < 3 || cleanTitle.toLowerCase() === "rendez-vous" || cleanTitle.toLowerCase() === "rdv" || cleanTitle.toLowerCase() === "une activité" || cleanTitle.toLowerCase() === "activité") {
    return {
      reply: `Pour enregistrer ce rendez-vous, veuillez préciser son **motif ou son objet** (par exemple : *« Rendez-vous signature devis avec Marc »* ou *« Consultation médecin »*).`,
      spokenReply: "Pour enregistrer ce rendez-vous, veuillez préciser son motif ou son objet.",
      action: null,
      executed: true,
    };
  }
  cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);

  const isUrgent = textLower.includes("urgent") || textLower.includes("important") || textLower.includes("prioritaire");
  const priority = isUrgent ? "URGENT" : "NORMAL";

  let actionResult: AIActionExecutionResult;
  let reply = "";

  if (isEvent) {
    actionResult = await executeAITool(
      "create_event",
      {
        title: cleanTitle,
        startAt: formatISO(targetDate),
        contactName,
        priority,
        reminderMinutesBefore: 15,
      },
      context
    );
    const dateFormatted = targetDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    reply = `Parfait ! J'ai planifié votre rendez-vous « **${cleanTitle}** » pour le **${dateFormatted} à ${timeFormatted}**${contactName ? ` avec **${contactName}**` : ""}. Un rappel vocal a été programmé 15 minutes avant.`;
  } else if (isTask) {
    actionResult = await executeAITool(
      "create_task",
      {
        title: cleanTitle,
        dueAt: formatISO(targetDate),
        contactName,
        priority,
        reminderAt: formatISO(targetDate),
      },
      context
    );
    const dateFormatted = targetDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    reply = `C'est noté ! J'ai créé votre tâche « **${cleanTitle}** » prévue pour le **${dateFormatted} à ${timeFormatted}**${contactName ? ` avec **${contactName}**` : ""}. Le rappel vocal sonnera à l'heure exacte.`;
  } else {
    actionResult = await executeAITool(
      "create_reminder",
      {
        title: cleanTitle,
        fireAt: formatISO(targetDate),
      },
      context
    );
    const dateFormatted = targetDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const timeFormatted = targetDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    reply = `Entendu ! J'ai programmé votre rappel « **${cleanTitle}** » pour le **${dateFormatted} à ${timeFormatted}**.`;
  }

  return {
    reply,
    spokenReply: reply.replace(/\*\*/g, ""),
    action: actionResult,
    activeTarget: {
      type: actionResult.type as "EVENT" | "TASK" | "REMINDER",
      id: actionResult.id || "",
      title: actionResult.title,
      scheduledAt: actionResult.dateTime,
    },
    saved: true,
    executed: true,
  };
}
