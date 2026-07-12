import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiMic, FiImage, FiClock } from 'react-icons/fi';
import { analyzeApi } from '../../services/api';
import type { ScanHistoryItem } from '../../types';
import { formatDate } from '../../utils/formatters';

const HistoryPage = () => {
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await analyzeApi.getHistory();
        setHistory((data.scans || data) as ScanHistoryItem[]);
      } catch {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const getIcon = (type: ScanHistoryItem['type']) => {
    switch (type) {
      case 'text':
        return <FiFileText className="text-blue-300" size={22} />;
      case 'audio':
        return <FiMic className="text-violet-300" size={22} />;
      default:
        return <FiImage className="text-cyan-300" size={22} />;
    }
  };

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        <div className="flex items-center gap-3 text-cyan-300">
          <FiClock size={22} />
          <span className="text-sm uppercase tracking-[0.3em]">History</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white">Review your prior scans</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Browse all previous analyses and keep a clear audit trail of suspicious content checks.</p>
      </motion.section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        {loading ? (
          <div className="text-sm text-slate-400">Loading history...</div>
        ) : history.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-white/10 p-8 text-center text-slate-400">No scans recorded yet.</div>
        ) : (
          <div className="grid gap-4">
            {history.map((scan) => (
              <div key={scan.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">{getIcon(scan.type)}</div>
                    <div>
                      <p className="text-lg font-semibold text-white">{scan.title}</p>
                      <p className="text-sm text-slate-400">{formatDate(scan.createdAt)}</p>
                    </div>
                  </div>
                  <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">{scan.verdict}</div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{scan.summary}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                  <span>Trust score: <span className="text-cyan-300">{scan.trustScore}</span></span>
                  <span>Scam probability: <span className="text-violet-300">{scan.scamProbability}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HistoryPage;