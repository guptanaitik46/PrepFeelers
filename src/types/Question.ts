export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  subject: 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology';
  chapter: string;
  marks: 1 | 2 | 3 | 4 | 5;
  year: number;
  // paperSet: string;
  // questionNumber: string;
  questionType: 'Objective';
}

export interface TestConfig {
  subjects: string[];
  chapters: string[];
  questionCount: number;
  marksPerQuestion: number | 'Mixed';
  duration: number; // in minutes
  // type: 'Individual' | 'Mixed';
}

export interface ChaptersBySubject {
  [key: string]: string[];
}

export interface TestResults {
  questionsWithSolutions?: Question[];
  totalQuestions: number;
  correctAnswers: number;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  timeTaken: number; // in seconds
  subjectPerformance: Record<string, {
    correct: number;
    total: number;
    marks: number;
    totalMarks: number;
  }>;
  chapterPerformance: Record<string, {
    correct: number;
    total: number;
    marks: number;
    totalMarks: number;
  }>;
  answers: Record<string, number>; // User's selected option index
  correctAnswers: Record<string, number>; // Correct option index for each question
}