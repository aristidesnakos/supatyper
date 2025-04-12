'use client';

import { useState } from 'react';

interface TopicSelectorProps {
  onSelectTopic: (topic: string) => void;
  onStartTyping: (topic: string) => void;
}

export default function TopicSelector({ onSelectTopic, onStartTyping }: TopicSelectorProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  
  const predefinedTopics = [
    'Technology', 'Nature', 'Space', 'History', 
    'Science', 'Art', 'Sports', 'Food'
  ];
  
  const handleTopicSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
    onSelectTopic(e.target.value);
  };
  
  const handleCustomTopic = () => {
    setShowCustomInput(!showCustomInput);
    if (!showCustomInput) {
      setSelectedTopic('');
    }
  };
  
  const handleStartTyping = () => {
    const topic = showCustomInput ? customTopic : selectedTopic;
    if (topic) {
      onStartTyping(topic);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-8 w-full max-w-md mx-auto">
      <h2 className="text-secondary text-2xl font-semibold text-center mb-6">Choose a Topic</h2>
      
      {!showCustomInput ? (
        <div className="mb-6">
          <select 
            className="w-full p-3 border border-beige rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-buttonBlue"
            value={selectedTopic}
            onChange={handleTopicSelect}
          >
            <option value="">Select a topic</option>
            {predefinedTopics.map(topic => (
              <option key={topic} value={topic.toLowerCase()}>{topic}</option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-3 border border-beige rounded-lg text-secondary focus:outline-none focus:ring-2 focus:ring-buttonBlue"
            placeholder="Enter a custom topic..."
            value={customTopic}
            onChange={(e) => {
              setCustomTopic(e.target.value);
              onSelectTopic(e.target.value);
            }}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <button 
          className="text-blue hover:text-opacity-80 focus:outline-none"
          onClick={handleCustomTopic}
        >
          {showCustomInput ? 'Select from list' : 'Enter custom topic'}
        </button>
        
        <button
          className="bg-buttonBlue hover:bg-opacity-90 text-white px-6 py-3 rounded-lg flex items-center focus:outline-none focus:ring-2 focus:ring-buttonBlue focus:ring-opacity-50 disabled:opacity-50"
          onClick={handleStartTyping}
          disabled={!selectedTopic && !customTopic}
        >
          Start Typing
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
