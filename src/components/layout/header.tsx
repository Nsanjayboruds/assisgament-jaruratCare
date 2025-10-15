import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          <span className="font-bold text-lg">Jarurat Care</span>
        </Link>
        <MainNav className="hidden md:flex" />
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
