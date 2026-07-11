"use client";

import { motion } from "framer-motion";
import { Code2, BrainCircuit, Rocket, Server, BookOpen, Trophy, Compass, Laptop, Zap } from "lucide-react";

const aboutCards = [
  {
    title: "Software Engineering",
    description: "Building scalable, maintainable, and highly efficient architectures to solve complex technical challenges.",
    icon: <Server className="w-8 h-8 text-primary" />
  },
  {
    title: "Full Stack Development",
    description: "Crafting end-to-end applications with modern frontend frameworks and robust backend microservices.",
    icon: <Code2 className="w-8 h-8 text-accent" />
  },
  {
    title: "Artificial Intelligence",
    description: "Integrating ML models and GenAI agents into applications for intelligent automated workflows.",
    icon: <BrainCircuit className="w-8 h-8 text-primary" />
  },
  {
    title: "Data Structures & Algorithms",
    description: "Consistently sharpening problem-solving skills to write optimized, low-latency, and performant code.",
    icon: <Zap className="w-8 h-8 text-accent" />
  }
];

const timeline = [
  { year: "2024", title: "Started Programming", icon: <Compass className="w-5 h-5" /> },
  { year: "2024", title: "Built Full Stack Projects", icon: <Laptop className="w-5 h-5" /> },
  { year: "2024", title: "Participated in Hackathons", icon: <Trophy className="w-5 h-5" /> },
  { year: "2025", title: "Learning AI Systems", icon: <BrainCircuit className="w-5 h-5" /> },
  { year: "2026", title: "Preparing for SE Roles", icon: <Rocket className="w-5 h-5" /> },
];

const currentlyLearning = [
  "System Design",
  "Next.js",
  "AI Agents",
  "Cloud Fundamentals",
  "Advanced DSA"
];

export default function About() {
  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm md:text-base">
            My core philosophy, technical focus, and the vision driving my journey into Software Engineering and Artificial Intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative perspective-1000"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition duration-500" />
              <div className="relative h-full glassmorphism p-8 rounded-[2rem] flex flex-col gap-6 hover:border-white/20 transition-all bg-background/80">
                <div className="p-4 bg-white/5 rounded-2xl w-max ring-1 ring-white/10 group-hover:ring-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">{card.title}</h3>
                <p className="text-text-secondary leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Timeline Section */}
          <motion.div 
            className="lg:col-span-2 glass-panel p-8 rounded-[2rem]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
              <Rocket className="text-primary" /> The Journey
            </h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-white/10 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-primary group-hover:border-primary/30 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
                    {item.icon}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl glassmorphism border border-white/5 hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                    </div>
                    <time className="font-mono text-sm text-primary font-medium">{item.year}</time>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Currently Learning */}
          <motion.div 
            className="glass-panel p-8 rounded-[2rem] flex flex-col h-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
              <BookOpen className="text-accent" /> Currently Learning
            </h3>
            
            <div className="flex flex-col gap-4 flex-grow">
              {currentlyLearning.map((topic, i) => (
                <motion.div 
                  key={topic}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.1)" }}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 cursor-default transition-colors"
                >
                  <span className="font-medium text-white">{topic}</span>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-primary text-sm font-medium">Preparing for 2026 Internship Season</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
