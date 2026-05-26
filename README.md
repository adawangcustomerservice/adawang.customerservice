# <img width="412" height="118" alt="image" src="https://github.com/user-attachments/assets/296037ee-69b9-46c5-ae7b-c029c74aad2d" />

Adawang Customer Service Portal

Website portal pembayaran pinjaman untuk pelanggan Adawang dengan fitur live chat terintegrasi dan peringatan keselamatan.

## 🎯 Fitur Utama

### ✅ Pembayaran Pinjaman
- Input nama peminjam, nombor KP/akaun, dan jumlah bayaran
- Scan QR Code DuitNow yang sudah disediakan (admin yang letak)
- Ringkasan pembayaran real-time
- Notifikasi berjaya

### 💬 Live Chat Support (Crisp)
- Integrasi live chat gratis menggunakan Crisp
- Agen dapat melayani pelanggan 24/7
- Chat tersimpan untuk referensi

### ⚠️ Peringatan Keselamatan
- Pop-up otomatis peringatan penipuan dengan 5 ayat:
  1. 🔒 Jangan berkongsi info peribadi seperti nombor KP atau kata laluan
  2. ✅ Hanya terima pembayaran melalui DuitNow di platform rasmi
  3. 📞 Hati-hati dengan panggilan atau mesej palsu
  4. 📱 Hanya scan QR Code DuitNow yang disediakan di website rasmi
  5. 🚨 Lapor jika disyaki ditipu

- Pop-up pencapaian Adawang (50,000 peminjam)
- Animasi menarik dan responsif

## 📋 Persyaratan

Tidak ada instalasi rumit! Website ini 100% HTML, CSS, dan JavaScript vanilla.

## 🚀 Cara Menggunakan

### Langkah 1: Setup Crisp Live Chat
1. Pergi ke [Crisp.im](https://crisp.chat)
2. Daftar akun gratis
3. Dapatkan Website ID anda
4. Edit file `index.html` dan cari: `window.CRISP_WEBSITE_ID="YOUR_CRISP_ID_HERE";`
5. Gantikan `YOUR_CRISP_ID_HERE` dengan ID anda

### Langkah 2: Letak QR Code DuitNow
1. Edit file `index.html`
2. Cari line: `<img src="qr-duitnow.png" alt="QR Code DuitNow Adawang" class="qr-image">`
3. Gantikan `qr-duitnow.png` dengan:
   - **Pilihan A:** Upload gambar QR Code ke repository dengan nama `qr-duitnow.png`
   - **Pilihan B:** Guna URL gambar: `src="https://link-qr-code-anda.com/qr.png"`

### Langkah 3: Deploy Website

**Pilihan A: GitHub Pages (Gratis & Mudah)**
1. Di repository, pergi ke **Settings** (gear icon)
2. Scroll ke **Pages**
3. Pilih branch **main** sebagai source
4. Klik Save
5. Website anda akan live di: `https://adawang.github.io/adawang.customerservice`

**Pilihan B: Netlify (Gratis)**
1. Pergi ke [Netlify](https://netlify.com)
2. Drag & drop folder website atau connect GitHub
3. Siap digunakan dalam beberapa saat

**Pilihan C: Vercel (Gratis)**
1. Pergi ke [Vercel](https://vercel.com)
2. Import repository dari GitHub
3. Siap digunakan

## 📁 Struktur File

