import { Button } from "@/components/ui/button";
import { Droplets, Flame, Leaf, Wind } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

interface Props {
  onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Utility Strip */}
      <div className="bg-olive text-cream text-center text-xs py-2 tracking-widest uppercase font-body">
        Discover your unique Ayurvedic constitution — a timeless guide to health
        &amp; harmony
      </div>

      {/* Navbar */}
      <header
        className="bg-header-bg border-b border-border sticky top-0 z-50"
        data-ocid="nav.panel"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-olive flex items-center justify-center">
              <Leaf className="w-4 h-4 text-cream" />
            </div>
            <span className="font-display font-bold text-lg text-deep-green tracking-widest uppercase">
              Prakruti Path
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm font-body text-foreground hover:text-terracotta transition-colors"
              data-ocid="nav.link"
            >
              About
            </a>
            <a
              href="#doshas"
              className="text-sm font-body text-foreground hover:text-terracotta transition-colors"
              data-ocid="nav.link"
            >
              The Doshas
            </a>
            <a
              href="#quiz"
              className="text-sm font-body text-foreground hover:text-terracotta transition-colors"
              data-ocid="nav.link"
            >
              Quiz
            </a>
            <Button
              onClick={onStart}
              className="bg-terracotta text-cream hover:bg-terracotta/90 rounded-full px-6 text-xs uppercase tracking-widest font-body"
              data-ocid="nav.primary_button"
            >
              Take Quiz
            </Button>
          </nav>
          <Button
            onClick={onStart}
            size="sm"
            className="md:hidden bg-terracotta text-cream hover:bg-terracotta/90 rounded-full text-xs uppercase tracking-widest"
            data-ocid="nav.primary_button"
          >
            Take Quiz
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section
        id="about"
        className="relative bg-hero-bg overflow-hidden py-24 md:py-36"
      >
        <img
          src="/assets/generated/hero-leaf-overlay-transparent.dim_600x700.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-auto opacity-20 pointer-events-none select-none object-cover"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block bg-olive/10 text-olive text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 font-body">
              Ancient Ayurvedic Wisdom
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-deep-green leading-tight mb-6">
              Discover Your Ayurvedic Constitution
            </h1>
            <p className="font-body text-lg text-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed">
              Your <em>Prakruti</em> — your unique nature — shapes your body,
              mind, and spirit. Answer 20 thoughtful questions to reveal your
              dominant dosha and unlock personalised wellness insights rooted in
              5,000 years of Ayurvedic tradition.
            </p>
            <Button
              onClick={onStart}
              size="lg"
              className="bg-terracotta text-cream hover:bg-terracotta/90 rounded-full px-10 py-6 text-sm uppercase tracking-widest font-body shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
              data-ocid="hero.primary_button"
            >
              Start Your Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Doshas Info */}
      <section id="doshas" className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-deep-green mb-4">
              The Three Doshas
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              In Ayurveda, all living beings are composed of three fundamental
              energies, or doshas.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {doshas.map((dosha, i) => (
              <motion.div
                key={dosha.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-feature-bg border border-border shadow-card"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${dosha.bgClass}`}
                >
                  <dosha.Icon className={`w-7 h-7 ${dosha.iconClass}`} />
                </div>
                <h3 className="font-display text-2xl font-bold text-deep-green mb-1">
                  {dosha.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">
                  {dosha.element}
                </span>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  {dosha.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="quiz" className="py-20 bg-hero-bg">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-deep-green mb-4">
            Ready to Know Your Prakruti?
          </h2>
          <p className="font-body text-foreground/80 mb-8">
            Takes only 5–7 minutes. No registration required.
          </p>
          <Button
            onClick={onStart}
            size="lg"
            className="bg-terracotta text-cream hover:bg-terracotta/90 rounded-full px-10 py-6 text-sm uppercase tracking-widest font-body"
            data-ocid="cta.primary_button"
          >
            Begin the Quiz
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep-green text-cream py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-olive flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-cream" />
              </div>
              <span className="font-display font-bold tracking-widest uppercase text-sm">
                Prakruti Path
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm font-body">
              <a
                href="#about"
                className="hover:text-terracotta transition-colors"
              >
                About
              </a>
              <a
                href="#doshas"
                className="hover:text-terracotta transition-colors"
              >
                Doshas
              </a>
              <a
                href="#quiz"
                className="hover:text-terracotta transition-colors"
              >
                Quiz
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-terracotta transition-colors"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-cream/10 text-center text-xs text-cream/50 font-body">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline hover:text-cream/80"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const doshas = [
  {
    name: "Vata",
    element: "Air & Space",
    Icon: Wind,
    bgClass: "bg-sky-100",
    iconClass: "text-sky-600",
    description:
      "Creative, quick-thinking, and enthusiastic. Vata governs all movement in the body and mind — from breath to neural impulses. When balanced, it brings vitality and joy.",
  },
  {
    name: "Pitta",
    element: "Fire & Water",
    Icon: Flame,
    bgClass: "bg-orange-100",
    iconClass: "text-orange-500",
    description:
      "Intelligent, driven, and natural leaders. Pitta governs transformation and metabolism. When balanced, it brings clarity, courage, and wisdom.",
  },
  {
    name: "Kapha",
    element: "Earth & Water",
    Icon: Droplets,
    bgClass: "bg-emerald-100",
    iconClass: "text-emerald-600",
    description:
      "Calm, loving, and deeply stable. Kapha governs structure and lubrication in the body. When balanced, it brings strength, endurance, and compassion.",
  },
];
