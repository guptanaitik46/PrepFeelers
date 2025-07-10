import React, { useState } from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { BookOpen, Users, Award, Clock } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left side - Features */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Master CBSE Class 10th with Authentic PYQs
            </h1>
            <p className="text-xl text-gray-600">
              Practice with real previous year questions, get instant feedback, and track your progress
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="text-blue-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Authentic Questions</h3>
              <p className="text-gray-600 text-sm">
                Access real CBSE previous year questions from 2010-2025
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Clock className="text-green-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Timed Tests</h3>
              <p className="text-gray-600 text-sm">
                Practice with real exam timing and auto-submission
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Award className="text-purple-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Instant Feedback</h3>
              <p className="text-gray-600 text-sm">
                Get detailed analysis of your performance and improvement areas
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <Users className="text-orange-600 mb-3" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">
                Monitor your improvement across subjects and chapters
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth */}
        <div className="flex justify-center items-center px-4 lg:px-12">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Start your CBSE preparation journey' : 'Continue your preparation'}
              </p>
            </div>

            <div className="flex justify-center">
              {isSignUp ? (
                <SignUp />
              ) : (
                <SignIn />
              )}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
