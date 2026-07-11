"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Moon, Sun, Menu, X } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "next-themes";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Certificates", href: "#certificates" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact-section" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      // Glass effect trigger
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlight
      for (const link of navLinks) {
        const id = link.href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(link.name.toLowerCase());
            break;
          }
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "py-3" : "py-5"
          }`}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
              isScrolled ? "glass-panel" : "bg-transparent"
            }`}>
              
              {/* Logo */}
              <div className="flex-shrink-0">
                <a href="#home" className="text-xl font-heading font-bold text-gradient tracking-tight">
                  Aman<span className="text-foreground">.dev</span>
                </a>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.href.replace("#", ""));
                      if (element) {
                        window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
                      }
                      setActiveSection(link.name.toLowerCase());
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                      activeSection === link.name.toLowerCase() 
                        ? "text-primary bg-white/5" 
                        : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Socials & Theme Toggle */}
              <div className="hidden md:flex items-center space-x-3">
                <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-text-secondary hover:text-white group">
                  <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                {portfolioData.personal.leetcode && (
                  <a href={portfolioData.personal.leetcode} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-text-secondary hover:text-[#FFA116] group">
                    <SiLeetcode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )}
                <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-text-secondary hover:text-primary group">
                  <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-text-secondary hover:text-accent group">
                  <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <button 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-text-secondary hover:text-warning"
                  aria-label="Toggle theme"
                >
                  {mounted ? (
                    theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden flex items-center">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-text-secondary hover:text-white focus:outline-none"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="md:hidden mt-2 glass-panel rounded-2xl overflow-hidden"
                >
                  <div className="px-4 pt-2 pb-4 space-y-1">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(link.href.replace("#", ""));
                          if (element) {
                            window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
                          }
                          setActiveSection(link.name.toLowerCase());
                          setMobileMenuOpen(false);
                        }}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          activeSection === link.name.toLowerCase()
                            ? "bg-primary/20 text-primary"
                            : "text-text-secondary hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </a>
                    ))}
                    <div className="pt-4 flex justify-around">
                      <a href={portfolioData.personal.github} className="text-text-secondary hover:text-white"><FaGithub className="w-6 h-6" /></a>
                      {portfolioData.personal.leetcode && (
                        <a href={portfolioData.personal.leetcode} className="text-text-secondary hover:text-[#FFA116]"><SiLeetcode className="w-6 h-6" /></a>
                      )}
                      <a href={portfolioData.personal.linkedin} className="text-text-secondary hover:text-primary"><FaLinkedin className="w-6 h-6" /></a>
                      <a href="/resume.pdf" className="text-text-secondary hover:text-accent"><FileText className="w-6 h-6" /></a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
