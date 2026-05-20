import React, { useState } from "react";
import { Book, User, BookSuggestion, VisitorLog, BorrowedBook } from "../types";
import { Users, BookOpen, FileText, Check, X, PlusCircle, Bookmark, ShieldAlert, Award, Calendar, ChevronRight } from "lucide-react";

interface LibrarianDashboardProps {
  books: Book[];
  suggestions: BookSuggestion[];
  visitors: VisitorLog[];
  borrowedBooks: BorrowedBook[];
  onAddNewBook: (book: Book) => void;
  onUpdateSuggestionStatus: (id: string, newStatus: "Disetujui" | "Ditolak") => void;
}

export function LibrarianDashboard({
  books,
  suggestions,
  visitors,
  borrowedBooks,
  onAddNewBook,
  onUpdateSuggestionStatus,
}: LibrarianDashboardProps) {
  const [activeSegment, setActiveSegment] = useState<"ringkasan" | "tambah-buku" | "persetujuan" | "pengunjung">("ringkasan");

  // Form states for adding new book
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [newYear, setNewYear] = useState(new Date().getFullYear());
  const [newCategory, setNewCategory] = useState<Book["category"]>("Kejaksaan / SOP");
  const [newTags, setNewTags] = useState("");
  const [newSynopsis, setNewSynopsis] = useState("");
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterContent, setNewChapterContent] = useState("");
  const [bookAddedSuccess, setBookAddedSuccess] = useState(false);

  // Stats
  const totalBooks = books.length;
  const pendingSuggestions = suggestions.filter((s) => s.status === "Pending").length;
  const activeBorrows = borrowedBooks.filter((b) => b.status === "Aktif").length;
  const uniqueUsersCount = Array.from(new Set(visitors.map((v) => v.nip))).length;

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newSynopsis) return;

    // Build some content if empty
    const formalChapters = [
      {
        title: newChapterTitle.trim() || "Bab Kesatu: Pendahuluan & Prinsip Dasar",
        content: newChapterContent.trim() || "Isi bab ini menjabarkan asas hukum formal maupun implementasi taktis fungsional di lingkungan Kejaksaan.",
      },
      {
        title: "Bab Kedua: Kajian Kasus & Keputusan Yuridis",
        content: "Keputusan hukum yang adil mengedepankan asas kemaslahatan publik dan integritas penuntut umum yang merdeka.",
      }
    ];

    const tagsArray = newTags
      ? newTags.split(",").map((t) => t.trim().toLowerCase())
      : ["referensi", "kejati", "sumut"];

    onAddNewBook({
      id: "buku-" + Date.now(),
      title: newTitle.trim(),
      author: newAuthor.trim(),
      publisher: newPublisher.trim() || "Kejati Sumut Press",
      year: Number(newYear),
      category: newCategory,
      tags: tagsArray,
      synopsis: newSynopsis.trim(),
      chapters: formalChapters,
      status: "Tersedia",
    });

    // Reset Form
    setNewTitle("");
    setNewAuthor("");
    setNewPublisher("");
    setNewYear(new Date().getFullYear());
    setNewSynopsis("");
    setNewTags("");
    setNewChapterTitle("");
    setNewChapterContent("");

    setBookAddedSuccess(true);
    setTimeout(() => {
      setBookAddedSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-6" id="kaper-backoffice">
      {/* Backoffice Header banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm md:text-base flex items-center gap-2">
            <Award className="text-amber-500 h-5 w-5" />
            Panel Kerja Kepala Perpustakaan
          </h3>
          <p className="text-xs text-slate-500">
            Fasilitas tata kelola internal untuk memantau sirkulasi pustaka hukum, usulan, dan log kehadiran pegawai Kejati Sumut.
          </p>
        </div>

        {/* Work desk selector tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-lg self-start md:self-center">
          <button
            onClick={() => setActiveSegment("ringkasan")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${
              activeSegment === "ringkasan" ? "bg-emerald-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Sirkulasi & Statistik
          </button>
          <button
            onClick={() => setActiveSegment("tambah-buku")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${
              activeSegment === "tambah-buku" ? "bg-emerald-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Registrasi Buku Baru
          </button>
          <button
            onClick={() => setActiveSegment("persetujuan")}
            className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1 ${
              activeSegment === "persetujuan" ? "bg-emerald-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Review Usulan Referensi
            {pendingSuggestions > 0 && (
              <span className="bg-amber-500 text-emerald-950 text-[9px] font-bold px-1 rounded-full">
                {pendingSuggestions}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveSegment("pengunjung")}
            className={`px-3 py-1.5 text-xs font-semibold rounded ${
              activeSegment === "pengunjung" ? "bg-emerald-950 text-white shadow-sm" : "text-slate-600 hover:text-slate-800"
            }`}
          >
            Log Digital Pengunjung
          </button>
        </div>
      </div>

      {/* Main Backoffice Body segment router */}
      {activeSegment === "ringkasan" && (
        <div className="space-y-6">
          {/* Bento grids stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-emerald-100 text-emerald-950 p-3 rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-mono tracking-wider font-semibold uppercase">Total Literatur</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">{totalBooks} Jilid</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-amber-100 text-amber-950 p-3 rounded-xl">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-mono tracking-wider font-semibold uppercase">Usulan Masuk</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">{suggestions.length} Nota</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-indigo-100 text-indigo-950 p-3 rounded-xl">
                <Bookmark className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-mono tracking-wider font-semibold uppercase">Pinjaman Aktif</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">{activeBorrows} Buku</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="bg-teal-100 text-teal-980 p-3 rounded-xl">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-xs text-slate-400 font-mono tracking-wider font-semibold uppercase">Pegawai Terdaftar</span>
                <span className="text-xl md:text-2xl font-black text-slate-800">{uniqueUsersCount || 3} Personil</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sirkulasi terpinjam table (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 overflow-hidden">
              <h4 className="text-xs font-bold text-slate-500 uppercase font-mono mb-4 flex items-center gap-1.5">
                <Bookmark className="h-4 w-4 text-emerald-800" />
                Daftar Pelacakan Buku Terpinjam Digital
              </h4>

              {borrowedBooks.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Belum ada sirkulasi peminjaman digital aktif hari ini.
                </div>
              ) : (
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50 text-slate-600">
                        <th className="p-2.5 font-bold uppercase font-mono">Judul Literatur</th>
                        <th className="p-2.5 font-bold uppercase font-mono">Peminjam NIP</th>
                        <th className="p-2.5 font-bold uppercase font-mono">Divisi</th>
                        <th className="p-2.5 font-bold uppercase font-mono">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {borrowedBooks.map((bb) => (
                        <tr key={bb.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                          <td className="p-2.5 font-semibold text-slate-800 max-w-[200px] truncate">{bb.bookTitle}</td>
                          <td className="p-2.5 font-mono text-slate-500">{bb.borrowerName} ({bb.borrowerNip.slice(-6)})</td>
                          <td className="p-2.5 text-slate-600">Kejati Sumut</td>
                          <td className="p-2.5">
                            <span className="bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded text-[10px]">
                              {bb.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick action guidelines for Kaper (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-xl p-6 border border-emerald-900/40">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono mb-3">
                Arahan Kerja Pengawasan Kaper Kejati Sumut
              </h4>
              <ul className="space-y-3.5 text-xs text-emerald-200/90 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0" />
                  <span>Pastikan setiap rincian buku baru yang didaftarkan telah lulus penilaian kepustakaan hukum fungsional untuk menghindari salah tafsir di tingkat JPU.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0" />
                  <span>Tinjau ulang usulan referensi dari para Jaksa Senior secepatnya guna mengoptimalisasi asset pengadaan literatur tahun anggaran berjalan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0" />
                  <span>Gunakan modul kecerdasan buatan ADL secara berimbang dalam membimbing aparatur hukum muda yang berkunjung meriset delik pra-tuntutan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT 2: Form to register/add new book */}
      {activeSegment === "tambah-buku" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-4 flex items-center gap-1">
            <PlusCircle className="h-4 w-4 text-emerald-900" />
            Registrasi & Indeks Berkas Hukum Baru
          </h4>

          {bookAddedSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 px-4 py-3 rounded-lg text-xs font-semibold mb-4 animate-pulse flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-600" />
              Rincian buku hukum baru berhasil dimasukkan ke katalog utama ADL!
            </div>
          )}

          <form onSubmit={handleCreateBook} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Judul Buku / Dokumen Hukum</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Contoh: Pembuktian Alat Bukti Elektronik Tindak Pidana Korupsi"
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 hover:border-slate-400 text-slate-800 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nama Penulis / Penyusun Utama</label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Contoh: Dr. Andrianto, S.H., M.H."
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 text-slate-800 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Instansi Penerbit / Sektor Birokrasi</label>
              <input
                type="text"
                value={newPublisher}
                onChange={(e) => setNewPublisher(e.target.value)}
                placeholder="Contoh: Kejaksaan Tinggi Sumut Press"
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 text-slate-800 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tahun Pengadaan / Rilis</label>
              <input
                type="number"
                value={newYear}
                onChange={(e) => setNewYear(Number(e.target.value))}
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 text-slate-800 bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Kategori Utama Dokumen</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Book["category"])}
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 text-slate-800 bg-white text-xs"
              >
                <option value="Undang-Undang">Undang-Undang</option>
                <option value="Hukum Pidana">Hukum Pidana</option>
                <option value="Hukum Perdata">Hukum Perdata</option>
                <option value="Kejaksaan / SOP">Kejaksaan / SOP</option>
                <option value="Jurnal Hukum">Jurnal Hukum</option>
                <option value="Keadilan Restoratif">Keadilan Restoratif</option>
                <option value="Umum">Umum</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Kata Kunci / Tag Penelusuran (Pisahkan dengan Koma)</label>
              <input
                type="text"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
                placeholder="krim, siber, korupsi, sumut, 2026"
                className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 text-slate-850 bg-white text-xs"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1">Sinopsis Hukum Singkat</label>
              <textarea
                required
                value={newSynopsis}
                onChange={(e) => setNewSynopsis(e.target.value)}
                placeholder="Jelaskan secara ringkas batasan materiil fungsional, subjek penanganan, serta tujuan dibuatnya referensi hukum ini..."
                className="w-full p-3 border border-slate-300 rounded-lg outline-none focus:border-emerald-950 text-slate-800 h-24 resize-none bg-white text-xs"
              />
            </div>

            <div className="md:col-span-2 border-t border-slate-100 pt-4 mt-2">
              <h5 className="font-bold text-slate-700 uppercase tracking-wide mb-3">Draf Konten Isi Bab (Untuk Lembar Baca)</h5>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <label className="block text-slate-600 font-medium mb-1">Judul Bab Kesatu</label>
                  <input
                    type="text"
                    value={newChapterTitle}
                    onChange={(e) => setNewChapterTitle(e.target.value)}
                    placeholder="Contoh: Bab I: Ruang Lingkup dan Asas"
                    className="w-full p-2 px-3 border border-slate-300 rounded outline-none focus:border-emerald-950 text-slate-800 text-xs bg-white"
                  />
                </div>
                <div className="md:col-span-8">
                  <label className="block text-slate-600 font-medium mb-1">Konten Intisari (Paragraph Utama)</label>
                  <textarea
                    value={newChapterContent}
                    onChange={(e) => setNewChapterContent(e.target.value)}
                    placeholder="Ketikkan teks utuh perihal pasal, tata kerja atau SOP fungsional..."
                    className="w-full p-2 border border-slate-300 rounded outline-none h-20 resize-none focus:border-emerald-950 text-slate-800 text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 md:col-span-2 w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all"
              id="submit-new-book-btn"
            >
              Registrasikan ke Katalog Utama ADL Sumut
            </button>
          </form>
        </div>
      )}

      {/* SEGMENT 3: Review submissions from other prosecutors */}
      {activeSegment === "persetujuan" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono mb-4 flex items-center gap-1">
            <ShieldAlert className="h-4 w-4 text-emerald-900" />
            Review & Evaluasi Nota Referensi Pegawai
          </h4>

          {suggestions.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs italic">
              Tidak ada draf nota referensi eksternal yang diajukan oleh pegawai.
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                        Status: {sug.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Diajukan oleh: <strong className="text-slate-700">{sug.suggestorName}</strong> (NIP {sug.suggestorNip})
                      </span>
                    </div>

                    <h5 className="font-bold text-slate-800 text-sm">{sug.title}</h5>
                    <p className="text-slate-500 font-mono">Penulis / Penerbit: {sug.author}</p>
                    <p className="text-slate-600 italic bg-white p-2.5 rounded border border-slate-100">
                      " {sug.reason} "
                    </p>
                  </div>

                  {sug.status === "Pending" && (
                    <div className="flex gap-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => onUpdateSuggestionStatus(sug.id, "Ditolak")}
                        className="p-2 border border-red-300 hover:bg-red-50 text-red-700 rounded-lg flex items-center gap-1 transition-all"
                        title="Tolak Usulan"
                      >
                        <X className="h-4 w-4" />
                        Tolak
                      </button>
                      <button
                        onClick={() => onUpdateSuggestionStatus(sug.id, "Disetujui")}
                        className="p-2 bg-emerald-950 hover:bg-emerald-900 text-white rounded-lg flex items-center gap-1 transition-all font-semibold"
                        title="Setujui Pengadaan Buku"
                      >
                        <Check className="h-4 w-4 text-amber-400" />
                        Setujui
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 4: Log internal static list of digital visitors */}
      {activeSegment === "pengunjung" && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono flex items-center gap-1">
              <Calendar className="h-4 w-4 text-emerald-900" />
              Catatan Daftar Kehadiran & Log Digital Perpustakaan
            </h4>
            <span className="text-xs text-slate-400 font-mono">Hari ini: {new Date().toLocaleDateString("id-ID")}</span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <th className="p-3 font-bold uppercase font-mono">Waktu Log</th>
                  <th className="p-3 font-bold uppercase font-mono">Nama Lengkap</th>
                  <th className="p-3 font-bold uppercase font-mono">NIP Pegawai</th>
                  <th className="p-3 font-bold uppercase font-mono">Bidang / Seksi Kerja</th>
                  <th className="p-3 font-bold uppercase font-mono">Keperluan Riset</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                    <td className="p-3 text-slate-500 font-mono">{v.entryTime}</td>
                    <td className="p-3 font-semibold text-slate-800">{v.name}</td>
                    <td className="p-3 font-mono text-slate-600">{v.nip}</td>
                    <td className="p-3 text-slate-700">{v.division}</td>
                    <td className="p-3 text-slate-600 italic">"{v.purpose}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
