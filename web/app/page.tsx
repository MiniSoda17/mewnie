import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground selection:bg-accent-primary selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
            mewnies
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <Link
              href="#features"
              className="hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link href="#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/signup"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              Join Beta
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 max-w-7xl mx-auto flex flex-col items-center text-center space-y-8 py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Beta in process
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Experience the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              magic
            </span>{" "}
            of mewnie.
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Become healther using mewnie to track your fitness journey. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-1"
            >
              Join Waitlist
            </Link>
            <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all">
              View Demo
            </button>
          </div>

          {/* Hero Image / Placeholder */}
          <div className="w-full max-w-5xl mt-20 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative aspect-video rounded-2xl glass border border-white/10 overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
              <p className="text-gray-600 font-mono">
                [ App Dashboard Placeholder ]
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Why Mewnie?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything you need to build faster and look better doing it.
            </p>
          </div>

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
              <div
                key={i}
                className="p-8 rounded-2xl glass border border-white/10 hover:border-purple-500/30 transition-colors group"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="h-6 w-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
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
              <details
                key={i}
                className="group glass rounded-xl border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors list-none">
                  <span className="font-medium text-lg text-white">
                    {item.q}
                  </span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform duration-300">
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
                <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                  <p className="pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
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
