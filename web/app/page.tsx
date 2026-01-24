import Link from "next/link";
import Image from "next/image";

import FadeIn from "@/components/FadeIn";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground selection:bg-accent-primary selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#756281] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold text-white">mewnie</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all"
            >
              Join Waitlist
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              Join Beta
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="w-full relative">
          <FadeIn delay={0.1} className="w-full">
            <div className="relative w-full">
              <Image
                src="/frontpage.png"
                alt="Mewnie Interface"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
                unoptimized
              />
            </div>
          </FadeIn>
        </section>

        {/* River Background Section */}
        <section className="w-full relative">
          <FadeIn delay={0} className="w-full">
            <div className="relative w-full">
              <Image
                src="/secondpagenewnew.png"
                alt="River Background"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          </FadeIn>
        </section>

        {/* How It Works Section */}
        <div className="pt-20">
          <HowItWorks />
        </div>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-black">
                Why Mewnie?
              </h2>
              <p className="text-gray-700 max-w-xl mx-auto">
                Everything you need to build faster and look better doing it.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Lightning Fast",
                desc: "Optimized for speed. Experience zero latency interactions.",
              },
              {
                title: "Beautiful Design",
                desc: "Stunning presets that make your work stand out instantly.",
              },
              {
                title: "Secure & Private",
                desc: "Your data is encrypted and safe with us. Always.",
              },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1} fullWidth>
                <div
                  className="h-full p-8 rounded-2xl glass border border-black/10 hover:border-purple-500/30 transition-colors group"
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>


        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              {
                q: "Is Mewnie free to use?",
                a: "Yes! We offer a generous free tier for all users. You can upgrade to Pro for advanced features.",
              },
              {
                q: "Can I collaborate with my team?",
                a: "Absolutely. Real-time collaboration is built into the core of Mewnie.",
              },
              {
                q: "How do I export my data?",
                a: "You can export your projects in standard formats like PDF, PNG, or JSON at any time.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <details
                  className="group glass rounded-xl border border-black/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-black/5 transition-colors list-none">
                    <span className="font-medium text-lg text-black">
                      {item.q}
                    </span>
                    <span className="text-gray-600 group-open:rotate-180 transition-transform duration-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-700 leading-relaxed border-t border-black/5 mt-2">
                    <p className="pt-4">{item.a}</p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <FadeIn>
            <div className="max-w-4xl mx-auto rounded-3xl relative overflow-hidden text-center py-20 px-6 border border-white/10 glass">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 z-[-1]" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Join the evolution
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-lg mx-auto">
                Be among the first to experience the future of fitness tracking.
              </p>
              <Link
                href="/signup"
                className="px-10 py-5 rounded-full bg-white text-black font-bold text-xl hover:bg-gray-200 transition-transform hover:scale-105 inline-block"
              >
                Join Beta Waitlist
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white">mewnie</div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-gray-500 text-sm">
            © 2024 Mewnie Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
