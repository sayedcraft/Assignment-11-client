import { motion } from "framer-motion";
import {
  FiTruck,
  FiBookOpen,
  FiShield,
  FiAward,
  FiUsers,
  FiHeart,
} from "react-icons/fi";

const About = () => {
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    {
      id: 1,
      icon: <FiBookOpen />,
      count: "15,000+",
      label: "Books Delivered",
    },
    {
      id: 2,
      icon: <FiUsers />,
      count: "5,000+",
      label: "Happy Readers",
    },
    {
      id: 3,
      icon: <FiTruck />,
      count: "64+",
      label: "Districts Covered",
    },
    {
      id: 4,
      icon: <FiHeart />,
      count: "99.4%",
      label: "Satisfaction Rate",
    },
  ];

  const values = [
    {
      id: 1,
      icon: <FiTruck className="text-sky-600 dark:text-sky-400" />,
      title: "Lightning Fast Delivery",
      desc: "We understand the excitement of a new book. Our dedicated logistics network ensures your parcel reaches you within 24-48 hours.",
    },
    {
      id: 2,
      icon: <FiShield className="text-indigo-600 dark:text-indigo-400" />,
      title: "Secured & Safe Handling",
      desc: "Books are precious. We treat every package with absolute care, ensuring zero bends, scratches, or weather damage during transit.",
    },
    {
      id: 3,
      icon: <FiAward className="text-emerald-600 dark:text-emerald-400" />,
      title: "Empowering Education",
      desc: "By connecting remote readers with standard academic libraries, we bridge the educational gap across Bangladesh.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-transparent dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16">
      {" "}
      <div className="w-11/12 max-w-7xl mx-auto space-y-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={fadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-5 text-center lg:text-left"
          >
            <div className="inline-flex items-center bg-sky-50 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
              ✨ Our Story
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight leading-tight">
              Revolutionizing How Bangladesh{" "}
              <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                Reads Books
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Founded in 2026, BookCourier started with a simple yet powerful
              mission: to make literature and academic resources accessible to
              every corner of Bangladesh. We realized that while readers are
              everywhere, well-stocked bookstores are not.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Today, we act as the digital bridge connecting passionate readers,
              students, and researchers with nationwide libraries, handling
              full-scale logistics with premium technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 hidden lg:flex justify-center"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800"
                alt="Library Logistics"
                className="w-full h-[350px] object-cover"
              />
            </div>
          </motion.div>
        </div>
        {/* Statistics */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.id * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-sky-50 dark:bg-slate-800 text-sky-500 rounded-2xl flex items-center justify-center text-xl mx-auto">
                  {stat.icon}
                </div>

                <h3 className="mt-3 text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                  {stat.count}
                </h3>

                <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Values */}
        <div className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">
              Values That Drive Us Forward
            </h3>

            <p className="mt-3 text-slate-400 dark:text-slate-500">
              Our business model relies on transparency, user comfort, and
              premium handling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val) => (
              <motion.div
                key={val.id}
                variants={fadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-slate-800 flex items-center justify-center text-2xl">
                  {val.icon}
                </div>

                <h4 className="mt-4 text-lg font-bold text-slate-800 dark:text-slate-200">
                  {val.title}
                </h4>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-sky-500 to-indigo-500 rounded-[2rem] p-8 md:p-12 text-center text-white shadow-lg"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold">
              Our Ultimate Vision
            </h3>

            <p className="mt-4 text-lg italic leading-relaxed">
              "To create a nationwide infrastructure where no student,
              researcher, or avid book enthusiast has to drop their learning
              curves due to geographical limitations."
            </p>

            <div className="mt-6 text-xs uppercase tracking-[4px] opacity-80">
              — Team BookCourier
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
