import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, MessageCircle } from "lucide-react";

const PLATFORM_LINKS = [
  { label: "Discover Academies", href: "/discover" },
  { label: "Sports Programs", href: "/sports" },
  { label: "Partner Schools", href: "/schools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Safety", href: "/safety" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Refund Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-orange to-gold rounded-xl flex items-center justify-center shadow-md">
                <Image src="/logo.png" alt="BabyCorp" width={22} height={22} className="object-contain" />
              </div>
              <span className="font-nunito font-black text-white text-lg">BabyCorp</span>
            </Link>
            <p className="font-lato text-white/50 text-sm leading-relaxed mb-4">
              Building Champions Since 2024
            </p>
            <p className="font-poppins text-white/30 text-sm mb-6">Made in India 🇮🇳</p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: MessageCircle, href: "#", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-orange/20 hover:border-orange/30 transition-all duration-200"
                >
                  <Icon size={15} className="text-white/50 hover:text-orange transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Platform */}
          <div>
            <p className="font-poppins font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">Platform</p>
            <ul className="space-y-3">
              {PLATFORM_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-lato text-white/45 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <p className="font-poppins font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">Company</p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-lato text-white/45 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <p className="font-poppins font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">Legal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="font-lato text-white/45 text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-lato text-white/30 text-sm">
            &copy; 2025 BabyCorp Technologies Pvt. Ltd.
          </p>
          <p className="font-lato text-white/20 text-sm">
            Delhi · Mumbai · Bengaluru
          </p>
        </div>
      </div>
    </footer>
  );
}
