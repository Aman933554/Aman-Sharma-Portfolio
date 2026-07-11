"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Terminal, Database, Code, ShieldAlert, Brain, Search, LayoutTemplate } from "lucide-react";
import { DiPython, DiJavascript1, DiHtml5, DiCss3, DiReact, DiBootstrap, DiGit, DiGithubBadge, DiChrome } from "react-icons/di";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiMongodb } from "react-icons/si";

const skillCategories = [
  {
    id: "programming",
    title: "Programming",
    icon: <Code className="w-5 h-5" />,
    skills: [...portfolioData.skills.programming, "TypeScript"],
    color: "from-primary to-blue-500"
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: <LayoutTemplate className="w-5 h-5" />,
    skills: portfolioData.skills.frontend,
    color: "from-accent to-purple-500"
  },
  {
    id: "backend",
    title: "Backend & Database",
    icon: <Database className="w-5 h-5" />,
    skills: ["Node.js", "Express", "MongoDB", "REST APIs", "SQL"],
    color: "from-success to-emerald-600"
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: <Terminal className="w-5 h-5" />,
    skills: portfolioData.skills.tools,
    color: "from-warning to-orange-500"
  },
  {
    id: "ai",
    title: "AI & ML",
    icon: <Brain className="w-5 h-5" />,
    skills: ["AI Agents", "Machine Learning", "Prompt Engineering"],
    color: "from-error to-pink-500"
  }
];

const getSkillIcon = (skillName: string) => {
  const iconClass = "w-7 h-7 shrink-0 transition-transform duration-300";
  switch (skillName) {
    case "Python": return <DiPython className={iconClass} color="#3776AB" />;
    case "JavaScript": return <DiJavascript1 className={iconClass} color="#F7DF1E" />;
    case "TypeScript": return <SiTypescript className={iconClass} color="#3178C6" />;
    case "HTML": return <DiHtml5 className={iconClass} color="#E34F26" />;
    case "CSS": return <DiCss3 className={iconClass} color="#1572B6" />;
    case "React": return <DiReact className={iconClass} color="#61DAFB" />;
    case "Next.js": return <SiNextdotjs className={iconClass} color="#FFFFFF" />;
    case "Tailwind CSS": return <SiTailwindcss className={iconClass} color="#06B6D4" />;
    case "Node.js": return <SiNodedotjs className={iconClass} color="#339933" />;
    case "MongoDB": return <SiMongodb className={iconClass} color="#47A248" />;
    case "Git": return <DiGit className={iconClass} color="#F05032" />;
    case "GitHub": return <DiGithubBadge className={iconClass} color="#FFFFFF" />;
    default: return <Code className={iconClass} color="#A78BFA" />;
  }
};

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = skillCategories.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(cat => cat.skills.length > 0);

  return (
    <section id="skills" className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <div className="text-center space-y-6 mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
          Technical <span className="text-gradient">Arsenal</span>
        </h2>
        
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search skills (e.g. React, Python)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text-secondary outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glassmorphism"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <AnimatePresence>
          {filteredCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-[2rem] group hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold font-heading">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, sIdx) => {
                  const percentage = Math.min(98, 70 + ((skill.length * 7) % 25)); // Pseudo-random skill mastery
                  return (
                    <motion.div 
                      key={skill}
                      layout
                      className="group/skill relative"
                    >
                      <div className="flex justify-between items-center text-sm font-medium mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-text-secondary group-hover/skill:scale-110 transition-transform duration-300">
                            {getSkillIcon(skill)}
                          </span>
                          <span className="text-white/80 group-hover/skill:text-white transition-colors">
                            {skill}
                          </span>
                        </div>
                        <span className="text-text-secondary text-xs opacity-0 group-hover/skill:opacity-100 transition-opacity">
                          {Math.round(percentage)}% Mastery
                        </span>
                      </div>
                      <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 }}
                          className={`h-full bg-gradient-to-r ${category.color} relative`}
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
