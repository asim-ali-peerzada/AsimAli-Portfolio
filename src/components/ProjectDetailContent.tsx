import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect } from 'react';
import { projects, type Project } from '@/data/projects';
import BackToHome from './BackToHome';
import ProjectCaseStudy from './ProjectCaseStudy';
import ContactSection from './ContactSection';

interface ProjectDetailContentProps {
  readonly project: Project;
}

/**
 * Shell for a project detail page.
 *
 * The editorial case study lives in `ProjectCaseStudy`; this component owns the
 * surrounding chrome — back link, scroll restoration and prev/next navigation.
 */
export default function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  // The list is a fixed, non-empty set, so wrapping is safe here; the guard
  // keeps TypeScript honest about `.at()` returning `| undefined`.
  const lastProject = projects.at(-1)!;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : lastProject;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <main id="main-content" className="w-full bg-canvas min-h-screen flex flex-col items-center relative">
      <div className="w-full max-w-285 px-5 sm:px-8 pt-24 sm:pt-28 pb-20 flex flex-col">
        {/* Top row: back link. The "Case Study" label sits directly above the
            title inside the case study body, as in the reference. */}
        <div className="w-full">
          <BackToHome
            label="Back to projects"
            href="/#projects"
            onClick={(e) => {
              e.preventDefault();
              window.sessionStorage.setItem('nav_target', 'projects');
              window.location.href = '/#projects';
            }}
          />
        </div>

        {/* Case study body */}
        <div className="w-full mt-10">
          <ProjectCaseStudy project={project} />
        </div>

        {/* Prev / next */}
        <nav
          aria-label="Project navigation"
          className="w-full mt-20 pt-8 border-t border-white/10 grid grid-cols-2 gap-4"
        >
          <a
            href={`/projects/${prevProject.slug}`}
            className="group flex flex-col gap-1.5 min-w-0"
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest text-dim font-display">
              Previous
            </span>
            <span className="flex items-center gap-1.5 text-[14px] font-medium text-muted group-hover:text-white transition-colors font-display">
              <ArrowLeft size={14} strokeWidth={2} className="shrink-0" />
              <span className="truncate">{prevProject.title}</span>
            </span>
          </a>

          <a
            href={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1.5 min-w-0 text-right"
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest text-dim font-display">
              Next
            </span>
            <span className="flex items-center gap-1.5 text-[14px] font-medium text-muted group-hover:text-white transition-colors font-display">
              <span className="truncate">{nextProject.title}</span>
              <ArrowUpRight size={14} strokeWidth={2} className="shrink-0" />
            </span>
          </a>
        </nav>
      {/* Contact stays inside the same reading-width column as the case study.
            On the home page this content sits beside the portrait card; here
            there is no second column, so an unconstrained section would stretch
            to the full viewport and stop lining up with everything above it. */}
        <div className="w-full">
          <ContactSection />
        </div>
      </div>
    </main>
  );
}