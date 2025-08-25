import React from 'react';
import { Download, Eye, FileText, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface GeneratedDocuments {
  resume_pdf: string;
  cover_pdf: string;
  text_resume: string;
  text_cover: string;
}

interface ResultsPreviewProps {
  documents: GeneratedDocuments | null;
  onDownload: (type: 'resume' | 'cover-letter' | 'both') => void;
}

export const ResultsPreview: React.FC<ResultsPreviewProps> = ({ documents, onDownload }) => {
  if (!documents) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="text-center py-8 bg-gradient-to-r from-accent-light/20 to-primary-light/20 rounded-xl border border-accent/20"
      >
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Documents Generated Successfully!
        </h2>
        <p className="text-muted-foreground">
          Your tailored resume and cover letter are ready for download
        </p>
      </motion.div>
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center">
        <Button onClick={() => onDownload('resume')} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Resume
        </Button>
        <Button onClick={() => onDownload('cover-letter')} variant="outline" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Download Cover Letter
        </Button>
        <Button onClick={() => onDownload('both')} variant="hero" className="flex items-center gap-2 px-6">
          <Download className="w-4 h-4" />
          Download Both
        </Button>
      </motion.div>


      <motion.div variants={itemVariants}>
        <Card className="shadow-large">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Document Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="resume" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="resume" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Resume
                </TabsTrigger>
                <TabsTrigger value="cover-letter" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Cover Letter
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resume" className="space-y-4">
                <div className="h-96 overflow-y-auto border border-border rounded-lg p-6 bg-card">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                    {documents.text_resume}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="cover-letter" className="space-y-4">
                <div className="h-96 overflow-y-auto border border-border rounded-lg p-6 bg-card">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                    {documents.text_cover}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Want to generate documents for another position?
        </p>
        <Button variant="ghost" className="text-primary hover:text-primary-hover" onClick={() => window.location.reload()}>
          Start New Generation
        </Button>
      </motion.div>
    </motion.div>
  );
};
