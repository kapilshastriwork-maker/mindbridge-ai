import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const moods = [
  { emoji: '😢', label: 'Terrible', value: 1, quote: "It's okay to not be okay. Tomorrow is a new day. 💙" },
  { emoji: '😕', label: 'Bad', value: 2, quote: "Every storm runs out of rain. You've got this. 🌧️" },
  { emoji: '😐', label: 'Neutral', value: 3, quote: "Steady is still moving forward. Keep going. ⚖️" },
  { emoji: '🙂', label: 'Good', value: 4, quote: "You're doing better than you think! 🌟" },
  { emoji: '😄', label: 'Amazing', value: 5, quote: "You're absolutely thriving! Keep this energy! 🚀" },
];

const weeklyData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 2 },
  { day: 'Wed', mood: 4 },
  { day: 'Thu', mood: 3 },
  { day: 'Fri', mood: 5 },
  { day: 'Sat', mood: 4 },
  { day: 'Sun', mood: 3 },
];

const moodHistory = [
  { emoji: '😄', label: 'Amazing', note: 'Finished my project', date: 'March 7' },
  { emoji: '😐', label: 'Neutral', note: 'Busy day at work', date: 'March 6' },
  { emoji: '🙂', label: 'Good', note: 'Morning walk helped', date: 'March 5' },
  { emoji: '😕', label: 'Bad', note: "Didn't sleep well", date: 'March 4' },
  { emoji: '😢', label: 'Terrible', note: 'Overwhelmed with tasks', date: 'March 3' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [loggedMoods, setLoggedMoods] = useState(moodHistory);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setShowInput(true);
  };

  const handleLogMood = () => {
    if (!selectedMood) return;
    
    const newEntry = {
      emoji: selectedMood.emoji,
      label: selectedMood.label,
      note: note || 'No note added',
      date: 'Just now',
    };
    
    setLoggedMoods([newEntry, ...loggedMoods]);
    setSelectedMood(null);
    setNote('');
    setShowInput(false);
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-10 bg-navy">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">How are you feeling today?</h1>
          <p className="text-gray-400">Track your mood to understand your emotional patterns</p>
        </motion.div>

        {/* Mood Check-in Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8 mb-12"
        >
          {/* Emoji Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            {moods.map((mood) => (
              <motion.button
                key={mood.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood)}
                className={`flex flex-col items-center space-y-2 p-4 rounded-2xl transition-all ${
                  selectedMood?.value === mood.value
                    ? 'bg-white/10 border-2 border-primary scale-110'
                    : 'hover:bg-white/5 border-2 border-transparent'
                }`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-xs text-gray-400">{mood.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Motivational Quote */}
          <AnimatePresence>
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mb-6"
              >
                <p className="text-lg text-primary italic">"{selectedMood.quote}"</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note Input */}
          <AnimatePresence>
            {showInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-md mx-auto"
              >
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's contributing to this feeling?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-primary/50 mb-4"
                  rows={3}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogMood}
                  className="w-full py-3 bg-gradient-to-r from-accent to-emerald-500 rounded-xl font-semibold flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Log Mood</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-3xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Your Mood Journey — Last 7 Days</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280" 
                  tick={{ fill: '#9ca3af' }}
                  axisLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]}
                  stroke="#6b7280"
                  tick={{ fill: '#9ca3af' }}
                  axisLine={{ stroke: '#374151' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#9ca3af' }}
                  itemStyle={{ color: '#a78bfa' }}
                />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="#7c3aed"
                  strokeWidth={3}
                  fill="url(#moodGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mood History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Moods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loggedMoods.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-4 flex items-center space-x-4"
              >
                <div className="text-3xl flex-shrink-0">{entry.emoji}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{entry.label}</p>
                  <p className="text-sm text-gray-400 truncate">{entry.note}</p>
                </div>
                <div className="text-sm text-gray-500 flex-shrink-0">{entry.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoodTracker;
