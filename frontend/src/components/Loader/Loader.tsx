import { motion } from 'framer-motion';

const Loader = () => (
  <div className="flex items-center gap-2">
    {[0, 1, 2].map((index) => (
      <motion.span
        key={index}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: index * 0.12 }}
        className="h-2.5 w-2.5 rounded-full bg-cyan-400"
      />
    ))}
  </div>
);

export default Loader;
