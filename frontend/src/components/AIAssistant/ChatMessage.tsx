import React, { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  role: 'user' | 'ai';
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({ role, content, isStreaming = false }: ChatMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    if (isStreaming && role === 'ai') {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= content.length) {
          setDisplayedContent(content.slice(0, currentIndex));
          currentIndex += 2; // Speed of typing
        } else {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    } else {
      setDisplayedContent(content);
    }
  }, [content, isStreaming, role]);

  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div 
        className={`p-4 rounded-2xl max-w-[85%] text-sm ${
          isUser 
            ? 'bg-primary/10 text-white rounded-tr-none border border-primary/20' 
            : 'bg-white/5 text-white border border-white/10 rounded-tl-none'
        }`}
      >
        <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {displayedContent}
          </ReactMarkdown>
          {isStreaming && displayedContent.length < content.length && (
            <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
