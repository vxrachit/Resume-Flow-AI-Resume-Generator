import React, { useState } from 'react';
import { FileText, Wand2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

interface JobDescriptionInputProps {
  onJobDescriptionChange: (description: string) => void;
  jobDescription: string;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({ 
  onJobDescriptionChange, 
  jobDescription 
}) => {
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onJobDescriptionChange(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const handleSampleJobDescription = () => {
    const sampleText = `We are looking for a Senior Full Stack Developer to join our dynamic engineering team. The ideal candidate will have 5+ years of experience in modern web development technologies.

Key Responsibilities:
• Develop and maintain scalable web applications using React and Node.js
• Collaborate with cross-functional teams to deliver high-quality software solutions
• Write clean, maintainable, and well-documented code
• Participate in code reviews and technical discussions
• Mentor junior developers and contribute to team knowledge sharing

Required Qualifications:
• Bachelor's degree in Computer Science or related field
• 5+ years of experience with JavaScript, React, and Node.js
• Strong understanding of RESTful APIs and database design
• Experience with cloud platforms (AWS, Azure, or GCP)
• Excellent problem-solving and communication skills

Preferred Qualifications:
• Experience with TypeScript and modern JavaScript frameworks
• Knowledge of containerization technologies (Docker, Kubernetes)
• Understanding of CI/CD pipelines and DevOps practices
• Experience with microservices architecture

We offer competitive salary, comprehensive benefits, remote work flexibility, and opportunities for professional growth in a collaborative environment.`;
    
    onJobDescriptionChange(sampleText);
    setWordCount(sampleText.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  return (
    <Card className="w-full shadow-medium hover:shadow-large transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Job Description
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSampleJobDescription}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <Wand2 className="w-4 h-4" />
            Use Sample
          </Button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Paste the job description here... Include key requirements, responsibilities, and qualifications to generate a perfectly tailored resume and cover letter."
              value={jobDescription}
              onChange={handleTextChange}
              className="min-h-[200px] resize-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              maxLength={5000}
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: jobDescription ? 1 : 0 }}
              className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded"
            >
              {wordCount} words
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>Maximum 5,000 characters</span>
              <span className={`${jobDescription.length > 4500 ? 'text-warning' : ''}`}>
                {jobDescription.length}/5000
              </span>
            </div>
            
            {jobDescription && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 text-accent"
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Ready to generate
              </motion.div>
            )}
          </div>

          {!jobDescription && (
            <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-2">No job description yet</p>
              <p className="text-xs text-muted-foreground">
                Paste a job posting to get started, or try our sample
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};