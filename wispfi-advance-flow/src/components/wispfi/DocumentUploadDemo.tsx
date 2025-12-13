import { useState } from 'react';
import { UploadcareFileUpload } from './UploadcareFileUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const DocumentUploadDemo = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{url: string, name: string}>>([]);
  const { toast } = useToast();

  const handleFileUploaded = (fileUrl: string, fileInfo: any) => {
    const newFile = {
      url: fileUrl,
      name: fileInfo.name || 'Uploaded document'
    };
    
    setUploadedFiles(prev => [...prev, newFile]);
    
    toast({
      title: "File uploaded successfully!",
      description: `${newFile.name} is ready to be submitted.`,
    });

    // Here you would typically send the file URL to HubSpot or your backend
    console.log('File uploaded to Uploadcare:', fileUrl);
  };

  const handleFileRemoved = () => {
    toast({
      title: "File removed",
      description: "The uploaded file has been removed.",
    });
  };

  const handleSubmitFiles = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files to submit",
        description: "Please upload at least one document first.",
        variant: "destructive"
      });
      return;
    }

    // Here you would send the file URLs to HubSpot or your backend
    console.log('Submitting files to HubSpot:', uploadedFiles);
    
    toast({
      title: "Documents submitted!",
      description: `${uploadedFiles.length} document(s) sent for review.`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
          <CardDescription>
            Upload your business documents for funding review. Accepted formats: PDF, DOC, DOCX, and images.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <UploadcareFileUpload
            onFileUploaded={handleFileUploaded}
            onFileRemoved={handleFileRemoved}
            acceptedTypes="application/pdf,.doc,.docx,image/*"
            multiple={false}
          />
          
          {uploadedFiles.length > 0 && (
            <div className="pt-4">
              <h3 className="font-semibold mb-2">Uploaded Documents:</h3>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      View
                    </Button>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={handleSubmitFiles} 
                className="w-full mt-4"
                size="lg"
              >
                Submit Documents for Review
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};