"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Terminal, ChevronDown, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const typingWords = [
  "AI Engineer",
  "Full Stack Developer",
  "Machine Learning Enthusiast",
  "Problem Solver",
  "Open Source Learner",
  "Tech Explorer",
  "Future Software Engineer"
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect logic
  useEffect(() => {
    const word = typingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 30 : 80;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === word) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), 2000);
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
    <section className="relative z-10 h-[100dvh] max-h-[1000px] min-h-[700px] flex items-center justify-center pt-20 pb-16 px-6 max-w-7xl xl:max-w-[1360px] mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
        
        {/* LEFT SIDE: Content */}
        <motion.div 
          className="space-y-6 lg:space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-1 lg:space-y-2">
            <motion.div 
              className="text-neon-purple tracking-widest text-xs md:text-sm font-bold uppercase font-mono mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              // SYSTEM INITIALIZATION COMPLETE
            </motion.div>

            <motion.p 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] xl:leading-none font-black tracking-tight text-white leading-none whitespace-nowrap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I&apos;m
            </motion.p>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] xl:leading-none font-black tracking-tight leading-none whitespace-nowrap"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-indigo-400 to-neon-purple drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                Aman Sharma
              </span>
            </motion.h1>
            
            <div className="h-8 md:h-10 xl:h-11 flex items-center text-xl md:text-3xl xl:text-[2.5rem] font-mono text-neon-blue pt-4 md:pt-6">
              <span className="mr-3 font-bold">{'>_'}</span>
              <span>{currentText}</span>
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-1 w-3 h-6 md:h-8 xl:h-9 bg-neon-blue inline-block"
              />
            </div>
            
            <p className="text-base md:text-lg xl:text-[1.2rem] text-white/70 max-w-lg xl:max-w-2xl leading-relaxed pt-4">
              I build intelligent AI applications, modern web experiences, and scalable software solutions while continuously exploring Machine Learning, Automation, and Generative AI.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { label: "20+", sub: "Projects" },
              { label: "10+", sub: "Technologies" },
              { label: "AI", sub: "Enthusiast" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 px-3 py-1.5 xl:px-5 xl:py-2 rounded-full bg-white/5 border border-white/10"
              >
                <span className="font-bold text-neon-blue xl:text-[17px]">{stat.label}</span>
                <span className="text-xs xl:text-[13px] text-white/60 font-mono uppercase">{stat.sub}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a 
              href="/resume.pdf"
              download="Aman_Sharma_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 xl:px-8 xl:py-4 xl:text-[17px] rounded-md bg-neon-blue/10 border border-neon-blue text-neon-blue font-medium flex items-center gap-2 hover:bg-neon-blue/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-neon-blue/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Download size={18} className="relative z-10" />
              <span className="relative z-10">Download Resume</span>
            </motion.a>
            
            <motion.a 
              href="#contact-section"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 xl:px-8 xl:py-4 xl:text-[17px] rounded-md bg-white/5 border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all glassmorphism cursor-pointer"
            >
              <Mail size={18} />
              Let's Connect
            </motion.a>
          </div>

          <div className="flex items-center gap-6 xl:gap-8 pt-4">
            <SocialLink href="https://linkedin.com/in/aman-sharma-513689254/" icon={<FaLinkedin size={20} />} title="LinkedIn" />
            <SocialLink href="https://github.com/Aman933554" icon={<FaGithub size={20} />} title="GitHub" />
            <SocialLink href="mailto:amansharma933554@gmail.com" icon={<Mail size={20} />} title="Email" />
          </div>
        </motion.div>

        {/* RIGHT SIDE: AI Profile Module */}
        <motion.div 
          className="relative flex justify-center lg:justify-end perspective-1000 hidden md:flex"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Neon Glow Behind Card */}
          <div className="absolute inset-0 bg-neon-purple/20 blur-[80px] rounded-full scale-75 animate-pulse" />
          
          <motion.div 
            className="relative w-full max-w-sm xl:max-w-[26rem] aspect-[4/5] rounded-2xl glass-panel overflow-hidden border border-white/20 p-6 xl:p-7 flex flex-col group shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-shadow duration-500"
            whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* HUD Overlays */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-neon-blue opacity-70 flex flex-col gap-1">
              <span>SYS.ID: AS-2026</span>
              <span className="flex items-center gap-1"><MapPin size={10} /> Ghaziabad, India</span>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/30 animate-pulse">
                Active
              </span>
            </div>

            {/* Profile Image Area */}
            <div className="relative flex-grow mt-10 mb-4 w-full rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] z-10 border border-white/10 overflow-hidden bg-[#0A0A0A]">
              <Image 
                src="/profile2.jpg" 
                alt="Aman Sharma" 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top"
                priority
              />
              {/* Scanline effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent h-4 w-full"
                animate={{ top: ['-10%', '110%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
            </div>

            {/* Profile Info */}
            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-2xl xl:text-[1.65rem] font-bold tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Aman Sharma</h3>
              <p className="text-sm xl:text-[15px] text-neon-blue font-mono">Future AI Engineer</p>
              
              <div className="pt-4 flex justify-between items-center text-xs font-mono text-white/50 border-t border-white/10">
                <span>ROLE: FULL STACK</span>
                <span className="text-neon-purple px-2 py-0.5 bg-neon-purple/10 rounded border border-neon-purple/20">OPEN TO INTERNSHIP</span>
              </div>
            </div>
            
            {/* Static Scanline Background */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs font-mono uppercase tracking-widest text-white">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-neon-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, title }: { href: string; icon: React.ReactNode; title: string }) {
  return (
    <div className="relative group">
      <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-white/60 hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:border-neon-blue/50 transition-all p-3 xl:p-[14px] glassmorphism rounded-full flex items-center justify-center border border-white/10"
        aria-label={title}
      >
        {icon}
      </motion.a>
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#0A0A0A] border border-white/10 text-white text-xs font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {title}
      </div>
    </div>
  );
}
