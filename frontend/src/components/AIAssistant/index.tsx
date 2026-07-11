"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Bot, Minimize2, Trash2 } from "lucide-react";
import { useChatStore } from "@/store/chatStore";
import ChatMessage from "./ChatMessage";
import { generateResponse } from "@/lib/ai/engine";

export default function AIAssistant() {
  const { isOpen, setIsOpen, messages, addMessage, clearHistory } = useChatStore();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(["Tell me about Aman", "Show Projects", "Skills", "Resume"]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage = text.trim();
    addMessage({ role: "user", content: userMessage });
    setInput("");
    setSuggestions([]);
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage);
      setIsTyping(false);
      addMessage({ role: "ai", content: response.answer });
      if (response.suggestions && response.suggestions.length > 0) {
        setSuggestions(response.suggestions);
      }
    } catch (error) {
      setIsTyping(false);
      addMessage({ role: "ai", content: "I encountered an error. Please try again." });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-black shadow-[0_0_20px_rgba(0,229,255,0.4)] z-40 flex items-center justify-center"
            aria-label="Open AI Assistant"
          >
            <MessageSquare size={24} className="fill-current" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-full max-w-[380px] sm:w-[380px] h-[600px] max-h-[85vh] bg-background/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Bot className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-none">AI Assistant</h3>
                  <span className="text-xs text-primary flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearHistory}
                  className="text-white/40 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                  title="Clear Chat"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                  title="Close (Esc)"
                >
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <ChatMessage 
                  key={msg.id} 
                  role={msg.role} 
                  content={msg.content} 
                  isStreaming={idx === messages.length - 1 && msg.role === 'ai'} 
                />
              ))}
              
              {isTyping && (
                <div className="flex gap-3 flex-row mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/10 text-white">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary hover:bg-primary hover:text-black transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative flex items-end gap-2 bg-black/40 border border-white/10 rounded-xl p-2 focus-within:border-primary/50 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent resize-none max-h-[120px] min-h-[24px] text-sm text-white focus:outline-none px-2 py-1 scrollbar-thin"
                  rows={1}
                  style={{ height: input ? 'auto' : '24px' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-lg bg-primary text-black disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all shrink-0"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-white/30 font-mono">Press Enter to send, Shift + Enter for new line</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
