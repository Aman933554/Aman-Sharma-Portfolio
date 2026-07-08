"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Star, Activity, LayoutTemplate, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

import { Project } from "./Projects";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open and handle ESC key
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-neon-purple/30 rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col"
        >
          {/* Header Image / Banner */}
          <div className="relative h-48 sm:h-64 w-full bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex-shrink-0">
            {project.thumbnail ? (
              <Image 
                src={project.thumbnail} 
                alt={project.title}
                fill
                className="object-cover opacity-60 mix-blend-overlay"
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/20 via-[#0A0A0A] to-[#0A0A0A]" />
            )}
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-neon-purple/20 border border-white/10 hover:border-neon-purple/50 rounded-full text-white/70 hover:text-white transition-all backdrop-blur-sm z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-[#0A0A0A] to-transparent">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 text-xs font-mono font-bold bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full">
                  {project.status || "Completed"}
                </span>
                {project.deploymentStatus && (
                  <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/20 rounded-full">
                    <Activity className="w-3 h-3" /> {project.deploymentStatus}
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-1">{project.title}</h2>
              <p className="text-neon-blue font-mono text-sm sm:text-base">{project.subtitle}</p>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 flex flex-col gap-8">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-8 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex flex-col">
                <span className="text-xs text-white/40 uppercase tracking-wider mb-1">Duration</span>
                <span className="text-sm text-white/90 font-mono">{project.duration}</span>
              </div>
              {project.githubStars !== undefined && (
                <div className="flex flex-col border-l border-white/10 pl-4 sm:pl-8">
                  <span className="text-xs text-white/40 uppercase tracking-wider mb-1">Stars</span>
                  <span className="text-sm text-white/90 font-mono flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" /> {project.githubStars}
                  </span>
                </div>
              )}
            </div>

            {/* Description & Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <LayoutTemplate className="w-5 h-5 text-neon-purple" />
                  Overview
                </h3>
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  {project.description}
                </p>
              </div>
              
              {project.architecture && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-neon-blue" />
                    Architecture
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {project.architecture}
                  </p>
                </div>
              )}
            </div>

            {/* Tech Stack & Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 text-sm font-mono text-neon-purple bg-neon-purple/10 border border-neon-purple/20 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white">Key Features</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="text-neon-blue mt-1">▹</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Screenshots Placeholder */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((src: string, i: number) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      {/* Actual image would go here if src is valid, using placeholder div for now */}
                      <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs">
                        Screenshot {i+1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
              {project.githubUrl !== "#" && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#111] hover:bg-[#222] border border-white/20 hover:border-white/40 rounded-lg text-white font-medium transition-all group"
                >
                  <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  View Source
                </a>
              )}
              {project.liveUrl !== "#" && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/50 hover:border-neon-purple rounded-lg text-white font-medium transition-all group"
                >
                  <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
