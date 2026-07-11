"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Award, CheckCircle2, ExternalLink, Filter } from "lucide-react";
import dynamic from 'next/dynamic';

const CertificateViewer = dynamic(() => import('./CertificateViewer'), { ssr: false });

// Helper to determine category for filtering
const getCategory = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("ai") || t.includes("chatgpt")) return "AI & ML";
  if (t.includes("hackathon")) return "Hackathons";
  if (t.includes("github") || t.includes("cloud") || t.includes("microsoft")) return "Cloud & DevOps";
  return "Development";
};

const categories = ["All", "AI & ML", "Development", "Cloud & DevOps", "Hackathons"];

export default function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCerts = portfolioData.certifications.filter(cert => 
    activeCategory === "All" || getCategory(cert.title) === activeCategory
  );

  return (
    <section id="certificates" className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-12 relative"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
          Licenses & <span className="text-gradient">Certifications</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm md:text-base">
          Professional validations of my skills across software engineering and AI.
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-12"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
              activeCategory === cat 
                ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-primary/50" 
                : "bg-white/5 text-text-secondary hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence>
          {filteredCerts.map((cert, idx) => (
            <motion.div
              layout
              key={cert.title + idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="group relative h-full flex flex-col"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
              
              <div className="relative h-full bg-background border border-white/10 rounded-3xl p-8 glass-panel flex flex-col group-hover:border-primary/30 transition-all duration-300 z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl text-primary border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-text-secondary border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                    {cert.year}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-sm text-text-secondary font-mono mb-4">{cert.issuer}</p>
                
                <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                  {cert.description}
                </p>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-xs text-success font-mono mb-4">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>VERIFIED CREDENTIAL</span>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setSelectedImage(cert.image)}
                      className="flex-1 py-2.5 px-4 text-sm font-medium rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                    >
                      View Certificate
                    </button>
                    {cert.verifyUrl ? (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 text-sm font-medium rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all flex items-center justify-center gap-2"
                      >
                        Verify <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <button disabled className="flex-1 py-2.5 px-4 text-sm font-medium rounded-xl bg-white/5 border border-white/5 text-white/30 cursor-not-allowed flex items-center justify-center gap-2">
                        Verify <ExternalLink className="w-4 h-4 opacity-50" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
