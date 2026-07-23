import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const CARD_WIDTH = 382;
const CARD_GAP = 24;

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth > 1024 ? 3 : 1);
    };
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const testimonials = [
    {
      name: 'Ryan',
      role: 'Founder & CEO',
      country: '🇬🇧',
      category: 'SaaS Development',
      text: 'Asim has been a game-changer for my team. His technical expertise, problem-solving mindset, and ability to deliver polished, high-performing solutions consistently exceeded expectations. A true team player who cares about building the right product.',
    },
    {
      name: 'Laura',
      role: 'Founder & CEO',
      country: '🇺🇸',
      category: 'Product Development',
      text: 'Working with Asim was an excellent experience from start to finish. He went beyond the original scope, delivered under a tight timeline, and remained highly responsive throughout the entire project. The final result exceeded expectations.',
    },
    {
      name: 'Chey',
      role: 'Founder',
      country: '🇰🇭',
      category: 'Business Systems',
      text: 'An exceptionally helpful and talented engineer. His technical knowledge is extensive, and he consistently suggested the best path forward rather than simply following instructions. I would confidently recommend his services.',
    },
    {
      name: 'Munir',
      role: 'Business Owner',
      country: '🇵🇰',
      category: 'Workflow Automation',
      text: 'Amazing work from start to finish. Asim helped organize and streamline everything exactly the way we needed. Communication was excellent, problems were solved professionally, and every requirement was handled with care.',
    },
    {
      name: 'Adel',
      role: 'Fashion Designer',
      country: '🇺🇸',
      category: 'Custom Development',
      text: 'Outstanding professional. His communication, efficiency, and quality of work were exceptional. He understood requirements quickly, provided valuable advice, and delivered clean solutions without unnecessary complexity.',
    },
    {
      name: 'Bastian',
      role: 'Photographer',
      country: '🇨🇭',
      category: 'Software Engineering',
      text: 'It is difficult to find developers at this level. Asim consistently goes above and beyond to ensure project success. His communication, technical ability, and commitment to understanding requirements make him a standout professional.',
    },
    {
      name: 'Ardalan',
      role: 'Founder',
      country: '🇺🇸',
      category: 'Product Engineering',
      text: 'Asim is highly skilled at turning complex requirements into clean, functional solutions. Communication was seamless throughout the project, and the final product reflected both technical excellence and attention to detail.',
    },
    {
      name: 'Jackson',
      role: 'Real Estate Professional',
      country: '🇺🇸',
      category: 'Business Platform',
      text: 'Asim took the time to understand the vision behind the project and delivered a solution that aligned perfectly with our goals. Professional, collaborative, and focused on achieving the best outcome.',
    },
  ];
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="px-4 md:px-8 font-['Urbanist',sans-serif] antialiased">
      <section id="contact" className="w-full max-w-[1600px] mx-auto py-24 relative">
        {/* Header with strictly centered title and right-aligned navigation */}
        <div className="relative flex items-center justify-center mb-16 px-4">
          {/* Updated textClassName to #0a0a0a */}
          <AnimatedTitle
            title="What Clients Say"
            popupText="The best proof isn't what I say.
It's what clients say after the project ships."
            textClassName="text-[#0a0a0a]"
          />

          {/* Thin line arrows aligned to the right edge with #0a0a0a */}
          <div className="absolute right-4 flex gap-4">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center text-[#0a0a0a] hover:scale-110 transition-transform"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={32} strokeWidth={1} />
            </button>
            <button
              onClick={handleNext}
              className="flex items-center justify-center text-[#0a0a0a] hover:scale-110 transition-transform"
              aria-label="Next testimonial"
            >
              <ArrowRight size={32} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Slider Viewport */}
        <div className="relative overflow-hidden w-full px-4">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${activeIndex * (CARD_WIDTH + CARD_GAP)}px)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="w-full md:w-[382px] h-[450px] flex-shrink-0 bg-[#f8fafc] rounded-[32px] py-[60px] px-[30px] flex flex-col relative transition-all duration-300"
              >
                {/* Absolute Country Flag positioned at the top right */}
                <div className="absolute top-[35px] right-[30px] text-2xl" aria-hidden="true">
                  {t.country}
                </div>

                <div>
                  {/* Stars - Vivid green, no stroke */}
                  <div className="flex gap-1.5 text-[#10b981] mb-12">
                    {Array.from({ length: 5 }, (_, i) => i).map((star) => (
                      <Star key={star} size={18} fill="currentColor" stroke="none" />
                    ))}
                  </div>

                  {/* Name & Role */}
                  <div className="mb-6">
                    <h3 className="text-[41px] font-medium text-[#0a0a0a] tracking-tight leading-[1.1] mb-2 font-['Urbanist',sans-serif]">
                      {t.name}
                    </h3>
                    <p className="text-[14px] text-[#64748b] font-medium tracking-wide font-['Urbanist',sans-serif]">
                      {t.role}
                    </p>
                  </div>

                  {/* Review Text */}
                  <p className="text-[14px] font-medium text-[#0a0a0a] tracking-tight leading-[1.3] pr-2 font-['Urbanist',sans-serif]">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {testimonials.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => setActiveIndex(Math.min(dotIndex, maxIndex))}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                dotIndex === activeIndex ? 'bg-[#10b981]' : 'bg-[#e2e8f0] hover:bg-[#10b981]/50'
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
