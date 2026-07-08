"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Terminal, Database, Code, ShieldAlert, MonitorSmartphone, Bug, Lightbulb, Brain, Network } from "lucide-react";
import { DiPython, DiJavascript1, DiHtml5, DiCss3, DiReact, DiBootstrap, DiGit, DiGithubBadge, DiChrome } from "react-icons/di";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillCategories = [
  {
    id: "programming",
    title: "Programming",
    icon: <Code className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />,
    skills: portfolioData.skills.programming,
    color: "from-neon-blue to-blue-500"
  },
  {
    id: "frontend",
    title: "Frontend Development",
    icon: <Terminal className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />,
    skills: portfolioData.skills.frontend,
    color: "from-neon-purple to-purple-500"
  },
  {
    id: "core",
    title: "Core Competencies",
    icon: <Database className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />,
    skills: portfolioData.skills.core,
    color: "from-green-400 to-emerald-600"
  },
  {
    id: "tools",
    title: "Dev Tools",
    icon: <ShieldAlert className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />,
    skills: portfolioData.skills.tools,
    color: "from-orange-400 to-red-500"
  }
];

const getSkillIcon = (skillName: string) => {
  const iconClass = "w-6 h-6 xl:w-7 xl:h-7 shrink-0 transition-transform duration-300 group-hover/skill:scale-110";
  const lucideProps = { className: "w-5 h-5 xl:w-7 xl:h-7 shrink-0 transition-transform duration-300 group-hover/skill:scale-110" };
  
  switch (skillName) {
    case "Python": return <DiPython className={iconClass} color="#3776AB" />;
    case "JavaScript": return <DiJavascript1 className={iconClass} color="#F7DF1E" />;
    case "HTML": return <DiHtml5 className={iconClass} color="#E34F26" />;
    case "CSS": return <DiCss3 className={iconClass} color="#1572B6" />;
    case "React": return <DiReact className={iconClass} color="#61DAFB" />;
    case "Next.js": return <SiNextdotjs className={lucideProps.className} color="#FFFFFF" />;
    case "Tailwind CSS": return <SiTailwindcss className={iconClass} color="#06B6D4" />;
    case "Bootstrap": return <DiBootstrap className={iconClass} color="#7952B3" />;
    case "Responsive Design": return <MonitorSmartphone className={lucideProps.className} color="#8B5CF6" />;
    case "Data Structures & Algorithms": return <Database className={lucideProps.className} color="#10B981" />;
    case "Debugging": return <Bug className={lucideProps.className} color="#EF4444" />;
    case "Problem Solving": return <Lightbulb className={lucideProps.className} color="#F59E0B" />;
    case "AI/ML Concepts": return <Brain className={lucideProps.className} color="#EC4899" />;
    case "Git": return <DiGit className={iconClass} color="#F05032" />;
    case "GitHub": return <DiGithubBadge className={iconClass} color="#FFFFFF" />;
    case "VS Code": return <VscVscode className={lucideProps.className} color="#007ACC" />;
    case "Chrome DevTools": return <DiChrome className={iconClass} color="#4285F4" />;
    case "REST APIs": return <Network className={lucideProps.className} color="#06B6D4" />;
    default: return <Code className={lucideProps.className} color="#A78BFA" />;
  }
};

export default function Skills() {
  return (
    <section className="relative z-10 w-full max-w-6xl xl:max-w-[1360px] mx-auto px-6 py-24 xl:py-28">
      <div className="text-center space-y-4 mb-16 xl:mb-24">
        <h2 className="text-3xl md:text-5xl xl:text-[3.35rem] font-bold uppercase tracking-widest text-white">
          <span className="text-neon-blue">AI</span> Command Center
        </h2>
        <p className="text-white/60 font-mono text-sm xl:text-[15px] uppercase">Neural pathways established: System capabilities mapped</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-8">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel p-6 xl:p-7 rounded-2xl border border-white/10 group hover:border-neon-blue/40 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-neon-blue/10 transition-all" />
            
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white group-hover:text-neon-blue transition-colors">
                {category.icon}
              </div>
              <h3 className="text-xl xl:text-[1.35rem] font-bold font-mono tracking-wide">{category.title}</h3>
            </div>

            <div className="space-y-5">
              {category.skills.map((skill, sIdx) => {
                // Pseudo-random but deterministic percentage for visual dashboard effect (between 75 and 98)
                const pseudoRandom = ((skill.length * 17) + (sIdx * 31) + (idx * 13)) % 23;
                const percentage = 75 + pseudoRandom;
                
                return (
                  <div key={skill} className="space-y-2 relative group/skill">
                    <div className="flex justify-between items-center text-sm xl:text-[15px] font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 group-hover/skill:text-neon-blue transition-colors duration-300">
                          {getSkillIcon(skill)}
                        </span>
                        <span className="text-white/80 group-hover/skill:text-white transition-colors duration-300">{skill}</span>
                      </div>
                      <span className="text-neon-blue text-xs xl:text-[13px]">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (sIdx * 0.1) }}
                        className={`h-full bg-gradient-to-r ${category.color} relative`}
                      >
                        {/* Shimmer effect inside bar */}
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-neon-blue transition-colors rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-neon-blue transition-colors rounded-bl-lg" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
