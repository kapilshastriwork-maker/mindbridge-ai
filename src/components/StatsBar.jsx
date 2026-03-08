import { motion } from 'framer-motion';
import { Users, Clock, Shield, Heart } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1 in 4',
    label: 'People affected by mental illness',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Clock,
    value: '80%',
    label: 'Lack access to care',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Shield,
    value: '24/7',
    label: 'AI Support Available',
    color: 'text-purple-300',
    bgColor: 'bg-purple-300/10',
  },
  {
    icon: Heart,
    value: '100%',
    label: 'Anonymous',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
  },
];

const StatsBar = () => {
  return (
    <section className="relative py-16 bg-navy/50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-4 md:p-6 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl ${stat.bgColor} mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
              </div>
              <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1 md:mb-2`}>
                {stat.value}
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
