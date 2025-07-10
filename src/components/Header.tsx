import React from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { BookOpen } from 'lucide-react';
import cfLogo from '../assets/cfs.png';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <a
              href="https://www.youtube.com/@conceptfeelers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2"
            >
              <img src={cfLogo} alt="CF Logo" className="h-20 w-20 rounded-md" />
              <div>
                <h1 className="text-2xl font-bold">PrepFeelers</h1>
                <p className="text-blue-200 text-sm">Ace your Class 10th Board Exams</p>
              </div>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen size={24} className="text-blue-200" />
              <span className="text-sm font-medium">Academic Session 2025-26</span>
            </div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
