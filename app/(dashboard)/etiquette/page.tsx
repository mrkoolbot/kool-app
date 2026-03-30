import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { KoolLogo } from "@/components/kool-logo";

const chapters = [
  { num: "01", id: "what-manners-actually-mean", title: "what manners actually mean" },
  { num: "02", id: "the-foundational-dos-and-donts", title: "the foundational do's and don'ts" },
  { num: "03", id: "how-to-greet-guests", title: "how to greet guests" },
  { num: "04", id: "addressing-dignitaries", title: "addressing dignitaries" },
  { num: "05", id: "invitations-addressing-families-couples-individuals", title: "invitations: addressing families, couples & individuals" },
  { num: "06", id: "seating-rules-that-actually-work", title: "seating rules that actually work" },
  { num: "07", id: "the-run-of-show", title: "the run of show" },
  { num: "08", id: "how-to-set-a-table", title: "how to set a table" },
  { num: "09", id: "the-art-of-using-utensils", title: "the art of using utensils" },
  { num: "10", id: "etiquette-for-ladies", title: "etiquette for ladies" },
  { num: "11", id: "etiquette-for-gentlemen", title: "etiquette for gentlemen" },
  { num: "12", id: "the-right-verbiage", title: "the right verbiage" },
  { num: "13", id: "chivalry-why-it-still-matters", title: "chivalry — why it still matters" },
  { num: "14", id: "the-importance-of-being-on-time", title: "the importance of being on time" },
  { num: "15", id: "body-language-at-events", title: "body language at events" },
  { num: "16", id: "networking-with-intention", title: "networking with intention" },
  { num: "17", id: "gifting-with-grace", title: "gifting with grace" },
  { num: "18", id: "the-thank-you-note", title: "the thank you note" },
  { num: "19", id: "dress-codes-decoded", title: "dress codes decoded" },
  { num: "20", id: "digital-etiquette", title: "digital etiquette: phones, social media & photography" },
  { num: "21", id: "toasts-and-speeches", title: "toasts & speeches" },
  { num: "22", id: "dietary-needs-and-special-accommodations", title: "dietary needs & special accommodations" },
  { num: "23", id: "the-graceful-exit", title: "the graceful exit" },
  { num: "24", id: "navigating-multicultural-events", title: "navigating multicultural events" },
  { num: "25", id: "the-hosts-invisible-rule-book", title: "the host's invisible rule book" },
];

export default function EtiquetteManualPage() {
  return (
    <div className="min-h-screen font-galano" style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#0A0A0A", borderBottom: "1px solid #1a1a1a" }} className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
          back to dashboard
        </Link>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <KoolLogo size="sm" inverted={false} />
        </Link>
        <a
          href="/etiquette-manual.pdf"
          className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase px-4 py-2 border transition-colors"
          style={{ borderColor: "#D90000", color: "#D90000" }}
        >
          <Download className="w-3.5 h-3.5" />
          download PDF
        </a>
      </header>

      {/* Hero */}
      <div className="px-6 py-16 text-center" style={{ borderBottom: "1px solid #1a1a1a" }}>
        <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4" style={{ color: "#D90000" }}>
          exclusive resource · the koolture group
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-none">
          the kool event<br />etiquette manual
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto mt-4">
          the definitive guide to extraordinary events — for hosts, planners, and guests who understand that how you do anything is how you do everything
        </p>
        <p className="text-white/30 text-xs mt-4 tracking-wide">by paula mescolin · founder, the koolture group</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#D90000" }}>
              25 chapters
            </p>
            <nav className="space-y-1">
              {chapters.map((ch) => (
                <a
                  key={ch.id}
                  href={`#${ch.id}`}
                  className="flex items-baseline gap-2 py-1.5 text-xs transition-colors hover:text-white group"
                  style={{ color: "#666" }}
                >
                  <span className="font-bold shrink-0" style={{ color: "#D90000" }}>{ch.num}</span>
                  <span className="group-hover:text-white transition-colors leading-snug">{ch.title}</span>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-2xl">
          {/* Preface */}
          <div className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: "#D90000" }}>a note before we begin</p>
            <p className="text-white/70 leading-relaxed mb-4">
              this guide was born from hundreds of events. corporate galas and intimate dinners. embassy receptions and backyard celebrations. moments that worked, and moments that taught me everything.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              etiquette is not about being stiff. it's not about knowing which fork to use so that other people will think you're cultured. etiquette is about <em>presence</em>. it's about making every person in the room feel seen, honored, and welcome. it's the invisible architecture of an extraordinary event.
            </p>
            <p className="text-white/70 leading-relaxed">
              welcome to the koolture of excellence.
            </p>
            <p className="mt-4 font-bold text-sm">— paula mescolin, the koolture group</p>
          </div>

          {/* Chapter 01 */}
          <section id="what-manners-actually-mean" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>01</span>
              <h2 className="text-2xl font-black">what manners actually mean</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              manners are not a performance. they are not a costume you put on when the cameras are rolling and take off when the car arrives.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              manners are the daily practice of treating other human beings as worthy of your full attention, your care, and your respect.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              at a high-stakes event, a guest who is warmly greeted at the door feels entirely different about the evening than one who was left searching for their seat. manners are not elite — they are available to every person who chooses to be intentional about how they show up.
            </p>
            <blockquote className="pl-4 py-1" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed">
                "manners are the visible reflection of your invisible character. when you walk into a room knowing how to conduct yourself, you give yourself permission to be fully present — and that is when the real magic happens."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 02 */}
          <section id="the-foundational-dos-and-donts" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>02</span>
              <h2 className="text-2xl font-black">the foundational do's and don'ts</h2>
            </div>
            <h3 className="font-bold text-sm tracking-[0.15em] uppercase mb-4" style={{ color: "#D90000" }}>do's — the non-negotiables</h3>
            <ul className="space-y-3 mb-8">
              {[
                ["arrive prepared", "know the event, the host, and at least three people you plan to speak with before you arrive."],
                ["silence your phone completely", "when greeting hosts, at the dinner table, and during speeches or ceremonies."],
                ["introduce yourself clearly", "your name, spoken at a moderate pace, with eye contact."],
                ["send a thank you", "within 24–48 hours. always."],
                ["dress to the specified code", "it is a form of respect to the host."],
                ["use names", "people love to hear their own name. use it twice in a new conversation."],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex gap-3 text-white/70">
                  <span className="shrink-0 mt-0.5" style={{ color: "#D90000" }}>✓</span>
                  <span><strong className="text-white">{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-sm tracking-[0.15em] uppercase mb-4" style={{ color: "#D90000" }}>don'ts — the ones that will cost you</h3>
            <ul className="space-y-3">
              {[
                ["don't arrive early to a hosted dinner", "it puts the host in an impossible position. five minutes after the stated time is ideal."],
                ["don't monopolize the host", "greet them, express your gratitude, and let them circulate."],
                ["don't drink excessively", "at professional or formal events. ever."],
                ["don't RSVP yes and not show up", "this is one of the great etiquette crimes of our time."],
                ["don't ignore the support staff", "servers, valets, coat check attendants deserve the same courtesy as the CEO."],
              ].map(([bold, rest]) => (
                <li key={bold} className="flex gap-3 text-white/70">
                  <span className="shrink-0 mt-0.5 text-white/30">✗</span>
                  <span><strong className="text-white">{bold}</strong> — {rest}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Chapter 03 */}
          <section id="how-to-greet-guests" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>03</span>
              <h2 className="text-2xl font-black">how to greet guests</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              the greeting sets the entire emotional temperature of the event. it is the first impression, the first feeling, the first promise you make to your guest.
            </p>
            <h3 className="font-bold text-sm tracking-[0.15em] uppercase mb-4" style={{ color: "#D90000" }}>the host's responsibility</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              as a host, you should be <strong className="text-white">at the entrance</strong> for the first 20–30 minutes of any formal event. your greeting sequence: eye contact before they reach you → smile, real and warm → step forward to meet them → call them by name → handshake or embrace → introduce them to someone nearby immediately.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              <strong className="text-white">formal settings:</strong> a firm handshake, right hand, direct eye contact. <strong className="text-white">never:</strong> a limp handshake. a half-hug to someone you've just met. a greeting from across the room with a wave. these all communicate: <em>you're not a priority.</em>
            </p>
            <blockquote className="pl-4 py-1" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed">
                "i've watched the entire energy of an event shift because the host stood at the door and looked every single guest in the eye. you cannot overestimate what it means to truly be seen when you walk in."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 04 */}
          <section id="addressing-dignitaries" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>04</span>
              <h2 className="text-2xl font-black">addressing dignitaries</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              getting the address right is not about being stuffy. it's about honoring the work and service of the individual in front of you.
            </p>
            <div className="space-y-4">
              {[
                ["the president", "mr./madam president"],
                ["senator", "senator [last name]"],
                ["governor", "governor [last name]"],
                ["judge", "your honor / judge [last name]"],
                ["pope", "your holiness"],
                ["cardinal", "your eminence"],
                ["king/queen", "your majesty (first), then sir/ma'am"],
                ["prince/princess", "your royal highness"],
              ].map(([title, address]) => (
                <div key={title} className="flex items-baseline justify-between py-2" style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <span className="text-white/60 text-sm">{title}</span>
                  <span className="text-sm font-bold text-white">{address}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-6 italic">
              the golden rule: when in doubt, default to the most formal address. you will never offend someone by showing more respect than necessary.
            </p>
          </section>

          {/* Chapter 05 */}
          <section id="invitations-addressing-families-couples-individuals" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>05</span>
              <h2 className="text-2xl font-black">invitations: addressing families, couples & individuals</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              the invitation is the first tangible piece of your event that a guest receives. it signals everything about the occasion before they've set foot in the room.
            </p>
            <div className="space-y-4">
              {[
                ["married couple, same name", "Mr. and Mrs. Paulo Mescolin"],
                ["married couple, different names", "Ms. Paula Costa and Mr. Paulo Mescolin"],
                ["couple, not married", "Ms. Paula Costa\nMr. Paulo Mescolin (separate lines)"],
                ["single, with guest", "Ms. Paula Costa and Guest"],
                ["single, no guest", "Ms. Paula Costa (absence of 'and guest' is intentional)"],
              ].map(([context, format]) => (
                <div key={context} className="p-4 rounded-sm" style={{ backgroundColor: "#111" }}>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "#D90000" }}>{context}</p>
                  <p className="text-white font-medium text-sm">{format}</p>
                </div>
              ))}
            </div>
            <blockquote className="pl-4 py-1 mt-6" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed text-sm">
                "an invitation is a promise. it says: i thought of you specifically. you were chosen for this room. make it feel that way."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 06 */}
          <section id="seating-rules-that-actually-work" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>06</span>
              <h2 className="text-2xl font-black">seating rules that actually work</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              seating is strategy. it is one of the most underestimated tools a host has to shape the energy, conversation, and outcome of an event.
            </p>
            <div className="space-y-3">
              {[
                "never seat people randomly at a formal dinner — every seat assignment is a curatorial decision.",
                "separate couples at dinner parties of 8 or more. seating is your opportunity to create new connections.",
                "honor the guest of honor — they sit at the host's right. the second guest of honor sits at the host's left.",
                "seat enemies apart and strategically. if you know two guests have tension, you are responsible for managing the proximity.",
                "consider mobility, hearing, and sight lines for elderly guests or those with accessibility needs.",
              ].map((rule, i) => (
                <div key={i} className="flex gap-3 text-white/70 text-sm">
                  <span className="font-black shrink-0 text-xs mt-1" style={{ color: "#D90000" }}>rule {i + 1}</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 07 */}
          <section id="the-run-of-show" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>07</span>
              <h2 className="text-2xl font-black">the run of show</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              the run of show (ROS) is the backbone of every professional event. it is not a suggestion. it is a contract with your guests' time.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              every ROS document includes: event name and contacts · time-stamped sequence · responsible party for each item · buffer time (10–15 minutes per 3-hour event) · contingency notes.
            </p>
            <blockquote className="pl-4 py-1" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed">
                "the best run of show is the one no one notices — because everything flowed so beautifully, the guests thought it was effortless. that's the goal."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 08 */}
          <section id="how-to-set-a-table" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>08</span>
              <h2 className="text-2xl font-black">how to set a table</h2>
            </div>
            <h3 className="font-bold text-sm tracking-[0.15em] uppercase mb-4" style={{ color: "#D90000" }}>the formal place setting</h3>
            <div className="space-y-2 mb-6">
              {[
                ["left of plate (outside in)", "salad fork · dinner fork · fish fork"],
                ["right of plate (outside in)", "fish knife · dinner knife · salad knife · soup spoon"],
                ["above plate", "dessert fork (tines right) · dessert spoon (bowl left)"],
                ["glassware", "water goblet · white wine · red wine · champagne flute"],
                ["napkin", "left of forks, or on the charger — never tucked under the plate"],
              ].map(([pos, items]) => (
                <div key={pos} className="flex gap-3 py-2 text-sm" style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <span className="text-white/40 w-40 shrink-0">{pos}</span>
                  <span className="text-white/80">{items}</span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm italic">work from outside in — the outermost utensils are used first.</p>
          </section>

          {/* Chapter 09 */}
          <section id="the-art-of-using-utensils" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>09</span>
              <h2 className="text-2xl font-black">the art of using utensils</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              at formal international events, <strong className="text-white">continental (european) style</strong> is the standard — fork stays in the left hand, knife in the right. you eat as you cut.
            </p>
            <h3 className="font-bold text-sm tracking-[0.15em] uppercase mb-4" style={{ color: "#D90000" }}>the signals your utensils send</h3>
            <div className="space-y-3">
              {[
                ["i'm resting", "fork and knife in an inverted V at 4 and 8 o'clock"],
                ["i'm finished", "fork and knife parallel, handles at 4 o'clock, diagonally across plate"],
                ["leaving temporarily", "napkin placed on your chair"],
                ["meal is over", "napkin placed to the left of your plate — never on the plate"],
              ].map(([signal, meaning]) => (
                <div key={signal} className="flex gap-4 text-sm">
                  <span className="font-bold text-white w-32 shrink-0">{signal}</span>
                  <span className="text-white/60">{meaning}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 10 */}
          <section id="etiquette-for-ladies" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>10</span>
              <h2 className="text-2xl font-black">etiquette for ladies</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4 italic">grace is not weakness. it is the most powerful form of presence.</p>
            <ul className="space-y-3 text-white/70 text-sm">
              {[
                "your posture is your first statement — enter every room with shoulders back, chin level. not stiff — poised.",
                "your entrance should be unhurried. rushing communicates panic. a measured pace communicates authority.",
                "your handbag belongs on your lap, on the back of your chair, or on a bag hook — never on the table or the floor.",
                "when a gentleman rises to seat you, allow it. it is not a diminishment. it is an honor that you receive with grace.",
                "your phone is invisible at a formal table. no exceptions.",
                "accept compliments with a simple, warm 'thank you.' deflecting compliments is a form of rejection.",
                "if your heel catches or your glass spills — handle it calmly, make light of it briefly, and move on. the room will follow your energy.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5" style={{ color: "#D90000" }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="pl-4 py-1 mt-6" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed text-sm">
                "a woman with etiquette doesn't need to demand respect. she's already communicated that she expects it — and why she deserves it."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 11 */}
          <section id="etiquette-for-gentlemen" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>11</span>
              <h2 className="text-2xl font-black">etiquette for gentlemen</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4 italic">a gentleman is not defined by the cut of his suit. he is defined by the quality of his attention.</p>
            <ul className="space-y-3 text-white/70 text-sm">
              {[
                "dress with intention — a gentleman's attire communicates respect for the event and the host. when in doubt, err formal.",
                "arrive on time. a gentleman does not make people wait.",
                "rise when introduced to women, elders, dignitaries, or anyone deserving of recognition.",
                "open doors — for everyone. this is not dated. this is decency.",
                "pull out the chair for your companion at a formal dinner.",
                "your handshake is your first impression. firm, brief, direct eye contact.",
                "your phone is in your pocket. it stays there.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5" style={{ color: "#D90000" }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Chapter 12 */}
          <section id="the-right-verbiage" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>12</span>
              <h2 className="text-2xl font-black">the right verbiage</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">words are architecture. choose them carefully.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "#D90000" }}>phrases that elevate</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  {[
                    '"it\'s a pleasure to meet you"',
                    '"please allow me to introduce..."',
                    '"i\'d be honored"',
                    '"how may i assist you?"',
                    '"forgive me, i didn\'t catch your name"',
                  ].map((p) => <li key={p} className="italic">{p}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xs tracking-[0.15em] uppercase mb-3" style={{ color: "#D90000" }}>phrases to retire</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    ['"no problem"', '"of course" or "my pleasure"'],
                    ['"you guys"', '"you all" or by name'],
                    ['"honestly"', 'implies you aren\'t always honest'],
                    ['"i\'ll try"', 'commit or decline'],
                  ].map(([bad, fix]) => (
                    <li key={bad} className="text-white/50">
                      <span className="line-through">{bad}</span>
                      <span className="text-white/70 ml-2">→ {fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Chapter 13 */}
          <section id="chivalry-why-it-still-matters" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>13</span>
              <h2 className="text-2xl font-black">chivalry — why it still matters</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              chivalry was never about hierarchy. it was about protection and honor in practice.
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              in its modern form, chivalry is simply this: <strong className="text-white">noticing what someone needs and providing it before they have to ask.</strong>
            </p>
            <p className="text-white/70 leading-relaxed mb-6">
              chivalry is not antiquated. chivalry is one of the most revolutionary acts in a world that has forgotten that the smallest courtesies carry the most weight.
            </p>
            <blockquote className="pl-4 py-1" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed">
                "people remember how you made them feel. not your centerpieces. not your catering. how you made them feel. chivalry is the most precise tool you have for getting that right."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 14 */}
          <section id="the-importance-of-being-on-time" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>14</span>
              <h2 className="text-2xl font-black">the importance of being on time</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              punctuality is respect made visible. when you are late, you are communicating — whether you mean to or not — that your time is more valuable than the time of everyone waiting for you.
            </p>
            <div className="space-y-4">
              {[
                ["for guests", "arrive within 5–10 minutes of the stated time. for dinner parties: 5–10 minutes after is correct. if you'll be late: call the host in advance."],
                ["for hosts", "program start should be honored within 10 minutes. build buffer into your timeline."],
                ["for speakers", "arrive 30 minutes before your slot. meet your AV contact. end on time — every minute over is stolen from every person in the room."],
              ].map(([role, rule]) => (
                <div key={role} className="p-4 rounded-sm" style={{ backgroundColor: "#111" }}>
                  <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "#D90000" }}>{role}</p>
                  <p className="text-white/70 text-sm">{rule}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 15 */}
          <section id="body-language-at-events" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>15</span>
              <h2 className="text-2xl font-black">body language at events</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              your body speaks before your mouth opens. at events, everyone is watching — and most of them don't know it.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "#D90000" }}>do</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  {[
                    "open stance: feet shoulder-width, arms uncrossed",
                    "eye contact: 3–4 seconds at a time",
                    "angle your body toward the person speaking",
                    "nod to show engagement",
                    "use the person's name naturally",
                  ].map((item) => <li key={item} className="flex gap-2"><span style={{ color: "#D90000" }}>✓</span>{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-3 text-white/30">don't</h3>
                <ul className="space-y-2 text-sm text-white/50">
                  {[
                    "cross your arms (defensive)",
                    "check your phone while in conversation",
                    "stand with your back to the room",
                    "hover at the edge of a space",
                  ].map((item) => <li key={item} className="flex gap-2"><span>✗</span>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* Chapter 16 */}
          <section id="networking-with-intention" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>16</span>
              <h2 className="text-2xl font-black">networking with intention</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              what we're really talking about is <strong className="text-white">cultivating meaningful relationships in concentrated time.</strong> lead with curiosity, not pitch. "what brings you to this event?" is better than "let me tell you what i do."
            </p>
            <div className="p-4 rounded-sm mb-6" style={{ backgroundColor: "#111" }}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase mb-2" style={{ color: "#D90000" }}>the 2-minute rule</p>
              <p className="text-white/70 text-sm">most first conversations at events should run 2–3 minutes before naturally transitioning or exchanging contact information. a meaningful 2-minute exchange leads to a follow-up. a rambling 15-minute conversation can close doors.</p>
            </div>
            <p className="text-white/70 text-sm">
              <strong className="text-white">the follow-up:</strong> the connection was made at the event. the relationship is built the next day. follow up within 24 hours. be specific. reference something from your conversation. no generic "great to meet you."
            </p>
          </section>

          {/* Chapter 17 */}
          <section id="gifting-with-grace" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>17</span>
              <h2 className="text-2xl font-black">gifting with grace</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4 italic">a gift is a symbol. it says: i thought of you when you weren't in front of me.</p>
            <p className="text-white/70 leading-relaxed mb-6">
              always bring a host gift to a private dinner. wine is appropriate only if you know the host's preferences. consider: artisan candles, curated chocolates, a book with a personal inscription, flowers in a vase.
            </p>
            <blockquote className="pl-4 py-1" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed text-sm">
                "the best gift you can give anyone at your event is the feeling that they were seen. everything else is beautiful decoration."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 18 */}
          <section id="the-thank-you-note" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>18</span>
              <h2 className="text-2xl font-black">the thank you note</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              the thank you note is nearly extinct. which means that anyone who writes one is immediately extraordinary.
            </p>
            <div className="space-y-3 mb-6">
              {[
                ["timing", "within 24–48 hours of the event. within the week for gifts received."],
                ["medium", "handwritten, on quality stationery, is the gold standard. a thoughtful email is the acceptable alternative. a text is a last resort."],
                ["structure", "name the specific event · say what it meant to you personally · reference something specific · express your hope for continued connection"],
              ].map(([rule, desc]) => (
                <div key={rule} className="flex gap-4 text-sm">
                  <span className="font-bold w-20 shrink-0" style={{ color: "#D90000" }}>{rule}</span>
                  <span className="text-white/70">{desc}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-sm italic text-white/60 text-sm" style={{ backgroundColor: "#111", borderLeft: "3px solid #333" }}>
              "dear paulo — last evening at the gala was genuinely one of the most beautifully curated events i've attended this year. i left feeling inspired and honored to be included. please know that your thoughtfulness did not go unnoticed. warmly, paula."
            </div>
          </section>

          {/* Chapter 19 */}
          <section id="dress-codes-decoded" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>19</span>
              <h2 className="text-2xl font-black">dress codes decoded</h2>
            </div>
            <div className="space-y-4">
              {[
                ["white tie", "ultra-formal: tailcoats + white waistcoat for men · full-length ball gowns for women. rare outside state occasions and galas."],
                ["black tie", "men: tuxedo + black bow tie · women: floor-length or elegant cocktail gown. standard formal event code."],
                ["black tie optional", "men may wear a dark suit · women have more flexibility. 'creative' means fashion-forward interpretations."],
                ["cocktail attire", "men: suit and tie · women: knee-to-midi dresses or elegant separates. most common upscale code."],
                ["smart casual", "elevated everyday dress. no jeans, no sneakers, no athletic wear."],
                ["garden party / resort", "light fabrics, warmer palettes — still intentional and polished."],
              ].map(([code, desc]) => (
                <div key={code} className="p-4 rounded-sm" style={{ backgroundColor: "#111" }}>
                  <p className="font-bold text-white text-sm mb-1 uppercase tracking-wider">{code}</p>
                  <p className="text-white/60 text-sm">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm mt-6 italic">
              always state the dress code on the invitation. the absence of a dress code causes more anxiety than any other element.
            </p>
          </section>

          {/* Chapter 20 */}
          <section id="digital-etiquette" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>20</span>
              <h2 className="text-2xl font-black">digital etiquette: phones, social media & photography</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              we have not collectively agreed on the rules for devices at events. that gap has produced some of the worst etiquette violations of our time.
            </p>
            <div className="p-5 rounded-sm mb-6" style={{ backgroundColor: "#111", borderLeft: "3px solid #D90000" }}>
              <p className="font-bold text-white text-sm mb-2">the phone rule</p>
              <p className="text-white/70 text-sm">at a formal or business dinner: your phone is <em>off the table</em>. physically off the table. the "phone on the table face-down" is still a phone on the table. it still says: <em>you're not fully here.</em></p>
            </div>
            <p className="text-white/70 text-sm mb-4">
              <strong className="text-white">photography:</strong> never post photos of other guests without their awareness. never post ahead of the host's official release if it's a professional event.
            </p>
          </section>

          {/* Chapter 21 */}
          <section id="toasts-and-speeches" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>21</span>
              <h2 className="text-2xl font-black">toasts & speeches</h2>
            </div>
            <h3 className="font-bold text-xs tracking-[0.15em] uppercase mb-4" style={{ color: "#D90000" }}>structure of a great toast</h3>
            <ol className="space-y-2 text-white/70 text-sm mb-6">
              {[
                "rise, raise your glass, command attention — don't begin until the room is quiet",
                "introduce yourself briefly if not everyone knows you",
                "state your relationship to the honoree or event",
                "one story — specific, true, revealing of character",
                "the wish — your heartfelt hope for the person or occasion",
                "the lift — 'please join me in raising your glass to...'",
                "drink with the room",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-black shrink-0 w-5" style={{ color: "#D90000" }}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-white/50 text-sm italic">a toast should be 90 seconds to 3 minutes. maximum. never toast yourself if you are the guest of honor.</p>
          </section>

          {/* Chapter 22 */}
          <section id="dietary-needs-and-special-accommodations" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>22</span>
              <h2 className="text-2xl font-black">dietary needs & special accommodations</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              the way a host handles the invisible needs of their guests is the truest measure of their excellence.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm" style={{ backgroundColor: "#111" }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "#D90000" }}>for hosts</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>· include a dietary section on your RSVP — always</li>
                  <li>· communicate dietary needs to caterer at least one week in advance</li>
                  <li>· mark dietary-specific plates so service is seamless</li>
                  <li>· ensure accessible entry points are attended by staff</li>
                </ul>
              </div>
              <div className="p-4 rounded-sm" style={{ backgroundColor: "#111" }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase mb-3" style={{ color: "#D90000" }}>for guests</p>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>· communicate dietary needs on your RSVP — not at the event</li>
                  <li>· if you have an allergy, confirm directly with the host 48 hours in advance</li>
                  <li>· do not make your dietary needs the subject of conversation at the table</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Chapter 23 */}
          <section id="the-graceful-exit" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>23</span>
              <h2 className="text-2xl font-black">the graceful exit</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">how you leave is part of how you're remembered.</p>
            <ul className="space-y-3 text-white/70 text-sm mb-6">
              <li className="flex gap-3"><span style={{ color: "#D90000" }}>·</span>don't disappear. always say goodbye to the host. always.</li>
              <li className="flex gap-3"><span style={{ color: "#D90000" }}>·</span>don't leave during a speech, toast, or ceremony unless there is an emergency.</li>
              <li className="flex gap-3"><span style={{ color: "#D90000" }}>·</span>at a cocktail or networking event: after 90 minutes is appropriate. two hours is generous.</li>
              <li className="flex gap-3"><span style={{ color: "#D90000" }}>·</span>your exit with the host: "this was an exceptional evening. the [specific detail] was extraordinary. thank you for including me."</li>
            </ul>
            <p className="text-white/50 text-sm italic">the host exits last. always.</p>
          </section>

          {/* Chapter 24 */}
          <section id="navigating-multicultural-events" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>24</span>
              <h2 className="text-2xl font-black">navigating multicultural events</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">the world is your guest list. treat it that way.</p>
            <p className="text-white/70 leading-relaxed mb-4">research the primary cultures represented among your guests. a 30-minute reading can prevent a significant misstep.</p>
            <p className="text-white/70 leading-relaxed mb-6">key areas: greeting customs · dietary restrictions rooted in religious observance · gender dynamics · gift-giving customs · punctuality expectations · titles and forms of address.</p>
            <blockquote className="pl-4 py-1" style={{ borderLeft: "3px solid #D90000" }}>
              <p className="text-white/80 italic leading-relaxed">
                "inclusion is not a checkbox. it is a design choice you make before the first guest walks through the door."
              </p>
              <cite className="text-xs font-bold tracking-wide mt-2 block" style={{ color: "#D90000" }}>— paula mescolin</cite>
            </blockquote>
          </section>

          {/* Chapter 25 */}
          <section id="the-hosts-invisible-rule-book" className="mb-16 pb-12" style={{ borderBottom: "1px solid #1a1a1a" }}>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-black" style={{ color: "#D90000" }}>25</span>
              <h2 className="text-2xl font-black">the host's invisible rule book</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              the things that make an event extraordinary are almost never visible. they are felt.
            </p>
            <p className="text-white/60 text-sm mb-6">the 10 things extraordinary hosts do that guests never notice:</p>
            <div className="space-y-4">
              {[
                ["they eat before the event", "the host who is hungry cannot be fully present."],
                ["they designate a second", "someone besides the host who knows the full run of show and can make decisions without disruption."],
                ["they brief their service team on VIPs", "servers know which guests prefer water refilled silently, which table seats the dignitary."],
                ["they have an emergency kit", "stain remover, safety pins, extra name cards, double-sided tape, mints, phone charger."],
                ["they check in on solo guests", "anyone who arrived alone gets a check-in within the first 20 minutes."],
                ["they don't hover over unhappy situations", "address it quietly, efficiently, and move on — without announcing the recovery."],
                ["they close every event with intention", "a closing toast, a moment of reflection, a specific thank-you. the end is part of the experience."],
                ["they protect their vendors", "guests who are rude to staff are quietly redirected. the team deserves dignity."],
                ["they are the calm", "when things go sideways — and they always do — the host's expression tells every guest whether to panic or to trust."],
                ["they follow up", "within 48 hours, the host reaches out to the guest of honor, key speakers, and guests who traveled farthest. the final act of hospitality."],
              ].map(([rule, desc], i) => (
                <div key={i} className="flex gap-4 p-4 rounded-sm" style={{ backgroundColor: "#111" }}>
                  <span className="font-black text-lg shrink-0 w-6" style={{ color: "#D90000" }}>{i + 1}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{rule}</p>
                    <p className="text-white/60 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Closing note */}
          <section className="mb-16">
            <div className="p-8 rounded-sm" style={{ backgroundColor: "#111" }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-4" style={{ color: "#D90000" }}>a note from paula</p>
              <p className="text-white/70 leading-relaxed mb-4">
                i have been in rooms that felt like they were breathing. rooms where the lighting was perfect and the laughter was real and every person felt like they had been hand-selected, not just invited.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                etiquette, at its most fundamental, is <strong className="text-white">thinking about the people.</strong> every section of this guide comes back to that question: <em>have i thought about this person?</em>
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                i hope this guide becomes dog-eared and coffee-stained. i hope you argue with some of it, take notes in the margins, and develop your own voice in the spaces between these pages. this is your foundation. what you build on it is yours.
              </p>
              <p className="font-bold text-white">with gratitude and intention —</p>
              <p className="font-black text-lg mt-1" style={{ color: "#D90000" }}>paula mescolin</p>
              <p className="text-white/40 text-xs mt-1">founder, the koolture group</p>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #1a1a1a" }} className="py-12 px-6 text-center">
        <p className="text-white/30 text-xs tracking-wider uppercase mb-2">the koolture group</p>
        <p className="text-white/20 text-xs">
          © the koolture group · all rights reserved ·{" "}
          <a href="https://koolevents.app" style={{ color: "#D90000" }} className="hover:opacity-80 transition-opacity">koolevents.app</a>
        </p>
      </footer>
    </div>
  );
}
