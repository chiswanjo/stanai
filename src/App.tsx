import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './components/Logo';
import StudySession from './components/StudySession';
import Features from './components/Features';
import ChatDemo from './components/ChatDemo';
import AuthModal from './components/auth/AuthModal';
import UserMenu from './components/UserMenu';
import { useAuthStore } from './store/authStore';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-white">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Logo />
              <span className="text-xl font-bold">StanAI</span>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="block w-full text-left px-3 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <header className="pt-16 pb-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            Your AI Study Companion
            <span className="block mt-2">for Better Learning</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Upload your notes and let StanAI create personalized quizzes, ask exam-style questions,
            and help you master your subjects.
          </p>
          <div className="mt-12 animate-fade-in">
            <StudySession />
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Chat with Stan</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ask questions, get explanations, or just have a friendly chat!
            </p>
          </div>
          <ChatDemo />
        </div>
      </section>

      <Features />

      <footer className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="font-semibold">StanAI</span>
            </div>
            <p className="text-gray-500 text-sm">© 2024 StanAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;