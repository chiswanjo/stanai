import React from 'react';
import { Brain, BookOpen, GraduationCap, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Smart Analysis',
    description: 'AI-powered note analysis for personalized learning experiences',
  },
  {
    icon: BookOpen,
    title: 'Custom Quizzes',
    description: 'Generate targeted questions based on your uploaded notes',
  },
  {
    icon: Target,
    title: 'Exam Prep',
    description: 'Practice with exam-style questions tailored to your material',
  },
  {
    icon: GraduationCap,
    title: 'Track Progress',
    description: 'Monitor your understanding and improve weak areas',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Why Choose StudyBot?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Transform your study sessions with AI-powered learning
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}