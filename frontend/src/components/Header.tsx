"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Helper function to get the current date in Bengali format
function getBengaliDate() {
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  const numbers = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
  };

  const convertToBengaliNum = (num: number) => {
    return num
      .toString()
      .split("")
      .map((char) => (numbers as any)[char] || char)
      .join("");
  };

  const now = new Date();
  const dayName = days[now.getDay()];
  const dateNum = convertToBengaliNum(now.getDate()).padStart(2, "০");
  const monthName = months[now.getMonth()];
  const yearNum = convertToBengaliNum(now.getFullYear());

  return `ঢাকা | ${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}

const DEFAULT_CATEGORIES = [
  { name: "জাতীয়", url: "/?category=জাতীয়" },
  { name: "রাজনীতি", url: "/?category=রাজনীতি" },
  { name: "অর্থনীতি", url: "/?category=অর্থনীতি" },
  { name: "সারাদেশ", url: "/?category=সারাদেশ" },
  { name: "আন্তর্জাতিক", url: "/?category=আন্তর্জাতিক" },
  { name: "খেলা", url: "/?category=খেলা" },
  { name: "বিনোদন", url: "/?category=বিনোদন" },
  { name: "সোনালী বিশেষ", url: "/?category=সোনালী বিশেষ" },
  { name: "শিক্ষা", url: "/?category=শিক্ষা" },
  { name: "স্বাস্থ্য", url: "/?category=স্বাস্থ্য" },
  { name: "চাকরির খবর", url: "/?category=চাকরির খবর" },
  { name: "ভিডিও গ্যালারি", url: "/?category=ভিডিও গ্যালারি" },
  { name: "বিবিধ", url: "/?category=বিবিধ" }
];

export default function Header() {
  const dateStr = getBengaliDate();
  const [menus, setMenus] = useState<any[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/menus`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setMenus(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic menus:", error);
      }
    };
    fetchMenus();
  }, []);


  return (
    <header className="bg-white border-b border-zinc-200 w-full select-none">
      {/* 1. Top Bar */}
      <div className="bg-[#f0f0f0] border-b border-zinc-200 py-1.5 px-4 text-xs text-zinc-700">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl">
          <div className="flex items-center gap-1 font-medium">
            <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{dateStr}</span>
          </div>

          {/* Social Media Sharing Icons */}
          <div className="flex items-center gap-1.5">
            <a href="#" className="w-5 h-5 bg-[#3b5998] rounded text-white flex items-center justify-center hover:opacity-95 transition text-[10px] font-bold">f</a>
            <a href="#" className="w-5 h-5 bg-[#cd201f] rounded text-white flex items-center justify-center hover:opacity-95 transition text-[10px] font-bold">y</a>
            <a href="#" className="w-5 h-5 bg-[#0077b5] rounded text-white flex items-center justify-center hover:opacity-95 transition text-[10px] font-bold">in</a>
            <a href="#" className="w-5 h-5 bg-[#bd081c] rounded text-white flex items-center justify-center hover:opacity-95 transition text-[10px] font-bold">p</a>
            <a href="#" className="w-5 h-5 bg-[#f26522] rounded text-white flex items-center justify-center hover:opacity-95 transition text-[10px] font-bold">rss</a>
          </div>
        </div>
      </div>

      {/* 2. Logo & Tagline Bar */}
      <div className="py-6 px-4 bg-white">
        <div className="container mx-auto flex flex-col items-center sm:items-start max-w-7xl gap-1">
          {/* Stylized high-fidelity HTML/CSS logo matching Sonalinews.com */}
          <Link href="/" className="flex items-center select-none outline-none">
            <span className="font-sans text-5xl font-extrabold tracking-tighter text-[#cc0000] flex items-center">
              S
              {/* Green globe icon representing the "o" in Sonalinews */}
              <span className="inline-block relative w-9 h-9 mx-0.5 rounded-full border-[3px] border-[#006a4e] flex items-center justify-center bg-white overflow-hidden shadow-inner">
                <span className="absolute w-full h-0.5 bg-[#006a4e]"></span>
                <span className="absolute w-0.5 h-full bg-[#006a4e]"></span>
                <span className="w-6 h-6 rounded-full border border-dashed border-[#006a4e] flex items-center justify-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#006a4e]"></span>
                </span>
              </span>
              nali
            </span>
            <span className="font-sans text-5xl font-extrabold tracking-tighter text-[#006a4e] ml-0.5">
              News
            </span>
            <span className="font-sans text-lg font-bold text-zinc-900 border-l border-zinc-400 pl-1.5 ml-1 self-end mb-1">
              .com
            </span>
          </Link>

          {/* Subtext approved tagline */}
          <p className="text-[11px] font-semibold text-zinc-500 tracking-wide mt-1">
            গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত নিউজ পোর্টাল
          </p>
        </div>
      </div>

      {/* 3. Deep Green Navigation Bar */}
      <div className="bg-[#0b5c3a] border-b-[3px] border-[#cc0000] sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl flex items-center">
          {/* Red Home Icon Button */}
          <Link href="/" className="bg-[#cc0000] p-3 text-white hover:bg-[#aa0000] transition flex items-center justify-center shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>

          {/* Scrolling category list for mobile, horizontal flex for desktop */}
          <nav className="flex items-center overflow-x-auto no-scrollbar scroll-smooth flex-grow py-0 px-2 font-medium">
            {menus.map((cat, index) => (
              <Link
                key={index}
                href={cat.url}
                className="text-white hover:bg-white/10 px-3.5 py-3 text-sm shrink-0 font-bold border-r border-white/10 hover:text-amber-300 transition"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Search Icon */}
          <button className="p-3 text-white hover:bg-white/10 transition shrink-0 border-l border-white/10 flex items-center justify-center">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
