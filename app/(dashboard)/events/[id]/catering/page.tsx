"use client";
import { KoolLogo } from "@/components/kool-logo";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Printer, Save, Plus } from "lucide-react";

type EventType = "cocktail" | "dinner" | "brunch" | "buffet" | "wedding" | "corporate";
type Duration = 2 | 3 | 4 | 5;
type BarType = "full" | "beer-wine" | "none";

interface CateringInputs {
  guestCount: number;
  eventType: EventType;
  duration: Duration;
  mealIncluded: boolean;
  barType: BarType;
}

interface FoodEstimate {
  appetizers: number;
  mainPortions: number;
  sideDishes: number;
  breadRolls: number;
  desserts: number;
}

interface BarEstimate {
  spiritBottles: number;
  wineBottles: number;
  beerUnits: number;
  champagneBottles: number;
  clubSodaLiters: number;
  tonicLiters: number;
  juiceLiters: number;
  iceLbs: number;
  limes: number;
  lemons: number;
  olives: number;
}

interface NonAlcoholicEstimate {
  waterGlasses: number;
  coffeeCups: number;
  softDrinks: number;
}

interface ServingwareEstimate {
  glasses: number;
  plates: number;
  napkins: number;
  tables: number;
  linens: number;
}

interface CateringEstimate {
  food: FoodEstimate | null;
  bar: BarEstimate | null;
  nonAlcoholic: NonAlcoholicEstimate;
  servingware: ServingwareEstimate;
}

function calculate(inputs: CateringInputs): CateringEstimate {
  const { guestCount: g, eventType, duration, mealIncluded, barType } = inputs;
  if (g <= 0) return {
    food: null, bar: null,
    nonAlcoholic: { waterGlasses: 0, coffeeCups: 0, softDrinks: 0 },
    servingware: { glasses: 0, plates: 0, napkins: 0, tables: 0, linens: 0 },
  };

  // Food multipliers by event type
  const foodMultipliers: Record<EventType, { appetizers: number; main: number; sides: number; bread: number; desserts: number }> = {
    cocktail:  { appetizers: 8,  main: 0,    sides: 0,   bread: 0,   desserts: 2 },
    dinner:    { appetizers: 4,  main: 1,    sides: 2,   bread: 1.5, desserts: 1 },
    brunch:    { appetizers: 3,  main: 1,    sides: 2,   bread: 2,   desserts: 1 },
    buffet:    { appetizers: 5,  main: 1.5,  sides: 3,   bread: 1,   desserts: 1.5 },
    wedding:   { appetizers: 6,  main: 1,    sides: 3,   bread: 2,   desserts: 1.5 },
    corporate: { appetizers: 5,  main: 1,    sides: 2,   bread: 1,   desserts: 1 },
  };

  const fm = foodMultipliers[eventType];

  const food: FoodEstimate | null = mealIncluded ? {
    appetizers: Math.ceil(g * fm.appetizers),
    mainPortions: Math.ceil(g * fm.main),
    sideDishes: Math.ceil(g * fm.sides),
    breadRolls: Math.ceil(g * fm.bread),
    desserts: Math.ceil(g * fm.desserts),
  } : null;

  // Bar calculations
  const drinksPerPersonPerHour = 1.5;
  const totalDrinks = g * drinksPerPersonPerHour * duration;

  let bar: BarEstimate | null = null;
  if (barType !== "none") {
    const spiritFraction = barType === "full" ? 0.33 : 0;
    const wineFraction = 0.34;
    const beerFraction = barType === "full" ? 0.33 : 0.66;

    bar = {
      spiritBottles: barType === "full" ? Math.ceil((totalDrinks * spiritFraction) / 17) : 0,
      wineBottles: Math.ceil((totalDrinks * wineFraction) / 5),
      beerUnits: Math.ceil(totalDrinks * beerFraction),
      champagneBottles: eventType === "wedding" ? Math.ceil(g / 5) : 0,
      clubSodaLiters: barType === "full" ? Math.ceil((g * duration * 0.75) / 4) : 0,
      tonicLiters: barType === "full" ? Math.ceil((g * duration * 0.5) / 4) : 0,
      juiceLiters: Math.ceil((g * duration * 0.5) / 4),
      iceLbs: Math.ceil(g * 1.5 + g * 1),
      limes: barType === "full" ? Math.ceil(g * 0.5) : 0,
      lemons: barType === "full" ? Math.ceil(g * 0.3) : 0,
      olives: barType === "full" ? Math.ceil(g * 0.15) : 0,
    };
  }

  // Non-alcoholic
  const coffeeCups = eventType === "brunch" ? Math.ceil(g * 2) : (["dinner", "wedding", "corporate"].includes(eventType) ? Math.ceil(g * 1) : 0);
  const nonAlcoholic: NonAlcoholicEstimate = {
    waterGlasses: Math.ceil(g * 2 * duration),
    coffeeCups,
    softDrinks: Math.ceil(g * 0.5),
  };

  // Servingware
  const tables = Math.ceil(g / 8);
  const servingware: ServingwareEstimate = {
    glasses: Math.ceil(g * 2.5),
    plates: mealIncluded ? Math.ceil(g * 1.5) : Math.ceil(g * 0.5),
    napkins: Math.ceil(g * 3),
    tables,
    linens: tables,
  };

  return { food, bar, nonAlcoholic, servingware };
}

const EVENT_TYPE_LABELS: Record<EventType, string> = {
  cocktail: "cocktail reception",
  dinner: "sit-down dinner",
  brunch: "brunch",
  buffet: "buffet",
  wedding: "wedding",
  corporate: "corporate",
};

export default function CateringPage({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState("");
  const [addingToBudget, setAddingToBudget] = useState(false);
  const [budgetAdded, setBudgetAdded] = useState(false);
  const [savedConfig, setSavedConfig] = useState(false);
  const supabase = createClient();

  const [inputs, setInputs] = useState<CateringInputs>({
    guestCount: 50,
    eventType: "cocktail",
    duration: 3,
    mealIncluded: true,
    barType: "full",
  });

  const estimate = calculate(inputs);

  useEffect(() => {
    params.then(({ id }) => {
      setEventId(id);
      // Load saved config if exists
      supabase.from("events").select("catering_config").eq("id", id).single().then(({ data }) => {
        if (data?.catering_config) {
          try {
            const cfg = typeof data.catering_config === "string"
              ? JSON.parse(data.catering_config)
              : data.catering_config;
            setInputs((prev) => ({ ...prev, ...cfg }));
          } catch {
            // ignore parse errors
          }
        }
      });
    });
  }, []);

  async function saveConfig() {
    await supabase.from("events").update({ catering_config: inputs }).eq("id", eventId);
    setSavedConfig(true);
    setTimeout(() => setSavedConfig(false), 2000);
  }

  async function addToBudget() {
    setAddingToBudget(true);
    const items = buildBudgetItems();
    await supabase.from("budget_items").insert(items.map((item) => ({
      event_id: eventId,
      category: "catering",
      item_name: item.name,
      estimated_cost: item.cost,
      actual_cost: 0,
      is_paid: false,
      notes: `catering calculator estimate · ${inputs.guestCount} guests`,
    })));
    setAddingToBudget(false);
    setBudgetAdded(true);
    setTimeout(() => setBudgetAdded(false), 2500);
  }

  function buildBudgetItems() {
    const g = inputs.guestCount;
    const items: { name: string; cost: number }[] = [];
    if (estimate.food) {
      const perPerson = inputs.eventType === "wedding" ? 85 : inputs.eventType === "dinner" ? 65 : 40;
      items.push({ name: "food & catering", cost: g * perPerson });
    }
    items.push({ name: "non-alcoholic beverages", cost: g * 4 });
    items.push({ name: "servingware & linens", cost: estimate.servingware.tables * 35 });
    return items;
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="bg-white border border-gray-100 rounded-sm p-6 mb-4">
        <h3 className="text-xs font-bold tracking-[0.15em] text-kool-red mb-4 lowercase">{title}</h3>
        {children}
      </div>
    );
  }

  function Row({ label, value, unit }: { label: string; value: number | string; unit?: string }) {
    return (
      <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold">
          {typeof value === "number" ? value.toLocaleString() : value}
          {unit && <span className="text-gray-400 font-normal ml-1 text-xs">{unit}</span>}
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4">
        <Link href={`/events/${eventId}`} className="text-gray-400 hover:text-kool-black transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <KoolLogo size="sm" inverted={true} />
        <span className="text-gray-300">/</span>
        <span className="text-sm font-medium text-gray-500">catering calculator</span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight">catering calculator.</h1>
            <p className="text-gray-500 text-sm mt-1">industry-standard quantities based on your event details.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveConfig}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2.5 rounded-sm hover:border-kool-black transition-colors"
            >
              <Save className="w-4 h-4" />
              {savedConfig ? "saved!" : "save to event"}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 border border-gray-200 text-sm px-4 py-2.5 rounded-sm hover:border-kool-black transition-colors"
            >
              <Printer className="w-4 h-4" /> export pdf
            </button>
            <button
              onClick={addToBudget}
              disabled={addingToBudget}
              className="flex items-center gap-2 bg-kool-red text-white text-sm px-4 py-2.5 rounded-sm hover:bg-kool-crimson transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {addingToBudget ? "adding..." : budgetAdded ? "added!" : "add to budget"}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Inputs — left column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-100 rounded-sm p-6">
              <h3 className="text-xs font-bold tracking-[0.15em] text-gray-400 mb-5 lowercase">event details</h3>

              <div className="space-y-5">
                {/* Guest count */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600">guest count</label>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={inputs.guestCount}
                    onChange={(e) => setInputs((p) => ({ ...p, guestCount: parseInt(e.target.value) || 0 }))}
                    className="w-full border border-gray-200 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-kool-red"
                  />
                </div>

                {/* Event type */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600">event type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setInputs((p) => ({ ...p, eventType: type }))}
                        className={`text-xs px-3 py-2 rounded-sm border transition-colors text-left ${
                          inputs.eventType === type
                            ? "bg-kool-red text-white border-kool-red font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {EVENT_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600">duration</label>
                  <div className="flex gap-2">
                    {([2, 3, 4, 5] as Duration[]).map((d) => (
                      <button
                        key={d}
                        onClick={() => setInputs((p) => ({ ...p, duration: d }))}
                        className={`flex-1 text-xs px-3 py-2 rounded-sm border transition-colors ${
                          inputs.duration === d
                            ? "bg-kool-red text-white border-kool-red font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {d === 5 ? "5h+" : `${d}h`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal included */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600">meal included</label>
                  <div className="flex gap-2">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => setInputs((p) => ({ ...p, mealIncluded: val }))}
                        className={`flex-1 text-xs px-3 py-2 rounded-sm border transition-colors ${
                          inputs.mealIncluded === val
                            ? "bg-kool-red text-white border-kool-red font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {val ? "yes — food + drinks" : "no — drinks only"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar type */}
                <div>
                  <label className="block text-xs font-semibold mb-2 text-gray-600">bar type</label>
                  <div className="space-y-2">
                    {[
                      { value: "full", label: "full bar" },
                      { value: "beer-wine", label: "beer & wine" },
                      { value: "none", label: "non-alcoholic only" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setInputs((p) => ({ ...p, barType: opt.value as BarType }))}
                        className={`w-full text-xs px-3 py-2.5 rounded-sm border transition-colors text-left ${
                          inputs.barType === opt.value
                            ? "bg-kool-red text-white border-kool-red font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary card */}
            <div className="bg-kool-black rounded-sm p-6 text-white">
              <div className="text-xs font-bold tracking-[0.15em] text-kool-red mb-3 lowercase">summary</div>
              <div className="text-3xl font-black mb-1">{inputs.guestCount.toLocaleString()}</div>
              <div className="text-white/50 text-sm">
                {EVENT_TYPE_LABELS[inputs.eventType]} · {inputs.duration === 5 ? "5h+" : `${inputs.duration}h`}
              </div>
              <div className="text-white/50 text-xs mt-1">
                {inputs.mealIncluded ? "food & drinks" : "drinks only"} · {
                  inputs.barType === "full" ? "full bar" :
                  inputs.barType === "beer-wine" ? "beer & wine" :
                  "non-alcoholic"
                }
              </div>
            </div>
          </div>

          {/* Estimates — right column */}
          <div className="lg:col-span-3">
            {/* Food */}
            {estimate.food ? (
              <Section title="food quantities">
                <Row label="appetizers / passed hors d'oeuvres" value={estimate.food.appetizers} unit="pieces" />
                {estimate.food.mainPortions > 0 && <Row label="main course portions" value={estimate.food.mainPortions} unit="portions" />}
                {estimate.food.sideDishes > 0 && <Row label="side dish portions" value={estimate.food.sideDishes} unit="portions" />}
                {estimate.food.breadRolls > 0 && <Row label="bread / rolls" value={estimate.food.breadRolls} unit="pieces" />}
                <Row label="desserts" value={estimate.food.desserts} unit="portions" />
                <p className="text-xs text-gray-400 mt-3">
                  quantities use industry standard per-person ratios for {EVENT_TYPE_LABELS[inputs.eventType]}.
                </p>
              </Section>
            ) : (
              <div className="bg-gray-100 rounded-sm p-5 mb-4 text-sm text-gray-400 text-center">
                drinks only — no food quantities calculated
              </div>
            )}


            {/* Non-alcoholic */}
            <Section title="non-alcoholic">
              <Row label="water (glasses)" value={estimate.nonAlcoholic.waterGlasses} unit="glasses" />
              {estimate.nonAlcoholic.coffeeCups > 0 && (
                <Row label="coffee / tea" value={estimate.nonAlcoholic.coffeeCups} unit="cups" />
              )}
              <Row label="soft drinks" value={estimate.nonAlcoholic.softDrinks} unit="cans" />
              <p className="text-xs text-gray-400 mt-3">
                water: 2 glasses/person/hour.
                {inputs.eventType === "brunch" ? " coffee: 2 cups/person for brunch." : ""}
              </p>
            </Section>

            {/* Servingware */}
            <Section title="servingware & linens">
              <Row label="glasses" value={estimate.servingware.glasses} unit="pieces" />
              <Row label="plates" value={estimate.servingware.plates} unit="pieces" />
              <Row label="napkins" value={estimate.servingware.napkins} unit="pieces" />
              <Row label="tables (8 guests/table)" value={estimate.servingware.tables} unit="tables" />
              <Row label="table linens" value={estimate.servingware.linens} unit="linens" />
              <p className="text-xs text-gray-400 mt-3">
                glasses: 2.5× guest count. plates: 1.5× (with meal) or 0.5× (cocktail only).
                napkins: 3× guest count.
              </p>
            </Section>


          </div>
        </div>
      </main>
    </div>
  );
}
