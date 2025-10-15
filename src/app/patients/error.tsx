'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 bg-destructive/10 border border-destructive/50 rounded-lg">
      <AlertCircle className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2 text-destructive">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {error.message || 'An unexpected error occurred while fetching patient data.'}
      </p>
      <Button
        onClick={
          // Attempt to recover by re-rendering the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
