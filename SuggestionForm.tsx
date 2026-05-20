import React, { useState } from "react";
import { User, BookSuggestion } from "../types";
import { Send, FileText, CheckCircle, Award, Scale } from "lucide-react";

interface SuggestionFormProps {
  currentUser: User;
  onSubmitSuggestion: (suggestion: Omit<BookSuggestion, "id" | "date" | "status" | "suggestorName" | "suggestorNip">) => void;
  mySuggestions: BookSuggestion[];
}

export function SuggestionForm({ currentUser, onSubmitSuggestion, mySuggestions }: SuggestionFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !reason) return;

    onSubmitSuggestion({
      title: title.trim(),
      author: author.trim(),
      reason: reason.trim(),
    });

    setTitle("");
    setAuthor("");
    setReason("");

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="space-y-6" id="suggestion-form-panel">
      {/* Intro memo header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4 mb-4">
          <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-lg">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm md:text-base">Usulkan Buku Referensi Baru</h3>
            <p className="text-xs text-slate-500">
              Pengajuan pustaka, peraturan perundang-undangan terbaru atau modul pelatihan hukum fungsional secara dinamis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Submission Input (md:col-span-7) */}
          <form onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
            {submitted && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-lg flex items-center gap-2.5 text-xs font-semibold animate-pulse">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Format usulan telah dikirim ke Kepala Perpustakaan (Kaper) Kejati Sumut! Terima kasih.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1" htmlFor="book-title-sugg">
                Judul Buku / Jurnal / Dokumen Hukum
              </label>
              <input
                id="book-title-sugg"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Pembuktian Elektronik dalam Tindak Pidana Siber"
                className="w-full text-xs px-3.5 py-2.5 border border-slate-350 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none placeholder:text-slate-400 text-slate-850 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1" htmlFor="book-author-sugg">
                Penulis / Penyusun / Instansi Penerbit
              </label>
              <input
                id="book-author-sugg"
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Contoh: Prof. Hikmahanto Juwana, S.H., LL.M."
                className="w-full text-xs px-3.5 py-2.5 border border-slate-350 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none placeholder:text-slate-400 text-slate-850 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1" htmlFor="book-reason-sugg">
                Justifikasi Hukum (Alasan mengapa buku ini penting diusulkan)
              </label>
              <textarea
                id="book-reason-sugg"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Contoh: Buku ini memuat preseden mutakhir terkait audit digital forensik guna mendukung pembuktian pasal korupsi berskala luas di sidings pengadilan..."
                className="w-full text-xs p-3 border border-slate-350 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none placeholder:text-slate-400 text-slate-850 h-28 resize-none bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              id="submit-suggestion-btn"
            >
              <Send className="h-3.5 w-3.5" />
              Kirim Nota Usulan
            </button>
          </form>

          {/* User's Historic Submissions (md:col-span-5) */}
          <div className="md:col-span-5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono mb-3 flex items-center gap-1">
              <FileText className="h-4 w-4 text-emerald-800" />
              Daftar Usulan Saya ({mySuggestions.length})
            </h4>

            {mySuggestions.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Belum ada nota referensi yang diajukan sebelumnya.
              </div>
            ) : (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {mySuggestions.map((sug) => (
                  <div key={sug.id} className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-sm text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">{sug.date}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          sug.status === "Disetujui"
                            ? "bg-emerald-100 text-emerald-800"
                            : sug.status === "Ditolak"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {sug.status}
                      </span>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-800">{sug.title}</h5>
                      <p className="text-[11px] text-slate-500 font-mono">Penulis: {sug.author}</p>
                    </div>

                    <p className="text-[11.5px] text-slate-600 line-clamp-3 italic">
                      " {sug.reason} "
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
