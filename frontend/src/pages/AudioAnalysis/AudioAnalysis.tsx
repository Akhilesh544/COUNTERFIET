import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiMic, FiPlayCircle } from "react-icons/fi";
import { analyzeApi } from "../../services/api";
import type { AnalysisResult } from "../../types";

const AudioAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeAudio = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const { data } = await analyzeApi.analyzeAudio(file);

      setResult(data.result || data);
    } catch {
      setResult({
        verdict: "Audio analysis unavailable",
        trustScore: 0,
        scamProbability: 0,
        reasons: ["Unable to analyze the uploaded audio file right now."],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8"
      >
        <div className="flex items-center gap-3 text-cyan-300">
          <FiMic size={22} />
          <span className="text-sm uppercase tracking-[0.3em]">
            Audio Analysis
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-white">
          Review suspicious voice content
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Upload an audio clip to extract a transcript and evaluate voice-based
          fraud signals.
        </p>
      </motion.section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        <div className="rounded-[28px] border border-dashed border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
            <FiUploadCloud size={28} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">
            Drop your audio file here
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Accepted formats include MP3, WAV, M4A, and OGG.
          </p>

          <input
            type="file"
            accept=".mp3,.wav,.m4a,.ogg"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-6 block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/20 file:px-4 file:py-2 file:text-cyan-300"
          />

          {file && (
            <p className="mt-4 text-sm text-cyan-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            The system combines transcription and risk heuristics for a richer
            analysis.
          </p>

          <button
            onClick={analyzeAudio}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            {loading ? "Analyzing..." : "Analyze Audio"}
            <FiPlayCircle />
          </button>
        </div>
      </section>

      {result && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4 rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              <div>
                <p className="text-sm text-slate-400">Verdict</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {result.verdict}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Trust Score</p>
                <p className="mt-2 text-2xl font-semibold text-cyan-300">
                  {result.trustScore ?? result.trust_score}%
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Scam Probability</p>
                <p className="mt-2 text-2xl font-semibold text-violet-300">
                  {result.scamProbability ?? result.scam_probability}%
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
              {result.transcript && (
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Transcript
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {result.transcript}
                  </p>
                </div>
              )}

              <div className="mt-5">
                <h2 className="text-xl font-semibold text-white">Reasons</h2>

                <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                  {result.reasons?.map((reason: any, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-cyan-400">•</span>

                      {typeof reason === "string" ? (
                        <span>{reason}</span>
                      ) : (
                        <div>
                          <p>
                            <strong>Flag:</strong> {reason.flag}
                          </p>

                          <p>
                            <strong>Matched:</strong> {reason.matched}
                          </p>

                          <p>
                            <strong>Reason:</strong> {reason.why}
                          </p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default AudioAnalysisPage;