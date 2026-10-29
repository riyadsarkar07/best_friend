"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionFrame } from "@/components/SectionFrame";
import { friendshipConfig } from "@/data/friendship-config";

export function FriendshipQuiz() {
  const questions = friendshipConfig.quizQuestions;
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[step];
  const result =
    [...friendshipConfig.quizResults].reverse().find((item) => score >= item.minScore) ??
    friendshipConfig.quizResults[0];

  const choose = (points: number) => {
    const nextScore = score + points;
    if (step + 1 >= questions.length) {
      setScore(nextScore);
      setDone(true);
      return;
    }
    setScore(nextScore);
    setStep((value) => value + 1);
  };

  const replay = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  return (
    <SectionFrame
      id="quiz"
      kicker="Optional, and a little silly"
      title={friendshipConfig.quizTitle}
      intro={friendshipConfig.quizIntro}
    >
      <div className="paper-sheet mx-auto max-w-2xl rounded-md p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!done && current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-ink-soft">
                Question {step + 1} of {questions.length}
              </p>
              <h3 className="mt-3 font-serif text-3xl text-ink">{current.prompt}</h3>
              <div className="mt-6 grid gap-3">
                {current.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => choose(option.points)}
                    className="min-h-12 cursor-pointer rounded-md border border-cream-deep bg-paper px-4 py-3 text-left text-ink transition duration-200 hover:border-sage hover:bg-sage-soft/60"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-script text-2xl text-sage">Unofficial result</p>
              <h3 className="mt-2 font-serif text-3xl text-ink">{result.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{result.body}</p>
              <p className="mt-3 text-sm text-ink-soft">Score kept only in this browser tab: {score} points.</p>
              <button
                type="button"
                onClick={replay}
                className="mt-6 inline-flex min-h-12 cursor-pointer items-center rounded-full bg-pink px-5 font-semibold text-paper"
              >
                Play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionFrame>
  );
}
