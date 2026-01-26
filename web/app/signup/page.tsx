'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import { joinWaitlist } from "./actions";

import FadeIn from "@/components/FadeIn";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await joinWaitlist(formData);
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: "You've been added to the waitlist!" });
        setEmail("");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-pink-900/20 rounded-full blur-[120px] pointer-events-none" />

      <FadeIn className="w-full max-w-md relative z-10" delay={0.1}>
        <div className="glass border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/mewnielogotransparent.png"
                alt="Mewnie logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </Link>
            <h2 className="text-gray-900 text-xl font-semibold mt-4">Join the Beta</h2>
            <p className="text-gray-600 text-sm mt-2">Get early access to the future of fitness.</p>
          </div>

          {!message || message.type === 'error' ? (
             <form action={handleSubmit} className="space-y-4">
               <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                 <input
                   type="email"
                   name="email"
                   id="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="you@example.com"
                   required
                   className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                 />
               </div>

               {message?.type === 'error' && (
                 <p className="text-red-500 text-sm">{message.text}</p>
               )}

               <button
                 type="submit"
                 disabled={isPending}
                 className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isPending ? 'Joining...' : 'Join Waitlist'}
               </button>
             </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">You're in!</h3>
              <p className="text-gray-600">Thanks for joining. We'll be in touch soon.</p>
            </div>
          )}

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Limited spots available.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
