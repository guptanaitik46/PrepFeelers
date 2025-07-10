import React from 'react';
import { TestResults, Question, TestConfig } from '../types/Question';
import { Award, Clock, TrendingUp, TrendingDown, Download, RefreshCw, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QuestionCard from './QuestionCard';

interface FeedbackReportProps {
  results: TestResults;
  questions: Question[];
  config: TestConfig;
  onNewTest: () => void;
}

const FeedbackReport: React.FC<FeedbackReportProps> = ({ results, questions, config, onNewTest }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (percentage >= 40) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50' };
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const gradeInfo = getGrade(results.percentage);

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excellent', color: 'text-green-600', icon: TrendingUp };
    if (percentage >= 60) return { level: 'Good', color: 'text-blue-600', icon: TrendingUp };
    if (percentage >= 40) return { level: 'Average', color: 'text-yellow-600', icon: BarChart3 };
    return { level: 'Needs Improvement', color: 'text-red-600', icon: TrendingDown };
  };

  const downloadReport = async () => {
    const element = document.getElementById('feedback-report');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('cbse-test-feedback-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Safely handle answers data
  const userAnswers = results.answers || {};
  const correctAnswers = results.correctAnswers || {};

  return (
    <div id="feedback-report" className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Test Feedback Report</h1>
            <p className="text-gray-600">CBSE Class 10th Performance Analysis</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={downloadReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={16} />
              <span>Download Report</span>
            </button>
            <button
              onClick={onNewTest}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <RefreshCw size={16} />
              <span>Take New Test</span>
            </button>
          </div>
        </div>

        {/* Overall Performance */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`p-6 rounded-lg ${gradeInfo.bg}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Grade</p>
                <p className={`text-3xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
              </div>
              <Award className={gradeInfo.color} size={32} />
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {results.obtainedMarks}/{results.totalMarks}
                </p>
              </div>
              <div className="text-blue-600 text-xl font-bold">
                {results.percentage.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600">
                  {results.correctAnswersCount || Object.keys(userAnswers).filter(qId => userAnswers[qId] === correctAnswers[qId]).length}/{results.totalQuestions}
                </p>
              </div>
              <div className="text-green-600 text-xl font-bold">
                {((results.correctAnswersCount || Object.keys(userAnswers).filter(qId => userAnswers[qId] === correctAnswers[qId]).length / results.totalQuestions) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Time Taken</p>
                <p className="text-2xl font-bold text-purple-600">{formatTime(results.timeTaken)}</p>
              </div>
              <Clock className="text-purple-600" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject-wise Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(results.subjectPerformance || {}).map(([subject, performance]) => {
            const percentage = (performance.marks / performance.totalMarks) * 100;
            const level = getPerformanceLevel(percentage);
            const Icon = level.icon;

            return (
              <div key={subject} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{subject}</h3>
                  <div className={`flex items-center space-x-1 ${level.color}`}>
                    <Icon size={16} />
                    <span className="text-sm font-medium">{level.level}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Score: {performance.marks}/{performance.totalMarks}</span>
                    <span className="font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        percentage >= 80 ? 'bg-green-500' :
                        percentage >= 60 ? 'bg-blue-500' :
                        percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">
                    {performance.correct}/{performance.total} questions correct
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapter-wise Analysis</h2>
        
        {/* Strong Areas */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-green-700 mb-3 flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Strong Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(results.chapterPerformance || {})
              .filter(([_, performance]) => (performance.marks / performance.totalMarks) >= 0.7)
              .map(([chapter, performance]) => (
                <div key={chapter} className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">{chapter}</span>
                    <span className="text-green-600 text-sm font-medium">
                      {((performance.marks / performance.totalMarks) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-green-700 text-xs mt-1">
                    {performance.correct}/{performance.total} questions correct
                  </p>
                </div>
              ))}
          </div>
          {Object.entries(results.chapterPerformance || {}).filter(([_, performance]) => (performance.marks / performance.totalMarks) >= 0.7).length === 0 && (
            <p className="text-gray-500 italic">No chapters with 70%+ performance</p>
          )}
        </div>

        {/* Areas for Improvement */}
        <div>
          <h3 className="text-lg font-medium text-red-700 mb-3 flex items-center">
            <TrendingDown className="mr-2" size={20} />
            Areas for Improvement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(results.chapterPerformance || {})
              .filter(([_, performance]) => (performance.marks / performance.totalMarks) < 0.5)
              .map(([chapter, performance]) => (
                <div key={chapter} className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-red-800">{chapter}</span>
                    <span className="text-red-600 text-sm font-medium">
                      {((performance.marks / performance.totalMarks) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-red-700 text-xs mt-1">
                    {performance.correct}/{performance.total} questions correct
                  </p>
                </div>
              ))}
          </div>
          {Object.entries(results.chapterPerformance || {}).filter(([_, performance]) => (performance.marks / performance.totalMarks) < 0.5).length === 0 && (
            <p className="text-gray-500 italic">Great job! No chapters need immediate attention</p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h2>
        <div className="space-y-4">
          {results.percentage >= 80 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">Excellent Performance! 🎉</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Continue practicing with more challenging questions</li>
                <li>• Focus on time management to solve questions faster</li>
                <li>• Help your classmates with topics you've mastered</li>
              </ul>
            </div>
          ) : results.percentage >= 60 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Good Performance! 👍</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Review the chapters where you scored below 70%</li>
                <li>• Practice more questions from weak areas</li>
                <li>• Focus on understanding concepts rather than memorizing</li>
              </ul>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-800 mb-2">Needs Improvement 📚</h3>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Dedicate more time to studying the highlighted weak chapters</li>
                <li>• Seek help from teachers or tutors for difficult topics</li>
                <li>• Practice regularly with previous year questions</li>
                <li>• Create a study schedule focusing on weak areas</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Question-wise Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Question-wise Analysis</h2>
        
        {/* Correct Answers */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-green-700 mb-4 flex items-center">
            <CheckCircle className="mr-2" size={20} />
            Correctly Answered Questions ({Object.keys(userAnswers).filter(qId => userAnswers[qId] === correctAnswers[qId]).length})
          </h3>
          <div className="space-y-4">
            {questions
              .filter(q => userAnswers[q.id] === correctAnswers[q.id])
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={questions.findIndex(q => q.id === question.id)}
                  showCorrectAnswer={true}
                  userAnswer={userAnswers[question.id]}
                />
              ))}
            {questions.filter(q => userAnswers[q.id] === correctAnswers[q.id]).length === 0 && (
              <p className="text-gray-500 italic">No questions answered correctly</p>
            )}
          </div>
        </div>

        {/* Wrong Answers */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-red-700 mb-4 flex items-center">
            <XCircle className="mr-2" size={20} />
            Incorrectly Answered Questions ({Object.keys(userAnswers).filter(qId => userAnswers[qId] !== undefined && userAnswers[qId] !== correctAnswers[qId]).length})
          </h3>
          <div className="space-y-4">
            {questions
              .filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== correctAnswers[q.id])
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={questions.findIndex(q => q.id === question.id)}
                  showCorrectAnswer={true}
                  userAnswer={userAnswers[question.id]}
                />
              ))}
            {questions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== correctAnswers[q.id]).length === 0 && (
              <p className="text-gray-500 italic">No questions answered incorrectly</p>
            )}
          </div>
        </div>

        {/* Unanswered Questions */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            Unanswered Questions ({questions.filter(q => userAnswers[q.id] === undefined).length})
          </h3>
          <div className="space-y-4">
            {questions
              .filter(q => userAnswers[q.id] === undefined)
              .map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  index={questions.findIndex(q => q.id === question.id)}
                  showCorrectAnswer={true}
                  userAnswer={userAnswers[question.id]}
                />
              ))}
            {questions.filter(q => userAnswers[q.id] === undefined).length === 0 && (
              <p className="text-gray-500 italic">All questions were answered</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackReport;