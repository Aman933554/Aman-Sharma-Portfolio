"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";

const bootLogs = [
  "Initializing Aman AI OS...",
  "Loading Neural Network...",
  "Loading Developer Profile...",
  "Syncing GitHub Analytics...",
  "Authenticating Aman Sharma...",
  "Launching Dashboard..."
];

export default function BootSequence() {
  const { isBooting, finishBooting } = useAppStore();
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBooting) return;

    // Advance logs
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < bootLogs.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    // Advance progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => finishBooting(), 800); // Wait a bit at 100% before finishing
          return 100;
        }
        return prev + 2; // Increase by 2%
      });
    }, 50);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [isBooting, finishBooting]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-white font-mono p-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center mb-8">
              <motion.div
                className="w-16 h-16 border-4 border-white/20 rounded-full border-t-transparent animate-spin"
                style={{ boxShadow: "0 0 15px 0px rgba(0, 229, 255, 0.4)" }}
              />
            </div>
            
            <div className="h-32 flex flex-col justify-end space-y-2 overflow-hidden">
              <AnimatePresence>
                {bootLogs.slice(0, currentLogIndex + 1).map((log, index) => (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-sm md:text-base ${
                      index === currentLogIndex ? "text-white font-bold" : "text-white/50"
                    }`}
                  >
                    &gt; {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold tracking-widest text-zinc-400">
                <span>SYSTEM BOOT</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-zinc-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
