import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import TestPage from './pages/TestPage';
import FeedbackPage from './pages/FeedbackPage';
import { TestProvider } from './context/TestContext';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <SignedOut>
          <AuthPage />
        </SignedOut>
        
        <SignedIn>
          <TestProvider>
            <Routes>
              <Route path="/" element={<TestPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </TestProvider>
        </SignedIn>
      </main>
    </div>
  );
}

export default App;
