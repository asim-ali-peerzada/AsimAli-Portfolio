import type { ReactNode } from 'react';
import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/toaster';
import { Toaster as Sonner } from './ui/sonner';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <TooltipProvider>
      {children}
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
