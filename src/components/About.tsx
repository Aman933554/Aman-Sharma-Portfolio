"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Globe2, BrainCircuit } from "lucide-react";

const aboutCards = [
  {
    title: "Learning Mindset",
    description: "Driven by an insatiable curiosity for Artificial Intelligence and a continuous pursuit of knowledge in computer science.",
    icon: <BrainCircuit className="w-8 h-8 text-neon-blue" />
  },
  {
    title: "Why Technology?",
    description: "Technology is the closest thing to magic. Building intelligent systems allows me to solve real-world problems at scale.",
    icon: <Globe2 className="w-8 h-8 text-neon-purple" />
  },
  {
    title: "Career Vision",
    description: "To transition from a passionate student developer into a core AI Engineer, shaping the next generation of intelligent software.",
    icon: <Code2 className="w-8 h-8 text-neon-blue" />
  },
  {
    title: "Mission",
    description: "To build software that doesn't just function, but thinks. Focusing on intuitive, responsive, and robust AI applications.",
    icon: <Cpu className="w-8 h-8 text-neon-purple" />
  }
];

export default function About() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">System </span>
            <span className="text-white">Architecture</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            My core philosophy, motivations, and the vision driving my journey into the world of Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="glass-panel p-8 rounded-2xl flex flex-col gap-4 border border-white/10 hover:border-neon-blue/50 transition-colors"
            >
              <div className="p-4 bg-white/5 rounded-xl w-max">
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
              <p className="text-white/70 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
