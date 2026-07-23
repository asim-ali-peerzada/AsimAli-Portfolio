import portfolioHd from '@/assets/images/my-headshot/mine.png';
import { ArrowRight, Mail } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import toast from 'react-hot-toast';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [greeting, setGreeting] = useState('Good morning, early bird!');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectInfo, setProjectInfo] = useState('');

  useEffect(() => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) {
      setGreeting('Morning! Perfect timing for a chat');
    } else if (hr >= 12 && hr < 17) {
      setGreeting('Afternoon! Perfect timing for a chat');
    } else if (hr >= 17 && hr < 22) {
      setGreeting('Evening! Perfect timing for a chat');
    } else {
      setGreeting('Working late? Perfect timing for a chat');
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !projectInfo) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/mbdvaajj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: projectInfo,
        }),
      });

      if (response.ok) {
        toast.success("Let's talk! Message received. I'll get back to you shortly.");
        setName('');
        setEmail('');
        setProjectInfo('');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Could not connect to submission server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="px-4 md:px-8 py-24 md:py-32 space-y-8">
      {/* CONTACT FORM */}
      <section
        id="contact-form-section"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-[1600px] mx-auto pt-16 md:pt-[120px] pb-12 md:pb-[90px] px-5"
      >
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-12">
          <div className="space-y-6">
            <h2 className="text-[32px] sm:text-[42px] md:text-[56px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif] leading-[1.1] tracking-tighter">
              {greeting}
            </h2>

            <div className="space-y-1">
              <p className="text-[18px] text-[#64748b] font-medium font-['Urbanist',sans-serif]">
                Expected response time: 1–2 hours
              </p>
              <p className="text-[18px] text-[#64748b] font-medium font-['Urbanist',sans-serif]">
                Unless production has other plans.
              </p>
            </div>
          </div>

          <div className="space-y-4 max-w-2xl">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=asimalipeerzada@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 md:p-6 rounded-[20px] md:rounded-[32px] bg-[#f8fafc]"
            >
              <div className="flex items-center gap-3 md:gap-5">
                <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] rounded-[16px] md:rounded-[20px] bg-[#10b981] flex items-center justify-center text-white shadow-sm shrink-0">
                  <Mail size={20} className="md:w-[24px] md:h-[24px]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[18px] md:text-[24px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif]">
                    Email
                  </h4>
                  <p className="text-[13px] md:text-[16px] text-[#64748b] font-['Urbanist',sans-serif]">
                    Project ideas welcome. Spreadsheet horror stories too.
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="md:w-[20px] md:h-[20px] text-[#0a0a0a] shrink-0" />
            </a>

            <a
              href="https://linkedin.com/in/the-asimali"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 md:p-6 rounded-[20px] md:rounded-[32px] bg-[#f8fafc]"
            >
              <div className="flex items-center gap-3 md:gap-5">
                <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] rounded-[16px] md:rounded-[20px] bg-[#10b981] flex items-center justify-center text-white shadow-sm shrink-0">
                  <FaLinkedin size={20} className="md:w-[24px] md:h-[24px]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[18px] md:text-[24px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif]">
                    LinkedIn
                  </h4>
                  <p className="text-[13px] md:text-[16px] text-[#64748b] font-['Urbanist',sans-serif]">
                    Slightly more professional than my commit messages.
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="md:w-[20px] md:h-[20px] text-[#0a0a0a] shrink-0" />
            </a>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-6 bg-[#f8fafc] rounded-[24px] md:rounded-[40px] p-6 md:p-12 shadow-sm">
          <h3 className="text-[20px] md:text-[24px] font-medium text-[#0a0a0a] mb-8 md:mb-10 font-['Urbanist',sans-serif] leading-tight">
            Let's Talk. Every great system starts with a conversation.
          </h3>

          <form onSubmit={handleContactSubmit} className="space-y-8">
            <div className="space-y-3">
              <label
                className="text-[18px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif]"
                htmlFor="contact-name"
              >
                Your Name
              </label>

              <input
                id="contact-name"
                type="text"
                placeholder='What should I call you? (Besides "future favorite client")'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-6 py-4 rounded-[20px] bg-[#f1f5f9] border-none text-[16px] text-[#0a0a0a] placeholder-[#64748b] focus:ring-1 focus:ring-[#10b981] transition-all"
              />
            </div>

            <div className="space-y-3">
              <label
                className="text-[18px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif]"
                htmlFor="contact-email"
              >
                Email Address
              </label>

              <input
                id="contact-email"
                type="email"
                placeholder="Where should I reply?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-[20px] bg-[#f1f5f9] border-none text-[16px] text-[#0a0a0a] placeholder-[#64748b] focus:ring-1 focus:ring-[#10b981] transition-all"
              />
            </div>

            <div className="space-y-3">
              <label
                className="text-[18px] font-medium text-[#0a0a0a] font-['Urbanist',sans-serif]"
                htmlFor="contact-project"
              >
                Tell me about your project
              </label>

              <textarea
                id="contact-project"
                rows={5}
                placeholder="What's slowing your team down today?"
                value={projectInfo}
                onChange={(e) => setProjectInfo(e.target.value)}
                className="w-full px-6 py-4 rounded-[24px] bg-[#f1f5f9] border-none text-[16px] text-[#0a0a0a] placeholder-[#64748b] focus:ring-1 focus:ring-[#10b981] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 rounded-full bg-[#10b981] text-white font-bold text-[18px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Start the Conversation'}
            </button>
          </form>
        </div>
      </section>

      {/* FINAL FOOTER */}
      <section className="w-full mx-auto bg-[#0a0a0a] rounded-[40px] py-16 flex flex-col font-['Urbanist',sans-serif] antialiased relative overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-5 flex flex-col flex-1 justify-between h-full relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 w-full pt-10">
            {/* Left Column */}
            <div className="flex flex-col items-start max-w-[600px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#10b981]/40 bg-transparent text-[#10b981] text-[11px] font-medium mb-10 tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" /> Available
                for projects that deserve better software
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full overflow-hidden brightness-90 flex-shrink-0">
                  <img src={typeof portfolioHd === 'string' ? portfolioHd : (portfolioHd as any).src} alt="Asim Ali" loading="lazy" width={56} height={56} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-white text-[17px] tracking-tight leading-tight">
                    Asim Ali
                  </h3>
                  <div className="flex gap-3 text-white/70 pt-1.5">
                    <a
                      href="https://linkedin.com/in/the-asimali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={15} />
                    </a>
                    <a
                      href="mailto:asimalipeerzada@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={15} />
                    </a>
                    <a
                      href="https://wa.me/+923098715354"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      aria-label="WhatsApp"
                    >
                      <SiWhatsapp size={15} />
                    </a>
                  </div>
                </div>
              </div>

              <h2 className="text-[32px] md:text-[42px] font-medium tracking-tighter text-white leading-[1.1] max-w-[580px]">
                Engineered with obsessive attention to the details that matter.
              </h2>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[450px] flex flex-col items-start lg:mt-12 font-['Urbanist',sans-serif]">
              <h4 className="text-[28px] md:text-[32px] font-medium text-white tracking-tight mb-6">
                Let's Connect
              </h4>

              <div className="flex flex-col gap-4 w-full">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=asimalipeerzada@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b border-white/10 text-white/80 hover:text-white transition-colors text-[18px] group"
                >
                  <span>Email</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="https://linkedin.com/in/the-asimali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b border-white/10 text-white/80 hover:text-white transition-colors text-[18px] group"
                >
                  <span>LinkedIn</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="https://calendly.com/asimalipeerzada/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-4 border-b border-white/10 text-white/80 hover:text-white transition-colors text-[18px] group"
                >
                  <span>Book a Discovery Call</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-20 text-white/80 text-[12px] tracking-wide font-normal gap-4 pb-5">
            <p className="font-['Urbanist',sans-serif]">© {currentYear} Asim Ali</p>
            <p className="font-['Urbanist',sans-serif]">Hasilpur, PK (working globally)</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
