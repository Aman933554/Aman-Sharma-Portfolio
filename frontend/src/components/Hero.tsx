"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ChevronDown, MapPin, Sparkles, Code2, Rocket } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import MagneticButton from "./ui/MagneticButton";
import { portfolioData } from "@/data/portfolio";

const typingRoles = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const word = typingRoles[currentWordIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingRoles.length);
      } else {
        const nextText = isDeleting 
          ? word.substring(0, currentText.length - 1)
          : word.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 w-full overflow-hidden">
      
      {/* Aurora Background & Animated Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] mix-blend-screen animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-7xl relative z-10">
        
        {/* LEFT SIDE: Content */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism text-sm font-medium border-primary/30 text-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Available for 2026 Internships</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-white leading-[1.1]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                }
              }}
            >
              {["Building", "Intelligent", "Web", "Applications."].map((word, i) => (
                <motion.span 
                  key={i} 
                  className={`inline-block mr-[0.25em] ${i === 3 ? "block md:inline-block mt-2 md:mt-0" : ""}`}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <div className="h-10 md:h-12 flex items-center text-xl md:text-3xl font-mono text-text-secondary pt-2">
              <span>{currentText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 w-3 h-6 md:h-8 bg-primary inline-block rounded-sm"
              />
            </div>
            
            <motion.p 
              className="text-base md:text-lg text-text-secondary max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I'm Aman Sharma, an aspiring Software Engineer focused on crafting modern, high-performance web experiences and AI-driven solutions.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MagneticButton 
              href="#projects"
              className="px-8 py-4 rounded-xl bg-primary text-white font-medium flex items-center gap-2 hover:bg-primary/90 neon-glow-primary transition-all duration-300"
            >
              <Code2 size={20} />
              View Projects
            </MagneticButton>
            
            <MagneticButton 
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-xl glassmorphism text-white font-medium flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
            >
              <Download size={20} />
              Resume
            </MagneticButton>

            <div className="flex items-center gap-4 ml-0 md:ml-4">
              <SocialLink href={portfolioData.personal.github} icon={<FaGithub size={22} />} />
              {portfolioData.personal.leetcode && (
                <SocialLink href={portfolioData.personal.leetcode} icon={<SiLeetcode size={22} className="text-[#FFA116]" />} />
              )}
              <SocialLink href={portfolioData.personal.linkedin} icon={<FaLinkedin size={22} />} />
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Floating Glass Profile Module */}
        <motion.div 
          className="relative hidden lg:flex justify-end perspective-1000"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          {/* Animated Glow Behind */}
          <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full animate-pulse pointer-events-none" />
          
          <motion.div 
            className="relative w-full max-w-[28rem] rounded-[2rem] glass-panel overflow-hidden border border-white/10 p-8 flex flex-col group shadow-2xl"
            whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-6 left-6 text-xs font-mono text-text-secondary flex items-center gap-2">
              <MapPin size={14} className="text-primary" />
              Ghaziabad, India
            </div>
            
            <div className="absolute top-6 right-6">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
            </div>

            <div className="mt-12 mb-6 w-full aspect-square rounded-2xl overflow-hidden border border-foreground/5 relative bg-black/10 shadow-inner">
              <Image 
                src="/profile2.jpg" 
                alt="Aman Sharma" 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
                quality={100}
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            <div className="space-y-3 relative z-10 text-center">
              <h3 className="text-2xl font-heading font-bold text-white tracking-wide">Aman Sharma</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium">Software Engineer</span>
                <span className="px-3 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent text-xs font-medium">Full Stack</span>
              </div>
            </div>
          </motion.div>
          
          {/* Floating Elements */}

          
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">Scroll Down</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ChevronDown size={20} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-full glassmorphism text-text-secondary hover:text-white hover:border-white/30 transition-all duration-300"
    >
      {icon}
    </motion.a>
  );
}
