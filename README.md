# OPR KOKURIKULUM SK TAMAN RINTING 3 — Pembetulan Simpanan V6

## Punca yang ditemui
Kod frontend lama menolak format origin Google seperti https://n-...-script.googleusercontent.com. Ini boleh menyebabkan jambatan tidak bersedia dan simpanan tamat masa. V6 menerima format origin Google tersebut, menolak origin palsu, serta menyampaikan ralat akses yang boleh diperbetulkan. Frontend dan backend WAJIB dikemas kini bersama.

## A. Apps Script
1. Buka projek Apps Script sedia ada yang menggunakan URL /exec dalam config.js.
2. Gantikan SELURUH kandungan Code.gs dengan Code.gs dalam pakej. Jangan tambah di bawah kod lama atau biarkan dua set fungsi api/doGet.
3. Tambah / kemas kini fail HTML bernama Index, Styles, App, Config dan Bridge menggunakan fail sepadan. Jangan gunakan index.html frontend sebagai fail Index Apps Script.
4. Project Settings > Script Properties:
   ALLOWED_EMAILS = emel Google guru dipisahkan dengan koma.
   SPREADSHEET_ID = 1_Vtfr2HRBPBGnnTf0Ku2SNMVGDRQy_NQMW1TTHN-JZc
   FOLDER_ID = ID folder Drive (diperlukan hanya untuk gambar/PDF).
5. Jika manifest lama sudah mempunyai scopes khusus, tambahkan scopes yang terdapat dalam appsscript.json tanpa membuang tetapan projek lain. Untuk projek ini, manifest contoh boleh disalin melalui Project Settings > Show appsscript.json manifest file.
6. Pilih fungsi setup > Run. Benarkan akses Google. Execution log mesti memaparkan ok:true, version:6 dan emel pengguna. Helaian kosong yang belum wujud dicipta automatik. Struktur/data sedia ada tidak dipadam untuk pemasangan.
7. Berikan akaun guru akses Editor kepada Sheet dan folder gambar. Akaun yang menjalankan setup juga mesti tersenarai dalam ALLOWED_EMAILS.
8. Deploy > Manage deployments > pensel > Version: New version > Deploy. Kekalkan URL deployment sedia ada. Execute as: User accessing the web app. Kekalkan sekatan akses guru/organisasi.

## B. GitHub
1. Gantikan index.html, app.js, config.js, styles.css dan folder assets pada root repository.
2. Kekalkan .nojekyll. Tunggu GitHub Pages selesai deployment.
3. Refresh Cmd+Shift+R atau Ctrl+Shift+R.

## C. Uji
1. Buka URL Apps Script sekali untuk log masuk dan benarkan akses.
2. Kembali ke GitHub > Borang Laporan > Semak sambungan.
3. Tunggu mesej Sambungan berjaya.
4. Isi satu laporan dengan seorang peserta, tanpa gambar dahulu > Simpan laporan.
5. Semak tab Pertandingan dan Peserta, kemudian muat semula senarai.
6. Uji gambar selepas FOLDER_ID diisi dan akses Drive diberikan.

## Jika gagal
- Emel tidak dikenal pasti: semak Execute as User accessing the web app dan log masuk akaun Google yang betul.
- Akses ditolak untuk emel tertentu: tambah emel itu dalam ALLOWED_EMAILS.
- Google Sheet tidak dapat dibuka: semak ID dan akses Editor.
- Tajuk kolum tidak sepadan: jangan padam rekod. Betulkan tajuk mengikut mesej ralat.
- FOLDER_ID tiada: simpan tanpa gambar dahulu atau tetapkan folder Drive.
- Sambungan belum bersedia: pastikan Bridge.html dan versi deployment baharu sudah dipasang. Jika pelayar menyekat kuki/log masuk Google dalam iframe, gunakan URL Apps Script terus; borang dan backend yang sama berfungsi tanpa jambatan.
- Selepas permintaan dihantar tetapi pengesahan tamat masa: semak senarai/Sheet dahulu. V6 mengenal pasti cubaan semula dengan kandungan sama untuk mengelakkan rekod berganda.

## Semakan
Ujian simulasi: penciptaan helaian, simpan dan baca semula, cubaan semula, konflik versi, edit, padam, ID berulang, akses tidak sah, ralat folder dan kegagalan pecahan helaian. Format origin Google sebenar diuji bersama origin palsu. Tiada penulisan ujian dilakukan ke Google Sheet sekolah; pengesahan akaun Google sebenar masih diperlukan selepas deployment.

Rekod utama ialah tab Pertandingan (DataJSON). Jika pecahan Peserta/Guru/Lampiran gagal selepas rekod utama disimpan, sistem memberitahu rekod utama selamat. Fail fizikal Drive tidak dipadam apabila laporan dipadam. Dashboard CSV boleh lambat mengemas kini; penerbitan data murid perlu dihadkan mengikut kebenaran sekolah.
