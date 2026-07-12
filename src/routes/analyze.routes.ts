import { Router } from "express";
import multer from "multer";

import {
  analyzeText,
  analyzeAudio,
  analyzeImage,
  getAnalysisHistory,
} from "../controllers/analyze.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/text",
  authMiddleware,
  analyzeText
);

router.post(
  "/audio",
  authMiddleware,
  upload.single("file"),
  analyzeAudio
);

router.post(
  "/image",
  authMiddleware,
  upload.single("file"),
  analyzeImage
);

router.get(
  "/history",
  authMiddleware,
  getAnalysisHistory
);

export default router;