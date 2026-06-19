"use client";

import { useAppStore } from "@/store";
import { Terminal, Shield, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OSNav() {
  const { toggleTerminal, toggleRecruiterMode, isBooting } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  if (isBooting) return null;

  return (
    <div className="fixed top-6 right-6 z-40 flex flex-col items-end gap-2">
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
  );
}
