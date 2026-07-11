"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "How I Built GreenGuard AI",
    date: "Aug 15, 2026",
    category: "Case Study",
    excerpt: "A deep dive into building an AI-powered air quality monitoring dashboard with real-time analytics.",
  },
  {
    title: "My Journey Learning Advanced DSA",
    date: "Sep 02, 2026",
    category: "Engineering",
    excerpt: "Key takeaways from solving 300+ problems on LeetCode and GeeksforGeeks.",
  },
  {
    title: "Scaling Next.js Applications",
    date: "Sep 20, 2026",
    category: "Web Dev",
    excerpt: "Performance optimization techniques and architecture patterns for modern web apps.",
  }
];

export default function Blog() {
  return (
    <section id="blog" className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white">
          Latest <span className="text-gradient">Writings</span>
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm md:text-base">
          Thoughts on software engineering, artificial intelligence, and building products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, idx) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative h-full glass-panel p-6 rounded-[2rem] flex flex-col justify-between hover:border-white/30 transition-all cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
            
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">{post.category}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
              
              <h3 className="text-xl font-bold font-heading text-white group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              
              <p className="text-text-secondary line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm font-medium text-white group-hover:text-primary transition-colors">
              Read Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a href="#" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-medium">
          View all articles <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
