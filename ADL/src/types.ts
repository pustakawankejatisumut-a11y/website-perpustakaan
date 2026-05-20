export type UserRole = "JAKSA" | "PEGAWAI" | "KEPALA_PERPUSTAKAAN";

export interface User {
  nip: string;
  name: string;
  role: UserRole;
  division: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  category: "Hukum Pidana" | "Hukum Perdata" | "Undang-Undang" | "Kejaksaan / SOP" | "Jurnal Hukum" | "Umum" | "Keadilan Restoratif";
  tags: string[];
  synopsis: string;
  chapters: { title: string; content: string }[];
  coverUrl?: string;
  isPopular?: boolean;
  status: "Tersedia" | "Dipinjam";
  pdfUrl?: string;
}

export interface BookSuggestion {
  id: string;
  title: string;
  author: string;
  suggestorName: string;
  suggestorNip: string;
  reason: string;
  date: string;
  status: "Pending" | "Disetujui" | "Ditolak";
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerNip: string;
  borrowerName: string;
  borrowDate: string;
  dueDate: string;
  status: "Aktif" | "Dikembalikan" | "Terlambat";
}

export interface VisitorLog {
  id: string;
  nip: string;
  name: string;
  role: UserRole;
  division: string;
  purpose: string;
  entryTime: string;
}

export interface BookHighlight {
  id: string;
  bookId: string;
  chapterIndex: number;
  text: string;
  color: string;
  note?: string;
  date: string;
}
