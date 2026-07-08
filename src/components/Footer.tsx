"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl xl:max-w-[1360px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center md:items-start">
          <p className="text-white/60 text-sm xl:text-[15px] font-mono">
            &copy; {currentYear} {portfolioData.personal.name}. All rights reserved.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/50 text-sm xl:text-[15px] flex items-center gap-1"
        >
          Made with <span className="text-red-500 mx-1 animate-pulse">❤️</span> by 
          <span className="text-neon-blue font-mono ml-1">{portfolioData.personal.name}</span>
        </motion.div>

      </div>
    </footer>
  );
}
