# Hub Pembelajaran Incoterms SLK30203 🚢

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

Platform Pembelajaran Digital Interaktif yang direka khusus untuk kursus **SLK30203 Pengurusan Import & Eksport** bagi program Sijil Perkhidmatan Logistik, Kolej Komuniti Papar & Sabah Digital Academy. Platform ini memudahkan pelajar memahami 11 peraturan Incoterms® 2020 dengan cara yang visual, interaktif, dan menyeronokkan.

---

## ✨ Ciri-Ciri Utama

1. **🏠 Papan Pemuka Kemajuan:** Mengesan peratusan kemajuan pembelajaran pelajar secara dinamik berdasarkan modul yang dibaca dan interaksi yang dibuat.
2. **📖 Modul 1 (Konsep & Sejarah):** Memperkenalkan 3 pilar utama Incoterms (Tanggungjawab, Risiko, Kos) dan sejarah evolusi dari tahun 1936 sehingga 2020.
3. **📦 Modul 2 (Analisis 11 Terma):** Perbandingan visual 11 terma yang boleh ditapis berdasarkan kategori pengangkutan (Multimodal vs. Laut sahaja) lengkap dengan nota akademik dan tanggungjawab kastam Malaysia (Borang K1/K2).
4. **🚢 Modul 3 (Simulasi Risiko & Transisi Kargo):** Animasi visual pergerakan kargo yang menunjukkan titik pindahan risiko dan pengedaran kos antara penjual (Pengeksport) dan pembeli (Pengimport).
5. **💰 Modul 4 (Kalkulator Kos Kajian Kes):** Simulasi harga sebutharga (Penang ke Tokyo) dengan pengiraan automatik dan interaktif untuk harga EXW, FOB, CIF, dan DDP.
6. **🏆 Kuiz Uji Minda & Sijil Dinamik:** Kuiz dengan 10 soalan maklum balas segera yang menjana Sijil Pencapaian digital secara automatik setelah pelajar mendapat skor minimum.
7. **🔒 Panel Kawalan Pensyarah (Admin Panel):**
   - Dilindungi dengan kata laluan pensyarah (`pensyarah123`).
   - Kebolehan untuk mengunci/membuka akses kepada Modul 3, Modul 4, atau Kuiz.
   - Statistik kelas masa nyata (Purata Kemajuan, Purata Skor Kuiz, Jumlah Pelajar).
   - Jadual data pelajar lengkap dengan fungsi muat turun laporan prestasi kelas format **CSV**.
8. **🖨️ Cetak Buku Nota PDF Dinamik:** Membolehkan pelajar memuat turun nota akademik bercetak lengkap dengan nama pelajar serta hasil pengiraan kajian kes yang terkini.

---

## 📂 Struktur Fail Projek

```text
├── index.html         # Struktur UI Utama & Halaman Web
├── css/
│   └── style.css      # Gaya Visual Premium (Tema Biru & Merah Jambu Neon, Glassmorphism)
└── js/
    ├── data.js        # Pangkalan Data Soalan Kuiz, Garis Masa, dan Butiran Terma Incoterms
    ├── app.js         # Logik Interaktif, Simulasi, Kalkulator, dan Panel Pensyarah
    └── html2pdf.bundle.min.js # Perpustakaan PDF Sokongan (Pilihan)
```

---

## 🚀 Cara Menjalankan Projek

### 1. Tempatan (Local Run)
Platform ini dibina menggunakan standard web asli tanpa memerlukan sebarang server backend. 
- Hanya muat turun atau klon repositori ini.
- Dwiklik fail `index.html` untuk membuka platform pada mana-mana pelayar web moden (Chrome, Edge, Safari, Firefox).

### 2. Hos di GitHub Pages (Percuma)
Untuk meletakkan laman web ini secara dalam talian supaya boleh diakses oleh pelajar:
1. Cipta repositori baharu di GitHub.
2. Tolak (Push) fail projek ke repositori tersebut.
3. Pergi ke **Settings** > **Pages** di repositori GitHub anda.
4. Di bawah bahagian **Build and deployment**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
5. Klik **Save**. Laman web anda akan bersedia dalam masa beberapa minit di alamat `https://<username>.github.io/<repo-name>/`.

---

## 🏫 Kolej Komuniti Papar & Sabah Digital Academy
Pembangunan platform ini menyokong pembelajaran digital bermutu tinggi bagi menyediakan tenaga kerja logistik yang mahir dan berdaya saing selaras dengan keperluan industri moden.
