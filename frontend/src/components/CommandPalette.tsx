"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, X, Code2, User, Mail, Briefcase, FileText } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = [
    { id: "home", name: "Home", icon: <Command size={16} />, action: () => scrollTo("home") },
    { id: "about", name: "About Me", icon: <User size={16} />, action: () => scrollTo("about") },
    { id: "projects", name: "Projects", icon: <Code2 size={16} />, action: () => scrollTo("projects") },
    { id: "experience", name: "Experience", icon: <Briefcase size={16} />, action: () => scrollTo("experience") },
    { id: "resume", name: "Download Resume", icon: <FileText size={16} />, action: () => window.open("/resume.pdf", "_blank") },
    { id: "contact", name: "Contact", icon: <Mail size={16} />, action: () => scrollTo("contact-section") },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh]">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl bg-background border border-white/10 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-text-secondary mr-3" />
                <input
                  autoFocus
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-text-secondary text-lg"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-white/10 text-text-secondary hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      Navigation
                    </div>
                    {filteredCommands.map((cmd) => (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/20 hover:text-primary text-text-secondary transition-colors text-left"
                      >
                        {cmd.icon}
                        <span className="font-medium">{cmd.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-text-secondary">
                    No results found for "{search}"
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 bg-white/[0.02] border-t border-white/10 text-xs text-text-secondary flex items-center justify-between">
                <span>Search projects, navigate sections, or run commands</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 font-sans border border-white/20">esc</kbd> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
