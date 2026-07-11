"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Sender Identity is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Return Address is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Return Address must be a valid email.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Encrypted Payload is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");

    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitStatus("success");
        setStatusMessage("Submitted Successfully!");
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
        setStatusMessage(data.error || "Transmission Failed. Please try again.");
      }
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage("Transmission Failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (errors[e.target.id as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  return (
    <section id="contact-section" className="relative z-10 w-full max-w-5xl xl:max-w-[1100px] mx-auto px-6 py-24 xl:py-28 mb-20 xl:mb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center space-y-4 mb-16 relative"
      >
        <h2 className="text-3xl md:text-5xl xl:text-[3.35rem] font-bold uppercase tracking-widest text-white inline-block relative">
          <span className="text-white">Establish</span> Connection
          <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-50 blur-[1px]" />
          <div className="absolute -bottom-2 left-1/4 right-1/4 h-[1px] bg-white" />
        </h2>
        <p className="text-white/60 font-mono text-sm xl:text-[15px] uppercase">Open to new opportunities and collaborations</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-14">
        {/* Contact Info */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glassmorphism p-8 xl:p-7 rounded-2xl border border-white/10 hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,229,255,0.1)] transition-all duration-300"
          >
            <h3 className="text-2xl xl:text-[1.65rem] font-bold text-white mb-6 tracking-wide">Contact Coordinates</h3>
            
            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 transition-transform group">
                <div className="p-3 bg-white/5 rounded-lg text-white ring-1 ring-white/10 group-hover:shadow-none transition-shadow">
                  <Mail className="w-6 h-6 xl:w-7 xl:h-7" />
                </div>
                <div>
                  <p className="text-sm xl:text-[15px] text-white/50 font-mono">Email Transmission</p>
                  <a href={`mailto:${portfolioData.personal.email}`} className="text-white xl:text-[17px] hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                    {portfolioData.personal.email}
                  </a>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 transition-transform group">
                <div className="p-3 bg-white/5 rounded-lg text-zinc-400 ring-1 ring-white/10 group-hover:shadow-none transition-shadow">
                  <MapPin className="w-6 h-6 xl:w-7 xl:h-7" />
                </div>
                <div>
                  <p className="text-sm xl:text-[15px] text-white/50 font-mono">Current Location</p>
                  <p className="text-white xl:text-[17px]">Ghaziabad, India</p>
                </div>
              </motion.div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex gap-4">
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={portfolioData.personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 xl:p-[14px] bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 hover:text-white hover:shadow-none transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />
              </motion.a>
              <motion.a 
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={portfolioData.personal.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 xl:p-[14px] bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 hover:text-zinc-400 hover:shadow-none transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />
              </motion.a>
              {portfolioData.personal.leetcode && (
                <motion.a 
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={portfolioData.personal.leetcode} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 xl:p-[14px] bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-white/20 hover:text-[#FFA116] hover:shadow-none transition-all"
                  aria-label="LeetCode"
                >
                  <SiLeetcode className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />
                </motion.a>
              )}
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
          <form onSubmit={handleSubmit} className="glassmorphism p-8 xl:p-7 rounded-2xl border border-white/10 space-y-6 xl:space-y-8 relative overflow-hidden group/form hover:border-white/30 transition-colors">
            
            {/* Form Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-zinc-500/5 opacity-0 group-hover/form:opacity-100 transition-opacity pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-16 space-y-6 relative z-10"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.1 }}
                    className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 size={56} className="text-emerald-400" />
                  </motion.div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl xl:text-3xl font-bold text-white tracking-wide">Submitted Successfully!</h3>
                    <p className="text-zinc-400 font-mono text-sm xl:text-base">Thank you for reaching out. I'll get back to you soon.</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSubmitStatus("idle")}
                    type="button"
                    className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-mono transition-colors"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 xl:space-y-8"
                >
                  {/* Notifications overlay for errors */}
                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-0 left-0 right-0 p-4 flex items-center justify-center gap-2 font-mono text-sm border-b border-white/10 backdrop-blur-md z-20 bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                    >
                      <XCircle size={16} />
                      {statusMessage}
                    </motion.div>
                  )}

                  <div className={`space-y-2 relative z-10 ${submitStatus === "error" ? 'pt-8' : ''} transition-all`}>
                    <label htmlFor="name" className="text-sm xl:text-[15px] font-mono text-white flex justify-between">
                      Sender Identity
                      {errors.name && <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-400 text-xs">{errors.name}</motion.span>}
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full bg-background/80 border ${errors.name ? 'border-rose-500/50 focus:border-rose-500 focus:shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 focus:border-white/20 focus:shadow-none'} rounded-lg px-4 py-3 xl:px-6 xl:py-4 xl:text-[17px] text-white focus:outline-none transition-all duration-300 disabled:opacity-50`}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                    <label htmlFor="email" className="text-sm xl:text-[15px] font-mono text-zinc-400 flex justify-between">
                      Return Address
                      {errors.email && <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-400 text-xs">{errors.email}</motion.span>}
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full bg-background/80 border ${errors.email ? 'border-rose-500/50 focus:border-rose-500 focus:shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 focus:border-white/20 focus:shadow-none'} rounded-lg px-4 py-3 xl:px-6 xl:py-4 xl:text-[17px] text-white focus:outline-none transition-all duration-300 disabled:opacity-50`}
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="space-y-2 relative z-10">
                    <label htmlFor="message" className="text-sm xl:text-[15px] font-mono text-white/70 flex justify-between">
                      Encrypted Payload
                      {errors.message && <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-rose-400 text-xs">{errors.message}</motion.span>}
                    </label>
                    <textarea 
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full bg-background/80 border ${errors.message ? 'border-rose-500/50 focus:border-rose-500 focus:shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 'border-white/10 focus:border-white/50 focus:shadow-[0_0_15px_rgba(255,255,255,0.15)]'} rounded-lg px-4 py-3 xl:px-6 xl:py-4 xl:text-[17px] text-white focus:outline-none transition-all duration-300 resize-none disabled:opacity-50`}
                      placeholder="Your message here..."
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="relative z-10 w-full py-4 xl:py-5 xl:text-[17px] rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold uppercase tracking-widest hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group/btn overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin relative z-10" /> <span className="relative z-10">Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" /> <span className="relative z-10">Transmit Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
