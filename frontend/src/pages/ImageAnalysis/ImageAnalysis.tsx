import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiImage, FiUploadCloud, FiCheckCircle } from 'react-icons/fi';
import { analyzeApi } from '../../services/api';
import type { AnalysisResult } from '../../types';

const ImageAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeImage = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const { data } = await analyzeApi.analyzeImage(file);
      setResult(data.result || data);
    } catch {
      setResult({ verdict: 'Image analysis unavailable', trustScore: 0, scamProbability: 0, reasons: ['Unable to analyze the uploaded image right now.'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        <div className="flex items-center gap-3 text-cyan-300">
          <FiImage size={22} />
          <span className="text-sm uppercase tracking-[0.3em]">Image analysis</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-white">Inspect currency or suspicious imagery</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Upload an image to receive counterfeit detection insights, confidence scoring, and security rationale.</p>
      </motion.section>

      <section className="grid gap-6 rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] sm:p-8">
        <div className="rounded-[28px] border border-dashed border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
            <FiUploadCloud size={28} />
          </div>
          <h2 className="mt-5 text-xl font-semibold text-white">Upload an image</h2>
          <p className="mt-2 text-sm text-slate-400">PNG, JPG, and WEBP files are supported.</p>
          <input type="file" accept="image/*" onChange={(event) => {
            const selected = event.target.files?.[0] ?? null;
            setFile(selected);
            setPreview(selected ? URL.createObjectURL(selected) : '');
          }} className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-cyan-300" />
          <button onClick={analyzeImage} className="mt-6 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 font-semibold text-white transition hover:opacity-90">
            {loading ? 'Analyzing...' : 'Analyze Image'}
            <FiCheckCircle />
          </button>
        </div>

        <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-white/10 bg-slate-900/60 p-6">
          {preview ? <img src={preview} alt="preview" className="max-h-[460px] rounded-[24px] object-contain" /> : <div className="text-center text-slate-400"><FiImage size={60} className="mx-auto text-cyan-400" /><p className="mt-4">Image preview will appear here</p></div>}
        </div>
      </section>

      {result && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              <div>
                <p className="text-sm text-slate-400">Verdict</p>
                <p className="mt-2 text-2xl font-semibold text-white">{result.verdict}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Denomination</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">{result.denomination || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Confidence</p>
                <p className="mt-2 text-2xl font-semibold text-violet-300">{result.confidence ?? 'N/A'}%</p>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              <h2 className="text-xl font-semibold text-white">Summary</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{result.summary || 'The uploaded image was processed successfully.'}</p>
              <h2 className="mt-5 text-xl font-semibold text-white">Reasons</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {result.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2"><span className="text-cyan-400">•</span>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default ImageAnalysisPage;