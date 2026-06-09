import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      tag: "Reading Habits",
      title: "How to Build a Consistent Reading Habit in 2026",
      summary: "Struggling to finish a book? Discover 5 simple, actionable micro-habits that will help you read more books this year without burning out.",
      author: "Rahat Chowdhury",
      date: "June 08, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      tag: "Book Care",
      title: "The Ultimate Guide to Preserving Your Paperback Books",
      summary: "Moisture, dust, and sunlight can ruin your precious collection. Learn how professional collectors keep their paperbacks looking brand new.",
      author: "Anika Rahman",
      date: "June 02, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      tag: "Academic",
      title: "Must-Have Engineering Reference Books for This Semester",
      summary: "A curated list of core textbook recommendations for major engineering disciplines, now fully available for instant delivery via BookCourier.",
      author: "Dr. Asif Kamal",
      date: "May 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <div className="p-5 bg-white duration-300">
      <div className="space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-2">
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            From Our <span className="text-sky-500 ">Official Blog</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base md:text-lg font-medium opacity-90">
            Stay updated with expert book reviews, literary guides, and academic insights.
          </p>
        </div>

        {/* Blog Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-50/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image & Tag Overlay */}
              <div className="">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
              </div>

              {/* Card Body */}
              <div className="p-6 grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Meta Details */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar /> {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock /> {blog.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-xl">
                    {blog.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer (Author & Action Button) */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60 text-xs font-bold transition-colors">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <div className="w-5 h-5 rounded-full bg-sky-50 dark:bg-slate-800 text-sky-500 flex items-center justify-center text-[10px]">
                      <FiUser />
                    </div>
                    <span>{blog.author}</span>
                  </div>

                  <Link to='/comingSoon' className="text-sky-500 dark:text-sky-400 flex items-center gap-1 hover:gap-2 transition-all">
                    Read Article <FiArrowRight />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;