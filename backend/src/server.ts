import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import pool from "./db";
import { adminAuth } from "./middleware/auth";
import { Article } from "./types";
import { uploadRouter } from "./upload";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(uploadRouter);

/* ---------- PUBLIC ROUTES ---------- */
app.get("/api/articles", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, slug, title, excerpt, category, image_url FROM articles ORDER BY id DESC");
    const articles = result.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      category: row.category,
      imageUrl: row.image_url,
    }));
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/articles/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM articles WHERE slug = $1",
      [slug]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    const row = result.rows[0];
    const article: Article = {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      category: row.category,
      imageUrl: row.image_url,
    };
    res.json(article);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------- ADMIN ROUTES (protected) ---------- */
app.post("/api/articles", adminAuth, async (req: Request, res: Response) => {
  const { slug, title, excerpt, content, category, imageUrl } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO articles (slug, title, excerpt, content, category, image_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [slug, title, excerpt, content, category ?? 'জাতীয়', imageUrl ?? null]
    );
    res.json({ message: "Article created", id: result.rows[0].id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/articles/:slug", adminAuth, async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    await pool.query("DELETE FROM articles WHERE slug = $1", [slug]);
    res.json({ message: "Deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ---------- Server bootstrap ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
