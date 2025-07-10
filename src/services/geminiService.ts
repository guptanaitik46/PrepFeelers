import { GoogleGenerativeAI } from '@google/generative-ai';
import { Question, TestConfig } from '../types/Question';

// Debug environment variable loading
console.log('Environment check:', {
  hasViteEnv: !!import.meta.env,
  apiKeyExists: !!import.meta.env.VITE_GEMINI_API_KEY,
  apiKeyLength: import.meta.env.VITE_GEMINI_API_KEY?.length || 0,
  mode: import.meta.env.MODE
});

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

if (!API_KEY) {
  console.warn('Gemini API key not found or empty. Using sample questions instead.');
  console.log('Available env vars:', Object.keys(import.meta.env));
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const generateQuestionsWithGemini = async (config: TestConfig): Promise<Question[]> => {
  if (!genAI) {
    throw new Error('Gemini API key not configured. Please add your API key to the .env file. Get your key from: https://makersuite.google.com/app/apikey');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are an expert CBSE Class 10th question paper generator. Generate ${config.questionCount} authentic CBSE previous year questions (2010-2025) based on the following criteria:

**Requirements:**
- Class: 10th
- Subjects: ${config.subjects.join(', ')}
- Chapters: ${config.chapters.length > 0 ? config.chapters.join(', ') : 'Any relevant chapters'}
- Marks per question: ${config.marksPerQuestion}
- Question type: ${config.type}

**Important Guidelines:**
1. Generate questions that are similar to authentic CBSE questions from years 2010-2025
2. Exclude questions that are no longer part of current CBSE syllabus
3. Make questions realistic and exam-appropriate
4. Include proper metadata for each question (do NOT include questionNumber field)
5. Questions should be clear, well-formatted, and appropriate for Class 10th level

**Output Format (JSON Array):**
[
  {
    "id": "unique_id",
    "questionText": "Complete question text exactly as it appeared in CBSE paper",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "subject": "Mathematics|Physics|Chemistry|Biology",
    "chapter": "Chapter name",
    "marks": 1|2|3|4|5,
    "year": 2010-2025,
    "paperSet": "Set 1|Set 2|Set 3",
    "questionType": "Objective"
  }
]

**Important Instructions:**
1. ALL questions must be in Multiple Choice Question (MCQ) format with exactly 4 options
2. Only ONE option should be correct (index 0-3)
3. Make sure options are realistic and plausible
4. correctAnswer should be the index (0, 1, 2, or 3) of the correct option
5. All questions should be "Objective" type only

Generate exactly ${config.questionCount} MCQ questions following this format. Ensure all questions are authentic CBSE PYQs and currently relevant to the syllabus.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }
    
    const questions: Question[] = JSON.parse(jsonMatch[0]);
    
    // Validate and ensure proper structure
    return questions.map((q, index) => ({
      ...q,
      id: q.id || `gemini_${Date.now()}_${index}`,
      marks: Number(q.marks) as 1 | 2 | 3 | 4 | 5,
      correctAnswer: Number(q.correctAnswer),
      questionType: 'Objective' as const
    }));
    
  } catch (error) {
    console.error('Error generating questions with Gemini:', error);
    
    // Handle specific API key errors
    if (error instanceof Error && error.message.includes('API key not valid')) {
      throw new Error('Invalid Gemini API key. Please check your API key in the .env file and ensure it\'s valid. Get a new key from: https://makersuite.google.com/app/apikey');
    }
    
    throw new Error('Failed to generate questions. Please try again. If your daily limit has been reached, you can try again after 24 hours.');
  }
};

export const isGeminiConfigured = (): boolean => {
  return !!API_KEY;
};
