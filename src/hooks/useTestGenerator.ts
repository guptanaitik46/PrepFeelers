import { useState, useCallback } from 'react';
import { Question, TestConfig } from '../types/Question';
import { sampleQuestions } from '../data/sampleQuestions'; 
import { generateQuestionsWithGemini, isGeminiConfigured } from '../services/geminiService';

export const useTestGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateTest = useCallback(async (config: TestConfig) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      let questions: Question[] = [];

      if (isGeminiConfigured()) {
        // Use Gemini AI to generate authentic CBSE questions
        console.log('Generating questions with Gemini AI...');
        console.log('API Key configured:', !!import.meta.env.VITE_GEMINI_API_KEY);
        questions = await generateQuestionsWithGemini(config);
      } else {
        // Fallback to sample questions
        console.log('Using sample questions (Gemini API not configured)');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        let filteredQuestions = [...sampleQuestions]; // Create a copy to avoid mutation

        // Filter by subjects
        if (config.subjects.length > 0) {
          filteredQuestions = filteredQuestions.filter(q => 
            config.subjects.includes(q.subject)
          );
        }

        // Filter by chapters if specified
        if (config.chapters.length > 0) {
          filteredQuestions = filteredQuestions.filter(q => 
            config.chapters.includes(q.chapter)
          );
        }

        // Filter by marks if not mixed
        if (config.marksPerQuestion !== 'Mixed') {
          filteredQuestions = filteredQuestions.filter(q => 
            q.marks === config.marksPerQuestion
          );
        }

        // Shuffle and select required number of questions
        const shuffled = filteredQuestions
          .sort(() => Math.random() - 0.5) // First shuffle
          .sort(() => Math.random() - 0.5); // Double shuffle for better randomization
        questions = shuffled.slice(0, config.questionCount);

        // If we don't have enough questions, duplicate some with different metadata
        if (questions.length < config.questionCount) {
          const additionalQuestions = [];
          const needed = config.questionCount - questions.length;
          
          for (let i = 0; i < needed; i++) {
            const baseQuestion = sampleQuestions[i % sampleQuestions.length];
            const randomYear = 2015 + Math.floor(Math.random() * 10); // Random year 2015-2024
            const randomSet = Math.floor(Math.random() * 3) + 1; // Random set 1-3
            additionalQuestions.push({
              ...baseQuestion,
              id: `${baseQuestion.id}_dup_${i}`,
              year: randomYear,
              paperSet: `Set ${randomSet}`,
              // Slightly modify question text to make it unique
              questionText: baseQuestion.questionText + ` [Variant ${i + 1}]`
            });
          }
          
          questions.push(...additionalQuestions);
        }
      }

      setGeneratedQuestions(questions);
    } catch (error) {
      console.error('Error generating test:', error);
      
      let errorMessage = 'Failed to generate test';
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      setGeneratedQuestions([]);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const resetTest = useCallback(() => {
    setGeneratedQuestions([]);
    setError(null);
  }, []);

  return {
    isGenerating,
    generatedQuestions,
    generateTest,
    resetTest,
    error,
    isGeminiConfigured: isGeminiConfigured()
  };
};