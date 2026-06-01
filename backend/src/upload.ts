import { Request, Response, Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { adminAuth } from "./middleware/auth";

const uploadDir = path.resolve(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

export const uploadRouter = Router();

uploadRouter.post(
  "/api/upload",
  adminAuth,
  upload.single("image"),
  (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const fileUrl = `${process.env.BASE_URL || "http://localhost:5000"}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  }
);
