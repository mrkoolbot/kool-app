import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function daysUntil(date: string) {
  const diff = new Date(date).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export const EVENT_TYPES = [
  { value: "wedding", label: "wedding" },
  { value: "milestone_birthday", label: "milestone birthday" },
  { value: "quinceanera", label: "quinceañera" },
  { value: "sweet_16", label: "sweet 16" },
  { value: "baby_shower", label: "baby shower" },
  { value: "corporate_event", label: "corporate event" },
  { value: "graduation", label: "graduation party" },
  { value: "retirement", label: "retirement celebration" },
  { value: "engagement_party", label: "engagement party" },
  { value: "holiday_party", label: "holiday party" },
  { value: "dinner_party", label: "dinner party" },
  { value: "brand_launch", label: "brand launch" },
  { value: "gala", label: "charity gala" },
  { value: "custom", label: "custom event" },
];

export const VENDOR_CATEGORIES = [
  "venue",
  "catering",
  "florist",
  "photographer",
  "videographer",
  "dj",
  "live band",
  "hair & makeup",
  "transportation",
  "cake & desserts",
  "officiant",
  "lighting",
  "rentals",
  "stationery",
  "entertainment",
  "security",
  "other",
];

export const BUDGET_CATEGORIES = [
  "venue",
  "catering & bar",
  "florals & decor",
  "photography",
  "videography",
  "music & entertainment",
  "attire & beauty",
  "invitations & stationery",
  "transportation",
  "accommodations",
  "cake & desserts",
  "favors & gifts",
  "coordination",
  "lighting",
  "miscellaneous",
];
