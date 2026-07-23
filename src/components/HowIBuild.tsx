const HowIBuild = () => {
  return (
    <section className="w-full max-w-[1480px] mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 border-t border-b border-gray-100 my-16 font-['Urbanist',sans-serif] antialiased">
      {/* Left Column: The Narrative (40%) */}
      <div className="w-full md:w-2/5">
        <h3 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-3 tracking-tight">
          How I Build: Architecture First.
        </h3>
        <p className="text-base text-[#64748b] leading-relaxed font-normal">
          Every project starts with understanding the business workflow, identifying bottlenecks, and designing software that scales long after version one ships.
        </p>
      </div>

      {/* Right Column: The Pipeline (60%) */}
      <div className="w-full md:w-3/5 flex flex-wrap md:flex-nowrap items-center justify-start md:justify-between gap-4 md:gap-6 text-base font-semibold text-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <span>Design</span>
          <span className="text-[#10b981] font-light text-xl">&rarr;</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Build API</span>
          <span className="text-[#10b981] font-light text-xl">&rarr;</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Automate</span>
          <span className="text-[#10b981] font-light text-xl">&rarr;</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Measure</span>
          <span className="text-[#10b981] font-light text-xl">&rarr;</span>
        </div>

        <div className="flex items-center">
          <span>Iterate</span>
        </div>
      </div>
    </section>
  );
};

export default HowIBuild;
