"use client";

import { useAppStore } from "@/store";
import { Terminal, Shield, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact-section" },
];

export default function OSNav() {
  const { toggleTerminal, toggleRecruiterMode, isBooting } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    NAV_LINKS.forEach((link) => {
      const element = document.getElementById(link.href.replace("#", ""));
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setIsOpen(false);
    }
  };

  if (isBooting) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:flex items-center justify-between px-8 xl:px-12 py-4 xl:py-6 ${
          scrolled ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2 font-bold text-lg xl:text-[1.2rem] tracking-wider text-white">
          Aman Sharma
        </div>

        <div className="flex items-center gap-6 xl:gap-8 bg-white/5 border border-white/10 rounded-full px-6 py-2 xl:px-8 xl:py-3 backdrop-blur-sm">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`text-sm xl:text-[15px] font-medium transition-colors relative ${
                activeSection === link.href.replace("#", "") ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {link.name}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-blue rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 xl:gap-5">
          <button
            onClick={() => toggleTerminal()}
            className="p-2 xl:p-[9px] text-neon-blue bg-neon-blue/10 rounded-full border border-neon-blue/30 hover:bg-neon-blue/20 transition-colors group"
            title="Open Terminal"
          >
            <Terminal className="w-[18px] h-[18px] xl:w-[22px] xl:h-[22px] group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => toggleRecruiterMode()}
            className="p-2 xl:p-[9px] text-neon-purple bg-neon-purple/10 rounded-full border border-neon-purple/30 hover:bg-neon-purple/20 transition-colors group"
            title="Recruiter Mode"
          >
            <Shield className="w-[18px] h-[18px] xl:w-[22px] xl:h-[22px] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Nav Button */}
      <div className="md:hidden fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md"
        >
          <Menu size={20} />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="flex flex-col gap-2"
            >
              <div className="flex flex-col gap-2 p-2 bg-[#0A0A0A]/90 border border-white/10 rounded-lg backdrop-blur-md mb-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <button
                onClick={() => {
                  toggleTerminal();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A]/90 border border-neon-blue/30 text-neon-blue rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:bg-neon-blue/10 transition-colors backdrop-blur-md font-mono text-sm"
              >
                <Terminal size={16} /> Open Terminal
              </button>
              <button
                onClick={() => {
                  toggleRecruiterMode();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0A0A0A]/90 border border-neon-purple/30 text-neon-purple rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:bg-neon-purple/10 transition-colors backdrop-blur-md font-mono text-sm uppercase font-bold"
              >
                <Shield size={16} /> Recruiter Mode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
