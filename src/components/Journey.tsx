"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  "C Programming",
  "Python",
  "Data Structures & Algorithms",
  "AI / Machine Learning",
  "Projects",
  "Internships",
  "Software Engineer",
  "AI Engineer"
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
      <div className="text-center space-y-4 mb-20">
        <h2 className="text-3xl md:text-5xl font-bold">
          <span className="text-white">Developer </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Journey</span>
        </h2>
        <p className="text-white/60">The roadmap from fundamentals to future aspirations.</p>
      </div>

      <div className="relative">
        {/* Animated Line */}
        <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full" />
        <motion.div 
          className="absolute left-[50%] top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue to-neon-purple -translate-x-1/2 rounded-full neon-glow-blue"
          style={{ height: lineHeight }}
        />

        {/* Milestones */}
        <div className="space-y-24">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={milestone} className={`flex items-center w-full ${isEven ? 'justify-start' : 'justify-end'} relative`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`w-[45%] ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}
                >
                  <div className="glassmorphism p-6 rounded-xl inline-block border border-white/10 hover:border-neon-purple/50 transition-colors cursor-default">
                    <h3 className={`text-xl font-bold ${index === milestones.length - 1 ? 'text-neon-blue' : 'text-white'}`}>
                      {milestone}
                    </h3>
                  </div>
                </motion.div>
                
                {/* Center Node */}
                <motion.div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0A0A0A] border-4 border-neon-blue z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  whileHover={{ scale: 1.5, backgroundColor: "#00E5FF" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
