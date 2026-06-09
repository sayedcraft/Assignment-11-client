import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiClock, FiArrowLeft } from "react-icons/fi";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:bg-gradient-to-b flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated Icon Zone */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative w-24 h-24 mx-auto"
        >
          <div className="absolute inset-0 bg-sky-100 dark:bg-sky-950/50 rounded-full animate-ping opacity-75" />
          <div className="relative w-24 h-24 bg-sky-50 dark:bg-slate-800 text-sky-500 dark:text-sky-400 rounded-full flex items-center justify-center text-4xl shadow-inner border border-sky-100 dark:border-none">
            <FiClock className="animate-spin [animation-duration:10s]" />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="space-y-3">
          <motion.h2 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-800"
          >
            Coming <span className="text-sky-500">Soon!</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto leading-relaxed"
          >
            We are crafting a premium reading experience for this article. Stay tuned, our literary experts are on it!
          </motion.p>
        </div>

        {/* Interactive Back Button */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 btn btn-sm bg-sky-50 hover:bg-sky-500 text-sky-600 hover:text-white dark:bg-slate-800 dark:text-sky-400 border-none font-bold rounded-xl px-5 py-2.5 transition-all duration-300 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default ComingSoon;