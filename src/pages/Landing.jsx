import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Features from '../components/Features';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: '🔒',
      title: 'Stay Anonymous',
      description: 'No sign-up, no data stored',
    },
    {
      icon: '💬',
      title: 'Talk Freely',
      description: 'Share with our empathetic AI',
    },
    {
      icon: '🌱',
      title: 'Grow & Heal',
      description: 'Track progress, access resources',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-purple-950/10 to-navy" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg">Your journey to wellness in three simple steps</p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.2} className="flex-1 max-w-sm">
              <div className="glass-card rounded-3xl p-8 text-center relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 border-t-2 border-dotted border-gray-600" />
                  </div>
                )}
                
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTABanner = () => {
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-600/10 to-accent/20" />
      <div className="absolute inset-0 bg-primary/5 blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to start your wellness journey?
          </h2>
          <Link to="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <span>Talk to MindBridge AI</span>
              <span>→</span>
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-navy overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Landing;
