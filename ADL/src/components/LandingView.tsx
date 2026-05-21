import React, { useState } from "react";
import { User, UserRole } from "../types";
import { BookOpen, ShieldCheck, Scale, Award, ArrowRight } from "lucide-react";

interface LandingViewProps {
  onLoginSuccess: (user: User) => void;
}

export function LandingView({ onLoginSuccess }: LandingViewProps) {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("JAKSA");
  const [division, setDivision] = useState("Pidana Umum");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nip || !name) return;

    onLoginSuccess({
      nip: nip.trim(),
      name: name.trim(),
      role,
      division,
    });
  };

  // Prefilled accounts for quick demo access
  const demoAccounts = [
    {
      name: "Ismarandy, S.H., M.H.",
      role: "KEPALA URUSAN PERPUSTAKAAN DAN DOKUMENTASI HUKUM" as UserRole,
      nip: "198208132010121001",
      division: "Pembinaan / Perpustakaan Utama",
    },
    {
      name: "Rubintan Sagala, S.H. (Staff Perpustakaan)",
      role: "PEGAWAI" as UserRole,
      nip: "197204031996032001",
      division: "Perpustakaan dan Dokumentasi Hukum (Pembinaan)",
    },
    {
      name: "Doris Vine Siagian.,SH",
      role: "PEGAWAI" as UserRole,
      nip: "197511202002122002",
      division: "Perpustakaan dan Dokumentasi Hukum (Pembinaan)",
    },
     {
      name: "Adventi Sitompul.,Amd",
      role: "PEGAWAI" as UserRole,
      nip: "1983120200212002",
      division: "Perpustakaan dan Dokumentasi Hukum (Pembinaan)",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between" id="landing-page">
      {/* Top Banner */}
      <div className="bg-emerald-950 text-white py-4 px-6 border-b border-amber-500 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <Scale className="h-5 w-5 text-amber-400" />
          <span className="text-xs font-mono tracking-wider font-semibold text-amber-300">
            KEJAKSAAN TINGGI SUMATERA UTARA
          </span>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
          Edisi Internal v2.0
        </span>
      </div>

      {/* Main Content Body */}
      <div className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          
          {/* Identity Column (Left) */}
          <div className="bg-emerald-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-900 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20"></div>
            
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center text-emerald-950 shadow-md mb-6">
                <BookOpen className="h-9 w-9" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                Adhyaksa Digital Library <span className="text-amber-400">(ADL)</span>
              </h2>
              <p className="mt-2 text-sm text-emerald-200/90 font-light">
                Gerbang Portal Literatur Hukum dan Informasi Pengetahuan Intern Terintegrasi Kejaksaan Tinggi Sumatera Utara.
              </p>
            </div>

            <div className="mt-8 space-y-4 relative z-10">
              <div className="flex items-start space-x-3 text-sm">
                <div className="bg-emerald-900 p-1.5 rounded mt-0.5">
                  <Scale className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider font-mono">Riset Hukum Cepat</h4>
                  <p className="text-xs text-emerald-200/80">Akses Kitab Undang-Undang Hukum Pidana, SOP, Perdata, dan Jurnal fungsional.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 text-sm">
                <div className="bg-emerald-900 p-1.5 rounded mt-0.5">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-300 text-xs uppercase tracking-wider font-mono">Asisten Riset AI</h4>
                  <p className="text-xs text-emerald-200/80">Kecerdasan Buatan Terintegrasi untuk merangkum berkas, menyusun RBA, dan legal opini fungsional.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-emerald-900/60 flex items-center justify-between text-xs font-mono text-emerald-400/80 relative z-10">
              <span>Kejaksaan RI</span>
              <span>Medan, Sumatra Utara</span>
            </div>
          </div>

          {/* Form & Demo Account Column (Right) */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Masuk Akun Pegawai</h3>
              <p className="text-xs text-slate-500 mt-1">
                Gunakan NIP dan Bidang Tugas Anda untuk mengakses pustaka digital.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Role Switcher */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider font-mono mb-1.5">
                    Kategori Pengguna
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
                    {(["JAKSA", "PEGAWAI", "KEPALA_PERPUSTAKAAN"] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          setRole(r);
                          if (r === "KEPALA_PERPUSTAKAAN") {
                            setDivision("Pembinaan");
                          }
                        }}
                        className={`py-1.5 text-center text-xs font-medium rounded-md transition-all ${
                          role === r
                            ? "bg-emerald-950 text-white shadow-sm"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        }`}
                      >
                        {r === "KEPALA_PERPUSTAKAAN" ? "Kepala" : r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="input-name">
                    Nama Lengkap (Beserta Gelar)
                  </label>
                  <input
                    id="input-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Andrianto Ginting, S.H., M.H."
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none transition-all placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                {/* NIP Input */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="input-nip">
                    Nomor Induk Pegawai (NIP)
                  </label>
                  <input
                    id="input-nip"
                    type="text"
                    required
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    placeholder="Harus 18 digit angka"
                    maxLength={18}
                    className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none transition-all placeholder:text-slate-400 text-slate-800"
                  />
                </div>

                {/* Division Selector */}
                {role !== "KEPALA_PERPUSTAKAAN" && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1" htmlFor="input-division">
                      Bidang Tugas / Seksi
                    </label>
                    <select
                      id="input-division"
                      value={division}
                      onChange={(e) => setDivision(e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-950 focus:border-emerald-950 outline-none text-slate-800 bg-white"
                    >
                      <option value="Tindak Pidana Umum (Pidum)">Pembinaan</option>
                      <option value="Tindak Pidana Umum (Pidum)">Tindak Pidana Umum (Pidum)</option>
                      <option value="Tindak Pidana Khusus (Pidsus)">Tindak Pidana Khusus (Pidsus)</option>
                      <option value="Intelijen">Intelijen</option>
                      <option value="Perdata dan Tata Usaha Negara (Datun)">Perdata dan Tata Usaha Negara (Datun)</option>
                      <option value="Pengawasan">Pengawasan</option>
                      <option value="Militer">Pidana Militer</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  id="btn-login-submit"
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-white py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
                >
                  Masuk ADL
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Quick Demo Accounts */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mb-2">
                Akses Cepat Demo Pengguna (Khusus Pengujian)
              </h4>
              <div className="space-y-1.5">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => onLoginSuccess(account)}
                    className="w-full text-left p-2.5 border border-slate-200 hover:border-amber-500 rounded-lg hover:bg-amber-500/5 transition-all flex items-center justify-between group"
                    id={`quick-demo-login-${index}`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">
                        {account.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {account.role === "KEPALA_PERPUSTAKAAN" ? "Kepala Perpustakaan" : account.role} • NIP {account.nip}
                      </div>
                    </div>
                    <span className="text-[10px] bg-slate-100 group-hover:bg-amber-100 group-hover:text-amber-800 px-1.5 py-0.5 rounded font-medium text-slate-600">
                      PILIH
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Footer copyright */}
      <footer className="py-4 text-center text-xs text-slate-400 font-mono bg-slate-50 border-t border-slate-200">
        © 2026 Adhyaksa Digital Library. Kejaksaan Tinggi Sumatera Utara. All Rights Reserved.
      </footer>
    </div>
  );
}
