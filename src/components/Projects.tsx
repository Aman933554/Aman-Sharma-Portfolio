"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, FolderGit2, Activity } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">
          <span className="text-neon-purple">System</span> Modules
        </h2>
        <p className="text-white/60 font-mono text-sm uppercase">Deployed applications and engineered solutions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="group relative"
          >
            {/* Outer Glow on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
            
            <div className="relative h-full bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 flex flex-col glassmorphism hover:border-white/30 transition-colors">
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-lg bg-neon-purple/10 text-neon-purple ring-1 ring-neon-purple/30">
                  <FolderGit2 className="w-8 h-8" />
                </div>
                <div className="flex gap-3">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">{project.title}</h3>
                <p className="text-sm text-neon-purple font-mono">{project.subtitle}</p>
                <p className="text-xs text-white/40 font-mono">{project.duration}</p>
              </div>

              <p className="text-white/70 leading-relaxed flex-grow mb-6">
                {project.description}
              </p>

              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs font-mono text-neon-blue bg-neon-blue/10 border border-neon-blue/20 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-white/50 border-t border-white/10 pt-4 mt-4">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span>{project.event}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
