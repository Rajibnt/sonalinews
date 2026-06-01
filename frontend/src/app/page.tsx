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
  label?: string;
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

// --- 6. CATEGORIES TRIPLE COLUMN SECTION (জাতীয় | রাজনীতি | আন্তর্জাতিক) ---
const CAT_NATIONAL_FEATURED: Article = {
  id: 16,
  slug: "public-administration-suspended",
  title: "জনপ্রশাসনে ন্যস্ত হওয়া সেই দুই কর্মকর্তাকে সাময়িক বরখাস্ত",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
};

const CAT_NATIONAL_LIST: Article[] = [
  {
    id: 17,
    slug: "libya-return-bangladeshis",
    title: "লিবিয়া থেকে ফেরানো হলো আরও ১৭৪ বাংলাদেশিকে",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 18,
    slug: "fuel-price-hike-reasons",
    title: "জ্বালানি তেলের দাম বাড়ানোর কারণ জানালেন তথ্যমন্ত্রী",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 19,
    slug: "child-deaths-investigation-report",
    title: "৬ শিশুর মৃত্যুর ঘটনায় ৩ দিনের মধ্যে তদন্ত প্রতিবেদন: স্বাস্থ্যমন্ত্রী",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1521791136368-1a46827d0af1?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 20,
    slug: "cht-minister-resignation",
    title: "পদত্যাগ করলেন পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রী",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

const CAT_POLITICS_FEATURED: Article = {
  id: 21,
  slug: "rabik-cabinet-reshuffle",
  title: "সরানো হচ্ছে শেখ রবিককে, পাঁচ মন্ত্রণালয়ে আসতে পারে নতুন মুখ",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1555848962-6e79363ec18f?auto=format&fit=crop&w=400&q=80"
};

const CAT_POLITICS_LIST: Article[] = [
  {
    id: 22,
    slug: "tofail-ahmed-senior-leader",
    title: "মারা গেছেন আওয়ামী লীগের বর্ষীয়ান নেতা তোফায়েল আহমেদ",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 23,
    slug: "jamaat-chief-fuel-price",
    title: "জ্বালানি তেলের দাম বৃদ্ধিকে ধোঁকাবাজি বললেন জামায়াত আমির",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 24,
    slug: "rizvi-jamaat-refugees",
    title: "অনেক গুন্ডা চাঁদাবাজও জামায়াতে আশ্রয় নিয়েছে: রিজভী",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 25,
    slug: "hasina-letter-un-challenge",
    title: "জাতিসংঘকে চ্যালেঞ্জ করে শেখ হাসিনার চিঠি",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=150&q=80"
  }
];

const CAT_INT_FEATURED: Article = {
  id: 26,
  slug: "lebanon-ceasefire-accord-iran",
  title: "চুক্তিতে লেবানন যুদ্ধবিরতির বাস্তবায়ন থাকতে হবে: ইরান",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80"
};

const CAT_INT_LIST: Article[] = [
  {
    id: 27,
    slug: "gold-price-drop-global",
    title: "দাম কমেছে স্বর্ণের",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 28,
    slug: "myanmar-blast-casualties",
    title: "মিয়ানমারে ভয়াবহ বিস্ফোরণে নিহত ৫৫, আহত বহু মানুষ",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 29,
    slug: "trump-nuclear-weapons-iran",
    title: "ইরান পারমাণবিক অস্ত্র তৈরি করবে না: ট্রাম্প",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1540747737956-37872f767104?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 30,
    slug: "us-drone-shot-iran",
    title: "মার্কিন ড্রোন ভূপাতিতের দাবি ইরানের",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=150&q=80"
  }
];

// --- 8. THIRD SECTION ECONOMY & DIALOGUE DATA ---
const CAT_ECONOMY_LIST: Article[] = [
  {
    id: 31,
    slug: "islami-bank-movement-halted",
    title: "আমানতকারীদের আন্দোলনের মুখে পর্ষদ সভা করতে পারেনি ইসলামী ব্যাংক",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 32,
    slug: "market-shutdown-rules-power",
    title: "বিদ্যুৎ সাশ্রয়ে মার্কেট-শপিং মল বন্ধের নতুন নির্দেশনা",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 33,
    slug: "nbr-critical-dollar-alert",
    title: "এনবিআরের জরুরি সতর্কতা",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 34,
    slug: "motijheel-police-crowd-bank",
    title: "থমথমে মতিঝিল ইসলামী ব্যাংকের প্রধান কার্যালয় এলাকা",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=150&q=80"
  }
];

const CAT_INTERVIEW_LIST = [
  {
    id: 35,
    slug: "bankassurance-insurance-comp",
    title: "ব্যাংকাসুরেন্স বীমা খাতে প্রতিযোগিতা বাড়িয়ে গ্রাহকসেবার মান উন্নত করবে",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80",
    label: ""
  },
  {
    id: 36,
    slug: "mirza-fakhrul-neutral-government",
    title: "সরকার নিরপেক্ষ থাকতে না পারলে নিরপেক্ষ সরকারের",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    label: "মির্জা ফখরুল"
  }
];

// --- 9. SPORTS SECTION (খেলাধুলা) DATA matching the screenshot
const SPORTS_TOP_1: Article = {
  id: 37,
  slug: "youtube-worldcup-free-broadcast",
  title: "ইউটিউবে বিনামূল্যে দেখা যাবে বিশ্বকাপ ফুটবল",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=500&q=80"
};

const SPORTS_TOP_2: Article = {
  id: 38,
  slug: "ipl-final-bengaluru-kohli",
  title: "আইপিএল ফাইনালে বেঙ্গালুরু ও কোহলির যত কীর্তি",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=500&q=80"
};

const SPORTS_BOTTOM_LIST: Article[] = [
  {
    id: 39,
    slug: "brazil-beat-panama-no-neymar",
    title: "নেইমারকে ছাড়াই পানামাকে উড়িয়ে দিল ব্রাজিল",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 40,
    slug: "psg-violence-celebrations",
    title: "পিএসজির বিজয়-উন্মাদনা রূপ নিল সহিংসতায়, গ্রেপ্তার ৪ শতাধিক",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1540747737956-37872f767104?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 41,
    slug: "psg-champion-arsenal-shootout",
    title: "টাইব্রেকারে আর্সেনালের স্বপ্ন ভেঙে চ্যাম্পিয়ন পিএসজি",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 42,
    slug: "egypt-worldcup-team-salah",
    title: "সালাহ্‌র নেতৃত্বে মিশরের বিশ্বকাপ দল ঘোষণা",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=300&q=80"
  }
];

// --- 10. OPINION SECTION (মুক্তমত) DATA matching the screenshot
const OPINION_FEATURED: Article = {
  id: 43,
  slug: "child-imprisonment-responsibility",
  title: "দুধের শিশুর কারাদণ্ড, দায় কার?",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80"
};

const OPINION_LIST_ITEM = {
  id: 44,
  slug: "islamic-sukuk-guidelines",
  title: "শরিয়াহভিত্তিক সরকারি সুকুক: নতুন বিনিয়োগকারীর জন্য গাইডলাইন",
  excerpt: ""
};

// --- 11. FIFTH SECTION (সোনালী বিশেষ | আদালত | রাজধানী) DATA matching the screenshot
const CAT_SPECIAL_FEATURED: Article = {
  id: 45,
  slug: "shahjalal-bank-mosleh-uddin",
  title: "২৫ বছরের ইতিহাসে খুব ভালো অবস্থায় শাহজালাল ইসলামী ব্যাংক: মোসলেহ্‌ উদ্দিন আহমেদ",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
};

const CAT_SPECIAL_LIST: Article[] = [
  {
    id: 46,
    slug: "sujon-miah-dreaming",
    title: "সংগ্রামের শহরে স্বপ্ন বুনছেন সুজন মিয়া",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 47,
    slug: "measles-vaccine-risk",
    title: "হামের টিকা বন্ধনা ও অপুষ্টিতে বাড়ছে মৃত্যু ঝুঁকি",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 48,
    slug: "jamaat-deputy-speaker-role",
    title: "জুলাই সনদের রূপরেখা ছাড়া ডেপুটি স্পিকার পদ নেবে না জামায়াত",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 49,
    slug: "broiler-chicken-fish-market",
    title: "মাছ-মাংসের বাজার স্থিতিশীল, কিছুটা কমেছে ব্রয়লার দাম",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=150&q=80"
  }
];

const CAT_COURT_FEATURED: Article = {
  id: 50,
  slug: "ramisa-murder-dollar",
  title: "রামিসা হত্যা: কে এই ডলার?",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80"
};

const CAT_COURT_LIST: Article[] = [
  {
    id: 51,
    slug: "sohel-statement-rape-dollar",
    title: "আমি ধর্ষণ করছি, রামিসাকে মারছে ডলার: সোহেল",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 52,
    slug: "sohel-claims-dollar-beat",
    title: "‘আমি শুধু ধর্ষণ করছি, মারছে ডলার’, দাবি সোহেলের",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 53,
    slug: "ramisa-trial-tuesday-start",
    title: "রামিসা ধর্ষণ-হত্যা: সোহেল ও তার স্ত্রীর বিচার শুরু, সাক্ষ্যগ্রহণ মঙ্গলবার",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 54,
    slug: "ramisa-murder-charge-hearing",
    title: "রামিসা হত্যা মামলায় চার্জ গঠনের শুনানি আজ",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  }
];

const CAT_CAPITAL_FEATURED: Article = {
  id: 55,
  slug: "islami-bank-police-conflict",
  title: "ইসলামী ব্যাংকের সামনে গ্রাহক-পুলিশ সংঘর্ষ",
  excerpt: "",
  imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&q=80",
  label: "মতিঝিলে রণক্ষেত্র"
};

const CAT_CAPITAL_LIST: Article[] = [
  {
    id: 56,
    slug: "holiday-return-dhaka-crowd",
    title: "ছুটি কাটিয়ে স্বস্তিতে ঢাকায় ফিরছে মানুষ",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 57,
    slug: "ad-din-medical-bakery-minister",
    title: "আদ-দ্বীন মেডিকেলের ছাদে বেকারি, ক্ষোভ স্বাস্থ্যমন্ত্রীর",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 58,
    slug: "zoo-donald-trump-care",
    title: "চিড়িয়াখানায় বিশেষ পরিচর্যায় ‘ডোনাল্ড ট্রাম্প’",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 59,
    slug: "dscc-administrator-showcause",
    title: "কিছু কর্মীকে শোকজ করা হয়েছে: ডিএসসিসি প্রশাসক",
    excerpt: "",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=150&q=80"
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
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none">
              SIB
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-3xl tracking-tight">शाह्जालाल इस्लामी ব্যাংক পিএলসি</span>
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
              <div className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider text-amber-400 font-bold bg-white/80 px-1.5 py-0.5 rounded">বিজ্ঞাপন</div>
              <div className="space-y-2">
                <span className="text-3xl font-extrabold text-[#cc0000] block tracking-tighter">৪২</span>
                <span className="text-zinc-800 text-xs font-extrabold block">বছরের দীপ্ত পথচলা</span>
                <p className="text-[10px] text-zinc-500 font-medium">ন্যাশনাল লাইফ ইনস্যুরেন্স পিএলসি</p>
              </div>
            </div>

            {/* Widget 2: Shahjalal Bank Blue Widget */}
            <div className="bg-gradient-to-br from-[#1b5e9e] to-indigo-900 border border-blue-900 text-white rounded-xl p-5 shadow-sm text-center relative select-none flex flex-col justify-between h-40">
              <div className="absolute top-1.5 right-1.5 text-[8px] uppercase tracking-wider text-blue-300 font-bold bg-black/20 px-1.5 py-0.5 rounded">বিজ্ঞাপন</div>
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

          <div className="bg-[#0b5c3a] border border-emerald-800 rounded-xl p-4 flex items-center justify-between shadow-sm select-none text-white h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-[#0b5c3a] text-xs select-none">SE</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm leading-tight text-white">Shahjalal Equity Management Limited</span>
                <span className="text-[9px] text-emerald-200 font-medium mt-0.5">Full Hedged Merchant Bank</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-emerald-300 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-emerald-700/50">AD</span>
          </div>
        </div>

        {/* --- 7. DYNAMIC CATEGORIES SECTION (জাতীয় | রাজনীতি | আন্তর্জাতিক) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
          
          {/* Column 1: জাতীয় (National) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                জাতীয়
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              <Link href={`/articles/${CAT_NATIONAL_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[4/3] w-full">
                <img src={CAT_NATIONAL_FEATURED.imageUrl} alt={CAT_NATIONAL_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {CAT_NATIONAL_FEATURED.title}
                  </h4>
                </div>
              </Link>
              <div className="space-y-3 pt-2">
                {CAT_NATIONAL_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-2 ${
                      index !== CAT_NATIONAL_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: রাজনীতি (Politics) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                রাজনীতি
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              <Link href={`/articles/${CAT_POLITICS_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[4/3] w-full">
                <img src={CAT_POLITICS_FEATURED.imageUrl} alt={CAT_POLITICS_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {CAT_POLITICS_FEATURED.title}
                  </h4>
                </div>
              </Link>
              <div className="space-y-3 pt-2">
                {CAT_POLITICS_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-2 ${
                      index !== CAT_POLITICS_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: আন্তর্জাতিক (International) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                আন্তর্জাতিক
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              <Link href={`/articles/${CAT_INT_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[4/3] w-full">
                <img src={CAT_INT_FEATURED.imageUrl} alt={CAT_INT_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {CAT_INT_FEATURED.title}
                  </h4>
                </div>
              </Link>
              <div className="space-y-3 pt-2">
                {CAT_INT_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-2 ${
                      index !== CAT_INT_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* --- 8. BOTTOM AD DUAL BANNER (UNDER CATEGORIES) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          <div className="bg-[#eef2f7] border border-zinc-200 rounded-xl p-4 flex items-center justify-between shadow-sm select-none h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b5e9e] flex items-center justify-center font-black text-white text-xs select-none">GFA</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm text-zinc-950 leading-tight">Galaxy Flying Academy</span>
                <span className="text-[9px] text-[#cc0000] font-black mt-0.5 uppercase tracking-widest">ADMISSION GOING ON</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold bg-white px-1.5 py-0.5 rounded border border-zinc-100">AD</span>
          </div>

          <div className="bg-[#78b73e] border border-emerald-600 rounded-xl p-4 flex items-center justify-between shadow-sm select-none text-white h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-bold text-[#78b73e] text-xs select-none">ST</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm leading-tight text-white">বাজারে এলো মনকাড়া ডিজাইনের সোনালী টিস্যু</span>
                <span className="text-[9px] text-green-100 font-medium mt-0.5">সবচেয়ে নরম এবং শক্তিশালী প্রিমিয়াম টিস্যু</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-emerald-100 font-bold bg-black/20 px-1.5 py-0.5 rounded border border-emerald-700/50">AD</span>
          </div>
        </div>

        {/* --- 9. THIRD GRID SECTION (অর্থনীতি | শেয়ার বাজার | সাক্ষাৎকার) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
          
          {/* Column 1: অর্থনীতি (Economy) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                অর্থনীতি
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                {CAT_ECONOMY_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-3.5 ${
                      index !== CAT_ECONOMY_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <div className="w-16 h-12 bg-zinc-50 border border-zinc-100 rounded flex items-center justify-center shrink-0 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-3">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: শেয়ার বাজার (Share Market 2x2 Grid) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                শেয়ার বাজার
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#fcfcfc] border border-zinc-200 rounded-xl shadow-sm flex flex-col justify-between overflow-hidden select-none text-[9px] font-bold">
                <div className="bg-[#1b5e9e] text-white text-center py-1.5 font-bold text-[8px] tracking-wide border-b border-blue-900">
                  Last update on Jun 01, 2026 at 2:30 PM
                </div>
                <div className="px-2 py-1 space-y-1 text-[8px]">
                  <div className="flex justify-between border-b border-zinc-100 pb-0.5 items-center">
                    <span className="text-zinc-600">DSEX Index</span>
                    <span className="text-zinc-800 font-extrabold">6372.63439</span>
                    <span className="text-emerald-600 font-extrabold flex items-center">38.78475 🟩</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-0.5 items-center">
                    <span className="text-zinc-600">DSES Index</span>
                    <span className="text-zinc-800 font-extrabold">1366.41505</span>
                    <span className="text-emerald-600 font-extrabold flex items-center">4.92822 🟩</span>
                  </div>
                  <div className="flex justify-between pb-0.5 items-center">
                    <span className="text-zinc-600">DS30 Index</span>
                    <span className="text-zinc-800 font-extrabold">2044.59769</span>
                    <span className="text-emerald-600 font-extrabold flex items-center">13.70808 🟩</span>
                  </div>
                </div>
                <div className="bg-sky-50/50 border-y border-zinc-100 py-1 text-[7px] text-zinc-500 flex justify-between px-2 font-semibold">
                  <span>Trade: 227730</span>
                  <span>Volume: 328m</span>
                  <span>Value: 9123m</span>
                </div>
                <div className="bg-zinc-50 py-1 text-[7px] text-zinc-400 flex justify-between px-2 font-semibold border-b border-zinc-100">
                  <span className="text-emerald-600">Adv: 179</span>
                  <span className="text-rose-600">Dec: 162</span>
                  <span>Unch: 55</span>
                </div>
                <div className="p-2 space-y-1">
                  <div className="text-[#cc0000] text-[8px] font-black uppercase tracking-wider block">
                    ঈদ পরবর্তী প্রথম কার্যদিবস
                  </div>
                  <h5 className="text-[9px] font-black text-zinc-950 hover:text-[#cc0000] leading-tight">
                    শেয়ারবাজারে বেড়েছে সূচক ও লেনদেন
                  </h5>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group">
                <div className="bg-[#fafafa] border-b border-zinc-100 py-4 flex flex-col justify-center items-center h-20 shrink-0 select-none">
                  <div className="w-8 h-8 rounded-full border border-red-500 flex items-center justify-center font-black text-[#cc0000] text-sm bg-white shadow-sm">M</div>
                  <span className="text-[7px] font-extrabold text-zinc-400 mt-1 uppercase tracking-wider">Maksons Spinning</span>
                </div>
                <div className="p-2 flex-grow flex items-center justify-center bg-white">
                  <h5 className="text-[9px] font-black text-zinc-950 hover:text-[#cc0000] leading-tight group-hover:underline transition line-clamp-3">
                    অর্থনৈতিক অঞ্চলের ১০ একর শিল্প প্লট ছাড়ছে ম্যাকসন্স স্পিনিং
                  </h5>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group">
                <div className="bg-[#fafafa] border-b border-zinc-100 py-4 flex flex-col justify-center items-center h-20 shrink-0 select-none">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center font-black text-amber-500 text-sm border border-amber-200 shadow-sm">🍁</div>
                  <span className="text-[7px] font-extrabold text-zinc-400 mt-1 uppercase tracking-wider">BAT Bangladesh</span>
                </div>
                <div className="p-2 flex-grow flex items-center justify-center bg-white">
                  <h5 className="text-[9px] font-black text-zinc-950 hover:text-[#cc0000] leading-tight group-hover:underline transition line-clamp-3">
                    ৩০ বিলিয়ন ডলারের জালিয়াতি ও পাচারের অভিযোগে বিএটিবির বিরুদ্ধে অনুসন্ধান
                  </h5>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between group">
                <div className="bg-zinc-200 border-b border-zinc-100 h-20 shrink-0 overflow-hidden relative select-none">
                  <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=150&q=80" alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="p-2 flex-grow flex items-center justify-center bg-white">
                  <h5 className="text-[9px] font-black text-zinc-950 hover:text-[#cc0000] leading-tight group-hover:underline transition line-clamp-3">
                    Monday to bank and stock market start holiday
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: সাক্ষাৎকার (Interview List & Megaphone Blue Ad) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                সাক্ষাৎকার
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              
              <div className="space-y-3.5">
                {CAT_INTERVIEW_LIST.map((item, idx) => (
                  <Link 
                    key={item.id}
                    href={`/articles/${item.slug}`}
                    className={`flex gap-3 group items-center py-2 ${
                      idx !== CAT_INTERVIEW_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-full object-cover border border-zinc-200 shrink-0 shadow-sm" />
                    <div className="space-y-0.5">
                      {item.label && (
                        <span className="text-[9px] font-black text-[#cc0000] block">{item.label}</span>
                      )}
                      <h5 className="text-xs font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                        {item.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="bg-gradient-to-b from-[#0b3c5d] to-[#0a2f4a] border border-[#092438] text-white rounded-xl p-5 text-center select-none shadow-md aspect-[300/215] flex flex-col justify-center items-center gap-1.5 relative overflow-hidden my-1">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 text-white/10 w-16 h-16 flex items-center justify-center rotate-[15deg]">
                  <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                </div>
                <div className="text-[8px] uppercase tracking-wider text-sky-300/80 font-extrabold">Space for Advertisement</div>
                <h4 className="font-extrabold text-sm sm:text-base text-white tracking-wide uppercase">Ad size 300X220px</h4>
                <div className="text-[10px] text-sky-200/60 font-semibold mt-1">০১৭০০৯২২৫৫৭</div>
              </div>

            </div>
          </div>

        </div>

        {/* --- 10. FOURTH SECTION: SPORTS & OPINION (খেলা | মুক্তমত) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-zinc-200">
          
          {/* Column A (Left): খেলা (Sports - Grid of 6 items) spanning 9/12 */}
          <div className="lg:col-span-9 space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                খেলা
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href={`/articles/${SPORTS_TOP_1.slug}`} className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100">
                    <img src={SPORTS_TOP_1.imageUrl} alt={SPORTS_TOP_1.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] leading-snug transition-colors line-clamp-2">
                      {SPORTS_TOP_1.title}
                    </h4>
                  </div>
                </Link>

                <Link href={`/articles/${SPORTS_TOP_2.slug}`} className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col">
                  <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100">
                    <img src={SPORTS_TOP_2.imageUrl} alt={SPORTS_TOP_2.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-950 group-hover:text-[#cc0000] leading-snug transition-colors line-clamp-2">
                      {SPORTS_TOP_2.title}
                    </h4>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SPORTS_BOTTOM_LIST.map((item) => (
                  <Link key={item.id} href={`/articles/${item.slug}`} className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                    </div>
                    <div className="p-2 flex-grow flex items-center justify-center">
                      <h5 className="text-[11px] sm:text-xs font-bold text-zinc-900 group-hover:text-[#cc0000] leading-snug text-center transition-colors line-clamp-3">
                        {item.title}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column B (Right): মুক্তমত (Opinion) & Megaphone/Device Ad Widget spanning 3/12 */}
          <div className="lg:col-span-3 space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                মুক্তমত
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              
              <Link href={`/articles/${OPINION_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[4/3] w-full">
                <img src={OPINION_FEATURED.imageUrl} alt={OPINION_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {OPINION_FEATURED.title}
                  </h4>
                </div>
              </Link>

              <div className="border-t border-zinc-100 pt-3">
                <Link href={`/articles/${OPINION_LIST_ITEM.slug}`} className="group block text-xs sm:text-sm font-bold text-zinc-800 hover:text-[#cc0000] leading-snug transition">
                  ▪ {OPINION_LIST_ITEM.title}
                </Link>
              </div>

              <div className="bg-gradient-to-b from-[#06182c] to-[#0a2644] border border-[#041121] text-white rounded-xl p-5 text-center select-none shadow-md aspect-[300/215] flex flex-col justify-center items-center gap-1.5 relative overflow-hidden my-1">
                <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 text-sky-400/25 w-14 h-14 flex items-center justify-center rotate-[15deg]">
                  <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                </div>
                <div className="absolute bottom-1 right-2 w-14 h-10 border border-zinc-700/50 rounded bg-zinc-800/40 p-0.5 hidden sm:flex flex-col justify-between items-center shadow-inner">
                  <div className="w-12 h-6 border border-zinc-600/30 rounded bg-sky-400/10 flex items-center justify-center text-[5px] font-black text-sky-400 tracking-tighter">
                    YOUR AD
                  </div>
                  <div className="w-14 h-1 bg-zinc-600 rounded-b"></div>
                </div>
                <div className="text-[8px] uppercase tracking-wider text-sky-300 font-extrabold">Space for Advertisement</div>
                <h4 className="font-extrabold text-sm sm:text-base text-white tracking-wide uppercase">Ad size 300X220px</h4>
                <div className="text-[10px] text-sky-200/60 font-semibold mt-1">০১৭০০৯২২৫৫৭</div>
              </div>

            </div>
          </div>

        </div>

        {/* --- 11. BOTTOM DUAL AD BANNER (UNDER SPORTS & OPINION) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
          <div className="bg-[#b3b3df]/40 border border-zinc-200 rounded-xl p-4 flex items-center justify-between shadow-sm select-none h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1b5e9e] flex items-center justify-center font-black text-white text-xs select-none">GFA</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm text-[#1b5e9e] leading-tight">Galaxy Flying Academy</span>
                <span className="text-[9px] text-[#cc0000] font-black mt-0.5 uppercase tracking-widest">REAL PILOT SCHOOL</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-zinc-400 font-bold bg-white px-1.5 py-0.5 rounded border border-zinc-100">AD</span>
          </div>

          <div className="bg-[#c2e2e8]/40 border border-cyan-200 rounded-xl p-4 flex items-center justify-between shadow-sm select-none text-cyan-950 h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#006a4e] flex items-center justify-center font-bold text-white text-xs select-none">FG</div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xs sm:text-sm leading-tight text-zinc-900">Fly Galaxy Travels & Tours</span>
                <span className="text-[9px] text-[#1b5e9e] font-bold mt-0.5">Domestic & International Air Ticket</span>
              </div>
            </div>
            <span className="text-[8px] uppercase tracking-wider text-cyan-700 font-bold bg-white px-1.5 py-0.5 rounded border border-cyan-100">AD</span>
          </div>
        </div>

        {/* --- 12. FIFTH GRID SECTION (সোনালী বিশেষ | আদালত | রাজধানী) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
          
          {/* Column 1: সোনালী বিশেষ (Sonali Special) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                সোনালী বিশেষ
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              {/* Featured overlay card */}
              <Link href={`/articles/${CAT_SPECIAL_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[16/10] w-full">
                <img src={CAT_SPECIAL_FEATURED.imageUrl} alt={CAT_SPECIAL_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {CAT_SPECIAL_FEATURED.title}
                  </h4>
                </div>
              </Link>
              {/* List stacked */}
              <div className="space-y-3 pt-2">
                {CAT_SPECIAL_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-2 ${
                      index !== CAT_SPECIAL_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: আদালত (Court) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                আদালত
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              {/* Featured overlay card */}
              <Link href={`/articles/${CAT_COURT_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[16/10] w-full">
                <img src={CAT_COURT_FEATURED.imageUrl} alt={CAT_COURT_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {CAT_COURT_FEATURED.title}
                  </h4>
                </div>
              </Link>
              {/* List stacked */}
              <div className="space-y-3 pt-2">
                {CAT_COURT_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-2 ${
                      index !== CAT_COURT_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: রাজধানী (Capital) */}
          <div className="space-y-4">
            <div className="border-b-[3px] border-[#0b5c3a] pb-0 relative">
              <div className="bg-[#0b5c3a] text-white font-extrabold px-6 py-2 text-sm select-none relative inline-block rounded-t"
                   style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}>
                রাজধানী
              </div>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-4 shadow-sm flex flex-col justify-between">
              {/* Featured overlay card with red label above headline */}
              <Link href={`/articles/${CAT_CAPITAL_FEATURED.slug}`} className="group block relative overflow-hidden rounded-xl border border-zinc-100 aspect-[16/10] w-full">
                <img src={CAT_CAPITAL_FEATURED.imageUrl} alt={CAT_CAPITAL_FEATURED.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-4">
                  {CAT_CAPITAL_FEATURED.label && (
                    <span className="text-[9px] font-black text-rose-500 block mb-0.5 tracking-wide select-none">{CAT_CAPITAL_FEATURED.label}</span>
                  )}
                  <h4 className="text-xs sm:text-sm font-extrabold text-white group-hover:text-amber-300 leading-snug transition line-clamp-2">
                    {CAT_CAPITAL_FEATURED.title}
                  </h4>
                </div>
              </Link>
              {/* List stacked */}
              <div className="space-y-3 pt-2">
                {CAT_CAPITAL_LIST.map((item, index) => (
                  <Link 
                    key={item.id} 
                    href={`/articles/${item.slug}`} 
                    className={`flex gap-3 group items-center py-2 ${
                      index !== CAT_CAPITAL_LIST.length - 1 ? "border-b border-zinc-100" : ""
                    }`}
                  >
                    <img src={item.imageUrl} alt={item.title} className="w-14 h-11 object-cover rounded border border-zinc-200 shrink-0" />
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-800 group-hover:text-[#cc0000] leading-snug transition line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
