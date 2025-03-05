import React from "react";
import { 
  Button 
} from "../ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PatternSectionProps {
  title: string;
  description: string;
  patternType: 'singleton' | 'factory' | 'abstract-factory' | 'builder' | 'prototype';
  children: React.ReactNode;
}

const PatternSection: React.FC<PatternSectionProps> = ({
  title,
  description,
  patternType,
  children
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Pattern type specific styling
  const headerColors = {
    'singleton': 'bg-blue-600 border-blue-500',
    'factory': 'bg-green-600 border-green-500',
    'abstract-factory': 'bg-purple-600 border-purple-500',
    'builder': 'bg-orange-600 border-orange-500',
    'prototype': 'bg-yellow-600 border-yellow-500',
  };

  const headerColor = headerColors[patternType];

  return (
    <Card className={`w-full mb-2 py-3 shadow-md ${headerColor}`}>
      <CardHeader 
        className={` text-white cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <Button variant="ghost" className="p-1 text-white hover:text-white/80 hover:bg-white/10">
            {isExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </Button>
        </div>
        <CardDescription className="text-white/80">
          {description}
        </CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <>
          <CardContent className="p-0 rounded-md mx-2 bg-white">
            {children}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default PatternSection;