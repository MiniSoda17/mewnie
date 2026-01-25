"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { useState, useEffect } from "react";

export default function HowItWorks() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#c1eeca]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-24">
            <video
              src="/smallmovementgreen.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="mx-auto max-w-[600px] w-full mix-blend-darken"
            />
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Steps List */}
          <div className="space-y-12">
            {[
              {
                id: 0,
                title: "Track Your Activity",
                desc: "Simply walk, run, or move. Mewnie automatically counts your steps and daily activity.",
                icon: (
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                id: 1,
                title: "Earn Energy",
                desc: "Every step generates energy for your digital companion. Hit your goals to maximize rewards.",
                icon: (
                  <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                id: 2,
                title: "Evolve Your Mewnie",
                desc: "Use your energy to feed and upgrade your pet. Watch them grow and unlock new forms.",
                icon: (
                  <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <div
                  className={`flex gap-6 p-6 rounded-2xl transition-all duration-500 border ${step === idx
                    ? "bg-black/5 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                    : "bg-transparent border-transparent opacity-50"
                    }`}
                >
                  <div className={`mt-1 h-12 w-12 flex-shrink-0 rounded-full flex items-center justify-center bg-black/5 ${step === idx ? "scale-110" : ""
                    }`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 transition-colors ${step === idx ? "text-black" : "text-gray-500"
                      }`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Visualization */}
          <FadeIn direction="left" delay={0.4}>
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-[60px] animate-pulse" />

              <div className="relative h-full w-full rounded-[3rem] glass border border-black/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />

                {/* Pet Evolution Visuals */}
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Stage 1: Egg */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: step === 0 ? 1 : 0,
                      scale: step === 0 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-32 h-40 border-4 border-purple-400/50 rounded-[50%] bg-purple-500/10 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                      <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping" />
                    </div>
                  </motion.div>

                  {/* Stage 2: Baby */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: step === 1 ? 1 : 0,
                      scale: step === 1 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.3)] animate-bounce-slow">
                      <div className="flex gap-4">
                        <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
                        <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Stage 3: Evolved */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: step === 2 ? 1 : 0,
                      scale: step === 2 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse" />
                      <div className="w-40 h-40 rounded-[2rem] bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 p-[2px] shadow-[0_0_60px_rgba(168,85,247,0.4)]">
                        <div className="w-full h-full rounded-[2rem] bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <div className="text-white text-6xl">
                            👾
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? "w-8 bg-white" : "w-2 bg-white/20"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
