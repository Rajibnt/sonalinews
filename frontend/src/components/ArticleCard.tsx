import Link from "next/link";

export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
};

export default function ArticleCard({ article }: { article: Article }) {
  // Use a fallback image if none is provided
  const imageUrl = article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80";

  return (
    <Link href={`/articles/${article.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5 flex flex-col h-full">
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
          <img
            src={imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-display text-xl font-bold leading-tight text-white group-hover:text-amber-400 transition-colors duration-200 line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-amber-400 group-hover:underline">
            Read More
            <svg className="ml-1.5 h-3 w-3 stroke-current" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 9l3-3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
