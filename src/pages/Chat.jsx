import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MessageCircle, Plus, Send, Smile, Paperclip, ArrowLeft, AlertTriangle, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIResponse } from '../config/ai';

const previousChats = [
  { id: 1, title: "Feeling anxious today", preview: "I've been feeling really anxious about...", timestamp: "2:30 PM" },
  { id: 2, title: "Work stress help", preview: "My boss has been really demanding...", timestamp: "Yesterday" },
  { id: 3, title: "Can't sleep again", preview: "I've been lying awake for hours...", timestamp: "Mar 5" },
];

const initialMessage = {
  id: 0,
  sender: 'ai',
  avatar: '🧠',
  text: "Hi there 👋 I'm your MindBridge AI companion. This is a safe, anonymous space. How are you feeling today? You can share anything — I'm here to listen and support you.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

const suggestedPrompts = [
  "😰 I'm feeling anxious",
  "😴 I can't sleep",
  "😔 I'm feeling lonely",
  "😤 I'm very stressed",
];

const crisisLines = [
  { name: 'iCall India', number: '9152987821' },
  { name: 'Vandrevala Foundation', number: '1860-2662-345' },
  { name: 'iMind', number: '9611161515' },
];

const CrisisModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card rounded-3xl p-8 max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-red-400">🆘 Immediate Support Available</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <p className="text-gray-300 mb-6">
            If you're in crisis or need immediate help, please reach out to these professional helplines:
          </p>
          
          <div className="space-y-4">
            {crisisLines.map((line, index) => (
              <a
                key={index}
                href={`tel:${line.number}`}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <span className="font-semibold">{line.name}</span>
                <div className="flex items-center space-x-2 text-accent">
                  <Phone className="w-4 h-4" />
                  <span>{line.number}</span>
                </div>
              </a>
            ))}
          </div>
          
          <p className="text-gray-500 text-sm mt-6 text-center">
            You're not alone. Help is available 24/7.
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Chat = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [conversationHistory, setConversationHistory] = useState([
    { role: 'assistant', content: initialMessage.text }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeChat, setActiveChat] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text = inputText) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, { role: 'user', content: text }]);
    setInputText('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse([
        ...conversationHistory,
        { role: 'user', content: text }
      ]);

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        avatar: '🧠',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMessage]);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        avatar: '🧠',
        text: "I'm having trouble connecting. Please try again. 💙",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length === 1;

  return (
    <div className="min-h-screen pt-20 bg-navy">
      <Navbar />
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
      
      <div className="fixed top-20 left-0 right-0 bottom-0 flex">
        {/* Left Sidebar */}
        <div className="w-80 hidden lg:flex flex-col glass border-r border-white/5 h-full">
          {/* Header */}
          <div className="p-4 border-b border-white/5">
            <Link to="/" className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span>Conversations</span>
            </h2>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {previousChats.map((chat) => (
              <motion.button
                key={chat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeChat === chat.id 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <h3 className="font-semibold text-sm mb-1">{chat.title}</h3>
                <p className="text-xs text-gray-500 truncate">{chat.preview}</p>
                <span className="text-xs text-gray-600">{chat.timestamp}</span>
              </motion.button>
            ))}
          </div>

          {/* New Chat Button */}
          <div className="p-4 border-t border-white/5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 rounded-xl font-semibold flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </motion.button>
          </div>

          {/* User Avatar */}
          <div className="p-4 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div>
                <p className="font-semibold text-sm">Anonymous User</p>
                <p className="text-xs text-accent flex items-center space-x-1">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span>Online</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Top Bar */}
          <div className="h-16 glass border-b border-white/5 flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold">Feeling anxious today</h2>
              <motion.span 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-accent rounded-full"
              />
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCrisisModal(true)}
                className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full text-sm font-medium flex items-center space-x-1 hover:bg-red-500/30 transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Crisis Support</span>
              </motion.button>
              <div className="flex items-center space-x-2">
                <span className="text-lg">MindBridge AI 🤖</span>
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                <span className="text-sm text-accent">Active</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {message.sender === 'ai' && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{message.avatar}</span>
                      </div>
                    )}
                    <div>
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-primary to-purple-600'
                          : 'glass border border-primary/20'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-600 mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">👤</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Suggested Prompts */}
              {showSuggestions && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 justify-center mt-4"
                >
                  {suggestedPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(prompt)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm transition-colors"
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm">🧠</span>
                    </div>
                    <div className="glass border border-primary/20 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">MindBridge AI is typing</span>
                        <div className="flex space-x-1">
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 glass border-t border-white/5 flex-shrink-0">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Share what's on your mind... (Enter to send, Shift+Enter for new line)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm resize-none focus:outline-none focus:border-primary/50"
                  rows={2}
                  disabled={isLoading}
                />
                <div className="absolute right-3 bottom-3 flex space-x-2">
                  <button className="p-1 hover:text-primary transition-colors" disabled={isLoading}>
                    <Smile className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-1 hover:text-primary transition-colors" disabled={isLoading}>
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                onClick={() => handleSend()}
                disabled={isLoading || !inputText.trim()}
                className={`p-3 rounded-xl ${
                  isLoading || !inputText.trim()
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-purple-600'
                }`}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-xs text-gray-600 mt-2 flex items-center space-x-1">
              <span>🔒</span>
              <span>End-to-end private • Not stored • 100% Anonymous</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
