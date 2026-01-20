import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m your AI Station assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Tell me about programs',
    'Pricing information',
    'How to enroll',
    'Contact support'
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lower = message.toLowerCase();
    
    if (lower.includes('program')) {
      return 'We offer 5 main programs: AI Fundamentals, AIpreneurs, Data Science, Banking Workshop, and Corporate Training. Would you like details about any specific program?';
    } else if (lower.includes('price') || lower.includes('cost')) {
      return 'Our programs range from $120-180/month. We also offer flexible payment plans. Would you like to speak with our enrollment team?';
    } else if (lower.includes('enroll') || lower.includes('apply')) {
      return 'Great! You can enroll by visiting our contact page or calling +998 90 123 45 67. Would you like me to guide you through the enrollment process?';
    } else if (lower.includes('contact')) {
      return 'You can reach us at: Email: info@aistation.uz, Phone: +998 90 123 45 67, Address: Tashkent, Uzbekistan. Our team is available Mon-Fri, 9 AM - 6 PM.';
    } else {
      return 'Thanks for your question! For detailed information, please contact our team at info@aistation.uz or call +998 90 123 45 67.';
    }
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    handleSend();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={chatStyles.toggleButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="animate-float"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={chatStyles.chatWindow}
          >
            <div style={chatStyles.header}>
              <div>
                <h4 style={{ margin: 0, fontSize: 'var(--text-h4)' }}>AI Station Assistant</h4>
                <p style={{ margin: 0, fontSize: 'var(--text-small)', opacity: 0.8 }}>
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            <div style={chatStyles.messages}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    ...chatStyles.message,
                    alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.type === 'user' ? 'var(--gradient-primary)' : 'var(--bg-secondary)',
                    color: msg.type === 'user' ? 'white' : 'var(--text-primary)'
                  }}
                >
                  {msg.text}
                </motion.div>
              ))}
            </div>

            {messages.length === 1 && (
              <div style={chatStyles.quickReplies}>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    style={chatStyles.quickReply}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div style={chatStyles.inputContainer}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                style={chatStyles.input}
              />
              <button onClick={handleSend} style={chatStyles.sendButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const chatStyles = {
  toggleButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'var(--gradient-primary)',
    color: 'white',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatWindow: {
    position: 'fixed',
    bottom: '100px',
    right: '30px',
    width: '380px',
    height: '500px',
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 998,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    border: '1px solid var(--border-color)'
  },
  header: {
    background: 'var(--gradient-primary)',
    color: 'white',
    padding: 'var(--space-3)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  messages: {
    flex: 1,
    padding: 'var(--space-3)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)'
  },
  message: {
    maxWidth: '80%',
    padding: 'var(--space-2)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    lineHeight: 1.5
  },
  quickReplies: {
    padding: '0 var(--space-3) var(--space-2)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)'
  },
  quickReply: {
    padding: 'var(--space-1) var(--space-2)',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left'
  },
  inputContainer: {
    padding: 'var(--space-3)',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    gap: 'var(--space-2)'
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: 'var(--text-small)'
  },
  sendButton: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--gradient-primary)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  }
};

// Responsive
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 640px) {
    .chat-window {
      width: calc(100vw - 20px) !important;
      height: calc(100vh - 120px) !important;
      right: 10px !important;
      bottom: 80px !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default Chatbot;
