import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

const Projects = () => {
  return (
    <section id="projects" className="w-full flex flex-col items-start pt-22.5 lg:pt-30 pb-10 scroll-mt-18 sm:scroll-mt-24">
      {/* Section Heading */}
      <h2 className="text-[34px] xs:text-[38px] sm:text-[64px] lg:text-[84px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        RECENT <br />
        <span className="text-ghost">PROJECTS</span>
      </h2>

      {/* Project Rows List */}
      <div className="w-full flex flex-col gap-3 mt-10 sm:mt-14">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="link-row flex items-start justify-between rounded-2xl p-4 sm:p-5 relative group cursor-pointer"
          >
            {/* Left Image + Text */}
            <div className="flex items-start gap-3 sm:gap-5 flex-1 min-w-0 pr-2 sm:pr-4">
              {/* Covers render at their native aspect with no zoom, so what the tile
                  shows is exactly the cover art. Note the source art is a
                  composed mockup on a 1080x1350 backdrop, so the window sits
                  inside generous padding rather than filling the tile. */}
              <div className="w-21 sm:w-32.5 h-23 sm:h-33.75 rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/10 mt-0.5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-0 max-w-105">
                {project.badge && (
                  <span
                    className={`w-fit max-w-full inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.10em] rounded-full border px-2.5 py-0.5 font-display whitespace-nowrap ${
                      project.badge.startsWith('Personal')
                        ? 'border-lime/30 bg-lime/10 text-lime'
                        : 'border-white/12 bg-white/5 text-dim'
                    }`}
                  >
                    {project.badge}
                  </span>
                )}
                <h3 className="text-[20px] sm:text-[23px] font-semibold text-white leading-[115%] tracking-[-0.01em] font-display group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-muted leading-[135%] font-display">
                  {project.description}
                </p>
                {/* Tags row with smooth right gradient mask indicator on mobile */}
                <div className="relative w-full overflow-hidden mt-1.5">
                  <div className="flex flex-nowrap gap-1 w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden pr-6 [mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">
                    {project.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="shrink-0 text-[11px] font-medium text-white/90 bg-white/7 border border-white/12 rounded-md px-1.5 py-0.5 font-display"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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
