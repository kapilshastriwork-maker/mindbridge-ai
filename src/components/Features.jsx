import { motion } from 'framer-motion';
import { Bot, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Bot,
    title: 'AI Chat Companion',
    description: 'Talk to our empathetic AI trained to support mental well-being with compassionate responses.',
    link: '/chat',
    gradient: 'from-primary to-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Mood Tracker',
    description: 'Log daily moods, visualize patterns, and identify triggers to understand your emotional health.',
    link: '/mood',
    gradient: 'from-accent to-emerald-600',
  },
  {
    icon: BookOpen,
    title: 'Resource Hub',
    description: 'Curated professional resources, crisis helplines, and self-care guides for your journey.',
    link: '/resources',
    gradient: 'from-purple-400 to-pink-400',
  },
];

const Features = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-purple-950/20 to-navy" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Mental Wellness,{' '}
            <span className="gradient-text">Our Priority</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover powerful tools designed to support your mental health journey
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-card rounded-3xl p-8 h-full hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn more link */}
                  <Link
                    to={feature.link}
                    className="inline-flex items-center space-x-2 text-primary hover:text-purple-300 transition-colors duration-300 group/link"
                  >
                    <span className="font-semibold">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Decorative corner */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-full blur-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
