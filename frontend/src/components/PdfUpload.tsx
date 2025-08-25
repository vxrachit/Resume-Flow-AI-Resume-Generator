import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfUploadProps {
  onTextExtracted: (text: string, fileName: string) => void;
  onReset: () => void;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({ onTextExtracted, onReset }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Extract text from PDF file
  const extractPdfText = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);

    try {
      const pdfData = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(" ");
        extractedText += pageText + "\n";
      }

      onTextExtracted(extractedText.trim(), file.name);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error extracting PDF:", error);
      alert("Failed to extract PDF text. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) extractPdfText(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      extractPdfText(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };


  const handleReset = () => {
    setFileName(null);
    onReset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl p-6 cursor-pointer transition ${
        isDragOver ? "border-accent bg-accent/10" : "border-border"
      }`}
    >
      {!fileName ? (
        <>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="w-full max-w-sm"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Extracting PDF...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {isDragOver ? "Drop PDF here" : "Upload or Drag & Drop PDF"}
              </>
            )}
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            ✅ Selected File: <strong>{fileName}</strong>
          </p>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleReset}
            disabled={isProcessing}
          >
            Remove PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
