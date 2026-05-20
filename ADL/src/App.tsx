import React, { useState, useEffect } from "react";
import { User, Book, BookSuggestion, VisitorLog, BorrowedBook, BookHighlight } from "./types";
import { initialBooks } from "./data";
import { Header } from "./components/Header";
import { LandingView } from "./components/LandingView";
import { CatalogView } from "./components/CatalogView";
import { ReaderView } from "./components/ReaderView";
import { SuggestionForm } from "./components/SuggestionForm";
import { AiResearchView } from "./components/AiResearchView";
import { LibrarianDashboard } from "./components/LibrarianDashboard";
import { Scale, RefreshCw } from "lucide-react";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>((() => {
    const saved = localStorage.getItem("adl_currentUser");
    return saved ? JSON.parse(saved) : null;
  })());

  const [activeTab, setActiveTab] = useState<string>("katalog");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Core Data Lists with localStorage persistence
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem("adl_books");
    return saved ? JSON.parse(saved) : initialBooks;
  });

  const [suggestions, setSuggestions] = useState<BookSuggestion[]>(() => {
    const saved = localStorage.getItem("adl_suggestions");
    if (saved) return JSON.parse(saved);

    // Initial default suggestions
    return [
      {
        id: "sug-1",
        title: "Kompilasi Putusan Tindak Pidana Korupsi & Asset Recovery 2024",
        author: "Penerbit Puslitbang Kejaksaan Agung RI",
        suggestorName: "Andrianto Ginting, S.H., M.H. (Jaksa Senior)",
        suggestorNip: "198205162007011015",
        reason: "Sangat dibutuhkan sebagai landasan penyusunan taksiran pidana uang pengganti kasus korupsi korporasi daerah.",
        date: "2026-05-18",
        status: "Pending"
      },
      {
        id: "sug-2",
        title: "Modul Praktis Hukum Intelijen Taktis Kejaksaan RI",
        author: "Badan Diklat Kejaksaan RI",
        suggestorName: "Laras Situmorang, A.Md.",
        suggestorNip: "199411082019032008",
        reason: "Modul literatur penting bagi fungsional intelijen guna memahami teknik penyadapan dan penggalangan informasi yang sah.",
        date: "2026-05-19",
        status: "Disetujui"
      }
    ];
  });

  const [visitors, setVisitors] = useState<VisitorLog[]>(() => {
    const saved = localStorage.getItem("adl_visitors");
    if (saved) return JSON.parse(saved);

    // Initial default visitors
    return [
      {
        id: "v-1",
        nip: "198205162007011015",
        name: "Andrianto Ginting, S.H., M.H. (Jaksa Senior)",
        role: "JAKSA",
        division: "Tindak Pidana Khusus (Pidsus)",
        purpose: "meriset draf tuntutan subsider korupsi",
        entryTime: "08:32 WIB"
      },
      {
        id: "v-2",
        nip: "199411082019032008",
        name: "Laras Situmorang, A.Md.",
        role: "PEGAWAI",
        division: "Intelijen",
        purpose: "mempelajari tata kerja siber intel Kejaksaan Agung",
        entryTime: "09:12 WIB"
      }
    ];
  });

  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>(() => {
    const saved = localStorage.getItem("adl_borrowedBooks");
    return saved ? JSON.parse(saved) : [];
  });

  const [highlights, setHighlights] = useState<BookHighlight[]>(() => {
    const saved = localStorage.getItem("adl_highlights");
    return saved ? JSON.parse(saved) : [];
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("adl_books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("adl_suggestions", JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem("adl_visitors", JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem("adl_borrowedBooks", JSON.stringify(borrowedBooks));
  }, [borrowedBooks]);

  useEffect(() => {
    localStorage.setItem("adl_highlights", JSON.stringify(highlights));
  }, [highlights]);

  // Login handler
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("adl_currentUser", JSON.stringify(user));

    // Register login logic in VisitorLog list
    const currentTime = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short"
    });

    const newLog: VisitorLog = {
      id: "v-" + Date.now(),
      nip: user.nip,
      name: user.name,
      role: user.role,
      division: user.division,
      purpose: user.role === "KEPALA_PERPUSTAKAAN" ? "Melakukan administrasi kepustakaan utama" : "Membaca pustaka hukum",
      entryTime: currentTime
    };

    setVisitors((prev) => [newLog, ...prev]);
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedBook(null);
    setActiveTab("katalog");
    localStorage.removeItem("adl_currentUser");
  };

  // Add highlight in reader
  const handleAddHighlight = (newHighlight: Omit<BookHighlight, "id" | "date">) => {
    const freshHL: BookHighlight = {
       ...newHighlight,
       id: "hl-" + Date.now(),
       date: new Date().toLocaleDateString("id-ID")
    };
    setHighlights((prev) => [freshHL, ...prev]);
  };

  // Submit book suggestions
  const handleAddSuggestion = (newSug: { title: string; author: string; reason: string }) => {
    if (!currentUser) return;
    const suggestion: BookSuggestion = {
      id: "sug-" + Date.now(),
      title: newSug.title,
      author: newSug.author,
      reason: newSug.reason,
      suggestorName: currentUser.name,
      suggestorNip: currentUser.nip,
      date: new Date().toLocaleDateString("id-ID"),
      status: "Pending",
    };
    setSuggestions((prev) => [suggestion, ...prev]);
  };

  // Borrow a book
  const handleBorrowBook = (bookId: string) => {
    if (!currentUser) return;
    const selected = books.find((b) => b.id === bookId);
    if (!selected) return;

    // Check if duplicate borrow
    const alreadyBorrowed = borrowedBooks.some(
      (b) => b.bookId === bookId && b.borrowerNip === currentUser.nip && b.status === "Aktif"
    );
    if (alreadyBorrowed) return;

    // Add borrow record
    const record: BorrowedBook = {
      id: "borrow-" + Date.now(),
      bookId,
      bookTitle: selected.title,
      borrowerNip: currentUser.nip,
      borrowerName: currentUser.name,
      borrowDate: new Date().toLocaleDateString("id-ID"),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("id-ID"),
      status: "Aktif",
    };

    setBorrowedBooks((prev) => [record, ...prev]);
  };

  // Admin approvals
  const handleUpdateSuggestionStatus = (id: string, newStatus: "Disetujui" | "Ditolak") => {
    setSuggestions((prev) =>
      prev.map((sug) => (sug.id === id ? { ...sug, status: newStatus } : sug))
    );
  };

  // Admin Add book
  const handleAddNewBook = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev]);
  };

  // Clear application states to start fresh
  const handleResetDatabase = () => {
    const confirm = window.confirm("Apakah Anda yakin ingin memulihkan database perpustakaan ke kondisi awal Kejati Sumut?");
    if (confirm) {
      localStorage.clear();
      setBooks(initialBooks);
      setSuggestions([
        {
          id: "sug-1",
          title: "Kompilasi Putusan Tindak Pidana Korupsi & Asset Recovery 2024",
          author: "Penerbit Puslitbang Kejaksaan Agung RI",
          suggestorName: "Andrianto Ginting, S.H., M.H.",
          suggestorNip: "198205162007011015",
          reason: "Sangat dibutuhkan sebagai landasan penyusunan taksiran pidana uang pengganti kasus korupsi korporasi daerah.",
          date: "2026-05-18",
          status: "Pending"
        }
      ]);
      setVisitors([]);
      setBorrowedBooks([]);
      setHighlights([]);
      window.location.reload();
    }
  };

  // User is not logged in / Portal mode
  if (!currentUser) {
    return <LandingView onLoginSuccess={handleLoginSuccess} />;
  }

  // User is logged in on general tabs
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Header
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedBook(null); // Close active reader if tab switches
          }}
          onLogout={handleLogout}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* If an e-book is active, prioritizing ReaderView */}
          {selectedBook ? (
            <ReaderView
              book={selectedBook}
              onBack={() => setSelectedBook(null)}
              currentUser={currentUser}
              highlights={highlights}
              onAddHighlight={handleAddHighlight}
            />
          ) : (
            <>
              {activeTab === "katalog" && (
                <CatalogView
                  books={books}
                  currentUser={currentUser}
                  onSelectBook={(bk) => setSelectedBook(bk)}
                  onBorrowBook={handleBorrowBook}
                  borrowedBooks={borrowedBooks}
                />
              )}

              {activeTab === "riset-ai" && (
                <AiResearchView currentUser={currentUser} />
              )}

              {activeTab === "usulan" && (
                <SuggestionForm
                  currentUser={currentUser}
                  onSubmitSuggestion={handleAddSuggestion}
                  mySuggestions={suggestions.filter((s) => s.suggestorNip === currentUser.nip)}
                />
              )}

              {activeTab === "dashboard-admin" && currentUser.role === "KEPALA_PERPUSTAKAAN" && (
                <LibrarianDashboard
                  books={books}
                  suggestions={suggestions}
                  visitors={visitors}
                  borrowedBooks={borrowedBooks}
                  onAddNewBook={handleAddNewBook}
                  onUpdateSuggestionStatus={handleUpdateSuggestionStatus}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer & Reset option */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left font-mono leading-relaxed">
            <span className="font-bold text-slate-800">Adhyaksa Digital Library (ADL) v2.0</span>
            <span className="block text-[11px] text-slate-400 mt-1">Kejaksaan Tinggi Sumatera Utara • Korps Adhyaksa Berintegritas</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleResetDatabase}
              className="text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1.5 p-1.5 bg-slate-100 hover:bg-red-50 rounded"
              title="Kembalikan Pustaka"
              id="btn-reset-db"
            >
              <RefreshCw className="h-3 w-3" />
              Reset Database Kejati Sumut
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
