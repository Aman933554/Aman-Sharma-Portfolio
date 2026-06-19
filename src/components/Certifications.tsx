"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, CheckCircle2 } from "lucide-react";

export default function Certifications() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">
          <span className="text-neon-purple">Security</span> Clearances
        </h2>
        <p className="text-white/60 font-mono text-sm uppercase">Certifications, Awards, and Achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="group relative h-full"
          >
            {/* Hover Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
            
            <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-xl p-6 glassmorphism flex flex-col hover:border-white/20 transition-all group-hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-neon-purple/10 rounded-lg text-neon-purple">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-white/40 border border-white/10 px-2 py-1 rounded">
                  {cert.year}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-sm text-neon-blue font-mono mb-4">{cert.issuer}</p>
              
              <p className="text-white/60 text-sm leading-relaxed flex-grow">
                {cert.description}
              </p>
              
              <div className="mt-6 flex items-center gap-2 text-xs text-green-400 font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>VERIFIED</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
