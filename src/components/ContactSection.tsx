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
        <span className="text-ghost">YOUR NEXT SYSTEM</span>
      </h2>

      {/* Body Copy */}
      <p className="text-[16px] text-muted leading-[140%] font-normal font-display max-w-[560px]">
        Whether you are looking to architect a secure SaaS platform, integrate
        complex payment gateways, or automate operational workflows, I am ready
        to help.
      </p>

      {/* Contact Form */}
      <form
        onSubmit={handleContactSubmit}
        className="flex w-full flex-col gap-5 mt-10 sm:mt-14"
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[12px] font-medium text-[#888888] font-display">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Your Name"
              maxLength={NAME_MAX}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-surface-input text-white rounded-lg px-3 h-10 text-[14px] placeholder:text-[#999999] outline-none w-full focus:border focus:border-orange transition-colors"
            />
            <p
              className={`text-right text-[11px] font-display ${
                name.length >= NAME_MAX - 5 ? "text-orange" : "text-dim"
              }`}
            >
              {name.length}/{NAME_MAX}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label className="text-[12px] font-medium text-[#888888] font-display">
              Email
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
              className={`bg-surface-input text-white rounded-lg px-3 h-10 text-[14px] placeholder:text-[#999999] outline-none w-full focus:border transition-colors ${
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
          <label className="text-[12px] font-medium text-[#888888] font-display">
            What are you looking for?
          </label>
          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            className="bg-surface-input text-white rounded-[10px] px-3 h-10 text-[14px] outline-none w-full focus:border focus:border-orange transition-colors cursor-pointer"
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
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-muted font-display">
            Message
          </label>
          <textarea
            required
            placeholder="Message"
            maxLength={MESSAGE_MAX}
            value={projectInfo}
            onChange={(e) => setProjectInfo(e.target.value)}
            className="bg-surface-input text-white rounded-lg px-3 py-3 text-[14px] placeholder:text-[#999999] outline-none w-full min-h-[100px] focus:border focus:border-orange transition-colors resize-none"
          ></textarea>
          <p
            className={`text-right text-[11px] font-display ${
              projectInfo.length >= MESSAGE_MAX - 20
                ? "text-orange"
                : "text-dim"
            }`}
          >
            {projectInfo.length}/{MESSAGE_MAX}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 w-full rounded-lg bg-orange font-inter text-[14px] font-semibold text-white shadow-cta transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Send a Direct Message"}
        </button>

        <p className="text-[14px] text-muted font-display text-center">
          or{" "}
          <a
            href="/resume.pdf"
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
