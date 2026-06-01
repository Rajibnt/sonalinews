"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";

type Article = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
};

export default function Admin() {
  const [article, setArticle] = useState<Article>({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
  });
  const [adminToken, setAdminToken] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const form = new FormData();
    form.append("image", file);
    
    setUploading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          "x-admin-token": adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
        },
        body: form,
      });
      if (!res.ok) throw new Error("Upload failed. Make sure token is correct.");
      const data = await res.json();
      setArticle({ ...article, imageUrl: data.url });
      setMessage("Image uploaded successfully!");
      setStatus("success");
    } catch (err: any) {
      setMessage(err.message || "Failed to upload image");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!article.slug || !article.title || !article.content) {
      setMessage("Please fill in all required fields (Slug, Title, and Content).");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";
      
      const res = await fetch(`${apiUrl}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(article),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to save article");
      }
      
      setMessage("Article published successfully!");
      setStatus("success");
      setArticle({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        imageUrl: "",
      });
    } catch (err: any) {
      setMessage(err.message || "Failed to save article");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white font-sans">
      <Header />
      <main className="container mx-auto py-12 px-4 max-w-4xl flex-grow">
        <div className="space-y-6 border border-white/10 bg-white/5 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h1 className="font-display text-3xl font-extrabold text-white">Publish New Article</h1>
              <p className="text-sm text-zinc-400 mt-1">Write high-fidelity rich markdown articles with media uploads</p>
            </div>
            
            <div className="flex flex-col gap-1 w-full sm:w-64">
              <label className="text-xs font-semibold text-zinc-400">Admin Token</label>
              <input
                type="password"
                placeholder="Enter auth token..."
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-white/10 bg-black text-white focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-4 rounded-2xl text-sm font-medium ${
                status === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400">Slug (e.g. latest-news-today)</label>
                <input
                  name="slug"
                  placeholder="URL slug..."
                  value={article.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-black text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-zinc-400">Article Title</label>
                <input
                  name="title"
                  placeholder="Headline..."
                  value={article.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-black text-white focus:outline-none focus:border-amber-400 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400">Excerpt / Short Description</label>
              <input
                name="excerpt"
                placeholder="Summary for home grid cards..."
                value={article.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-black text-white focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400">Featured Image URL (or upload below)</label>
              <input
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={article.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-black text-white focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 py-2 border-y border-white/5">
              <div className="flex items-center space-x-3 w-full">
                <label className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold hover:bg-white/10 text-white transition-all w-full sm:w-auto">
                  <span>{uploading ? "Uploading..." : "Upload Image"}</span>
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                </label>
                {article.imageUrl && (
                  <span className="text-xs text-zinc-400 truncate max-w-xs">{article.imageUrl}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-zinc-400">Article Content (Markdown)</label>
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="text-xs font-semibold text-amber-400 hover:underline"
                >
                  {preview ? "Hide Preview" : "Show Live Preview"}
                </button>
              </div>
              <textarea
                name="content"
                placeholder="Write article details using Markdown... # Heading, **bold**, etc."
                rows={12}
                value={article.content}
                onChange={handleChange}
                className="w-full px-4 py-4 rounded-2xl border border-white/10 bg-black text-white font-mono text-sm focus:outline-none focus:border-amber-400 transition resize-y"
              />
            </div>

            {preview && (
              <div className="border border-white/10 rounded-2xl bg-zinc-900/60 p-6 space-y-4">
                <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider pb-2 border-b border-white/5">Live Preview</h3>
                <div className="prose prose-invert max-w-none text-zinc-300">
                  <ReactMarkdown>{article.content || "_No content written yet. Write some markdown above._"}</ReactMarkdown>
                </div>
              </div>
            )}

            <button
              onClick={save}
              disabled={status === "loading"}
              className="mt-4 bg-amber-400 text-black hover:bg-amber-300 font-bold py-3.5 px-6 rounded-2xl text-center transition-all duration-200 transform active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? "Publishing..." : "Publish Article"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
