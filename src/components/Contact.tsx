
import { useState, useEffect } from "react";
import { Linkedin } from "lucide-react";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('contact-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact-section" className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden bg-black">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.02) 2px,
            rgba(255,255,255,0.02) 4px
          )`
        }}></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="mb-8">
              <p className="text-gray-400 text-lg mb-4 font-light">Looking for my next opportunity!</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                <span className="block">Let's work</span>
                <span className="block">together</span>
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-lg mb-2">Reach out to me</p>
                <a 
                  href="mailto:ipsitabajpai26@gmail.com" 
                  className="text-white text-xl hover:text-gray-300 transition-colors duration-300 underline decoration-gray-600 hover:decoration-white"
                >
                  harsh100xdev.work@gmail.com
                </a>
              </div>

              <div className="flex flex-col space-y-4 pt-4">
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://drive.google.com/file/d/1QpNS3iFCU3-vsR-V95Or4HB9B2-q7K1I/view?usp=sharing" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 underline decoration-gray-600 hover:decoration-white inline-block"
                >
                  Resume
                </a>
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/harsh-vardhan-singh-2ab454257/" 
                  className="flex items-center space-x-2 text-white text-lg hover:text-gray-300 transition-colors duration-300 group"
                >
                  <Linkedin size={20} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="underline decoration-gray-600 group-hover:decoration-white">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Your Image with Animations */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Image Container with Unique Shape */}
              <div className="relative group">
                {/* Unique shaped container using clip-path */}
                <div className="relative overflow-hidden border border-gray-700/50 backdrop-blur-sm bg-gray-900/20 transform rotate-2 group-hover:rotate-1 transition-all duration-500"
                     style={{
                       clipPath: 'polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)',
                       borderRadius: '2rem'
                     }}>
                  <img 
                    src="/profile.jpeg"
                    alt="Profile"
                    className="w-full h-[400px] lg:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  
                  {/* Subtle overlay with floating text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-white font-light text-lg animate-fade-in">
                        Ready to create something amazing together
                      </div>
                    </div>
                  </div>
                </div>

                {/* Minimal Floating Elements */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-2 h-2 bg-gray-400/40 rounded-full animate-bounce delay-300"></div>
                <div className="absolute top-1/3 -right-4 w-1 h-1 bg-gray-300/50 rounded-full animate-ping delay-700"></div>
              </div>

              {/* Sticky Note */}
              <div className="absolute -bottom-8 -right-8 z-10">
                <div className="bg-yellow-300 p-4 rotate-12 hover:rotate-6 transition-transform duration-300 shadow-lg transform hover:scale-110">
                  <p className="text-gray-800 font-handwriting text-lg font-medium">
                    Let's
                    <br />
                    Connect!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .font-handwriting {
          font-family: 'Comic Sans MS', cursive, sans-serif;
        }
      `}</style>
    </section>
  );
};

export default Contact;
