const impacts = [
  {
    num: "01",
    title: "Enterprise Identity & Access",
    body: "Architected a unified SSO ecosystem using OAuth 2.0 and JWT, centralizing authentication and access control across enterprise applications with TOTP-based MFA.",
    tags: "OAuth 2.0 · JWT · SSO · TOTP · RBAC",
  },
  {
    num: "02",
    title: "Operational Data Automation",
    body: "Automated processing of thousands of monthly Excel records using distributed queues and background jobs, reducing manual data entry by 70%.",
    tags: "Queues · Jobs · Data Processing · Automation",
  },
  {
    num: "03",
    title: "Backend Performance Optimization",
    body: "Reduced API latency by 45% through query optimization, eager loading, N+1 remediation, and Redis caching across business-critical endpoints.",
    tags: "Laravel · Eloquent · Redis · Query Optimization",
  },
  {
    num: "04",
    title: "Network Provisioning Automation",
    body: "Engineered hardware-to-software mapping for Siena routers and Samsung VDUs, reducing manual configuration effort by 60% and removing repetitive provisioning work.",
    tags: "Workflow Automation · Data Mapping · Laravel · Business Logic",
  },
  {
    num: "05",
    title: "Stateful Logistics Processing",
    body: "Developed a Laravel logistics engine around a 7-stage state machine to automate receipt data extraction and provide end-to-end shipment traceability.",
    tags: "Laravel · State Machines · Data Extraction · Logistics",
  },
];

const EngineeringImpact = () => {
  return (
    <section
      id="impact"
      className="w-full flex flex-col items-start pt-[90px] lg:pt-[120px] pb-10"
    >
      {/* Section Heading */}
      <h2 className="text-[42px] sm:text-[74px] lg:text-[90px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        ENGINEERING <br />
        <span className="text-ghost">HIGHLIGHTS</span>
      </h2>

      {/* Impact Rows */}
      <div className="w-full flex flex-col gap-3 mt-10 sm:mt-14">
        {impacts.map((item) => (
          <div
            key={item.num}
            className="link-row flex flex-col gap-4 rounded-2xl p-5 sm:p-6 relative"
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-[15px] font-semibold text-orange font-mono leading-[120%]">
                {item.num}
              </span>
              <h3 className="text-[20px] sm:text-[24px] font-semibold text-white leading-[120%] font-display">
                {item.title}
              </h3>
            </div>

            <p className="text-[15px] text-muted leading-[140%] font-display max-w-[560px]">
              {item.body}
            </p>

            <p className="text-[13px] font-medium font-mono text-orange leading-[140%]">
              {item.tags}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EngineeringImpact;
