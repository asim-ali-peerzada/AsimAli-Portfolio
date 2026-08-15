import Navbar from './Navbar';
import Footer from './Footer';
import ProjectDetailContent from './ProjectDetailContent';
import { Toaster } from 'react-hot-toast';
import type { Project } from '@/data/projects';

interface ProjectDetailRootProps {
  project: Project;
}

export default function ProjectDetailRoot({ project }: ProjectDetailRootProps) {
  return (
    <>
      <Navbar />
      <ProjectDetailContent project={project} />
      <Footer />
      <Toaster />
    </>
  );
}
