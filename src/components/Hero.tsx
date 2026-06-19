"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { portfolioData } from "@/data/portfolio";

const typingWords = [
  "AI/ML Enthusiast",
  "Building Intelligent Systems",
  "Future Software Engineer",
  "Future AI Engineer",
  "Open Source Learner",
  "Learning. Building. Innovating."
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const word = typingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        // Move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      } else {
        // Type or delete characters
        const nextText = isDeleting 
          ? word.substring(0, currentText.length - 1)
          : word.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-10 px-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* LEFT SIDE: Content */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="space-y-4">
            <h2 className="text-neon-purple tracking-widest text-sm font-bold uppercase">
              // System Initialization Complete
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              Hi, I&apos;m <br />
              <span className="text-gradient">Aman Sharma</span>
            </h1>
            
            <div className="h-8 md:h-10 flex items-center text-xl md:text-2xl font-mono text-neon-blue">
              <Terminal className="mr-2 w-6 h-6" />
              <span>{currentText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 w-3 h-8 bg-neon-blue inline-block"
              />
            </div>
            
            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              {portfolioData.personal.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a 
              href="/resume.pdf"
              download="Aman_Sharma_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-neon-blue/10 border border-neon-blue text-neon-blue font-medium flex items-center gap-2 hover:bg-neon-blue/20 transition-colors neon-glow-blue cursor-pointer"
            >
              <Download size={18} />
              Download Resume
            </motion.a>
            <motion.a 
              href={`mailto:${portfolioData.personal.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-md bg-white/5 border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-colors glassmorphism cursor-pointer"
            >
              <Mail size={18} />
              Contact Me
            </motion.a>
          </div>

          <div className="flex items-center gap-6 pt-6">
            <SocialLink href={portfolioData.personal.linkedin} icon={<FaLinkedin size={20} />} />
            <SocialLink href={portfolioData.personal.github} icon={<FaGithub size={20} />} />
            <SocialLink href={`mailto:${portfolioData.personal.email}`} icon={<Mail size={20} />} />
          </div>
        </motion.div>

        {/* RIGHT SIDE: AI Profile Module */}
        <motion.div 
          className="relative flex justify-center lg:justify-end perspective-1000"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div 
            className="relative w-full max-w-md aspect-[4/5] rounded-2xl glass-panel overflow-hidden border border-white/20 p-6 flex flex-col group"
            whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* HUD Overlays */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-neon-blue opacity-70">
              SYS.ID: AS-2026<br/>
              UPTIME: 99.9%
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/30 animate-pulse">
                Online
              </span>
              <span className="px-2 py-1 rounded bg-neon-purple/20 text-neon-purple text-[10px] font-bold uppercase tracking-wider border border-neon-purple/30">
                AI Profile
              </span>
            </div>

            {/* Profile Image Area */}
            <div className="relative flex-grow mt-8 mb-4 w-full rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] z-10 border border-white/10 overflow-hidden bg-[#0A0A0A]">
              <Image 
                src="/profile2.jpg" 
                alt="Aman Sharma" 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-2xl font-bold tracking-widest uppercase">Aman Sharma</h3>
              <p className="text-sm text-neon-blue font-mono">Future AI Engineer</p>
              
              <div className="pt-4 flex justify-between items-center text-xs font-mono text-white/50 border-t border-white/10">
                <span>STATUS: ACTIVE</span>
                <span className="text-neon-purple">OPEN TO INTERNSHIPS</span>
              </div>
            </div>
            
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5, color: "var(--color-neon-blue)" }}
      className="text-white/60 hover:text-neon-blue transition-colors p-2 glassmorphism rounded-full"
    >
      {icon}
    </motion.a>
  );
}
