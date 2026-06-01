import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import Link from "next/link";

// Shared Article Type
type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
};

// 1. Hero Left Column: 5 articles matching the screenshot
const HERO_LEFT_NEWS: Article[] = [
  {
    id: 1,
    slug: "islami-bank-board-meeting",
    title: "আমানতকারীদের আন্দোলনের মুখে পর্ষদ সভা করতে পারেনি ইসলামী ব্যাংক",
    excerpt: "ইসলামী ব্যাংকের প্রধান কার্যালয়ে আমানতকারীদের তীব্র আন্দোলনের মুখে পর্ষদ সভা পণ্ড হয়ে গেছে।",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    slug: "market-shutdown-rules",
    title: "বিদ্যুৎ সাশ্রয়ে মার্কেট-শপিং মল বন্ধের নতুন নির্দেশনা",
    excerpt: "সারাদেশে বিদ্যুৎ ও জ্বালানি সাশ্রয় করতে রাত ৮টার পর থেকে মার্কেট ও শপিং মল বন্ধের নির্দেশনা দেওয়া হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    slug: "motijheel-islami-bank-hq",
    title: "থমথমে মতিঝিল ইসলামী ব্যাংকের প্রধান কার্যালয় এলাকা",
    excerpt: "মতিঝিলস্থ প্রধান কার্যালয় এবং সংলগ্ন এলাকায় অতিরিক্ত পুলিশ ও নিরাপত্তা বাহিনী মোতায়েন করা হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 4,
    slug: "dengue-mosquito-deaths",
    title: "ডেঙ্গুতে আরও একজনের মৃত্যু, হাসপাতালে ভর্তি ১১০ জন",
    excerpt: "দেশে ডেঙ্গু জ্বরে আক্রান্ত হয়ে আরও একজনের মৃত্যু হয়েছে এবং নতুন করে ১১০ জন হাসপাতালে ভর্তি হয়েছেন।",
    imageUrl: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 5,
    slug: "cabinet-changes-speculation",
    title: "সরানো হচ্ছে শেখ হাসিনাকে, পাঁচ মন্ত্রণালয়ে আসতে পারে নতুন মুখ",
    excerpt: "রাজনীতিতে বড় ধরনের রদবদলের গুঞ্জন উঠেছে এবং ৫টি গুরুত্বপূর্ণ মন্ত্রণালয়ে নতুন মন্ত্রী আসতে পারেন।",
    imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=150&q=80"
  }
];

// 2. Hero Center Column: 1 featured article matching the screenshot
const HERO_CENTER_NEWS: Article = {
  id: 6,
  slug: "suspended-two-public-officials",
  title: "জনপ্রশাসনে ন্যস্ত হওয়া সেই দুই কর্মকর্তাকে সাময়িক বরখাস্ত",
  excerpt: "ঢাকা: দেশব্যাপী শৃঙ্খলা ভঙ্গের ও অবহেলার অভিযোগে ঢাকা উত্তর ও দক্ষিণ সিটি কর্পোরেশনের দুই আঞ্চলিক নির্বাহী কর্মকর্তাকে তাৎক্ষণিকভাবে জনপ্রশাসন মন্ত্রণালয়ে ন্যস্ত করা হয়েছিল। এবার সেই দুই কর্মকর্তাকে জনপ্রশাসনের পক্ষ থেকে সাময়িকভাবে বরখাস্ত করা হয়েছে। সরকারের উচ্চপর্যায়ের নির্দেশে...",
  imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
};

// 3. Row 1 Triplet news matching the screenshot
const ROW_1_NEWS: Article[] = [
  {
    id: 7,
    slug: "tofail-ahmed-demise",
    title: "মারা গেছেন আওয়ামী লীগের প্রবীণ নেতা তোফায়েল আহমেদ",
    excerpt: "আওয়ামী লীগের উপদেষ্টা পরিষদের সদস্য ও প্রবীণ রাজনৈতিক নেতা তোফায়েল আহমেদ পরলোকগমন করেছেন।",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 8,
    slug: "may-remittance-growth",
    title: "মে মাসে প্রবাসী আয় এসেছে ৪২ হাজার কোটি টাকা",
    excerpt: "সদ্য সমাপ্ত মে মাসে বৈধ পথে রেকর্ড পরিমাণ রেমিট্যান্স পাঠিয়েছেন প্রবাসী বাংলাদেশিরা।",
    imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 9,
    slug: "yam-deaths-children",
    title: "যম উপদ্বীপে আরও তিন শিশুর মৃত্যু",
    excerpt: "আন্তর্জাতিক মানবিক সংকটের মধ্যে যম উপদ্বীপে অপুষ্টি ও চিকিৎসার অভাবে আরও ৩ শিশুর মৃত্যু হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=350&q=80"
  }
];

// 4. Row 2 Triplet news matching the screenshot
const ROW_2_NEWS: Article[] = [
  {
    id: 10,
    slug: "nbr-dollar-alert",
    title: "এনবিআরকে ডলার সতর্কতা",
    excerpt: "ডলার সংকট মোকাবেলায় জাতীয় রাজস্ব বোর্ডকে (এনবিআর) বিলাসবহুল আমদানিতে কঠোর নজরদারির নির্দেশ।",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 11,
    slug: "family-attack-eve-teasing",
    title: "স্কুল ছাত্রীকে উত্যক্ত, নিষেধ করায় পরিবারের উপর হামলা",
    excerpt: "বখাটেদের উত্যক্ত করার প্রতিবাদ করায় ছাত্রীর পরিবারের সদস্যদের কুপিয়ে জখম করেছে দুর্বৃত্তরা।",
    imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 12,
    slug: "central-bank-decision-unchanged",
    title: "আন্দোলনে কেন্দ্রীয় ব্যাংকের সিদ্ধান্তে পরিবর্তন হবে না: বাংলাদেশ ব্যাংক",
    excerpt: "বাংলাদেশ ব্যাংক সাফ জানিয়ে দিয়েছে যে কোনো আন্দোলনের মুখে ব্যাংকিং সংস্কারের সিদ্ধান্ত বদলানো হবে না।",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=350&q=80"
  }
];

// 5. Row 3 Triplet news matching the screenshot
const ROW_3_NEWS: Article[] = [
  {
    id: 13,
    slug: "poor-rights-preservation",
    title: "'কেউ যেন গরিবের হক নষ্ট করতে না পারে, সেদিকে লক্ষ্য রাখতে'",
    excerpt: "জনপ্রতিনিধিদের উদ্দেশে বলা হয়েছে যে সরকারি সাহায্য বিতরণ ও উন্নয়নমূলক কাজে সততা বজায় রাখতে হবে।",
    imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0af1?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 14,
    slug: "limu-tree-nursery-economy",
    title: "লিমুতে চারা উৎপাদনে গ্রামীণ অর্থনীতি, লক্ষাধিক লোকের কর্মসংস্থান",
    excerpt: "লিমু অঞ্চলে নার্সারি ও চারা চাষের মাধ্যমে গ্রামীণ অর্থনীতিতে নতুন বিপ্লব তৈরি হয়েছে।",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=350&q=80"
  },
  {
    id: 15,
    slug: "iran-ukraine-war-talks",
    title: "যুদ্ধে ইউক্রেন যুদ্ধবিরতির আলোচনা রুখতে হবে: ইরান",
    excerpt: "ইরানের পক্ষ থেকে বলা হয়েছে ইউক্রেনকে ব্যবহার করে পশ্চিমা দেশগুলোর এজেন্ডা বাস্তবায়ন প্রতিহত করা উচিত।",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=350&q=80"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] text-zinc-800 font-sans leading-normal">
      <Seo
        title="সোনালীনিউজ ডটকম | Sonalinews.com | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত নিউজ পোর্টাল"
        description="সোনালীনিউজ ডটকম একটি শীর্ষস্থানীয় সরকারি অনুমোদনপ্রাপ্ত অনলাইন বাংলা নিউজ পোর্টাল।"
        url={process.env.NEXT_PUBLIC_BASE_URL}
      />
      <Header />

      <main className="container mx-auto py-5 px-4 max-w-7xl flex-grow space-y-6">
        
        {/* --- 1. SHAHJALAL ISLAMI BANK PLC AD BANNER --- */}
        <div className="w-full bg-[#1b5e9e] border border-blue-900 overflow-hidden shadow-sm aspect-[12/1.4] flex items-center justify-between px-6 sm:px-12 select-none relative rounded">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="flex items-center gap-4 text-white">
            {/* White mock bank logo representation */}
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none">
              SIB
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-3xl tracking-tight">শাহ্‌জালাল ইসলামী ব্যাংক পিএলসি</span>
              <span className="text-[10px] sm:text-xs text-blue-100 font-medium mt-0.5">Shahjalal Islami Bank PLC – শরীয়াহ্‌ ভিত্তিক আধুনিক ব্যাংকিং</span>
            </div>
          </div>
          <div className="bg-white text-[#1b5e9e] text-xs font-bold px-4 py-2 rounded shadow hover:bg-zinc-100 transition select-none">
            বিস্তারিত জানুন
          </div>
        </div>

        {/* --- 2. MAIN FEATURE SECTION (3 COLUMNS) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* COLUMN LEFT: 5 Stacked Article List (width 3/12) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-zinc-200 rounded p-1 shadow-sm h-full flex flex-col justify-between">
              {HERO_LEFT_NEWS.map((article, index) => (
                <Link 
                  key={article.id} 
                  href={`/articles/${article.slug}`} 
                  className={`flex gap-3 group p-2.5 rounded hover:bg-zinc-50 transition items-center ${
                    index !== HERO_LEFT_NEWS.length - 1 ? "border-b border-zinc-100" : ""
                  }`}
                >
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-16 h-16 object-cover rounded border border-zinc-200 shrink-0" 
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-[#cc0000] leading-tight transition-colors line-clamp-3">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUMN CENTER: Main Featured Large Headline (width 6/12) */}
          <div className="lg:col-span-6">
            <Link 
              href={`/articles/${HERO_CENTER_NEWS.slug}`} 
              className="bg-white border border-zinc-200 rounded overflow-hidden shadow-sm hover:shadow-md transition duration-200 block group h-full flex flex-col"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 border-b border-zinc-200">
                <img 
                  src={HERO_CENTER_NEWS.imageUrl} 
                  alt={HERO_CENTER_NEWS.title} 
                  className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-[1.01]" 
                />
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h2 className="text-lg sm:text-2xl font-extrabold text-zinc-900 group-hover:text-[#cc0000] leading-snug transition-colors">
                    {HERO_CENTER_NEWS.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-4">
                    {HERO_CENTER_NEWS.excerpt}
                  </p>
                </div>
                <div className="text-xs font-bold text-[#006a4e] flex items-center gap-1 group-hover:underline">
                  সম্পূর্ণ সংবাদ পড়ুন 
                  <svg className="h-3 w-3 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* COLUMN RIGHT: Multi-Ad & Widget Sidebar (width 3/12) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Widget 1: National Life Insurance Ad */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm text-center relative select-none">
              <div className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider text-amber-400 font-bold bg-white/80 px-1 py-0.5 rounded">বিজ্ঞাপন</div>
              <div className="space-y-2">
                <span className="text-3xl font-extrabold text-[#cc0000] block tracking-tighter">৪২</span>
                <span className="text-zinc-800 text-xs font-extrabold block">বছরের দীপ্ত পথচলা</span>
                <p className="text-[10px] text-zinc-500 font-medium">ন্যাশনাল লাইফ ইনস্যুরেন্স পিএলসি</p>
              </div>
            </div>

            {/* Widget 2: Shahjalal Bank Blue Widget */}
            <div className="bg-gradient-to-br from-[#1b5e9e] to-indigo-900 border border-blue-900 text-white rounded-xl p-5 shadow-sm text-center relative select-none flex flex-col justify-between h-40">
              <div className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider text-blue-300 font-bold bg-black/20 px-1 py-0.5 rounded">বিজ্ঞাপন</div>
              <span className="text-3xl font-black tracking-tight block">২৩</span>
              <span className="text-xs font-bold block mt-1">সাফল্যের ২৩তম বছর</span>
              <p className="text-[9px] text-blue-200 font-medium mt-1">শাহ্‌জালাল ইসলামী ব্যাংক পিএলসি</p>
            </div>

            {/* Widget 3: ZHSU Ad Red */}
            <div className="bg-red-600 text-white border border-red-800 rounded-xl p-4 shadow-sm text-center select-none">
              <span className="text-xs font-black tracking-wider uppercase block">ZHSU University</span>
              <span className="text-[10px] font-bold text-yellow-300 uppercase block tracking-widest mt-1">ADMISSION GOING ON</span>
            </div>

            {/* Widget 4: OSMO Ad Blue */}
            <div className="bg-sky-50 border border-sky-200 text-sky-950 rounded-xl p-4 shadow-sm text-center select-none space-y-1">
              <span className="text-xs font-extrabold text-[#1b5e9e] block">OSMO WATER PURIFIER</span>
              <span className="text-[9px] text-zinc-500 font-medium block">পানি সংক্রান্ত সকল সমস্যার সমাধান</span>
              <span className="text-[10px] font-bold text-[#cc0000] block mt-1">HOTLINE: 01896047236</span>
            </div>

            {/* Widget 5: Latest & Popular Tabs Grid */}
            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden select-none">
              <div className="flex text-center border-b border-zinc-100 font-extrabold text-xs">
                <span className="w-1/2 py-2.5 bg-[#0b5c3a] text-white cursor-pointer">সর্বশেষ</span>
                <span className="w-1/2 py-2.5 bg-zinc-50 text-zinc-500 hover:text-zinc-950 cursor-pointer">জনপ্রিয়</span>
              </div>
              <div className="p-3 space-y-2 max-h-40 overflow-y-auto pr-1">
                <Link href="#" className="block text-[11px] font-bold text-zinc-800 hover:text-[#cc0000] transition line-clamp-2 pb-1.5 border-b border-zinc-50">
                  ▪ আমানতকারীদের আন্দোলনের মুখে ইসলামী ব্যাংকের পর্ষদ সভা পণ্ড
                </Link>
                <Link href="#" className="block text-[11px] font-bold text-zinc-800 hover:text-[#cc0000] transition line-clamp-2">
                  ▪ বিদ্যুৎ সাশ্রয়ে মার্কেট-শপিং মল বন্ধের নতুন কঠোর নির্দেশনা
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* --- 3. TRIPLETS GRID - ROW 1 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
          {ROW_1_NEWS.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`} 
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col"
            >
              <img src={article.imageUrl} alt={article.title} className="aspect-video w-full object-cover border-b border-zinc-100" />
              <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-2 leading-snug">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* --- 4. TRIPLETS GRID - ROW 2 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROW_2_NEWS.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`} 
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col"
            >
              <img src={article.imageUrl} alt={article.title} className="aspect-video w-full object-cover border-b border-zinc-100" />
              <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-2 leading-snug">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* --- 5. TRIPLETS GRID - ROW 3 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROW_3_NEWS.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.slug}`} 
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col"
            >
              <img src={article.imageUrl} alt={article.title} className="aspect-video w-full object-cover border-b border-zinc-100" />
              <div className="p-4 flex-grow flex flex-col justify-between space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] transition line-clamp-2 leading-snug">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* --- 6. FOOTER DUAL BANNER AD (AT THE BOTTOM OF FEATURE SECTION) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          {/* Sonali Paper & Board Mills Ad */}
          <div className="bg-[#f0f0f2] border border-zinc-200 rounded-xl p-4 flex items-center justify-between shadow-sm select-none h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-400 flex items-center justify-center font-bold text-white text-xs select-none">SP</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm text-zinc-800 leading-tight">Sonali Paper & Board Mills Limited</span>
                <span className="text-[9px] text-zinc-400 font-semibold mt-0.5">Price Sensitive Information</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold bg-white px-1.5 py-0.5 rounded shadow-sm border border-zinc-100">AD</span>
          </div>

          {/* Shahjalal Equity Management Ad */}
          <div className="bg-[#0b5c3a] border border-emerald-800 rounded-xl p-4 flex items-center justify-between shadow-sm select-none text-white h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-[#0b5c3a] text-xs select-none">SE</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm leading-tight">Shahjalal Equity Management Limited</span>
                <span className="text-[9px] text-emerald-200 font-medium mt-0.5">Full Hedged Merchant Bank</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-emerald-300 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-emerald-700/50">AD</span>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
