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

const DEFAULT_CATEGORIES = [
  { name: "জাতীয়", url: "/?category=জাতীয়", sort_order: 1 },
  { name: "রাজনীতি", url: "/?category=রাজনীতি", sort_order: 2 },
  { name: "অর্থনীতি", url: "/?category=অর্থনীতি", sort_order: 3 },
  { name: "সারাদেশ", url: "/?category=সারাদেশ", sort_order: 4 },
  { name: "আন্তর্জাতিক", url: "/?category=আন্তর্জাতিক", sort_order: 5 },
  { name: "খেলা", url: "/?category=খেলা", sort_order: 6 },
  { name: "বিনোদন", url: "/?category=বিনোদন", sort_order: 7 },
  { name: "সোনালী বিশেষ", url: "/?category=সোনালী বিশেষ", sort_order: 8 },
  { name: "শিক্ষা", url: "/?category=শিক্ষা", sort_order: 9 },
  { name: "স্বাস্থ্য", url: "/?category=স্বাস্থ্য", sort_order: 10 },
  { name: "চাকরির খবর", url: "/?category=চাকরির খবর", sort_order: 11 },
  { name: "ভিডিও গ্যালারি", url: "/?category=ভিডিও গ্যালারি", sort_order: 12 },
  { name: "বিবিধ", url: "/?category=বিবিধ", sort_order: 13 }
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

  // Dynamic Menu States
  const [activeTab, setActiveTab] = useState<"articles" | "menus">("articles");
  const [menus, setMenus] = useState<any[]>([]);
  const [newMenu, setNewMenu] = useState({ name: "", url: "", sort_order: 0 });
  const [editingMenu, setEditingMenu] = useState<any | null>(null);
  const [menuMessage, setMenuMessage] = useState("");
  const [menuStatus, setMenuStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const editorRef = useRef<HTMLDivElement>(null);

  const getApiUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost" && window.location.port === "3000") {
        return "http://localhost:5000";
      }
    }
    return "";
  };

  const fetchAdminMenus = async () => {
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/menus`);
      if (res.ok) {
        const data = await res.json();
        setMenus(data);
        localStorage.setItem("sonali_local_menus", JSON.stringify(data));
        return;
      }
    } catch (error) {
      console.error("Failed to load menus from API, loading from local storage:", error);
    }
    
    // Local storage fallback
    try {
      const localMenus = localStorage.getItem("sonali_local_menus");
      if (localMenus) {
        setMenus(JSON.parse(localMenus));
      } else {
        setMenus(DEFAULT_CATEGORIES);
      }
    } catch (err) {
      setMenus(DEFAULT_CATEGORIES);
    }
  };

  useEffect(() => {
    fetchAdminMenus();
  }, []);

  const handleAddMenu = async () => {
    if (!newMenu.name || !newMenu.url) {
      setMenuMessage("অনুগ্রহ করে মেনুর নাম এবং ইউআরএল লিখুন।");
      setMenuStatus("error");
      return;
    }
    setMenuStatus("loading");
    setMenuMessage("");

    const menuToCreate = {
      id: Date.now(),
      name: newMenu.name,
      url: newMenu.url,
      sort_order: newMenu.sort_order || 0
    };

    try {
      const apiUrl = getApiUrl();
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "sonali-admin-secret-2026";
      const res = await fetch(`${apiUrl}/api/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token
        },
        body: JSON.stringify(newMenu)
      });
      const data = await res.json();
      if (res.ok) {
        setMenuMessage("মেনুটি সফলভাবে তৈরি হয়েছে!");
        setMenuStatus("success");
        setNewMenu({ name: "", url: "", sort_order: 0 });
        fetchAdminMenus();
        return;
      } else {
        throw new Error(data.message || "API error");
      }
    } catch (err: any) {
      console.warn("Backend error or offline, saving to Local Storage instead:", err);
    }

    // Local Storage Fallback
    try {
      const currentMenus = [...menus, menuToCreate].sort((a: any, b: any) => a.sort_order - b.sort_order);
      setMenus(currentMenus);
      localStorage.setItem("sonali_local_menus", JSON.stringify(currentMenus));
      setMenuMessage("মেনুটি সফলভাবে তৈরি হয়েছে (Local Storage Fallback Mode)!");
      setMenuStatus("success");
      setNewMenu({ name: "", url: "", sort_order: 0 });
    } catch (err: any) {
      setMenuMessage("এরর ঘটেছে।");
      setMenuStatus("error");
    }
  };

  const handleUpdateMenu = async () => {
    if (!editingMenu || !editingMenu.name || !editingMenu.url) {
      setMenuMessage("অনুগ্রহ করে মেনুর নাম এবং ইউআরএল লিখুন।");
      setMenuStatus("error");
      return;
    }
    setMenuStatus("loading");
    setMenuMessage("");
    try {
      const apiUrl = getApiUrl();
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "sonali-admin-secret-2026";
      const res = await fetch(`${apiUrl}/api/menus/${editingMenu.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token
        },
        body: JSON.stringify(editingMenu)
      });
      const data = await res.json();
      if (res.ok) {
        setMenuMessage("মেনুটি সফলভাবে আপডেট হয়েছে!");
        setMenuStatus("success");
        setEditingMenu(null);
        fetchAdminMenus();
        return;
      } else {
        throw new Error(data.message || "API error");
      }
    } catch (err: any) {
      console.warn("Backend error or offline, updating in Local Storage instead:", err);
    }

    // Local Storage Fallback
    try {
      const currentMenus = menus.map((m: any) => m.id === editingMenu.id ? editingMenu : m)
        .sort((a: any, b: any) => a.sort_order - b.sort_order);
      setMenus(currentMenus);
      localStorage.setItem("sonali_local_menus", JSON.stringify(currentMenus));
      setMenuMessage("মেনুটি সফলভাবে আপডেট হয়েছে (Local Storage Fallback Mode)!");
      setMenuStatus("success");
      setEditingMenu(null);
    } catch (err: any) {
      setMenuMessage("এরর ঘটেছে।");
      setMenuStatus("error");
    }
  };

  const handleDeleteMenu = async (id: number) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই মেনুটি মুছে ফেলতে চান?")) return;
    setMenuStatus("loading");
    setMenuMessage("");
    try {
      const apiUrl = getApiUrl();
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "sonali-admin-secret-2026";
      const res = await fetch(`${apiUrl}/api/menus/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMenuMessage("মেনুটি সফলভাবে মুছে ফেলা হয়েছে!");
        setMenuStatus("success");
        fetchAdminMenus();
        return;
      } else {
        throw new Error(data.message || "API error");
      }
    } catch (err: any) {
      console.warn("Backend error or offline, deleting from Local Storage instead:", err);
    }

    // Local Storage Fallback
    try {
      const currentMenus = menus.filter((m: any) => m.id !== id);
      setMenus(currentMenus);
      localStorage.setItem("sonali_local_menus", JSON.stringify(currentMenus));
      setMenuMessage("মেনুটি সফলভাবে মুছে ফেলা হয়েছে (Local Storage Fallback Mode)!");
      setMenuStatus("success");
    } catch (err: any) {
      setMenuMessage("এরর ঘটেছে।");
      setMenuStatus("error");
    }
  };

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
      const apiUrl = getApiUrl();
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "sonali-admin-secret-2026";
      const res = await fetch(`${apiUrl}/api/upload`, {
        method: "POST",
        headers: {
          "x-admin-token": token,
        },
        body: form,
      });
      if (res.ok) {
        const data = await res.json();
        setArticle(prev => ({ ...prev, imageUrl: data.url }));
        setMessage("আর্টিকেল ইমেজ সফলভাবে আপলোড হয়েছে!");
        setStatus("success");
        setUploading(false);
        return;
      } else {
        throw new Error("Upload failed");
      }
    } catch (err: any) {
      console.warn("Upload API failed, using base64 fallback:", err);
    }

    // Base64 Fallback
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticle(prev => ({ ...prev, imageUrl: reader.result as string }));
        setMessage("ছবিটি সফলভাবে লোড হয়েছে (Local Base64 Fallback Mode)!");
        setStatus("success");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setMessage("ছবি আপলোড করা যায়নি।");
      setStatus("error");
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
    const articleToSave = {
      ...article,
      id: Date.now(),
      slug: finalSlug
    };

    try {
      const apiUrl = getApiUrl();
      const token = adminToken || process.env.NEXT_PUBLIC_ADMIN_TOKEN || "sonali-admin-secret-2026";
      
      const res = await fetch(`${apiUrl}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(articleToSave),
      });

      const data = await res.json();
      if (res.ok) {
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
        return;
      } else {
        throw new Error(data.message || "API publish error");
      }
    } catch (err: any) {
      console.warn("API publish failed, saving to Local Storage fallback:", err);
    }

    // Local Storage Fallback
    try {
      const localArticlesStr = localStorage.getItem("sonali_local_articles");
      let localArticles = [];
      if (localArticlesStr) {
        localArticles = JSON.parse(localArticlesStr);
      }
      localArticles.push(articleToSave);
      localStorage.setItem("sonali_local_articles", JSON.stringify(localArticles));

      setMessage("খবরটি সফলভাবে প্রকাশিত হয়েছে (Local Storage Fallback Mode)!");
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
      setMessage("এরর ঘটেছে। খবরটি প্রকাশ করা যায়নি।");
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
            <p className="text-xs text-zinc-400 font-semibold mt-0.5">ওয়ার্ডপ্রেস স্টাইল প্রফেশনাল আর্টিকেল ও মেনু এডিটর</p>
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

      {/* Tab Navigation Controls */}
      <div className="bg-white border-b border-zinc-200 px-6 flex gap-4 select-none">
        <button
          onClick={() => setActiveTab("articles")}
          className={`py-3 px-2 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-1.5 ${
            activeTab === "articles"
              ? "border-[#006a4e] text-[#006a4e]"
              : "border-transparent text-zinc-500 hover:text-zinc-850"
          }`}
        >
          <span>✍️</span> নতুন খবর প্রকাশ (Add Article)
        </button>
        <button
          onClick={() => setActiveTab("menus")}
          className={`py-3 px-2 font-bold text-xs sm:text-sm border-b-2 transition flex items-center gap-1.5 ${
            activeTab === "menus"
              ? "border-[#006a4e] text-[#006a4e]"
              : "border-transparent text-zinc-500 hover:text-zinc-850"
          }`}
        >
          <span>📂</span> মেনু এডিটর (Menu Manager)
        </button>
      </div>

      {activeTab === "articles" ? (
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
      ) : (
        <main className="container mx-auto py-8 px-4 max-w-7xl flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: Menus List Table (width 8/12) */}
          <div className="lg:col-span-8 space-y-5">
            {menuMessage && (
              <div
                className={`p-4 rounded-xl text-sm font-semibold border ${
                  menuStatus === "success"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {menuMessage}
              </div>
            )}

            <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
              <h3 className="font-extrabold text-lg text-zinc-900 border-b border-zinc-100 pb-3 flex items-center gap-2 select-none">
                <span>📂</span> সক্রিয় মেনু তালিকা (Active Menu Links)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/50 text-zinc-500 font-bold select-none">
                      <th className="py-3 px-4">নাম (Name)</th>
                      <th className="py-3 px-4">লিঙ্ক / ইউআরএল (URL)</th>
                      <th className="py-3 px-4 text-center">ক্রম (Order)</th>
                      <th className="py-3 px-4 text-right">অ্যাকশন (Actions)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus.map((menu) => (
                      <tr key={menu.id} className="border-b border-zinc-150 hover:bg-zinc-50/50 transition">
                        <td className="py-3 px-4 font-bold text-zinc-900">{menu.name}</td>
                        <td className="py-3 px-4 font-mono text-xs text-zinc-500">{menu.url}</td>
                        <td className="py-3 px-4 text-center font-bold text-[#006a4e]">{menu.sort_order}</td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingMenu(menu)}
                            className="text-xs font-bold text-sky-600 hover:text-sky-850 hover:underline px-2.5 py-1 rounded bg-sky-50 border border-sky-200 transition"
                          >
                            সম্পাদনা
                          </button>
                          <button
                            onClick={() => handleDeleteMenu(menu.id)}
                            className="text-xs font-bold text-rose-600 hover:text-rose-850 hover:underline px-2.5 py-1 rounded bg-rose-50 border border-rose-200 transition"
                          >
                            মুছে ফেলুন
                          </button>
                        </td>
                      </tr>
                    ))}
                    {menus.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-zinc-400 font-bold">
                          কোনো সক্রিয় মেনু খুঁজে পাওয়া যায়নি।
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Add / Edit Menu Form Widget (width 4/12) */}
          <div className="lg:col-span-4 space-y-6">
            {editingMenu ? (
              <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-1.5 select-none">
                  <span>✏️</span> মেনু সম্পাদনা করুন
                </h3>
                
                <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
                  <label>মেনুর নাম (Name):</label>
                  <input
                    type="text"
                    value={editingMenu.name}
                    onChange={(e) => setEditingMenu({ ...editingMenu, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition font-bold"
                    placeholder="উদা: শিক্ষা"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
                  <label>ইউআরএল (URL):</label>
                  <input
                    type="text"
                    value={editingMenu.url}
                    onChange={(e) => setEditingMenu({ ...editingMenu, url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition font-mono font-bold"
                    placeholder="উদা: /?category=শিক্ষা"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
                  <label>ক্রম (Sort Order):</label>
                  <input
                    type="number"
                    value={editingMenu.sort_order}
                    onChange={(e) => setEditingMenu({ ...editingMenu, sort_order: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition font-bold"
                    placeholder="উদা: 9"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                     onClick={handleUpdateMenu}
                     disabled={menuStatus === "loading"}
                     className="flex-grow bg-[#006a4e] hover:bg-[#00533d] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow transform active:scale-95 disabled:opacity-50"
                  >
                    {menuStatus === "loading" ? "সংরক্ষণ হচ্ছে..." : "হালনাগাদ করুন"}
                  </button>
                  <button
                    onClick={() => setEditingMenu(null)}
                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-2.5 px-4 rounded-xl text-xs transition border border-zinc-200"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden p-5 space-y-4">
                <h3 className="font-extrabold text-sm text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-1.5 select-none">
                  <span>➕</span> নতুন মেনু যোগ করুন
                </h3>
                
                <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
                  <label>মেনুর নাম (Name):</label>
                  <input
                    type="text"
                    value={newMenu.name}
                    onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition font-bold"
                    placeholder="উদা: শিক্ষা"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
                  <label>ইউআরএল (URL):</label>
                  <input
                    type="text"
                    value={newMenu.url}
                    onChange={(e) => setNewMenu({ ...newMenu, url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition font-mono font-bold"
                    placeholder="উদা: /?category=শিক্ষা"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-xs font-bold text-zinc-500">
                  <label>ক্রম (Sort Order):</label>
                  <input
                    type="number"
                    value={newMenu.sort_order || ""}
                    onChange={(e) => setNewMenu({ ...newMenu, sort_order: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 focus:outline-none focus:border-[#006a4e] text-zinc-800 transition font-bold"
                    placeholder="উদা: 9"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleAddMenu}
                    disabled={menuStatus === "loading"}
                    className="w-full bg-[#006a4e] hover:bg-[#00533d] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-md transform active:scale-95 disabled:opacity-50"
                  >
                    {menuStatus === "loading" ? "মেনু যোগ হচ্ছে..." : "মেনু যোগ করুন"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
