"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  return (
    <section className="relative z-10 w-full max-w-4xl xl:max-w-5xl mx-auto px-6 py-24 xl:py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-20 relative"
      >
        <h2 className="text-3xl md:text-5xl xl:text-[3.35rem] font-bold uppercase tracking-widest text-white inline-block relative">
          <span className="text-neon-blue">Runtime</span> History
          <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50 blur-[1px]" />
          <div className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-neon-blue" />
        </h2>
        <p className="text-white/60 font-mono text-sm xl:text-[15px] uppercase">Professional experience and active roles</p>
      </motion.div>

      <div className="relative border-l-2 border-white/10 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
        {/* Center line for desktop */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="hidden md:block absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-neon-blue/50 via-white/10 to-transparent -translate-x-1/2" 
        />

        <div className="space-y-16 xl:space-y-24">
          {portfolioData.experience.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                
                {/* Timeline Dot */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.2 + 0.3 }}
                  className="absolute left-[-41px] md:left-1/2 top-0 w-6 h-6 rounded-full bg-[#0A0A0A] border-2 border-neon-blue md:-translate-x-1/2 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                >
                  <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                </motion.div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  whileHover={{ y: -5 }}
                  className={`w-full md:w-[45%] xl:w-[48%] glassmorphism p-6 xl:p-7 rounded-xl border border-white/10 hover:border-neon-blue/40 hover:shadow-[0_10px_30px_rgba(0,229,255,0.1)] transition-all duration-300 ${isEven ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 xl:p-[9px] rounded bg-neon-blue/10 text-neon-blue ring-1 ring-neon-blue/30">
                      <Briefcase className="w-5 h-5 xl:w-7 xl:h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl xl:text-[1.35rem] font-bold text-white">{exp.role}</h3>
                      <p className="text-neon-purple font-mono text-sm xl:text-[15px]">{exp.organization}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs xl:text-[13px] text-white/50 mb-4 xl:mb-6 font-mono">
                    <Calendar className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    <span>{exp.duration}</span>
                  </div>
                  
                  <p className="text-white/70 leading-relaxed text-sm xl:text-[15px]">
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
