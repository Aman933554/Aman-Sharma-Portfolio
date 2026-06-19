"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

type Message = {
  role: "user" | "ai";
  content: string;
};

const initialMessages: Message[] = [
  {
    role: "ai",
    content: "Hi! I am Aman's AI Assistant. How can I help you today? You can ask me about his skills, projects, or contact info."
  }
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    // Simple rule-based AI logic based on portfolio data
    setTimeout(() => {
      let aiResponse = "I'm sorry, I didn't quite catch that. Try asking about Aman's 'skills', 'projects', or 'experience'.";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes("skill") || lowerInput.includes("tech")) {
        aiResponse = `Aman is skilled in ${portfolioData.skills.programming.join(", ")} and frontend tech like ${portfolioData.skills.frontend.join(", ")}.`;
      } else if (lowerInput.includes("project")) {
        aiResponse = `Aman has worked on several projects, notably ${portfolioData.projects.map(p => p.title).join(" and ")}.`;
      } else if (lowerInput.includes("contact") || lowerInput.includes("email") || lowerInput.includes("hire")) {
        aiResponse = `You can reach Aman at ${portfolioData.personal.email} or connect on LinkedIn.`;
      } else if (lowerInput.includes("experience") || lowerInput.includes("internship")) {
        aiResponse = `Aman has participated in multiple hackathons and serves as a Technical Team Volunteer. Check the Runtime History section!`;
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        aiResponse = "Hello there! How can I assist you with Aman's portfolio?";
      } else if (lowerInput.includes("who is aman") || lowerInput.includes("about")) {
        aiResponse = portfolioData.personal.bio;
      }

      setMessages(prev => [...prev, { role: "ai", content: aiResponse }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-neon-blue text-[#0A0A0A] shadow-[0_0_20px_rgba(0,229,255,0.4)] z-40 transition-opacity ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[350px] max-h-[500px] h-[80vh] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="text-neon-blue" size={20} />
                <span className="font-bold text-white">AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors p-1"
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-neon-blue/20 text-neon-blue'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${msg.role === 'user' ? 'bg-white/10 text-white rounded-tr-none' : 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Aman..."
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-blue/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg bg-neon-blue text-[#0A0A0A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neon-blue/90 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
