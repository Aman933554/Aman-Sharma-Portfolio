"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
      <div className="text-center space-y-4 mb-20">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">
          <span className="text-neon-blue">Runtime</span> History
        </h2>
        <p className="text-white/60 font-mono text-sm uppercase">Professional experience and active roles</p>
      </div>

      <div className="relative border-l-2 border-white/10 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
        {/* Center line for desktop */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

        <div className="space-y-16">
          {portfolioData.experience.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-[-41px] md:left-1/2 top-0 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-neon-blue md:-translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className={`w-full md:w-[45%] glass-panel p-6 rounded-xl border border-white/10 hover:border-neon-blue/40 transition-colors ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded bg-neon-blue/10 text-neon-blue">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-neon-purple font-mono text-sm">{exp.organization}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-white/50 mb-4 font-mono">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                  
                  <p className="text-white/70 leading-relaxed text-sm">
                    {exp.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
