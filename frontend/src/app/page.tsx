import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard, { Article } from "@/components/ArticleCard";
import Seo from "@/components/Seo";

async function fetchArticles(): Promise<Article[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    // Safety check to prevent build crashes if URL is invalid/undefined
    if (!apiUrl || (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://"))) {
      console.warn("API URL is not set or invalid during build. Returning empty articles list.");
      return [];
    }
    
    const res = await fetch(`${apiUrl}/api/articles`, {
      next: { revalidate: 10 } // Revalidate cache every 10 seconds
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch articles. Status: ${res.status}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function Home() {
  const articles = await fetchArticles();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans">
      <Seo
        title="Sonalinews Clone – Home"
        description="Latest news articles – a full‑stack clone of Sonalinews.com"
        url={process.env.NEXT_PUBLIC_BASE_URL}
      />
      <Header />
      <main className="container mx-auto py-12 px-4 flex-1 max-w-7xl">
        <div className="space-y-2 mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest News
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Stay updated with real-time news articles from across the world
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-white/5 rounded-3xl backdrop-blur-md">
            <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="mt-4 text-lg font-bold text-white">No articles available</h3>
            <p className="mt-1 text-sm text-zinc-500">Go to the Admin Panel to publish your first news story!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
