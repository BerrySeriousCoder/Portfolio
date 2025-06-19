import { useState, useEffect, useRef } from "react";

const Portfolio = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const portfolioItems = [
    {
      id: 3,
      title: "Brilliantly Design Studio",
      image: "/sites/brilianttyx.png",
      url: "https://www.brilianttyx.solutions/",
      size: "medium",
      year: 2023,
      month: "Oct",
      githubUrl: "https://github.com/example/brilliantly-design",
      techStack: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 2,
      title: "Timeloom",
      image: "/sites/timeloom.png",
      url: "https://www.timeloom.xyz/",
      size: "small",
      year: 2024,
      month: "Jan",
      githubUrl: "https://github.com/BerrySeriousCoder/Timeloom", 
      techStack: ["React", "Supabase", "PostgreSQL" , "Google Api"]
    },
    {
      id: 3,
      title: "Elite",
      image: "/sites/elite.png",
      url: "https://elitegymin.vercel.app/",
      size: "large",
      year: 2023,
      month: "Dec",
      githubUrl: "https://github.com/BerrySeriousCoder/Elite-gym",
      techStack: ["React", "Tailwind CSS" ,"Framer motion", "TypeScript" ]
    },

    {
      id: 4,
      title: "Go Campuss",
      image: "/sites/gocampuss.png",
      url: "https://www.gocampuss.com/",
      size: "large",
      year: 2024,
      month: "Mar",
      githubUrl: "https://github.com/BerrySeriousCoder/Gocampuss",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS"]
    },{
      id: 5,
      title: "Blitzfitness",
      image: "/sites/blitzfitness.png",
      url: "https://blitzfitness.vercel.app/",
      size: "large",
      year: 2024,
      month: "May",
      githubUrl: "https://github.com/example/blitzfitness",
      techStack: ["React", "TypeScript", "Tailwind CSS" , "Framer motion"]
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
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll('.portfolio-item');
    items?.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [portfolioItems]); // Add portfolioItems to dependency array

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleImageClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {isHoveringImage ? (
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 ease-out">
            <div className="text-black text-xs font-semibold flex items-center gap-1">
              <span>VIEW</span>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="w-4 h-4 bg-white rounded-full transition-all duration-200 ease-out"></div>
        )}
      </div>

      <section ref={sectionRef} className="py-32 lg:py-48 px-8 lg:px-16 relative cursor-none">
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-32 lg:mb-40">
            <div className="flex items-center gap-12">
              <span className="text-base font-mono tracking-wider text-gray-400">02</span>
              <div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block hover:scale-105 transition-transform duration-500">LATEST</span>
                  <span className="block hover:scale-105 transition-transform duration-500">PORTFOLIO</span>
                </h2>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="text-right">
                <p className="text-sm font-mono tracking-wider text-gray-400 mb-2">//PORTFOLIO</p>
                <p className="text-sm font-mono tracking-wider text-gray-400">2023-PRESENT</p>
              </div>
            </div>
          </div>

          {/* Portfolio Description */}
          <div className="max-w-lg ml-auto mb-32 lg:mb-40">
            <p className="text-xl text-gray-300 leading-relaxed">
              My creative spirit comes alive in the digital realm. With nimble fingers flying across the device.
            </p>
          </div>

          {/* Portfolio Grid - Improved Layout */}
          {/* Portfolio Items - Absolute Positioning */}
          {/* Portfolio Items - Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-36">
             {portfolioItems.map((item, index) => {
               // Determine if this is a "centered" row (every 3rd item)
               const isCentered = (index % 3 === 2);

               return (
                 <div
                   key={item.id}
                   data-index={index}
                   className={`portfolio-item transition-all duration-1000 ${
                     isCentered ? "md:col-span-2 md:flex md:justify-center" : ""
                   } ${
                     visibleItems.includes(index)
                       ? "opacity-100 translate-y-0"
                       : "opacity-0 translate-y-16"
                   }`}
                   onClick={() => handleImageClick(item.url)}
                 >
                   <div
                     className="relative overflow-hidden group rounded-lg w-full" // Changed max-w-full to w-full for better mobile stacking
                     onMouseEnter={() => setIsHoveringImage(true)}
                     onMouseLeave={() => setIsHoveringImage(false)}
                   >
                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 z-10"></div>
                     <img
                       src={item.image}
                       alt={item.title}
                       className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                   </div>
                   {/* New content below image */}
                   <div className="mt-4">
                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0"> {/* Adjusted for mobile stacking */}
                       <h3 className="text-xl font-semibold">{item.title}</h3>
                       <div className="flex items-center gap-2">
                         <p className="text-sm text-gray-400">{item.month} {item.year}</p>
                         {item.githubUrl && (
                           <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                             {/* GitHub Icon SVG */}
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-6-2.5-6-2.5s1-2 4-2c1.5 0 2 2 4 2s4-1.5 4-2c0-2 3-1.5 3-1.5s.5 2.5-1 4c1 1 1.5 2 1.5 2s-1 2-3 1.5c-1.5 1-3 1.5-3 1.5s-1.5 0-3-1.5z"></path><path d="M12 15c-1.5 0-3-1.5-3-1.5s-1.5-1.5-1.5-3 1-2 1-2 1.5-1 3-1 3 1 3 1 1.5 1 1.5 3-1.5 3-3 1.5z"></path></svg>
                           </a>
                         )}
                       </div>
                     </div>
                     <div className="flex flex-wrap gap-2 mt-2">
                       {item.techStack.map((tech, techIndex) => (
                         <span key={techIndex} className="px-2 py-1 text-xs font-mono text-gray-400 border border-gray-600 rounded-full">
                           {tech}
                         </span>
                       ))}
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>

         </div>

         {/* Global Styles */}
         <style dangerouslySetInnerHTML={{
           __html: `
             * {
               cursor: none !important;
             }
           `
         }} />
       </section>
     </>
   );
 };

 export default Portfolio;
