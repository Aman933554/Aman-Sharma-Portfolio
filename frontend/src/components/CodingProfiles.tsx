"use client";

import { motion } from "framer-motion";
import { Code2, GitCommit, Star, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";

export default function CodingProfiles() {
  const githubUsername = portfolioData.personal.github.split('/').pop() || "Aman933554";
  
  return (
    <section id="profiles" className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
          Coding <span className="text-gradient">Profiles</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm md:text-base">
          My activity and statistics across various developer platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 max-w-3xl mx-auto gap-8">
        
        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 rounded-[2rem] flex flex-col gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <FaGithub className="w-48 h-48" />
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white">
              <FaGithub className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading text-white">GitHub</h3>
              <p className="text-text-secondary">Open Source Activity</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 relative z-10 w-full">
            {/* Using GitHub Readme Stats API */}
            <div className="w-full bg-background rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dark&bg_color=0d1117&hide_border=true&title_color=3B82F6&text_color=9CA3AF&icon_color=8B5CF6`} 
                alt="GitHub Stats" 
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
            </div>
            
            <div className="w-full bg-background rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-4">
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=dark&background=0d1117&border=00000000&ring=3B82F6&fire=8B5CF6&currStreakLabel=9CA3AF`} 
                alt="GitHub Streak" 
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
            </div>
            
            <a 
              href={portfolioData.personal.github} 
              target="_blank" 
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              View GitHub Profile <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
