import { motion } from 'framer-motion';
import { FiFileText, FiMic, FiImage, FiClock, FiShield, FiActivity } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ServiceCard from '../../components/ServiceCard/ServiceCard';

const services = [
  {
    title: 'Text Analysis',
    description: 'Inspect suspicious SMS, emails, and chat messages with AI-backed reasoning.',
    icon: FiFileText,
    route: '/text-analysis',
    accent: 'bg-blue-500/15 text-blue-300',
  },
  {
    title: 'Audio Analysis',
    description: 'Upload voice notes or call clips to detect fraud patterns and extract transcripts.',
    icon: FiMic,
    route: '/audio-analysis',
    accent: 'bg-violet-500/15 text-violet-300',
  },
  {
    title: 'Counterfeit Currency Detection',
    description: 'Scan currency images for forgery indicators and authenticity signals.',
    icon: FiImage,
    route: '/image-analysis',
    accent: 'bg-cyan-500/15 text-cyan-300',
  },
  {
    title: 'History',
    description: 'Review previous reports and compare prior analysis outcomes over time.',
    icon: FiClock,
    route: '/history',
    accent: 'bg-emerald-500/15 text-emerald-300',
  },
];

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
              <FiShield /> Secure AI Workspace
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Welcome back, {user?.name || 'Analyst'}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              ScamShield AI brings together text, audio, and image intelligence so your team can review suspicious signals at speed.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/50 px-4 py-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-cyan-300"><FiActivity /> Live threat readiness</div>
            <div className="mt-2 text-2xl font-semibold text-white">24/7 monitoring</div>
          </div>
        </div>
      </motion.section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Operations</p>
            <h2 className="text-2xl font-semibold text-white">Services Available</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;