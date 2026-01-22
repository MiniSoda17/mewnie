import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export default function Signup() {
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
                src="/logo.svg" 
                alt="Mewnie Logo" 
                width={120} 
                height={40} 
                priority
              />
            </Link>
            <h2 className="text-white text-xl font-semibold mt-4">Join the Beta</h2>
            <p className="text-gray-400 text-sm mt-2">Get early access to the future of fitness.</p>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
            </div>
            
            <button 
              type="button" 
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] mt-2"
            >
              Join Waitlist
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Limited spots available.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
