"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Globe2, BrainCircuit } from "lucide-react";

const aboutCards = [
  {
    title: "Learning Mindset",
    description: "Driven by an insatiable curiosity for Artificial Intelligence and a continuous pursuit of knowledge in computer science.",
    icon: <BrainCircuit className="w-8 h-8 xl:w-12 xl:h-11 text-neon-blue" />
  },
  {
    title: "Why Technology?",
    description: "Technology is the closest thing to magic. Building intelligent systems allows me to solve real-world problems at scale.",
    icon: <Globe2 className="w-8 h-8 xl:w-12 xl:h-11 text-neon-purple" />
  },
  {
    title: "Career Vision",
    description: "To transition from a passionate student developer into a core AI Engineer, shaping the next generation of intelligent software.",
    icon: <Code2 className="w-8 h-8 xl:w-12 xl:h-11 text-neon-blue" />
  },
  {
    title: "Mission",
    description: "To build software that doesn't just function, but thinks. Focusing on intuitive, responsive, and robust AI applications.",
    icon: <Cpu className="w-8 h-8 xl:w-12 xl:h-11 text-neon-purple" />
  }
];

export default function About() {
  return (
    <section id="about" className="relative z-10 w-full max-w-7xl xl:max-w-[1360px] mx-auto px-6 py-24 xl:py-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4 relative">
          <h2 className="text-3xl md:text-5xl xl:text-[3.35rem] font-bold uppercase tracking-widest inline-block relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">System </span>
            <span className="text-white">Architecture</span>
            <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 blur-[1px]" />
            <div className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-neon-blue" />
          </h2>
          <p className="text-white/60 max-w-2xl xl:max-w-4xl mx-auto font-mono text-sm xl:text-[15px] uppercase pt-4 xl:pt-8">
            My core philosophy, motivations, and the vision driving my journey into the world of Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 pt-8 xl:pt-12">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative perspective-1000"
            >
              {/* Outer Glow on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-neon-blue to-neon-purple rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
              
              <div className="relative h-full glassmorphism p-8 xl:p-7 rounded-2xl flex flex-col gap-4 xl:gap-6 border border-white/10 hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,229,255,0.1)] transition-all bg-[#0A0A0A]/80">
                <div className="p-4 xl:p-6 bg-white/5 rounded-xl w-max ring-1 ring-white/10 group-hover:ring-neon-blue/50 group-hover:bg-neon-blue/10 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                  {card.icon}
                </div>
                <h3 className="text-2xl xl:text-[1.65rem] font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all duration-300">{card.title}</h3>
                <p className="text-white/70 xl:text-[17px] leading-relaxed font-light">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
