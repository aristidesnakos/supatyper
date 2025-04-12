'use client';

import React from 'react';

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center mb-2">
        <svg className="w-10 h-10 text-blue mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
        <h1 className="text-4xl font-bold text-secondary">SupaTyper</h1>
      </div>
      <p className="text-secondary text-lg">Improve your typing with quick, topic-based practice</p>
    </header>
  );
}
