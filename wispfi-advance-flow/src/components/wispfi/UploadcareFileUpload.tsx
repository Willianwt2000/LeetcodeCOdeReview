import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface UploadcareFileUploadProps {
  onFileUploaded?: (fileUrl: string, fileInfo: any) => void;
  onFileRemoved?: () => void;
  className?: string;
  acceptedTypes?: string;
  multiple?: boolean;
  cropEnabled?: boolean;
}

// Global declarations
declare global {
  interface Window {
    uploadcare: any;
    UPLOADCARE_PUBLIC_KEY: string;
  }
}

export const UploadcareFileUpload = ({
  onFileUploaded,
  onFileRemoved,
  className = "",
  acceptedTypes = "application/pdf,image/*,.doc,.docx",
  multiple = false,
  cropEnabled = false,
}: UploadcareFileUploadProps) => {
  const { trackEvent } = useAnalytics();
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetRef = useRef<any>(null);
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.uploadcare) return;

    if (inputRef.current && !widgetRef.current) {
      try {
        const widget = window.uploadcare.Widget(inputRef.current);

        widget.onUploadComplete((info: any) => {
          setIsUploading(false);
          setUploadProgress(0);
          setUploadedFile({
            url: info.cdnUrl,
            name: info.name || "Uploaded file",
          });

          onFileUploaded?.(info.cdnUrl, info);

          trackEvent({
            action: "file_upload_complete",
            category: "engagement",
            label: "uploadcare_widget",
          });
        });

        widget.onUploadStart(() => {
          setIsUploading(true);
          setUploadProgress(0);

          trackEvent({
            action: "file_upload_start",
            category: "engagement",
            label: "uploadcare_widget",
          });
        });

        widget.onProgress((info: any) => {
          setUploadProgress(Math.round(info.progress * 100));
        });

        widgetRef.current = widget;
      } catch (err) {
        console.error("Uploadcare widget initialization failed:", err);
      }
    }

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.destroy();
          widgetRef.current = null;
        } catch (err) {
          console.warn("Error destroying Uploadcare widget:", err);
        }
      }
    };
  }, [onFileUploaded, trackEvent]);

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (widgetRef.current) {
      widgetRef.current.value(null);
    }
    onFileRemoved?.();

    trackEvent({
      action: "file_upload_remove",
      category: "engagement",
      label: "uploadcare_widget",
    });
  };

  const openUploader = () => {
    if (widgetRef.current) {
      widgetRef.current.openDialog();
    }
  };

  if (!window.uploadcare) {
    return (
      <Card className={`border-dashed border-2 border-muted-foreground/25 ${className}`}>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Loading file uploader...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`uploadcare-container ${className}`}>
      {/* Hidden Uploadcare input */}
      <input
        ref={inputRef}
        type="hidden"
        role="uploadcare-uploader"
        name="document"
        data-crop={cropEnabled ? "free" : "disabled"}
        data-images-only="false"
        data-multiple={multiple ? "true" : "false"}
        data-tabs="file camera url facebook gdrive gphotos dropbox instagram evernote flickr onedrive"
        data-clearable="true"
      />

      {!uploadedFile && !isUploading && (
        <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center" onClick={openUploader}>
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Upload Document</h3>
            <p className="text-sm text-muted-foreground mb-4">Click to browse or drag files here</p>
            <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX, and images</p>
          </CardContent>
        </Card>
      )}

      {isUploading && (
        <Card className="border-2 border-primary/50">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <h3 className="font-semibold mb-2">Uploading...</h3>
            <div className="w-full max-w-xs bg-muted rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
          </CardContent>
        </Card>
      )}

      {uploadedFile && (
        <Card className="border-2 border-green-500/50 bg-green-50/50">
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">File Uploaded</h3>
                <p className="text-sm text-green-600">{uploadedFile.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {uploadedFile && (
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={openUploader} className="flex-1">
            <Upload className="h-4 w-4 mr-2" />
            Upload Different File
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(uploadedFile.url, "_blank")}
            className="flex-1"
          >
            <File className="h-4 w-4 mr-2" />
            View File
          </Button>
        </div>
      )}
    </div>
  );
};
