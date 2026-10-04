import fs from "fs";
import path from "path";

export interface MemoryUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  plan: string;
  subscriptionStatus: string;
  createdAt: number;
}

const globalForMemory = globalThis as unknown as {
  __alarm_memoryUsers?: Map<string, MemoryUser>;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "local-users.json");

function loadUsersFromDisk(): Map<string, MemoryUser> {
  const map = new Map<string, MemoryUser>();
  try {
    if (fs.existsSync(USERS_FILE)) {
      const raw = fs.readFileSync(USERS_FILE, "utf-8");
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        for (const u of list) {
          if (u.email) {
            map.set(u.email.toLowerCase().trim(), u);
          }
        }
      }
    }
  } catch (err) {
    // Silently continue if reading fails
  }
  return map;
}

function persistUsersToDisk(map: Map<string, MemoryUser>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      USERS_FILE,
      JSON.stringify(Array.from(map.values()), null, 2),
      "utf-8"
    );
  } catch (err) {
    // Silently continue if writing fails
  }
}

const memoryUsers: Map<string, MemoryUser> =
  globalForMemory.__alarm_memoryUsers || loadUsersFromDisk();

globalForMemory.__alarm_memoryUsers = memoryUsers;

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
  persistUsersToDisk(memoryUsers);
  return memoryUser;
}

export function getMemoryUser(email: string): MemoryUser | undefined {
  const normalizedEmail = email.toLowerCase().trim();
  if (memoryUsers.has(normalizedEmail)) {
    return memoryUsers.get(normalizedEmail);
  }
  // Fallback reload from disk (si un worker adjacent ou Next.js a persisté)
  const fromDisk = loadUsersFromDisk();
  if (fromDisk.has(normalizedEmail)) {
    const user = fromDisk.get(normalizedEmail)!;
    memoryUsers.set(normalizedEmail, user);
    return user;
  }
  return undefined;
}
