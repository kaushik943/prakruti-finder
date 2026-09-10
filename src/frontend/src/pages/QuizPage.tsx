import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Question, QuizResult } from "../backend";
import { useCalculatePrakruti, useGetQuestions } from "../hooks/useQueries";

const FALLBACK_QUESTIONS: Question[] = [
  {
    category: "Body Frame",
    questionText: "What is your body frame?",
    optionVata: "Thin, light — tall or short with narrow frame",
    optionPitta: "Medium, muscular and well-proportioned build",
    optionKapha: "Large, sturdy, broad-shouldered frame",
  },
  {
    category: "Body Frame",
    questionText: "How is your body weight?",
    optionVata: "Hard to gain weight, tends to be underweight",
    optionPitta: "Easy to gain or lose, naturally muscular",
    optionKapha: "Gains weight easily, hard to lose",
  },
  {
    category: "Skin & Hair",
    questionText: "How would you describe your skin?",
    optionVata: "Dry, rough, or thin — tends to crack",
    optionPitta: "Oily, sensitive, prone to rashes or inflammation",
    optionKapha: "Thick, smooth, oily — rarely reacts",
  },
  {
    category: "Skin & Hair",
    questionText: "How is your hair?",
    optionVata: "Dry, frizzy, thin — splits easily",
    optionPitta: "Fine, oily, premature graying or thinning",
    optionKapha: "Thick, oily, wavy — grows abundantly",
  },
  {
    category: "Skin & Hair",
    questionText: "How are your eyes?",
    optionVata: "Small, active, dark brown or grey",
    optionPitta: "Sharp, penetrating, green or hazel",
    optionKapha: "Large, calm, blue or dark brown",
  },
  {
    category: "Appetite & Digestion",
    questionText: "How is your appetite?",
    optionVata: "Irregular and variable — sometimes famished, sometimes not",
    optionPitta: "Strong and intense — can't skip meals easily",
    optionKapha: "Steady and moderate — can skip meals without issue",
  },
  {
    category: "Appetite & Digestion",
    questionText: "How is your digestion?",
    optionVata: "Irregular, prone to bloating or gas",
    optionPitta: "Strong but sensitive — acid reflux possible",
    optionKapha: "Slow but steady and reliable",
  },
  {
    category: "Appetite & Digestion",
    questionText: "What foods do you prefer?",
    optionVata: "Warm, moist, sweet, salty foods",
    optionPitta: "Cool, sweet, bitter foods",
    optionKapha: "Light, spicy, dry, and stimulating foods",
  },
  {
    category: "Sleep & Energy",
    questionText: "How is your sleep?",
    optionVata: "Light sleeper, interrupted, often under-rested",
    optionPitta: "Moderate sleep, may wake up feeling hot",
    optionKapha: "Deep, heavy sleeper — loves long sleep",
  },
  {
    category: "Sleep & Energy",
    questionText: "How is your energy level?",
    optionVata: "Variable, comes in bursts then depletes",
    optionPitta: "Moderate and focused throughout the day",
    optionKapha: "Steady, slow to start but highly enduring",
  },
  {
    category: "Mind & Personality",
    questionText: "How do you learn?",
    optionVata: "Quick to learn, but quick to forget",
    optionPitta: "Sharp, analytical — retains with understanding",
    optionKapha: "Slow to learn, but never forgets",
  },
  {
    category: "Mind & Personality",
    questionText: "How do you handle stress?",
    optionVata: "Anxious, worried, fearful",
    optionPitta: "Irritable, frustrated, or angry",
    optionKapha: "Withdrawn, depressed, or reclusive",
  },
  {
    category: "Mind & Personality",
    questionText: "How is your memory?",
    optionVata: "Short-term good, long-term tends to be poor",
    optionPitta: "Sharp and accurate",
    optionKapha: "Long-term excellent, but takes time to recall",
  },
  {
    category: "Mind & Personality",
    questionText: "What describes your speech?",
    optionVata: "Fast, talkative, jumps between topics",
    optionPitta: "Sharp, precise, sometimes argumentative",
    optionKapha: "Slow, methodical, melodious",
  },
  {
    category: "Emotions & Temperament",
    questionText: "What is your typical emotional nature?",
    optionVata: "Enthusiastic, vivacious, changeable",
    optionPitta: "Passionate, purposeful, intense",
    optionKapha: "Calm, steady, content",
  },
  {
    category: "Emotions & Temperament",
    questionText: "How do you make decisions?",
    optionVata: "Quickly, but changes mind often",
    optionPitta: "Decisively and confidently",
    optionKapha: "Slowly, after much deliberation",
  },
  {
    category: "Emotions & Temperament",
    questionText: "How do you respond to change?",
    optionVata: "Adapt easily but feel anxious",
    optionPitta: "Resist if it seems illogical",
    optionKapha: "Strongly resist change",
  },
  {
    category: "Emotions & Temperament",
    questionText: "What climate do you prefer?",
    optionVata: "Warm and moist climates",
    optionPitta: "Cool, well-ventilated spaces",
    optionKapha: "Warm, dry climates",
  },
  {
    category: "Emotions & Temperament",
    questionText: "How is your physical activity preference?",
    optionVata: "Enjoy movement, dance, walking",
    optionPitta: "Enjoy competitive, intense sports",
    optionKapha: "Prefer leisure activities, yoga",
  },
  {
    category: "Emotions & Temperament",
    questionText: "What best describes your lifestyle?",
    optionVata: "Creative, artistic, spontaneous",
    optionPitta: "Organized, ambitious, driven",
    optionKapha: "Relaxed, routine-oriented, nurturing",
  },
];

interface Props {
  onComplete: (result: QuizResult) => void;
  onBack: () => void;
}

export default function QuizPage({ onComplete, onBack }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(20).fill(null),
  );
  const [direction, setDirection] = useState(1);

  const { data: backendQuestions, isLoading } = useGetQuestions();
  const calculateMutation = useCalculatePrakruti();

  const questions =
    backendQuestions && backendQuestions.length > 0
      ? backendQuestions
      : FALLBACK_QUESTIONS;
  const total = questions.length;
  const progress = Math.round(((current + 1) / total) * 100);
  const q = questions[current];

  const handleSelect = (answerIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = answerIdx;
      return next;
    });
  };

  const handleNext = () => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  };
  const handlePrev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  };

  const handleSubmit = async () => {
    const finalAnswers = answers.map((a) => a ?? 0);
    try {
      const result = await calculateMutation.mutateAsync(finalAnswers);
      onComplete(result);
    } catch {
      const vata = finalAnswers.filter((a) => a === 0).length;
      const pitta = finalAnswers.filter((a) => a === 1).length;
      const kapha = finalAnswers.filter((a) => a === 2).length;
      const vp = Math.round((vata / total) * 100);
      const pp = Math.round((pitta / total) * 100);
      const kp = Math.round((kapha / total) * 100);
      const sorted = [
        { name: "Vata", count: vata },
        { name: "Pitta", count: pitta },
        { name: "Kapha", count: kapha },
      ].sort((a, b) => b.count - a.count);
      const top = sorted[0];
      const second = sorted[1];
      let dominant: string;
      if (top.count === second.count && second.count === sorted[2].count) {
        dominant = "Tri-Doshic (Vata-Pitta-Kapha)";
      } else if (top.count - second.count <= 2) {
        dominant = `${top.name}-${second.name}`;
      } else {
        dominant = top.name;
      }
      onComplete({
        dominantDosha: dominant,
        vataPercentage: vp,
        pittaPercentage: pp,
        kaphaPercentage: kp,
      });
    }
  };

  const options = q
    ? [
        { label: q.optionVata, value: 0 },
        { label: q.optionPitta, value: 1 },
        { label: q.optionKapha, value: 2 },
      ]
    : [];

  const isLast = current === total - 1;
  const currentAnswer = answers[current];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-hero-bg flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full border-4 border-terracotta border-t-transparent animate-spin mx-auto mb-4"
            data-ocid="quiz.loading_state"
          />
          <p className="font-body text-muted-foreground">Loading questions…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-bg flex flex-col">
      <header className="bg-header-bg border-b border-border py-4 px-6 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="quiz.cancel_button"
        >
          <ChevronLeft className="w-5 h-5" />
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

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-card rounded-3xl shadow-card border border-border overflow-hidden">
            <div className="px-8 pt-8 pb-6 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-widest text-terracotta font-body font-medium">
                  {q?.category}
                </span>
                <span className="text-xs font-body text-muted-foreground">
                  {current + 1} of {total}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-border overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-terracotta"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            <div className="px-8 py-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="font-display text-2xl font-bold text-deep-green mb-8 leading-snug">
                    {q?.questionText}
                  </h2>
                  <div className="space-y-3" data-ocid="quiz.panel">
                    {options.map((opt, idx) => {
                      const selected = currentAnswer === opt.value;
                      return (
                        <button
                          type="button"
                          key={opt.value}
                          onClick={() => handleSelect(opt.value)}
                          className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all font-body ${
                            selected
                              ? "border-terracotta bg-terracotta/5"
                              : "border-border bg-background hover:border-olive/40 hover:bg-secondary/50"
                          }`}
                          data-ocid={`quiz.item.${idx + 1}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                              selected
                                ? "border-terracotta"
                                : "border-muted-foreground/40"
                            }`}
                          >
                            {selected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${selected ? "text-terracotta font-medium" : "text-foreground"}`}
                          >
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="px-8 pb-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={current === 0}
                className="rounded-full border-border text-foreground gap-1 font-body"
                data-ocid="quiz.secondary_button"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              {isLast ? (
                <Button
                  onClick={handleSubmit}
                  disabled={
                    currentAnswer === null || calculateMutation.isPending
                  }
                  className="rounded-full bg-terracotta text-cream hover:bg-terracotta/90 px-8 font-body text-sm uppercase tracking-widest"
                  data-ocid="quiz.submit_button"
                >
                  {calculateMutation.isPending
                    ? "Calculating…"
                    : "See My Prakruti"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={currentAnswer === null}
                  className="rounded-full bg-terracotta text-cream hover:bg-terracotta/90 px-8 gap-1 font-body text-sm uppercase tracking-widest"
                  data-ocid="quiz.primary_button"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
