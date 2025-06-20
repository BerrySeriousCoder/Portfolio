import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TestimonialSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      text: "Absolutely thrilled with the results! The professionalism and attention to detail exceeded my expectations.",
      author: "Tanvi Chabbra",
      bgColor: "bg-black",
      textColor: "text-white",
      starColor: "text-purple-400"
    },
    {
      text: "A fantastic experience from start to finish. Delivered exactly what I envisioned, with impressive skill and efficiency.",
      author: "Rahul Singh",
      bgColor: "bg-purple-400",
      textColor: "text-white",
      starColor: "text-white"
    },
    {
      text: "Excellent communication throughout the project. It was a real pleasure collaborating and seeing the vision come to life.",
      author: "pranjali Verma",
      bgColor: "bg-white",
      textColor: "text-gray-700",
      starColor: "text-purple-400"
    },
    {
      text: "Top-notch quality and timely delivery. Couldn’t have asked for a smoother process — highly satisfied!",
      author: "Rahul Prasad",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
      starColor: "text-purple-400"
    },
    {
      text: "Dependable, creative, and efficient. I’m beyond happy with the outcome and would recommend without hesitation.",
      author: "Durgesh Pandey",
      bgColor: "bg-green-300",
      textColor: "text-gray-800",
      starColor: "text-black"
    }
  ];
  

  const getCardPosition = (index:number, total:number) => {
    return isHovered ? hoverPositions[index] : initialPositions[index];
  };

  const initialPositions = [
    { x: -250, y: 40 },
    { x: -120, y: -100 },
    { x: 0, y: -30 },
    { x: 120, y: -100 },
    { x: 250, y: 40 }
  ];

  const hoverPositions = [
    { x: -400, y: 50 },
    { x: -200, y: -200 },
    { x: 0, y: -10 },
    { x: 200, y: -200 },
    { x: 400, y: 50 }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="text-center">
        <p className="text-gray-600 text-lg mb-2">Rating & Reviews</p>
        <h1 className="text-6xl font-bold">Trusted by people</h1>
      </div>

      <div
        className="relative md:h-[600px] flex flex-col md:flex-row items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative md:w-[380px] w-full">
          {testimonials.map((testimonial, index) => {
            const position = getCardPosition(index, testimonials.length);

            return (
              <motion.div
                key={index}
                className={`rounded-3xl p-6 min-h-[220px] ${testimonial.bgColor} ${testimonial.textColor}
                  ${isMobile ? 'relative w-full mb-4' : 'absolute left-0 top-0 md:w-[380px]'}`}
                initial={isMobile ? { opacity: 0, y: 20 } : isHovered ? { x: hoverPositions[index].x, y: hoverPositions[index].y, rotate: 0, zIndex: testimonials.length - index } : { x: initialPositions[index].x, y: initialPositions[index].y, rotate: 0, zIndex: testimonials.length - index }}
                animate={isMobile ? { opacity: 1, y: 0 } : isHovered ? { x: hoverPositions[index].x, y: hoverPositions[index].y, rotate: 0, zIndex: testimonials.length - index } : { x: initialPositions[index].x, y: initialPositions[index].y, rotate: 0, zIndex: testimonials.length - index }}
                transition={isMobile ? { type: "tween", duration: 0.5 } : { type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`${testimonial.starColor} text-xl`}>★</span>
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed">{testimonial.text}</p>
                <p className="font-semibold">{testimonial.author}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
