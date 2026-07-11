"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Activity, LayoutTemplate, Layers, CheckCircle2, Server, Database, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import { Project } from "./Projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-background border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Image */}
          <div className="relative h-64 md:h-80 w-full shrink-0">
            {project.thumbnail ? (
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                fill 
                className="object-cover" 
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-6 left-8 right-8 z-20">
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                  {project.status || "Completed"}
                </span>
                {project.deploymentStatus && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-success/20 text-success border border-success/30 backdrop-blur-md flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {project.deploymentStatus}
                  </span>
                )}
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-heading text-white">{project.title}</h2>
              <p className="text-xl text-primary font-mono mt-1">{project.subtitle}</p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <h3 className="text-2xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                    <LayoutTemplate className="text-accent" /> Overview
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {project.description}
                  </p>
                </section>

                {project.architecture && (
                  <section>
                    <h3 className="text-2xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                      <Server className="text-accent" /> Architecture
                    </h3>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-text-secondary leading-relaxed">
                      {project.architecture}
                    </div>
                  </section>
                )}

                {project.features && project.features.length > 0 && (
                  <section>
                    <h3 className="text-2xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                      <Layers className="text-accent" /> Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <section className="p-6 rounded-2xl glass-panel">
                  <h3 className="text-xl font-bold font-heading text-white mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-white/10 text-sm text-white/90">
                        {t}
                      </span>
                    ))}
                  </div>
                </section>

                {project.metrics && (
                  <section className="p-6 rounded-2xl glass-panel">
                    <h3 className="text-xl font-bold font-heading text-white mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-text-secondary capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-mono text-primary font-bold">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div className="space-y-3">
                  {project.liveUrl !== "#" && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 neon-glow-primary transition-all"
                    >
                      <ExternalLink className="w-5 h-5" /> Live Demo
                    </a>
                  )}
                  {project.githubUrl !== "#" && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all"
                    >
                      <FaGithub className="w-5 h-5" /> Source Code
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
