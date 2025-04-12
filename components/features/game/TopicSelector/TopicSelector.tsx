'use client';

import React, { useState } from 'react';
import { Button, Card, Input } from '@/components/common';
import { ChevronRight } from 'lucide-react';

interface TopicSelectorProps {
  onTopicSelected: (topic: string) => void;
  isLoading: boolean;
}

export function TopicSelector({ onTopicSelected, isLoading }: TopicSelectorProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [useCustom, setUseCustom] = useState<boolean>(false);
  
  const predefinedTopics = [
    'Space',
    'Nature',
    'History',
    'Technology',
    'Science',
    'Art',
    'Sports',
    'Food',
  ];
  
  const handleTopicSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(e.target.value);
  };
  
  const handleCustomTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTopic(e.target.value);
  };
  
  const handleSubmit = () => {
    const topic = useCustom ? customTopic : selectedTopic;
    if (topic) {
      onTopicSelected(topic);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-md border border-supatyper-lightBeige">
      <h2 className="text-xl font-semibold text-supatyper-darkBrown mb-4 text-center">
        Choose a Topic
      </h2>
      
      <div className="space-y-4">
        {!useCustom ? (
          <select 
            value={selectedTopic}
            onChange={handleTopicSelect}
            className="w-full p-3 bg-supatyper-backgroundLight border-supatyper-mutedBrown border rounded-md focus:outline-none focus:ring-2 focus:ring-supatyper-brightBlue"
          >
            <option value="">Select a topic</option>
            {predefinedTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        ) : (
          <Input
            type="text"
            placeholder="Enter a custom topic..."
            value={customTopic}
            onChange={handleCustomTopicChange}
            className="w-full bg-supatyper-backgroundLight border-supatyper-mutedBrown"
          />
        )}

        <div className="flex justify-between">
          <Button
            variant="link"
            onClick={() => {
              setUseCustom(!useCustom);
              if (useCustom) {
                setCustomTopic('');
              } else {
                setSelectedTopic('');
              }
            }}
            className="text-supatyper-brightBlue hover:text-supatyper-brightBlue/80"
          >
            {useCustom ? "Use predefined topic" : "Enter custom topic"}
          </Button>
          
          <Button
            onClick={handleSubmit}
            disabled={isLoading || (!selectedTopic && !customTopic)}
            className="bg-supatyper-brightBlue hover:bg-supatyper-brightBlue/90 text-white"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Start Typing <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
