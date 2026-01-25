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
    }, 2100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-0 pb-32 px-6 relative overflow-hidden bg-[rgb(200,240,209)]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col lg:block text-center mb-0 relative">
            <h2 className="relative lg:absolute lg:top-8 left-0 right-0 z-10 text-2xl md:text-3xl font-bold text-[#78637f] px-4 pt-12 lg:pt-0" style={{ fontFamily: 'Gill Sans, sans-serif' }}>
              Track your steps, convert steps to EP, coins, unlock growth, badges, skins, accessories, and backgrounds.
            </h2>
            <div className="relative lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 z-20 mx-auto lg:mx-0 pt-20 pb-20 lg:py-0">
              <div className="relative">
                <Image
                  src="/potterglasses.png"
                  alt="Potter Glasses"
                  width={200}
                  height={150}
                  className="absolute -top-16 lg:-top-20 left-1/2 -translate-x-1/2 object-contain w-[150px] lg:w-[200px] h-auto"
                />
                <Image
                  src="/bar green.png"
                  alt="Green Bar"
                  width={400}
                  height={900}
                  className="object-contain w-[300px] lg:w-[400px] h-auto"
                />
                <Image
                  src="/bow.png"
                  alt="Bow"
                  width={200}
                  height={150}
                  className="absolute -bottom-16 lg:-bottom-20 left-1/2 -translate-x-1/2 object-contain w-[150px] lg:w-[200px] h-auto"
                />
              </div>
            </div>
            <video
              src="/smallmovementgreen2.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="mx-auto max-w-[800px] w-full"
            />
            <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-20 mx-auto lg:mx-0 pt-20 pb-20 lg:pt-0 lg:pb-0">
              <div className="relative">
                <Image
                  src="/strawhat.png"
                  alt="Straw Hat"
                  width={200}
                  height={150}
                  className="absolute -top-16 lg:-top-20 left-1/2 -translate-x-1/2 object-contain w-[150px] lg:w-[200px] h-auto"
                />
                <Image
                  src="/bar red.png"
                  alt="Red Bar"
                  width={400}
                  height={900}
                  className="object-contain w-[300px] lg:w-[400px] h-auto"
                />
                <Image
                  src="/patrickpants.png"
                  alt="Patrick Pants"
                  width={200}
                  height={150}
                  className="absolute -bottom-16 lg:-bottom-20 left-1/2 -translate-x-1/2 object-contain w-[150px] lg:w-[200px] h-auto"
                />
              </div>
            </div>
            <div className="relative lg:absolute lg:bottom-20 left-1/2 lg:-translate-x-1/2 z-30 -mt-40 lg:mt-0 -translate-x-1/2">
              <Image
                src="/wings.png"
                alt="Wings"
                width={450}
                height={220}
                className="object-contain w-[350px] lg:w-[450px] h-auto mx-auto"
              />
            </div>
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
            <div className="relative max-w-sm mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-[60px] animate-pulse" />

              <div className="relative h-full w-full flex items-center justify-center z-10">

                {/* Pet Evolution Visuals */}
                <div className="relative w-80 h-[500px] flex items-center justify-center">
                  {/* Stage 1: iPhone */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: step === 0 ? 1 : 0,
                      scale: step === 0 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src="/iphoneactual.png"
                      alt="iPhone"
                      width={300}
                      height={420}
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Stage 2: Badge */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: step === 1 ? 1 : 0,
                      scale: step === 1 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src="/badgecircle.png"
                      alt="Badge"
                      width={500}
                      height={500}
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Stage 3: Evolved */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: step === 2 ? 1 : 0,
                      scale: step === 2 ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Image
                      src="/adult.png"
                      alt="Adult Mewnie"
                      width={350}
                      height={350}
                      className="object-contain"
                    />
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
