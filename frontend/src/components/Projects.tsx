"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useMotionTemplate } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Activity, Info, Calendar, Code2 } from "lucide-react";
import { FaGithub, FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiFirebase, SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb } from "react-icons/si";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

const getTechIcon = (tech: string) => {
  const iconProps = { className: "w-4 h-4" };
  switch (tech.toLowerCase()) {
    case "javascript": return <FaJs {...iconProps} className="w-4 h-4 text-yellow-400" />;
    case "html": return <FaHtml5 {...iconProps} className="w-4 h-4 text-orange-500" />;
    case "css": return <FaCss3Alt {...iconProps} className="w-4 h-4 text-blue-500" />;
    case "firebase": return <SiFirebase {...iconProps} className="w-4 h-4 text-yellow-500" />;
    case "react": return <FaReact {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "next.js": return <SiNextdotjs {...iconProps} className="w-4 h-4 text-white" />;
    case "tailwind css": return <SiTailwindcss {...iconProps} className="w-4 h-4 text-teal-400" />;
    case "typescript": return <SiTypescript {...iconProps} className="w-4 h-4 text-blue-600" />;
    case "node.js": return <FaNodeJs {...iconProps} className="w-4 h-4 text-green-500" />;
    case "python": return <FaPython {...iconProps} className="w-4 h-4 text-blue-400" />;
    case "mongodb": return <SiMongodb {...iconProps} className="w-4 h-4 text-green-500" />;
    default: return <Code2 {...iconProps} className="w-4 h-4 text-text-secondary" />;
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
  metrics?: Record<string, string>;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-16 relative"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm md:text-base">
          A showcase of my recent work, highlighting full-stack development and AI integration.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {portfolioData.projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} onClick={() => setSelectedProject(project as Project)} idx={idx} />
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

function ProjectCard({ project, onClick, idx }: { project: any; onClick: () => void; idx: number }) {
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500" />
      
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full bg-background border border-white/10 rounded-3xl flex flex-col overflow-hidden group-hover:border-primary/50 transition-all duration-500 shadow-2xl z-10">
        
        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow relative z-20">
          
          {/* Status Badges */}
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-black/60 text-white border border-white/20 rounded-full backdrop-blur-md">
              {project.status || "Completed"}
            </span>
            {project.deploymentStatus && (
              <span className={`flex items-center gap-1 px-3 py-1 text-xs font-mono font-bold bg-black/60 border rounded-full backdrop-blur-md ${project.deploymentStatus === 'Live' ? 'text-success border-success/50' : 'text-primary border-primary/50'}`}>
                <Activity className="w-3 h-3 animate-pulse" /> {project.deploymentStatus}
              </span>
            )}
          </div>

          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1">{project.subtitle}</p>
            </div>
            <div className="flex gap-2">
              {project.githubUrl !== "#" && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-text-secondary hover:text-foreground transition-colors">
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech: string) => (
              <div key={tech} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-text-secondary">
                {getTechIcon(tech)}
                <span>{tech}</span>
              </div>
            ))}
          </div>

          <p className="text-text-secondary leading-relaxed text-sm mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="mt-auto pt-5 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.duration}</span>
            </div>
            <button 
              onClick={onClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all group/btn"
            >
              <Info className="w-4 h-4" />
              Case Study
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
