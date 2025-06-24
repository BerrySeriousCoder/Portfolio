import { useState, useEffect } from "react";
const Hero = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [typewriterText, setTypewriterText] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState(false);


  const fullText = "Glad You're Here...";

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Get Indian Standard Time
  const getIST = () => {
    return currentTime.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    // Typewriter effect
    if (animationStage === 0) {
      let currentIndex = 0;
      const typewriterInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypewriterText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typewriterInterval);
        }
      }, 100);

      return () => clearInterval(typewriterInterval);
    }
  }, [animationStage]);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 3000);
    const timer2 = setTimeout(() => setAnimationStage(2), 4300);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText("harsh100xdev.work@gmail.com");
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset copied state after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Loading Animation Overlay */}
      <div className={`absolute inset-0 bg-black z-50 transition-transform duration-1000 ease-in-out ${
        animationStage >= 1 ? '-translate-x-full' : 'translate-x-0'
      }`}>
        <div className="h-full flex items-center justify-center">
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-mono">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
      </div>

      {/* Enhanced Grid Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Secondary finer grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '10px 10px'
          }}
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Larger floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute w-2 h-2 bg-gray-600 rounded-full opacity-20"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 4) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              transform: `translateY(${Math.sin(i) * 10}px)`
            }}
          />
        ))}
      </div>

      {/* Paper Corner Effects */}
      <div className={`absolute top-0 left-0 w-20 h-20 transition-all duration-1000 delay-300 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-transparent transform rotate-45 origin-top-left"></div>
        <div className="absolute top-0 left-0 w-4 h-4 bg-gray-600 transform rotate-45"></div>
      </div>

      <div className={`absolute top-0 right-0 w-20 h-20 transition-all duration-1000 delay-300 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gray-700 via-gray-800 to-transparent transform -rotate-45 origin-top-right"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-gray-600 transform -rotate-45"></div>
      </div>

      <div className={`absolute bottom-0 left-0 w-20 h-20 transition-all duration-1000 delay-300 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-gray-700 via-gray-800 to-transparent transform -rotate-45 origin-bottom-left"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-gray-600 transform -rotate-45"></div>
      </div>

      <div className={`absolute bottom-0 right-0 w-20 h-20 transition-all duration-1000 delay-300 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-gray-700 via-gray-800 to-transparent transform rotate-45 origin-bottom-right"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-600 transform rotate-45"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className={`absolute top-0 left-0 right-0 z-40 transition-all duration-1000 delay-300 ${animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex justify-between items-center p-6 lg:p-8">
          <div className="text-xs font-mono tracking-wider text-gray-400">
            INDIA • {getIST()}
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-mono tracking-wider text-gray-400">AVAILABLE </span>
          </div>
          <div className="text-xs  font-mono tracking-wider text-gray-400 hidden md:block">
            PRESS [H] TO BOOK A CALL
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`h-screen flex items-center justify-center transition-all duration-1000 delay-500 ${animationStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center max-w-4xl px-6 lg:px-8">
          
          {/* Main Title */}
          <div className={`transition-all duration-1000 delay-700 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl lg:text-5xl font-bold lg:mb-8 mt-8 lg:mt-0 font-mono tracking-wide">
              HARSH VARDHAN SINGH
            </h1>
          </div>

          {/* Profile Image */}
          <div className={`transition-all duration-1000 delay-900 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block mb-8">
              <div className="w-64 h-64 lg:w-80 lg:h-80 mx-auto">
                <img 
                  src="/herogif.gif"
                  alt="Harsh's Profile"
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-1000 delay-1100 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="text-lg text-gray-300 font-mono">harsh100xdev.work@gmail.com</div>
              <button
                onClick={handleCopyClick}
                className="w-6 h-6 border-2 border-gray-500 rounded flex items-center justify-center hover:border-white transition-colors cursor-pointer"
                aria-label="Copy email address"
              >
                <div className="w-3 h-3 bg-gray-500 hover:bg-white transition-colors"></div>
              </button>
            </div>
            <div className="text-sm text-gray-500 font-mono mb-8">
              {copied ? "Copied!" : "Copy my email here ↗"}
            </div>
          </div>

          {/* Description */}
          <div className={`transition-all duration-1000 delay-1300 ${animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-lg text-gray-300 font-mono leading-relaxed mb-8 max-w-2xl mx-auto">
            I build solid full-stack web apps, start to finish. 
              <br />
            Focused on clean code, smooth performance, and great user experience.
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `
      }} />
    </section>
  );
};

export default Hero;
