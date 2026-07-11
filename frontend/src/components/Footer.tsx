"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, ArrowUp } from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative z-10 overflow-hidden bg-background border-t border-white/10 pt-16 pb-8">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-black font-heading text-white">
              {portfolioData.personal.name.split(' ')[0]}<span className="text-primary">.</span>
            </h3>
            <p className="text-text-secondary max-w-md leading-relaxed">
              Building intelligent systems, scalable architectures, and beautiful user experiences.
              Constantly pushing the boundaries of what's possible with code.
            </p>
            <div className="flex gap-4">
              <SocialLink href={portfolioData.personal.github} icon={<FaGithub className="w-5 h-5" />} />
              {portfolioData.personal.leetcode && (
                <SocialLink href={portfolioData.personal.leetcode} icon={<SiLeetcode className="w-5 h-5 text-[#FFA116]" />} />
              )}
              <SocialLink href={portfolioData.personal.linkedin} icon={<FaLinkedin className="w-5 h-5" />} />
              <SocialLink href={`mailto:${portfolioData.personal.email}`} icon={<Mail className="w-5 h-5" />} />
              <SocialLink href="#" icon={<FaTwitter className="w-5 h-5" />} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading tracking-wide">Navigation</h4>
            <ul className="space-y-4">
              <FooterLink href="#about">About</FooterLink>
              <FooterLink href="#skills">Skills</FooterLink>
              <FooterLink href="#projects">Projects</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading tracking-wide">Resources</h4>
            <ul className="space-y-4">
              <FooterLink href="#blog-section">Blog</FooterLink>
              <FooterLink href="#coding-profiles">Profiles</FooterLink>
              <FooterLink href="/resume.pdf" external>Resume</FooterLink>
              <FooterLink href="#contact-section">Contact</FooterLink>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-secondary text-sm font-mono">
            &copy; {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
          
          <motion.button 
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <li>
      <a 
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noreferrer" : ""}
        className="text-text-secondary hover:text-primary transition-colors text-sm font-medium"
      >
        {children}
      </a>
    </li>
  );
}
