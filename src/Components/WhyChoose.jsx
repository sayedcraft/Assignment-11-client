import { motion } from "framer-motion";
import { FaTruckFast, FaBookOpen, FaBangladeshiTakaSign, FaMapLocationDot, FaShieldHalved, FaHeart } from "react-icons/fa6";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaTruckFast />,
      title: "Fast & Reliable Delivery",
      desc: "Get your favorite books delivered quickly and safely to your doorstep.",
    },
    {
      icon: <FaBookOpen />,
      title: "Wide Collection of Books",
      desc: "From academic to fiction — explore a diverse range of books in one place.",
    },
    {
      icon: <FaBangladeshiTakaSign />,
      title: "Affordable Prices",
      desc: "Best prices with exciting offers — because books should be accessible to everyone.",
    },
    {
      icon: <FaMapLocationDot />,
      title: "Nationwide Coverage",
      desc: "We deliver books to almost all districts across Bangladesh.",
    },
    {
      icon: <FaShieldHalved />,
      title: "Secure & Easy Ordering",
      desc: "Simple ordering process with secure payment and order tracking.",
    },
    {
      icon: <FaHeart />,
      title: "Made for Book Lovers",
      desc: "A platform built by book lovers, for book lovers.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-sky-50 via-slate-50 to-sky-100/60 py-16 rounded-[2.5rem] mb-12 border border-sky-100/50 shadow-inner">
      <div className="max-w-11/12 md:px-8 px-4 mx-auto">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mt-3">
            Why Choose <span className="text-sky-500">Book2Door</span>?
          </h2>
          <p className="mt-4 text-slate-600 text-base md:text-lg font-medium opacity-90">
            We make buying and delivering books simple, fast, and reliable - all over Bangladesh.
          </p>
        </div>

        {/* Features Grid with Hover Scaling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center text-3xl mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;