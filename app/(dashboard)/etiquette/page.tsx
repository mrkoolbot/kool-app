"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { KoolLogo } from "@/components/kool-logo";

// ─── chapter card illustrations ───────────────────────────────────────────────

const IllusHandshake = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M4 46 L4 40 L19 32 L24 35 L36 35 L41 32 L56 40 L56 46"/>
    <path stroke="#0A0A0A" strokeWidth="1.3" d="M24 35 L24 29 M28 34 L28 27 M32 34 L32 27 M36 35 L36 29"/>
    <path stroke="#D90000" strokeWidth="1.6" d="M19 32 Q30 24 41 32"/>
  </svg>
);

const IllusCheckX = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="30" y1="12" x2="30" y2="50" stroke="#E0E0E0" strokeWidth="1"/>
    <path stroke="#0A0A0A" strokeWidth="2.2" d="M8 30 L15 40 L24 18"/>
    <path stroke="#D90000" strokeWidth="2.2" d="M36 18 L52 42 M52 18 L36 42"/>
  </svg>
);

const IllusDoor = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="8" width="28" height="46" rx="1" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="1.2" d="M12 54 L40 54"/>
    <path stroke="#D90000" strokeWidth="1.3" strokeDasharray="2 2.5" d="M40 16 L52 12 M40 30 L54 30 M40 44 L52 48"/>
    <circle cx="34" cy="33" r="2.2" fill="#D90000"/>
  </svg>
);

const IllusCrown = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M7 44 L7 26 L18 36 L30 12 L42 36 L53 26 L53 44 Z"/>
    <line x1="7" y1="44" x2="53" y2="44" stroke="#0A0A0A" strokeWidth="2.2"/>
    <circle cx="30" cy="12" r="3" fill="#D90000"/>
    <circle cx="7" cy="26" r="2.5" fill="#D90000"/>
    <circle cx="53" cy="26" r="2.5" fill="#D90000"/>
  </svg>
);

const IllusEnvelope = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="16" width="48" height="32" rx="2" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="1.5" d="M6 18 L30 34 L54 18"/>
    <path stroke="#0A0A0A" strokeWidth="1" d="M6 48 L22 34 M54 48 L38 34"/>
    <circle cx="30" cy="34" r="3" fill="#D90000"/>
  </svg>
);

const IllusChair = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="26" width="32" height="7" rx="1" stroke="#0A0A0A" strokeWidth="1.8"/>
    <rect x="14" y="10" width="6" height="16" rx="1" stroke="#0A0A0A" strokeWidth="1.5"/>
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M14 33 L12 52 M42 33 L40 52 M46 33 L46 52"/>
  </svg>
);

const IllusClock = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="32" r="22" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="1.6" d="M30 12 L30 14 M30 50 L30 48 M10 32 L12 32 M50 32 L48 32"/>
    <path stroke="#0A0A0A" strokeWidth="2.2" d="M30 32 L30 18"/>
    <path stroke="#D90000" strokeWidth="2" d="M30 32 L41 38"/>
    <circle cx="30" cy="32" r="2.2" fill="#0A0A0A"/>
  </svg>
);

const IllusPlate = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="32" r="20" stroke="#0A0A0A" strokeWidth="1.8"/>
    <circle cx="30" cy="32" r="14" stroke="#D90000" strokeWidth="0.8"/>
    <path stroke="#0A0A0A" strokeWidth="2.2" d="M8 20 L8 48 M6 20 L6 28 M8 20 L10 28 M10 20 L10 28"/>
    <path stroke="#0A0A0A" strokeWidth="2.2" d="M52 20 L52 48"/>
    <path stroke="#0A0A0A" strokeWidth="1" d="M52 20 Q48 26 48 34 L52 36"/>
  </svg>
);

const IllusCrossedUtensils = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {/* fork — left side, vertical */}
    <line x1="20" y1="8" x2="20" y2="52" stroke="#0A0A0A" strokeWidth="2"/>
    <line x1="16" y1="8" x2="16" y2="22" stroke="#0A0A0A" strokeWidth="1.4"/>
    <line x1="20" y1="8" x2="20" y2="22" stroke="#0A0A0A" strokeWidth="1.4"/>
    <line x1="24" y1="8" x2="24" y2="22" stroke="#0A0A0A" strokeWidth="1.4"/>
    <path stroke="#0A0A0A" strokeWidth="1.4" d="M16 22 Q16 28 20 30 Q24 28 24 22"/>
    {/* knife — right side, vertical, blade faces left (toward fork) */}
    <line x1="40" y1="10" x2="40" y2="52" stroke="#D90000" strokeWidth="2"/>
    <path stroke="#D90000" strokeWidth="1.5" fill="none" d="M40 10 Q34 16 34 26 L40 28"/>
  </svg>
);

const IllusFlower = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 52 L30 32"/>
    <path stroke="#0A0A0A" strokeWidth="1.3" d="M30 42 Q22 38 20 30"/>
    <ellipse cx="30" cy="22" rx="7" ry="10" stroke="#0A0A0A" strokeWidth="1.5"/>
    <ellipse cx="20" cy="26" rx="6" ry="9" stroke="#0A0A0A" strokeWidth="1.3" transform="rotate(-40 20 26)"/>
    <ellipse cx="40" cy="26" rx="6" ry="9" stroke="#0A0A0A" strokeWidth="1.3" transform="rotate(40 40 26)"/>
    <circle cx="30" cy="22" r="4" fill="#D90000"/>
  </svg>
);

const IllusBowTie = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M8 22 L27 30 L8 38 Z"/>
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M52 22 L33 30 L52 38 Z"/>
    <circle cx="30" cy="30" r="5" stroke="#D90000" strokeWidth="2" fill="none"/>
    <circle cx="30" cy="30" r="2" fill="#D90000"/>
  </svg>
);

const IllusSpeechBubble = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="48" height="34" rx="8" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="1.5" d="M14 42 L10 54 L28 42"/>
    <path stroke="#D90000" strokeWidth="1.6" d="M14 20 L46 20 M14 28 L38 28"/>
  </svg>
);

const IllusShield = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 6 L52 14 L52 30 Q52 48 30 56 Q8 48 8 30 L8 14 Z"/>
    <path stroke="#D90000" strokeWidth="1.5" d="M30 20 Q24 26 24 30 Q24 36 30 40 Q36 36 36 30 Q36 26 30 20 Z"/>
  </svg>
);

const IllusPocketWatch = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="36" r="20" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="1.5" d="M28 16 Q28 10 30 8 Q36 6 36 10 Q33 11 30 16"/>
    <path stroke="#0A0A0A" strokeWidth="2.2" d="M30 36 L30 24"/>
    <path stroke="#D90000" strokeWidth="2" d="M30 36 L40 42"/>
    <circle cx="30" cy="36" r="2.2" fill="#0A0A0A"/>
    <path stroke="#0A0A0A" strokeWidth="1" d="M30 18 L30 20 M30 52 L30 50 M12 36 L14 36 M48 36 L46 36"/>
  </svg>
);

const IllusFigure = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="12" r="6" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="2" d="M30 18 L30 40"/>
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M14 26 L30 22 L46 26"/>
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 40 L22 54 M30 40 L38 54"/>
    <line x1="36" y1="8" x2="36" y2="50" stroke="#D90000" strokeWidth="1" strokeDasharray="2 3"/>
  </svg>
);

const IllusNetwork = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="30" r="11" stroke="#0A0A0A" strokeWidth="1.8"/>
    <circle cx="46" cy="30" r="11" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#D90000" strokeWidth="2" d="M25 30 L35 30"/>
    <circle cx="25" cy="30" r="2.5" fill="#D90000"/>
    <circle cx="35" cy="30" r="2.5" fill="#D90000"/>
    <circle cx="14" cy="24" r="3" stroke="#0A0A0A" strokeWidth="1.3"/>
    <path stroke="#0A0A0A" strokeWidth="1.3" d="M10 34 Q14 30 18 34"/>
    <circle cx="46" cy="24" r="3" stroke="#0A0A0A" strokeWidth="1.3"/>
    <path stroke="#0A0A0A" strokeWidth="1.3" d="M42 34 Q46 30 50 34"/>
  </svg>
);

const IllusGift = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="28" width="44" height="26" rx="1" stroke="#0A0A0A" strokeWidth="1.8"/>
    <rect x="8" y="20" width="44" height="10" rx="1" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#D90000" strokeWidth="1.6" d="M30 20 L30 54"/>
    <path stroke="#D90000" strokeWidth="1.4" d="M8 25 L52 25"/>
    <path stroke="#D90000" strokeWidth="1.5" d="M30 20 Q21 10 17 14 Q17 22 30 20 Q39 10 43 14 Q43 22 30 20"/>
  </svg>
);

const IllusPen = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="14" width="34" height="42" rx="2" stroke="#0A0A0A" strokeWidth="1.8"/>
    <path stroke="#0A0A0A" strokeWidth="1.2" d="M12 26 L36 26 M12 33 L36 33 M12 40 L28 40"/>
    <path stroke="#D90000" strokeWidth="1.8" d="M36 8 L52 24 L48 30 L30 14 Z"/>
    <path stroke="#D90000" strokeWidth="1" fill="#D90000" d="M46 32 L42 38 Q41 36 42 33 Z"/>
  </svg>
);

const IllusHanger = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 22 Q10 30 6 46 L54 46 Q50 30 30 22"/>
    <path stroke="#D90000" strokeWidth="1.8" d="M30 6 Q36 6 36 12 Q36 18 30 22"/>
    <circle cx="30" cy="6" r="3" stroke="#D90000" strokeWidth="1.5"/>
    <line x1="6" y1="46" x2="54" y2="46" stroke="#0A0A0A" strokeWidth="1.5"/>
  </svg>
);

const IllusPhone = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="16" y="6" width="28" height="50" rx="4" stroke="#0A0A0A" strokeWidth="1.8"/>
    <circle cx="30" cy="50" r="2.5" stroke="#0A0A0A" strokeWidth="1.3"/>
    <line x1="22" y1="12" x2="38" y2="12" stroke="#0A0A0A" strokeWidth="1"/>
    <path stroke="#D90000" strokeWidth="2.8" d="M22 24 L38 42 M38 24 L22 42"/>
  </svg>
);

const IllusChampagne = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M17 54 L21 42 L14 16 Q16 8 22 8 Q26 8 26 16 L21 42"/>
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M43 54 L39 42 L46 16 Q44 8 38 8 Q34 8 34 16 L39 42"/>
    <line x1="14" y1="42" x2="28" y2="42" stroke="#0A0A0A" strokeWidth="1.3"/>
    <line x1="32" y1="42" x2="46" y2="42" stroke="#0A0A0A" strokeWidth="1.3"/>
    <circle cx="30" cy="6" r="2" fill="#D90000"/>
    <path stroke="#D90000" strokeWidth="1.5" d="M30 4 L30 2 M26 6 L24 4 M34 6 L36 4"/>
    <circle cx="20" cy="28" r="1" stroke="#0A0A0A" strokeWidth="1"/>
    <circle cx="40" cy="26" r="1" stroke="#0A0A0A" strokeWidth="1"/>
  </svg>
);

const IllusLeaf = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 52 L30 22 Q30 8 14 6 Q14 22 30 22 Q46 22 46 6 Q30 8 30 22"/>
    <path stroke="#D90000" strokeWidth="1.3" d="M30 52 L30 22"/>
    <path stroke="#D90000" strokeWidth="1" d="M30 38 L20 30 M30 30 L40 24"/>
  </svg>
);

const IllusExit = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="28" height="48" rx="1" stroke="#0A0A0A" strokeWidth="1.8"/>
    <circle cx="30" cy="32" r="2.2" fill="#0A0A0A"/>
    <path stroke="#D90000" strokeWidth="2.2" d="M28 32 L50 32 M43 25 L50 32 L43 39"/>
  </svg>
);

const IllusGlobe = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="30" r="22" stroke="#0A0A0A" strokeWidth="1.8"/>
    <ellipse cx="30" cy="30" rx="12" ry="22" stroke="#0A0A0A" strokeWidth="1.2"/>
    <line x1="8" y1="30" x2="52" y2="30" stroke="#0A0A0A" strokeWidth="1.2"/>
    <path stroke="#0A0A0A" strokeWidth="0.9" d="M11 20 Q30 24 49 20 M11 40 Q30 36 49 40"/>
    <circle cx="30" cy="30" r="2.5" fill="#D90000"/>
  </svg>
);

const IllusBook = () => (
  <svg viewBox="0 0 60 60" width="52" height="52" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 12 Q16 10 6 14 L6 52 Q16 48 30 50 L30 12"/>
    <path stroke="#0A0A0A" strokeWidth="1.8" d="M30 12 Q44 10 54 14 L54 52 Q44 48 30 50 L30 12"/>
    <path stroke="#D90000" strokeWidth="1.3" d="M10 22 L26 22 M10 28 L26 28 M10 34 L24 34 M10 40 L22 40"/>
    <path stroke="#0A0A0A" strokeWidth="1" d="M34 22 L50 22 M34 28 L50 28 M34 34 L48 34"/>
  </svg>
);

// ─── chapter list ─────────────────────────────────────────────────────────────

const chapters = [
  { num: "01", id: "what-manners-actually-mean", title: "what manners actually mean", Illus: IllusHandshake },
  { num: "02", id: "the-foundational-dos-and-donts", title: "the foundational do's and don'ts", Illus: IllusCheckX },
  { num: "03", id: "how-to-greet-guests", title: "how to greet guests", Illus: IllusDoor },
  { num: "04", id: "addressing-dignitaries", title: "addressing dignitaries", Illus: IllusCrown },
  { num: "05", id: "invitations-addressing-families-couples-individuals", title: "invitations: addressing families, couples & individuals", Illus: IllusEnvelope },
  { num: "06", id: "seating-rules-that-actually-work", title: "seating rules that actually work", Illus: IllusChair },
  { num: "07", id: "the-run-of-show", title: "the run of show", Illus: IllusClock },
  { num: "08", id: "how-to-set-a-table", title: "how to set a table", Illus: IllusPlate },
  { num: "09", id: "the-art-of-using-utensils", title: "the art of using utensils", Illus: IllusCrossedUtensils },
  { num: "10", id: "etiquette-for-ladies", title: "etiquette for ladies", Illus: IllusFlower },
  { num: "11", id: "etiquette-for-gentlemen", title: "etiquette for gentlemen", Illus: IllusBowTie },
  { num: "12", id: "the-right-verbiage", title: "the right verbiage", Illus: IllusSpeechBubble },
  { num: "13", id: "chivalry-why-it-still-matters", title: "chivalry — why it still matters", Illus: IllusShield },
  { num: "14", id: "the-importance-of-being-on-time", title: "the importance of being on time", Illus: IllusPocketWatch },
  { num: "15", id: "body-language-at-events", title: "body language at events", Illus: IllusFigure },
  { num: "16", id: "networking-with-intention", title: "networking with intention", Illus: IllusNetwork },
  { num: "17", id: "gifting-with-grace", title: "gifting with grace", Illus: IllusGift },
  { num: "18", id: "the-thank-you-note", title: "the thank you note", Illus: IllusPen },
  { num: "19", id: "dress-codes-decoded", title: "dress codes decoded", Illus: IllusHanger },
  { num: "20", id: "digital-etiquette", title: "digital etiquette: phones, social media & photography", Illus: IllusPhone },
  { num: "21", id: "toasts-and-speeches", title: "toasts & speeches", Illus: IllusChampagne },
  { num: "22", id: "dietary-needs-and-special-accommodations", title: "dietary needs & special accommodations", Illus: IllusLeaf },
  { num: "23", id: "the-graceful-exit", title: "the graceful exit", Illus: IllusExit },
  { num: "24", id: "navigating-multicultural-events", title: "navigating multicultural events", Illus: IllusGlobe },
  { num: "25", id: "the-hosts-invisible-rule-book", title: "the host's invisible rule book", Illus: IllusBook },
];

// ─── table setting diagram (ch08) ────────────────────────────────────────────

function InformalSettingDiagram() {
  const s = "#333"; // stroke color
  return (
    <div className="mb-4">
      <svg viewBox="0 0 680 500" width="100%" style={{ display: "block", maxWidth: 680 }} role="img" aria-label="informal place setting">
        <rect width="680" height="500" fill="white" rx="4" stroke="#EBEBEB" strokeWidth="1"/>
        <text x="340" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0A0A0A">informal place setting</text>

        {/* ── NAPKIN — far left, folded rectangle ── */}
        <rect x="38" y="178" width="50" height="160" rx="2" fill="#F0EDE6" stroke="#B8B0A4" strokeWidth="1.5"/>
        <line x1="38" y1="200" x2="88" y2="200" stroke="#C0B8B0" strokeWidth="0.8"/>
        <text x="63" y="365" textAnchor="middle" fontSize="9" fill={s}>Napkin</text>

        {/* ── FORK — left of plate ── */}
        <line x1="136" y1="358" x2="136" y2="198" stroke={s} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="136" y1="198" x2="136" y2="174" stroke={s} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="130" y1="174" x2="130" y2="158" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="134" y1="172" x2="134" y2="156" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="138" y1="172" x2="138" y2="156" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="142" y1="174" x2="142" y2="158" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <text x="136" y="374" textAnchor="middle" fontSize="9" fill={s}>Fork</text>

        {/* ── DINNER PLATE + SERVICE PLATE ── */}
        <circle cx="316" cy="258" r="114" fill="#F5F2EC" stroke="#C0B8B0" strokeWidth="1.5"/>
        <circle cx="316" cy="258" r="92" fill="white" stroke={s} strokeWidth="2"/>
        <circle cx="316" cy="258" r="72" fill="none" stroke={s} strokeWidth="0.7"/>
        <text x="316" y="264" textAnchor="middle" fontSize="10" fontWeight="600" fill="#888">Service plate</text>

        {/* ── SALAD PLATE on service plate ── */}
        <circle cx="316" cy="244" r="52" fill="white" stroke={s} strokeWidth="1.4"/>
        <text x="316" y="248" textAnchor="middle" fontSize="9" fill="#888">Salad plate</text>

        {/* ── DINNER KNIFE — inner right, blade faces plate ── */}
        <line x1="496" y1="358" x2="496" y2="170" stroke={s} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M496 170 Q486 182 484 200 L496 204" stroke={s} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="496" y="374" textAnchor="middle" fontSize="9" fill={s}>Knife</text>

        {/* ── TEASPOON — right of knife ── */}
        <line x1="526" y1="354" x2="526" y2="192" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <ellipse cx="526" cy="178" rx="9" ry="13" fill="none" stroke={s} strokeWidth="1.5"/>
        <text x="526" y="370" textAnchor="middle" fontSize="9" fill={s}>Teaspoon</text>

        {/* ── SOUP SPOON — outermost right ── */}
        <line x1="556" y1="354" x2="556" y2="188" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <ellipse cx="556" cy="172" rx="11" ry="16" fill="none" stroke={s} strokeWidth="1.6"/>
        <text x="556" y="370" textAnchor="middle" fontSize="9" fill={s}>Soup spoon</text>

        {/* ── BREAD PLATE + BUTTER KNIFE — upper left ── */}
        <circle cx="148" cy="126" r="44" fill="#F5F2EC" stroke="#C0B8B0" strokeWidth="1.3"/>
        <circle cx="148" cy="126" r="33" fill="white" stroke={s} strokeWidth="1.1"/>
        <line x1="164" y1="142" x2="132" y2="110" stroke={s} strokeWidth="2" strokeLinecap="round"/>
        <path d="M132 110 Q127 115 134 122 L139 117" stroke={s} strokeWidth="1" fill="none"/>
        <text x="108" y="102" textAnchor="middle" fontSize="9" fill={s}>Bread</text>
        <text x="108" y="113" textAnchor="middle" fontSize="9" fill={s}>plate</text>
        <text x="152" y="164" textAnchor="middle" fontSize="9" fill={s}>Bread knife</text>

        {/* ── PLACE CARD — above plate, left of center ── */}
        <rect x="220" y="72" width="70" height="44" rx="2" fill="white" stroke={s} strokeWidth="1.3"/>
        <line x1="290" y1="72" x2="270" y2="116" stroke={s} strokeWidth="0.7"/>
        <text x="255" y="60" textAnchor="middle" fontSize="9" fill={s}>Place card</text>

        {/* ── DESSERT SPOON — above plate, horizontal ── */}
        <line x1="242" y1="140" x2="392" y2="140" stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="250" cy="140" rx="13" ry="7" fill="none" stroke={s} strokeWidth="1.4"/>
        <text x="320" y="130" textAnchor="middle" fontSize="9" fill={s}>Dessert spoon</text>

        {/* ── CAKE FORK — above plate, horizontal, below spoon ── */}
        <line x1="242" y1="158" x2="392" y2="158" stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="378" y1="152" x2="394" y2="152" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="378" y1="158" x2="396" y2="158" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="378" y1="164" x2="394" y2="164" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <text x="320" y="176" textAnchor="middle" fontSize="9" fill={s}>Cake fork</text>

        {/* ── WATER GLASS — upper right ── */}
        <circle cx="506" cy="106" r="32" fill="none" stroke={s} strokeWidth="2"/>
        <circle cx="506" cy="106" r="23" fill="none" stroke={s} strokeWidth="0.5"/>
        <text x="494" y="66" textAnchor="middle" fontSize="9" fill={s}>Water</text>
        <text x="494" y="78" textAnchor="middle" fontSize="9" fill={s}>glass</text>

        {/* ── WINEGLASS RED ── */}
        <circle cx="566" cy="86" r="25" fill="none" stroke={s} strokeWidth="1.6"/>
        <circle cx="566" cy="86" r="17" fill="none" stroke={s} strokeWidth="0.5"/>
        <text x="596" y="74" textAnchor="start" fontSize="9" fill={s}>Wineglass</text>
        <text x="596" y="86" textAnchor="start" fontSize="9" fill="#888">(red)</text>

        {/* ── WINEGLASS WHITE ── */}
        <circle cx="602" cy="120" r="21" fill="none" stroke={s} strokeWidth="1.4"/>
        <circle cx="602" cy="120" r="14" fill="none" stroke={s} strokeWidth="0.4"/>
        <text x="628" y="118" textAnchor="start" fontSize="9" fill={s}>Wineglass</text>
        <text x="628" y="130" textAnchor="start" fontSize="9" fill="#888">(white)</text>

        {/* ── CUP & SAUCER — right side ── */}
        <ellipse cx="608" cy="308" rx="38" ry="10" fill="#F5F2EC" stroke="#C0B8B0" strokeWidth="1.2"/>
        <circle cx="608" cy="290" r="26" fill="white" stroke={s} strokeWidth="1.4"/>
        <circle cx="608" cy="290" r="18" fill="none" stroke={s} strokeWidth="1"/>
        <line x1="634" y1="290" x2="644" y2="298" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <text x="608" y="334" textAnchor="middle" fontSize="9" fill={s}>Cup and</text>
        <text x="608" y="345" textAnchor="middle" fontSize="9" fill={s}>saucer</text>

        {/* footer */}
        <line x1="28" y1="398" x2="652" y2="398" stroke="#EBEBEB" strokeWidth="1"/>
        <text x="340" y="414" textAnchor="middle" fontSize="8.5" fill="#999" fontStyle="italic">cup &amp; saucer generally not placed until the dessert course</text>
        <text x="340" y="428" textAnchor="middle" fontSize="8" fill="#D90000">the koolture group</text>
      </svg>
    </div>
  );
}

function TSDLabel({ x, y, letter }: { x: number; y: number; letter: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill="white" stroke="#D90000" strokeWidth={1.4}/>
      <text x={x} y={y + 4} textAnchor="middle" fontSize={10} fill="#D90000" fontWeight={700}>{letter}</text>
    </g>
  );
}

function TableSettingDiagram() {
  const s = "#333";
  return (
    <div className="mb-4">
      <svg viewBox="0 0 760 530" width="100%" style={{ display: "block", maxWidth: 760 }} role="img" aria-label="formal dinner place setting">
        <rect width="760" height="530" fill="white" rx="4" stroke="#EBEBEB" strokeWidth="1"/>
        <text x="380" y="26" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0A0A0A">formal dinner setting</text>

        {/* ── NAPKIN — far left ── */}
        <rect x="38" y="182" width="50" height="160" rx="2" fill="#F0EDE6" stroke="#B8B0A4" strokeWidth="1.5"/>
        <line x1="38" y1="202" x2="88" y2="202" stroke="#C0B8B0" strokeWidth="0.8"/>
        <text x="63" y="360" textAnchor="middle" fontSize="9" fill={s}>Napkin</text>

        {/* ── FISH FORK — outermost left ── */}
        <line x1="122" y1="382" x2="122" y2="218" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="122" y1="218" x2="122" y2="198" stroke={s} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="117" y1="198" x2="117" y2="184" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="121" y1="196" x2="121" y2="182" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="125" y1="196" x2="125" y2="182" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <text x="122" y="396" textAnchor="middle" fontSize="9" fill={s}>Fish fork</text>

        {/* ── SALAD/APPETIZER FORK ── */}
        <line x1="148" y1="386" x2="148" y2="210" stroke={s} strokeWidth="1.9" strokeLinecap="round"/>
        <line x1="148" y1="210" x2="148" y2="188" stroke={s} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="143" y1="188" x2="143" y2="172" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="147" y1="186" x2="147" y2="170" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="151" y1="186" x2="151" y2="170" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="155" y1="188" x2="155" y2="172" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <text x="148" y="400" textAnchor="middle" fontSize="9" fill={s}>Salad fork</text>

        {/* ── DINNER FORK ── */}
        <line x1="178" y1="390" x2="178" y2="200" stroke={s} strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="178" y1="200" x2="178" y2="176" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="172" y1="176" x2="172" y2="158" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="176" y1="174" x2="176" y2="156" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="180" y1="174" x2="180" y2="156" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="184" y1="176" x2="184" y2="158" stroke={s} strokeWidth="1.4" strokeLinecap="round"/>
        <text x="178" y="404" textAnchor="middle" fontSize="9" fill={s}>Dinner fork</text>

        {/* ── SERVICE PLATE + SHOW PLATE ── */}
        <circle cx="360" cy="268" r="118" fill="#F5F2EC" stroke="#C0B8B0" strokeWidth="1.5"/>
        <circle cx="360" cy="268" r="94" fill="white" stroke={s} strokeWidth="2"/>
        <circle cx="360" cy="268" r="74" fill="none" stroke={s} strokeWidth="0.7"/>
        <text x="360" y="274" textAnchor="middle" fontSize="10" fontWeight="600" fill="#888">Service plate</text>

        {/* ── SOUP BOWL on show plate ── */}
        <circle cx="360" cy="252" r="52" fill="#FAFAF8" stroke={s} strokeWidth="1.4"/>
        <circle cx="360" cy="252" r="40" fill="white" stroke="#CCCCCC" strokeWidth="0.8"/>
        <text x="360" y="256" textAnchor="middle" fontSize="9" fill="#888">Soup bowl</text>

        {/* ── DINNER KNIFE ── */}
        <line x1="540" y1="390" x2="540" y2="178" stroke={s} strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M540 178 Q530 190 528 210 L540 214" stroke={s} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="540" y="404" textAnchor="middle" fontSize="9" fill={s}>Dinner knife</text>

        {/* ── FISH KNIFE ── */}
        <line x1="568" y1="386" x2="568" y2="196" stroke={s} strokeWidth="1.9" strokeLinecap="round"/>
        <path d="M568 196 Q558 206 556 224 L568 228" stroke={s} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <text x="568" y="400" textAnchor="middle" fontSize="9" fill={s}>Fish knife</text>

        {/* ── TEASPOON ── */}
        <line x1="596" y1="382" x2="596" y2="210" stroke={s} strokeWidth="1.7" strokeLinecap="round"/>
        <ellipse cx="596" cy="196" rx="8" ry="12" fill="none" stroke={s} strokeWidth="1.4"/>
        <text x="596" y="396" textAnchor="middle" fontSize="9" fill={s}>Teaspoon</text>

        {/* ── SOUP SPOON ── */}
        <line x1="624" y1="382" x2="624" y2="206" stroke={s} strokeWidth="1.7" strokeLinecap="round"/>
        <ellipse cx="624" cy="190" rx="10" ry="15" fill="none" stroke={s} strokeWidth="1.5"/>
        <text x="624" y="396" textAnchor="middle" fontSize="9" fill={s}>Soup spoon</text>

        {/* ── BREAD PLATE + BUTTER KNIFE — upper left ── */}
        <circle cx="168" cy="122" r="42" fill="#F5F2EC" stroke="#C0B8B0" strokeWidth="1.3"/>
        <circle cx="168" cy="122" r="32" fill="white" stroke={s} strokeWidth="1"/>
        <line x1="184" y1="138" x2="152" y2="106" stroke={s} strokeWidth="2" strokeLinecap="round"/>
        <path d="M152 106 Q147 111 154 118 L159 113" stroke={s} strokeWidth="1" fill="none"/>
        <text x="128" y="100" textAnchor="middle" fontSize="9" fill={s}>Bread plate</text>
        <text x="172" y="158" textAnchor="middle" fontSize="9" fill={s}>Bread knife</text>

        {/* ── PLACE CARD ── */}
        <rect x="264" y="76" width="70" height="44" rx="2" fill="white" stroke={s} strokeWidth="1.3"/>
        <text x="299" y="102" textAnchor="middle" fontSize="8" fill="#888">Mr. Smith</text>
        <text x="264" y="68" textAnchor="start" fontSize="9" fill={s}>Place card</text>

        {/* ── DESSERT SPOON — horizontal above plate ── */}
        <line x1="262" y1="148" x2="460" y2="148" stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
        <ellipse cx="270" cy="148" rx="13" ry="7" fill="none" stroke={s} strokeWidth="1.4"/>
        <text x="360" y="138" textAnchor="middle" fontSize="9" fill={s}>Dessert spoon</text>

        {/* ── DESSERT FORK — horizontal above plate ── */}
        <line x1="262" y1="166" x2="460" y2="166" stroke={s} strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="448" y1="160" x2="462" y2="160" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="448" y1="166" x2="464" y2="166" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="448" y1="172" x2="462" y2="172" stroke={s} strokeWidth="1.2" strokeLinecap="round"/>
        <text x="360" y="182" textAnchor="middle" fontSize="9" fill={s}>Dessert fork</text>

        {/* ── WATER GLASS ── */}
        <circle cx="546" cy="104" r="32" fill="none" stroke={s} strokeWidth="2"/>
        <circle cx="546" cy="104" r="23" fill="none" stroke={s} strokeWidth="0.5"/>
        <text x="520" y="64" textAnchor="middle" fontSize="9" fill={s}>Water</text>
        <text x="520" y="76" textAnchor="middle" fontSize="9" fill={s}>glass</text>

        {/* ── RED WINE GLASS ── */}
        <circle cx="610" cy="82" r="26" fill="none" stroke={s} strokeWidth="1.6"/>
        <circle cx="610" cy="82" r="18" fill="none" stroke={s} strokeWidth="0.5"/>
        <text x="640" y="70" textAnchor="start" fontSize="9" fill={s}>Red wine</text>

        {/* ── WHITE WINE GLASS ── */}
        <circle cx="648" cy="116" r="22" fill="none" stroke={s} strokeWidth="1.4"/>
        <circle cx="648" cy="116" r="15" fill="none" stroke={s} strokeWidth="0.4"/>
        <text x="672" y="116" textAnchor="start" fontSize="9" fill={s}>White</text>
        <text x="672" y="128" textAnchor="start" fontSize="9" fill={s}>wine</text>

        {/* ── CUP & SAUCER ── */}
        <ellipse cx="680" cy="310" rx="36" ry="9" fill="#F5F2EC" stroke="#C0B8B0" strokeWidth="1.2"/>
        <circle cx="680" cy="293" r="25" fill="white" stroke={s} strokeWidth="1.4"/>
        <circle cx="680" cy="293" r="17" fill="none" stroke={s} strokeWidth="1"/>
        <line x1="705" y1="293" x2="715" y2="301" stroke={s} strokeWidth="1.8" strokeLinecap="round"/>
        <text x="680" y="336" textAnchor="middle" fontSize="9" fill={s}>Cup &amp;</text>
        <text x="680" y="347" textAnchor="middle" fontSize="9" fill={s}>saucer</text>

        {/* footer */}
        <line x1="28" y1="468" x2="732" y2="468" stroke="#EBEBEB" strokeWidth="1"/>
        <text x="380" y="484" textAnchor="middle" fontSize="8.5" fill="#999" fontStyle="italic">work from outside in · fish course before meat · blade always faces the plate</text>
        <text x="380" y="498" textAnchor="middle" fontSize="8" fill="#D90000">the koolture group</text>
      </svg>
    </div>
  );
}


// ─── utensils diagram (ch09) ─────────────────────────────────────────────────

function UtensilsDiagram() {
  const plate = (cx: number, cy: number) => (
    <g>
      <circle cx={cx} cy={cy} r={60} fill="#E8E4DC" stroke="#B0A898" strokeWidth="1.5"/>
      <circle cx={cx} cy={cy} r={48} fill="white" stroke="#888" strokeWidth="1.2"/>
      <circle cx={cx} cy={cy} r={36} fill="none" stroke="#BBB" strokeWidth="0.6"/>
    </g>
  );
  const sc = "#555";
  return (
    <div className="mb-8">
      <svg viewBox="0 0 760 300" width="100%" style={{ display: "block", maxWidth: 760 }} role="img" aria-label="table etiquette utensil signals">
        <rect width="760" height="300" fill="white" rx="4" stroke="#EBEBEB" strokeWidth="1"/>
        <text x="380" y="26" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0A0A0A" letterSpacing="0.5">table etiquette</text>

        {/* 5 plates evenly spaced: cx = 76, 228, 380, 532, 684 */}

        {/* ══ 1. PAUSE — fork ~8 o'clock, knife ~4 o'clock, tips inside plate ══ */}
        {plate(76, 138)}
        <g transform="rotate(-38 76 138)">
          <line x1="76" y1="96" x2="76" y2="166" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="71" y1="96" x2="71" y2="83" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="75" y1="94" x2="75" y2="81" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="79" y1="94" x2="79" y2="81" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
        </g>
        <g transform="rotate(42 76 138)">
          <line x1="76" y1="96" x2="76" y2="166" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M76 96 Q70 104 69 116 L76 119" stroke={sc} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </g>
        <text x="76" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A0A0A">pause</text>
        <text x="76" y="236" textAnchor="middle" fontSize="8.5" fill="#888">i am not finished</text>

        {/* ══ 2. READY FOR SECOND PLATE — both vertical, side by side ══ */}
        {plate(228, 138)}
        {/* fork left, tines up */}
        <line x1="220" y1="170" x2="220" y2="110" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="215" y1="110" x2="215" y2="97" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="219" y1="108" x2="219" y2="95" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="223" y1="108" x2="223" y2="95" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
        {/* knife right, blade faces fork */}
        <line x1="236" y1="170" x2="236" y2="110" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M236 110 Q230 118 229 130 L236 133" stroke={sc} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <text x="228" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A0A0A">ready for</text>
        <text x="228" y="236" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A0A0A">second plate</text>

        {/* ══ 3. EXCELLENT — fork horizontal across plate ══ */}
        {plate(380, 138)}
        <line x1="330" y1="138" x2="430" y2="138" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
        {/* tines right */}
        <line x1="420" y1="132" x2="432" y2="132" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="420" y1="138" x2="434" y2="138" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="420" y1="144" x2="432" y2="144" stroke={sc} strokeWidth="1.3" strokeLinecap="round"/>
        {/* knife below fork, also horizontal */}
        <line x1="330" y1="148" x2="428" y2="148" stroke={sc} strokeWidth="2" strokeLinecap="round"/>
        <path d="M330 148 Q330 142 338 140 L338 148" stroke={sc} strokeWidth="1.2" fill="none"/>
        <text x="380" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#D90000">excellent</text>
        <text x="380" y="236" textAnchor="middle" fontSize="8.5" fill="#888">food was delicious</text>

        {/* ══ 4. FINISHED — fork & knife parallel at ~4 o'clock ══ */}
        {plate(532, 138)}
        <g transform="rotate(28 532 138)">
          <line x1="524" y1="92" x2="524" y2="172" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="519" y1="92" x2="519" y2="79" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="523" y1="90" x2="523" y2="77" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="527" y1="90" x2="527" y2="77" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="538" y1="92" x2="538" y2="172" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M538 92 Q532 100 531 112 L538 115" stroke={sc} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        </g>
        <text x="532" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A0A0A">finished</text>
        <text x="532" y="236" textAnchor="middle" fontSize="8.5" fill="#888">handles at 4 o&apos;clock</text>

        {/* ══ 5. DON'T LIKE — fork & knife crossed in X ══ */}
        {plate(684, 138)}
        {/* fork: top-left to bottom-right */}
        <line x1="652" y1="100" x2="716" y2="176" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="646" y1="102" x2="658" y2="98" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="649" y1="97" x2="654" y2="108" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="654" y1="95" x2="660" y2="106" stroke={sc} strokeWidth="1.2" strokeLinecap="round"/>
        {/* knife: top-right to bottom-left, blade faces in */}
        <line x1="716" y1="100" x2="652" y2="176" stroke={sc} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M716 100 Q712 108 706 112 L700 106" stroke={sc} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
        <text x="684" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0A0A0A">don&apos;t like</text>
        <text x="684" y="236" textAnchor="middle" fontSize="8.5" fill="#888">crossed X on plate</text>

        {/* footer */}
        <line x1="28" y1="256" x2="732" y2="256" stroke="#EBEBEB" strokeWidth="1"/>
        <text x="380" y="270" textAnchor="middle" fontSize="8.5" fill="#999" fontStyle="italic">these signals communicate with your server — no words needed</text>
      </svg>
    </div>
  );
}



export default function EtiquetteManualPage() {
  const red = "#D90000";
  const ink = "#0A0A0A";
  const dim = "#5A5A5A";

  return (
    <div className="min-h-screen font-galano" style={{ backgroundColor: "#FFFFFF", color: ink }}>

      {/* ── header ── */}
      <header
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #EBEBEB" }}
      >
        <Link href="/dashboard" className="flex items-center gap-2 text-sm transition-colors" style={{ color: dim }}>
          <ArrowLeft className="w-4 h-4" />
          back
        </Link>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <KoolLogo size="sm" inverted={true} />
        </Link>
        <a
          href="/etiquette-manual.pdf"
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 border transition-opacity hover:opacity-80"
          style={{ borderColor: red, color: red, letterSpacing: "0.06em" }}
        >
          <Download className="w-3.5 h-3.5" />
          download pdf
        </a>
      </header>

      {/* ── hero ── */}
      <div className="px-6 py-20 text-center" style={{ borderBottom: "1px solid #EBEBEB" }}>
        <p className="text-xs font-bold mb-4" style={{ color: red, letterSpacing: "0.22em" }}>
          exclusive resource · the koolture group
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-none" style={{ color: ink }}>
          the kool event<br />etiquette manual
        </h1>
        <p className="text-sm md:text-base max-w-lg mx-auto mt-4 leading-relaxed" style={{ color: dim }}>
          the definitive guide to extraordinary events — for hosts, planners, and guests who understand that how you do anything is how you do everything
        </p>
        <p className="text-xs mt-5" style={{ color: "#AAAAAA", letterSpacing: "0.05em" }}>
          by paula mescolin · founder, the koolture group
        </p>
      </div>

      {/* ── chapter grid (TOC) ── */}
      <div className="max-w-6xl mx-auto px-6 py-16" style={{ borderBottom: "1px solid #EBEBEB" }}>
        <p className="text-xs font-bold mb-8" style={{ color: red, letterSpacing: "0.22em" }}>25 chapters</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chapters.map(({ num, id, title, Illus }) => (
            <a
              key={id}
              href={`#${id}`}
              className="group flex items-center gap-4 p-4 rounded-sm transition-shadow hover:shadow-md"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #EBEBEB", color: ink }}
            >
              <div className="shrink-0" style={{ color: red }}>
                <Illus />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold mb-0.5" style={{ color: red }}>{num}</span>
                <span className="block text-sm leading-snug" style={{ color: ink }}>{title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── main content ── */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">

        {/* sticky sidebar nav */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-bold mb-4" style={{ color: red, letterSpacing: "0.2em" }}>contents</p>
            <nav className="space-y-0.5">
              {chapters.map(({ num, id, title }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-baseline gap-2 py-1 text-xs transition-colors group"
                  style={{ color: "#999" }}
                >
                  <span className="font-bold shrink-0" style={{ color: red }}>{num}</span>
                  <span className="group-hover:text-black transition-colors leading-snug">{title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* content column */}
        <main className="flex-1 min-w-0 max-w-3xl">

          {/* ── preface ── */}
          <div className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <p className="text-xs font-bold mb-6" style={{ color: red, letterSpacing: "0.2em" }}>a note before we begin</p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>
              this guide was born from hundreds of events. corporate galas and intimate dinners. embassy receptions and backyard celebrations. moments that worked, and moments that taught me everything.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>
              etiquette is not about being stiff. it&apos;s not about knowing which fork to use so that other people will think you&apos;re cultured. etiquette is about <em>presence</em>. it&apos;s about making every person in the room feel seen, honored, and welcome. it&apos;s the invisible architecture of an extraordinary event.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>
              welcome to the koolture of excellence.
            </p>
            <p className="font-bold text-sm" style={{ color: ink }}>— paula mescolin, founder of the koolture group (TKG)</p>
          </div>

          {/* ── 01 ── */}
          <section id="what-manners-actually-mean" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusHandshake /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>01</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>what manners actually mean</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>manners are not a performance. they are not a costume you put on when the cameras are rolling and take off when the car arrives.</p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>manners are the daily practice of treating other human beings as worthy of your full attention, your care, and your respect.</p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>emily post famously said that etiquette is not about rules — it&apos;s about <em>consideration</em>. i believe that. but i&apos;d go one step further: manners are a form of love. they are how we say, without words, <em>you matter. i see you. you are worth my best.</em></p>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>at a high-stakes event, a guest who is warmly greeted at the door feels entirely different about the evening than one who was left searching for their seat. manners are not elite — they are available to every person who chooses to be intentional about how they show up.</p>
            <blockquote className="pl-5 py-1 mb-4" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed" style={{ color: dim }}>"manners are the visible reflection of your invisible character. when you walk into a room knowing how to conduct yourself, you give yourself permission to be fully present — and that is when the real magic happens."</p>
            </blockquote>
          </section>

          {/* ── 02 ── */}
          <section id="the-foundational-dos-and-donts" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusCheckX /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>02</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the foundational do&apos;s and don&apos;ts</h2>
              </div>
            </div>
            <p className="text-xs font-bold mb-4" style={{ color: red, letterSpacing: "0.14em" }}>do&apos;s — the non-negotiables</p>
            <ul className="space-y-3 mb-8">
              {[
                ["arrive prepared", "know the event, the host, and at least three people you plan to speak with before you arrive."],
                ["silence your phone completely", "when greeting hosts, at the dinner table, and during speeches or ceremonies."],
                ["introduce yourself clearly", "your name, spoken at a moderate pace, with eye contact."],
                ["write things down", "names, commitments, follow-ups — away from the table if needed."],
                ["eat before a networking event", "if you're not sure food will be provided."],
                ["accept hospitality graciously", "'no thank you' is sufficient. a lengthy explanation of your diet is not required."],
                ["send a thank you", "within 24–48 hours. always."],
                ["dress to the specified code", "it is a form of respect to the host."],
                ["stand when being introduced", "to someone older, more senior, or of higher rank."],
                ["use names", "people love to hear their own name. use it twice in a new conversation."],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex gap-3 text-sm" style={{ color: dim }}>
                  <span className="shrink-0 mt-0.5 font-bold" style={{ color: red }}>✓</span>
                  <span><strong style={{ color: ink }}>{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-4" style={{ color: ink, letterSpacing: "0.14em" }}>don&apos;ts — the ones that will cost you</p>
            <ul className="space-y-3">
              {[
                ["don't arrive early to a hosted dinner", "it puts the host in an impossible position. five minutes after the stated time is ideal."],
                ["don't monopolize the host", "greet them, express your gratitude, and let them circulate."],
                ["don't talk over anyone", "interrupt, or finish someone's sentence."],
                ["don't drink excessively", "at professional or formal events. ever."],
                ["don't discuss money, religion, or politics", "unless you know your audience extremely well — and even then, read the room."],
                ["don't photograph the table", "without the host's acknowledgment."],
                ["don't bring uninvited guests", "without prior approval."],
                ["don't rsvp yes and not show up", "this is one of the great etiquette crimes of our time."],
                ["don't ignore the support staff", "servers, valets, coat check attendants deserve the same courtesy as the ceo."],
                ["don't look around the room while someone is talking to you", "it is a dismissal dressed up as nothing."],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex gap-3 text-sm" style={{ color: dim }}>
                  <span className="shrink-0 mt-0.5" style={{ color: "#BBBBBB" }}>✗</span>
                  <span><strong style={{ color: ink }}>{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 03 ── */}
          <section id="how-to-greet-guests" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusDoor /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>03</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>how to greet guests</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the greeting sets the entire emotional temperature of the event. it is the first impression, the first feeling, the first promise you make to your guest.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the host&apos;s responsibility</p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>as a host, you should be <strong style={{ color: ink }}>at the entrance</strong> for the first 20–30 minutes of any formal event. guests should never walk into an empty doorway, unsure if they&apos;re in the right place.</p>
            <p className="text-xs font-bold mb-3" style={{ color: ink, letterSpacing: "0.1em" }}>greeting sequence</p>
            <ol className="space-y-2 mb-6">
              {["eye contact before they reach you", "smile — real, warm, not performative", "step forward to meet them (never wait to be approached)", "call them by name if you know them", "handshake or embrace (read the relationship)", "introduce them to someone nearby immediately — never leave a new arrival standing alone"].map((s, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: dim }}>
                  <span className="font-black shrink-0 w-5" style={{ color: red }}>{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm mb-6" style={{ color: dim }}><strong style={{ color: ink }}>never:</strong> a limp handshake. a half-hug to someone you&apos;ve just met. a greeting from across the room with a wave. these all communicate: <em>you&apos;re not a priority.</em></p>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed" style={{ color: dim }}>"i&apos;ve watched the entire energy of an event shift because the host stood at the door and looked every single guest in the eye. you cannot overestimate what it means to truly be seen when you walk in."</p>
            </blockquote>
          </section>

          {/* ── 04 ── */}
          <section id="addressing-dignitaries" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusCrown /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>04</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>addressing dignitaries</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>getting the address right is not about being stuffy. it&apos;s about honoring the work and service of the individual in front of you.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>government & elected officials</p>
            <div className="mb-6 rounded-sm overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              {[
                ["the president", "mr./madam president", "the president of the united states"],
                ["vice president", "mr./madam vice president", "the honorable [full name]"],
                ["senator", "senator [last name]", "the honorable [full name], united states senator"],
                ["governor", "governor [last name]", "the honorable [full name], governor of [state]"],
                ["mayor", "mayor [last name]", "the honorable [full name], mayor of [city]"],
                ["judge", "your honor / judge [last name]", "the honorable [full name]"],
              ].map(([title, spoken, written], i) => (
                <div key={title} className="grid grid-cols-3 gap-4 px-4 py-2.5 text-xs" style={{ backgroundColor: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF", borderBottom: "1px solid #F0F0F0" }}>
                  <span style={{ color: dim }}>{title}</span>
                  <span style={{ color: ink, fontWeight: 600 }}>{spoken}</span>
                  <span style={{ color: "#999" }}>{written}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>religious figures</p>
            <div className="mb-6 rounded-sm overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              {[
                ["pope", "your holiness"],
                ["cardinal", "your eminence"],
                ["bishop", "your excellency or bishop [last name]"],
                ["rabbi", "rabbi [last name]"],
                ["reverend / pastor", "reverend [last name] or pastor [last name]"],
              ].map(([figure, address], i) => (
                <div key={figure} className="flex justify-between px-4 py-2.5 text-xs" style={{ backgroundColor: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF", borderBottom: "1px solid #F0F0F0" }}>
                  <span style={{ color: dim }}>{figure}</span>
                  <span style={{ color: ink, fontWeight: 600 }}>{address}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>royalty & nobility</p>
            <div className="mb-6 rounded-sm overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              {[
                ["king / queen", "your majesty (first reference), then sir or ma'am"],
                ["prince / princess", "your royal highness"],
                ["duke / duchess", "your grace"],
                ["lord / lady", "my lord or my lady"],
              ].map(([title, address], i) => (
                <div key={title} className="flex justify-between px-4 py-2.5 text-xs" style={{ backgroundColor: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF", borderBottom: "1px solid #F0F0F0" }}>
                  <span style={{ color: dim }}>{title}</span>
                  <span style={{ color: ink, fontWeight: 600 }}>{address}</span>
                </div>
              ))}
            </div>
            <p className="text-sm italic" style={{ color: "#999" }}>the golden rule: when in doubt, default to the most formal address. you will never offend someone by showing more respect than necessary. you can offend by showing less.</p>
          </section>

          {/* ── 05 ── */}
          <section id="invitations-addressing-families-couples-individuals" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusEnvelope /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>05</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>invitations: addressing families, couples & individuals</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the invitation is the first tangible piece of your event that a guest receives. it signals everything about the occasion before they&apos;ve set foot in the room.</p>
            <div className="space-y-3 mb-8">
              {[
                ["married couple, same last name", "Mr. and Mrs. Paulo Mescolin", "traditionalist form — still the most formal and widely accepted"],
                ["married couple, different last names", "Ms. Paula Marques and Mr. Paulo Mescolin", "list the person with whom you have the primary relationship first"],
                ["same-sex couples", "follow the same rule — alphabetically or by strength of relationship", "either name may come first"],
                ["couple, not married", "Ms. Paula Marques\nMr. Paulo Mescolin (separate lines)", "with your closer contact listed first"],
                ["family with children (inner envelope)", "Mr. and Mrs. Mescolin\nMaria, Pedro", "children listed by age, oldest first — only if invited"],
                ["single, with guest intended", "Ms. Paula Marques and Guest", "the 'and Guest' is an explicit invitation"],
                ["single, no guest intended", "Ms. Paula Marques", "the absence of 'and Guest' is intentional and clear"],
              ].map(([context, format, note]) => (
                <div key={context} className="p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <p className="text-xs font-bold mb-1" style={{ color: red }}>{context}</p>
                  <p className="font-medium text-sm mb-1 whitespace-pre-line" style={{ color: ink }}>{format}</p>
                  <p className="text-xs" style={{ color: "#AAA" }}>{note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the anatomy of a formal invitation</p>
            <ol className="space-y-2 mb-6">
              {[
                'the host line — "the koolture group requests the honor of your presence..."',
                "the occasion line — what is being celebrated or commemorated",
                'the date and time — spelled out formally ("saturday, the twenty-first of june")',
                "the location — full venue name and address",
                "the dress code — lower right corner of the invitation",
                "rsvp information — separate enclosure card or lower left corner",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: dim }}>
                  <span className="font-black shrink-0 w-5" style={{ color: red }}>{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed text-sm" style={{ color: dim }}>"an invitation is a promise. it says: i thought of you specifically. you were chosen for this room. make it feel that way."</p>
            </blockquote>
          </section>

          {/* ── 06 ── */}
          <section id="seating-rules-that-actually-work" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusChair /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>06</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>seating rules that actually work</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>seating is strategy. it is one of the most underestimated tools a host has to shape the energy, conversation, and outcome of an event.</p>
            <div className="space-y-3 mb-8">
              {[
                "never seat people randomly at a formal dinner — every seat assignment is a curatorial decision.",
                "separate couples at dinner parties of 8 or more. seating is your opportunity to create new connections.",
                "honor the guest of honor — they sit at the host's right. the second guest of honor sits at the host's left.",
                "seat enemies apart and strategically. if you know two guests have tension, you are responsible for managing the proximity.",
                "consider mobility, hearing, and sight lines when assigning seats for elderly guests or those with accessibility needs.",
              ].map((rule, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-sm text-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <span className="font-black shrink-0 text-xs mt-0.5" style={{ color: red }}>rule {i + 1}</span>
                  <span style={{ color: dim }}>{rule}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>escort cards vs. place cards</p>
            <p className="text-sm mb-3" style={{ color: dim }}><strong style={{ color: ink }}>escort cards</strong> (at the entrance) tell guests their table. <strong style={{ color: ink }}>place cards</strong> (on the table) tell guests their specific seat. at a formal event, both are required. at semi-formal dinners, place cards alone are sufficient.</p>
          </section>

          {/* ── 07 ── */}
          <section id="the-run-of-show" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusClock /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>07</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the run of show</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the run of show (ros) is the backbone of every professional event. it is not a suggestion. it is a contract with your guests&apos; time.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>structure of a professional ros</p>
            <ul className="space-y-2 mb-6">
              {["event name, date, venue, production contact", "time-stamped sequence — every element, every transition, every speaker", "responsible party for each line item", "buffer time built in (typically 10–15 minutes across a 3-hour event)", "contingency notes — what happens if [x] runs over or [y] doesn't arrive"].map((item) => (
                <li key={item} className="flex gap-3 text-sm" style={{ color: dim }}>
                  <span style={{ color: red }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>timing etiquette</p>
            <div className="space-y-3 mb-6">
              {[
                ["for speakers", "arrive early. meet your av contact. know your time limit. respect it."],
                ["for performers", "be in place 30 minutes before your call time. what happens offstage reflects on the event."],
                ["for hosts & emcees", "your energy sets the tone. never apologize on stage for things going wrong. pivot with grace."],
              ].map(([role, rule]) => (
                <div key={role} className="p-3 rounded-sm text-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <span className="font-bold" style={{ color: red }}>{role}</span>
                  <span style={{ color: dim }}> — {rule}</span>
                </div>
              ))}
            </div>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed" style={{ color: dim }}>"the best run of show is the one no one notices — because everything flowed so beautifully, the guests thought it was effortless. that&apos;s the goal."</p>
            </blockquote>
          </section>

          {/* ── 08 ── with full diagram ── */}
          <section id="how-to-set-a-table" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusPlate /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>08</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>how to set a table</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-8" style={{ color: dim }}>the placement of every element at a formal table communicates intentionality before a single word is spoken. work from outside in — the outermost utensils are always used first.</p>

            {/* ── informal diagram ── */}
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>informal place setting</p>
            <div className="mb-8 rounded-sm overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <InformalSettingDiagram />
            </div>

            {/* ── formal diagram ── */}
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>formal dinner setting</p>
            <div className="mb-8 rounded-sm overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <TableSettingDiagram />
            </div>

            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>informal place setting details</p>
            <div className="space-y-1.5 mb-6">
              {[
                ["left of plate", "fork"],
                ["right of plate", "knife (blade facing plate) and spoon"],
                ["above plate", "dessert fork and spoon (horizontal)"],
                ["top right", "water glass, then wine glass(es) to the right and slightly lower"],
                ["plate center", "charger or dinner plate"],
                ["upper left", "bread plate with butter knife resting diagonally"],
                ["napkin", "left of the forks, or on the charger — never tucked under the plate"],
              ].map(([pos, items]) => (
                <div key={pos} className="flex gap-3 py-2 text-sm" style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <span className="w-36 shrink-0" style={{ color: "#AAA" }}>{pos}</span>
                  <span style={{ color: dim }}>{items}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the non-negotiables</p>
            <ul className="space-y-2 text-sm">
              {["no utensil should be more than 1 inch from the edge of the table", "glasses are placed at the tip of the dinner knife", "no item should touch another — spacing is part of the presentation", "napkin goes to the left of the forks, or on the charger — never tucked under the plate"].map((rule) => (
                <li key={rule} className="flex gap-3" style={{ color: dim }}>
                  <span style={{ color: red }}>·</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 09 ── with full diagram ── */}
          <section id="the-art-of-using-utensils" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusCrossedUtensils /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>09</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the art of using utensils</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-8" style={{ color: dim }}>your utensils are a silent language. every position, every angle, every pause communicates something to the people around you — and to the service team.</p>

            {/* ── full diagram ── */}
            <div className="mb-8 rounded-sm overflow-hidden" style={{ border: "1px solid #EBEBEB" }}>
              <UtensilsDiagram />
            </div>

            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the two schools</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <p className="font-bold text-sm mb-2" style={{ color: ink }}>american style</p>
                <p className="text-sm" style={{ color: dim }}>cut food, place knife on plate, switch fork to right hand to eat. clean but involves repeated switching.</p>
              </div>
              <div className="p-4 rounded-sm" style={{ backgroundColor: "#FFFAFA", border: "1px solid #D90000" }}>
                <p className="font-bold text-sm mb-2" style={{ color: red }}>continental (european) style</p>
                <p className="text-sm" style={{ color: dim }}>fork stays in left hand (tines down), knife in right. eat as you cut. considered the more refined approach internationally — and the standard at formal events.</p>
              </div>
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>specific utensils</p>
            <div className="space-y-2 mb-6">
              {[
                ["soup", "spoon moves away from you. sip from the side — never slurp. tip the bowl away from you to get the last spoonfuls."],
                ["fish", "use the fish knife and fish fork, both provided in formal settings."],
                ["shellfish", "oyster fork is placed to the right of the soup spoon, outside all other utensils."],
                ["bread", "always break with your hands, never cut. butter one piece at a time."],
              ].map(([item, rule]) => (
                <div key={item} className="flex gap-4 py-2 text-sm" style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <span className="w-24 shrink-0 font-medium" style={{ color: ink }}>{item}</span>
                  <span style={{ color: dim }}>{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 10 ── */}
          <section id="etiquette-for-ladies" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusFlower /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>10</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>etiquette for ladies</h2>
              </div>
            </div>
            <p className="italic leading-relaxed mb-6" style={{ color: dim }}>grace is not weakness. it is the most powerful form of presence.</p>
            <ul className="space-y-3 text-sm mb-6">
              {[
                "your posture is your first statement. enter every room with shoulders back, chin level. not stiff — poised.",
                "your entrance should be unhurried. rushing communicates panic. a measured pace communicates authority.",
                "when seated at a table, sit close to the edge — back straight, not resting against the chair at formal events.",
                "your handbag belongs on your lap, on the back of your chair, or on a bag hook — never on the table or the floor.",
                "when a gentleman rises to seat you, allow it. it is not a diminishment. it is an honor that you receive with grace.",
                "your phone is invisible at a formal table. no exceptions.",
                "in conversation: listen fully. do not interrupt. do not over-explain.",
                "your scent should arrive with you, not before you. heavy fragrance at events is inconsiderate.",
                "accept compliments with a simple, warm 'thank you.' deflecting compliments is a form of rejection.",
                "if your heel catches, your dress tears, or your glass spills — handle it calmly, make light of it briefly, and move on. the room will follow your energy.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3" style={{ color: dim }}>
                  <span style={{ color: red }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed text-sm" style={{ color: dim }}>"a woman with etiquette doesn&apos;t need to demand respect. she&apos;s already communicated that she expects it — and why she deserves it."</p>
            </blockquote>
          </section>

          {/* ── 11 ── */}
          <section id="etiquette-for-gentlemen" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusBowTie /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>11</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>etiquette for gentlemen</h2>
              </div>
            </div>
            <p className="italic leading-relaxed mb-6" style={{ color: dim }}>a gentleman is not defined by the cut of his suit. he is defined by the quality of his attention.</p>
            <ul className="space-y-3 text-sm">
              {[
                "dress with intention — a gentleman's attire communicates respect for the event and the host. when in doubt, err formal.",
                "arrive on time. a gentleman does not make people wait.",
                "rise when introduced to women, elders, dignitaries, or anyone deserving of recognition.",
                "open doors — for everyone. this is not dated. this is decency.",
                "pull out the chair for your companion at a formal dinner.",
                "make the introduction when you are the common denominator between two people — never let a silence stretch while people wait.",
                "at the table, wait until all guests are seated and served before beginning to eat.",
                "do not speak over, across, or around the person next to you. give your attention wholly.",
                "your handshake is your first impression. firm, brief, direct eye contact.",
                "when a woman excuses herself from the table, rise slightly in acknowledgment. when she returns, do the same.",
                "your phone is in your pocket. it stays there.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3" style={{ color: dim }}>
                  <span style={{ color: red }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 12 ── */}
          <section id="the-right-verbiage" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusSpeechBubble /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>12</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the right verbiage</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>words are architecture. choose them carefully.</p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>phrases that elevate</p>
                <ul className="space-y-2 text-sm">
                  {[
                    ['"it\'s a pleasure to meet you"', "more intentional than 'nice to meet you'"],
                    ['"please allow me to introduce..."', "formal, deliberate, respectful"],
                    ['"i\'d be honored"', "accepts an invitation with warmth and intention"],
                    ['"how may i assist you?"', "better than 'can i help you?'"],
                    ['"forgive me, i didn\'t catch your name"', "gracious recovery"],
                    ['"what an extraordinary evening"', "specific gratitude to a host"],
                  ].map(([phrase, note]) => (
                    <li key={phrase}>
                      <em style={{ color: ink }}>{phrase}</em>
                      <span className="block text-xs mt-0.5" style={{ color: "#AAA" }}>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold mb-3" style={{ color: ink, letterSpacing: "0.14em" }}>phrases to retire</p>
                <ul className="space-y-2 text-sm">
                  {[
                    ['"no problem"', '"of course" or "my pleasure"'],
                    ['"you guys"', '"you all," "everyone," or by name'],
                    ['"honestly" as a filler', 'implies you aren\'t always honest'],
                    ['"i\'ll try"', 'commit or decline'],
                    ['"i know, right?"', 'dismisses the other person\'s thought'],
                  ].map(([bad, fix]) => (
                    <li key={bad}>
                      <span style={{ color: "#CCC", textDecoration: "line-through" }}>{bad}</span>
                      <span style={{ color: dim }}> → {fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>event-specific verbiage</p>
            <div className="space-y-2 text-sm">
              {[
                ["invitations", 'use "requests the honor of your presence" for ceremonies, "requests the pleasure of your company" for social events. these distinctions matter.'],
                ["toasts", "open by welcoming the room, state your relationship to the honoree, share one specific story or quality, close with a wish. never apologize for what you're about to say."],
                ["introductions on stage", "name, title, organization, one specific achievement. end with applause cue. practice it."],
              ].map(([context, rule]) => (
                <div key={context} className="flex gap-4 py-2.5" style={{ borderBottom: "1px solid #F5F5F5" }}>
                  <span className="font-bold w-36 shrink-0" style={{ color: ink }}>{context}</span>
                  <span style={{ color: dim }}>{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 13 ── */}
          <section id="chivalry-why-it-still-matters" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusShield /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>13</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>chivalry — why it still matters</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>chivalry was never about hierarchy. it was about protection and honor in practice.</p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>in its modern form, chivalry is simply this: <strong style={{ color: ink }}>noticing what someone needs and providing it before they have to ask.</strong></p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>it is a gentleman who stands when a woman enters the room — not because she can&apos;t stand on her own, but because he recognizes that she is worth the gesture.</p>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>it is a woman who writes a handwritten note — not because email doesn&apos;t work, but because she knows that pen on paper says <em>i took time for you.</em></p>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>chivalry is not antiquated. chivalry is one of the most revolutionary acts in a world that has forgotten that the smallest courtesies carry the most weight.</p>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed" style={{ color: dim }}>"people remember how you made them feel. not your centerpieces. not your catering. how you made them feel. chivalry is the most precise tool you have for getting that right."</p>
            </blockquote>
          </section>

          {/* ── 14 ── */}
          <section id="the-importance-of-being-on-time" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusPocketWatch /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>14</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the importance of being on time</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>punctuality is respect made visible. when you are late, you are communicating — whether you mean to or not — that your time is more valuable than the time of everyone waiting for you.</p>
            <div className="space-y-4">
              {[
                ["for guests", "arrive within 5–10 minutes of the stated time. for dinner parties: 5–10 minutes after is correct — arriving exactly on time puts pressure on the host. if you will be late: call or message the host in advance, not from the parking lot."],
                ["for hosts & planners", "program start should be honored within 10 minutes. build buffer into your timeline. do not communicate the buffer to speakers — it is yours, not theirs."],
                ["for speakers & presenters", "arrive at least 30 minutes before your speaking slot. speak to the av team before the program starts. end on time — every minute you run over is stolen from every person in that room."],
              ].map(([role, rule]) => (
                <div key={role} className="p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <p className="text-xs font-bold mb-2" style={{ color: red }}>{role}</p>
                  <p className="text-sm" style={{ color: dim }}>{rule}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 15 ── */}
          <section id="body-language-at-events" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusFigure /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>15</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>body language at events</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>your body speaks before your mouth opens. at events, everyone is watching — and most of them don&apos;t know it.</p>
            <div className="space-y-3 mb-6">
              {[
                ["the open stance", "feet shoulder-width apart, arms uncrossed, weight evenly distributed. the stance of someone comfortable in their environment and open to connection."],
                ["eye contact", "hold it for 3–4 seconds at a time in conversation. darting eyes communicate disinterest. too long communicates aggression. the 3–4 second rule is connection."],
                ["the handshake zone", "extend your hand into the space between you and the other person — not reaching toward them, not waiting. meet in the middle."],
                ["mirroring", "unconsciously, we mirror the body language of people we like and trust. consciously, you can use subtle mirroring to build rapport."],
              ].map(([concept, desc]) => (
                <div key={concept} className="p-3 rounded-sm text-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <strong style={{ color: ink }}>{concept}</strong>
                  <span style={{ color: dim }}> — {desc}</span>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: red, letterSpacing: "0.14em" }}>do</p>
                <ul className="space-y-1.5 text-sm">
                  {["angle your body toward the person speaking", "nod to show engagement", "use the person's name naturally", "smile with your eyes"].map(item => (
                    <li key={item} className="flex gap-2" style={{ color: dim }}><span style={{ color: red }}>✓</span>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold mb-2" style={{ color: ink, letterSpacing: "0.1em" }}>don&apos;t</p>
                <ul className="space-y-1.5 text-sm">
                  {["cross your arms (defensive)", "check your phone while in conversation", "stand with your back to the room", "hover at the edge of a space"].map(item => (
                    <li key={item} className="flex gap-2" style={{ color: "#AAA" }}><span>✗</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── 16 ── */}
          <section id="networking-with-intention" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusNetwork /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>16</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>networking with intention</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the word "networking" has been cheapened. what we&apos;re really talking about is <strong style={{ color: ink }}>cultivating meaningful relationships in concentrated time.</strong></p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>before you arrive</p>
            <ul className="space-y-2 mb-6 text-sm">
              {["identify three people you want to meet or reconnect with", "have your introduction ready: your name, your role, and one genuine question about the other person", "bring business cards or have a digital card ready (qr-based cards are increasingly standard at premium events)"].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the approach</p>
            <p className="text-sm mb-6" style={{ color: dim }}>never interrupt a closed conversation (two people facing each other directly). approach open groups (two people at an angle) by making eye contact and asking to join. lead with curiosity, not pitch. <em>"what brings you to this event?"</em> is better than <em>"let me tell you what i do."</em></p>
            <div className="p-4 rounded-sm mb-6" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="text-xs font-bold mb-2" style={{ color: red }}>the 2-minute rule</p>
              <p className="text-sm" style={{ color: dim }}>most first conversations at events should run 2–3 minutes before naturally transitioning or exchanging contact information. a meaningful 2-minute exchange leads to a follow-up. a rambling 15-minute conversation can close doors.</p>
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the graceful exit from a conversation</p>
            <p className="text-sm italic mb-6" style={{ color: dim }}>"i&apos;ve been looking forward to connecting with [name] — would you excuse me? i&apos;d love to continue this conversation — may i have your card?"</p>
            <p className="text-xs font-bold mb-2" style={{ color: red, letterSpacing: "0.14em" }}>the follow-up</p>
            <p className="text-sm" style={{ color: dim }}>follow up within 24 hours. be specific. reference something from your conversation. no generic "great to meet you." the connection was made at the event. the relationship is built the next day.</p>
          </section>

          {/* ── 17 ── */}
          <section id="gifting-with-grace" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusGift /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>17</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>gifting with grace</h2>
              </div>
            </div>
            <p className="italic leading-relaxed mb-6" style={{ color: dim }}>a gift is a symbol. it says: i thought of you when you weren&apos;t in front of me.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>host gifts</p>
            <p className="text-sm mb-6" style={{ color: dim }}>always bring a host gift to a private dinner. wine is appropriate only if you know the host&apos;s preferences. consider: artisan candles, curated chocolates, a book with a personal inscription, flowers in a vase (not requiring immediate arranging). <strong style={{ color: ink }}>do not bring</strong> a gift that requires immediate opening, preparation, or integration into the event.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>corporate & event gifts</p>
            <ul className="space-y-2 mb-6 text-sm">
              {["align with the brand and purpose of the event", "personalization dramatically increases perceived value", "avoid anything with your own logo at another person's event", "think useful + memorable — not expensive for the sake of it"].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>when you receive a gift</p>
            <p className="text-sm mb-6" style={{ color: dim }}>receive it with your full attention. if it&apos;s wrapped, ask whether the giver would like you to open it now. say something specific about what the gift represents to you — not just "thank you, i love it" but "this is so thoughtful — i know you remembered that i mentioned [x]."</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>gifting across cultures</p>
            <p className="text-sm mb-6" style={{ color: dim }}>in some cultures (many asian and middle eastern traditions), gifts are not opened immediately in front of the giver. in others, refusing a gift is deeply offensive. when in doubt, research or ask a cultural liaison in advance.</p>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed text-sm" style={{ color: dim }}>"the best gift you can give anyone at your event is the feeling that they were seen. everything else is beautiful decoration."</p>
            </blockquote>
          </section>

          {/* ── 18 ── */}
          <section id="the-thank-you-note" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusPen /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>18</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the thank you note</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>this section could be the most important in the entire guide.</p>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the thank you note is nearly extinct. which means that anyone who writes one is immediately extraordinary.</p>
            <div className="space-y-4 mb-6">
              {[
                ["timing", "within 24–48 hours of the event. within the week for gifts received."],
                ["medium", "handwritten, on quality stationery, is the gold standard. a thoughtful email is the acceptable alternative. a text is a last resort — and only for close relationships."],
                ["structure", "name the specific event or gift · say what it meant to you personally · reference something specific from the evening · express your hope for continued connection"],
              ].map(([rule, desc]) => (
                <div key={rule} className="flex gap-4 text-sm">
                  <span className="font-bold w-20 shrink-0" style={{ color: red }}>{rule}</span>
                  <span style={{ color: dim }}>{desc}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-sm italic text-sm mb-6" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB", borderLeft: `3px solid #DDDDDD` }}>
              <p style={{ color: dim }}>"dear paulo — last evening at the gala was genuinely one of the most beautifully curated events i&apos;ve attended this year. the way you opened the program with the children&apos;s choir set a tone that carried throughout the night. i left feeling inspired and honored to be included. please know that your thoughtfulness did not go unnoticed. warmly, paula."</p>
            </div>
            <p className="text-sm italic" style={{ color: "#AAA" }}>what never to write: a form letter. a copy-paste message. something that could have been written to anyone in the room.</p>
          </section>

          {/* ── 19 ── */}
          <section id="dress-codes-decoded" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusHanger /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>19</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>dress codes decoded</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>one of the most common sources of event anxiety — and one of the least addressed in etiquette guides — is the dress code.</p>

            {/* dress code elegance scale */}
            <div className="mb-8">
              <p className="text-xs font-bold mb-4" style={{ color: "#AAA", letterSpacing: "0.14em" }}>formality scale</p>
              <div className="grid grid-cols-1 gap-0 border" style={{ borderColor: "#EBEBEB" }}>
                {[
                  { code: "white tie", level: "ultra formal", icon: "◆", men: "tailcoat, white waistcoat, white bow tie", women: "full-length ball gown" },
                  { code: "black tie", level: "formal", icon: "◆", men: "tuxedo + black bow tie", women: "floor-length or elegant cocktail gown" },
                  { code: "black tie optional", level: "semi-formal", icon: "◈", men: "tuxedo or dark suit", women: "cocktail dress or formal gown" },
                  { code: "cocktail attire", level: "upscale casual", icon: "◇", men: "suit + tie", women: "knee-to-midi dress or elegant separates" },
                  { code: "smart casual", level: "elevated everyday", icon: "○", men: "collared shirt, no jeans, no sneakers", women: "polished separates or casual dress" },
                  { code: "resort casual", level: "relaxed elegant", icon: "○", men: "light fabrics, linen, open collar", women: "sundress or breezy separates, still intentional" },
                ].map(({ code, level, icon, men, women }, i, arr) => (
                  <div key={code} className="grid grid-cols-12 items-stretch" style={{ borderBottom: i < arr.length - 1 ? "1px solid #EBEBEB" : "none" }}>
                    {/* formality indicator */}
                    <div className="col-span-1 flex items-center justify-center py-4" style={{ backgroundColor: i < 2 ? "#0A0A0A" : i < 4 ? "#F5F5F5" : "#FAFAFA" }}>
                      <span style={{ color: i < 2 ? "#D90000" : "#CCC", fontSize: 16 }}>{icon}</span>
                    </div>
                    {/* dress code name */}
                    <div className="col-span-3 flex flex-col justify-center px-4 py-4" style={{ borderRight: "1px solid #EBEBEB" }}>
                      <p className="font-black text-sm leading-tight" style={{ color: ink }}>{code}</p>
                      <p className="text-xs mt-1" style={{ color: "#AAA" }}>{level}</p>
                    </div>
                    {/* men */}
                    <div className="col-span-4 px-4 py-4" style={{ borderRight: "1px solid #EBEBEB" }}>
                      <p className="text-xs font-bold mb-1" style={{ color: "#AAA", letterSpacing: "0.1em" }}>him</p>
                      <p className="text-sm" style={{ color: dim }}>{men}</p>
                    </div>
                    {/* women */}
                    <div className="col-span-4 px-4 py-4">
                      <p className="text-xs font-bold mb-1" style={{ color: "#D90000", letterSpacing: "0.1em" }}>her</p>
                      <p className="text-sm" style={{ color: dim }}>{women}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #EBEBEB, #D90000)" }}></div>
                <span className="text-xs" style={{ color: "#AAA" }}>casual</span>
                <span className="text-xs" style={{ color: "#D90000" }}>→</span>
                <span className="text-xs font-bold" style={{ color: "#0A0A0A" }}>ultra formal</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {[
                ["white tie", "ultra-formal", "men: tailcoats, white waistcoat, white bow tie · women: full-length ball gowns. rare outside state occasions and galas."],
                ["black tie", "formal", "men: tuxedo + black bow tie · women: floor-length or elegant cocktail gown. the standard formal event code."],
                ["black tie optional / creative black tie", "semi-formal", "men may wear a dark suit · women have more flexibility. 'creative' means fashion-forward interpretations."],
                ["cocktail attire", "upscale casual", "men: suit and tie · women: knee-to-midi dresses or elegant separates. the most common upscale code."],
                ["smart casual", "elevated everyday", "no jeans, no sneakers, no athletic wear. collared shirts for men. polished separates or casual dresses for women."],
                ["resort casual / garden party", "relaxed elegant", "light fabrics, warmer palettes — still intentional and polished."],
              ].map(([code, level, desc]) => (
                <div key={code} className="p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="font-bold text-sm" style={{ color: ink }}>{code}</p>
                    <span className="text-xs" style={{ color: "#AAA" }}>{level}</span>
                  </div>
                  <p className="text-sm" style={{ color: dim }}>{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold mb-2" style={{ color: red, letterSpacing: "0.14em" }}>the host&apos;s responsibility</p>
            <p className="text-sm" style={{ color: dim }}>always state the dress code on the invitation. the absence of a dress code causes more anxiety than any other element. if a guest calls to ask what to wear: answer directly. never say "whatever you&apos;re comfortable in" — it&apos;s not helpful.</p>
          </section>

          {/* ── 20 ── */}
          <section id="digital-etiquette" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusPhone /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>20</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>digital etiquette: phones, social media & photography</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>we have not collectively agreed on the rules for devices at events. that gap has produced some of the worst etiquette violations of our time. let&apos;s address it clearly.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>for guests: the phone rule</p>
            <div className="p-4 rounded-sm mb-6" style={{ backgroundColor: "#FAFAFA", border: `1px solid ${red}`, borderLeftWidth: "3px" }}>
              <p className="text-sm" style={{ color: dim }}>at a formal or business dinner: your phone is <strong style={{ color: ink }}>off the table</strong>. physically off the table. in your pocket, your bag, or the provided phone pouch. the "phone on the table face-down" is still a phone on the table. it still says: <em>you&apos;re not fully here.</em></p>
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>for hosts: setting the digital tone</p>
            <ul className="space-y-2 mb-6 text-sm">
              {["phone-free cards at each place setting — a simple, elegant card stating the policy", "a basket or pouch at the entrance for phones during dinner (make it a ritual, not a rule)", "a social media moment — designate a specific time for guests to photograph, then signal its end"].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>photography & social media</p>
            <ul className="space-y-2 text-sm">
              {["never post photos of other guests without their awareness", "never post ahead of the host's official release if it's a professional event", "guest photography: acceptable in social settings — never pointed at someone without their awareness", "never photograph during a eulogy, prayer, or private ceremony without explicit permission"].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
          </section>

          {/* ── 21 ── */}
          <section id="toasts-and-speeches" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusChampagne /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>21</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>toasts & speeches</h2>
              </div>
            </div>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>structure of a great toast</p>
            <ol className="space-y-2 mb-6">
              {[
                "rise, raise your glass, and command attention — don't begin speaking until the room is quiet",
                "introduce yourself briefly if not everyone knows you",
                "state your relationship to the honoree or event",
                "one story — specific, true, revealing of character",
                "the wish — your heartfelt hope for the person or occasion",
                'the lift — "please join me in raising your glass to..."',
                "drink with the room",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: dim }}>
                  <span className="font-black shrink-0 w-5" style={{ color: red }}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the rules</p>
            <ul className="space-y-2 text-sm mb-6">
              {["a toast should be 90 seconds to 3 minutes. maximum.", "never toast yourself if you are the guest of honor. receive toasts graciously, eyes on the room.", "wait until all glasses are filled before beginning.", "if you don't drink alcohol, raise your water glass. it's entirely correct.", "never read directly from your phone. notes on paper are acceptable. memorized is best."].map(rule => (
                <li key={rule} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{rule}</span></li>
              ))}
            </ul>
          </section>

          {/* ── 22 ── */}
          <section id="dietary-needs-and-special-accommodations" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusLeaf /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>22</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>dietary needs & special accommodations</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the way a host handles the invisible needs of their guests is the truest measure of their excellence.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <p className="text-xs font-bold mb-3" style={{ color: red }}>for hosts</p>
                <ul className="space-y-2 text-sm">
                  {["include a dietary section on your rsvp — always. options: vegetarian, vegan, gluten-free, kosher, halal, nut allergy, other.", "communicate confirmed dietary needs to your caterer at least one week in advance.", "at a plated dinner, mark dietary-specific plates so service is seamless.", "ensure accessible entry points are attended by staff, not just signage."].map(item => (
                    <li key={item} className="flex gap-2" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                <p className="text-xs font-bold mb-3" style={{ color: red }}>for guests</p>
                <ul className="space-y-2 text-sm">
                  {["communicate dietary needs on your rsvp — not at the event.", "if you have an allergy (not a preference), also confirm directly with the host 48 hours in advance.", "do not make your dietary needs the subject of conversation at the table. simply manage your plate gracefully and move on.", "never assume. always confirm."].map(item => (
                    <li key={item} className="flex gap-2" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── 23 ── */}
          <section id="the-graceful-exit" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusExit /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>23</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the graceful exit</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>how you leave is part of how you&apos;re remembered.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>the guest&apos;s responsibility</p>
            <ul className="space-y-2 mb-6 text-sm">
              {[
                "don’t disappear. always say goodbye to the host. always.",
                "don’t leave during a speech, toast, or ceremony unless there is an emergency.",
                "the appropriate time to leave a formal dinner: after dessert has been served and the first guests begin to depart.",
                "at a cocktail or networking event: after 90 minutes is appropriate. two hours is generous.",
                "your exit conversation with the host should be warm, specific, and brief: this was an exceptional evening. the [specific detail] was extraordinary. thank you for including me.",
              ].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>for hosts</p>
            <ul className="space-y-2 mb-4 text-sm">
              {["a strong close is as important as a strong open. plan your event's ending.", "consider: a closing toast, a gift at departure, a specific farewell moment from the stage.", "have staff stationed near the exit to assist with coats, cars, and a final goodbye.", "never make guests feel rushed — but give clear signals when the program has concluded."].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
            <p className="text-sm italic" style={{ color: "#AAA" }}>the host exits last. always.</p>
          </section>

          {/* ── 24 ── */}
          <section id="navigating-multicultural-events" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusGlobe /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>24</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>navigating multicultural events</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-6" style={{ color: dim }}>the world is your guest list. treat it that way.</p>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>before the event</p>
            <p className="text-sm mb-4" style={{ color: dim }}>research the primary cultures represented among your guests. a 30-minute reading can prevent a significant misstep.</p>
            <p className="text-xs font-bold mb-2" style={{ color: ink, letterSpacing: "0.1em" }}>key areas to understand</p>
            <ul className="space-y-1.5 mb-6 text-sm">
              {["greeting customs (handshake? bow? two-cheek kiss? no physical contact?)", "dietary restrictions rooted in religious observance (kosher, halal, hindu, jain, fasting practices)", "gender dynamics in professional and social settings", "gift-giving customs if gifts are part of the event", "punctuality expectations (some cultures have fluid timing norms — plan accordingly)", "titles and forms of address — some cultures place family name first"].map(item => (
                <li key={item} className="flex gap-3" style={{ color: dim }}><span style={{ color: red }}>·</span><span>{item}</span></li>
              ))}
            </ul>
            <p className="text-xs font-bold mb-3" style={{ color: red, letterSpacing: "0.14em" }}>in the moment</p>
            <p className="text-sm mb-4" style={{ color: dim }}>if you are unsure of a custom: observe, follow the lead of the other person, and ask graciously when appropriate (<em>"is there a particular way you prefer to be greeted?"</em>).</p>
            <p className="text-sm mb-6" style={{ color: dim }}><strong style={{ color: ink }}>never:</strong> express surprise or amusement at a cultural difference. never make someone feel like a representative of their entire culture. <strong style={{ color: ink }}>always:</strong> create an environment where every guest — regardless of background — feels that the event was designed with them in mind.</p>
            <blockquote className="pl-5 py-1" style={{ borderLeft: `3px solid ${red}` }}>
              <p className="italic leading-relaxed" style={{ color: dim }}>"inclusion is not a checkbox. it is a design choice you make before the first guest walks through the door."</p>
            </blockquote>
          </section>

          {/* ── 25 ── */}
          <section id="the-hosts-invisible-rule-book" className="mb-16 pb-12" style={{ borderBottom: "1px solid #EBEBEB" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 pt-1"><IllusBook /></div>
              <div>
                <span className="block text-4xl font-black leading-none mb-1" style={{ color: red }}>25</span>
                <h2 className="text-2xl font-black" style={{ color: ink }}>the host&apos;s invisible rule book</h2>
              </div>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: dim }}>the things that make an event extraordinary are almost never visible. they are felt.</p>
            <p className="text-sm mb-6" style={{ color: "#AAA" }}>the 10 things extraordinary hosts do that guests never notice:</p>
            <div className="space-y-4">
              {[
                ["they eat before the event", "the host who is hungry cannot be fully present."],
                ["they designate a second", "someone besides the host who knows the full run of show and can make decisions without disruption."],
                ["they brief their service team on vips", "servers know which guests prefer water refilled silently, which table seats the dignitary."],
                ["they have an emergency kit", "stain remover, safety pins, extra name cards, double-sided tape, pain reliever, mints, phone charger."],
                ["they check in on solo guests", "anyone who arrived alone gets a check-in from the host or an appointed connector within the first 20 minutes."],
                ["they don't hover over unhappy situations", "address it quietly, efficiently, and move on — without announcing the recovery."],
                ["they close every event with intention", "a closing toast, a moment of reflection, a specific thank-you. the end of the event is part of the experience."],
                ["they protect their vendors", "guests who are rude to staff are quietly redirected. the team that makes the event work deserves dignity."],
                ["they are the calm", "when things go sideways — and they always do — the host's expression tells every guest whether to panic or to trust. be the calm."],
                ["they follow up", "within 48 hours, the host reaches out to the guest of honor, key speakers, and guests who traveled farthest. the final act of hospitality — and almost never done."],
              ].map(([rule, desc], i) => (
                <div key={i} className="flex gap-4 p-4 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
                  <span className="font-black text-lg shrink-0 w-6" style={{ color: red }}>{i + 1}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: ink }}>{rule}</p>
                    <p className="text-sm mt-1" style={{ color: dim }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── closing note from paula ── */}
          <section className="mb-16">
            <div className="p-8 rounded-sm" style={{ backgroundColor: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <p className="text-xs font-bold mb-6" style={{ color: red, letterSpacing: "0.2em" }}>a note from ms. p</p>
              <p className="leading-relaxed mb-4" style={{ color: dim }}>
                i have been in rooms that felt like they were breathing. rooms where the lighting was perfect and the laughter was real and every person felt like they had been hand-selected, not just invited. i have also been in rooms where no amount of budget or décor could compensate for the fact that no one had thought about the people.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: dim }}>
                etiquette, at its most fundamental, is <strong style={{ color: ink }}>thinking about the people.</strong> every section of this guide comes back to that. whether we&apos;re talking about the placement of a fork or the timing of a toast or the way you make eye contact with someone who just walked into the room — it all comes back to the question: <em>have i thought about this person?</em>
              </p>
              <p className="leading-relaxed mb-4" style={{ color: dim }}>
                i wrote this guide because i believe that the event industry needs a return to true hospitality. not the performative kind. the kind that happens before anyone arrives and continues long after the last guest leaves.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: dim }}>
                i hope this guide becomes dog-eared and coffee-stained. i hope you argue with some of it, take notes in the margins, and develop your own voice in the spaces between these pages. this is your foundation. what you build on it is yours.
              </p>
              <p className="font-bold text-sm mb-1" style={{ color: ink }}>with gratitude and intention —</p>
              <p className="font-black text-xl" style={{ color: red }}>paula mescolin</p>
              <p className="text-xs mt-1" style={{ color: "#AAA" }}>founder, the koolture group</p>
            </div>
          </section>

        </main>
      </div>

      {/* ── footer ── */}
      <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid #EBEBEB" }}>
        <p className="text-xs mb-2" style={{ color: "#BBBBBB", letterSpacing: "0.12em" }}>the koolture group</p>
        <p className="text-xs" style={{ color: "#CCCCCC" }}>
          © the koolture group · all rights reserved ·{" "}
          <a href="https://koolevents.app" style={{ color: red }} className="hover:opacity-70 transition-opacity">koolevents.app</a>
        </p>
        <blockquote className="mt-8 max-w-lg mx-auto">
          <p className="italic text-sm" style={{ color: "#BBBBBB" }}>"excellence is not an accident. it is the result of a thousand small, intentional choices. this guide is where those choices begin."</p>
          <cite className="block text-xs font-bold mt-2" style={{ color: red }}>— paula mescolin, the koolture group</cite>
        </blockquote>
      </footer>

    </div>
  );
}