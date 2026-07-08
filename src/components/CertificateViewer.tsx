"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import Image from "next/image";

interface CertificateViewerProps {
  fileUrl: string;
  onClose: () => void;
}

export default function CertificateViewer({ fileUrl, onClose }: CertificateViewerProps) {
  const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[800px] xl:max-w-[1100px] h-[600px] xl:h-[800px] max-h-[85vh] bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header Toolbar */}
          <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
            <span className="text-sm xl:text-[15px] font-mono text-white/70 uppercase tracking-widest">Certificate Preview</span>
            <div className="flex items-center gap-2">
              <a
                href={fileUrl}
                download
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Download Certificate"
              >
                <Download className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />
              </a>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                title="Open in New Tab"
              >
                <ExternalLink className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />
              </a>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <button
                onClick={onClose}
                className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors ml-2"
                title="Close Viewer"
              >
                <X className="w-5 h-5 xl:w-[22px] xl:h-[22px]" />
              </button>
            </div>
          </div>
          
          {/* Viewer Area */}
          <div className="relative flex-grow flex items-center justify-center p-4 min-h-0 overflow-hidden bg-[#111111]">
            {isPdf ? (
              <iframe 
                src={fileUrl} 
                className="w-full h-full rounded-lg border border-white/10"
                title="Certificate PDF"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={fileUrl}
                  alt="Certificate Preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 800px) 100vw, 800px"
                  priority
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
