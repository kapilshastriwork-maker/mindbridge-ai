import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Search, ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const resources = [
  {
    id: 1,
    icon: '🆘',
    title: 'iCall India Helpline',
    category: 'Crisis Help',
    description: 'Professional counselling helpline — 9152987821',
    badge: '24/7 Crisis',
    badgeColor: 'bg-red-500',
    phone: '9152987821',
    isCrisis: true,
  },
  {
    id: 2,
    icon: '😰',
    title: 'Understanding Anxiety',
    category: 'Anxiety',
    description: 'Evidence-based techniques to manage anxiety and panic attacks',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
  {
    id: 3,
    icon: '😴',
    title: 'Sleep Hygiene Guide',
    category: 'Sleep',
    description: 'Science-backed tips to improve sleep quality and duration',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
  {
    id: 4,
    icon: '🧘',
    title: '5-Minute Meditation',
    category: 'Meditation',
    description: 'Guided breathing exercises for instant calm and focus',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
  {
    id: 5,
    icon: '💙',
    title: "Depression — You're Not Alone",
    category: 'Depression',
    description: 'Understanding depression symptoms and where to seek help',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
  {
    id: 6,
    icon: '💆',
    title: 'Stress Management 101',
    category: 'Stress',
    description: 'Practical daily habits to reduce chronic stress levels',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
  {
    id: 7,
    icon: '✨',
    title: 'Self-Care Routine Builder',
    category: 'Self-Care',
    description: 'Build a personalized self-care routine that actually works',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
  {
    id: 8,
    icon: '📞',
    title: 'Vandrevala Foundation',
    category: 'Crisis Help',
    description: 'Free 24/7 helpline: 1860-2662-345',
    badge: 'Helpline',
    badgeColor: 'bg-red-500',
    phone: '18602662345',
    isCrisis: true,
  },
  {
    id: 9,
    icon: '🌱',
    title: 'Mindfulness for Beginners',
    category: 'Meditation',
    description: 'Start your mindfulness journey with simple daily practices',
    badge: null,
    badgeColor: null,
    phone: null,
    isCrisis: false,
  },
];

const categories = ['All', 'Crisis Help', 'Anxiety', 'Depression', 'Sleep', 'Stress', 'Self-Care', 'Meditation'];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-28 px-6 pb-10 bg-navy">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center space-x-3">
            <span>📚</span>
            <span>Mental Health Resources</span>
          </h1>
          <p className="text-gray-400 text-lg">Curated, verified resources to support your well-being journey</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources, topics, helplines..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`glass-card rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 flex flex-col h-full ${
                  resource.isCrisis ? 'animate-pulse border-red-500/50' : ''
                }`}
                style={resource.isCrisis ? {
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.1)'
                } : {}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{resource.icon}</div>
                  {resource.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${resource.badgeColor}`}>
                      {resource.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                
                <span className="inline-block px-2 py-1 bg-white/5 rounded-full text-xs text-gray-400 mb-3">
                  {resource.category}
                </span>
                
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {resource.description}
                </p>

                {resource.phone && (
                  <a
                    href={`tel:${resource.phone}`}
                    className="inline-flex items-center justify-center space-x-2 w-full py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors mb-3"
                  >
                    <Phone className="w-4 h-4" />
                    <span>📞 Call Now</span>
                  </a>
                )}
                
                <button className="flex items-center space-x-1 text-primary hover:text-purple-300 transition-colors text-sm font-medium group/link mt-auto">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No results message */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400">No resources found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resources;
