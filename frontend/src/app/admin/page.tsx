"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Article = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string;
};

const CATEGORIES = [
  "জাতীয়",
  "রাজনীতি",
  "অর্থনীতি",
  "সারাদেশ",
  "আন্তর্জাতিক",
  "খেলা",
  "বিনোদন",
  "সোনালী বিশেষ",
  "শিক্ষা",
  "স্বাস্থ্য",
  "চাকরির খবর",
  "ভিডিও গ্যালারি",
  "বিবিধ"
];

export default function Admin() {
  const [article, setArticle] = useState<Article>({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    category: "জাতীয়",
    imageUrl: "",
  });
  
  const [adminToken, setAdminToken] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"visual" | "html">("visual");

  const editorRef = useRef<HTMLDivElement>(null);

  // Sync contentEditable content with the state
  const handleEditorChange = () => {
    if (editorRef.current) {
      setArticle(prev => ({
        ...prev,
        content: editorRef.current?.innerHTML || ""
      }));
    }
  };

  // Run native rich text commands (WordPress classic style)
  const execCmd = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    handleEditorChange();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Sync state content to visual editor if state is loaded or reset
  useEffect(() => {
    if (editorRef.current && article.content === "") {
      editorRef.current.innerHTML = "";
    }
  }, [article.content]);

  // Generate dynamic slug based on Bengali title
  const generateSlugFromTitle = (title: string) => {
    const slug = title
      .trim()
      .toLowerCase()
      .replace(/[^\u0980-\u09FFa-zA-Z0-9\s]/g, "") // Keep Bengali characters & alphanumeric
      .replace(/\s+/g, "-");
    setArticle(prev => ({ ...prev, slug }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setArticle(prev => ({ ...prev, title }));
    generateSlugFromTitle(title);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setArticle(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const form = new FormData();
    form.append("image", file);
    
    setUploading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          "x-admin-token": adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "",
        },
        body: form,
      });
      if (!res.ok) throw new Error("Upload failed. Check your admin token.");
      const data = await res.json();
      setArticle(prev => ({ ...prev, imageUrl: data.url }));
      setMessage("আর্টিকেল ইমেজ সফলভাবে আপলোড হয়েছে!");
      setStatus("success");
    } catch (err: any) {
      setMessage(err.message || "ছবি আপলোড করা যায়নি।");
      setStatus("error");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!article.title || !article.content) {
      setMessage("অনুগ্রহ করে শিরোনাম এবং খবরের মূল বিষয়বস্তু লিখুন।");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    const finalSlug = article.slug || `post-${Date.now()}`;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "";
      
      const res = await fetch(`${apiUrl}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          ...article,
          slug: finalSlug
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "খবরটি প্রকাশ করা যায়নি।");
      }
      
      setMessage("খবরটি সফলভাবে প্রকাশিত হয়েছে!");
      setStatus("success");
      
      // Reset
      setArticle({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        category: "জাতীয়",
        imageUrl: "",
      });
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    } catch (err: any) {
      setMessage(err.message || "সার্ভার এরর। খবরটি প্রকাশ করা যায়নি।");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5] text-zinc-800 font-sans leading-normal">
      <Header />
      
      {/* WordPress Admin Style Title Bar */}
      <div className="bg-white border-b border-zinc-200 py-4 px-6 flex items-center justify-between shadow-sm select-none">
        <div className="flex items-center gap-3">
          <div className="bg-[#006a4e] text-white p-2 rounded-lg font-bold text-sm shadow-sm select-none">W</div>
          <div>
            <h1 className="font-extrabold text-xl sm:text-2xl text-zinc-900 tracking-tight">সোনালীনিউজ রাইটার প্যানেল</h1>
            <p className="text-xs text-zinc-400 font-semibold mt-0.5">ওয়ার্ডপ্রেস স্টাইল প্রফেশনাল আর্টিকেল এডিটর</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-56 sm:w-64">
          <input
            type="password"
            placeholder="সিক্রেট অ্যাডমিন টোকেন..."
            value={adminToken}
            onChange={(e) => setAdminToken(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 focus:outline-none focus:border-[#006a4e] transition font-mono font-bold"
          />
        </div>
      </div>

      <main className="container mx-auto py-8 px-4 max-w-7xl flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Main Post Editor area (width 9/12) */}
        <div className="lg:col-span-8 space-y-5">
          {message && (
            <div
              className={`p-4 rounded-xl text-sm font-semibold border ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
            {/* Title Input */}
            <input
              type="text"
              placeholder="শিরোনাম লিখুন (Add Title)..."
              value={article.title}
              onChange={handleTitleChange}
              className="w-full text-2xl sm:text-3xl font-extrabold text-zinc-900 placeholder-zinc-300 border-b border-zinc-200 pb-3 focus:outline-none focus:border-[#006a4e] transition"
            />

            {/* WordPress Gutenberg Toolbar */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2 flex flex-wrap gap-1 items-center select-none shadow-inner">
              {/* Visual / Text Tabs */}
              <div className="flex bg-zinc-200/60 p-0.5 rounded-lg mr-2">
                <button
                  onClick={() => setViewMode("visual")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                    viewMode === "visual" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  ভিজুয়াল
                </button>
                <button
                  onClick={() => setViewMode("html")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                    viewMode === "html" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  টেক্সট (HTML)
                </button>
              </div>

              {viewMode === "visual" && (
                <>
                  {/* Styling formatting commands */}
                  <button onClick={() => execCmd("bold")} className="w-8 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center font-bold text-sm bg-white" title="Bold">B</button>
                  <button onClick={() => execCmd("italic")} className="w-8 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center italic text-sm bg-white" title="Italic">I</button>
                  <button onClick={() => execCmd("underline")} className="w-8 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center underline text-sm bg-white" title="Underline">U</button>
                  <div className="w-[1px] h-6 bg-zinc-200 mx-1"></div>
                  
                  {/* Block format commands */}
                  <button onClick={() => execCmd("formatBlock", "<h1>")} className="px-2 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center font-bold text-xs bg-white" title="Heading 1">H1</button>
                  <button onClick={() => execCmd("formatBlock", "<h2>")} className="px-2 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center font-bold text-xs bg-white" title="Heading 2">H2</button>
                  <button onClick={() => execCmd("formatBlock", "<blockquote>")} className="px-2.5 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center font-bold text-xs bg-white font-serif" title="Blockquote">”</button>
                  <div className="w-[1px] h-6 bg-zinc-200 mx-1"></div>

                  {/* List commands */}
                  <button onClick={() => execCmd("insertUnorderedList")} className="w-8 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center text-sm bg-white" title="Bullet List">•List</button>
                  <button onClick={() => execCmd("insertOrderedList")} className="w-8 h-8 rounded border border-zinc-200 hover:bg-zinc-200/50 flex items-center justify-center text-sm bg-white" title="Numbered List">1.List</button>
                </>
              )}
            </div>

            {/* Visual Editor Canvas */}
            {viewMode === "visual" ? (
              <div
                ref={editorRef}
                contentEditable
                onInput={handleEditorChange}
                className="w-full min-h-[400px] max-h-[600px] overflow-y-auto px-4 py-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#006a4e] transition bg-white text-zinc-800 text-lg leading-relaxed space-y-4"
              />
            ) : (
              <textarea
                name="content"
                value={article.content}
                onChange={handleChange}
                placeholder="খবরের মূল অংশ (HTML কোড)..."
                rows={16}
                className="w-full min-h-[400px] px-4 py-4 rounded-xl border border-zinc-200 focus:outline-none focus:border-[#006a4e] bg-[#1e1e24] text-emerald-400 font-mono text-sm leading-relaxed"
              />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Document & Publish settings (width 3/12) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publish Widget */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4 select-none">
            <h3 className="font-extrabold text-sm text-zinc-900 border-b border-zinc-100 pb-2">প্রকাশনা (Publish)</h3>
            <div className="text-xs space-y-2 text-zinc-500 font-semibold">
              <p>▪ স্ট্যাটাস: <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">খসড়া (Draft)</span></p>
              <p>▪ ভিউ: <span className="text-zinc-700">পাবলিক</span></p>
            </div>
            <button
              onClick={save}
              disabled={status === "loading"}
              className="w-full bg-[#006a4e] hover:bg-[#00533d] text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md transform active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? "প্রকাশিত হচ্ছে..." : "খবর প্রকাশ করুন"}
            </button>
          </div>

          {/* WordPress Style Category Selector Widget */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-3 select-none">
            <h3 className="font-extrabold text-sm text-zinc-900 border-b border-zinc-100 pb-2">ক্যাটাগরি সিলেক্ট করুন</h3>
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2.5">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-2.5 text-sm font-semibold text-zinc-700 cursor-pointer hover:text-[#006a4e] transition">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={article.category === cat}
                    onChange={handleChange}
                    className="accent-[#006a4e] w-4 h-4"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Featured Image Upload Widget */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4 select-none">
            <h3 className="font-extrabold text-sm text-zinc-900 border-b border-zinc-100 pb-2">ফিচার্ড ইমেজ সেট করুন</h3>
            
            {article.imageUrl ? (
              <div className="space-y-3">
                <img src={article.imageUrl} alt="Preview" className="w-full aspect-video object-cover rounded-xl border border-zinc-200" />
                <button
                  onClick={() => setArticle(prev => ({ ...prev, imageUrl: "" }))}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  ইমেজ রিমুভ করুন
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="cursor-pointer border-2 border-dashed border-zinc-300 rounded-xl p-6 hover:border-[#006a4e] transition flex flex-col items-center justify-center gap-2 text-zinc-400 bg-zinc-50">
                  <svg className="w-8 h-8 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-bold">{uploading ? "আপলোড হচ্ছে..." : "ইমেজ নির্বাচন করুন"}</span>
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
                </label>
              </div>
            )}
          </div>

          {/* Document URL & Excerpt settings widget */}
          <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
            <h3 className="font-extrabold text-sm text-zinc-900 border-b border-zinc-100 pb-2 select-none">ডকুমেন্ট সেটিংস</h3>
            
            <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
              <label>ইউআরএল স্লাগ (Slug):</label>
              <input
                name="slug"
                placeholder="url-slug-example"
                value={article.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
              <label>সংক্ষিপ্ত বিবরণ (Excerpt):</label>
              <textarea
                name="excerpt"
                placeholder="সংক্ষিপ্ত খবর সারাংশ..."
                rows={3}
                value={article.excerpt}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition resize-none"
              />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
