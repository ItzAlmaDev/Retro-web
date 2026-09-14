import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Music2,
  Plus,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

const heroImage = "/manus-storage/retro-hero_15a0ae50.jpg";

const navItems = [
  ["The vibe", "#the-vibe"],
  ["How it works", "#how-it-works"],
  ["The ramp walk", "#ramp-walk"],
  ["FAQ", "#faq"],
];

const marqueeItems = [
  "70s & 80s all night",
  "Bring your crew",
  "Walk the ramp",
  "Prizes for the bold",
  "Dress like your icon",
];

const steps = [
  { number: "01", title: "Register", body: "Pick your entry, save your spot, and tell us what era you’re channeling.", icon: Ticket },
  { number: "02", title: "Plan your look", body: "Go full disco, new wave, power suit, pop icon—or invent your own legend.", icon: Sparkles },
  { number: "03", title: "Walk the ramp", body: "Hit the lights, own the room, and give the judges one unforgettable minute.", icon: Star },
  { number: "04", title: "Win prizes", body: "Take home serious bragging rights and a prize for the look everyone remembers.", icon: Trophy },
];

const faqs = [
  ["Do I have to enter the contest?", "Nope. Come to dance, cheer, or simply observe the looks. Tickets will include general entry and contestant options."],
  ["What counts as a retro look?", "Anything inspired by the 1970s or 1980s: disco, glam rock, power dressing, arcade culture, new wave, pop icons, and beyond."],
  ["Can I enter as a group?", "Absolutely. Group Entry is designed for crews, duos, and coordinated chaos. Add your group members during registration."],
  ["When and where is it happening?", "The date and venue are being finalized for [CITY]. Join the notify list and we’ll send the details the second they’re locked."],
  ["How will payment work?", "The final flow will use Razorpay sandbox checkout for UPI, cards, and netbanking. Production credentials will be added once ticket tiers are confirmed."],
];

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.62, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Retro Event home">
      <span className="brand-mark"><Music2 size={17} strokeWidth={2.5} /></span>
      <span>RETRO<br /><em>EVENT</em></span>
    </a>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Event highlights">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            <span className="marquee-star">✳</span>{item}
          </span>
        ))}
      </div>
    </div>
  );
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) setStep(2);
    else setSubmitted(true);
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div className="register-modal" role="dialog" aria-modal="true" aria-labelledby="register-title" initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close registration"><X size={20} /></button>
        {!submitted ? (
          <>
            <div className="modal-kicker">{step === 1 ? "Step 01 / Your details" : "Step 02 / Lock the look"}</div>
            <h2 id="register-title">{step === 1 ? "Save your spot." : "Choose your energy."}</h2>
            <p className="modal-intro">{step === 1 ? "We’ll keep you posted as the date, venue, and ticket tiers land." : "This is a placeholder flow ready for Razorpay sandbox checkout once pricing is confirmed."}</p>
            <form onSubmit={handleSubmit}>
              {step === 1 ? (
                <div className="form-grid">
                  <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label>
                  <label>Email address<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" /></label>
                  <label>Phone number<input required type="tel" placeholder="+91 00000 00000" /></label>
                  <label>Instagram handle <span className="optional">optional</span><input placeholder="@yourhandle" /></label>
                </div>
              ) : (
                <div className="form-grid">
                  <label>Look category<select defaultValue="70s"><option value="70s">70s icon</option><option value="80s">80s icon</option><option value="group">Best group</option><option value="wildcard">Wildcard energy</option></select></label>
                  <label>Entry type<select defaultValue="solo"><option value="solo">Solo entry</option><option value="group">Group entry</option><option value="spectator">General entry</option></select></label>
                  <label className="wide">What are you bringing to the ramp?<textarea placeholder="A disco diva? Arcade hero? Tell us in one line." /></label>
                  <label className="terms wide"><input type="checkbox" required /> I agree to the event terms and want updates about registration.</label>
                </div>
              )}
              <button className="button button-dark button-wide" type="submit">{step === 1 ? "Continue to entry" : "Save my spot"}<ArrowUpRight size={17} /></button>
            </form>
            <div className="step-dots"><span className={step === 1 ? "active" : ""} /><span className={step === 2 ? "active" : ""} /></div>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon"><Check size={28} /></div>
            <div className="modal-kicker">You’re on the list</div>
            <h2>See you under the lights.</h2>
            <p className="modal-intro">Thanks, {name || "retro icon"}. We’ll send the confirmed date, venue, ticket details, and payment link to {email || "your inbox"}.</p>
            <button className="button button-dark button-wide" onClick={onClose}>Back to the vibe <ArrowDownRight size={17} /></button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  function scrollTo(section: string) {
    document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }

  function notifySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.alert("You’re on the notify list — we’ll be in touch when the venue is locked.");
    event.currentTarget.reset();
  }

  return (
    <div className="site-shell" id="top">
      <Marquee />
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className={`main-nav ${mobileMenuOpen ? "open" : ""}`} aria-label="Primary navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</a>)}
            <button className="button button-coral nav-register" onClick={() => { setRegisterOpen(true); setMobileMenuOpen(false); }}>Register <ArrowUpRight size={15} /></button>
          </nav>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" aria-expanded={mobileMenuOpen}>{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <Reveal><div className="eyebrow"><span className="eyebrow-dot" /> [CITY] · DATE TBA</div></Reveal>
              <Reveal delay={0.06}><h1>Dress loud.<br /><span>Walk proud.</span></h1></Reveal>
              <Reveal delay={0.12}><p className="hero-lede">A live costume contest for icons, misfits, and main characters from the 70s–80s. Bring the look. Own the room. Dance it out.</p></Reveal>
              <Reveal delay={0.18}><div className="hero-actions"><button className="button button-coral" onClick={() => setRegisterOpen(true)}>Register your look <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => scrollTo("#the-vibe")}>See the vibe <ArrowDownRight size={17} /></button></div></Reveal>
              <Reveal delay={0.24}><div className="hero-meta"><span><CalendarDays size={15} /> DATE — TBA</span><span className="meta-divider" /><span><MapPin size={15} /> VENUE TO BE ANNOUNCED</span></div></Reveal>
            </div>
            <Reveal delay={0.12} className="hero-art-wrap">
              <div className="hero-art-frame">
                <img src={heroImage} alt="Vintage boombox, vinyl record, headphones, and sunglasses in a warm retro collage" />
                <div className="hero-art-caption"><span>THE SOUNDTRACK<br />TO YOUR LOOK</span><span className="caption-arrow">↗</span></div>
              </div>
              <div className="hero-sticker sticker-left">NO<br />BORING<br />LOOKS</div>
              <div className="hero-sticker sticker-right"><Headphones size={16} /> ALL<br />NIGHT</div>
            </Reveal>
          </div>
          <div className="hero-bottom-rule page-width"><span>THE STYLE SHOWDOWN</span><span>01 / 09</span></div>
        </section>

        <section className="vibe-section section-pad" id="the-vibe">
          <div className="page-width">
            <div className="section-heading heading-split">
              <Reveal><div><div className="section-kicker">01 / THE VIBE</div><h2>Not a theme.<br /><em>A time machine.</em></h2></div></Reveal>
              <Reveal delay={0.08}><p>Think vinyl crackle, flash photography, chrome details, and the energy of a room where everyone came to be seen. We’re taking the best bits of the eras and turning the volume up.</p></Reveal>
            </div>
            <div className="vibe-grid">
              <Reveal className="vibe-card vibe-card-large"><div className="vibe-illustration vinyl-art"><div className="sun-lines" /><div className="record-disc" /><div className="vibe-label">DISCO<br /><span>FEVER</span></div></div><div className="vibe-card-footer"><span>01 / AFTER DARK</span><b>Turn it up</b></div></Reveal>
              <Reveal delay={0.08} className="vibe-card"><div className="vibe-illustration arcade-art"><div className="arcade-screen">INSERT<br /><span>COIN</span></div><div className="arcade-buttons"><i /><i /><i /></div></div><div className="vibe-card-footer"><span>02 / PLAY LOUD</span><b>High score energy</b></div></Reveal>
              <Reveal delay={0.16} className="vibe-card"><div className="vibe-illustration mirror-art"><div className="mirror-star">✦</div><div className="mirror-copy">LOOK<br /><span>AT YOU</span></div><div className="mirror-sparkle">✳</div></div><div className="vibe-card-footer"><span>03 / MAIN CHARACTER</span><b>Be unforgettable</b></div></Reveal>
            </div>
            <div className="decade-strip"><span>1970</span><div className="strip-line" /><span>1980</span><div className="strip-line" /><span>YOUR ERA</span><div className="strip-line" /><Sparkles size={18} /></div>
          </div>
        </section>

        <section className="steps-section section-pad" id="how-it-works">
          <div className="page-width">
            <div className="section-heading heading-split compact"><Reveal><div><div className="section-kicker">02 / HOW IT WORKS</div><h2>Four moves.<br /><em>One big night.</em></h2></div></Reveal><Reveal delay={0.08}><p>There’s no complicated choreography. Just a simple path from “I have an idea” to “did you see that look?”</p></Reveal></div>
            <div className="steps-grid">
              {steps.map(({ number, title, body, icon: Icon }, index) => <Reveal key={number} delay={index * 0.07} className="step-card"><div className="step-top"><span className="step-number">{number}</span><Icon size={22} strokeWidth={1.7} /></div><h3>{title}</h3><p>{body}</p><a href="#register" onClick={(e) => { e.preventDefault(); setRegisterOpen(true); }}>Let’s go <ArrowUpRight size={14} /></a></Reveal>)}
            </div>
          </div>
        </section>

        <section className="ramp-section section-pad" id="ramp-walk">
          <div className="ramp-sunburst" />
          <div className="page-width ramp-inner">
            <div className="ramp-heading"><Reveal><div className="section-kicker light">03 / THE RAMP WALK</div><h2>The main<br /><em>event.</em></h2></Reveal><Reveal delay={0.08}><p>One minute. One entrance. Zero hiding. The ramp is your stage and the crowd is ready for the reveal.</p><button className="button button-cream" onClick={() => setRegisterOpen(true)}>I’m walking <ArrowUpRight size={17} /></button></Reveal></div>
            <div className="ramp-timeline"><Reveal><div className="timeline-line" /><div className="timeline-item"><span>01</span><div><b>Backstage</b><p>Check-in, name tag, last-minute glitter.</p></div></div></Reveal><Reveal delay={0.1}><div className="timeline-item"><span>02</span><div><b>The entrance</b><p>Your song hits. Your look lands. The room reacts.</p></div></div></Reveal><Reveal delay={0.2}><div className="timeline-item"><span>03</span><div><b>The verdict</b><p>Judges score the story, the styling, and the audacity.</p></div></div></Reveal><Reveal delay={0.3}><div className="timeline-item"><span>04</span><div><b>The after-party</b><p>Winners, photos, and a dance floor that stays open.</p></div></div></Reveal></div>
            <div className="judging-row"><span><Users size={18} /> LIVE JUDGING</span><span><Trophy size={18} /> BEST 70s · BEST 80s · BEST GROUP · CROWD FAVOURITE</span><span><Clock3 size={18} /> 1 MINUTE EACH</span></div>
          </div>
        </section>

        <section className="tickets-section section-pad" id="register">
          <div className="page-width">
            <div className="section-heading heading-split"><Reveal><div><div className="section-kicker">04 / TICKETS + REGISTRATION</div><h2>Pick your<br /><em>entrance.</em></h2></div></Reveal><Reveal delay={0.08}><p>Ticket tiers and pricing are being confirmed. Join the early list now and you’ll get first dibs when registration opens.</p></Reveal></div>
            <div className="ticket-layout">
              <Reveal className="ticket-card featured"><div className="ticket-card-top"><span className="ticket-label">MOST POPULAR</span><Ticket size={22} /></div><h3>Contestant</h3><p className="ticket-description">Your official pass to the ramp walk, judging, and after-party.</p><div className="ticket-price">₹ TBA <small>per person</small></div><ul><li><Check size={15} /> Contestant registration</li><li><Check size={15} /> Ramp walk + judging</li><li><Check size={15} /> After-party access</li></ul><button className="button button-dark button-wide" onClick={() => setRegisterOpen(true)}>Register your look <ArrowUpRight size={17} /></button><div className="spots"><span className="spots-dot" /> Spots remaining: <b>TBA</b></div></Reveal>
              <Reveal delay={0.1} className="ticket-stack"><div className="ticket-card mini"><div><div className="ticket-label coral-text">COME TO DANCE</div><h3>General entry</h3><p>Watch the looks. Cheer loud. Stay for the music.</p></div><div className="mini-bottom"><span>₹ TBA</span><button className="round-button" onClick={() => setRegisterOpen(true)} aria-label="Register for general entry"><ArrowUpRight size={18} /></button></div></div><div className="ticket-card mini olive-card"><div><div className="ticket-label">BRING YOUR CREW</div><h3>Group entry</h3><p>For duos, crews, and coordinated main-character energy.</p></div><div className="mini-bottom"><span>₹ TBA</span><button className="round-button dark-round" onClick={() => setRegisterOpen(true)} aria-label="Register as a group"><ArrowUpRight size={18} /></button></div></div></Reveal>
            </div>
            <div className="payment-note"><span><Sparkles size={16} /> SECURE CHECKOUT</span><p>Razorpay sandbox checkout will be wired once final tiers are confirmed. UPI · Cards · Netbanking. Stripe fallback available for future international entries.</p></div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="page-width faq-layout"><Reveal><div><div className="section-kicker">05 / FAQ</div><h2>Questions,<br /><em>answered.</em></h2><p className="faq-aside-copy">Still curious? Drop us a note and we’ll get back to you with the good stuff.</p><a className="mail-link" href="mailto:hello@retroevent.example"><Mail size={16} /> hello@retroevent.example</a></div></Reveal><Reveal delay={0.08} className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <ChevronDown className="rotate" size={18} /> : <Plus size={18} />}</button>{openFaq === index && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="faq-answer"><p>{answer}</p></motion.div>}</div>)}</Reveal></div>
        </section>

        <section className="notify-section section-pad"><div className="page-width notify-inner"><div className="notify-copy"><div className="section-kicker light">VENUE TBA / [CITY]</div><h2>We’ll tell you<br /><em>where to be.</em></h2><p>The venue is being locked now. Leave your email and you’ll be the first to know when the doors, date, and ticket link go live.</p></div><form className="notify-form" onSubmit={notifySubmit}><label htmlFor="notify-email">Email address</label><div className="notify-input"><input id="notify-email" type="email" required placeholder="you@email.com" /><button className="button button-cream" type="submit">Notify me <ArrowUpRight size={17} /></button></div><small>No spam. Just one very good night.</small></form><div className="notify-sun">✳</div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width footer-grid"><Logo /><div className="footer-links"><div><span className="footer-label">Explore</span><a href="#the-vibe">The vibe</a><a href="#how-it-works">How it works</a><a href="#ramp-walk">The ramp walk</a></div><div><span className="footer-label">Say hello</span><a href="mailto:hello@retroevent.example">Email us</a><a href="#top">Instagram</a><a href="#top">Terms + privacy</a></div></div><div className="footer-signoff"><span>MAKE AN<br />ENTRANCE.</span><a className="round-button footer-round" href="#top" aria-label="Back to top"><ArrowUpRight size={18} /></a></div></div><div className="page-width footer-bottom"><span>© 2026 RETRO EVENT</span><span>MADE FOR THE BOLD</span><span><Instagram size={14} /> @RETROEVENT</span></div></footer>
      {registerOpen && <RegisterModal onClose={() => setRegisterOpen(false)} />}
    </div>
  );
}
