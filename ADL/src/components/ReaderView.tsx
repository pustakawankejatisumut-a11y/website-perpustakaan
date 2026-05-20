import React, { useState } from "react";
import { Book, User, BookHighlight } from "../types";
import { ArrowLeft, BookOpen, Volume2, Highlighter, Edit3, Bookmark, AlertCircle, ChevronLeft, ChevronRight, MessageSquareCode, Sparkles, Scale, Send, Check } from "lucide-react";

interface ReaderViewProps {
  book: Book;
  onBack: () => void;
  currentUser: User;
  highlights: BookHighlight[];
  onAddHighlight: (highlight: Omit<BookHighlight, "id" | "date">) => void;
}

export function ReaderView({ book, onBack, currentUser, highlights, onAddHighlight }: ReaderViewProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [aiChatLog, setAiChatLog] = useState<{ sender: "user" | "ai"; message: string }[]>([]);
  
  // Custom Notes state
  const [activeHighlightColor, setActiveHighlightColor] = useState("bg-yellow-100");
  const [customNote, setCustomNote] = useState("");
  const [noteSaving, setNoteSaving] = useState(false);

  const currentChapter = book.chapters[currentChapterIndex] || { title: "Daftar Isi Kosong", content: "" };

  // Filter highlights for the current book & chapter
  const currentChapterHighlights = highlights.filter(
    (h) => h.bookId === book.id && h.chapterIndex === currentChapterIndex
  );

  const fontSizes = {
    sm: "text-xs md:text-sm",
    base: "text-sm md:text-base",
    lg: "text-base md:text-lg",
    xl: "text-xl",
  };

  // Trigger server-side Gemini AI for chapter summarization
  const handleSummarizeChapter = async () => {
    setAiLoading(true);
    setAiChatLog((prev) => [
      ...prev,
      { sender: "user", message: `Mohon buat ringkasan hukum fungsional untuk bab: "${currentChapter.title}".` },
    ]);

    try {
      const response = await fetch("/api/gemini/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookTitle: book.title,
          chapterTitle: currentChapter.title,
          content: currentChapter.content,
        }),
      });

      const data = await response.json();
      if (data.summary) {
        setAiChatLog((prev) => [...prev, { sender: "ai", message: data.summary }]);
      } else {
        setAiChatLog((prev) => [
          ...prev,
          { sender: "ai", message: "Gagal merespons. Harap periksa apakah server sedang berjalan." },
        ]);
      }
    } catch (err: any) {
      setAiChatLog((prev) => [
        ...prev,
        { sender: "ai", message: `Terjadi kesalahan jaringan: ${err.message}` },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Trigger server-side Gemini AI for general research questioning in context
  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const queryText = aiInput.trim();
    setAiChatLog((prev) => [...prev, { sender: "user", message: queryText }]);
    setAiInput("");
    setAiLoading(true);

    try {
      const response = await fetch("/api/gemini/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: queryText,
          bookContext: `${book.title} (Bab: ${currentChapter.title})`,
          userRole: currentUser.role,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setAiChatLog((prev) => [...prev, { sender: "ai", message: data.text }]);
      } else {
        setAiChatLog((prev) => [
          ...prev,
          { sender: "ai", message: "Maaf, asisten riset mengalami kendala operasional." },
        ]);
      }
    } catch (err: any) {
      setAiChatLog((prev) => [
        ...prev,
        { sender: "ai", message: `Gagal menghubungkan ke jaringan AI: ${err.message}` },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Highlight a selected paragraph or text block
  const handleHighlightParagraph = (pText: string) => {
    // Check if already highlighted
    const alreadyExists = currentChapterHighlights.some((h) => h.text === pText);
    if (alreadyExists) return;

    onAddHighlight({
      bookId: book.id,
      chapterIndex: currentChapterIndex,
      text: pText,
      color: activeHighlightColor,
      note: customNote ? customNote : undefined,
    });
    setCustomNote("");
  };

  return (
    <div className="space-y-4" id="reader-view-panel">
      {/* Reader Nav Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-800"
            id="btn-back-to-catalog"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{book.title}</h3>
            <p className="text-xs text-slate-500 font-mono">Penulis: {book.author}</p>
          </div>
        </div>

        {/* Font size selectors */}
        <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[200px]">
          <div className="flex items-center space-x-1.5 border-r border-slate-200 pr-4">
            <span className="text-xs font-semibold text-slate-400 font-mono">UKURAN FONT:</span>
            {(["sm", "base", "lg", "xl"] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                  fontSize === sz
                    ? "bg-emerald-950 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-slate-400 font-mono">STABILO:</span>
            {["bg-yellow-100", "bg-emerald-100", "bg-amber-100", "bg-blue-100"].map((color) => (
              <button
                key={color}
                onClick={() => setActiveHighlightColor(color)}
                className={`w-6 h-6 rounded-full border ${color} ${
                  activeHighlightColor === color ? "border-emerald-950 ring-2 ring-emerald-950/25 scale-110" : "border-slate-300"
                }`}
                title="Pilih warna stabilo untuk penanda"
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Table of Contents & Content Section & AI Assistant Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Table of Contents / "Daftar Isi" (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">
              Daftar Isi Buku
            </h4>
            <div className="space-y-1">
              {book.chapters.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentChapterIndex(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    currentChapterIndex === idx
                      ? "bg-emerald-950 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  id={`btn-chapter-select-${idx}`}
                >
                  <div className="line-clamp-2">
                    {idx + 1}. {ch.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User highlights container */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3 flex items-center justify-between">
              <span>Penanda Saya ({currentChapterHighlights.length})</span>
              <Highlighter className="h-3.5 w-3.5 text-emerald-900" />
            </h4>
            {currentChapterHighlights.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic">
                Klik paragraf tertentu di lembar baca untuk menandai catatan penting.
              </p>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {currentChapterHighlights.map((hl) => (
                  <div key={hl.id} className="p-2.5 rounded border border-slate-100 bg-slate-50 text-[11px] space-y-1">
                    <p className={`p-1 rounded font-serif ${hl.color} line-clamp-3`}>
                      "{hl.text}"
                    </p>
                    {hl.note && (
                      <div className="text-[10px] text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                        Catatan: {hl.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Input for next note creation */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                Tulis Catatan Pendamping Sebelum Menandai:
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Tulis opini hukum atau memorandum singkat Anda..."
                className="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-emerald-900 text-slate-800 h-16 resize-none"
              />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Document Reading Canvas (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[500px] flex flex-col justify-between" id="reading-desk">
            <div>
              {/* Header inside book page */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest font-mono flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Pustaka Adhyaksa Utama
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Bab {currentChapterIndex + 1} dari {book.chapters.length}
                </span>
              </div>

              {/* Chapter title hierarchy */}
              <h2 className="text-base font-bold text-slate-800 font-sans leading-snug">
                {currentChapter.title}
              </h2>

              {/* The Reading Body text */}
              <div className={`mt-6 text-slate-700 ${fontSizes[fontSize]} leading-relaxed font-serif space-y-4`}>
                {/* We map paragraphs so that each paragraph can be interactively clicked & highlighted */}
                {currentChapter.content.split("\n").filter(Boolean).map((para, pIdx) => {
                  const isHighlighted = currentChapterHighlights.some((h) => h.text === para);
                  const matchedHighlight = currentChapterHighlights.find((h) => h.text === para);

                  return (
                    <p
                      key={pIdx}
                      onClick={() => handleHighlightParagraph(para)}
                      className={`cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-all ${
                        isHighlighted ? matchedHighlight?.color + " shadow-sm border-l-2 border-emerald-900" : ""
                      }`}
                      title="Klik satu kali untuk menempelkan stabilo"
                    >
                      {para}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Pagination controls */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentChapterIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentChapterIndex === 0}
                className="flex items-center gap-1 py-1.5 px-3 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Kembali
              </button>
              
              <span className="text-xs text-slate-500 font-mono">
                Persentase Baca: {Math.round(((currentChapterIndex + 1) / book.chapters.length) * 100)}%
              </span>

              <button
                onClick={() => setCurrentChapterIndex((prev) => Math.min(book.chapters.length - 1, prev + 1))}
                disabled={currentChapterIndex === book.chapters.length - 1}
                className="flex items-center gap-1 py-1.5 px-3 bg-emerald-950 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 disabled:opacity-40"
              >
                Lanjut
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Adhyaksa AI Legal Research Assistant Sidebar (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gradient-to-b from-slate-900 to-emerald-950 text-white rounded-xl border border-emerald-900/45 shadow-md overflow-hidden flex flex-col h-[585px] justify-between">
            <div>
              {/* Header */}
              <div className="bg-emerald-900 p-4 border-b border-amber-500/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="bg-amber-500 p-1 rounded text-emerald-950">
                    <Scale className="h-4 w-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-tight">Riset AI Adhyaksa</h4>
                    <p className="text-[10px] text-emerald-300 font-mono">Internal Legal Copilot</p>
                  </div>
                </div>

                <button
                  onClick={handleSummarizeChapter}
                  disabled={aiLoading}
                  className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-emerald-950 text-[10px] font-bold rounded flex items-center gap-1 transition-all disabled:opacity-50"
                  id="btn-summarize-this-chapter"
                >
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Ringkas Bab
                </button>
              </div>

              {/* Chat Output Pane */}
              <div className="p-4 space-y-3 h-[386px] overflow-y-auto scrolling-touch text-xs">
                {aiChatLog.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <div className="bg-emerald-900/40 p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center text-amber-500">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="font-semibold text-amber-200">Asisten Pustaka Digital Anda</p>
                    <p className="text-[11px] text-emerald-200/70 max-w-xs mx-auto">
                      Gunakan fitur ini untuk mencari interpretasi hukum, membandingkan pasal, atau meringkas dokumen ini secara instan fungsional.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setAiInput("Bagaimana implementasi pasal utama di bab ini bagi Jaksa Penuntut?");
                        }}
                        className="text-[10px] bg-emerald-900/30 border border-emerald-800 text-emerald-200 hover:bg-emerald-900/60 transition-all rounded px-2.5 py-1"
                      >
                        "Tanya implementasi JPU?"
                      </button>
                    </div>
                  </div>
                ) : (
                  aiChatLog.map((chat, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                        chat.sender === "user"
                          ? "bg-emerald-900 text-emerald-50 ml-auto border-r-2 border-amber-500"
                          : "bg-slate-800 text-slate-100 mr-auto border-l-2 border-amber-500/50"
                      }`}
                    >
                      <span className="block text-[8px] font-bold text-amber-400 font-mono tracking-wider mb-1 uppercase">
                        {chat.sender === "user" ? currentUser.name : "Kecerdasan Adhyaksa AI"}
                      </span>
                      {/* We display it as plain text and let basic formatting work */}
                      <p className="whitespace-pre-wrap font-sans">{chat.message}</p>
                    </div>
                  ))
                )}

                {aiLoading && (
                  <div className="bg-slate-800/40 p-3 rounded-xl max-w-[85%] mr-auto flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-[10px] text-emerald-200 font-mono">Menganalisis hukum nasional...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input Field form */}
            <form onSubmit={handleAskAi} className="p-3 bg-slate-950 border-t border-emerald-900/40 flex items-center gap-2">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Tanya interpretasi hukum / perbandingan pasal..."
                className="flex-grow bg-slate-900 text-white rounded-lg px-3 py-2 text-xs border border-emerald-800/40 outline-none focus:border-amber-400 transition-colors placeholder:text-slate-500"
                disabled={aiLoading}
              />
              <button
                type="submit"
                disabled={aiLoading || !aiInput.trim()}
                className="p-2.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 rounded-lg transition-colors font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                id="btn-ask-ai-submit"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
