import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import prisma from "../lib/prisma.js";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";

export const analyzeText = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { text } = req.body || {};

    if (!text) {
      return res.status(400).json({
        message: "Text is required",
      });
    }

    const response = await fetch(
      "http://127.0.0.1:8000/analyze-text",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text,
          engine: "local",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();

      console.error("MODEL API ERROR:", errorData);

      return res.status(response.status).json({
        message: "Text analysis failed",
      });
    }

    const analysisResult = await response.json() as {
  verdict: string;
  trust_score?: number;
  scam_probability?: number;
  ml_probability?: number;
  rule_score?: number;
  reasons?: unknown;
  transcript?: string;
};
  console.log("User ID:", req.userId);
 const scan = await prisma.scan.create({
  data: {
    userId: req.userId!,
    type: "TEXT",
    verdict: analysisResult.verdict,
    trustScore: analysisResult.trust_score,
    scamProbability: analysisResult.scam_probability,
    mlProbability: analysisResult.ml_probability,
    ruleScore: analysisResult.rule_score,
    transcript: text,
    reasons: analysisResult.reasons as any,
  },
});

return res.status(200).json({
  message: "Text analyzed successfully",
  result: analysisResult,
  scanId: scan.id,
});
  } catch (error) {
    console.error("ANALYZE TEXT ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const analyzeAudio = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Audio file is required",
      });
    }

    const formData = new FormData();

    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    formData.append("stt_provider", "local_free");
    formData.append("engine", "local");

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-audio",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    const analysisResult = response.data as {
      verdict: string;
      trust_score?: number;
      scam_probability?: number;
      ml_probability?: number;
      rule_score?: number;
      reasons?: unknown;
      transcript?: string;
    };

    console.log("Audio Response:", analysisResult);

    const scan = await prisma.scan.create({
      data: {
        userId: req.userId!,
        type: "AUDIO",
        verdict: analysisResult.verdict,
        trustScore: analysisResult.trust_score,
        scamProbability: analysisResult.scam_probability,
        mlProbability: analysisResult.ml_probability,
        ruleScore: analysisResult.rule_score,
        transcript: analysisResult.transcript,
        reasons: analysisResult.reasons as any,
      },
    });

    return res.status(200).json({
      message: "Audio analyzed successfully",
      result: analysisResult,
      scanId: scan.id,
    });
  } catch (error: any) {
    console.error("========== AUDIO ERROR ==========");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error);
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.response?.data || error.message,
    });
  }
};
export const getAnalysisHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const scans = await prisma.scan.findMany({
      where: {
        userId: req.userId!,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Analysis history fetched successfully",
      scans,
    });
  } catch (error) {
    console.error("HISTORY ERROR:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const analyzeImage = async (
  req: AuthRequest,
  res: Response
) => {
  console.log("Inside analyzeImage");
  try {

    console.log("Authorization Header:", req.headers.authorization);
    console.log("req.userId:", req.userId);
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    const formData = new FormData();

    formData.append(
      "file",
      req.file.buffer,
      {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      }
    );

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-image",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    const analysisResult = response.data;

    const scan = await prisma.scan.create({
      data: {
        userId: req.userId!,
        type: "IMAGE",
        verdict: analysisResult.verdict,
        reasons: analysisResult.reasons,
      },
    });

    return res.status(200).json({
      message: "Image analyzed successfully",
      result: analysisResult,
      scanId: scan.id,
    });

  } catch (error: any) {
    console.error("IMAGE ANALYSIS ERROR:", error.response?.data || error);

    return res.status(500).json({
      message: "Image analysis failed",
      error: error.response?.data || error.message,
    });
  }
};