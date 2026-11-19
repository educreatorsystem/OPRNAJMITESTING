# OPR SK TAMAN RINTING 3 — V8 Pengisian Awam

## Apps Script
1. Gantikan keseluruhan Code.gs dengan fail baharu.
2. Kemas kini HTML Index, Styles, App, Config dan Bridge daripada folder apps-script. Jangan letak frontend index.html dalam Apps Script.
3. Deploy > Manage deployments > pensel > New version.
4. Execute as: Me (akaun pemilik).
5. Who has access: Anyone / Sesiapa sahaja (bukan Anyone with Google account).
6. Deploy. Berikan kebenaran Google sekali sebagai pemilik, jika diminta. Pengisi tidak perlu log masuk.
7. Buka URL /exec melalui tetingkap Incognito untuk menguji borang tanpa akaun.

Jika tetapan deployment lama tidak membenarkan pertukaran Execute as, buat New deployment > Web app dengan Me dan Anyone; gantikan url dalam config.js GitHub dan Config.html Apps Script dengan URL baharu, kemudian deploy kemas kini.
Jika pilihan Anyone tidak tersedia pada akaun sekolah, pentadbir Google Workspace perlu membenarkannya; kod tidak boleh mengubah dasar organisasi.

ID Sheet telah ditetapkan: 1_Vtfr2HRBPBGnnTf0Ku2SNMVGDRQy_NQMW1TTHN-JZc
ID folder Drive telah ditetapkan: 1O2WTK2Ld_kT_rBB9Vmb_kLwS1vcRYzzF
Pemilik deployment mesti mempunyai akses Editor kepada kedua-duanya. Helaian kosong dicipta automatik ketika simpan.
ALLOWED_EMAILS tidak diperlukan untuk penghantaran OPR baharu. Ia hanya digunakan bagi baca API, edit atau padam rekod sedia ada. Fungsi setup dalam editor juga memerlukan emel pentadbir yang dibenarkan; pengisian awam tidak memerlukan setup manual.

## GitHub
Gantikan index.html, app.js, styles.css, config.js dan folder assets. Refresh Cmd+Shift+R. Klik Semak sambungan > isi > Simpan laporan. Untuk membuka borang dari URL Apps Script, versi ini terus memaparkan borang baharu.

Pengisian awam hanya mencipta rekod baharu. Orang awam tidak boleh menukar atau memadam rekod sedia ada melalui API. Fail Drive tidak dijadikan awam oleh kod ini. CSV dashboard kekal menggunakan URL yang diberi.

## Ujian
Uji satu laporan tanpa gambar dahulu, kemudian satu gambar kecil. Semak tab Pertandingan dan folder Drive. Semakan kod dan ujian simulasi tidak menggantikan ujian deployment Google sebenar. Pengguna luar menghantar atas kebenaran pemilik deployment; elakkan berkongsi pautan pengisian di tempat yang tidak berkaitan.
