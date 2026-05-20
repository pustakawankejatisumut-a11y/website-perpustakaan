import React, { useState } from "react";
import { Book, User } from "../types";
import { Search, Filter, BookOpen, Clock, Heart, ArrowRight, Bookmark, AlertCircle, Sparkles } from "lucide-react";

interface CatalogViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  currentUser: User;
  onBorrowBook: (bookId: string) => void;
  borrowedBooks: any[];
}

export function CatalogView({ books, onSelectBook, currentUser, onBorrowBook, borrowedBooks }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [activeSubTab, setActiveSubTab] = useState<"semua" | "populer" | "pinjaman-saya">("semua");

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "Semua" || book.category === selectedCategory;

    if (activeSubTab === "populer") {
      return matchesSearch && matchesCategory && book.isPopular;
    }

    if (activeSubTab === "pinjaman-saya") {
      // Find book in borrowedBooks belonging to this user NIP
      return (
        matchesSearch &&
        matchesCategory &&
        borrowedBooks.some((bb) => bb.bookId === book.id && bb.borrowerNip === currentUser.nip && bb.status === "Aktif")
      );
    }

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "Semua",
    "Undang-Undang",
    "Hukum Pidana",
    "Keadilan Restoratif",
    "Kejaksaan / SOP",
    "Hukum Perdata",
    "Jurnal Hukum",
  ];

  return (
    <div className="space-y-6" id="catalog-section">
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-amber-500/30 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-cover opacity-10 bg-no-repeat pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at right, rgba(245,158,11,0.2), transparent)" }}></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300 mb-4">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Adhyaksa Legal Knowledge Base
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Selamat Datang di Portal Literatur Resmi
          </h2>
          <p className="mt-2 text-sm sm:text-base text-emerald-200/90 leading-relaxed">
            Temukan koleksi regulasi terbaru, modul fungsional, dan penelitian hukum yang disiapkan khusus untuk menunjang tugas harian Jaksa dan pegawai Kejaksaan Tinggi Sumatera Utara.
          </p>
        </div>
      </div>

      {/* Search & Sub-tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Sub tabs */}
        <div className="flex border-b border-slate-100 pb-2 md:pb-0 md:border-none gap-2">
          <button
            onClick={() => setActiveSubTab("semua")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === "semua"
                ? "bg-emerald-950 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            Semua Koleksi ({books.length})
          </button>
          <button
            onClick={() => setActiveSubTab("populer")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === "populer"
                ? "bg-amber-500 text-emerald-950 shadow-sm"
                : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            Rekomendasi Utama
          </button>
          <button
            onClick={() => setActiveSubTab("pinjaman-saya")}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === "pinjaman-saya"
                ? "bg-emerald-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Peminjaman Saya ({borrowedBooks.filter((bb) => bb.borrowerNip === currentUser.nip && bb.status === "Aktif").length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul buku, penulis, kata kunci..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none text-slate-800"
            id="book-search-input"
          />
        </div>
      </div>

      {/* Grid Layout (Sidebar Filters + Book Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column filter menu */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
            <div className="flex items-center gap-2 font-semibold text-slate-800 text-sm mb-3">
              <Filter className="h-4 w-4 text-emerald-900" />
              Kategori Dokumen
            </div>
            
            <div className="flex flex-wrap lg:flex-col gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left w-full px-3 py-2 text-xs rounded-lg transition-all font-medium ${
                    selectedCategory === cat
                      ? "bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-900 pl-4"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 pl-3"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest font-mono mb-2 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5" />
              ADAGIUM LIBRARY
            </h4>
            <p className="text-[11px] text-slate-700 leading-relaxed font-sans">
              "Bagi seorang insan Adhyaksa, buku adalah saksi yang tak pernah berdusta, dan perpustakaan adalah titik nol di mana keadilan mulai dieja."
            </p>
          </div>
        </div>

        {/* Book List container */}
        <div className="lg:col-span-3">
          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
              <div className="bg-slate-50 p-4 rounded-full w-14 h-14 mx-auto flex items-center justify-center text-slate-400 mb-3">
                <Search className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-700">Tidak ada buku yang cocok dengan kriteria Anda</p>
              <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci atau filter kategori Anda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooks.map((book) => {
                const isUserBorrowing = borrowedBooks.some(
                  (bb) => bb.bookId === book.id && bb.borrowerNip === currentUser.nip && bb.status === "Aktif"
                );

                return (
                  <div
                    key={book.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-emerald-900/40 transition-all flex flex-col justify-between group relative"
                    id={`book-card-${book.id}`}
                  >
                    {/* Badge popularity */}
                    {book.isPopular && (
                      <span className="absolute top-3 right-3 bg-amber-500/15 text-amber-800 border border-amber-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        Rekomendasi
                      </span>
                    )}

                    <div>
                      {/* Top metadata */}
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                          {book.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Tahun {book.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="mt-2 text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-emerald-950 transition-colors">
                        {book.title}
                      </h4>

                      {/* Author */}
                      <p className="text-xs text-slate-500 mt-1">
                        Karya: <span className="font-medium">{book.author}</span>
                      </p>

                      {/* Description synopsis clip */}
                      <p className="text-xs text-slate-600 line-clamp-3 mt-2 font-sans leading-relaxed">
                        {book.synopsis}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {book.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-emerald-50/75 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-medium border border-emerald-100/30"
                          >
                            #{tag}
                          </span>
                        ))}
                        {book.tags.length > 3 && (
                          <span className="text-[9px] text-slate-400 font-semibold self-center">
                            +{book.tags.length - 3} lagi
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Interactive Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      {/* Borrow status indicator */}
                      <span className="flex items-center gap-1.5 text-xs">
                        {isUserBorrowing ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <Bookmark className="h-3 w-3 fill-emerald-600" />
                            Sedang Dipinjam
                          </span>
                        ) : book.status === "Dipinjam" ? (
                          <span className="text-amber-600 font-medium">Stok Kosong</span>
                        ) : (
                          <span className="text-slate-400">Tersedia Digital</span>
                        )}
                      </span>

                      {/* Actions buttons */}
                      <div className="flex space-x-2">
                        {!isUserBorrowing && book.status === "Tersedia" && (
                          <button
                            onClick={() => onBorrowBook(book.id)}
                            className="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-all"
                            id={`btn-borrow-${book.id}`}
                          >
                            Daftar Bacaan
                          </button>
                        )}
                        <button
                          onClick={() => onSelectBook(book)}
                          className="px-3 py-1 text-xs font-semibold bg-emerald-950 text-white hover:bg-emerald-900 shadow-sm rounded-lg flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                          id={`btn-read-${book.id}`}
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          Baca Sekarang
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
