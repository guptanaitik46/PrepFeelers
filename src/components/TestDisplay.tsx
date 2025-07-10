import React, { useState, useEffect } from 'react';
import { Question, TestConfig } from '../types/Question';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import { Clock, FileText, Award, AlertTriangle } from 'lucide-react';

interface TestDisplayProps {
  questions: Question[];
  config: TestConfig;
  onSubmitTest: (answers: Record<string, number>) => void;
  timeLimit: number; // in minutes
}

const TestDisplay: React.FC<TestDisplayProps> = ({ questions, config, onSubmitTest, timeLimit }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  const answeredCount = Object.keys(answers).length;

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    onSubmitTest(answers);
  };

  const handleSubmit = () => {
    if (showSubmitConfirm) {
      onSubmitTest(answers);
    } else {
      setShowSubmitConfirm(true);
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    return `${minutes / 60} hour${minutes > 60 ? 's' : ''}`;
  };

  if (timeUp) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto text-red-600 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Time's Up!</h2>
        <p className="text-gray-600">Your test has been automatically submitted.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Test Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">CBSE Class 10th Test</h2>
            <p className="text-gray-600">Answer all questions within the time limit</p>
          </div>
          <Timer 
            duration={timeLimit} 
            onTimeUp={handleTimeUp}
          />
        </div>

        {/* Test Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileText className="text-blue-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Total Questions</p>
                <p className="text-lg font-semibold text-blue-600">{questions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Award className="text-green-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Total Marks</p>
                <p className="text-lg font-semibold text-green-600">{totalMarks}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="text-purple-600" size={20} />
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-lg font-semibold text-purple-600">{formatDuration(timeLimit)}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div>
                <p className="text-sm text-gray-600">Answered</p>
                <p className="text-lg font-semibold text-orange-600">{answeredCount}/{questions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          {showSubmitConfirm ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">Are you sure you want to submit?</p>
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Yes, Submit Test
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionCard 
            key={question.id} 
            question={question} 
            index={index}
            selectedOption={answers[question.id]}
            onAnswerChange={(optionIndex) => handleAnswerChange(question.id, optionIndex)}
            showAnswerInput={true}
          />
        ))}
      </div>
    </div>
  );
};

export default TestDisplay;