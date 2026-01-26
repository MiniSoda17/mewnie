
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[rgb(200,240,209)] font-sans text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#756281] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/gemini logo.png"
              alt="Mewnie logo"
              width={60}
              height={20}
              className="object-contain"
            />
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            Join Beta
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b pb-4">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h2>
              <p>
                Welcome to Mewnie ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h2>
              <p>
                Currently, we only collect information that you voluntarily provide to us when you join our beta waitlist. This information is limited to your:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Email address</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p>
                We use your email address solely for the purpose of:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Managing our beta waitlist</li>
                <li>Sending you updates regarding the launch of Mewnie</li>
                <li>Notifying you when you can access the application</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. Your data is stored securely using industry-standard database providers (Supabase).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h2>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
              <p>
                If you have questions or comments about this policy, you may email us at support@mewnie.app
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/10 bg-black/5 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-gray-800">mewnie</div>
          <div className="flex gap-6 text-gray-600 text-sm">
            <Link href="/privacy" className="hover:text-black transition-colors font-medium">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
          <div className="text-gray-500 text-sm">© 2026 Mewnie Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
