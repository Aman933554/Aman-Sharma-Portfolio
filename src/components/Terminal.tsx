"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { portfolioData } from "@/data/portfolio";
import { Terminal as TerminalIcon, X } from "lucide-react";

export default function Terminal() {
  const { isTerminalOpen, toggleTerminal } = useAppStore();
  const [history, setHistory] = useState<{command: string, output: React.ReactNode}[]>([
    {
      command: "welcome",
      output: (
        <div className="text-neon-blue">
          Welcome to Aman OS Terminal v1.0.0.<br/>
          Type &apos;help&apos; for a list of available commands.
        </div>
      )
    }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      setInput("");
      
      let output: React.ReactNode = "";

      switch (cmd) {
        case "help":
          output = (
            <div className="text-white/80">
              Available commands:<br/>
              <span className="text-neon-blue">about</span>    - View developer profile<br/>
              <span className="text-neon-blue">skills</span>   - List technical skills<br/>
              <span className="text-neon-blue">projects</span> - View project history<br/>
              <span className="text-neon-blue">contact</span>  - Get contact information<br/>
              <span className="text-neon-blue">clear</span>    - Clear terminal output<br/>
              <span className="text-neon-blue">exit</span>     - Close terminal
            </div>
          );
          break;
        case "about":
          output = <div className="text-white/80">{portfolioData.personal.bio}</div>;
          break;
        case "skills":
          output = (
            <div className="text-white/80">
              <div className="text-neon-purple">Programming:</div> {portfolioData.skills.programming.join(", ")}<br/>
              <div className="text-neon-purple">Frontend:</div> {portfolioData.skills.frontend.join(", ")}<br/>
              <div className="text-neon-purple">Tools:</div> {portfolioData.skills.tools.join(", ")}
            </div>
          );
          break;
        case "projects":
          output = (
            <div className="text-white/80">
              {portfolioData.projects.map(p => (
                <div key={p.title} className="mb-2">
                  <span className="text-neon-blue font-bold">{p.title}</span> - {p.subtitle}<br/>
                  <span className="text-xs text-white/50">{p.tech.join(" | ")}</span>
                </div>
              ))}
            </div>
          );
          break;
        case "contact":
          output = (
            <div className="text-white/80">
              Email: <a href={`mailto:${portfolioData.personal.email}`} className="text-neon-blue hover:underline">{portfolioData.personal.email}</a><br/>
              LinkedIn: <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">Profile</a><br/>
              GitHub: <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">Profile</a>
            </div>
          );
          break;
        case "clear":
          setHistory([]);
          return;
        case "exit":
          toggleTerminal();
          return;
        case "":
          output = "";
          break;
        default:
          output = <div className="text-red-400">Command not found: {cmd}. Type &apos;help&apos; for available commands.</div>;
      }

      setHistory(prev => [...prev, { command: cmd, output }]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden font-mono"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 p-2 flex justify-between items-center select-none">
              <div className="flex gap-2 px-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={toggleTerminal} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-white/50 flex items-center gap-2">
                <TerminalIcon size={14} /> aman@os: ~
              </div>
              <div className="w-16" /> {/* Spacer for balance */}
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-[400px] overflow-y-auto text-sm space-y-3">
              {history.map((h, i) => (
                <div key={i} className="space-y-1">
                  {h.command && (
                    <div className="flex gap-2">
                      <span className="text-green-400">aman@os:~$</span>
                      <span className="text-white">{h.command}</span>
                    </div>
                  )}
                  {h.output && <div className="pl-4">{h.output}</div>}
                </div>
              ))}
              
              <div className="flex gap-2">
                <span className="text-green-400">aman@os:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0 p-0"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
