import Link from "next/link";

export default function Footer() {
  const sponsors = [
    { name: "Shahjalal Islami Bank", short: "SJIBL" },
    { name: "Global Islami Bank", short: "GIB" },
    { name: "Union Bank Limited", short: "UBL" },
    { name: "First Security Islami Bank", short: "FSIBL" },
    { name: "Social Islami Bank Limited", short: "SIBL" },
    { name: "Standard Bank Limited", short: "SBL" },
    { name: "NRB Commercial Bank", short: "NRBC" },
    { name: "Islami Bank Bangladesh", short: "IBBL" }
  ];

  return (
    <footer className="bg-white border-t border-zinc-200 w-full select-none text-zinc-700 mt-auto">
      {/* 1. Sponsor Banking Logo Grid Section matching Sonalinews scroll */}
      <div className="bg-[#fcfcfc] border-b border-zinc-200 py-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">আমাদের সম্মানিত পার্টনার ও স্পন্সরসমূহ</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {sponsors.map((sp, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-zinc-200/80 rounded-lg p-3 text-center flex flex-col justify-center items-center h-14 hover:border-zinc-300 hover:shadow-sm transition select-none cursor-pointer"
              >
                <span className="text-xs font-black tracking-tight text-zinc-800 uppercase">{sp.short}</span>
                <span className="text-[8px] text-zinc-400 font-medium truncate w-full">{sp.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Detailed Contact, Editor, and Approval Section */}
      <div className="bg-white py-10 px-4 border-b border-zinc-100">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-zinc-600">
          {/* Logo, tagline and government approval details */}
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-sans text-3xl font-extrabold tracking-tighter text-[#cc0000] flex items-center">
                S
                <span className="inline-block relative w-6 h-6 mx-0.5 rounded-full border-2 border-[#006a4e] flex items-center justify-center bg-white overflow-hidden shadow-inner">
                  <span className="absolute w-full h-0.5 bg-[#006a4e]"></span>
                  <span className="absolute w-0.5 h-full bg-[#006a4e]"></span>
                </span>
                nali
              </span>
              <span className="font-sans text-3xl font-extrabold tracking-tighter text-[#006a4e] ml-0.5">
                News
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত একটি শীর্ষস্থানীয় দৈনিক অনলাইন নিউজ পোর্টাল। বস্তুনিষ্ঠ ও দ্রুত সংবাদ প্রকাশে আমরা অঙ্গীকারাবদ্ধ।
            </p>
            <div className="text-[11px] text-zinc-500 font-medium space-y-1">
              <p>রেজিস্ট্রেশন নম্বর: ১০০৫/বিডি</p>
              <p>সম্পাদক ও প্রকাশক: রাজিব আহমেদ</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-950 border-b border-zinc-200 pb-2 text-xs uppercase tracking-wider">গুরুত্বপূর্ণ লিঙ্ক</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link href="/" className="hover:text-[#cc0000] transition">জাতীয় খবর</Link>
              <Link href="/" className="hover:text-[#cc0000] transition">রাজনীতি</Link>
              <Link href="/" className="hover:text-[#cc0000] transition">অর্থনীতি</Link>
              <Link href="/" className="hover:text-[#cc0000] transition">সারাদেশ</Link>
              <Link href="/admin" className="hover:text-[#cc0000] transition text-emerald-700">অ্যাডমিন এডিটর</Link>
              <Link href="/" className="hover:text-[#cc0000] transition">বিজ্ঞাপন ট্যারিফ</Link>
            </div>
          </div>

          {/* Office Address & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-zinc-950 border-b border-zinc-200 pb-2 text-xs uppercase tracking-wider">প্রধান কার্যালয়</h4>
            <p className="text-xs leading-relaxed">
              মতিঝিল বাণিজ্যিক এলাকা, ঢাকা-১০০০, বাংলাদেশ।
            </p>
            <div className="text-[11px] text-zinc-500 space-y-1">
              <p>ইমেইল: info@sonalinews.com</p>
              <p>ফোন: +৮৮০ ২-৯৫৫৫৬৬, +৮৮০ ১৭০০০০০০০০</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Minimal Copyright Block */}
      <div className="bg-[#f5f5f5] py-4 text-center text-xs text-zinc-500 font-medium">
        <div className="container mx-auto px-4 max-w-7xl">
          &copy; {new Date().getFullYear()} সোনালীনিউজ ডটকম. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
