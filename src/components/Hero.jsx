import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-28 flex items-center justify-center overflow-hidden animated-gradient">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Floating brain/heart illustration */}
      <motion.div
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="relative w-80 h-80">
          {/* Brain shape with gradient */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Brain outline */}
            <path
              d="M100 30 
                 C140 30 170 60 170 100 
                 C170 140 140 170 100 170 
                 C60 170 30 140 30 100 
                 C30 60 60 30 100 30"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              filter="url(#glow)"
            />
            
            {/* Brain folds - left hemisphere */}
            <path
              d="M60 70 Q80 60 90 80"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M50 100 Q70 90 80 110"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M55 130 Q75 120 85 140"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Brain folds - right hemisphere */}
            <path
              d="M140 70 Q120 60 110 80"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M150 100 Q130 90 120 110"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              opacity="0.7"
            />
            <path
              d="M145 130 Q125 120 115 140"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="2"
              opacity="0.7"
            />
            
            {/* Center line */}
            <path
              d="M100 40 L100 160"
              fill="none"
              stroke="url(#brainGradient)"
              strokeWidth="1.5"
              opacity="0.5"
            />
            
            {/* Heart in center */}
            <motion.path
              d="M100 85 
                 C100 85 85 75 80 90 
                 C75 105 100 125 100 125 
                 C100 125 125 105 120 90 
                 C115 75 100 85 100 85"
              fill="url(#brainGradient)"
              filter="url(#glow)"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
          
          {/* Sparkles around the brain */}
          <motion.div
            className="absolute top-0 right-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-purple-300" />
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Heart className="w-5 h-5 text-accent" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Powered by Advanced AI</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Your Mental Wellness,{' '}
            <span className="gradient-text">Powered by AI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 mb-10 leading-relaxed"
          >
            Anonymous, judgment-free support available 24/7. Built for SDG 3 — 
            Good Health & Well-being.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Talk to AI Companion</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link to="/mood">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary/50 text-white font-semibold rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Track Your Mood</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center space-x-6 text-sm text-gray-400"
          >
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-purple-300/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-300 rounded-full" />
              </div>
              <span>Free Forever</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
