import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiShield, FiAlertTriangle } from "react-icons/fi";
import { analyzeApi } from "../../services/api";
import type { AnalysisResult } from "../../types";

const TextAnalysisPage = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyze = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const { data } = await analyzeApi.analyzeText(text);

      setResult(data.result || data);
    } catch {
      setResult({
        verdict: "Analysis unavailable",
        trustScore: 0,
        scamProbability: 0,
        reasons: ["Unable to connect to the service right now."],
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
          <FiShield size={22} />
          <span className="text-sm uppercase tracking-[0.3em]">
            Text intelligence
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-white">
          Analyze suspicious text
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Paste a message, SMS, email fragment, or OTP note to receive a
          verdict, trust score, and rationale.
        </p>
      </motion.section>

      <section className="rounded-[32px] border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
        <textarea
          rows={12}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste suspicious text here..."
          className="w-full rounded-[24px] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-200 outline-none"
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            The model evaluates urgency, impersonation patterns, and suspicious
            language.
          </p>

          <button
            onClick={analyze}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            {loading ? "Analyzing..." : "Analyze"}
            <FiArrowRight />
          </button>
        </div>
      </section>

      {result && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8"
        >
          <div className="flex items-center gap-2 text-cyan-300">
            <FiAlertTriangle />
            <span className="text-sm uppercase tracking-[0.3em]">
              Result
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
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
                  {result.trustScore ?? 0}%
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Scam Probability</p>
                <p className="mt-2 text-2xl font-semibold text-violet-300">
                  {result.scamProbability ?? 0}%
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950/50 p-5">
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
        </motion.section>
      )}
    </div>
  );
};

export default TextAnalysisPage;