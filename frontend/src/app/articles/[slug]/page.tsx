"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
};

export default function ArticleDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchArticle = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/articles/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Fetch failed, attempting local storage fallback:", error);
      }
      
      // Local Storage Fallback
      try {
        const localArticlesStr = localStorage.getItem("sonali_local_articles");
        if (localArticlesStr) {
          const localArticles = JSON.parse(localArticlesStr);
          const found = localArticles.find((art: any) => art.slug === slug);
          if (found) {
            setArticle(found);
          }
        }
      } catch (err) {
        console.error("Local storage error:", err);
      }
      setLoading(false);
    };
    
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-zinc-400 font-bold">লোড হচ্ছে...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-extrabold mb-4 text-red-500">404 - Article Not Found</h1>
            <p className="text-zinc-400">The news story you are looking for does not exist or has been deleted.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      <Header />
      <main className="container mx-auto py-12 px-4 max-w-4xl flex-grow">
        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-zinc-400 font-medium italic border-l-4 border-amber-400 pl-4 py-1">
              {article.excerpt}
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none pt-4 text-zinc-300 space-y-6 leading-relaxed text-lg">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
