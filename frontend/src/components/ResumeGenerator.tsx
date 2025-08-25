import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PdfUpload } from './PdfUpload';
import { JobDescriptionInput } from './JobDescriptionInput';
import { UserInfoInput } from './UserInfoInput';
import { GenerateButton } from './GenerateButton';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface ResumeData {
  source: 'pdf';
  text: string;
  fileName?: string;
}

interface GeneratedDocuments {
  resume_pdf: string;
  cover_pdf: string;
  text_resume: string;
  text_cover: string;
}

export const ResumeGenerator: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocuments | null>(null);
  const { toast } = useToast();

  const handlePdfTextExtracted = (text: string, fileName: string) => {
    setResumeData({
      source: 'pdf',
      text,
      fileName,
    });

    if (!fullName || !email || !phone) {
      extractBasicInfoFromText(text);
    }

    toast({
      title: 'PDF Processed',
      description: `Successfully uploaded pdf ${fileName}`,
    });
  };

  const extractBasicInfoFromText = (text: string) => {
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch && !email) setEmail(emailMatch[0]);

    const phoneMatch = text.match(/[\+]?[(]?[\d\s\-\(\)]{10,}/);
    if (phoneMatch && !phone) setPhone(phoneMatch[0].trim());

    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0 && !fullName) {
      const firstLine = lines[0].trim();
      const words = firstLine.split(' ');
      if (words.length >= 2 && words.every(word => /^[A-Za-z]+$/.test(word))) {
        setFullName(words.slice(0, 2).join(' '));
      }
    }
  };

  const handleGenerate = async () => {
    if (!resumeData || !jobDescription.trim() || !fullName.trim() || !email.trim() || !phone.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please upload a resume and fill out all fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const requestData = {
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        resume_text: resumeData.text,
        job_desc: jobDescription.trim(),
      };

      const API_URL = import.meta.env.VITE_BACKEND_URL;

const response = await axios.post(`${API_URL}/generate`, requestData);


      setGeneratedDocuments(response.data);

      toast({
        title: 'Documents Generated!',
        description: 'Your tailored resume and cover letter are ready.',
      });

      setTimeout(() => {
        document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (error) {
      console.error('Generation failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate documents. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (type: 'resume' | 'cover-letter' | 'both') => {
    if (!generatedDocuments) return;

    const downloadFile = async (url: string, filename: string) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error(`Failed to download ${filename}`, error);
      }
    };

    switch (type) {
      case 'resume':
        await downloadFile(generatedDocuments.resume_pdf, 'Tailored_Resume.pdf');
        break;
      case 'cover-letter':
        await downloadFile(generatedDocuments.cover_pdf, 'Tailored_Cover_Letter.pdf');
        break;
      case 'both':
        await downloadFile(generatedDocuments.resume_pdf, 'Tailored_Resume.pdf');
        setTimeout(async () => {
          await downloadFile(generatedDocuments.cover_pdf, 'Tailored_Cover_Letter.pdf');
        }, 700);
        break;
    }

    toast({
      title: 'Download Started',
      description:
        type === 'both'
          ? 'Both documents are being downloaded.'
          : type === 'resume'
          ? 'Resume downloaded successfully.'
          : 'Cover Letter downloaded successfully.',
    });
  };

  const handleResumeReset = () => {
    setResumeData(null);
    setGeneratedDocuments(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8"
    >

      <motion.div variants={itemVariants}>
        <Card className="shadow-large">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Step 1: Upload Your Resume (PDF)
            </h2>

            <PdfUpload onTextExtracted={handlePdfTextExtracted} onReset={handleResumeReset} />
          </CardContent>
        </Card>
      </motion.div>

      {/* User Information Section */}
      <motion.div variants={itemVariants}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Step 2: Enter Your Contact Information</h2>
          <p className="text-muted-foreground mt-2">Provide your details for the resume header</p>
        </div>

        <UserInfoInput
          fullName={fullName}
          email={email}
          phone={phone}
          onFullNameChange={setFullName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
        />
      </motion.div>


      <motion.div variants={itemVariants}>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Step 3: Paste the Job Description</h2>
          <p className="text-muted-foreground mt-2">Add the job posting details to tailor your documents</p>
        </div>

        <JobDescriptionInput onJobDescriptionChange={setJobDescription} jobDescription={jobDescription} />
      </motion.div>

      <motion.div variants={itemVariants} className="py-8">
        <GenerateButton
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          isComplete={!!generatedDocuments}
          disabled={!resumeData || !jobDescription.trim() || !fullName.trim() || !email.trim() || !phone.trim()}
          resumeSource={resumeData?.source || null}
          hasJobDescription={!!jobDescription.trim()}
        />
      </motion.div>

      {generatedDocuments && (
        <motion.div id="download-section" variants={itemVariants} className="text-center space-x-4 py-4">
          <button
            onClick={() => handleDownload('resume')}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Download Resume
          </button>
          <button
            onClick={() => handleDownload('cover-letter')}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Download Cover Letter
          </button>
          <button
            onClick={() => handleDownload('both')}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Download Both
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};
