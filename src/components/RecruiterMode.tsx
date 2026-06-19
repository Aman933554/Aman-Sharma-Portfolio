"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store";
import { portfolioData } from "@/data/portfolio";
import { X, Download, FileText, Briefcase, GraduationCap, Code } from "lucide-react";

export default function RecruiterMode() {
  const { isRecruiterMode, toggleRecruiterMode } = useAppStore();

  return (
    <AnimatePresence>
      {isRecruiterMode && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl overflow-y-auto"
        >
          <div className="max-w-5xl mx-auto px-6 py-12 relative">
            
            {/* Header / Controls */}
            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6 sticky top-0 bg-background/90 backdrop-blur z-10 pt-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  RECRUITER MODE ACTIVE
                </h2>
                <p className="text-white/50 text-sm mt-1 font-mono">Streamlined data view optimized for fast parsing.</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-neon-blue/10 text-neon-blue border border-neon-blue/30 rounded-lg hover:bg-neon-blue/20 transition-colors">
                  <Download size={16} />
                  <span className="hidden sm:inline">Export PDF</span>
                </button>
                <button 
                  onClick={toggleRecruiterMode}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Grid Layout for Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Summary & Contact */}
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                    <FileText className="text-neon-blue" size={20} /> Summary
                  </h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">{portfolioData.personal.name}</p>
                    <p className="text-neon-purple font-mono text-sm">{portfolioData.personal.title}</p>
                    <p className="text-white/70 text-sm mt-4 leading-relaxed">{portfolioData.personal.bio}</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                    <Code className="text-neon-blue" size={20} /> Top Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[...portfolioData.skills.programming, ...portfolioData.skills.frontend, ...portfolioData.skills.core].map(skill => (
                      <span key={skill} className="px-2 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded text-white/80">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                    <GraduationCap className="text-neon-blue" size={20} /> Education
                  </h3>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="font-bold text-white">{portfolioData.education.degree}</p>
                    <p className="text-sm text-white/60">{portfolioData.education.institution}</p>
                    <div className="flex justify-between mt-2 text-xs font-mono text-neon-blue">
                      <span>{portfolioData.education.graduationYear}</span>
                      <span>CGPA: {portfolioData.education.cgpa}</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Experience & Projects */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                    <Briefcase className="text-neon-purple" size={20} /> Experience
                  </h3>
                  <div className="space-y-6">
                    {portfolioData.experience.map((exp, idx) => (
                      <div key={idx} className="relative pl-6 border-l border-white/10">
                        <div className="absolute w-3 h-3 bg-neon-purple rounded-full -left-[6.5px] top-1.5" />
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-lg text-white">{exp.role}</h4>
                          <span className="text-xs font-mono text-white/50 bg-white/5 px-2 py-1 rounded">{exp.duration}</span>
                        </div>
                        <p className="text-neon-blue text-sm mb-2">{exp.organization}</p>
                        <p className="text-white/70 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold border-b border-white/10 pb-2 mb-4 flex items-center gap-2">
                    <Code className="text-neon-purple" size={20} /> Key Projects
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolioData.projects.map((project, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-white/20 transition-colors">
                        <h4 className="font-bold text-white mb-1">{project.title}</h4>
                        <p className="text-xs font-mono text-neon-blue mb-3">{project.subtitle}</p>
                        <p className="text-sm text-white/60 mb-4 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map(tech => (
                            <span key={tech} className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-white/10 rounded text-white/80">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
