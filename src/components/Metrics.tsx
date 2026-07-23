const Metrics = () => {
  const metrics = [
    {
      value: 'Enterprise',
      label: 'Systems',
      subtext:
        'Architecting secure, centralized ecosystems for CRMs, telecom logistics, and workforce management featuring unified SSO and complex data handling.',
    },
    {
      value: 'Multi-Tenant',
      label: 'SaaS',
      subtext:
        'Building scalable subscription platforms with strict data isolation and advanced Role-Based Access Control (RBAC) across multiple organizational tiers.',
    },
    {
      value: 'Workflow',
      label: 'Automation',
      subtext:
        'Engineering automated data pipelines, background job processing, and event-driven architectures to streamline inter-departmental operations.',
    },
    {
      value: 'AI & Data',
      label: 'Processing',
      subtext:
        'Implementing OCR data extraction, intelligent record-matching algorithms, and automated support ticketing to reduce manual operational overhead.',
    },
  ];

  return (
    <section
      id="capabilities"
      className="w-full max-w-[1600px] px-4 md:px-8 mx-auto py-24 md:py-32"
    >
      <h2 className="sr-only">Core Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="w-full max-w-[344px] py-[40px] px-[30px] border border-gray-200 bg-white rounded-[32px] flex flex-col font-['Urbanist',sans-serif] antialiased"
          >
            <div>
              <div className="text-[51px] font-medium tracking-tighter text-[#0a0a0a] font-['Urbanist',sans-serif] leading-none mb-2">
                {m.value}
              </div>

              <h3 className="text-[26px] font-medium tracking-tight text-[#0a0a0a] font-['Urbanist',sans-serif] mb-1">
                {m.label}
              </h3>
            </div>

            <p className="text-[13px] text-[#64748b] font-normal tracking-wide mt-1 font-['Urbanist',sans-serif]">
              {m.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Metrics;
