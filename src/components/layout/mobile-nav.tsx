'use client';

import { useState } from 'react';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Stethoscope } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Stethoscope className="h-8 w-8 text-primary mr-2" />
          <span className="font-bold text-lg">Jarurat Care</span>
        </Link>
        <div className="flex flex-col gap-4 mt-8">
          <MobileLink href="/" onOpenChange={setOpen}>
            Home
          </MobileLink>
          <MobileLink href="/patients" onOpenChange={setOpen}>
            Patients
          </MobileLink>
          <MobileLink href="/about" onOpenChange={setOpen}>
            About
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(
        'text-muted-foreground transition-colors hover:text-primary',
        pathname === href && 'text-primary',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
