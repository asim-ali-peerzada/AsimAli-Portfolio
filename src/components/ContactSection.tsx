import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [projectInfo, setProjectInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const NAME_MAX = 50;
  const MESSAGE_MAX = 300;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleContactSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (name.length > NAME_MAX) {
      toast.error(`Name must be ${NAME_MAX} characters or fewer.`);
      return;
    }
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      toast.error("Please enter your email address.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(
        "Please enter a valid email address (e.g. name@example.com).",
      );
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!projectInfo.trim()) {
      toast.error("Please add a message.");
      return;
    }
    if (projectInfo.length > MESSAGE_MAX) {
      toast.error(`Message must be ${MESSAGE_MAX} characters or fewer.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mbdvaajj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          lookingFor,
          message: projectInfo,
        }),
      });

      if (response.ok) {
        toast.success(
          "Let's talk! Message received. I'll get back to you shortly.",
        );
        setName("");
        setEmail("");
        setLookingFor("");
        setProjectInfo("");
        setEmailError(null);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Could not connect to submission server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form-section"
      className="w-full flex flex-col items-start pt-[90px] lg:pt-[120px] pb-10"
    >
      {/* Section Heading */}
      <h2 className="text-[42px] sm:text-[74px] lg:text-[90px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        LET'S BUILD <br />
        <span className="text-white/20">YOUR NEXT SYSTEM</span>
      </h2>

      {/* Body Copy */}
      <p className="text-[16px] text-muted leading-[145%] font-normal font-display max-w-[560px] mt-4">
        Whether you are looking to architect a secure SaaS platform, integrate
        complex payment gateways, or automate operational workflows, I am ready
        to help.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleContactSubmit}
        className="flex w-full flex-col gap-5 mt-10 sm:mt-12"
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1">
              <span>Name</span>
              <span className="text-orange">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Your Name"
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-surface-input text-white rounded-lg px-3.5 h-11 text-[14px] placeholder:text-[#999999] outline-none w-full focus:border focus:border-orange transition-colors"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1">
              <span>Email</span>
              <span className="text-orange">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              className={`bg-surface-input text-white rounded-lg px-3.5 h-11 text-[14px] placeholder:text-[#999999] outline-none w-full focus:border transition-colors ${
                emailError
                  ? "focus:border-[#FF2600] border border-[#FF2600]"
                  : "focus:border-orange"
              }`}
            />
            {emailError && (
              <p className="text-[12px] text-[#FF2600] font-display">
                {emailError}
              </p>
            )}
          </div>
        </div>

            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1.5">
                <span>What are you looking for?</span>
                <span className="text-dim text-[11px] font-normal">(optional)</span>
              </label>
              <div className="relative w-full">
                <select
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="appearance-none bg-surface-input text-white rounded-lg px-3.5 pr-10 h-11 text-[14px] outline-none w-full focus:border focus:border-orange transition-colors cursor-pointer"
                >
                  <option value="" disabled className="bg-canvas text-[#999999]">
                    Select…
                  </option>
                  <option value="New System" className="bg-canvas text-white">
                    New System
                  </option>
                  <option value="Existing System" className="bg-canvas text-white">
                    Existing System
                  </option>
                  <option
                    value="Backend Development"
                    className="bg-canvas text-white"
                  >
                    Backend Development
                  </option>
                  <option value="Automation" className="bg-canvas text-white">
                    Automation
                  </option>
                  <option value="API / Integration" className="bg-canvas text-white">
                    API / Integration
                  </option>
                  <option value="Not sure yet" className="bg-canvas text-white">
                    Not sure yet
                  </option>
                </select>
                {/* Custom SVG Chevron */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1">
                  <span>Message</span>
                  <span className="text-orange">*</span>
                </label>
                <span
                  className={`text-[11px] font-display ${
                    projectInfo.length >= MESSAGE_MAX - 20
                      ? "text-orange"
                      : "text-dim"
                  }`}
                >
                  {projectInfo.length}/{MESSAGE_MAX}
                </span>
              </div>
              <textarea
                required
                placeholder="Tell me about your project, timeline, and requirements..."
                maxLength={MESSAGE_MAX}
                value={projectInfo}
                onChange={(e) => setProjectInfo(e.target.value)}
                className="bg-surface-input text-white rounded-lg px-3.5 py-3 text-[14px] placeholder:text-[#999999] outline-none w-full min-h-[110px] focus:border focus:border-orange transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-lg bg-orange font-inter text-[14px] font-semibold text-white shadow-cta transition-transform active:scale-95 cursor-pointer disabled:opacity-50 mt-1"
            >
              {isSubmitting ? "Submitting..." : "Send a Direct Message"}
            </button>

            <p className="text-[14px] text-muted font-display text-center">
              or{" "}
              <a
                href="/Asim_Ali_Resume.pdf"
                download
                className="text-orange hover:underline"
              >
                download my technical resume →
              </a>
            </p>
          </form>
        </section>
  );
};

export default ContactSection;
