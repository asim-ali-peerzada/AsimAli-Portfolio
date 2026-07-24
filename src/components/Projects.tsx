import { useEffect, useState } from 'react';
import { srcSet } from '@/lib/utils';
import AnimatedTitle from './ui/AnimatedTitle';

import {
  aiCustomerSupport,
  ccms,
  enterpriseSso,
  genealogy,
  shipmentTrackerIms,
  zametrix,
} from '@/data/projects';

const projectsData = [
  ccms,
  genealogy,
  aiCustomerSupport,
  zametrix,
  enterpriseSso,
  shipmentTrackerIms,
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setShowAll(localStorage.getItem('projects_show_all') === 'true');
    }
  }, []);

  const toggleShowAll = () => {
    const next = !showAll;
    setShowAll(next);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('projects_show_all', String(next));
    }
  };

  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

  return (
    <div className="px-4 md:px-8 py-24 md:py-32">
      <section id="projects" className="w-full max-w-[1600px] mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <AnimatedTitle
            title="Featured Work"
            popupText="Case Studies"
            textClassName="font-bold text-[#0a0a0a]"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 w-full">
          {displayedProjects.map((project, i) => (
            <div key={i} className="group relative flex flex-col">
              <a href={`/projects/${project.slug}`} className="block w-full">
                {/* Image panel */}
                <div className="aspect-[6/5] w-full bg-[#f8fafc] rounded-[32px] overflow-hidden relative mb-5 border border-[#e2e8f0]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={1920}
                    height={1280}
                    srcSet={srcSet(project.image, ['800w', '1600w'])}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* Details panel */}
                <div className="px-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl md:text-[32px] font-medium tracking-tight text-[#0a0a0a] font-['Urbanist',sans-serif] leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 items-center flex-shrink-0 flex-wrap justify-end">
                      {project.tags.map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-4 py-1.5 rounded-full bg-[#f1f5f9] text-[#0a0a0a] text-[13px] font-medium font-['Urbanist',sans-serif] tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[14px] md:text-[15px] text-[#64748b] font-normal tracking-wide mt-2 font-['Urbanist',sans-serif] leading-relaxed">
                    {project.niche}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Show More / Show Less */}
        {projectsData.length > 4 && (
          <div className="flex justify-center mt-16">
            <button
              onClick={toggleShowAll}
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#059669] text-white font-bold text-base hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {showAll ? 'Show Less' : 'Show More Work'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
