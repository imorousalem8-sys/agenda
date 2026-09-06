import { AIEngineResponse } from "./types";

export type DetectedIntentType =
  | "GREETING_CASUAL"
  | "COURTESY_THANKS"
  | "SECURITY_PROBE"
  | "CODE_REQUEST"
  | "GENERAL_QUERY_WEATHER"
  | "MISSING_TIME_CLARIFICATION"
  | "MULTI_TASK"
  | "CALENDAR_VIEW"
  | "REMINDER_VIEW"
  | "TASK_VIEW"
  | "CREATE_EVENT"
  | "CREATE_REMINDER"
  | "CREATE_TASK"
  | "CANCEL_ACTION"
  | "RESCHEDULE_ACTION"
  | "COMPLETE_ACTION"
  | "COMPLEX_OR_LLM";

export interface IntentRouteResult {
  intent: DetectedIntentType;
  isFastRoute: boolean;
  fastResponse?: AIEngineResponse;
  extractedParameters?: Record<string, unknown>;
  subTasks?: Array<{
    type: "CREATE_EVENT" | "CREATE_REMINDER" | "CREATE_TASK" | "CANCEL" | "RESCHEDULE";
    rawText: string;
  }>;
}

const GREETING_RESPONSES = [
  "Bonjour 😄 Je suis prête à mettre un peu d'ordre dans votre journée. Que planifions-nous aujourd'hui ?",
  "Bonjour ! Ravi de vous retrouver. Un rendez-vous à caler ou un rappel à programmer ?",
  "Salut ! Votre agenda est sous contrôle. Que puis-je organiser pour vous aujourd'hui ?",
  "Bonjour ! Je suis à vos côtés pour organiser votre temps. Par quoi commençons-nous ?",
];

const THANKS_RESPONSES = [
  "Avec grand plaisir ! C'est un jeu d'enfant pour moi. N'hésitez pas si vous avez d'autres tâches à caler. 😄",
  "Je vous en prie ! Votre agenda reste toujours parfaitement synchronisé.",
  "À votre service ! N'hésitez pas si vous avez besoin d'ajuster vos créneaux.",
  "C'est un plaisir de vous aider ! Passez une excellente journée.",
];

export function routeUserIntent(
  userMessage: string,
  userName?: string
): IntentRouteResult {
  const normalized = userMessage.trim().toLowerCase();

  // 1. Détection des sondes de sécurité ou demandes de contournement (Exigence 14 & 26)
  const securityBypassPatterns = [
    /contourner.*authentification/i,
    /bypass.*auth/i,
    /bypass.*security/i,
    /cl[eé].*api.*priv[eé]e/i,
    /donne.*moi.*(secret|token|password|mot de passe|service_role)/i,
    /inject.*sql/i,
    /drop.*table/i,
    /hack/i,
    /faille.*s[eé]curit[eé]/i,
  ];

  if (securityBypassPatterns.some((pattern) => pattern.test(normalized))) {
    return {
      intent: "SECURITY_PROBE",
      isFastRoute: true,
      fastResponse: {
        reply: "🛡️ En tant qu'Agence IA d'Alamajonda, la sécurité et la confidentialité absolue de vos données et de vos identifiants sont strictement protégées. Je ne peux pas communiquer d'informations confidentielles ou contourner les protocoles d'authentification du système.",
        spokenReply: "Pour des raisons de sécurité, cette opération confidentielle ne peut pas être effectuée.",
        action: null,
        executed: false,
      },
    };
  }

  // 2. Refus de génération de code informatique (Exigence 11 & persona agenda)
  const codePatterns = [
    /^(fournis|donne|cr[eé]e|g[eé]n[eé]re|fais|code|écris).*(code|html|css|javascript|typescript|python|fonction sql|balise)/i,
    /comment coder/i,
    /peux-tu coder/i,
  ];
  if (codePatterns.some((pattern) => pattern.test(normalized))) {
    return {
      intent: "CODE_REQUEST",
      isFastRoute: true,
      fastResponse: {
        reply: "Mon domaine d'expertise est la gestion personnalisée de votre temps : planification de vos rendez-vous, rappels vocaux intelligents, suivi de tâches et organisation d'agenda. Je ne génère pas de code informatique, mais je gère votre temps avec une précision chirurgicale ! ⏱️",
        spokenReply: "Je suis spécialisée dans l'organisation de votre agenda, la gestion de vos rendez-vous et vos rappels vocaux.",
        action: null,
        executed: false,
      },
    };
  }

  // 3. Salutations simples / Conversation informelle (Exigence 1 & 27)
  const greetingExacts = [
    "bonjour", "salut", "coucou", "hello", "bonsoir", "yo", "hey",
    "bonjour !", "salut !", "coucou !", "hello !", "bonsoir !",
    "qui es-tu", "qui es tu", "qui es tu ?", "qui es-tu ?", "tu es qui",
    "présente-toi", "comment tu t'appelles", "quel est ton nom",
    "comment vas-tu", "comment vas tu", "ça va", "ca va", "comment tu vas", "quoi de neuf",
  ];

  if (greetingExacts.includes(normalized) || /^bonjour\b|^salut\b|^coucou\b|^hello\b/.test(normalized) && normalized.length < 15) {
    const greeting = GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
    const personalized = userName ? greeting.replace("Bonjour", `Bonjour ${userName}`) : greeting;
    return {
      intent: "GREETING_CASUAL",
      isFastRoute: true,
      fastResponse: {
        reply: personalized,
        spokenReply: personalized.replace(/[😄⏱️🛡️]/g, ""),
        action: null,
        executed: false,
      },
    };
  }

  // 4. Remerciements / Clôture
  const thanksExacts = [
    "merci", "merci beaucoup", "merci !", "merci bien", "super merci",
    "de rien", "parfait merci", "au revoir", "bonne journée", "bonne soirée",
    "a plus", "à plus", "a bientôt", "à bientôt"
  ];
  if (thanksExacts.includes(normalized) || (/^merci\b/.test(normalized) && normalized.length < 20)) {
    const thanks = THANKS_RESPONSES[Math.floor(Math.random() * THANKS_RESPONSES.length)];
    return {
      intent: "COURTESY_THANKS",
      isFastRoute: true,
      fastResponse: {
        reply: thanks,
        spokenReply: thanks.replace(/[😄⏱️🛡️]/g, ""),
        action: null,
        executed: false,
      },
    };
  }

  // 5. Question générale Météo (Exigence 26 - Test 3)
  if (/m[eé]t[eé]o|quel temps fait/i.test(normalized) && !/rendez-vous|rappel|t[aâ]che/i.test(normalized)) {
    return {
      intent: "GENERAL_QUERY_WEATHER",
      isFastRoute: true,
      fastResponse: {
        reply: "🌤️ Je n'ai pas de capteur météo en direct connecté à votre région, mais je peux vous assurer qu'il fait toujours un temps idéal pour organiser efficacement votre journée et honorer vos rendez-vous !",
        spokenReply: "Je n'ai pas accès à la météo locale en direct, mais votre agenda reste parfaitement synchronisé.",
        action: null,
        executed: false,
      },
    };
  }

  // 6. Détection des demandes de rendez-vous SANS date ni heure (Exigence 22 - Clarification)
  const appointmentMissingTimePatterns = [
    /^(prends|planifie|fixe|cr[eé]e|ajoute|mets|programme).*(rendez-vous|rdv|un rdv).*(avec|pour|chez)\s+([a-zà-ÿ0-9_\-\s]+)$/i,
    /^(prends|planifie|fixe|cr[eé]e|ajoute|mets|programme)\s+(mon|le)\s+(rendez-vous|rdv)\s+(avec|pour|chez)\s+([a-zà-ÿ0-9_\-\s]+)$/i,
  ];

  const hasTimeIndicator = /\b(\d{1,2}h|\d{1,2}:\d{2}|demain|aujourd'hui|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|matin|apr[eè]s-midi|soir|dans \d+)/i.test(normalized);

  for (const pat of appointmentMissingTimePatterns) {
    const match = normalized.match(pat);
    if (match && !hasTimeIndicator) {
      const contactOrTarget = match[match.length - 1].trim();
      return {
        intent: "MISSING_TIME_CLARIFICATION",
        isFastRoute: true,
        fastResponse: {
          reply: `Avec plaisir ! Pour quel jour et à quelle heure souhaitez-vous planifier ce rendez-vous avec **${contactOrTarget}** ?`,
          spokenReply: `Pour quel jour et à quelle heure souhaitez-vous planifier ce rendez-vous avec ${contactOrTarget} ?`,
          action: null,
          executed: false,
        },
      };
    }
  }

  // 7. Détection Multi-Tâches (Exigence 4 & 5)
  // Ex: "Prends rendez-vous avec Paul demain à 14h, rappelle-moi à 18h d’acheter les pièces et vendredi rappelle-moi d’appeler Jean."
  const subTaskSegments = splitMultiTaskSegments(userMessage);
  if (subTaskSegments.length >= 2) {
    return {
      intent: "MULTI_TASK",
      isFastRoute: false,
      subTasks: subTaskSegments,
    };
  }

  // 8. Actions unitaires directes
  if (/^annule|^supprime|^efface/i.test(normalized)) {
    return { intent: "CANCEL_ACTION", isFastRoute: false };
  }
  if (/^d[eé]cale|^reporte|^avance|^change/i.test(normalized)) {
    return { intent: "RESCHEDULE_ACTION", isFastRoute: false };
  }
  if (/^termine|^cl[oô]ture|^valide.*rendez-vous|^fait/i.test(normalized)) {
    return { intent: "COMPLETE_ACTION", isFastRoute: false };
  }
  if (/rendez-vous|rdv|agenda|calendrier/i.test(normalized) && /(quels|quel|combien|liste|voir|affiche|montre)/i.test(normalized)) {
    return { intent: "CALENDAR_VIEW", isFastRoute: false };
  }
  if (/rappels?|alarmes?/i.test(normalized) && /(quels|quel|combien|liste|voir|affiche|montre)/i.test(normalized)) {
    return { intent: "REMINDER_VIEW", isFastRoute: false };
  }
  if (/t[aâ]ches?/i.test(normalized) && /(quelles|quel|combien|liste|voir|affiche|montre)/i.test(normalized)) {
    return { intent: "TASK_VIEW", isFastRoute: false };
  }
  if (/(?:^|\b)(?:prends|planifie|fixe|cr[eé]e|ajoute|programme)\s+(?:un\s+)?(?:rendez-vous|rdv)\b/i.test(normalized)) {
    return { intent: "CREATE_EVENT", isFastRoute: false };
  }
  if (/(?:^|\b)(?:rappelle[- ]moi|programme\s+(?:un\s+)?rappel|cr[eé]e\s+(?:un\s+)?rappel|ajoute\s+(?:un\s+)?rappel|mets\s+(?:une?\s+)?alarme)\b/i.test(normalized)) {
    return { intent: "CREATE_REMINDER", isFastRoute: false };
  }
  if (/(?:^|\b)(?:ajoute|cr[eé]e)\s+(?:une?\s+)?(?:t[aâ]che|note)\b/i.test(normalized)) {
    return { intent: "CREATE_TASK", isFastRoute: false };
  }

  return {
    intent: "COMPLEX_OR_LLM",
    isFastRoute: false,
  };
}

/**
 * Découpe intelligemment les phrases multi-actions (virgules suivies d'actions, conjonctions 'et')
 */
function splitMultiTaskSegments(
  text: string
): Array<{ type: "CREATE_EVENT" | "CREATE_REMINDER" | "CREATE_TASK" | "CANCEL" | "RESCHEDULE"; rawText: string }> {
  const parts = text
    .split(/(?:,|\bet\b|\bpuis\b|\bensuite\b)/i)
    .map((s) => s.trim())
    .filter((s) => s.length > 5);

  const actionParts: Array<{ type: "CREATE_EVENT" | "CREATE_REMINDER" | "CREATE_TASK" | "CANCEL" | "RESCHEDULE"; rawText: string }> = [];

  for (const part of parts) {
    const p = part.toLowerCase();
    if (/rendez-vous|rdv/i.test(p) && /(prends|cr[eé]e|fixe|ajoute|programme)/i.test(p)) {
      actionParts.push({ type: "CREATE_EVENT", rawText: part });
    } else if (/rappel|rappelle|alarme/i.test(p)) {
      actionParts.push({ type: "CREATE_REMINDER", rawText: part });
    } else if (/t[aâ]che|acheter|appeler|commander|payer|envoyer/i.test(p) && /(ajoute|cr[eé]e|fais)/i.test(p)) {
      actionParts.push({ type: "CREATE_TASK", rawText: part });
    } else if (/annule|supprime/i.test(p)) {
      actionParts.push({ type: "CANCEL", rawText: part });
    } else if (/d[eé]cale|reporte/i.test(p)) {
      actionParts.push({ type: "RESCHEDULE", rawText: part });
    }
  }

  return actionParts;
}
