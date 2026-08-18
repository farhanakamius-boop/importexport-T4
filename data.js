// js/data.js - Pangkalan Data Silibus Incoterms SLK30203

// Struktur utama data
const IncotermsData = {
  // Maklumat Pengenalan & 3 Pilar
  concept: {
    title: "Konsep Incoterms",
    definition: "INCOTERMS (International Commercial Terms) ialah satu set kod tiga huruf yang diiktiraf di peringkat global, diterbitkan oleh Dewan Perniagaan Antarabangsa (ICC). Ia menetapkan peraturan standard untuk menentukan tanggungjawab, kos, dan risiko bagi pembeli (pengimport) dan penjual (pengeksport) dalam transaksi perdagangan antarabangsa.",
    pillars: [
      {
        id: "tasks",
        title: "Tanggungjawab (Tasks)",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        description: "Menentukan siapa yang menguruskan penyediaan dokumen eksport-import, kontrak pengangkutan utama, perlindungan insurans, dan kelulusan pelepasan kastam di kedua-dua belah sempadan."
      },
      {
        id: "risk",
        title: "Risiko (Risk)",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        description: "Menentukan di mana dan bila titik pindahan risiko (point of risk transfer) berlaku daripada penjual kepada pembeli sekiranya berlaku kerosakan, kecurian, atau kehilangan kargo semasa transit."
      },
      {
        id: "costs",
        title: "Kos (Costs)",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        description: "Menentukan pihak mana yang wajib membayar tambang pengangkutan utama, duti kastam eksport/import, insurans, caj pengendalian di pelabuhan (THC), dan kos penghantaran tempatan."
      }
    ],
    notControlled: [
      "Incoterms bukanlah keseluruhan kontrak jualan.",
      "Incoterms tidak menentukan masa atau kaedah pemindahan hak milik sah (transfer of property/title) ke atas barangan.",
      "Incoterms tidak mengawal harga barangan, syarat pembayaran, atau remedi undang-undang sekiranya berlaku kemungkiran kontrak."
    ]
  },

  // Perubahan Incoterms 2020
  updates2020: [
    {
      title: "DAT kepada DPU",
      desc: "Menggantikan terma DAT (Delivered at Terminal) kepada DPU (Delivered at Place Unloaded) untuk memberikan lebih fleksibiliti di mana tempat pemunggahan barangan boleh dibuat di mana-mana tempat yang dinamakan, tidak terhad di terminal sahaja."
    },
    {
      title: "Tahap Insurans CIP vs CIF",
      desc: "Meningkatkan perlindungan insurans minimum untuk terma CIP di bawah Institute Cargo Clauses (A) (perlindungan penuh/all risks), manakala CIF kekal menggunakan perlindungan minimum di bawah Institute Cargo Clauses (C)."
    },
    {
      title: "Pengangkutan Sendiri",
      desc: "Membenarkan penggunaan pengangkutan sendiri (kenderaan sendiri) oleh pembeli atau penjual di bawah terma FCA, DAP, DPU, dan DDP tanpa perlu mengikat kontrak dengan syarikat pengangkut pihak ketiga."
    }
  ],

  // Sejarah Garis Masa
  timeline: [
    { year: "1936", event: "ICC menerbitkan versi pertama Incoterms dengan 6 peraturan utama bagi mengatasi percanggahan undang-undang perdagangan domestik." },
    { year: "1953", event: "Kemas kini pertama bagi menangani pengangkutan kereta api dan jalan raya." },
    { year: "1967", event: "Pengenalan terma bagi menangani penghantaran udara dan pelabuhan serantau." },
    { year: "1976", event: "Perubahan bagi mengintegrasikan penggunaan dokumen elektronik ringkas." },
    { year: "1980", event: "Diperkenalkan terma FRC (kini FCA) disebabkan oleh perkembangan kontena rantaian logistik." },
    { year: "1990", event: "Penyusunan semula struktur terma untuk menyokong pertukaran data elektronik (EDI) sepenuhnya." },
    { year: "2000", event: "Pembersihan format pembahagian tanggungjawab kastam eksport/import bagi memudahkan pengguna." },
    { year: "2010", event: "Penggabungan beberapa terma (seperti DAF, DES, DEQ, DDU) kepada terma DAP dan DAT, mengurangkan jumlah dari 13 kepada 11 terma." },
    { year: "2020", event: "Pelancaran versi terbaharu dengan fleksibiliti DPU, perbezaan tahap insurans CIP/CIF, serta peraturan keselamatan kargo pengangkutan." }
  ],

  // Perincian 11 Terma Incoterms 2020
  terms: {
    EXW: {
      code: "EXW",
      name: "Ex Works",
      translation: "Di Kilang / Premis Penjual",
      mode: "multimodal",
      group: "E",
      riskPoint: "Premis penjual (kilang/gudang) sebaik sahaja barangan disediakan untuk diambil oleh pembeli.",
      costPoint: "Premis penjual. Semua kos selepas itu (lori, tambang kapal, kastam, insurans) ditanggung oleh pembeli.",
      customsExport: "Pembeli (Pengimport) - Ini adalah satu-satunya terma di mana pembeli menguruskan pelepasan eksport.",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menyediakan barangan di kilang/gudang sendiri, melabel barangan, dan membungkus dengan selamat untuk eksport.",
      buyerResponsibility: "Mengurus dan membayar pengangkutan ke pelabuhan asal, pelepasan kastam eksport, tambang pengangkutan utama, insurans kargo, kastam import, dan penghantaran akhir.",
      academicNote: "Terma ini meletakkan tanggungjawab minimum kepada penjual dan tanggungjawab maksimum kepada pembeli. Sangat sukar bagi pembeli luar negara menguruskan Borang K2 eksport di Malaysia secara praktikal."
    },
    FCA: {
      code: "FCA",
      name: "Free Carrier",
      translation: "Percuma kepada Pengangkut",
      mode: "multimodal",
      group: "F",
      riskPoint: "Apabila barangan diserahkan kepada syarikat pengangkutan yang dilantik oleh pembeli di tempat yang dinamakan.",
      costPoint: "Tempat penyerahan yang dinamakan di negara asal (contoh: terminal lapangan terbang atau depoh lori).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menguruskan pelepasan kastam eksport (Borang K2) dan memuatkan barangan ke dalam kenderaan pengangkut pembeli sekiranya berlaku di premis penjual.",
      buyerResponsibility: "Menguruskan kontrak pengangkutan utama dari tempat penyerahan ke destinasi, membayar insurans (pilihan), menguruskan kastam import dan penghantaran akhir.",
      academicNote: "Sangat popular untuk kargo kontena (FCL/LCL) kerana ia fleksibel dan sesuai untuk pengangkutan jalan raya, kereta api atau udara sebelum pengangkutan utama."
    },
    CPT: {
      code: "CPT",
      name: "Carriage Paid To",
      translation: "Tambang Dibayar Kepada",
      mode: "multimodal",
      group: "C",
      riskPoint: "Berlaku di negara asal apabila barangan diserahkan kepada syarikat pengangkut pertama (pindahan dua-titik).",
      costPoint: "Destinasi yang dinamakan di negara import (tambang dibayar oleh penjual sehingga ke destinasi tersebut).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menguruskan pelepasan kastam eksport, membayar tambang lori tempatan dan tambang pengangkutan utama sehingga destinasi yang dipersetujui.",
      buyerResponsibility: "Menanggung risiko kerosakan semasa kargo dalam transit utama, membayar insurans kargo (pilihan), pelepasan kastam import, dan pengangkutan dari destinasi ke gudang sendiri.",
      academicNote: "Ingat! Risiko berpindah di negara asal (apabila kargo diserahkan kepada pengangkut pertama), tetapi kos dibayar oleh penjual sehingga ke destinasi import. Ini dinamakan 'Pindahan Dua Titik'."
    },
    CIP: {
      code: "CIP",
      name: "Carriage and Insurance Paid To",
      translation: "Tambang dan Insurans Dibayar Kepada",
      mode: "multimodal",
      group: "C",
      riskPoint: "Berlaku di negara asal apabila barangan diserahkan kepada pengangkut pertama.",
      costPoint: "Destinasi yang dinamakan di negara import (tambang dan insurans dibayar oleh penjual).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menguruskan kastam eksport, membayar pengangkutan utama, dan wajib membeli polisi insurans kargo di bawah perlindungan Institute Cargo Clauses (A) (All Risks) untuk pembeli.",
      buyerResponsibility: "Menguruskan pelepasan kastam import, membayar cukai import, dan memunggah barangan di destinasi akhir (kecuali dipersetujui sebaliknya).",
      academicNote: "Di bawah Incoterms 2020, CIP mewajibkan penjual membeli perlindungan insurans maksimum (A), berbeza dengan CIF yang hanya memerlukan perlindungan minimum (C)."
    },
    DAP: {
      code: "DAP",
      name: "Delivered at Place",
      translation: "Diserah di Tempat",
      mode: "multimodal",
      group: "D",
      riskPoint: "Di atas kenderaan pengangkutan yang sedia untuk dipunggah di lokasi destinasi yang dinamakan di negara pembeli.",
      costPoint: "Destinasi yang dinamakan (kos pemunggahan di destinasi ditanggung oleh pembeli).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menanggung kos & risiko membawa barang dari gudang asal hingga ke destinasi di negara import (termasuk tambang utama & lori tempatan import).",
      buyerResponsibility: "Menguruskan pelepasan kastam import (Borang K1), membayar duti/cukai import, dan menanggung kos memunggah barang daripada kenderaan di destinasi.",
      academicNote: "Penjual tidak bertanggungjawab memunggah barang (unloading). Risiko kerosakan semasa pemunggahan di gudang pembeli adalah di bawah tanggungjawab pembeli sendiri."
    },
    DPU: {
      code: "DPU",
      name: "Delivered at Place Unloaded",
      translation: "Diserah di Tempat Tanpa Punggah",
      mode: "multimodal",
      group: "D",
      riskPoint: "Di lokasi destinasi yang dinamakan, sebaik sahaja barangan telah dipunggah (unloaded) dari kenderaan pengangkutan.",
      costPoint: "Destinasi yang dinamakan (termasuk kos pemunggahan oleh penjual).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menanggung kos, pengangkutan, insurans, dan risiko sepenuhnya termasuk kos memunggah barang di tempat destinasi yang dipersetujui.",
      buyerResponsibility: "Menguruskan kelulusan kastam import, membayar duti kastam, SST, dan urusan dokumentasi import berkaitan.",
      academicNote: "Ini adalah satu-satunya terma Incoterms yang mewajibkan penjual memunggah barangan di destinasi sebelum pemindahan risiko berlaku."
    },
    DDP: {
      code: "DDP",
      name: "Delivered Duty Paid",
      translation: "Diserah Cukai Dibayar",
      mode: "multimodal",
      group: "D",
      riskPoint: "Premis/Gudang pembeli, dalam keadaan sedia untuk dipunggah di lokasi akhir.",
      costPoint: "Premis/Gudang pembeli. Semua kos (tambang, cukai import, pelepasan kastam) dibayar oleh penjual.",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Penjual (Pengeksport) - Ini adalah satu-satunya terma di mana penjual menguruskan pelepasan import asing.",
      sellerResponsibility: "Menguruskan pelepasan eksport & import (K1 & K2), membayar duti import, cukai jualan (SST), tambang pengangkutan tempatan & antarabangsa hingga pintu gudang pembeli.",
      buyerResponsibility: "Memunggah barangan dari trak penghantaran akhir di gudang sendiri.",
      academicNote: "Terma ini meletakkan tanggungjawab maksimum kepada penjual dan minimum kepada pembeli. Penjual menanggung kos mendarat (landed cost) yang paling tinggi."
    },
    FAS: {
      code: "FAS",
      name: "Free Alongside Ship",
      translation: "Percuma di Sisi Kapal",
      mode: "sea",
      group: "F",
      riskPoint: "Sebaik sahaja barangan diletakkan di sisi kapal (di atas jeti/dermaga) di pelabuhan pelepasan yang dinamakan.",
      costPoint: "Sisi kapal di pelabuhan pelepasan (kos memuatkan kargo ke dalam kapal ditanggung oleh pembeli).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menghantar barang ke pelabuhan pelepasan, menguruskan pelepasan eksport, dan meletakkan barang bersebelahan dengan kapal pembeli di atas jeti.",
      buyerResponsibility: "Membayar kos pemuatan kargo ke atas kapal (stevedoring), tambang kapal laut, insurans, pelepasan kastam import, THC destinasi, dan lori domestik.",
      academicNote: "Digunakan khas untuk kargo pukal (bulk cargo) seperti arang batu, minyak, kayu balak, atau kargo berat (heavy lifts) yang diangkat terus dari jeti pelabuhan."
    },
    FOB: {
      code: "FOB",
      name: "Free on Board",
      translation: "Percuma di Atas Kapal",
      mode: "sea",
      group: "F",
      riskPoint: "Sebaik sahaja barangan dimuatkan sepenuhnya di atas kapal (on board) di pelabuhan pelepasan yang dinamakan.",
      costPoint: "Di atas kapal di pelabuhan pelepasan. Tambang kapal utama mula dibayar oleh pembeli.",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menguruskan kastam eksport, lori tempatan, dan membiayai kos pemuatan barang ke atas kapal di pelabuhan pelepasan.",
      buyerResponsibility: "Membayar tambang pengangkutan kapal laut antarabangsa, insurans kargo laut, pelepasan kastam import di negara destinasi, caj THC destinasi, dan pengangkutan darat import.",
      academicNote: "Sangat popular dalam perdagangan laut tradisional. Terma ini tidak digalakkan untuk kargo kontena (sepatutnya gunakan FCA) kerana penjual tidak boleh mengawal risiko setelah kontena memasuki pintu terminal kontena sebelum dimuatkan ke kapal."
    },
    CFR: {
      code: "CFR",
      name: "Cost and Freight",
      translation: "Kos dan Tambang",
      mode: "sea",
      group: "C",
      riskPoint: "Apabila barangan berada di atas kapal di pelabuhan pelepasan negara asal (pindahan dua-titik).",
      costPoint: "Pelabuhan destinasi yang dinamakan di negara import (tambang laut dibayar oleh penjual).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menguruskan kastam eksport, membayar kos pemuatan ke kapal, dan membiayai tambang kapal laut sehingga ke pelabuhan destinasi.",
      buyerResponsibility: "Menanggung risiko kerosakan sebaik sahaja barang berada di kapal, menguruskan insurans kargo (pilihan), pelepasan kastam import, THC destinasi, dan lori ke gudang.",
      academicNote: "Penjual membayar tambang laut (Freight) tetapi risiko dalam perjalanan di lautan adalah tanggungjawab pembeli. Jika kapal karam, pembeli yang perlu menanggung kerugian."
    },
    CIF: {
      code: "CIF",
      name: "Cost, Insurance and Freight",
      translation: "Kos, Insurans dan Tambang",
      mode: "sea",
      group: "C",
      riskPoint: "Apabila barangan berada di atas kapal di pelabuhan pelepasan (pindahan dua-titik).",
      costPoint: "Pelabuhan destinasi yang dinamakan di negara import (tambang dan insurans dibayar oleh penjual).",
      customsExport: "Penjual (Pengeksport)",
      customsImport: "Pembeli (Pengimport)",
      sellerResponsibility: "Menguruskan kastam eksport, membiayai tambang kapal laut ke destinasi, dan membeli perlindungan insurans kargo minimum (Institute Cargo Clauses C) untuk pembeli.",
      buyerResponsibility: "Menguruskan kastam import, membayar cukai import, membayar caj pengendalian pelabuhan Tokyo (THC), dan lori penghantaran ke gudang sendiri.",
      academicNote: "Salah satu terma yang paling kerap digunakan dalam perdagangan komoditi laut. Penjual wajib membelikan insurans bagi pihak pembeli (benefisiari insurans adalah pembeli)."
    }
  },

  // Perbezaan Pelepasan Kastam
  customsSummary: {
    export: {
      form: "Borang K2 (Pengisytiharan Barang-barang yang Dieksport)",
      standard: "Diuruskan oleh Penjual bagi 10 terma.",
      exception: "EXW (Diuruskan oleh Pembeli) - Pengecualian tunggal."
    },
    import: {
      form: "Borang K1 (Pengisytiharan Barang-barang yang Diimport)",
      standard: "Diuruskan oleh Pembeli bagi 10 terma.",
      exception: "DDP (Diuruskan oleh Penjual) - Pengecualian tunggal."
    }
  },

  // Parameter Kajian Kes Awal
  defaultCaseStudy: {
    productName: "Jam Tangan Pintar (Smart Watch)",
    quantity: 1000,
    exWorksPrice: 100, // RM seunit
    truckToPenang: 500, // RM
    exportClearance: 300, // RM (Borang K2 & Dokumentasi)
    oceanFreight: 2500, // RM (Pulau Pinang ke Tokyo)
    insurance: 400, // RM
    tokyoTHC: 800, // RM (Terminal Handling Charges)
    japanImportDuty: 3000, // RM
    finalDelivery: 1000 // RM (Lori dari pelabuhan Tokyo ke Gudang Pembeli)
  },

  // Soalan-soalan Kuiz
  quizQuestions: [
    {
      id: 1,
      question: "Apakah fungsi utama peraturan INCOTERMS dalam perdagangan antarabangsa?",
      options: [
        "Menetapkan harga jualan barang dan kaedah pembayaran.",
        "Menentukan pemindahan hak milik sah (property title) barang.",
        "Membahagikan tanggungjawab, kos, dan risiko antara penjual dan pembeli.",
        "Menyediakan khidmat guaman kontrak jika berlaku penipuan."
      ],
      correctAnswer: 2,
      explanation: "Fungsi utama Incoterms adalah menetapkan pembahagian tiga perkara utama: Tanggungjawab (Tasks), Risiko (Risk), dan Kos (Costs)."
    },
    {
      id: 2,
      question: "Di bawah Incoterms® 2020, terma manakah yang meletakkan TANGGUNGJAWAB MINIMUM kepada Penjual?",
      options: [
        "DDP (Delivered Duty Paid)",
        "EXW (Ex Works)",
        "FOB (Free on Board)",
        "FCA (Free Carrier)"
      ],
      correctAnswer: 1,
      explanation: "Dalam EXW, penjual hanya perlu menyediakan barangan di premis sendiri (kilang/gudang). Pembeli asing menanggung semua kos, risiko, pelepasan kastam eksport-import, dan pengangkutan."
    },
    {
      id: 3,
      question: "Apakah terma tunggal di bawah Incoterms 2020 yang mewajibkan PENJUAL menguruskan pelepasan kastam import (Borang K1) di negara pembeli?",
      options: [
        "DAP",
        "DPU",
        "DDP",
        "CIF"
      ],
      correctAnswer: 2,
      explanation: "DDP (Delivered Duty Paid) mewajibkan penjual menguruskan kedua-dua pelepasan kastam: eksport (negara penjual) dan import (negara pembeli) termasuk membayar cukai domestik/duti import."
    },
    {
      id: 4,
      question: "Terma manakah yang hanya sesuai digunakan untuk pengangkutan LAUT dan laluan air dalam negeri sahaja?",
      options: [
        "EXW, FCA, CPT, CIP",
        "FAS, FOB, CFR, CIF",
        "DAP, DPU, DDP",
        "FCA, CPT, DAP, DDP"
      ],
      correctAnswer: 1,
      explanation: "Terma FAS, FOB, CFR, dan CIF adalah dikhaskan untuk pengangkutan laut (port-to-port). Terma-terma lain sesuai untuk sebarang mod pengangkutan (multimodal)."
    },
    {
      id: 5,
      question: "Bagi terma Kumpulan C (CFR, CIF, CPT, CIP), mengapakah ia dirujuk sebagai 'Pindahan Dua Titik' (Two-Point Transfer)?",
      options: [
        "Kerana kos dan risiko dipindahkan pada titik masa yang berbeza dan tempat yang berbeza.",
        "Kerana barang dihantar ke dua buah negara yang berasingan secara serentak.",
        "Kerana penjual wajib membayar kastam eksport dan kastam import secara serentak.",
        "Kerana insurans dibayar oleh syarikat pembeli dan penjual secara bersama."
      ],
      correctAnswer: 0,
      explanation: "Dalam Kumpulan C, Risiko berpindah di negara asal (semasa dimuatkan/diserahkan pengangkut), manakala Kos ditanggung oleh penjual sehingga ke destinasi negara import. Ini memisahkan titik kos dan risiko."
    },
    {
      id: 6,
      question: "Syarikat Gadget Trend mengeksport barang dengan kos EXW = RM100,000, Lori ke Pelabuhan Pulau Pinang = RM500, dan Kastam Eksport = RM300. Berapakah harga sebut harga bagi FOB Penang Port?",
      options: [
        "RM100,000",
        "RM100,500",
        "RM100,800",
        "RM103,700"
      ],
      correctAnswer: 2,
      explanation: "Harga FOB dihitung dengan menjumlahkan EXW (RM100,000) + Lori tempatan ke pelabuhan (RM500) + Pelepasan kastam eksport (RM300) = RM100,800. Risiko berpindah sebaik sahaja barang berada di atas kapal."
    },
    {
      id: 7,
      question: "Apakah perubahan ketara yang dilakukan apabila terma DAT ditukarkan kepada terma DPU dalam Incoterms 2020?",
      options: [
        "Insurans wajib dinaikkan kepada tahap perlindungan maksimum.",
        "Tempat serahan tidak terhad kepada terminal sahaja, malah boleh di mana-mana lokasi yang dipersetujui selepas dipunggah.",
        "Pembeli diwajibkan membayar cukai pelepasan kastam eksport.",
        "Menggantikan mod laut kepada pengangkutan udara sahaja."
      ],
      correctAnswer: 1,
      explanation: "DAT (Delivered at Terminal) dihadkan di terminal, manakala DPU (Delivered at Place Unloaded) membolehkan pemunggahan dilakukan di mana-mana tempat dinamakan di negara destinasi, memberikan fleksibiliti lokasi."
    },
    {
      id: 8,
      question: "Apakah perbezaan utama dari segi tahap perlindungan INSURANS antara terma CIP dan CIF di bawah peraturan 2020?",
      options: [
        "CIF memerlukan insurans ganti rugi penuh, manakala CIP tidak memerlukan insurans langsung.",
        "CIP memerlukan perlindungan penuh Institute Cargo Clauses (A) manakala CIF mengekalkan perlindungan minimum di bawah Clauses (C).",
        "Kedua-dua terma tidak lagi mewajibkan penjual membeli insurans.",
        "CIF diuruskan oleh pembeli manakala CIP diuruskan oleh syarikat pengangkutan."
      ],
      correctAnswer: 1,
      explanation: "Incoterms® 2020 menaikkan syarat perlindungan insurans standard untuk terma CIP kepada Clauses (A) (All Risks), sementara terma CIF dikekalkan pada Clauses (C) (Perlengapan minimum)."
    },
    {
      id: 9,
      question: "Bagi urusan kastam eksport di Malaysia, borang manakah yang mesti diisytiharkan oleh pihak yang bertanggungjawab?",
      options: [
        "Borang K1",
        "Borang K2",
        "Borang K8",
        "Borang K9"
      ],
      correctAnswer: 1,
      explanation: "Borang K2 digunakan untuk deklarasi eksport di Kastam Diraja Malaysia. Borang K1 digunakan untuk pengisytiharan import."
    },
    {
      id: 10,
      question: "Sekiranya kapal kontena karam di Lautan Pasifik semasa membawa barangan yang dijual di bawah terma CIF Tokyo Port, siapakah yang menanggung kerugian kerosakan kargo tersebut?",
      options: [
        "Penjual (Pengeksport), kerana kos pengangkutan dibayar sehingga ke pelabuhan Tokyo.",
        "Pembeli (Pengimport), kerana risiko telah dipindahkan sebaik kargo dimuatkan di pelabuhan pelepasan.",
        "Syarikat insurans secara langsung tanpa perlu membuat sebarang tuntutan fail.",
        "Kapten kapal secara peribadi kerana gagal mengelak kemalangan."
      ],
      correctAnswer: 1,
      explanation: "Di bawah terma CIF, risiko berpindah kepada pembeli sebaik sahaja barang dimuatkan ke atas kapal di pelabuhan pelepasan (negara asal). Walaupun penjual membeli insurans, hak tuntutan insurans diserahkan kepada pembeli kerana pembeli yang menanggung risiko tersebut semasa transit."
    }
  ]
};
