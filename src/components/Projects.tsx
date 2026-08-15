import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

const Projects = () => {
  return (
    <section id="projects" className="w-full flex flex-col items-start pt-[90px] lg:pt-[120px] pb-10">
      {/* Section Heading */}
      <h2 className="text-[42px] sm:text-[74px] lg:text-[90px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        RECENT <br />
        <span className="text-ghost">PROJECTS</span>
      </h2>

      {/* Project Rows List */}
      <div className="w-full flex flex-col gap-3 mt-10 sm:mt-14">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={`/projects/${project.slug}`}
            className="link-row flex items-start justify-between rounded-2xl p-4 sm:p-5 relative group cursor-pointer"
          >
            {/* Left Image + Text */}
            <div className="flex items-start gap-5 flex-1 pr-4">
              <div className="w-[120px] sm:w-[130px] h-[125px] sm:h-[135px] rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/10 mt-0.5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1 max-w-[420px]">
                <h3 className="text-[20px] sm:text-[23px] font-semibold text-white leading-[115%] tracking-[-0.01em] font-display group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-muted leading-[135%] font-display">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {project.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-white/90 bg-white/7 border border-white/12 rounded-md px-2.5 py-0.5 font-display tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Orange Arrow (Top-right aligned with card content padding) */}
            <span className="text-[22px] text-orange shrink-0 pt-1 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight size={22} strokeWidth={2.5} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
