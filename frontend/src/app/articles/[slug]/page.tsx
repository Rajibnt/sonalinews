import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
};

async function getArticle(slug: string): Promise<Article> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${apiUrl}/api/articles/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Article not found");
  return res.json();
}

// Generate Dynamic SEO Metadata for Next.js App Router
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const article = await getArticle(params.slug);
    const imageUrl = article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80";
    
    return {
      title: `${article.title} - Sonalinews Clone`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/articles/${article.slug}`,
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Article Not Found - Sonalinews Clone",
      description: "This article could not be found.",
    };
  }
}

export default async function ArticleDetail({
  params,
}: {
  params: { slug: string };
}) {
  let article: Article;
  try {
    article = await getArticle(params.slug);
  } catch (error) {
    return (
      <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-red-500">404 - Article Not Found</h1>
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
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
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

          {/* Styled article body */}
          <div className="prose prose-invert max-w-none pt-4 text-zinc-300 space-y-6 leading-relaxed text-lg">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
