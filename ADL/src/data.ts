import { Book } from "./types";

export const initialBooks: Book[] = [
  {
    id: "uu-kejaksaan",
    title: "Undang-Undang RI Nomor 11 Tahun 2021 tentang Perubahan atas UU No. 16 Tahun 2004 tentang Kejaksaan Republik Indonesia",
    author: "Dewan Perwakilan Rakyat & Presiden RI",
    publisher: "Kementerian Hukum dan HAM RI",
    year: 2021,
    category: "Kejaksaan / SOP",
    tags: ["Undang-Undang", "Kejaksaan", "Adhyaksa", "Tugas & Fungsi"],
    synopsis: "Undang-undang ini merupakan landasan hukum baru yang memperkuat kedudukan, wewenang, dan tata kerja Kejaksaan Agung hingga Kejaksaan Tinggi dan Kejaksaan Negeri, termasuk kewenangan menyidik tindak pidana tertentu, keadilan restoratif, dan perlindungan personel kejaksaan.",
    status: "Tersedia",
    isPopular: true,
    chapters: [
      {
        title: "Ketentuan Umum dan Kedudukan",
        content: "Kejaksaan Republik Indonesia yang selanjutnya disebut Kejaksaan adalah lembaga pemerintahan yang memfasilitasi kekuasaan negara di bidang penuntutan serta kewenangan lain berdasarkan undang-undang. Jaksa adalah pejabat fungsional yang diberi wewenang oleh undang-undang untuk bertindak sebagai penuntut umum dan pelaksana putusan pengadilan yang telah memperoleh kekuatan hukum tetap serta wewenang lain berdasarkan undang-undang."
      },
      {
        title: "Tugas dan Wewenang di Bidang Pidana",
        content: "Di bidang pidana, Kejaksaan mempunyai tugas dan wewenang:\n1. Melakukan penuntutan;\n2. Melaksanakan penetapan hakim dan putusan pengadilan yang telah memperoleh kekuatan hukum tetap;\n3. Melakukan pengawasan terhadap pelaksanaan putusan pidana bersyarat, putusan pidana pengawasan, dan keputusan lepas bersyarat;\n4. Melakukan penyidikan terhadap tindak pidana tertentu berdasarkan undang-undang seperti Tindak Pidana Korupsi."
      },
      {
        title: "Tatanan Organisasi & Intelijen Kejaksaan",
        content: "Kejaksaan dipimpin oleh Jaksa Agung Republik Indonesia yang dibantu oleh Wakil Jaksa Agung dan Pembantu Pimpinan (Jaksa Agung Muda Pidana Khusus, Jaksa Agung Muda Pidana Umum, Jaksa Agung Muda Bidang Perdata dan Tata Usaha Negara, Jaksa Agung Muda Pembinaan, dll). Kejaksaan juga menyelenggarakan intelijen penegakan hukum guna mendukung operasional penegakan hukum nasional."
      }
    ]
  },
  {
    id: "kuhp-baru",
    title: "Kitab Undang-Undang Hukum Pidana (KUHP) - UU No. 1 Tahun 2023",
    author: "Pemerintah Republik Indonesia",
    publisher: "Sekretariat Negara RI",
    year: 2023,
    category: "Undang-Undang",
    tags: ["KUHP", "Pidana", "Kodifikasi", "Reformasi Hukum"],
    synopsis: "Kodifikasi hukum pidana nasional yang baru menggantikan KUHP peninggalan kolonial Belanda (WvS). Mengedepankan keadilan korektif, keadilan rehabilitatif, dan keadilan restoratif dalam penegakan hukum di Indonesia.",
    status: "Tersedia",
    isPopular: true,
    chapters: [
      {
        title: "Buku Kesatu: Aturan Umum (Bab I: Ruang Lingkup Berlakunya Hukum)",
        content: "Pasal 1 menyatakan bahwa tiada suatu perbuatan dapat dipidana kecuali berdasarkan kekuatan ketentuan perundang-undangan pidana yang telah ada sebelum perbuatan dilakukan (Asas Legalitas). Namun, jika terdapat perubahan undang-undang setelah perbuatan dilakukan, digunakan ketentuan yang paling menguntungkan bagi pelaku pidana."
      },
      {
        title: "Buku Kesatu: Bab II: Tindak Pidana dan Pertanggungjawaban Pidana",
        content: "Tindak pidana adalah perbuatan yang oleh peraturan perundang-undangan diancam dengan sanksi pidana dan/atau tindakan. Untuk dapat dipertanggungjawabkan kepada seseorang, perbuatan tersebut harus dilakukan dengan kesalahan (sengaja atau alpa) dan dilakukan oleh orang yang mampu bertanggung jawab secara hukum."
      },
      {
        title: "Buku Kedua: Tindak Pidana Khusus dan Sektoral",
        content: "Mengatur rincian tindak pidana terhadap keamanan negara, ketertiban umum, kekuasaan umum, peradilan (contempt of court), dan tindak pidana yang membahayakan nyawa manusia lainnya secara fisik atau material."
      }
    ]
  },
  {
    id: "kuhap",
    title: "Hukum Acara Pidana di Indonesia (KUHAP - UU No. 8 Tahun 1981)",
    author: "M. Yahya Harahap, S.H.",
    publisher: "Sinar Grafika",
    year: 2018,
    category: "Hukum Pidana",
    tags: ["KUHAP", "Formil", "Penyidikan", "Penuntutan", "Pra-Peradilan"],
    synopsis: "Buku referensi standard yang mengupas tuntas setiap pasal dalam Undang-Undang Nomor 8 Tahun 1981 tentang Kitab Acara Hukum Pidana, ditulis oleh pakar hukum terkemuka mantan Hakim Agung.",
    status: "Tersedia",
    isPopular: false,
    chapters: [
      {
        title: "Penyelidikan dan Penyidikan",
        content: "Penyelidikan adalah serangkaian tindakan penyelidik untuk mencari dan menemukan suatu peristiwa yang diduga sebagai tindak pidana guna menentukan dapat atau tidaknya dilakukan penyidikan. Penyidikan adalah serangkaian tindakan penyidik dalam hal dan menurut cara yang diatur dalam undang-undang ini untuk mencari serta mengumpulkan bukti yang dengan bukti itu membuat terang tentang tindak pidana yang terjadi dan guna menemukan tersangkanya."
      },
      {
        title: "Upaya Paksa (Penangkapan, Penahanan, Penggeledahan)",
        content: "Upaya paksa harus didasarkan pada bukti permulaan yang cukup dan dilakukan dengan surat perintah resmi dari pihak berwenang. Penahanan dapat dilakukan terhadap tersangka atau terdakwa yang diduga keras melakukan tindak pidana berdasarkan bukti yang cukup, dalam hal adanya keadaan yang menimbulkan kekhawatiran bahwa tersangka akan melarikan diri, merusak atau menghilangkan barang bukti dan/atau mengulangi tindak pidana."
      },
      {
        title: "Pra-Peradilan",
        content: "Lembaga praperadilan berwenang untuk memeriksa dan memutus tentang:\n1. Sah atau tidaknya penangkapan, penahanan, penghentian penyidikan atau penghentian penuntutan; dan\n2. Ganti kerugian dan atau rehabilitasi bagi seorang yang perkara pidananya dihentikan pada tingkat penyidikan atau penuntutan."
      }
    ]
  },
  {
    id: "restorative-justice",
    title: "Peraturan Kejaksaan RI Nomor 15 Tahun 2020 tentang Penghentian Penuntutan Berdasarkan Keadilan Restoratif",
    author: "Jaksa Agung Republik Indonesia",
    publisher: "Kejaksaan Agung RI",
    year: 2020,
    category: "Keadilan Restoratif",
    tags: ["Restorative Justice", "RJ", "Penuntutan", "Penghentian", "Asas Dominus Litis"],
    synopsis: "Regulasi monumental Kejaksaan Agung yang mengubah paradigma hukum pidana di Indonesia dengan membuka opsi penyelesaian perkara di luar pengadilan untuk tindak pidana ringan melalui perdamaian antara korban dan pelaku.",
    status: "Tersedia",
    isPopular: true,
    chapters: [
      {
        title: "Dasar Pertimbangan dan Pengertian RJ",
        content: "Keadilan Restoratif adalah penyelesaian perkara tindak pidana dengan melibatkan pelaku, korban, keluarga pelaku/korban, dan pihak lain yang terkait untuk bersama-sama mencari penyelesaian yang adil dengan menekankan pemulihan kembali pada keadaan semula, dan bukan pembalasan. Penghentian penuntutan merupakan manifestasi dari asas oportunitas dan kedudukan Jaksa sebagai pemilik tunggal perkara pidana (Dominus Litis)."
      },
      {
        title: "Syarat Penghentian Penuntutan RJ",
        content: "Penghentian penuntutan berdasarkan keadilan restoratif dapat dilakukan jika memenuhi syarat utama:\n1. Tersangka baru pertama kali melakukan tindak pidana;\n2. Tindak pidana hanya diancam dengan pidana denda atau diancam dengan pidana penjara tidak lebih dari 5 (lima) tahun;\n3. Tindak pidana dilakukan dengan nilai barang bukti atau nilai kerugian yang ditimbulkan akibat dari tindak pidana tidak lebih dari Rp2.500.000,- (dua juta lima ratus ribu rupiah)."
      },
      {
        title: "Tahapan Tata Cara Fasilitasi Perdamaian",
        content: "Jaksa Penuntut Umum bertindak sebagai fasilitator perdamaian. Jaksa memanggil Korban, Tersangka, tokoh masyarakat setempat untuk melakukan pertemuan musyawarah perdamaian secara sukarela. Hasil kesepakatan perdamaian dituangkan dalam Berita Acara Kesepakatan Perdamaian dan diusulkan secara berjenjang ke Kepala Kejaksaan Tinggi hingga mendapat persetujuan Jaksa Agung Muda Bidang Tindak Pidana Umum."
      }
    ]
  },
  {
    id: "corruption-prosecution",
    title: "SOP Khusus Penanganan Perkara Tindak Pidana Korupsi Kejati Sumut",
    author: "Dibidang Tindak Pidana Khusus Kejati Sumut",
    publisher: "Kejaksaan Tinggi Sumatera Utara",
    year: 2023,
    category: "Kejaksaan / SOP",
    tags: ["SOP", "Pidsus", "Korupsi", "Penyelidikan Umum", "Rencana Dakwaan"],
    synopsis: "Standar Operasional Prosedur penanganan perkara korupsi yang berlaku khusus di lingkungan Kejaksaan Tinggi Sumatera Utara guna meningkatkan efektivitas pengembalian kerugian keuangan negara melalui intelijen keuangan dan audit kerugian.",
    status: "Tersedia",
    isPopular: true,
    chapters: [
      {
        title: "Tahap Penyelidikan dan Ekspose Perkara",
        content: "Laporan informasi dari masyarakat dikaji oleh Kasubdit/Kasi Penyidikan. Jika ditemukan indikasi kuat korupsi, dibentuk Tim Penyelidikan yang bekerja 14 hari kerja. Setelah rampung, wajib dilaksanakan Ekspose Perkara (Gelar Perkara) internal yang dihadiri Kepala Kejaksaan Tinggi Sumatera Utara, Wakajati, Aspidsus, Koordinator, serta Jaksa Senior untuk menentukan apakah perkara layak naik ke tingkat Penyidikan."
      },
      {
        title: "Tahap Penyidikan dan Penghitungan Kerugian Negara",
        content: "Penyidik Pidsus berwenang melakukan penyitaan barang bukti, pemblokiran rekening, serta pemeriksaan saksi-saksi dan ahli. Untuk menetapkan tersangka, penyidik minimal harus mengantongi 2 alat bukti yang sah. Dalam hal penentuan kerugian keuangan negara, Kejati Sumut berkoordinasi erat dengan BPK, BPKP, atau Akuntan Publik Independen guna memperoleh Laporan Hasil Pemeriksaan Kerugian Negara."
      },
      {
        title: "Penuntutan dan Rencana Dakwaan (Redak)",
        content: "Sebelum pelimpahan perkara ke Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Medan, Tim Jaksa Penuntut Umum menyusun Rencana Dakwaan (Redak) yang cermat, jelas, dan lengkap mengenai tindak pidana yang didakwakan. Tuntutan pidana harus mempertimbangkan besaran uang pengganti yang wajib dibayarkan terdakwa guna mengoptimalisasi asset recovery."
      }
    ]
  },
  {
    id: "jurnal-adhyaksa-sumut",
    title: "Jurnal Ilmiah Adhyaksa Sumut - Volume XII Edisi Juni 2024",
    author: "Tim Redaksi Jurnal Kejati Sumut",
    publisher: "Kejaksaan Tinggi Sumatera Utara",
    year: 2024,
    category: "Jurnal Hukum",
    tags: ["Jurnal", "Karya Tulis", "Disertasi", "Kajian Kejati Sumut"],
    synopsis: "Kumpulan karya ilmiah, analisis hukum, dan esai fungsional yang ditulis oleh para Jaksa dan fungsional di lingkungan Kejaksaan Tinggi Sumatera Utara mengenai penerapan asas pemidanaan dan reformasi hukum birokrasi.",
    status: "Tersedia",
    isPopular: false,
    chapters: [
      {
        title: "Implementasi Restorative Justice pada Perkara Penganiayaan Ringan di Sumatra Utara",
        content: "Artikel ini membahas efektivitas mediasi penal di tingkat Kejaksaan Negeri di bawah wilayah hukum Kejati Sumut. Dari total 120 perkara yang diusulkan RJ selama tahun 2023, tingkat keberhasilan perdamaian mencapai 94%, yang berkontribusi signifikan pada pengurangan overkapasitas Lapas di Sumatera Utara."
      },
      {
        title: "Optimalisasi Penyelamatan Aset Negara Melalui Fungsi Perdata dan Tata Usaha Negara (Datun)",
        content: "Kajian fungsional tentang peran Jaksa Pengacara Negara (JPN) Kejati Sumut dalam memulihkan keuangan daerah melalui pendampingan hukum dan bantuan hukum kepada BUMN/BUMD serta pemerintah kabupaten/kota se-Sumatera Utara."
      }
    ]
  },
  {
    id: "hukum-perdata",
    title: "Hukum Perdata Indonesia: Materiil dan Formil",
    author: "Prof. Dr. Subekti, S.H.",
    publisher: "Balai Pustaka",
    year: 2017,
    category: "Hukum Perdata",
    tags: ["Perdata", "BW", "Kontrak", "Warisan", "Hukum Orang"],
    synopsis: "Panduan legendaris mengenang dasar-dasar hukum perdata barat yang terkodifikasi dalam Burgerlijk Wetboek (BW) dan aplikasinya dalam tata perdata nasional saat ini.",
    status: "Tersedia",
    isPopular: false,
    chapters: [
      {
        title: "Hukum Orang dan Hukum Keluarga",
        content: "Mengatur mengenai subjek hukum perdata yaitu manusia dan badan hukum. Menjelaskan tentang domisili, kecakapan bertindak di depan hukum, perkawinan, hak dan kewajiban suami istri, kekuasaan orang tua, perwalian, dan pengampuan."
      },
      {
        title: "Hukum Benda (Zakenrecht)",
        content: "Benda adalah segala barang dan hak yang dapat dimiliki oleh orang. Hukum benda mengatur hak-hak kebendaan (Asas Closed System) seperti hak milik (eigendom), hak guna bangunan, hak tanggungan, gadai, dan hak besit (bezit)."
      },
      {
        title: "Hukum Perikatan (Verbintenissenrecht)",
        content: "Perikatan bersumber dari undang-undang atau perjanjian. Perjanjian melahirkan hak dan kewajiban bagi para pihak demi hukum (Asas Pacta Sunt Servanda). Pasal 1320 BW menetapkan syarat sahnya suatu perjanjian: 1) Kesepakatan para pihak, 2) Kecakapan membuat perikatan, 3) Suatu hal tertentu, 4) Suatu sebab yang halal."
      }
    ]
  },
  {
    id: "etik-jaksa",
    title: "Kode Etik Perilaku Jaksa dan Doktrin Tri Krama Adhyaksa",
    author: "Bidang Pembinaan Kejaksaan Agung RI",
    publisher: "KORPRI Kejaksaan RI",
    year: 2022,
    category: "Kejaksaan / SOP",
    tags: ["Etik", "Disiplin", "Tri Krama Adhyaksa", "PERSAJA"],
    synopsis: "Pegangan wajib moral dan integritas seluruh insan Adhyaksa dalam menjalankan amanah keadilan. Menjabarkan nilai Tri Krama Adhyaksa: Satya, Adhi, Wicaksana secara aplikatif.",
    status: "Tersedia",
    isPopular: true,
    chapters: [
      {
        title: "Doktrin Tri Krama Adhyaksa",
        content: "Tri Krama Adhyaksa adalah doktrin moral yang harus ditaati sebagai pedoman hidup setiap Jaksa:\n1. SATYA: Kesetiaan yang bersumber pada rasa jujur, baik terhadap tuhan, keluarga, diri sendiri, maupun sesama umat manusia;\n2. ADHI: Kesempurnaan dalam bertugas serta berunsur utama pada rasa tanggung jawab kepada tuhan, keluarga, bangsa, dan negara;\n3. WICAKSANA: Bijaksana dalam tutur kata dan tindak tanduk, khususnya dalam penegakan hukum demi tercapainya keadilan."
      },
      {
        title: "Kewajiban Jaksa Terhadap Negara dan Profesi",
        content: "Seorang jaksa wajib menjunjung tinggi Pancasila dan UUD 1945, menjaga integritas moral, bertindak objektif dalam penuntutan tanpa pengaruh intervensi politik atau kekuasaan mana pun. Jaksa dilarang keras menerima suap, gratifikasi, atau menyalahgunakan wewenang dalam menangani perkara hukum."
      }
    ]
  }
];
