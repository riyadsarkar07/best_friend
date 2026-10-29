"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { SectionFrame } from "@/components/SectionFrame";
import { HeartDoodle, Sparkle } from "@/components/Doodles";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipQuiz() {
  const reduce = useReducedMotion();
  const questions = friendshipConfig.quizQuestions;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const score = useMemo(
    () => Object.values(answers).reduce((total, points) => total + points, 0),
    [answers],
  );
  const maxScore = useMemo(
    () => questions.reduce((total, question) => total + Math.max(...question.options.map((o) => o.points)), 0),
    [questions],
  );
  const result = useMemo(
    () =>
      [...friendshipConfig.quizResults]
        .sort((a, b) => b.minScore - a.minScore)
        .find((item) => score >= item.minScore) ?? friendshipConfig.quizResults[0],
    [score],
  );

  const current = questions[step];

  const choose = (optionId: string, points: number) => {
    setAnswers((current) => ({ ...current, [questions[step].id]: points }));
    if (step + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setStep((value) => value + 1);
  };

  const replay = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const progress = done ? 100 : Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <SectionFrame
      id="quiz"
      eyebrow={friendshipConfig.quizEyebrow}
      title={friendshipConfig.quizTitle}
      intro={friendshipConfig.quizIntro}
      tone="blush"
      align="center"
    >
      <div className="paper-sheet relative mx-auto max-w-2xl overflow-hidden rounded-[6px] p-5 sm:p-8 lg:p-10">
        <span className="tape-blush tape absolute -top-2 left-1/2 h-5 w-24 -translate-x-1/2 rotate-1" aria-hidden="true" />
        <Sparkle className="absolute right-5 top-5 h-5 w-5 text-gold/55" />

        <div className="mb-6 flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-cream-deep">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sage to-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>
          <span className="shrink-0 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
            {done ? "Complete" : `${Object.keys(answers).length}/${questions.length}`}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!done && current ? (
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <p className="eyebrow">
                Question {step + 1} of {questions.length}
              </p>
              <h3 className="serif-display balance mt-2 text-[1.7rem] leading-tight text-ink sm:text-[2.1rem]">
                {current.prompt}
              </h3>

              <div className="mt-6 grid gap-2.5">
                {current.options.map((option, index) => {
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => choose(option.id, option.points)}
                      className="group flex min-h-[3.25rem] w-full cursor-pointer items-center gap-3 rounded-xl border border-line bg-paper/80 px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-sage/45 hover:bg-sage-soft/35 hover:shadow-[var(--shadow-sm)]"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-cream/60 text-[0.68rem] font-bold text-ink-faint transition group-hover:border-sage/40 group-hover:text-sage-deep">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-[0.94rem] leading-snug text-ink">
                        {option.label}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint/0 transition group-hover:translate-x-0.5 group-hover:text-sage" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((value) => Math.max(0, value - 1))}
                  className="btn-link mt-5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Previous question
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              className="text-center"
              aria-live="polite"
            >
              <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-sage-soft/70">
                <HeartDoodle className="h-8 w-8 text-blush-deep" />
                <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-gold" />
              </div>
              <p className="eyebrow mt-5">Unofficial result</p>
              <h3 className="serif-display balance mt-2 text-[1.8rem] leading-tight text-ink sm:text-[2.2rem]">
                {result.title}
              </h3>
              <p className="pretty mx-auto mt-3 max-w-lg text-[1rem] leading-relaxed text-ink-soft">
                {result.body}
              </p>

              <div className="mx-auto mt-6 flex max-w-xs items-center gap-3 rounded-xl border border-line bg-cream/50 px-4 py-3">
                <div className="flex-1">
                  <div className="h-1.5 overflow-hidden rounded-full bg-cream-deep">
                    <motion.div
                      className="h-full rounded-full bg-sage"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((score / maxScore) * 100)}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                    />
                  </div>
                </div>
                <span className="shrink-0 text-[0.72rem] font-bold text-ink-soft">
                  {score} / {maxScore}
                </span>
              </div>
              <p className="mt-3 text-[0.72rem] text-ink-faint">Kept only in this browser tab.</p>

              <button type="button" onClick={replay} className="btn btn-primary mt-6">
                <RotateCcw className="h-4 w-4" aria-hidden="true" /> Play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionFrame>
  );
}
