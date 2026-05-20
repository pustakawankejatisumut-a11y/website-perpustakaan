import React, { useState } from "react";
import { User } from "../types";
import { Cpu, Send, Sparkles, Scale, Info, Download, Award, ShieldCheck } from "lucide-react";

interface AiResearchViewProps {
  currentUser: User;
}

export function AiResearchView({ currentUser }: AiResearchViewProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<{ sender: "user" | "ai"; text: string; time: string }[]>([]);

  const exampleQuestions = [
    "Bagaimana kriteria materiil RJ untuk perkara penganiayaan sesuai Perja No 15 Tahun 2020?",
    "Apa saja langkah preventif Jaksa Pengacara Negara (JPN) Kejati Sumut dalam penyelamatan aset BUMD?",
    "Bagaimana legalitas penuntutan tunggal (Dominus Litis) dalam UU Kejaksaan terbaru?",
    "Bagaimana penerapan restorative justice dalam perkara narkotika tingkat penyidikan dan penuntutan?"
  ];

  const handleAskResearchAi = async (textToSearch: string) => {
    if (!textToSearch.trim() || loading) return;

    const currentQuery = textToSearch.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChats((prev) => [...prev, { sender: "user", text: currentQuery, time: timeStr }]);
    setQuery("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: currentQuery,
          userRole: currentUser.role,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setChats((prev) => [
          ...prev,
          { sender: "ai", text: data.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ]);
      } else {
        setChats((prev) => [
          ...prev,
          { sender: "ai", text: "Maaf, sistem pemrosesan draf hukum AI mengalami interupsi teknis.", time: "" },
        ]);
      }
    } catch (err: any) {
      setChats((prev) => [
        ...prev,
        { sender: "ai", text: `Gagal tersambung ke layanan penelitian: ${err.message}`, time: "" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAskResearchAi(query);
  };

  // Convert chat to downloadable legal opinions memorandum
  const handleDownloadMemo = (text: string) => {
    const textHeader = `========================================================\n` +
                       `       DRAF OPINI HUKUM / MEMORANDUM PENELITIAN ADL      \n` +
                       `            KEJAKSAAN TINGGI SUMATERA UTARA              \n` +
                       `========================================================\n` +
                       `Tanggal: ${new Date().toLocaleDateString()}\n` +
                       `Peneliti: ${currentUser.name} (${currentUser.role})\n` +
                       `NIP: ${currentUser.nip}\n` +
                       `Bidang: ${currentUser.division}\n` +
                       `--------------------------------------------------------\n\n` +
                       `ISI ANALISIS:\n\n${text}\n\n` +
                       `--------------------------------------------------------\n` +
                       `*Dokumen ini merupakan draf penelitian sekunder berbantuan AI*\n` +
                       `*Adhyaksa Digital Library Kejati Sumut*\n` +
                       `========================================================\n`;
    
    const blob = new Blob([textHeader], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Memo_Riset_Adhyaksa_${currentUser.nip}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6" id="ai-research-assistant-block">
      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-950 p-2 rounded-xl text-amber-400">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Adhyaksa AI Legal Research Copilot</h3>
              <p className="text-xs text-slate-500">
                Pencarian doktrin hukum, analisa yurisprudensi, penulisan legal opinion, dan kajian regulasi formal.
              </p>
            </div>
          </div>
          
          <div className="bg-amber-500/10 text-amber-800 border border-amber-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Enkripsi Internal Kejaksaan Aktif
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left pane: Chat room (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[550px] justify-between overflow-hidden">
            {/* Thread container */}
            <div className="flex-grow p-6 space-y-4 overflow-y-auto scrolling-touch">
              {chats.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-emerald-900 border border-emerald-100">
                    <Scale className="h-8 w-8 text-emerald-950" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">Konsultasi Yurisprudensi & Doktrin Hukum</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      Ketikkan studi kasus hukum, analisis perbandingan delik pidana, atau perumusan dakwaan untuk dikaji secara langsung oleh agen kecerdasan buatan ADL.
                    </p>
                  </div>

                  <div className="pt-4 max-w-lg mx-auto bg-slate-50 border border-slate-100 rounded-lg p-3 text-left">
                    <div className="flex gap-2 text-xs text-slate-600">
                      <Info className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                      <span>
                        Sistem kecerdasan buatan ADL ditenagai langsung oleh <strong>Gemini 3.5 Flash</strong>, diformulasikan khusus dengan hukum fungsional pidana-perdata Indonesia.
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                chats.map((chat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[85%] ${
                      chat.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    }`}
                  >
                    <span className="text-[9px] text-slate-400 font-mono mb-1">
                      {chat.sender === "user" ? currentUser.name : "Adhyaksa Counsel AI"} • {chat.time}
                    </span>
                    
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed position-relative shadow-sm ${
                        chat.sender === "user"
                          ? "bg-emerald-950 text-white border-br-none"
                          : "bg-slate-50 text-slate-800 border border-slate-200 border-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-sans">{chat.text}</p>
                      
                      {chat.sender === "ai" && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex justify-end">
                          <button
                            onClick={() => handleDownloadMemo(chat.text)}
                            className="bg-emerald-900/5 hover:bg-emerald-900/10 text-emerald-900 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-all"
                            title="Unduh draf analisis ini"
                          >
                            <Download className="h-3 w-3" />
                            Unduh Nota Memo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {loading && (
                <div className="flex flex-col items-start max-w-[80%]">
                  <span className="text-[9px] text-slate-400 font-mono mb-1">Adhyaksa AI sedang merumuskan draf...</span>
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-emerald-900 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-900 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-emerald-900 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rincikan hipotesis hukum Anda di sini..."
                className="flex-grow text-xs bg-white text-slate-800 rounded-lg px-3.5 py-3 border border-slate-200 outline-none focus:border-emerald-950 transition-colors placeholder:text-slate-400"
                disabled={loading}
                id="ai-research-input"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold rounded-lg text-xs py-3 px-4 flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                Analisa
              </button>
            </form>
          </div>
        </div>

        {/* Right pane: Quick query suggestions & statutory references (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">
              Kueri Analisis Cepat JPU
            </h4>
            <div className="space-y-2">
              {exampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(q)}
                  className="w-full text-left p-3 rounded-lg text-xs border border-slate-200 hover:border-emerald-950 hover:bg-emerald-50/20 text-slate-700 hover:text-emerald-950 font-medium transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-emerald-100 rounded-xl p-5 border border-amber-500/30">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs font-mono uppercase tracking-wider mb-2">
              <Award className="h-4 w-4" />
              <span>Instruksi Jaksa Agung</span>
            </div>
            <p className="text-[11px] leading-relaxed text-emerald-100/90 font-sans">
              Segala draf dan analisis hukum sekunder berbantuan AI harus dikaji ulang secara berjenjang oleh Jaksa Pengendali Perkara (P-16/P-16A) sebelum dicantumkan secara formal dalam Berkas Acara Pendapat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
