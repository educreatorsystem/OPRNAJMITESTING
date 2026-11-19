# Sistem Pelaporan Kokurikulum SK Taman Daya

## GitHub Pages
1. Extract ZIP ini.
2. Upload index.html, styles.css, app.js, config.js dan .nojekyll ke root repository GitHub. Jangan upload ZIP sahaja.
3. Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Buka pautan GitHub Pages yang dipaparkan.

Dashboard telah dipautkan kepada ID Google Sheet, URL CSV dan URL Apps Script yang diberi. Tiada data demonstrasi dimasukkan. CSV semasa semakan masih kosong. Muat semula dashboard selepas rekod disimpan; penerbitan CSV Google mungkin tertangguh.

## Pengisian dan simpanan sebenar
Klik “Buka pengisian Google Apps Script”. Akses Google kekal diperlukan. Semasa semakan, endpoint membalas “Akses ditolak. Gunakan akaun guru yang disenaraikan pentadbir.” Oleh itu simpanan sebenar belum dapat disahkan.

Dalam Apps Script > Project Settings > Script Properties:
- SPREADSHEET_ID: 1_Vtfr2HRBPBGnnTf0Ku2SNMVGDRQy_NQMW1TTHN-JZc
- ALLOWED_EMAILS: emel guru sebenar dipisahkan dengan koma.
- FOLDER_ID: ID folder Drive untuk gambar / lampiran.

Jangan letak kata laluan atau token Google dalam repository.

Jika versi borang dalam deployment belum lengkap, kemas kini menggunakan fail dalam folder apps-script: Code.gs dan fail HTML Index, Styles, App, Config. Jalankan setup selepas akaun pentadbir dimasukkan dalam ALLOWED_EMAILS. Deploy versi baharu menggunakan deployment sedia ada supaya URL kekal sama. Pilih Execute as User accessing the web app, beri akses Sheet dan folder kepada guru, dan hadkan akses organisasi jika tersedia.

## Bacaan CSV
Terbitkan tab Pertandingan (yang mempunyai kolum DataJSON) melalui File > Share > Publish to web. config.js menyimpan URL CSV; ubah gid jika tab Pertandingan bukan gid=0. CSV yang diterbitkan boleh dibaca oleh sesiapa yang mempunyai pautan. Jangan terbitkan data murid yang tidak dibenarkan untuk perkongsian. Bagi rekod sulit, gunakan aplikasi Apps Script sahaja dan hentikan penerbitan CSV.

## Fail
Frontend GitHub: index.html, styles.css, app.js, config.js, .nojekyll.
Backend Google: folder apps-script (bukan dijalankan oleh GitHub Pages).

## Pengesahan
CSV berjaya diakses dan kosong. Apps Script memberi ralat akses akaun; ia belum menerima ujian simpanan. GitHub Pages tidak menjalankan Code.gs. Semua operasi tulis menggunakan aplikasi Google yang dilindungi, tanpa kata laluan dalam JavaScript.
