import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiSearch, FiTruck, FiMapPin } from "react-icons/fi";

const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600",
      title: "Explore A Massive Catalog Of Academic & Fiction Novels",
      subheading:
        "From complex engineering journals to classical literature, explore thousands of certified publications and global bestsellers all in one place.",
      ctaText1: "Browse Collection",
      ctaLink1: "/allBook",
      icon1: <FiSearch />,
      ctaText2: "New Arrivals",
      ctaLink2: "/allBook",
      icon2: <FiArrowRight />,
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=1600",
      title: "Secure Payment Gateways With Live Order Tracking",
      subheading:
        "Take absolute control of your orders. Monitor your book parcel status in real-time from our automated hub straight to your doorstep.",
      ctaText1: "Track Your Order",
      ctaLink1: "/dashboard/myProfile",
      icon1: <FiMapPin />,
      ctaText2: "Login Now",
      ctaLink2: "/login",
      icon2: <FiArrowRight />,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1595053801819-74d12a6886e8?auto=format&fit=crop&q=80&w=1600",
      title: "Your Favorite Books Delivered Straight To Your Doorstep",
      subheading:
        "Connect with premium bookstores and libraries nationwide. Experience lightning-fast courier service with end-to-end parcel protection.",
      ctaText1: "Order A Book",
      ctaLink1: "/allBook",
      icon1: <FiArrowRight />,
      ctaText2: "Check Rates",
      ctaLink2: "/about",
      icon2: <FiTruck />,
    },
  ];

  // Auto-play interval (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlider((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[65vh] min-h-[450px] w-full overflow-hidden bg-slate-900 select-none">
      {/* Slide Animation Container */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => {
          if (index !== currentSlider) return null;
          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Fullscreen Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay Gradient for Perfect Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />

              {/* Foreground Content Panel */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                  <div className="max-w-3xl space-y-5 text-white">
                    

                    {/* Main Title Heading */}
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subheading Paragraph */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="text-slate-200 text-sm md:text-base lg:text-lg font-medium max-w-2xl leading-relaxed opacity-90"
                    >
                      {slide.subheading}
                    </motion.p>

                    {/* Dual Action Buttons */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="flex flex-wrap items-center gap-4 pt-4"
                    >
                      {/* Primary Button */}
                      <Link
                        to={slide.ctaLink1}
                        className="btn btn-md md:btn-lg bg-sky-500 hover:bg-sky-600 text-white border-none rounded-xl px-8 font-bold shadow-lg shadow-sky-500/30 transition-all group gap-2"
                      >
                        {slide.ctaText1}
                        <span className="group-hover:translate-x-1 transition-transform">
                          {slide.icon1}
                        </span>
                      </Link>

                      {/* Secondary Glassmorphism Button */}
                      <Link
                        to={slide.ctaLink2}
                        className="btn btn-md md:btn-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-xl px-8 font-semibold backdrop-blur-sm transition-all gap-2"
                      >
                        {slide.icon2}
                        {slide.ctaText2}
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Slide Pagination Controller Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlider(index)}
            className={`transition-all duration-300 rounded-full h-2.5 ${
              index === currentSlider
                ? "w-8 bg-sky-500"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
