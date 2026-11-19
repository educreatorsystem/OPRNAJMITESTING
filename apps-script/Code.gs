/** OPR KOKURIKULUM SK TAMAN RINTING 3 — versi 7.
 * Script Properties: ALLOWED_EMAILS, SPREADSHEET_ID (optional), folder Drive ditetapkan dalam OPR_CONFIG.folderId.
 * Deploy: Execute as User accessing the web app. Preserve school account access.
 */
const OPR_CONFIG = {
  sheetId: '1_Vtfr2HRBPBGnnTf0Ku2SNMVGDRQy_NQMW1TTHN-JZc',
  folderId: '1O2WTK2Ld_kT_rBB9Vmb_kLwS1vcRYzzF',
  origins: ['https://educreatorsystem.github.io','https://koko-taman-daya-yani.g-52033830.chatgpt.site']
};
const HEADERS = {
  Pertandingan:['ID','Versi','TarikhKemaskini','GuruEmel','DataJSON'],
  Peserta:['IDPertandingan','IDMurid','Nama','Tahun','Kelas','Jantina','Pencapaian','Catatan'],
  Guru:['IDPertandingan','Nama'],
  Lampiran:['IDPertandingan','Jenis','Nama','URL','Kapsyen']
};
function doGet(e) {
  const params=(e&&e.parameter)||{};
  if(params.mode==='bridge') {
    const origin=String(params.origin||''), nonce=String(params.nonce||'');
    if(OPR_CONFIG.origins.indexOf(origin)<0||!/^[a-f0-9-]{36}$/.test(nonce))
      throw new Error('Laman atau sesi tidak dibenarkan.');
    let error='';try {authorize_();} catch(ex) {error=ex.message;}
    const t=HtmlService.createTemplateFromFile('Bridge');
    t.clientOrigin=origin;t.clientNonce=nonce;t.initialError=error;
    return t.evaluate().setTitle('Sambungan OPR').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  authorize_();
  return HtmlService.createTemplateFromFile('Index').evaluate().setTitle('OPR KOKURIKULUM SK TAMAN RINTING 3');
}
function include(name) {return HtmlService.createHtmlOutputFromFile(name).getContent();}
function authorize_() {
  const props=PropertiesService.getScriptProperties();
  const email=String(Session.getActiveUser().getEmail()||'').trim().toLowerCase();
  const allowed=(props.getProperty('ALLOWED_EMAILS')||'').split(/[,;\n]/).map(s=>s.trim().toLowerCase()).filter(Boolean);
  if(!email)throw new Error('Akaun Google tidak dapat dikenal pasti. Log masuk Google dan gunakan deployment Execute as: User accessing the web app.');
  if(allowed.indexOf(email)<0)throw new Error('Akses ditolak untuk '+email+'. Tambahkan emel ini dalam Script Properties > ALLOWED_EMAILS.');
  return email;
}
function db_() {
  const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID')||OPR_CONFIG.sheetId;
  try{return SpreadsheetApp.openById(id);}catch(e){throw new Error('Google Sheet tidak dapat dibuka. Semak SPREADSHEET_ID dan akses Editor untuk akaun guru. '+e.message);}
}
function ensureSheets_(db) {
  Object.keys(HEADERS).forEach(name=>{
    const sh=db.getSheetByName(name)||db.insertSheet(name), expected=HEADERS[name];
    if(!sh.getLastRow()) {sh.getRange(1,1,1,expected.length).setValues([expected]);sh.setFrozenRows(1);return;}
    const actual=sh.getRange(1,1,1,expected.length).getValues()[0];
    if(actual.some((v,i)=>String(v)!==expected[i]))throw new Error('Tajuk kolum tab '+name+' tidak sepadan. Jangan padam data; gunakan tajuk: '+expected.join(', '));
  });
}
/** Run once in editor and review Execution log. No test report is inserted. */
function setup() {
  const email=authorize_(), lock=LockService.getScriptLock();lock.waitLock(30000);
  try{const db=db_();ensureSheets_(db);SpreadsheetApp.flush();const info={ok:true,version:7,email:email,sheet:db.getName(),imagesConfigured:!!OPR_CONFIG.folderId,folderId:OPR_CONFIG.folderId};console.log(JSON.stringify(info));return info;}finally{lock.releaseLock();}
}
function diagnose() {return setup();}
function safe_(value) {
  const s=String(value==null?'':value);return /^[=+@-]/.test(s)?"'"+s:s;
}
function validate_(r) {
  if(!r||typeof r!=='object')throw new Error('Data laporan tidak diterima.');
  ['id','name','start','end','reporter','organizer','venue','unit'].forEach(k=>{if(!String(r[k]||'').trim())throw new Error('Maklumat wajib tidak lengkap: '+k);});
  if(!/^\d{4}-\d{2}-\d{2}$/.test(r.start)||!/^\d{4}-\d{2}-\d{2}$/.test(r.end)||r.end<r.start)throw new Error('Tarikh mula/tamat tidak sah.');
  if(!Array.isArray(r.participants)||!r.participants.length)throw new Error('Tambah sekurang-kurangnya seorang peserta.');
  const ids=r.participants.map(p=>String(p.sid||'').trim().toLowerCase());
  if(ids.some(id=>!id)||new Set(ids).size!==ids.length||r.participants.some(p=>!String(p.name||'').trim()))throw new Error('Nama dan ID peserta mesti lengkap. ID tidak boleh berulang dalam laporan sama.');
  if(!Array.isArray(r.images))r.images=[];
  if(r.images.length>3)throw new Error('Maksimum tiga gambar.');
}
function upload_(f) {
  if(!f||!f.data)return f;
  const m=String(f.data).match(/^data:(image\/(?:jpeg|png|webp)|application\/pdf);base64,([A-Za-z0-9+/=]+)$/);
  if(!m)throw new Error('Format lampiran tidak sah.');
  const bytes=Utilities.base64Decode(m[2]);
  if(bytes.length>(m[1]==='application/pdf'?5:2)*1024*1024)throw new Error('Saiz lampiran melebihi had.');
  const folderId=OPR_CONFIG.folderId;
  if(!folderId)throw new Error('Gambar belum boleh disimpan: tetapkan FOLDER_ID dalam Script Properties. Laporan tanpa gambar tidak memerlukan FOLDER_ID.');
  let file;
  try{file=DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(bytes,m[1],String(f.name||'Lampiran')));}catch(e){throw new Error('Fail gagal dimuat naik. Semak FOLDER_ID dan akses Editor folder Drive. '+e.message);}
  return {name:f.name||'Lampiran',caption:f.caption||'',url:file.getUrl(),fileId:file.getId()};
}
function fingerprint_(r) {
  const copy=JSON.parse(JSON.stringify(r));delete copy.version;delete copy._syncWarning;delete copy._inputHash;
  return Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,JSON.stringify(copy),Utilities.Charset.UTF_8));
}
function api(req) {
  let lock,locked=false;
  try{
    const email=authorize_();if(!req||!['list','save','delete'].includes(req.action))throw new Error('Tindakan tidak sah.');
    lock=LockService.getScriptLock();lock.waitLock(30000);locked=true;
    const db=db_();ensureSheets_(db);const sh=db.getSheetByName('Pertandingan');
    const rows=sh.getDataRange().getValues();
    if(req.action==='list')return {ok:true,data:rows.slice(1).filter(row=>row[0]).map((row,i)=>{try{return JSON.parse(row[4]);}catch(e){throw new Error('DataJSON rosak di tab Pertandingan baris '+(i+2));}})};
    if(req.action==='save')validate_(req.record);
    const id=req.action==='save'?String(req.record.id):String(req.id||'');
    if(!id)throw new Error('ID laporan tiada.');
    const index=rows.findIndex((row,i)=>i>0&&String(row[0])===id);
    if(req.action==='delete'){
      if(index<1)throw new Error('Rekod tidak ditemui. Muat semula senarai.');
      sh.deleteRow(index+1);SpreadsheetApp.flush();
      let warning='';try{syncChildren_(db,id,null);}catch(e){warning='Rekod utama dipadam; pecahan helaian perlu disemak: '+e.message;}
      return {ok:true,data:true,warning:warning};
    }
    let r=JSON.parse(JSON.stringify(req.record));const hash=fingerprint_(r);
    if(index>0){
      const previous=JSON.parse(rows[index][4]);
      // A lost response can be retried without uploading images or duplicating a record.
      if(previous._inputHash===hash)return {ok:true,data:previous};
      if(Number(rows[index][1])!==Number(r.version||0))throw new Error('Rekod telah dikemas kini. Muat semula senarai sebelum mengedit; semak sama ada simpanan terdahulu sudah berjaya.');
    }
    r.images=r.images.map(upload_);if(r.attachment)r.attachment=upload_(r.attachment);
    delete r._syncWarning;r.version=(index>0?Number(rows[index][1]):0)+1;r._inputHash=hash;
    const json=JSON.stringify(r);if(json.length>48000)throw new Error('Laporan melebihi had Google Sheet. Pendekkan teks atau bilangan peserta.');
    const target=index>0?index+1:sh.getLastRow()+1;
    sh.getRange(target,1,1,5).setValues([[r.id,r.version,new Date(),email,json]]);SpreadsheetApp.flush();
    const stored=sh.getRange(target,5).getValue();if(stored!==json)throw new Error('Pengesahan bacaan semula gagal. Semak tab Pertandingan sebelum mencuba semula.');
    try{syncChildren_(db,r.id,r);SpreadsheetApp.flush();}catch(e){r._syncWarning='Rekod utama selamat; pecahan Peserta/Guru/Lampiran perlu disegerakkan. '+e.message;}
    return {ok:true,data:r};
  }catch(e){return {ok:false,error:e.message||String(e)};}finally{if(locked)lock.releaseLock();}
}
function syncChildren_(db,id,r) {
  ['Peserta','Guru','Lampiran'].forEach(name=>{const sh=db.getSheetByName(name),rows=sh.getDataRange().getValues();for(let i=rows.length-1;i>0;i--)if(String(rows[i][0])===id)sh.deleteRow(i+1);});
  if(!r)return;
  const append=(name,rows)=>{if(!rows.length)return;const sh=db.getSheetByName(name);sh.getRange(sh.getLastRow()+1,1,rows.length,rows[0].length).setValues(rows.map(row=>row.map(safe_)));};
  append('Peserta',r.participants.map(p=>[id,p.sid,p.name,p.year,p.class,p.gender,p.award,p.note]));
  append('Guru',String(r.teachers||'').split('\n').map(s=>s.trim()).filter(Boolean).map(name=>[id,name]));
  append('Lampiran',r.images.map(f=>[id,'Gambar',f.name,f.url,f.caption]).concat(r.attachment?[[id,'PDF',r.attachment.name,r.attachment.url,'']]:[]));
}
