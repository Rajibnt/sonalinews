import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard, { Article } from "@/components/ArticleCard";
import Seo from "@/components/Seo";

async function fetchArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`);
  if (!res.ok) throw new Error("Failed to load articles");
  return res.json();
}

export default async function Home() {
  const articles = await fetchArticles();

  return (
    <>
      <Seo
        title="Sonalinews Clone – Home"
        description="Latest news articles – a full‑stack clone of Sonalinews.com"
        url={process.env.NEXT_PUBLIC_BASE_URL}
      />
      <Header />
      <main className="container mx-auto py-8 px-4 flex-1">
        <h1 className="font-display text-3xl text-primary mb-6">Latest Articles</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
