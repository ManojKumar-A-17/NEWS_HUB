import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ 
  message = "Something went wrong while fetching news articles. Please try again.", 
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8 animate-fade-in">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-semibold mb-2">Error Loading News</AlertTitle>
        <AlertDescription className="space-y-4">
          <p>{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};
