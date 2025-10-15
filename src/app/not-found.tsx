import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileWarning } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <FileWarning className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-6">
        Could not find the requested page.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
