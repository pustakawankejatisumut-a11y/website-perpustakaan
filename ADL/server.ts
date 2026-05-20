import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with named parameters as per instructions
// We check for GEMINI_API_KEY, and fallback gracefully if missing so the server doesn't crash on startup
const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini API Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client:", err);
  }
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI features will respond with simulated content.");
}

// REST API Endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    aiEnabled: !!ai,
  });
});

// Legal Research Assistant Route
app.post("/api/gemini/research", async (req, res) => {
  const { query, bookContext, userRole } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  // If AI client is not available, we return elegant simulated legal insights based on Prosecutor standards
  if (!ai) {
    setTimeout(() => {
      res.json({
        text: `### [Simulasi AI Adhyaksa] Analisis Hukum Kejaksaan Tinggi Sumut\n\nTerima kasih atas pertanyaan Anda mengenai: *"${query}"*.\n\nKarena kunci sistem AI pusat sedang dikonfigurasi, berikut adalah rekomendasi normatif fungsional:\n1. **Landasan Hukum**: Rujuk pada UU No. 11 Tahun 2021 tentang Kejaksaan RI serta KUHP Pasal terkait.\n2. **Kewenangan Jaksa**: Hak penuntutan tunggal (*Dominus Litis*) menegaskan bahwa Jaksa berwenang penuh mengendalikan perkara dari penyelidikan hingga putusan tetap.\n3. **Rekomendasi Doktrinal**: Harap konsultasikan dengan Standar Operasional Prosedur (SOP) Kejati Sumut terkait penanganan perkara ${bookContext ? `di bawah pustaka ${bookContext}` : "terkait"}.\n\n*(Catatan: Konfigurasikan kunci API Gemini Anda di Secrets untuk mengaktifkan kecerdasan penuh kami.)*`
      });
    }, 1200);
    return;
  }

  try {
    const systemPrompt = `Anda adalah Asisten Riset Hukum AI Resmi untuk "Adhyaksa Digital Library (ADL) Kejaksaan Tinggi Sumatera Utara".
Tugas Anda adalah melayani para Jaksa (Prosecutor) dan Pegawai Kejaksaan Tinggi Sumatera Utara dalam riset hukum, penelusuran undang-undang, perumusan argumen dakwaan fungsional, analisis keadilan restoratif (restorative justice), kriminologi, dan pemahaman SOP Kejaksaan.

Gunakan bahasa Indonesia yang formal, taktis, berintegritas tinggi (mencerminkan doktrin Tri Krama Adhyaksa: Satya, Adhi, Wicaksana), namun mudah dipahami.
Sampaikan rekomendasi secara objektif dengan mencantumkan rujukan undang-undang atau peraturan terkait jika memungkinkan.
Jika ada konteks buku yang disertakan (${bookContext || "tidak ada"}), prioritaskan analisis berdasarkan rujukan buku tersebut.
Identitas pengguna saat ini: ${userRole || "Anggota Kejaksaan"}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: query,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini AI Research Error:", error);
    res.status(500).json({
      error: "Gagal berinteraksi dengan AI Adhyaksa",
      details: error.message || error,
    });
  }
});

// Book/Document Summarization Route
app.post("/api/gemini/summarize", async (req, res) => {
  const { bookTitle, chapterTitle, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required to generate a summary" });
  }

  if (!ai) {
    setTimeout(() => {
      res.json({
        summary: `### Ringkasan Cepat [Simulasi ADL]\n\n**Dokumen**: ${bookTitle || "Pustaka Kejati"} - ${chapterTitle || "Umum"}\n\n* **Poin Utama**: Dokumen ini menjelaskan kerangka fungsional penegakan hukum tata tertib Kejaksaan Tinggi.\n* **Aspek Kunci**: Menjabarkan wewenang formil dan materiil aparat penegak hukum, kepatuhan moral, dan akuntabilitas.\n* **Kesimpulan**: Diperlukan sinkronisasi berkala antara SOP internal dan regulasi undang-undang nasional.\n\n*(Sistem AI sedang berjalan dalam mode simulasi offline.)*`
      });
    }, 1000);
    return;
  }

  try {
    const prompt = `Berikan ringkasan eksekutif hukum yang padat, tajam, dan informatif untuk dokumen berikut:
Buku: ${bookTitle || "Umum"}
Bab/Bagian: ${chapterTitle || "Semua"}

Teks Dokumen:
${content}

Format ringkasan menggunakan bullet points markdown bahasa Indonesia, fokus pada dampak hukum fungsional bagi Jaksa atau pegawai Kejaksaan.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah analis pakar hukum senior di Kejaksaan Agung RI yang membantu meringkas dokumen berat untuk dikaji cepat oleh Jaksa Agung Muda.",
        temperature: 0.3,
      },
    });

    res.json({ summary: response.text });
  } catch (error: any) {
    console.error("Gemini AI Summarize Error:", error);
    res.status(500).json({
      error: "Gagal memproses ringkasan dokumen",
      details: error.message || error,
    });
  }
});

// Vite & Static file integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ADYAKSA LIBRARY SERVER] Berjalan di http://0.0.0.0:${PORT}`);
  });
}

startServer();
