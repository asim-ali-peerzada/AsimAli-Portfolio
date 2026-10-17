import React, { useState } from "react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import { withBase } from "@/lib/base";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [projectInfo, setProjectInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const NAME_MAX = 50;
  // Generous enough to paste a job description or a short spec without being
  // truncated mid-sentence; the counter warns before the hard cap.
  const MESSAGE_MAX = 1500;
  // The TLD is constrained to letters so the trailing group can't overlap the
// preceding `[^\s@]+`, which would make the match ambiguous and backtrack.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

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
      className="w-full flex flex-col items-start pt-22.5 lg:pt-30 pb-10 scroll-mt-18 sm:scroll-mt-24"
    >
      {/* Section Heading */}
      <h2 className="text-[34px] xs:text-[38px] sm:text-[64px] lg:text-[84px] font-bold text-white text-left leading-[100%] tracking-normal font-display">
        LET'S BUILD <br />
        <span className="text-white/20">YOUR NEXT SYSTEM</span>
      </h2>

      {/* Body Copy */}
      <p className="text-[15px] sm:text-[16px] text-muted leading-[145%] font-normal font-display max-w-140 mt-4 w-full">
        Whether you are hiring for a backend engineering role, architecting a
        multi-system SaaS platform, or automating complex operational workflows
        — let&apos;s connect.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleContactSubmit}
        className="flex w-full flex-col gap-5 mt-10 sm:mt-12"
      >
        <div className="flex flex-col sm:flex-row gap-5 min-w-0">
          <div className="flex flex-1 min-w-0 flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1"
            >
              <span>Name</span>
              <span className="text-orange">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Your Name"
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-surface-input text-white rounded-lg px-3.5 h-11 text-[14px] placeholder:text-[#999999] outline-none w-full border border-white/10 focus:border-orange/60 focus:ring-2 focus:ring-orange/20 transition-[border-color,box-shadow]"
            />
          </div>

          <div className="flex flex-1 min-w-0 flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1"
            >
              <span>Email</span>
              <span className="text-orange">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              className={`bg-surface-input text-white rounded-lg px-3.5 h-11 text-[14px] placeholder:text-[#999999] outline-none w-full transition-[border-color,box-shadow] ${
                emailError
                  ? "border-[#FF2600] focus:border-[#FF2600] focus:ring-[#FF2600]/20"
                  : "border-white/10 focus:border-orange/60 focus:ring-orange/20"
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
              <label
                htmlFor="contact-looking-for"
                className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1.5"
              >
                <span>What are you looking for?</span>
                <span className="text-dim text-[11px] font-normal">(optional)</span>
              </label>
              <div className="relative w-full">
                <select
                  id="contact-looking-for"
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="appearance-none bg-surface-input text-white rounded-lg px-3.5 pr-10 h-11 text-[14px] outline-none w-full border border-white/10 focus:border-orange/60 focus:ring-2 focus:ring-orange/20 transition-[border-color,box-shadow] cursor-pointer"
                >
                  <option value="" disabled className="bg-canvas text-[#999999]">
                    Select…
                  </option>
                  <option value="Full-Time / Contract Role" className="bg-canvas text-white">
                    Full-Time / Contract Role
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
                <label
                  htmlFor="contact-message"
                  className="text-[12px] font-medium text-[#888888] font-display flex items-center gap-1"
                >
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
                id="contact-message"
                required
                placeholder="Tell me about the role, system architecture, or project requirements..."
                maxLength={MESSAGE_MAX}
                value={projectInfo}
                onChange={(e) => setProjectInfo(e.target.value)}
                className="bg-surface-input text-white rounded-lg px-3.5 py-3 text-[14px] placeholder:text-[#999999] outline-none w-full min-h-27.5 border border-white/10 focus:border-orange/60 focus:ring-2 focus:ring-orange/20 transition-[border-color,box-shadow] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl bg-cta font-inter text-[14px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.26),0_10px_28px_-14px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.22)] transition-transform active:scale-[0.99] cursor-pointer disabled:opacity-50 mt-1 inline-flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  Send a Direct Message
                  <Send size={15} strokeWidth={2.2} aria-hidden="true" />
                </>
              )}
            </button>

            <p className="text-[14px] text-muted font-display text-center">
              or{" "}
              <a
                href={withBase('/Asim_Ali_Resume.pdf')}
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
