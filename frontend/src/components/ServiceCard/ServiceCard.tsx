import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  route: string;
  accent: string;
}

const ServiceCard = ({ title, description, icon: Icon, route, accent }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(route)}
      className="group rounded-[24px] border border-white/10 bg-white/10 p-6 text-left shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition hover:border-cyan-400/40"
    >
      <div className={`inline-flex rounded-2xl p-3 ${accent}`}>
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-5 text-sm font-medium text-cyan-300 transition group-hover:translate-x-1">Open workspace →</div>
    </motion.button>
  );
};

export default ServiceCard;
