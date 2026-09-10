import { Button } from "@/components/ui/button";
import { Droplets, Flame, Home, Leaf, RotateCcw, Wind } from "lucide-react";
import { motion } from "motion/react";
import type { QuizResult } from "../backend";

interface Props {
  result: QuizResult;
  onRetake: () => void;
  onHome: () => void;
}

interface DoshaInfo {
  name: string;
  element: string;
  Icon: React.ElementType;
  bgClass: string;
  textClass: string;
  barClass: string;
  description: string;
  traits: string[];
  diet: string;
  lifestyle: string;
}

const doshaData: DoshaInfo[] = [
  {
    name: "Vata",
    element: "Air & Space",
    Icon: Wind,
    bgClass: "bg-sky-100",
    textClass: "text-sky-700",
    barClass: "bg-sky-500",
    description:
      "Creative, quick-thinking, and enthusiastic. Vata governs all movement — from breath to neural impulses — and brings lightness, adaptability, and vitality when in balance.",
    traits: [
      "Creative & imaginative",
      "Quick learner",
      "Enthusiastic & lively",
      "Flexible & adaptable",
      "Communicative",
    ],
    diet: "Favour warm, moist, nourishing foods: ghee, sesame oil, root vegetables, warm soups, dairy. Avoid cold, dry, and raw foods.",
    lifestyle:
      "Maintain a regular daily routine. Prioritise warmth, oil massages (Abhyanga), adequate sleep, and calming practices like yoga and meditation.",
  },
  {
    name: "Pitta",
    element: "Fire & Water",
    Icon: Flame,
    bgClass: "bg-orange-100",
    textClass: "text-orange-700",
    barClass: "bg-orange-500",
    description:
      "Intelligent, driven, and natural leaders. Pitta governs transformation and metabolism — digestion of food, ideas, and experiences — bringing clarity and courage when balanced.",
    traits: [
      "Sharp intellect",
      "Natural leader",
      "Goal-oriented",
      "Courageous & confident",
      "Articulate",
    ],
    diet: "Favour cool, sweet, and bitter foods: coconut water, cucumbers, coriander, sweet fruits. Avoid spicy, salty, and fried foods.",
    lifestyle:
      "Avoid overheating and excessive competition. Practice moderation, spend time in nature, and embrace cooling activities like swimming and moon-gazing.",
  },
  {
    name: "Kapha",
    element: "Earth & Water",
    Icon: Droplets,
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-700",
    barClass: "bg-emerald-600",
    description:
      "Calm, loving, and deeply stable. Kapha governs structure and lubrication in the body — providing strength, endurance, and profound compassion when in balance.",
    traits: [
      "Emotionally stable",
      "Nurturing & compassionate",
      "Strong endurance",
      "Reliable & loyal",
      "Excellent long-term memory",
    ],
    diet: "Favour light, spicy, and dry foods: ginger, honey, legumes, dark leafy greens. Avoid heavy, oily, and sweet foods.",
    lifestyle:
      "Embrace regular vigorous exercise, variety, and stimulation. Wake early, try new activities, and avoid excessive sleep or sedentary habits.",
  },
];

function getPresentDoshas(result: QuizResult): DoshaInfo[] {
  const dominant = result.dominantDosha.toLowerCase();
  return doshaData.filter((d) => dominant.includes(d.name.toLowerCase()));
}

export default function ResultsPage({ result, onRetake, onHome }: Props) {
  const present = getPresentDoshas(result);
  const isTri = result.dominantDosha.toLowerCase().includes("tri");

  const bars = [
    { label: "Vata", value: result.vataPercentage, barClass: "bg-sky-500" },
    {
      label: "Pitta",
      value: result.pittaPercentage,
      barClass: "bg-orange-500",
    },
    {
      label: "Kapha",
      value: result.kaphaPercentage,
      barClass: "bg-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-hero-bg flex flex-col">
      <header className="bg-header-bg border-b border-border py-4 px-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onHome}
          className="text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="results.link"
        >
          <Home className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-olive flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5 text-cream" />
          </div>
          <span className="font-display font-bold text-sm text-deep-green tracking-widest uppercase">
            Prakruti Path
          </span>
        </div>
      </header>

      <main className="flex-1 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl shadow-card border border-border p-8 text-center"
            data-ocid="results.card"
          >
            <span className="inline-block bg-terracotta/10 text-terracotta text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 font-body">
              Your Prakruti
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-green mb-3">
              {isTri ? "Tri-Doshic" : result.dominantDosha}
            </h1>
            <p className="font-body text-muted-foreground text-sm mb-1">
              {isTri
                ? "Vata · Pitta · Kapha"
                : result.dominantDosha.includes("-")
                  ? "Dual Dosha Type"
                  : "Single Dosha Dominant"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card rounded-3xl shadow-card border border-border p-8"
            data-ocid="results.panel"
          >
            <h2 className="font-display text-xl font-bold text-deep-green mb-6">
              Dosha Breakdown
            </h2>
            <div className="space-y-5">
              {bars.map((bar, i) => (
                <div key={bar.label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-sm font-medium text-foreground">
                      {bar.label}
                    </span>
                    <span className="font-body text-sm font-semibold text-foreground">
                      {bar.value}%
                    </span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-border overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${bar.barClass}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${bar.value}%` }}
                      transition={{
                        duration: 0.8,
                        delay: 0.3 + i * 0.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {present.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="bg-card rounded-3xl shadow-card border border-border p-8"
              data-ocid={`results.item.${i + 1}`}
            >
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${d.bgClass}`}
                >
                  <d.Icon className={`w-6 h-6 ${d.textClass}`} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-deep-green">
                    {d.name}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    {d.element}
                  </span>
                </div>
              </div>
              <p className="font-body text-sm text-foreground/80 leading-relaxed mb-5">
                {d.description}
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-secondary p-4">
                  <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Characteristics
                  </h4>
                  <ul className="space-y-1.5">
                    {d.traits.map((t) => (
                      <li
                        key={t}
                        className="font-body text-xs text-foreground flex items-start gap-2"
                      >
                        <span
                          className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${d.barClass}`}
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-secondary p-4">
                  <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Diet Tips
                  </h4>
                  <p className="font-body text-xs text-foreground/80 leading-relaxed">
                    {d.diet}
                  </p>
                </div>
                <div className="rounded-2xl bg-secondary p-4">
                  <h4 className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Lifestyle Tips
                  </h4>
                  <p className="font-body text-xs text-foreground/80 leading-relaxed">
                    {d.lifestyle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pb-8"
          >
            <Button
              onClick={onRetake}
              variant="outline"
              className="rounded-full border-terracotta text-terracotta hover:bg-terracotta/5 gap-2 font-body uppercase tracking-widest text-xs px-8 py-5"
              data-ocid="results.secondary_button"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </Button>
            <Button
              onClick={onHome}
              className="rounded-full bg-terracotta text-cream hover:bg-terracotta/90 gap-2 font-body uppercase tracking-widest text-xs px-8 py-5"
              data-ocid="results.primary_button"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>

          <div className="text-center text-xs text-muted-foreground font-body pb-4">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
