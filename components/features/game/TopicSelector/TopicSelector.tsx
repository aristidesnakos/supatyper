'use client';

import React, { useState } from 'react';
import { Button, Card, Input } from '@/components/common';
import { useGame } from '@/context';

export function TopicSelector() {
  const { selectTopic, startTyping } = useGame();
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
  
  const predefinedTopics = [
    'Technology', 'Nature', 'Space', 'History', 
    'Science', 'Art', 'Sports', 'Food'
  ];
  
  const handleTopicSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topic = e.target.value;
    setSelectedTopic(topic);
    selectTopic(topic);
  };
  
  const handleCustomTopic = () => {
    setShowCustomInput(!showCustomInput);
    if (!showCustomInput) {
      setSelectedTopic('');
    }
  };
  
  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const topic = e.target.value;
    setCustomTopic(topic);
    selectTopic(topic);
  };
  
  const handleStartTyping = () => {
    const topic = showCustomInput ? customTopic : selectedTopic;
    if (topic) {
      startTyping(topic);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
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
          <Input
            placeholder="Enter a custom topic..."
            value={customTopic}
            onChange={handleCustomTopicChange}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <Button 
          variant="link"
          onClick={handleCustomTopic}
        >
          {showCustomInput ? 'Select from list' : 'Enter custom topic'}
        </Button>
        
        <Button
          onClick={handleStartTyping}
          disabled={!selectedTopic && !customTopic}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          }
        >
          Start Typing
        </Button>
      </div>
    </Card>
  );
}
