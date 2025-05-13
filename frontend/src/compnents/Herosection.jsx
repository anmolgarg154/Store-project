import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Calendar, PhoneCall } from 'lucide-react';

const slides = [
  {
    img: 'http://i.huffpost.com/gen/1148926/images/o-CLASSIC-BOOKS-ORIGINAL-COVERS-facebook.jpg',
    title: 'To Kill A Mockingbird',
    button: 'Buy now',
  },
  {
    img: 'https://bestlifeonline.com/wp-content/uploads/sites/3/2020/10/Harry-Potter-and-the-Chamber-of-Secrets-book-cover.jpg',
    title: 'Samsung Galaxy S24 launch',
    subtitle: 'Get coupon worth ₹ 5000* & unbeatable launch offers*',
    button: 'Register now',
    icon: 'Calendar',
  },
  {
    img: 'https://www.hachettechildrens.co.uk/wp-content/uploads/2019/05/hbg-title-9781444910582-133.jpg?fit=1523%2C2339',
    title: 'Samsung Galaxy A64 GIF',
    subtitle: 'Get coupon worth ₹ 5000* & unbeatable launch offers*',
    button: 'Get One',
    icon: 'PhoneCall',
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const duration = 4000;

  // Auto-rotate slides
  useEffect(() => {
    if (isTouching) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, duration);

    return () => clearInterval(interval);
  }, [isTouching]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setIsTouching(true);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isTouching) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next slide
        setCurrent((prev) => (prev + 1) % slides.length);
      } else {
        // Swipe right, go to previous slide
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
      setIsTouching(false);
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Main banner container */}
      <div
        className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider container */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 relative h-full"
            >
              {/* Image container */}
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              </div>

            
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-10 h-1 rounded-full transition-colors ${current === index ? 'bg-white' : 'bg-white/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

       
      </div>

      <div className="hidden sm:block">
        <div
          onClick={() => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
          aria-label="Previous slide"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeft size={24} />
        </div>

        <div
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
          aria-label="Next slide"
        >
          <span className="sr-only">Next</span>
          <ChevronRight size={24} />
        </div>
      </div>

    </div>
  );
};

export default HeroBanner;