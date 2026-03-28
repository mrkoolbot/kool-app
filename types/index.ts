export type Plan = "free" | "premium";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  plan: Plan;
  stripe_customer_id?: string;
  created_at: string;
}

export interface Event {
  id: string;
  user_id: string;
  name: string;
  event_type: string;
  event_date?: string;
  event_time?: string;
  location?: string;
  venue_name?: string;
  description?: string;
  theme?: string;
  budget_total?: number;
  guest_count_estimate?: number;
  status: "planning" | "confirmed" | "completed";
  is_public: boolean;
  // Landing page fields
  slug?: string;
  landing_description?: string;
  landing_image_url?: string;
  dress_code?: string;
  agenda?: Array<{ time: string; title: string; description?: string }>;
  // Catering
  catering_config?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Guest {
  id: string;
  event_id: string;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  rsvp_status: "pending" | "attending" | "declined" | "maybe";
  plus_one: boolean;
  dietary_restrictions?: string;
  notes?: string;
  invited_at: string;
  responded_at?: string;
  invite_sent?: boolean;
  invite_sent_at?: string;
  rsvp_answers?: Record<string, unknown>;
  plus_one_name?: string;
  plus_one_attending?: boolean;
}

export interface RsvpQuestion {
  id: string;
  label: string;
  type: "textarea" | "yes-no" | "yes-no-with-name" | "text" | "dropdown";
  enabled: boolean;
  required: boolean;
  options?: string[];
}

export interface ChecklistItem {
  id: string;
  event_id: string;
  category: string;
  title: string;
  description?: string;
  is_completed: boolean;
  due_date?: string;
  assigned_to?: string;
  priority: "low" | "medium" | "high";
  sort_order?: number;
  created_at: string;
}

export interface Vendor {
  id: string;
  event_id: string;
  category: string;
  vendor_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  price_quote?: number;
  deposit_amount?: number;
  deposit_paid: boolean;
  balance_due?: number;
  balance_paid: boolean;
  contract_signed: boolean;
  notes?: string;
  status: "researching" | "contacted" | "booked" | "confirmed" | "cancelled";
  created_at: string;
}

export interface BudgetItem {
  id: string;
  event_id: string;
  vendor_id?: string;
  category: string;
  item_name: string;
  estimated_cost: number;
  actual_cost: number;
  is_paid: boolean;
  notes?: string;
  created_at: string;
}

export interface TimelineItem {
  id: string;
  event_id: string;
  time_slot?: string;
  duration_minutes?: number;
  title: string;
  description?: string;
  location?: string;
  assigned_to?: string;
  sort_order?: number;
  created_at: string;
}
