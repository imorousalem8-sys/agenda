import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  if (isToday(d)) return `Aujourd'hui à ${format(d, "HH:mm")}`;
  if (isTomorrow(d)) return `Demain à ${format(d, "HH:mm")}`;
  if (isYesterday(d)) return `Hier à ${format(d, "HH:mm")}`;
  return format(d, "d MMMM yyyy à HH:mm", { locale: fr });
}

export function formatDateShort(date: Date | string): string {
  const d = new Date(date);
  return format(d, "d MMM yyyy", { locale: fr });
}

export function formatTime(date: Date | string): string {
  return format(new Date(date), "HH:mm");
}

export function formatRelative(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    HEALTH: "Santé",
    FAMILY: "Famille",
    WORK: "Travail",
    ADMIN: "Administratif",
    EDUCATION: "Études",
    SHOPPING: "Courses",
    TRAVEL: "Voyage",
    OTHER: "Autre",
  };
  return labels[category] ?? category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    HEALTH: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    FAMILY: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    WORK: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    ADMIN: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    EDUCATION: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    SHOPPING: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    TRAVEL: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    OTHER: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  };
  return colors[category] ?? colors.OTHER;
}

export function getPriorityLabel(priority: string): string {
  const labels: Record<string, string> = {
    LOW: "Faible",
    NORMAL: "Normale",
    HIGH: "Haute",
    URGENT: "Urgent",
  };
  return labels[priority] ?? priority;
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    LOW: "text-slate-400",
    NORMAL: "text-blue-400",
    HIGH: "text-amber-400",
    URGENT: "text-rose-400",
  };
  return colors[priority] ?? colors.NORMAL;
}
