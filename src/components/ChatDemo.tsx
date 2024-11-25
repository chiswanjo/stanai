import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import SuggestedQuestions from './SuggestedQuestions';

const sampleResponses = {
  "What's the meaning of life?": "According to my calculations and extensive philosophical analysis, the meaning of life is... 42! Just kidding. While I can't give you the ultimate answer, I believe it's about creating meaningful connections, pursuing growth, and making a positive impact. What do you think? 🤔",
  "Tell me a joke": "Why don't AI assistants tell dad jokes? Because they're afraid of becoming... a bit too robotic! *beep boop* 🤖 \n\nWant to hear another one? I've got circuits full of them! 😄",
  "How do I learn programming?": "Ah, starting your coding journey! 🚀 Here's my recommended path:\n\n1. Start with HTML, CSS, and JavaScript for web development\n2. Practice with small projects\n3. Join coding communities\n4. Build real projects\n\nWant me to suggest some beginner-friendly resources?",
  "What can you do?": "I'm Stan, your friendly AI companion! 🤖✨\n\nI can:\n• Chat about various topics\n• Tell jokes (warning: they're pretty robotic)\n• Give advice and recommendations\n• Help you learn new things\n\nWhat would you like to explore together?",
};

type Message = {
  text: string;
  isUser: boolean;
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateTyping = (text: string) => {
    setIsTyping(true);
    const typingDuration = Math.min(1000 + text.length * 20, 3000);
    
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, typingDuration);
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = sampleResponses[input as keyof typeof sampleResponses] || 
      "That's an interesting question! I'd love to explore that topic with you further. 🤔";

    await simulateTyping(response);
    setMessages(prev => [...prev, { text: response, isUser: false }]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="h-[400px] sm:h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
          {isTyping && <TypingIndicator />}
          {messages.length === 0 && !isTyping && (
            <SuggestedQuestions
              questions={Object.keys(sampleResponses)}
              onSelectQuestion={setInput}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              disabled={isTyping}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}