import React from 'react';
import { Question } from '../types/Question';
import { Calendar, FileText, Award, BookOpen } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedOption?: number;
  onAnswerChange?: (optionIndex: number) => void;
  showAnswerInput?: boolean;
  showCorrectAnswer?: boolean;
  userAnswer?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  index, 
  selectedOption, 
  onAnswerChange, 
  showAnswerInput = false,
  showCorrectAnswer = false,
  userAnswer
}) => {
  const getSubjectColor = (subject: string) => {
    const colors = {
      Mathematics: 'bg-blue-100 text-blue-800',
      Physics: 'bg-purple-100 text-purple-800',
      Chemistry: 'bg-green-100 text-green-800',
      Biology: 'bg-orange-100 text-orange-800'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getOptionStyle = (optionIndex: number) => {
    if (!showCorrectAnswer) {
      // During test - show selected option
      if (selectedOption === optionIndex) {
        return 'bg-blue-100 border-blue-500 text-blue-800';
      }
      return 'bg-gray-50 border-gray-300 hover:bg-gray-100';
    }
    
    // After test - show correct/incorrect answers
    if (optionIndex === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-800'; // Correct answer
    }
    if (userAnswer === optionIndex && userAnswer !== question.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-800'; // Wrong answer selected by user
    }
    return 'bg-gray-50 border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Q{index + 1}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(question.subject)}`}>
            {question.subject}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Multiple Choice
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Award size={12} className="mr-1" />
            {question.marks} Mark{question.marks > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-900 text-base leading-relaxed">{question.questionText}</p>
      </div>

      {/* Options */}
      <div className="mb-4">
        <div className="space-y-3">
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center">
              {showAnswerInput && onAnswerChange ? (
                <label className={`flex items-center w-full p-3 rounded-lg border-2 cursor-pointer transition-all ${getOptionStyle(optionIndex)}`}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionIndex}
                    checked={selectedOption === optionIndex}
                    onChange={() => onAnswerChange(optionIndex)}
                    className="mr-3"
                  />
                  <span className="font-medium mr-2">({String.fromCharCode(65 + optionIndex)})</span>
                  <span>{option}</span>
                </label>
              ) : (
                <div className={`flex items-center w-full p-3 rounded-lg border-2 ${getOptionStyle(optionIndex)}`}>
                  <div className="mr-3 w-4 h-4 rounded-full border-2 border-current flex items-center justify-center">
                    {(showCorrectAnswer && optionIndex === question.correctAnswer) && (
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    )}
                    {(showCorrectAnswer && userAnswer === optionIndex && userAnswer !== question.correctAnswer) && (
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    )}
                  </div>
                  <span className="font-medium mr-2">({String.fromCharCode(65 + optionIndex)})</span>
                  <span>{option}</span>
                  {showCorrectAnswer && optionIndex === question.correctAnswer && (
                    <span className="ml-auto text-green-600 font-medium">✓ Correct</span>
                  )}
                  {showCorrectAnswer && userAnswer === optionIndex && userAnswer !== question.correctAnswer && (
                    <span className="ml-auto text-red-600 font-medium">✗ Your Answer</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen size={14} />
            <span>Chapter: {question.chapter}</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <Calendar size={14} />
            <span>Year: {question.year}</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;