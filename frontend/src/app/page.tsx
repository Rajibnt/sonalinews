import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard, { Article } from "@/components/ArticleCard";
import Seo from "@/components/Seo";

// Mock database articles in case the real API is empty or offline
const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    slug: "islami-bank-board-meeting",
    title: "আমানতকারীদের আন্দোলনের মুখে পর্ষদ সভা করতে পারেনি ইসলামী ব্যাংক",
    excerpt: "ইসলামী ব্যাংকের প্রধান কার্যালয়ে আমানতকারীদের তীব্র আন্দোলনের মুখে ব্যাংকটির পর্ষদ সভা পণ্ড হয়ে গেছে। ক্ষুব্ধ গ্রাহকরা সকাল থেকেই ব্যাংকের সামনে অবস্থান নেন।",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    slug: "market-shutdown-rules",
    title: "বিদ্যুৎ সাশ্রয়ে মার্কেট-শপিং মল বন্ধের নতুন নির্দেশনা জারি",
    excerpt: "সারাদেশে বিদ্যুৎ ও জ্বালানি সাশ্রয় করতে রাত ৮টার পর থেকে মার্কেট, শপিং মল ও বিপণিবিতানগুলো বন্ধ রাখার নতুন কঠোর নির্দেশনা দিয়েছে সরকার।",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    slug: "motijheel-islami-bank-hq",
    title: "থমথমে মতিঝিল ইসলামী ব্যাংকের প্রধান কার্যালয় এলাকা",
    excerpt: "ইসলামী ব্যাংকের কর্মকর্তাদের অসন্তোষ ও আন্দোলনের পর মতিঝিলস্থ প্রধান কার্যালয় এবং সংলগ্ন এলাকায় অতিরিক্ত পুলিশ ও নিরাপত্তা বাহিনী মোতায়েন করা হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    slug: "featured-news-national",
    title: "জাতীয় ও আন্তর্জাতিক পর্যায়ে বাংলাদেশের ভাবমূর্তি উজ্জ্বল করতে কাজ করছে সরকার",
    excerpt: "সরকারের পক্ষ থেকে জানানো হয়েছে যে দেশের উন্নয়ন এবং অগ্রগতি বিশ্ব দরবারে তুলে ধরতে প্রশাসন কাজ করছে। বিভিন্ন কূটনৈতিক মিশনের কার্যক্রম আরও গতিশীল করা হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=1200&q=80"
  }
];

async function fetchArticles(): Promise<Article[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    
    if (!apiUrl || (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://"))) {
      return MOCK_ARTICLES;
    }
    
    const res = await fetch(`${apiUrl}/api/articles`, {
      next: { revalidate: 10 }
    });
    
    if (!res.ok) return MOCK_ARTICLES;
    const data = await res.json();
    return data.length === 0 ? MOCK_ARTICLES : data;
  } catch (error) {
    return MOCK_ARTICLES;
  }
}

export default async function Home() {
  const articles = await fetchArticles();
  
  // Distribute articles according to Sonalinews.com layout structure
  const leftArticles = articles.slice(0, 3);
  const featuredArticle = articles[3] || articles[0];
  const remainingArticles = articles.slice(4);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-zinc-800 font-sans leading-normal">
      <Seo
        title="সোনালীনিউজ ডটকম | Sonalinews.com | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত নিউজ পোর্টাল"
        description="SonaliNews.com is a leading government approved Bengali news portal, covering national, political, financial, and international news."
        url={process.env.NEXT_PUBLIC_BASE_URL}
      />
      <Header />
      
      <main className="container mx-auto py-5 px-4 max-w-7xl flex-grow space-y-5">
        {/* 1. Landscape Top Banner Ad matching screenshot */}
        <div className="w-full bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-700 rounded border border-blue-900 overflow-hidden shadow-sm aspect-[12/1.8] flex items-center justify-between px-6 sm:px-12 select-none relative group">
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
          <div className="flex flex-col text-white">
            <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">Mudaraba Hajj Package</span>
            <span className="font-extrabold text-sm sm:text-2xl tracking-tight">সহজ কিস্তিতে হজ ও ওমরাহ্‌ করার সুবিধা</span>
          </div>
          <div className="bg-amber-400 text-black text-xs font-bold px-4 py-2 rounded shadow-md group-hover:bg-amber-300 transition">
            বিস্তারিত দেখুন
          </div>
        </div>

        {/* 2. Main Three-Column Layout matching Sonalinews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Column A (Left): Thumbnail list items (width 3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-zinc-200 rounded p-1 space-y-3 shadow-sm h-full flex flex-col justify-between">
              {leftArticles.map((article, index) => (
                <a 
                  key={article.id} 
                  href={`/articles/${article.slug}`} 
                  className={`flex gap-3 group p-2 rounded hover:bg-zinc-50 transition items-center ${
                    index !== leftArticles.length - 1 ? "border-b border-zinc-100" : ""
                  }`}
                >
                  <img 
                    src={article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=150&q=80"} 
                    alt={article.title} 
                    className="w-20 h-20 object-cover rounded border border-zinc-200 shrink-0" 
                  />
                  <div className="space-y-1">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#cc0000] leading-tight transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column B (Center): Featured large layout card (width 6/12) */}
          <div className="lg:col-span-6">
            {featuredArticle && (
              <a 
                href={`/articles/${featuredArticle.slug}`} 
                className="bg-white border border-zinc-200 rounded overflow-hidden shadow-sm hover:shadow-md transition duration-200 block group h-full flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 border-b border-zinc-200">
                  <img 
                    src={featuredArticle.imageUrl || "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=800&q=80"} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-[1.02]" 
                  />
                  <div className="absolute top-3 left-3 bg-[#cc0000] text-white text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded shadow">
                    বিশেষ সংবাদ
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-2xl font-extrabold text-zinc-900 group-hover:text-[#cc0000] leading-snug transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-[#006a4e] flex items-center gap-1 group-hover:underline">
                    সম্পূর্ণ পড়ুন 
                    <svg className="h-3 w-3 stroke-current" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            )}
          </div>

          {/* Column C (Right): Vertical Portrait Ad matching the right banner (width 3/12) */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-b from-amber-50 to-orange-100 border border-zinc-200 rounded p-6 shadow-sm flex flex-col items-center justify-between text-center select-none h-full relative group">
              <div className="absolute top-2 right-2 text-[9px] uppercase tracking-wider text-zinc-400 font-bold bg-white/60 px-1 py-0.5 rounded">বিজ্ঞাপন</div>
              
              <div className="space-y-3 my-auto">
                <span className="text-3xl font-extrabold text-[#cc0000] tracking-tighter block">৪২</span>
                <span className="text-zinc-700 text-xs font-bold block uppercase tracking-wide">বছরের দীপ্ত পথচলা</span>
                <p className="text-[11px] text-zinc-500 font-medium">আমরা আমাদের সম্মানিত গ্রাহক ও সুধীজনদের জানাই আন্তরিক অভিনন্দন ও ফুলেল শুভেচ্ছা।</p>
              </div>

              <div className="w-full border-t border-zinc-200/60 pt-4 space-y-2 text-left">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600">
                  <span>সর্বমোট প্রিমিয়াম আয়</span>
                  <span className="text-emerald-700">২১,২৫০ কোটি টাকা</span>
                </div>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Grid for additional news items */}
        {remainingArticles.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-zinc-200">
            <h2 className="font-display text-xl font-extrabold text-zinc-900 border-l-4 border-[#0b5c3a] pl-3 py-0.5">
              আরও অন্যান্য খবর
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingArticles.map((article) => (
                <a 
                  key={article.id} 
                  href={`/articles/${article.slug}`} 
                  className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition duration-200 group flex flex-col h-full"
                >
                  <img 
                    src={article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"} 
                    alt={article.title} 
                    className="aspect-video w-full object-cover border-b border-zinc-100" 
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-[#cc0000] leading-snug transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{article.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
