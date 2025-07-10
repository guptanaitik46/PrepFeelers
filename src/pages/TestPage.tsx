import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestConfigForm from '../components/TestConfigForm';
import TestDisplay from '../components/TestDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTestContext } from '../context/TestContext';
import { useTestGenerator } from '../hooks/useTestGenerator';
import { TestConfig } from '../types/Question';
import { AlertCircle } from 'lucide-react';

const TestPage: React.FC = () => {
  const navigate = useNavigate();
  const { testState, startTest, submitTest } = useTestContext();
  const {
    isGenerating,
    generatedQuestions,
    generateTest,
    resetTest,
    error,
    isGeminiConfigured,
  } = useTestGenerator();

  // ✅ Track last used config
  const [lastUsedConfig, setLastUsedConfig] = useState<TestConfig | null>(null);

  const handleGenerateTest = async (config: TestConfig) => {
    setLastUsedConfig(config); // ✅ Store config for later
    await generateTest(config);
  };

  const handleStartTest = () => {
    if (generatedQuestions.length > 0 && lastUsedConfig) {
      startTest(generatedQuestions, lastUsedConfig);
    }
  };

  const handleSubmitTest = (answers: Record<string, string>) => {
    if (testState.questions.length > 0) {
      submitTest(answers);
      navigate('/feedback');
    }
  };

  const handleGenerateNew = () => {
    resetTest();
    setLastUsedConfig(null); // 🔄 reset config too
  };

  // ✅ If test is running, show TestDisplay with correct config
  if (testState.isActive) {
    return (
      <TestDisplay
        questions={testState.questions}
        config={testState.config!}
        onSubmitTest={handleSubmitTest}
        timeLimit={testState.config?.duration || 60}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Generate Your Test Paper
        </h2>
        <p className="text-gray-600 text-lg">
          Create customized test papers using{' '}
          {isGeminiConfigured
            ? 'authentic CBSE previous year questions'
            : 'sample questions'}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-red-600" size={20} />
            <div>
              <h3 className="text-red-800 font-medium">Error Generating Test</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* States */}
      {isGenerating ? (
        <LoadingSpinner
          message={
            isGeminiConfigured
              ? 'Generating authentic CBSE questions with AI...'
              : 'Generating test paper...'
          }
        />
      ) : generatedQuestions.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Test Generated Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            {generatedQuestions.length} questions have been generated. Click
            "Start Test" to begin your timed assessment.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={handleStartTest}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Start Test
            </button>
            <button
              onClick={handleGenerateNew}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Generate New Test
            </button>
          </div>
        </div>
      ) : (
        <TestConfigForm onGenerateTest={handleGenerateTest} />
      )}

      {/* Disclaimer */}
      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Important Note
        </h3>
        <p className="text-yellow-700 text-sm">
          {isGeminiConfigured ? (
            <>
              This application uses AI to generate authentic CBSE previous year
              questions. While we strive for accuracy, always verify questions
              with official CBSE sources before using for exam preparation.
            </>
          ) : (
            <>
              This is a demonstration version of Testify by CF. In a production
              environment, this would be connected to a comprehensive database
              of authentic CBSE previous year questions from 2010–2025. The
              sample questions shown are for illustration purposes only.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default TestPage;
