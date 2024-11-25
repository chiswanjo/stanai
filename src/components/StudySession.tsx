import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Send, Book, FileWarning } from 'lucide-react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type Message = {
  text: string;
  isUser: boolean;
};

const sampleQuestions = {
  "history": [
    "What were the main causes of World War II?",
    "Explain the significance of the Industrial Revolution.",
    "Describe the impact of the Cold War on international relations."
  ],
  "science": [
    "Explain the process of photosynthesis.",
    "What are Newton's three laws of motion?",
    "Describe the structure of a human cell."
  ],
  "math": [
    "Solve this quadratic equation: x² + 5x + 6 = 0",
    "Explain the Pythagorean theorem and its applications.",
    "What is the derivative of f(x) = x³ + 2x² - 4x + 1?"
  ]
};

export default function StudySession() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedNotes, setUploadedNotes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const extractPdfText = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText;
    } catch (error) {
      console.error('Error reading PDF:', error);
      throw new Error('Failed to read PDF file');
    }
  };

  const handleFile = async (file: File) => {
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractPdfText(file);
      } else {
        text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsText(file);
        });
      }

      setUploadedNotes(prev => [...prev, file.name]);
      setError(null);

      const response = `I've analyzed your notes from ${file.name}. Would you like to:
1. Generate practice questions
2. Create a quiz
3. Get exam-style questions`;
      
      setMessages(prev => [
        ...prev,
        { text: `Uploaded: ${file.name}`, isUser: true },
        { text: response, isUser: false }
      ]);

    } catch (err) {
      setError('Failed to process the file. Please try again.');
      console.error(err);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(handleFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10485760 // 10MB
  });

  const simulateResponse = async (input: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    const subject = Object.keys(sampleQuestions).find(key => 
      input.toLowerCase().includes(key)
    );

    if (subject) {
      const questions = sampleQuestions[subject as keyof typeof sampleQuestions];
      return `Here are some practice questions based on your notes:\n\n${questions.join('\n\n')}`;
    }

    return "I understand you want to study. What specific topic would you like to focus on?";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const response = await simulateResponse(input);
    setMessages(prev => [...prev, { text: response, isUser: false }]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      <div className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
          {isTyping && <TypingIndicator />}
          {messages.length === 0 && (
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-black bg-gray-50' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">
                {isDragActive
                  ? "Drop your notes here..."
                  : "Drag & drop your study notes, or click to select files"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, TXT, and MD files (max 10MB)
              </p>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
              <FileWarning className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {uploadedNotes.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Book className="w-4 h-4" />
              <span>Uploaded Notes: {uploadedNotes.length} file(s)</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your notes or request a quiz..."
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