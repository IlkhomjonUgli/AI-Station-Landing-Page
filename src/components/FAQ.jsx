import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What are the prerequisites for AI programs?',
      answer: 'Most of our programs are designed for beginners. For AI Fundamentals and AIpreneurs, no prior experience is needed. For Data Science and advanced courses, basic programming knowledge is recommended but not required.'
    },
    {
      question: 'How long do the programs take to complete?',
      answer: 'Program duration varies: AI Fundamentals (2 months), AIpreneurs (3 months), Data Science (4 months), Banking Workshop (1 month intensive), and Corporate Training (customized).'
    },
    {
      question: 'Do you offer certificates upon completion?',
      answer: 'Yes! All students who successfully complete their programs receive industry-recognized certificates from AI Station, which you can share on LinkedIn and include in your resume.'
    },
    {
      question: 'What is the class format - online or in-person?',
      answer: 'We offer both formats! You can choose between live online classes (via Zoom) or in-person sessions at our Tashkent campus. Hybrid options are also available for maximum flexibility.'
    },
    {
      question: 'Are there payment plans available?',
      answer: 'Yes, we offer flexible payment options including monthly installments. You can pay the full amount upfront for a discount, or split payments over 2-3 months interest-free.'
    },
    {
      question: 'What kind of job support do you provide?',
      answer: 'We provide comprehensive career support including resume review, interview preparation, portfolio building, and job placement assistance. Our 92% placement rate speaks to our commitment to your success.'
    },
    {
      question: 'Can I switch between programs?',
      answer: 'Yes, you can transfer to a different program within the first two weeks if you feel another course better suits your needs. Our team will help you make the best choice for your career goals.'
    },
    {
      question: 'Do you offer corporate training for teams?',
      answer: 'Absolutely! We design custom AI training programs for organizations, including banking workshops, data analytics for executives, and team upskilling initiatives. Contact us for enterprise solutions.'
    }
  ];

  return (
    <section style={faqStyles.section}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={faqStyles.header}
        >
          <h2 style={faqStyles.title}>Frequently Asked Questions</h2>
          <p style={faqStyles.subtitle}>
            Find answers to common questions about our programs, enrollment, and support
          </p>
        </motion.div>

        <div style={faqStyles.faqList}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={faqStyles.faqItem}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={faqStyles.question}
              >
                <span style={faqStyles.questionText}>{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={faqStyles.icon}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={faqStyles.answer}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const faqStyles = {
  section: {
    padding: 'var(--space-12) 0',
    background: 'var(--bg-secondary)'
  },
  header: {
    textAlign: 'center',
    marginBottom: 'var(--space-8)',
    maxWidth: '700px',
    margin: '0 auto var(--space-8)'
  },
  title: {
    fontSize: 'var(--text-h1)',
    fontWeight: 800,
    marginBottom: 'var(--space-2)',
    fontFamily: 'var(--font-display)'
  },
  subtitle: {
    fontSize: 'var(--text-h4)',
    color: 'var(--text-secondary)'
  },
  faqList: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)'
  },
  faqItem: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    border: '1px solid var(--border-color)'
  },
  question: {
    width: '100%',
    padding: 'var(--space-4)',
    background: 'transparent',
    border: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
    textAlign: 'left'
  },
  questionText: {
    fontSize: 'var(--text-h4)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--primary-blue)'
  },
  answer: {
    padding: '0 var(--space-4) var(--space-4)',
    fontSize: 'var(--text-body)',
    color: 'var(--text-secondary)',
    lineHeight: 1.7,
    overflow: 'hidden'
  }
};

export default FAQ;
