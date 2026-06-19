"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Terminal, Database, Code, ShieldAlert } from "lucide-react";

const skillCategories = [
  {
    id: "programming",
    title: "Programming",
    icon: <Code className="w-5 h-5" />,
    skills: portfolioData.skills.programming,
    color: "from-neon-blue to-blue-500"
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: <Terminal className="w-5 h-5" />,
    skills: portfolioData.skills.frontend,
    color: "from-neon-purple to-purple-500"
  },
  {
    id: "core",
    title: "Core Competencies",
    icon: <Database className="w-5 h-5" />,
    skills: portfolioData.skills.core,
    color: "from-green-400 to-emerald-600"
  },
  {
    id: "tools",
    title: "Dev Tools",
    icon: <ShieldAlert className="w-5 h-5" />,
    skills: portfolioData.skills.tools,
    color: "from-orange-400 to-red-500"
  }
];

export default function Skills() {
  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-24">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">
          <span className="text-neon-blue">AI</span> Command Center
        </h2>
        <p className="text-white/60 font-mono text-sm uppercase">Neural pathways established: System capabilities mapped</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 group hover:border-neon-blue/40 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-neon-blue/10 transition-all" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:text-neon-blue transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold font-mono tracking-wide">{category.title}</h3>
            </div>

            <div className="space-y-4">
              {category.skills.map((skill, sIdx) => {
                // Randomize percentage for visual dashboard effect (between 75 and 98)
                const percentage = 75 + Math.random() * 23;
                
                return (
                  <div key={skill} className="space-y-1 relative">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white/80">{skill}</span>
                      <span className="text-neon-blue">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                        className={`h-full bg-gradient-to-r ${category.color} relative`}
                      >
                        {/* Shimmer effect inside bar */}
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-neon-blue transition-colors rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-neon-blue transition-colors rounded-bl-lg" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
