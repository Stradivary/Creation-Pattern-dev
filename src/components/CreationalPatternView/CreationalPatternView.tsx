import React from "react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

interface CreationalProps {
  title: string;
  data: string;
  patternType?: 'singleton' | 'factory' | 'abstract-factory' | 'builder' | 'prototype';
  className?: string;
}

const CreationalPatternView: React.FC<CreationalProps> = ({
  title,
  data,
  patternType = 'singleton',
  className = ''
}) => {
  // Icon mapping could be added here if needed

  // Color variants for different pattern types
  const patternVariants: Record<string, string> = {
    'singleton': 'border-blue-500 bg-blue-50',
    'factory': 'border-green-500 bg-green-50',
    'abstract-factory': 'border-purple-500 bg-purple-50',
    'builder': 'border-orange-500 bg-orange-50',
    'prototype': 'border-yellow-500 bg-yellow-50',
  };

  return (
    <Alert 
      className={`border-l-4 ${patternVariants[patternType]} ${className} transition-shadow hover:shadow-md`}
    >
      <AlertTitle className="text-lg font-semibold mb-1">
        {title}
      </AlertTitle>
      <AlertDescription className="text-gray-700">
        {data}
      </AlertDescription>
    </Alert>
  );
};

export default CreationalPatternView;
