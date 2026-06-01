import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard, { Article } from "@/components/ArticleCard";
import Seo from "@/components/Seo";
import Link from "next/link";

// Interface for categorized articles
interface CategoryNews {
  category: string;
  featured: Article;
  list: Article[];
}

// 1. Hero Section Articles (Left side list, Center featured)
const HERO_LEFT: Article[] = [
  {
    id: 1,
    slug: "islami-bank-board-meeting",
    title: "আমানতকারীদের আন্দোলনের মুখে পর্ষদ সভা করতে পারেনি ইসলামী ব্যাংক",
    excerpt: "ইসলামী ব্যাংকের প্রধান কার্যালয়ে আমানতকারীদের তীব্র আন্দোলনের মুখে পর্ষদ সভা পণ্ড হয়ে গেছে। ক্ষুব্ধ গ্রাহকরা সকাল থেকেই ব্যাংকের সামনে অবস্থান নেন।",
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
    excerpt: "ইসলামী ব্যাংকের কর্মকর্তাদের অসন্তোষ ও আন্দোলনের পর মতিঝিলস্থ প্রধান কার্যালয় এবং সংলগ্ন এলাকায় অতিরিক্ত পুলিশ ও নিরাপত্তা বাহিনী মো মোতায়েন করা হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&q=80"
  }
];

const HERO_FEATURED: Article = {
  id: 4,
  slug: "prime-minister-national-address",
  title: "জাতীয় ও আন্তর্জাতিক পর্যায়ে বাংলাদেশের ভাবমূর্তি আরও উজ্জ্বল করতে কাজ করছে বর্তমান সরকার",
  excerpt: "সরকারের পক্ষ থেকে জানানো হয়েছে যে দেশের অর্থনৈতিক ও সামাজিক উন্নয়ন বিশ্ব দরবারে তুলে ধরতে প্রশাসন কাজ করছে। বিভিন্ন কূটনৈতিক মিশনের কার্যক্রম আরও গতিশীল করা হয়েছে এবং বিদেশি বিনিয়োগ বাড়াতে নানামুখী পদক্ষেপ নেওয়া হচ্ছে।",
  imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=1200&q=80"
};

// 2. Secondary grid articles (below hero)
const SECONDARY_GRID: Article[] = [
  {
    id: 5,
    slug: "brent-crude-oil-drop",
    title: "আন্তর্জাতিক বাজারে জ্বালানি তেলের দাম আরও কমেছে, স্বস্তিতে বিশ্ব",
    excerpt: "বিশ্ববাজারে অপরিশোধিত জ্বালানি তেলের দাম বড় দরপতনের মুখে পড়েছে। ব্রেন্ট ক্রুড তেলের দাম কমেছে প্রায় ৩ শতাংশ।",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    slug: "it-export-growth-bd",
    title: "বাংলাদেশি সফটওয়্যার ও আইটি রপ্তানিতে রেকর্ড প্রবৃদ্ধি অর্জন",
    excerpt: "আইটি খাতের উদ্যোক্তারা জানিয়েছেন ইউরোপ ও আমেরিকার বাজারে দেশের তৈরি সফটওয়্যার সলিউশনের চাহিদা বহুগুণ বেড়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    slug: "monsoon-rain-forecast",
    title: "সারাদেশে বৃষ্টির তীব্রতা বৃদ্ধির আভাস, আবহাওয়া দপ্তরের সতর্কতা",
    excerpt: "মৌসুমি বায়ুর প্রভাবে দেশের আটটি বিভাগেই মাঝারি থেকে ভারী বৃষ্টির সম্ভাবনা দেখা দিয়েছে। নিচু এলাকা প্লাবিত হতে পারে।",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80"
  }
];

// 3. Category News Triple Grid (National, Politics, International)
const TRIPLE_GRID_NEWS: CategoryNews[] = [
  {
    category: "জাতীয়",
    featured: {
      id: 8,
      slug: "metro-rail-new-stations",
      title: "মেট্রোরেলের নতুন তিন স্টেশনের যাত্রা শুরু, খুশি যাত্রীরা",
      excerpt: "রাজধানীর মানুষের যোগাযোগে ব্যাপক গতি আনতে মেট্রোরেলের আরও ৩টি নতুন স্টেশন আনুষ্ঠানিকভাবে চালু করা হয়েছে।",
      imageUrl: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=400&q=80"
    },
    list: [
      { id: 9, slug: "dhaka-traffic-updates", title: "রাজধানীর ট্রাফিক জ্যাম কমাতে বিশেষ রুট চালু হচ্ছে", excerpt: "" },
      { id: 10, slug: "digital-bangladesh-vision", title: "স্মার্ট বাংলাদেশ বিনির্মাণে তরুণদের দক্ষ করার মহাপরিকল্পনা", excerpt: "" },
      { id: 11, slug: "river-safety-drives", title: "বুড়িগঙ্গার তীরে অবৈধ স্থাপনা উচ্ছেদে নৌ-বাহিনীর অভিযান", excerpt: "" }
    ]
  },
  {
    category: "রাজনীতি",
    featured: {
      id: 12,
      slug: "election-reforms-party-meeting",
      title: "নির্বাচনী সংস্কার নিয়ে সর্বদলীয় রাজনৈতিক বৈঠকের আহ্বান",
      excerpt: "সুষ্ঠু ও নিরপেক্ষ নির্বাচন আয়োজনের রূপরেখা চূড়ান্ত করতে দেশের রাজনৈতিক দলগুলোকে একসঙ্গে বসার প্রস্তাব দেওয়া হয়েছে।",
      imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=400&q=80"
    },
    list: [
      { id: 13, slug: "opposition-press-meet", title: "জনগণের অধিকার আদায়ে শান্তিপূর্ণ আন্দোলনের ঘোষণা বিরোধীদের", excerpt: "" },
      { id: 14, slug: "ruling-party-youth-campaign", title: "দেশের অগ্রযাত্রায় যুবসমাজকে সম্পৃক্ত করার সিদ্ধান্ত ক্ষমতাসীনদের", excerpt: "" },
      { id: 15, slug: "election-commission-draft", title: "নির্বাচন কমিশনের নতুন ভোটার তালিকার খসড়া প্রকাশ", excerpt: "" }
    ]
  },
  {
    category: "আন্তর্জাতিক",
    featured: {
      id: 16,
      slug: "un-climate-summit-pledge",
      title: "জাতিসংঘ জলবায়ু সম্মেলনে ঐতিহাসিক ক্ষতিপূরণ তহবিলের চুক্তি স্বাক্ষর",
      excerpt: "ধনী দেশগুলো জলবায়ু পরিবর্তনে ক্ষতিগ্রস্ত অনুন্নত দেশগুলোকে বড় অংকের ক্ষতিপূরণ দিতে আনুষ্ঠানিকভাবে সম্মত হয়েছে।",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
    },
    list: [
      { id: 17, slug: "tech-giant-ai-safety", title: "কৃত্রিম বুদ্ধিমত্তা নিয়ন্ত্রণে বিশ্বের বড় প্রযুক্তি সংস্থাগুলোর চুক্তি", excerpt: "" },
      { id: 18, slug: "global-trade-shipping-routes", title: "লোহিত সাগরে পণ্যবাহী জাহাজে হামলায় বৈশ্বিক বাণিজ্য ঝুঁকিতে", excerpt: "" },
      { id: 19, slug: "space-station-lunar-mission", title: "চাঁদে স্থায়ী বসতি স্থাপনে নতুন রকেট উৎক্ষেপণ নাসার", excerpt: "" }
    ]
  }
];

// 4. Sports (খেলা) Category Grid
const SPORTS_FEATURED: Article = {
  id: 20,
  slug: "world-cup-cricket-glory",
  title: "ঐতিহাসিক জয়ে বিশ্বমঞ্চে ফাইনালে পা রাখলো টাইগাররা, দেশজুড়ে উল্লাস",
  excerpt: "ক্রীড়া ইতিহাসে নতুন অধ্যায় তৈরি করলো বাংলাদেশ ক্রিকেট দল। শেষ ওভারের টানটান উত্তেজনায় পরাশক্তিদের হারিয়ে প্রথমবার ফাইনালে উঠেছে দল।",
  imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80"
};

const SPORTS_LIST: Article[] = [
  {
    id: 21,
    slug: "fifa-champions-league-draw",
    title: "চ্যাম্পিয়ন্স লিগের রোমাঞ্চকর কোয়ার্টার ফাইনাল ড্র সম্পন্ন",
    excerpt: "ইউরোপীয় ফুটবল শ্রেষ্টত্বের আসরে বার্সেলোনা ও রিয়াল মাদ্রিদের হাইভোল্টেজ লড়াই নিশ্চিত হয়েছে ড্রতে।",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 22,
    slug: "bpl-t20-young-stars",
    title: "বিপিএল টুর্নামেন্টে দ্যুতি ছড়াচ্ছেন একঝাঁক নতুন বাংলাদেশি অলরাউন্ডার",
    excerpt: "জাতীয় দলের নির্বাচকরা জানিয়েছেন ঘরোয়া লিগের এই পারফরম্যান্স আগামী সিরিজে দল গঠনে ভূমিকা রাখবে।",
    imageUrl: "https://images.unsplash.com/photo-1540747737956-37872f767104?auto=format&fit=crop&w=350&q=80"
  }
];

// 5. Entertainment (বিনোদন) Category Grid
const ENTERTAINMENT_NEWS: Article[] = [
  {
    id: 23,
    slug: "bengali-film-global-award",
    title: "কান চলচ্চিত্র উৎসবে প্রশংসিত বাংলাদেশী তরুণ নির্মাতার সিনেমা",
    excerpt: "উৎসবে চলচ্চিত্রটির প্রিমিয়ার শেষে বিশ্বখ্যাত সমালোচকরা দাঁড়িয়ে বাংলাদেশি সিনেমার ভূয়সী প্রশংসা করেন।",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=450&q=80"
  },
  {
    id: 24,
    slug: "music-album-viral-charts",
    title: "ইউটিউব ও স্পটিফাইয়ের বৈশ্বিক ট্রেন্ডিং চার্টে দেশীয় ব্যান্ডের গান",
    excerpt: "মুক্তির মাত্র ২৪ ঘণ্টায় গানটি সামাজিক যোগাযোগ মাধ্যমে সাড়া ফেলেছে এবং লক্ষাধিক শ্রোতা পছন্দ করেছেন।",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=450&q=80"
  },
  {
    id: 25,
    slug: "theater-festival-dhaka",
    title: "শিল্পকলা একাডেমিতে জাতীয় নাট্যোৎসবের জমকালো উদ্বোধন",
    excerpt: "সারা দেশের ৫০টিরও বেশি নাট্যদল এই উৎসবে অংশ নিচ্ছে। দর্শকদের উপচে পড়া ভিড় লক্ষ্য করা যাচ্ছে।",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=450&q=80"
  }
];

// 6. Regional (সারাদেশ) divisions
const DIVISIONS = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ"];

// Dynamic fetch handler
async function fetchLatestArticles(): Promise<Article[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    if (!apiUrl || (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://"))) {
      return [];
    }
    const res = await fetch(`${apiUrl}/api/articles`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const dynamicArticles = await fetchLatestArticles();
  
  // Use dynamic articles if available, otherwise default to mock data
  const hasDynamic = dynamicArticles.length > 0;
  const leftNews = hasDynamic ? dynamicArticles.slice(0, 3) : HERO_LEFT;
  const mainFeatured = hasDynamic ? (dynamicArticles[3] || HERO_FEATURED) : HERO_FEATURED;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7fa] text-zinc-800 font-sans leading-normal">
      <Seo
        title="সোনালীনিউজ ডটকম | Sonalinews.com | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত নিউজ পোর্টাল"
        description="সোনালীনিউজ ডটকম একটি শীর্ষস্থানীয় সরকারি অনুমোদনপ্রাপ্ত অনলাইন বাংলা নিউজ পোর্টাল। দেশের জাতীয়, রাজনৈতিক, অর্থনৈতিক ও খেলাধুলার খবরসহ সর্বশেষ সংবাদ।"
        url={process.env.NEXT_PUBLIC_BASE_URL}
      />
      
      <Header />
      
      <main className="container mx-auto py-6 px-4 max-w-7xl flex-grow space-y-6">
        
        {/* --- SECTION 1: TOP LANDSCAPE AD BANNER --- */}
        <div className="w-full bg-gradient-to-r from-[#0d4f35] to-[#12774a] rounded border border-emerald-800 overflow-hidden shadow-sm aspect-[12/1.8] flex items-center justify-between px-6 sm:px-12 select-none relative group">
          <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
          <div className="flex flex-col text-white">
            <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">Mudaraba Hajj Scheme</span>
            <span className="font-extrabold text-sm sm:text-2xl tracking-tight">সোনালী হজ্জ প্যাকেজে সহজ ও শান্তিময় হজ্জের সুবিধা</span>
          </div>
          <div className="bg-amber-400 text-black text-xs font-bold px-4 py-2 rounded shadow-md group-hover:bg-amber-300 transition">
            আবেদন করুন
          </div>
        </div>

        {/* --- SECTION 2: HERO GRID (LEFT LIST, CENTER FEATURED, RIGHT PORTRAIT AD) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Column Left: News list */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-zinc-200 rounded p-1 shadow-sm h-full flex flex-col justify-between">
              {leftNews.map((article, index) => (
                <a 
                  key={article.id} 
                  href={`/articles/${article.slug}`} 
                  className={`flex gap-3 group p-2.5 rounded hover:bg-zinc-50 transition items-center ${
                    index !== leftNews.length - 1 ? "border-b border-zinc-100" : ""
                  }`}
                >
                  <img 
                    src={article.imageUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=150&q=80"} 
                    alt={article.title} 
                    className="w-20 h-20 object-cover rounded border border-zinc-200 shrink-0" 
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#cc0000] leading-tight transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column Center: Main cover featured article */}
          <div className="lg:col-span-6">
            <a 
              href={`/articles/${mainFeatured.slug}`} 
              className="bg-white border border-zinc-200 rounded overflow-hidden shadow-sm hover:shadow-md transition duration-200 block group h-full flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 border-b border-zinc-200">
                <img 
                  src={mainFeatured.imageUrl || "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=800&q=80"} 
                  alt={mainFeatured.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]" 
                />
                <div className="absolute top-3 left-3 bg-[#cc0000] text-white text-[10px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded shadow">
                  প্রধান সংবাদ
                </div>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-2xl font-extrabold text-zinc-900 group-hover:text-[#cc0000] leading-snug transition-colors">
                    {mainFeatured.title}
                  </h2>
                  <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">
                    {mainFeatured.excerpt}
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-[#006a4e] flex items-center gap-1 group-hover:underline">
                  সম্পূর্ণ সংবাদটি পড়ুন 
                  <svg className="h-3 w-3 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Column Right: Elegant Custom Portrait Ad matching Sonalinews scroll */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-zinc-200 rounded p-6 shadow-sm flex flex-col items-center justify-between text-center select-none h-full relative group">
              <div className="absolute top-2 right-2 text-[9px] uppercase tracking-wider text-zinc-400 font-bold bg-zinc-100 px-1 py-0.5 rounded">বিজ্ঞাপন</div>
              
              <div className="space-y-3 my-auto">
                <span className="text-4xl font-extrabold text-[#cc0000] tracking-tighter block">৪২</span>
                <span className="text-zinc-800 text-sm font-bold block uppercase tracking-wide">বছরের দীপ্ত পথচলা</span>
                <p className="text-xs text-zinc-500 font-medium">আমরা আমাদের সম্মানিত গ্রাহক ও সুধীজনদের জানাই আন্তরিক অভিনন্দন ও ফুলেল শুভেচ্ছা।</p>
              </div>

              <div className="w-full border-t border-zinc-200/60 pt-4 space-y-2 text-left">
                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600">
                  <span>সর্বমোট প্রিমিয়াম আয়</span>
                  <span className="text-emerald-700">২১,২৫০ কোটি টাকা</span>
                </div>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0b5c3a] h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 3: SECONDARY TRIPLET GRID WIDGET --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SECONDARY_GRID.map((article) => (
            <a 
              key={article.id} 
              href={`/articles/${article.slug}`} 
              className="bg-white border border-zinc-200 rounded p-3 flex gap-4 hover:shadow-md transition duration-200 group items-center"
            >
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-20 h-20 object-cover rounded border border-zinc-100 shrink-0" 
              />
              <div>
                <h4 className="text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-3">
                  {article.title}
                </h4>
              </div>
            </a>
          ))}
        </div>

        {/* --- SECTION 4: WIDE LANDSCAPE MIDDLE AD BANNER --- */}
        <div className="bg-white border border-zinc-200 py-3 text-center rounded select-none shadow-sm flex items-center justify-center font-bold text-sm text-zinc-400 aspect-[12/1]">
          <span>অত্যাধুনিক ব্যাংকিং সেবায় ইসলামী ব্যাংক বাংলাদেশ লিমিটেড (বিজ্ঞাপন)</span>
        </div>

        {/* --- SECTION 5: "সোনালী স্পেশাল" (SONALI SPECIAL) CATEGORY SECTION --- */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b-[3px] border-[#0b5c3a] pb-1">
            <h2 className="bg-[#0b5c3a] text-white font-extrabold px-4 py-1.5 rounded-t text-sm sm:text-base">
              সোনালী স্পেশাল
            </h2>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 border border-zinc-300 rounded bg-white text-zinc-600 hover:bg-zinc-100 transition flex items-center justify-center text-xs">&lt;</button>
              <button className="w-6 h-6 border border-zinc-300 rounded bg-white text-zinc-600 hover:bg-zinc-100 transition flex items-center justify-center text-xs">&gt;</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECONDARY_GRID.map((art) => (
              <a 
                key={art.id} 
                href={`/articles/${art.slug}`} 
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group"
              >
                <img src={art.imageUrl} alt={art.title} className="aspect-[16/10] w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-sm font-bold text-zinc-900 group-hover:text-[#cc0000] line-clamp-2">{art.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- SECTION 6: DYNAMIC THREE-COLUMN CATEGORY TRIPLE GRID (জাতীয় | রাজনীতি | আন্তর্জাতিক) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
          {TRIPLE_GRID_NEWS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              <div className="border-b-[3px] border-[#0b5c3a] pb-1">
                <h3 className="bg-[#0b5c3a] text-white font-extrabold px-4 py-1 rounded-t text-sm inline-block">
                  {group.category}
                </h3>
              </div>

              <div className="bg-white border border-zinc-200 rounded p-3 space-y-4 shadow-sm">
                {/* Featured item */}
                <a href={`/articles/${group.featured.slug}`} className="group block space-y-2.5">
                  <img 
                    src={group.featured.imageUrl} 
                    alt={group.featured.title} 
                    className="w-full aspect-video object-cover rounded border border-zinc-100" 
                  />
                  <h4 className="text-sm sm:text-base font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-2">
                    {group.featured.title}
                  </h4>
                </a>

                {/* List items */}
                <div className="border-t border-zinc-100 pt-3 space-y-2.5">
                  {group.list.map((item) => (
                    <a 
                      key={item.id} 
                      href={`/articles/${item.slug}`} 
                      className="group block text-xs sm:text-sm font-bold text-zinc-700 hover:text-[#cc0000] transition border-b border-zinc-50 pb-2 last:border-0 last:pb-0"
                    >
                      ▪ {item.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION 7: CATEGORY "খেলা" (SPORTS GRID) --- */}
        <div className="space-y-4 pt-4">
          <div className="border-b-[3px] border-[#0b5c3a] pb-1">
            <h2 className="bg-[#0b5c3a] text-white font-extrabold px-4 py-1.5 rounded-t text-sm sm:text-base inline-block">
              খেলাধুলা
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left Column: Big cover */}
            <div className="lg:col-span-8">
              <a 
                href={`/articles/${SPORTS_FEATURED.slug}`} 
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group h-full flex flex-col"
              >
                <img src={SPORTS_FEATURED.imageUrl} alt={SPORTS_FEATURED.title} className="aspect-[16/9] w-full object-cover" />
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <h3 className="text-lg font-extrabold text-zinc-950 group-hover:text-[#cc0000] transition leading-tight">
                    {SPORTS_FEATURED.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-2 line-clamp-2">{SPORTS_FEATURED.excerpt}</p>
                </div>
              </a>
            </div>

            {/* Right Column: List details */}
            <div className="lg:col-span-4 space-y-4">
              {SPORTS_LIST.map((item) => (
                <a 
                  key={item.id} 
                  href={`/articles/${item.slug}`} 
                  className="bg-white border border-zinc-200 rounded-xl p-3 flex gap-3 hover:shadow-md transition group items-center"
                >
                  <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded border border-zinc-100 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-3">
                    {item.title}
                  </h4>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* --- SECTION 8: CATEGORY "বিনোদন" (ENTERTAINMENT GRID) --- */}
        <div className="space-y-4 pt-4">
          <div className="border-b-[3px] border-[#0b5c3a] pb-1">
            <h2 className="bg-[#0b5c3a] text-white font-extrabold px-4 py-1.5 rounded-t text-sm sm:text-base inline-block">
              বিনোদন ও লাইফস্টাইল
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENTERTAINMENT_NEWS.map((art) => (
              <a 
                key={art.id} 
                href={`/articles/${art.slug}`} 
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group"
              >
                <img src={art.imageUrl} alt={art.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <h4 className="text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-2">{art.title}</h4>
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{art.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- SECTION 9: REGIONAL DIVISION WIDGET & BANGLADESH MAP --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-center">
          {/* Left Column: division buttons */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-1">
              <h2 className="bg-[#0b5c3a] text-white font-extrabold px-4 py-1.5 rounded-t text-sm sm:text-base inline-block">
                সারাদেশে আপনার বিভাগ
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DIVISIONS.map((div, i) => (
                <Link 
                  key={i} 
                  href={`/?division=${encodeURIComponent(div)}`}
                  className="bg-white border border-zinc-200 text-center py-3 rounded-xl font-bold hover:bg-[#0b5c3a] hover:text-white transition shadow-sm text-sm"
                >
                  {div}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Bangladesh Map design placeholder */}
          <div className="lg:col-span-4 flex justify-center bg-white border border-zinc-200 p-6 rounded-3xl shadow-sm h-full items-center">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-[#0b5c3a]">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A2 2 0 013 15.382V6m0 0l5-2.5L13 6l5-2.5 4 2v9.382a2 2 0 01-1.106 1.789L16 20l-7-4z" />
                </svg>
              </div>
              <h4 className="font-bold text-zinc-900">মানচিত্র ভিত্তিক খবর</h4>
              <p className="text-xs text-zinc-400 max-w-[200px] mx-auto">আপনার জেলার সর্বশেষ সংবাদ জানতে আমাদের সারাদেশে বিভাগে ক্লিক করুন।</p>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
