import { motion } from 'framer-motion';
import { FiShield, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-2.5 text-cyan-400">
            <FiShield size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">ScamShield AI</p>
            <p className="text-xs text-slate-400">Fraud protection intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user?.name || 'Analyst'}</p>
            <p className="text-xs text-slate-400">Secure workspace</p>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"
          >
            <FiLogOut size={16} />
          </button>
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-violet-600 p-1.5 text-white">
            <FiChevronDown size={16} />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
