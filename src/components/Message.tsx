import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  text: string;
  isUser: boolean;
}

export default function Message({ text, isUser }: MessageProps) {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} animate-fade-in`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-black' : 'bg-gray-900'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>
      <div className={`max-w-[80%] rounded-2xl p-3 ${
        isUser ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        {text}
      </div>
    </div>
  );
}