import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 animate-fade-in">
      <Bot className="w-8 h-8 p-1.5 bg-gray-900 text-white rounded-full" />
      <div className="bg-gray-100 px-4 py-2 rounded-2xl">
        <div className="flex space-x-2">
          {[0, 150, 300].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}