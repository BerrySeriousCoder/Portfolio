import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";

const LifeThroughMyLens = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isMobile = useIsMobile();

  const images = [
    "/imagegallery/image1.jpeg",
    "/imagegallery/image2.jpeg",
    "/imagegallery/image3.jpeg",
    "/imagegallery/image4.jpeg",
    "/imagegallery/image5.jpeg",
    "/imagegallery/image6.jpeg",
    "/imagegallery/image7.jpeg",
  ];
  

  useEffect(() => {
    const handleResizeOrLoad = () => {
      if (sectionRef.current && imageLayerRef.current) {
        const windowHeight = window.innerHeight;
        const layerHeight = imageLayerRef.current.getBoundingClientRect().height;

        setMaxScroll(Math.max(0, layerHeight - windowHeight));
        setSectionHeight(layerHeight + windowHeight);
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollY = window.scrollY - sectionTop;
      const clampedScroll = Math.max(0, Math.min(scrollY, maxScroll));

        setScrollProgress(clampedScroll);
    };

    window.addEventListener("resize", handleResizeOrLoad);
    window.addEventListener("scroll", handleScroll);

    // Run after images load
    const imagesLoaded = Array.from(imageLayerRef.current?.querySelectorAll("img") || []);
    let loadedCount = 0;

    imagesLoaded.forEach((img) => {
      if (img.complete) {
        loadedCount++;
        if (loadedCount === imagesLoaded.length) handleResizeOrLoad();
      } else {
        img.addEventListener("load", () => {
          loadedCount++;
          if (loadedCount === imagesLoaded.length) handleResizeOrLoad();
        });
      }
    });

    // Fallback in case images load super fast
    handleResizeOrLoad();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResizeOrLoad);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [images.length, maxScroll]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ height: `${sectionHeight}px` }}
    >
{/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
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
      <div className="sticky top-0 flex items-center justify-center h-screen z-10 pointer-events-none">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            LIFE THROUGH MY LENS
          </h2>
          <div
            className="text-5xl md:text-7xl lg:text-8xl text-gray-400"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            Harsh
          </div>
        </div>
      </div>

      <div
        ref={imageLayerRef}
        className="absolute top-0 left-0 w-full"
        style={{
          transform: `translateY(-${scrollProgress}px)`,
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`rounded-lg overflow-hidden shadow-lg m-8 w-11/12 mx-auto lg:w-80 lg:h-96 ${isMobile ? '' : (idx % 2 === 0 ? 'lg:ml-[20%]' : 'lg:ml-[60%]')}`}
            style={{
              opacity: Math.min(1, scrollProgress / 300),
              transform: `translateY(${idx * 200}px)`,
            }}
          >
            <img
              src={src}
              alt={`landscape-${idx}`}
              className="max-w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeThroughMyLens;
