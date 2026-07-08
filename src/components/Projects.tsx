"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Activity, Info, Calendar } from "lucide-react";
import { FaGithub, FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs } from "react-icons/fa";
import { SiFirebase, SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

// Helper function to get tech icon
const getTechIcon = (tech: string) => {
  const iconProps = { className: "w-4 h-4 xl:w-[18px] xl:h-[18px]" };
  switch (tech.toLowerCase()) {
    case "javascript": return <FaJs {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-yellow-400" />;
    case "html": return <FaHtml5 {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-orange-500" />;
    case "css": return <FaCss3Alt {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-blue-500" />;
    case "firebase": return <SiFirebase {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-yellow-500" />;
    case "react": return <FaReact {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-blue-400" />;
    case "next.js": return <SiNextdotjs {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-white" />;
    case "tailwind css": return <SiTailwindcss {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-teal-400" />;
    case "typescript": return <SiTypescript {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-blue-600" />;
    case "node.js": return <FaNodeJs {...iconProps} className="w-4 h-4 xl:w-[18px] xl:h-[18px] text-green-500" />;
    default: return <span className="text-xs text-white/50">{tech}</span>;
  }
};

export interface Project {
  title: string;
  subtitle: string;
  duration: string;
  tech: string[];
  description: string;
  event: string;
  githubUrl: string;
  liveUrl: string;
  thumbnail?: string;
  status?: string;
  features?: string[];
  githubStars?: number;
  deploymentStatus?: string;
  architecture?: string;
  screenshots?: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="relative z-10 w-full max-w-7xl xl:max-w-[1360px] mx-auto px-6 py-24 xl:py-28">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-16 relative"
      >
        <h2 className="text-3xl md:text-5xl xl:text-[3.35rem] font-bold uppercase tracking-widest text-white inline-block relative">
          <span className="text-neon-purple">System</span> Modules
          <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50 blur-[1px]" />
          <div className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-neon-purple" />
        </h2>
        <p className="text-white/60 font-mono text-sm xl:text-[15px] uppercase">Deployed applications and engineered solutions</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-8">
        {portfolioData.projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative perspective-1000"
          >
            {/* Outer Glow on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition duration-500" />
            
            <div className="relative h-full bg-[#0A0A0A]/90 border border-white/10 rounded-2xl flex flex-col glassmorphism overflow-hidden group-hover:border-neon-purple/50 group-hover:shadow-[0_20px_40px_rgba(139,92,246,0.25)] transition-all duration-300">
              
              {/* Thumbnail / Banner Area */}
              <div className="relative h-48 xl:h-[210px] w-full bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 overflow-hidden">
                {project.thumbnail ? (
                  <Image 
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-purple/20 via-[#0A0A0A] to-[#0A0A0A]" />
                )}
                
                {/* Status Badges Overlay */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  <span className="px-2.5 py-1 xl:px-4 xl:py-1.5 text-[10px] sm:text-xs xl:text-[13px] font-mono font-bold bg-black/60 text-neon-purple border border-neon-purple/50 rounded-full backdrop-blur-md">
                    {project.status || "Completed"}
                  </span>
                  {project.deploymentStatus === "Live" && (
                    <span className="flex items-center gap-1 px-2.5 py-1 xl:px-4 xl:py-1.5 text-[10px] sm:text-xs xl:text-[13px] font-mono font-bold bg-black/60 text-green-400 border border-green-500/50 rounded-full backdrop-blur-md">
                      <Activity className="w-3 h-3 animate-pulse" /> Live
                    </span>
                  )}
                </div>

                {/* Tech Logos Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  {project.tech.slice(0, 3).map(tech => (
                    <div key={tech} className="p-1.5 xl:p-[9px] rounded-md bg-black/60 border border-white/10 backdrop-blur-md tooltip" title={tech}>
                      {getTechIcon(tech)}
                    </div>
                  ))}
                  {project.tech.length > 3 && (
                    <div className="p-1.5 xl:p-[9px] rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-white/70 text-xs xl:text-[13px] font-bold flex items-center justify-center w-[26px] xl:w-[34px]">
                      +{project.tech.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 xl:p-7 flex flex-col flex-grow relative z-20">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl xl:text-[1.65rem] font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-neon-purple transition-all duration-300">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 xl:p-[9px] rounded-full bg-white/5 hover:bg-neon-purple/20 text-white/50 hover:text-white border border-transparent hover:border-neon-purple/50 transition-all z-20">
                      <FaGithub className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 xl:p-[9px] rounded-full bg-white/5 hover:bg-neon-blue/20 text-white/50 hover:text-white border border-transparent hover:border-neon-blue/50 transition-all z-20">
                      <ExternalLink className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    </a>
                  </div>
                </div>

                <p className="text-sm xl:text-[15px] text-neon-purple font-mono mb-3">{project.subtitle}</p>
                
                <div className="flex items-center gap-2 mb-4 text-xs xl:text-[13px] text-white/40 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{project.duration}</span>
                </div>

                <p className="text-white/60 leading-relaxed text-sm xl:text-[15px] mb-6 line-clamp-2 flex-grow">
                  {project.description}
                </p>

                {/* Key Features List */}
                {project.features && (
                  <div className="mb-6 space-y-1">
                    {project.features.slice(0, 2).map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs xl:text-[13px] text-white/60">
                        <div className="w-1 h-1 rounded-full bg-neon-blue" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center group-hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-2 text-xs xl:text-[13px] text-white/50 max-w-[60%]">
                    <Activity className="w-3.5 h-3.5 text-green-400 group-hover:animate-pulse flex-shrink-0" />
                    <span className="truncate" title={project.event}>{project.event}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 px-3 py-1.5 xl:px-4 xl:py-2 rounded-lg bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple text-xs xl:text-[13px] font-mono border border-neon-purple/30 hover:border-neon-purple transition-all z-20"
                  >
                    <Info className="w-3.5 h-3.5" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
