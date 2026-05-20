import React from "react";
import { User } from "../types";
import { BookOpen, LogOut, Shield, Award, UserCheck, Cpu } from "lucide-react";

interface HeaderProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function Header({ currentUser, activeTab, setActiveTab, onLogout }: HeaderProps) {
  if (!currentUser) return null;

  const isAdmin = currentUser.role === "KEPALA_PERPUSTAKAAN";
  const isJaksa = currentUser.role === "JAKSA";

  return (
    <header className="bg-emerald-950 text-white shadow-md border-b-2 border-amber-500/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-lg text-emerald-950 shadow-inner">
              <BookOpen className="h-7 w-7 stroke-[2.25]" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
                ADL <span className="text-amber-400 font-medium">Kejati Sumut</span>
              </h1>
              <p className="text-xs text-emerald-300 font-mono">
                Adhyaksa Digital Library • Sumatera Utara
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab("katalog")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "katalog"
                  ? "bg-emerald-900 text-amber-400 border border-amber-500/30"
                  : "text-emerald-100 hover:bg-emerald-900/50 hover:text-white"
              }`}
            >
              Katalog Buku
            </button>
            <button
              onClick={() => setActiveTab("riset-ai")}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === "riset-ai"
                  ? "bg-emerald-900 text-amber-400 border border-amber-500/30"
                  : "text-emerald-100 hover:bg-emerald-900/50 hover:text-white"
              }`}
            >
              <Cpu className="h-4 w-4 text-amber-400 animate-pulse" />
              Asisten Riset AI
            </button>
            <button
              onClick={() => setActiveTab("usulan")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "usulan"
                  ? "bg-emerald-900 text-amber-400 border border-amber-500/30"
                  : "text-emerald-100 hover:bg-emerald-900/50 hover:text-white"
              }`}
            >
              Usulkan Referensi
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab("dashboard-admin")}
                className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  activeTab === "dashboard-admin"
                    ? "bg-amber-500 text-emerald-950 font-semibold"
                    : "text-amber-400 hover:bg-emerald-900/50"
                }`}
              >
                <Shield className="h-4 w-4" />
                Panel Kaper
              </button>
            )}
          </nav>

          {/* User Status and Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold flex items-center justify-end gap-1 text-amber-200">
                {isJaksa ? (
                  <Award className="h-4 w-4 text-amber-400" />
                ) : isAdmin ? (
                  <Shield className="h-4 w-4 text-red-400" />
                ) : (
                  <UserCheck className="h-4 w-4 text-emerald-400" />
                )}
                {currentUser.name}
              </div>
              <div className="text-xs text-emerald-300 font-mono">
                NIP. {currentUser.nip} • {currentUser.division}
              </div>
            </div>

            <button
              onClick={onLogout}
              className="bg-emerald-900/80 hover:bg-red-900/80 border border-emerald-800 text-emerald-100 hover:text-red-100 p-2 rounded-md transition-colors"
              title="Keluar dari Aplikasi"
              id="btn-logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden bg-emerald-900 border-t border-emerald-800 p-2 flex justify-around">
        <button
          onClick={() => setActiveTab("katalog")}
          className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
            activeTab === "katalog" ? "bg-emerald-950 text-amber-400" : "text-emerald-200"
          }`}
        >
          Katalog
        </button>
        <button
          onClick={() => setActiveTab("riset-ai")}
          className={`text-xs px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-all ${
            activeTab === "riset-ai" ? "bg-emerald-950 text-amber-400" : "text-emerald-200"
          }`}
        >
          <Cpu className="h-3 w-3 text-amber-400" />
          Riset AI
        </button>
        <button
          onClick={() => setActiveTab("usulan")}
          className={`text-xs px-3 py-1.5 rounded font-medium transition-all ${
            activeTab === "usulan" ? "bg-emerald-950 text-amber-400" : "text-emerald-200"
          }`}
        >
          Usulkan
        </button>
        {isAdmin && (
          <button
            onClick={() => setActiveTab("dashboard-admin")}
            className={`text-xs px-3 py-1.5 rounded font-medium flex items-center gap-1 transition-all ${
              activeTab === "dashboard-admin" ? "bg-amber-500 text-emerald-950" : "text-amber-400"
            }`}
          >
            Panel Kaper
          </button>
        )}
      </div>
    </header>
  );
}
