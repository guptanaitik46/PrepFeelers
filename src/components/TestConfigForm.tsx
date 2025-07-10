import React, { useState } from 'react';
import { TestConfig, ChaptersBySubject } from '../types/Question';
import { chaptersBySubject } from '../data/sampleQuestions';
import { Settings, Clock, Hash, Award, AlertCircle, Zap } from 'lucide-react';
import { useTestGenerator } from '../hooks/useTestGenerator';

interface TestConfigFormProps {
  onGenerateTest: (config: TestConfig) => void;
}

const TestConfigForm: React.FC<TestConfigFormProps> = ({ onGenerateTest }) => {
  const { isGeminiConfigured } = useTestGenerator();
  const [config, setConfig] = useState<TestConfig>({
    subjects: ['Mathematics'],
    chapters: [],
    questionCount: 10,
    marksPerQuestion: 'Mixed',
    duration: 60,
    type: 'Individual',
  });

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const markOptions = [1, 2, 3, 4, 5];
  const durationOptions = [15, 30, 45, 60, 90, 120, 180, 240];

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject),
      chapters: [],
    }));
  };

  const handleChapterChange = (chapter: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      chapters: checked
        ? [...prev.chapters, chapter]
        : prev.chapters.filter(c => c !== chapter),
    }));
  };

  const getAvailableChapters = (): string[] => {
    const allChapters: string[] = [];
    config.subjects.forEach(subject => {
      const chapters = chaptersBySubject[subject as keyof ChaptersBySubject];
      if (chapters) allChapters.push(...chapters);
    });
    return allChapters;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateTest(config);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Settings className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-gray-800">Test Configuration</h2>
        </div>
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isGeminiConfigured ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isGeminiConfigured ? (
            <>
              <Zap size={16} />
              <span>AI Powered</span>
            </>
          ) : (
            <>
              <AlertCircle size={16} />
              <span>Demo Mode</span>
            </>
          )}
        </div>
      </div>

      {/* API warning */}
      {/* {!isGeminiConfigured && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-600 mt-0.5" size={20} />
            <div>
              <h3 className="text-blue-800 font-medium mb-1">
                Setup Gemini AI for Authentic Questions
              </h3>
              <p className="text-blue-700 text-sm mb-2">
                Currently using sample questions. To generate authentic CBSE PYQs:
              </p>
              <ol className="text-blue-700 text-sm list-decimal ml-4 space-y-1">
                <li>
                  Get your API key from{' '}
                  <a
                    className="underline"
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Google AI Studio
                  </a>
                </li>
                <li>
                  Add it to your <code>.env</code> file as{' '}
                  <code>VITE_GEMINI_API_KEY=your_key_here</code>
                </li>
                <li>Restart your dev server</li>
              </ol>
            </div>
          </div>
        </div>
      )} */}

      {/* Form Start */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
          <div className="flex space-x-4">
            {['Individual', 'Mixed'].map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={config.type === type}
                  onChange={e => setConfig({ ...config, type: e.target.value as 'Individual' | 'Mixed' })}
                  className="mr-2"
                />
                {type} Subjects
              </label>
            ))}
          </div>
        </div> */}

        {/* Subjects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Subjects</label>
          <div className="grid grid-cols-2 gap-3">
            {subjects.map(subject => (
              <label
                key={subject}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={config.subjects.includes(subject)}
                  onChange={e => handleSubjectChange(subject, e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Chapters */}
        {config.subjects.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Chapters (Optional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {getAvailableChapters().map((chapter, index) => (
                <label
                  key={`${chapter}-${index}`}
                  className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={config.chapters.includes(chapter)}
                    onChange={e => handleChapterChange(chapter, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">{chapter}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash size={16} className="inline mr-1" />
              Number of Questions
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={isNaN(config.questionCount) ? '' : config.questionCount}
              onChange={e =>
                setConfig({ ...config, questionCount: Number(e.target.value) || 0 })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Award size={16} className="inline mr-1" />
              Marks per Question
            </label>
            <select
              value={String(config.marksPerQuestion)}
              onChange={e =>
                setConfig({
                  ...config,
                  marksPerQuestion:
                    e.target.value === 'Mixed' ? 'Mixed' : Number(e.target.value),
                })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Mixed">Mixed</option>
              {markOptions.map(mark => (
                <option key={mark} value={mark}>
                  {mark} Mark{mark > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock size={16} className="inline mr-1" />
              Duration
            </label>
            <select
              value={isNaN(config.duration) ? '' : config.duration}
              onChange={e =>
                setConfig({ ...config, duration: Number(e.target.value) || 0 })
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {durationOptions.map(duration => (
                <option key={duration} value={duration}>
                  {duration < 60
                    ? `${duration} minutes`
                    : duration === 60
                    ? '1 hour'
                    : `${duration / 60} hours`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
        >
          {isGeminiConfigured
            ? 'Generate Authentic CBSE Test Paper'
            : 'Generate Sample Test Paper'}
        </button>
      </form>
    </div>
  );
};

export default TestConfigForm;
