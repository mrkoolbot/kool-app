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
  // social meals
  { value: "breakfast", label: "breakfast" },
  { value: "brunch", label: "brunch" },
  { value: "luncheon", label: "luncheon" },
  { value: "tea_party", label: "tea party" },
  { value: "dinner", label: "dinner" },
  { value: "dinner_party", label: "dinner party" },
  // celebrations
  { value: "cocktail_party", label: "cocktail party" },
  { value: "wedding", label: "wedding" },
  { value: "engagement_party", label: "engagement party" },
  { value: "anniversary", label: "anniversary" },
  { value: "milestone_birthday", label: "milestone birthday" },
  { value: "sweet_16", label: "sweet 16" },
  { value: "quinceanera", label: "quinceañera" },
  { value: "baby_shower", label: "baby shower" },
  { value: "graduation", label: "graduation" },
  { value: "retirement", label: "retirement" },
  { value: "gala", label: "gala" },
  { value: "holiday_party", label: "holiday party" },
  // professional
  { value: "networking_event", label: "networking event" },
  { value: "conference", label: "conference" },
  { value: "summit", label: "summit" },
  { value: "tradeshow", label: "tradeshow" },
  { value: "corporate_event", label: "corporate event" },
  { value: "team_bonding", label: "team bonding" },
  { value: "award_ceremony", label: "award ceremony" },
  // brand
  { value: "brand_launch", label: "launch" },
  { value: "open_house", label: "open house" },
  { value: "ribbon_cutting", label: "ribbon-cutting" },
  { value: "retreat", label: "retreat" },
  { value: "show", label: "show" },
  { value: "concert", label: "concert" },
  { value: "festival", label: "festival" },
  { value: "performance", label: "performance" },
  // other
  { value: "rehearsal_dinner", label: "rehearsal dinner" },
  { value: "rehearsal", label: "rehearsal / run-through" },
  { value: "memorial", label: "memorial / celebration of life" },
  { value: "charity", label: "charity event" },
  { value: "fundraiser", label: "fundraiser" },
  { value: "special_event", label: "special event" },
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
