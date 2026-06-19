"use client";

import { motion } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  return (
    <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 mb-20">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white">
          <span className="text-neon-blue">Establish</span> Connection
        </h2>
        <p className="text-white/60 font-mono text-sm uppercase">Open to new opportunities and collaborations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-2xl border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Contact Coordinates</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon-blue/10 rounded-lg text-neon-blue">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/50 font-mono">Email Transmission</p>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-white hover:text-neon-blue transition-colors">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-neon-purple/10 rounded-lg text-neon-purple">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-white/50 font-mono">Current Location</p>
                  <p className="text-white">Ghaziabad, India</p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex gap-4">
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-neon-blue hover:border-neon-blue hover:text-black transition-all">
                <FaLinkedin size={20} />
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-neon-purple hover:border-neon-purple hover:text-black transition-all">
                <FaGithub size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form className="glassmorphism p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-mono text-neon-blue">Sender Identity</label>
              <input 
                type="text" 
                id="name"
                className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-mono text-neon-purple">Return Address</label>
              <input 
                type="email" 
                id="email"
                className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                placeholder="john@company.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-mono text-white/70">Encrypted Payload</label>
              <textarea 
                id="message"
                rows={4}
                className="w-full bg-[#0A0A0A]/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none"
                placeholder="Your message here..."
              />
            </div>

            <button 
              type="button"
              className="w-full py-4 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
            >
              <Send size={18} /> Transmit Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
