import React from 'react';
import { Sparkles, Loader, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  isComplete: boolean;
  disabled: boolean;
  resumeSource: 'pdf' | null; 
  hasJobDescription: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onGenerate,
  isGenerating,
  isComplete,
  disabled,
  resumeSource,
  hasJobDescription,
}) => {
  const getButtonText = () => {
    if (isComplete) return 'Generated Successfully!';
    if (isGenerating) return 'Generating Your Documents...';
    if (!resumeSource) return 'Upload Resume to Continue'; // ✅ cleaned text
    if (!hasJobDescription) return 'Add Job Description to Continue';
    return 'Generate Resume & Cover Letter';
  };

  const getButtonIcon = () => {
    if (isComplete) return <CheckCircle className="w-5 h-5" />;
    if (isGenerating) return <Loader className="w-5 h-5 animate-spin" />;
    return <Sparkles className="w-5 h-5" />;
  };

  const getButtonVariant = () => {
    if (isComplete) return 'success';
    if (disabled) return 'secondary';
    return 'hero';
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className="w-full max-w-md"
      >
        <Button
          onClick={onGenerate}
          disabled={disabled || isGenerating}
          variant={getButtonVariant()}
          size="lg"
          className={`
            w-full h-14 text-lg font-semibold transition-all duration-300
            ${!disabled && !isGenerating ? 'shadow-glow hover:shadow-large' : ''}
            ${isGenerating ? 'animate-pulse-glow' : ''}
            ${isComplete ? 'bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90' : ''}
          `}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${isGenerating}-${isComplete}-${disabled}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3"
            >
              {getButtonIcon()}
              {getButtonText()}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>

      <div className="flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            resumeSource ? 'bg-accent' : 'bg-muted'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            hasJobDescription ? 'bg-accent' : 'bg-muted'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isComplete ? 'bg-accent' : 'bg-muted'
          }`}
        />
      </div>

      <AnimatePresence>
        {!resumeSource && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground text-center"
          >
            Step 1: Upload your resume PDF 
          </motion.p>
        )}
        {resumeSource && !hasJobDescription && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground text-center"
          >
            Step 2: Paste the job description you're applying for
          </motion.p>
        )}
        {resumeSource && hasJobDescription && !isGenerating && !isComplete && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground text-center"
          >
            Ready to generate your tailored resume and cover letter!
          </motion.p>
        )}
        {isGenerating && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground text-center"
          >
            Analyzing job requirements and customizing your documents...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
