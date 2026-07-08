"use client";

import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, CheckCircle2, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';

const CertificateViewer = dynamic(() => import('./CertificateViewer'), {
  ssr: false,
});

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="relative z-10 w-full max-w-7xl xl:max-w-[1360px] mx-auto px-6 py-24 xl:py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-16 relative"
      >
        <h2 className="text-3xl md:text-5xl xl:text-[3.35rem] font-bold uppercase tracking-widest text-white inline-block relative">
          <span className="text-neon-purple">Certifications</span> & Achievements
          <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50 blur-[1px]" />
          <div className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-neon-purple" />
        </h2>
        <p className="text-white/60 font-mono text-sm xl:text-[15px] uppercase">Professional Certifications and Technical Achievements</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
        {portfolioData.certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group relative h-full perspective-1000 flex flex-col"
          >
            {/* Hover Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
            
            <div className="relative h-full bg-[#0A0A0A]/80 border border-white/10 rounded-xl p-6 xl:p-7 glassmorphism flex flex-col hover:border-white/30 hover:shadow-[0_15px_30px_rgba(139,92,246,0.15)] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-neon-purple/10 rounded-lg text-neon-purple ring-1 ring-neon-purple/30 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-shadow">
                  <Award className="w-6 h-6 xl:w-7 xl:h-7" />
                </div>
                <span className="text-xs xl:text-[13px] font-mono text-white/40 border border-white/10 px-2 py-1 xl:px-3 xl:py-1.5 rounded group-hover:border-neon-blue/30 group-hover:text-neon-blue transition-colors">
                  {cert.year}
                </span>
              </div>
              
              <h3 className="text-xl xl:text-[1.35rem] font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all">{cert.title}</h3>
              <p className="text-sm xl:text-[15px] text-neon-blue font-mono mb-4">{cert.issuer}</p>
              
              <p className="text-white/60 text-sm xl:text-[15px] leading-relaxed mb-6">
                {cert.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex items-center gap-2 text-xs xl:text-[13px] text-green-400 font-mono mb-4 group-hover:text-green-300 transition-colors">
                  <CheckCircle2 className="w-4 h-4 xl:w-[18px] xl:h-[18px] group-hover:animate-pulse" />
                  <span>VERIFIED</span>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedImage(cert.image)}
                    className="flex-1 py-2 px-3 xl:py-3 xl:px-5 text-xs xl:text-[13px] font-mono rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-purple/50 text-white/80 hover:text-white transition-all text-center"
                  >
                    View Certificate
                  </button>
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 xl:py-3 xl:px-5 text-xs xl:text-[13px] font-mono rounded bg-neon-blue/10 border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/20 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all flex items-center justify-center gap-1"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button disabled className="flex-1 py-2 px-3 xl:py-3 xl:px-5 text-xs xl:text-[13px] font-mono rounded bg-white/5 border border-white/5 text-white/30 cursor-not-allowed flex items-center justify-center gap-1">
                      Verify <ExternalLink className="w-3 h-3 opacity-50" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <CertificateViewer
            fileUrl={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
