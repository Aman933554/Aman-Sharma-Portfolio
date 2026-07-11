"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Code2, Trophy, Users, Star } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

function AnimatedCounter({ end, duration = 2, label, icon, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return (
    <motion.div 
      ref={ref}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-8 rounded-3xl glass-panel border border-white/10 hover:border-primary/30 transition-all"
    >
      <div className="p-4 rounded-2xl bg-white/5 text-primary mb-6">
        {icon}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl md:text-5xl font-black font-heading text-white">{count}</span>
        <span className="text-2xl md:text-3xl font-bold text-primary">{suffix}</span>
      </div>
      <span className="text-sm md:text-base text-text-secondary font-medium tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32 border-t border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
        <AnimatedCounter 
          end={350} 
          suffix="+"
          label="DSA Problems" 
          icon={<Code2 className="w-8 h-8" />} 
        />
        <AnimatedCounter 
          end={15} 
          suffix="+"
          label="Projects Built" 
          icon={<Star className="w-8 h-8" />} 
        />
        <AnimatedCounter 
          end={5} 
          label="Hackathons" 
          icon={<Trophy className="w-8 h-8" />} 
        />
        <AnimatedCounter 
          end={100} 
          suffix="+"
          label="GitHub Commits" 
          icon={<Users className="w-8 h-8" />} 
        />
      </div>
    </section>
  );
}
