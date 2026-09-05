export interface MemoryUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  plan: string;
  subscriptionStatus: string;
  createdAt: number;
}

const memoryUsers = new Map<string, MemoryUser>();

export function saveMemoryUser(user: {
  id?: string;
  email: string;
  name?: string;
  passwordHash: string;
  plan?: string;
  subscriptionStatus?: string;
}): MemoryUser {
  const normalizedEmail = user.email.toLowerCase().trim();
  const existing = memoryUsers.get(normalizedEmail);
  const memoryUser: MemoryUser = {
    id: user.id || existing?.id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normalizedEmail,
    name: user.name || existing?.name || "Utilisateur",
    passwordHash: user.passwordHash,
    plan: user.plan || existing?.plan || "PRO",
    subscriptionStatus: user.subscriptionStatus || existing?.subscriptionStatus || "TRIAL",
    createdAt: existing?.createdAt || Date.now(),
  };

  memoryUsers.set(normalizedEmail, memoryUser);
  return memoryUser;
}

export function getMemoryUser(email: string): MemoryUser | undefined {
  return memoryUsers.get(email.toLowerCase().trim());
}
