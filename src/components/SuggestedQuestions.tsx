import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

export default function SuggestedQuestions({ questions, onSelectQuestion }: SuggestedQuestionsProps) {
  return (
    <div className="text-center text-gray-500 mt-4 animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Sparkles className="w-4 h-4" />
        <span>Try asking one of these questions:</span>
      </div>
      <div className="space-y-2">
        {questions.map((question) => (
          <button
            key={question}
            onClick={() => onSelectQuestion(question)}
            className="block w-full text-left p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}