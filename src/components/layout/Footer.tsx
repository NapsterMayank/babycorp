import Link from "next/link";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Sports", href: "/sports" },
      { label: "Pricing", href: "/pricing" },
      { label: "Safety", href: "/safety" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Sports",
    links: [
      { label: "Swimming", href: "#sports" },
      { label: "Gymnastics", href: "#sports" },
      { label: "Chess", href: "#sports" },
      { label: "Badminton", href: "#sports" },
      { label: "Table Tennis", href: "#sports" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-orange rounded-xl flex items-center justify-center">
                <span className="text-navy font-bebas text-xl font-bold">B</span>
              </div>
              <div>
                <div className="font-nunito font-black text-lg tracking-tight">
                  BABYCORP
                </div>
                <div className="text-[9px] text-gold/80 font-poppins tracking-widest uppercase">
                  Building Champions
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm font-lato leading-relaxed mb-6">
              India&apos;s first early childhood sports development platform. We
              don&apos;t wait for champions — we build them.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange transition-colors duration-300"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-poppins font-semibold text-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm font-lato hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-gold mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={16} className="text-orange" />
                hello@babycorp.in
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={16} className="text-orange" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin size={16} className="text-orange mt-0.5" />
                Mumbai • Delhi • Bengaluru • Hyderabad • Chennai • Pune
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-lato">
            BabyCorp © 2025 | Making India&apos;s Champions
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
