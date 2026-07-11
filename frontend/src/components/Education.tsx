"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, ChevronRight, Calendar, School } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech) – Computer Science & Engineering",
    institution: "Nitra Technical Campus, Ghaziabad",
    university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    duration: "2024 – 2028",
    description: "Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Software Engineering",
    icon: GraduationCap,
  },
  {
    degree: "Senior Secondary (Class XII)",
    institution: "Saraswati Vidya Mandir, Deoria, Uttar Pradesh",
    university: "",
    duration: "Completed",
    description: "Completed Higher Secondary Education with a strong foundation in Mathematics and Science.",
    icon: School,
  },
  {
    degree: "Secondary (Class X)",
    institution: "Saraswati Vidya Mandir, Deoria, Uttar Pradesh",
    university: "",
    duration: "Completed",
    description: "Completed Secondary Education with excellent academic performance and active participation in school activities.",
    icon: BookOpen,
  }
];

export default function Education() {
  return (
    <section id="education" className="relative w-full max-w-5xl mx-auto px-6 py-12 lg:py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-10 relative"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
          Academic <span className="text-gradient">Background</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm md:text-base">
          My educational journey and academic achievements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {educationData.map((edu, idx) => {
          const Icon = edu.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="w-full glass-panel p-6 md:p-8 rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/5 text-primary border border-white/10 shrink-0 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-heading text-white group-hover:text-primary transition-colors leading-tight">{edu.degree}</h3>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <p className="text-text-secondary font-medium mb-1 text-sm md:text-base">{edu.institution}</p>
                {edu.university && (
                  <p className="text-text-secondary/70 text-xs md:text-sm mb-4">{edu.university}</p>
                )}
                
                <div className="flex items-center gap-2 text-xs md:text-sm text-text-secondary mb-6 font-mono bg-white/5 w-max px-3 py-1.5 rounded-lg border border-white/5 mt-auto">
                  <Calendar className="w-4 h-4" />
                  <span>{edu.duration}</span>
                </div>
                
                <div className="text-white/80 leading-relaxed text-xs md:text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>{edu.description}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
