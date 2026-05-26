import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does Book2Door work?",
    answer:
      "Book2Door connects readers with libraries and bookstores. You can browse books, place orders online, and get them delivered to your doorstep.",
  },
  {
    question: "Which areas does Book2Door cover?",
    answer:
      "We currently deliver books across major cities and districts in Bangladesh. Coverage is expanding continuously.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 2–5 working days depending on your location and book availability.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel an order if its status is still pending. Once shipped, cancellation is no longer available.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support secure online payments. More payment options will be added soon.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-base-100 py-14">
      <div className="max-w-11/12 mx-auto px-3 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-sky-500">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base opacity-80">
            Everything you need to know about ordering and delivering books with Book2Door.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="collapse collapse-arrow bg-white 
                         border border-gray-200 dark:border-white/10
                         rounded-xl shadow-sm"
            >
              <input type="checkbox" />
              <div className="collapse-title font-medium">
                {faq.question}
              </div>
              <div className="collapse-content text-sm opacity-80 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
