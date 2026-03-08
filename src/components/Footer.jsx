import { Brain, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative py-12 bg-navy border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">MindBridge AI</span>
          </div>

          {/* SDG Badge */}
          <div className="flex items-center space-x-2 px-4 py-2 rounded-full glass">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-sm text-gray-300">
              SDG 3 — Good Health & Well-being
            </span>
          </div>

          {/* TechHacks Badge */}
          <div className="text-sm text-gray-500">
            Built for TechHacks 2.0
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} MindBridge AI. All rights reserved.
          </p>
          
          {/* Quick links */}
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-sm text-gray-500 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl glass text-center">
          <p className="text-xs text-gray-500">
            <strong className="text-gray-400">Disclaimer:</strong> MindBridge AI is not a substitute for professional medical advice, 
            diagnosis, or treatment. If you're in crisis, please contact emergency services or a crisis helpline immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
