
import { useState, useEffect, useRef } from "react";

const ExperienceHighlights = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      number: "01",
      companyName: "Company A",
      role: "Software Engineer",
      description: [
        "Prioritized understanding user pain points with a problem-solving mindset.",
        "Made informed design decisions to create intuitive solutions.",
        "Ensured solutions met both user needs and business goals."
      ]
    },
    {
      number: "02",
      companyName: "Company B",
      role: "UX Designer",
      description: [
        "Adapted Lean UX methods for quick decision-making under tight deadlines.",
        "Leveraged informed assumptions due to well-defined target audiences.",
        "Maintained a strategic understanding of the full UX research process."
      ]
    },
    {
      number: "03",
      companyName: "Company C",
      role: "Product Manager",
      description: [
        "Designed user journeys and flows, and developed wireframes, prototypes, and design systems.",
        "Collaborated closely with product owners, cross-functional teams, and senior leadership.",
        "Shaped the product vision for websites and apps."
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = sectionRef.current?.querySelectorAll('.experience-item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 px-6 lg:px-12 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(255,255,255,0.02) 50px,
            rgba(255,255,255,0.02) 52px
          )`
        }}></div>
      </div>

      <div className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Title */}
          <div className="lg:sticky flex items-center gap-12 lg:top-32">
            <div>
          <span className="text-base font-mono tracking-wider text-gray-400">02</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block hover:scale-105 transition-transform duration-500 cursor-default">EXPERIENCE</span>
              <span className="block hover:scale-105 transition-transform duration-500 cursor-default">HIGHLIGHTS</span>
            </h2>
          </div>

          {/* Right Column - Experience Items */}
          <div className="space-y-16 lg:space-y-20">
            {experiences.map((experience, index) => (
              <div
                key={index}
                data-index={index}
                className={`experience-item transition-all duration-1000 cursor-pointer group ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-start gap-6 p-6 rounded-lg transition-all duration-300 hover:bg-white/5">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className={`text-sm font-mono tracking-wider transition-colors duration-300 ${
                      hoveredItem === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {experience.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">

                      <h3 className={`text-xl md:text-2xl font-bold tracking-wide font-mono transition-colors duration-300 ${
                        hoveredItem === index ? 'text-white' : 'text-white'
                      }`}>
                        {experience.companyName}
                      </h3>
                    </div>

                    <div className={`leading-relaxed text-lg transition-colors duration-300 ${
                      hoveredItem === index ? 'text-gray-200' : 'text-gray-300'
                    }`}>
                      <p className="text-base font-mono text-gray-200 mb-3">{experience.role}</p>
                      <div className="space-y-2">
                        {experience.description.map((item, descIndex) => (
                          <p key={descIndex} className="leading-relaxed text-lg transition-colors duration-300">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < experiences.length - 1 && (
                  <div className="mt-16 lg:mt-20">
                    <div className={`w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-300 ${
                      hoveredItem === index ? 'via-white/40' : 'via-white/20'
                    }`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceHighlights;
