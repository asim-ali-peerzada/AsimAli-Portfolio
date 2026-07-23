const BackendArchitecture = () => {
  return (
    <section className="w-full max-w-[1600px] px-4 md:px-8 mx-auto py-24 md:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-[42px] font-medium tracking-tight text-[#0a0a0a] font-['Urbanist',sans-serif] leading-tight mb-4">
          How I Build Systems
        </h2>
        <p className="text-[16px] text-[#64748b] font-normal tracking-wide max-w-2xl mx-auto">
          Engineering principles that separate production systems from prototypes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {[
          {
            title: 'API First',
            description: 'REST APIs designed for long-term maintainability.',
          },
          {
            title: 'Scalable Architecture',
            description: 'Queues, caching, events, background jobs.',
          },
          {
            title: 'Database Performance',
            description: 'Indexing, eager loading, query optimization.',
          },
          {
            title: 'Reliability',
            description: 'Monitoring, validation, error handling.',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="w-full max-w-[344px] h-[200px] py-[40px] px-[30px] border border-[#e2e8f0] bg-white rounded-[32px] flex flex-col justify-center font-['Urbanist',sans-serif] antialiased hover:border-[#10b981] transition-colors"
          >
            <h3 className="text-[22px] font-medium tracking-tight text-[#0a0a0a] font-['Urbanist',sans-serif] mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="text-[14px] text-[#64748b] font-normal tracking-wide font-['Urbanist',sans-serif] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BackendArchitecture;
