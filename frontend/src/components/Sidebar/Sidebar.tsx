import { NavLink } from 'react-router-dom';
import { FiHome, FiFileText, FiMic, FiImage, FiClock, FiUser } from 'react-icons/fi';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: FiHome },
  { to: '/text-analysis', label: 'Text Analysis', icon: FiFileText },
  { to: '/audio-analysis', label: 'Audio Analysis', icon: FiMic },
  { to: '/image-analysis', label: 'Image Analysis', icon: FiImage },
  { to: '/history', label: 'History', icon: FiClock },
  { to: '/profile', label: 'Profile', icon: FiUser },
];

const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/70 px-5 py-6 lg:block">
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-cyan-950/20">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Operations</p>
      <div className="mt-4 space-y-2">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/25 to-violet-600/25 text-white shadow-lg shadow-blue-950/30'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  </aside>
);

export default Sidebar;
