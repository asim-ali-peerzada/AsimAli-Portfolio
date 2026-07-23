import Navbar from './Navbar';
import Footer from './Footer';
import ProjectDetailContent from './ProjectDetailContent';
import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/toaster';
import { Toaster as Sonner } from './ui/sonner';

interface Project {
  slug: string;
  title: string;
  niche: string;
  image: string;
  screenshots: string[];
  services: string[];
  tools: string[];
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  role: string;
  tags: string[];
}

interface ProjectDetailRootProps {
  project: Project;
}

export default function ProjectDetailRoot({ project }: ProjectDetailRootProps) {
  return (
    <TooltipProvider>
      <Navbar />
      <ProjectDetailContent project={project} />
      <Footer />
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}
