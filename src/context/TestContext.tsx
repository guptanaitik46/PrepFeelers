import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Question, TestConfig, TestResults } from '../types/Question';

interface TestState {
  isActive: boolean;
  questions: Question[];
  config: TestConfig | null;
  startTime: number | null;
  results: TestResults | null;
}

type TestAction = 
  | { type: 'START_TEST'; payload: { questions: Question[]; config: TestConfig } }
  | { type: 'SUBMIT_TEST'; payload: { answers: Record<string, number> } }
  | { type: 'RESET_TEST' };

const initialState: TestState = {
  isActive: false,
  questions: [],
  config: null,
  startTime: null,
  results: null,
};

const testReducer = (state: TestState, action: TestAction): TestState => {
  switch (action.type) {
    case 'START_TEST':
      return {
        ...state,
        isActive: true,
        questions: action.payload.questions,
        config: action.payload.config,
        startTime: Date.now(),
        results: null,
      };
    
    case 'SUBMIT_TEST':
      if (!state.config || !state.startTime) return state;
      
      const endTime = Date.now();
      const timeTaken = Math.floor((endTime - state.startTime) / 1000); // in seconds
      
      // Calculate results
      const results = calculateResults(state.questions, action.payload.answers, timeTaken);
      
      return {
        ...state,
        isActive: false,
        results,
      };
    
    case 'RESET_TEST':
      return initialState;
    
    default:
      return state;
  }
};

const calculateResults = (questions: Question[], answers: Record<string, number>, timeTaken: number): TestResults => {
  const totalQuestions = questions.length;
  const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
  
  let correctAnswers = 0;
  let obtainedMarks = 0;
  const subjectPerformance: Record<string, { correct: number; total: number; marks: number; totalMarks: number }> = {};
  const chapterPerformance: Record<string, { correct: number; total: number; marks: number; totalMarks: number }> = {};
  const correctAnswersMap: Record<string, number> = {};
  
  questions.forEach(question => {
    const userAnswer = answers[question.id];
    const hasAnswer = userAnswer !== undefined;
    correctAnswersMap[question.id] = question.correctAnswer;
    
    // Check if the answer is correct
    const isCorrect = hasAnswer && userAnswer === question.correctAnswer;
    
    if (isCorrect) {
      correctAnswers++;
      obtainedMarks += question.marks;
    }
    
    // Subject performance
    if (!subjectPerformance[question.subject]) {
      subjectPerformance[question.subject] = { correct: 0, total: 0, marks: 0, totalMarks: 0 };
    }
    subjectPerformance[question.subject].total++;
    subjectPerformance[question.subject].totalMarks += question.marks;
    if (isCorrect) {
      subjectPerformance[question.subject].correct++;
      subjectPerformance[question.subject].marks += question.marks;
    }
    
    // Chapter performance
    if (!chapterPerformance[question.chapter]) {
      chapterPerformance[question.chapter] = { correct: 0, total: 0, marks: 0, totalMarks: 0 };
    }
    chapterPerformance[question.chapter].total++;
    chapterPerformance[question.chapter].totalMarks += question.marks;
    if (isCorrect) {
      chapterPerformance[question.chapter].correct++;
      chapterPerformance[question.chapter].marks += question.marks;
    }
  });
  
  const percentage = (obtainedMarks / totalMarks) * 100;
  
  return {
    totalQuestions,
    correctAnswers,
    totalMarks,
    obtainedMarks,
    percentage,
    timeTaken,
    subjectPerformance,
    chapterPerformance,
    answers,
    correctAnswers: correctAnswersMap,
  };
};

const TestContext = createContext<{
  testState: TestState;
  startTest: (questions: Question[], config: TestConfig) => void;
  submitTest: (answers: Record<string, string>) => TestResults;
  resetTest: () => void;
} | null>(null);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [testState, dispatch] = useReducer(testReducer, initialState);
  
  const startTest = (questions: Question[], config: TestConfig) => {
    dispatch({ type: 'START_TEST', payload: { questions, config } });
  };
  
  const submitTest = (answers: Record<string, string>) => {
    dispatch({ type: 'SUBMIT_TEST', payload: { answers } });
    return testState.results!; // This will be available after dispatch
  };
  
  const resetTest = () => {
    dispatch({ type: 'RESET_TEST' });
  };
  
  return (
    <TestContext.Provider value={{ testState, startTest, submitTest, resetTest }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
};