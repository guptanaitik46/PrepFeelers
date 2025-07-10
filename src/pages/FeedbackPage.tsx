import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestContext } from '../context/TestContext';
import FeedbackReport from '../components/FeedbackReport';
import { ArrowLeft } from 'lucide-react';

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { testState, resetTest } = useTestContext();

  if (!testState.results) {
    navigate('/');
    return null;
  }

  const handleNewTest = () => {
    resetTest();
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Tests</span>
        </button>
      </div>

      <FeedbackReport 
        results={testState.results}
        questions={testState.questions}
        config={testState.config!}
        onNewTest={handleNewTest}
      />
    </div>
  );
};

export default FeedbackPage;