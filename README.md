# OPR KOKURIKULUM SK TAMAN RINTING 3

Lencana dan tajuk laman dikemas kini. Upload folder assets bersama fail frontend ke root repository GitHub.

# Pembetulan Borang KOKO — versi 3

Punca masalah: versi terdahulu menyembunyikan borang pada GitHub Pages. Versi ini memaparkan borang penuh dan menggunakan jambatan Google yang disahkan untuk simpan/edit/padam. Tiada kata laluan atau akses tanpa nama ditambah.

## 1. GitHub
Upload dan replace index.html, styles.css, app.js, config.js, .nojekyll. Tunggu GitHub Pages selesai deploy. Refresh dengan Ctrl+Shift+R / Cmd+Shift+R. Borang Laporan kini mesti memaparkan medan Nama pertandingan, Tarikh dan Senarai peserta.

## 2. Apps Script — WAJIB untuk simpan dari GitHub
- Gantikan Code.gs dengan apps-script/Code.gs dalam pakej ini.
- Cipta fail HTML bernama Bridge. Salin kandungan apps-script/Bridge.html.
- Kemas kini fail HTML Index, App, Styles dan Config menggunakan fail sepadan dalam apps-script.
- Kekalkan Script Properties ALLOWED_EMAILS, SPREADSHEET_ID dan FOLDER_ID.
- Jalankan setup jika helaian belum dicipta.
- Deploy > Manage deployments > pensel > New version > Deploy. Gunakan deployment sedia ada untuk kekalkan URL.
- Kekalkan Execute as User accessing the web app dan akses guru yang dibenarkan. Guru mesti mempunyai akses Sheet dan folder Drive.

## 3. Ujian
- Log masuk Google melalui butang Log masuk Google jika perlu, benarkan akses.
- Kembali ke GitHub > Borang Laporan > Semak sambungan.
- Jika berjaya, isi satu laporan tanpa gambar dahulu > Simpan laporan.
- Semak rekod dalam Sheet dan muat semula. Kemudian uji gambar.
- Jika pelayar menyekat log masuk Google dalam iframe, benarkan kuki Google untuk laman ini atau gunakan aplikasi Apps Script secara terus. Borang di GitHub kekal tersedia.

## Bagaimana sambungan berfungsi
Borang GitHub menghantar permintaan kepada iframe Apps Script menggunakan postMessage. Code.gs mengesahkan akaun guru untuk setiap operasi. Origin, sumber mesej dan nonce sesi disemak di kedua-dua belah. Hanya origin educreatorsystem.github.io dan laman Sites yang dibenarkan; jika domain berubah, kemas kini senarai allowed dalam doGet.

Bacaan dashboard menggunakan CSV yang diberi. Versi backend lama tidak mempunyai jambatan ini: frontend baharu sahaja belum cukup untuk simpan. Tiada ujian tulis ke database sekolah dilakukan oleh pembangun. Ujian akaun Google sebenar diperlukan selepas deployment.

Jika permintaan simpan tamat masa selepas dihantar, semak Sheet sebelum cuba semula. Jangan anggap simpan berjaya tanpa pengesahan pelayan.
