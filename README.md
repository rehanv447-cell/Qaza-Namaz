# Qaza-Namaz<!doctype html>
<html lang="gu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>કઝા નમાઝ કૅલ્ક્યુલેટર</title>
<style>
:root{--bg:#f5f7f6;--card:#fff;--text:#17211b;--muted:#66736b;--primary:#176b4d;--primary2:#0e4f39;--line:#dce5df;--soft:#eaf4ef;--danger:#a33b3b}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Noto Sans Gujarati",sans-serif;background:linear-gradient(145deg,#eef7f2,#f8faf9);color:var(--text)}
.container{max-width:980px;margin:auto;padding:24px 16px 50px}
.hero{background:linear-gradient(135deg,#0f5940,#21805e);color:white;border-radius:24px;padding:28px;margin-bottom:18px;box-shadow:0 12px 30px #174c3a22}
.hero h1{margin:0 0 8px;font-size:clamp(28px,5vw,42px)}.hero p{margin:0;opacity:.9;line-height:1.6}
.card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:20px;margin:16px 0;box-shadow:0 7px 22px #17382b0d}
h2{margin:0 0 15px;font-size:21px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
label{display:block;font-weight:650;font-size:14px;margin-bottom:7px}input,select{width:100%;padding:12px 13px;border:1px solid #cbd8d1;border-radius:12px;font:inherit;background:#fff}input:focus,select:focus{outline:3px solid #176b4d22;border-color:var(--primary)}
.help{font-size:12px;color:var(--muted);margin-top:5px}.checks{display:flex;gap:18px;flex-wrap:wrap}.checks label{font-weight:500;margin:0}.checks input{width:auto}
button{border:0;border-radius:13px;padding:13px 18px;background:var(--primary);color:#fff;font-weight:750;font-size:15px;cursor:pointer}button:hover{background:var(--primary2)}
.actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.secondary{background:#e8f0eb;color:#174b39}.secondary:hover{background:#dceae2}
.results{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.stat{background:var(--soft);border-radius:16px;padding:16px}.stat .n{font-size:27px;font-weight:800;color:var(--primary);margin-top:4px}.stat small{color:var(--muted)}
.bar{height:13px;background:#e3ebe6;border-radius:99px;overflow:hidden;margin-top:10px}.fill{height:100%;width:0;background:var(--primary);transition:.4s}
.table{width:100%;border-collapse:collapse;margin-top:10px}.table th,.table td{padding:10px;border-bottom:1px solid var(--line);text-align:left}.table th{color:var(--muted);font-size:13px}
.notice{background:#fff8e7;border:1px solid #f0dfac;padding:13px;border-radius:13px;color:#614d18;line-height:1.55}
.hidden{display:none}.footer{font-size:12px;color:var(--muted);line-height:1.6;text-align:center;margin-top:20px}
@media(max-width:700px){.grid,.results{grid-template-columns:1fr}.container{padding:14px 11px 35px}.hero,.card{border-radius:17px;padding:17px}}
</style>
</head>
<body>
<div class="container">
  <section class="hero">
    <h1>🕌 કઝા નમાઝ કૅલ્ક્યુલેટર</h1>
    <p>તમારી માહિતી પ્રમાણે અંદાજિત ફરજિયાત નમાઝ, અદા થયેલી નમાઝ અને બાકી કઝાની ગણતરી કરો — અને પછી દૈનિક કઝા પ્લાન બનાવો.</p>
  </section>

  <section class="card">
    <h2>1. તમારી માહિતી</h2>
    <div class="grid">
      <div><label>હાલની ઉંમર (વર્ષ)</label><input id="age" type="number" min="1" max="120" placeholder="ઉદા. 20"></div>
      <div><label>બાલિગ થયાની ઉંમર (વર્ષ)</label><input id="puberty" type="number" min="1" max="60" step="0.1" placeholder="ઉદા. 13"></div>
      <div><label>બાલિગ તારીખ ચોક્કસ ખબર હોય તો</label><input id="pubDate" type="date"><div class="help">તારીખ આપશો તો દિવસોની ગણતરી વધુ ચોક્કસ થશે.</div></div>
      <div><label>અંદાજે અત્યાર સુધી કેટલી નમાઝ પઢી છે?</label><input id="done" type="number" min="0" step="1" placeholder="જો નીચે અલગથી भरो તો ખાલી રાખી શકો"></div>
    </div>
    <div style="margin-top:16px">
      <label>દરેક નમાઝ કેટલી પઢી છે? (અંદાજ)</label>
      <div class="grid">
        <div><label>ફજ્ર</label><input id="doneFajr" type="number" min="0" value="0"></div>
        <div><label>ઝુહર</label><input id="doneZuhr" type="number" min="0" value="0"></div>
        <div><label>અસર</label><input id="doneAsr" type="number" min="0" value="0"></div>
        <div><label>મગરિબ</label><input id="doneMaghrib" type="number" min="0" value="0"></div>
        <div><label>ઈશા</label><input id="doneIsha" type="number" min="0" value="0"></div>
      </div>
      <div class="help">જો આ 5 બોક્સમાં સંખ્યા નાખશો તો વેબસાઇટ દરેક નમાઝની બાકી કઝા અલગથી ગણશે.</div>
    </div>
    <div style="margin-top:15px">
      <label>તમારા માટે લાગુ પડતી વધારાની છૂટ/દિવસો</label>
      <input id="excluded" type="number" min="0" step="1" value="0">
      <div class="help">જેમ કે કોઈ કારણસર નમાઝ ફરજિયાત ન હોય તે દિવસો. આ સંખ્યા પોતાની માન્ય ધાર્મિક માર્ગદર્શિકા પ્રમાણે દાખલ કરો.</div>
    </div>
    <div class="actions"><button onclick="calculate()">ગણતરી કરો</button><button class="secondary" onclick="resetAll()">રીસેટ</button></div>
  </section>

  <section id="resultCard" class="card hidden">
    <h2>2. તમારું પરિણામ</h2>
    <div class="results">
      <div class="stat"><small>ફરજિયાત દિવસો</small><div class="n" id="days">0</div></div>
      <div class="stat"><small>કુલ ફરજ નમાઝ</small><div class="n" id="total">0</div></div>
      <div class="stat"><small>અંદાજિત બાકી કઝા</small><div class="n" id="remaining">0</div></div>
    </div>
    <div style="margin-top:16px"><b>પૂર્ણ થયેલી ગણતરી</b><div class="bar"><div class="fill" id="fill"></div></div><div class="help" id="percent">0%</div></div>
    <table class="table">
      <thead><tr><th>નમાઝ</th><th>રકાત</th><th>કુલ અંદાજ</th></tr></thead>
      <tbody>
        <tr><td>ફજ્ર</td><td>2</td><td id="fajr">0</td></tr>
        <tr><td>ઝુહર</td><td>4</td><td id="zuhr">0</td></tr>
        <tr><td>અસર</td><td>4</td><td id="asr">0</td></tr>
        <tr><td>મગરિબ</td><td>3</td><td id="maghrib">0</td></tr>
        <tr><td>ઈશા</td><td>4</td><td id="isha">0</td></tr>
      </tbody>
    </table>
    <div class="notice" style="margin-top:14px">આ કૅલ્ક્યુલેટર <b>5 ફરજિયાત નમાઝ</b>ના આધારે અંદાજ આપે છે. “બાલિગ” થવાની તારીખ/ઉંમર અને કઝા અંગે તમારા મઝહબના નિયમો અલગ હોઈ શકે છે, તેથી અંતિમ ધાર્મિક નિર્ણય માટે વિશ્વસનીય આલિમ/મુફતીની સલાહ લો.</div>
  </section>

  <section class="card">
    <h2>3. 365 દિવસનો કઝા પ્લાન</h2>
    <div class="grid">
      <div><label>દરરોજ વધારાની કઝા કેટલી?</label><input id="daily" type="number" min="1" value="5"></div>
      <div><label>કેટલા મહિનામાં પૂરી કરવી છે?</label><input id="planMonths" type="number" min="1" value="12" step="1"><div class="help">ઉદા. 6, 12, 18 અથવા 24 મહિના</div></div>
    </div>
    <div class="actions"><button onclick="makePlan()">પ્લાન બનાવો</button></div>
    <div id="planResult" class="hidden" style="margin-top:15px"></div>
  </section>

  <section class="card">
    <h2>4. પ્રગતિ ટ્રેકર</h2>
    <p class="help">દરરોજ તમે જેટલી કઝા પઢી હોય તે અહીં ઉમેરો. આ ડેટા તમારા આ બ્રાઉઝરમાં જ સેવ થાય છે.</p>
    <div class="grid">
      <div><label>આજે કેટલી કઝા પઢી?</label><input id="todayDone" type="number" min="0" value="0"></div>
      <div><label>નોંધ</label><input id="note" placeholder="ઉદા. Day 1"></div>
    </div>
    <div class="actions"><button onclick="addProgress()">આજની પ્રગતિ સેવ કરો</button><button class="secondary" onclick="clearProgress()">પ્રગતિ સાફ કરો</button></div>
    <div id="progressBox" style="margin-top:15px"></div>
  </section>

  <div class="footer">તમારી માહિતી કોઈ સર્વર પર મોકલાતી નથી; આ પેજની ગણતરી તમારા બ્રાઉઝરમાં થાય છે. ધાર્મિક ગણતરીમાં “અંદાજ” હોય તો તેને સ્પષ્ટ રીતે ચકાસો.</div>
</div>

<script>
const $=id=>document.getElementById(id);
function fmt(n){return Math.round(n).toLocaleString('en-IN')}
function calculate(){
  const age=parseFloat($('age').value), pub=parseFloat($('puberty').value);
  if(!age||!pub||age<pub){alert('કૃપા કરીને હાલની ઉંમર અને બાલિગ થયાની યોગ્ય ઉંમર દાખલ કરો.');return}
  let days;
  const pd=$('pubDate').value;
  if(pd){
    const start=new Date(pd+'T00:00:00'), now=new Date(); now.setHours(0,0,0,0);
    days=Math.max(0,Math.floor((now-start)/86400000)+1);
  }else days=Math.max(0,Math.round((age-pub)*365.2425));
  days=Math.max(0,days-(parseInt($('excluded').value)||0));
  const total=days*5;
  const inputs=['doneFajr','doneZuhr','doneAsr','doneMaghrib','doneIsha'];
  const vals=inputs.map(id=>Math.max(0,parseInt($(id).value)||0));
  const hasBreakdown=vals.some(v=>v>0);
  const done=hasBreakdown?Math.min(total,vals.reduce((a,b)=>a+b,0)):Math.min(total,Math.max(0,parseInt($('done').value)||0));
  const rem=Math.max(0,total-done);
  $('days').textContent=fmt(days); $('total').textContent=fmt(total); $('remaining').textContent=fmt(rem);
  ['fajr','zuhr','asr','maghrib','isha'].forEach((x,i)=>$(x).textContent=fmt(Math.max(0,days-vals[i])));
  const pct=total?Math.round(done/total*100):0; $('fill').style.width=pct+'%'; $('percent').textContent=pct+'% પૂર્ણ';
  $('resultCard').classList.remove('hidden'); $('resultCard').scrollIntoView({behavior:'smooth',block:'start'});
  localStorage.setItem('qazaData',JSON.stringify({age,pub,done,excluded:$('excluded').value,pubDate:pd,doneFajr:$('doneFajr').value,doneZuhr:$('doneZuhr').value,doneAsr:$('doneAsr').value,doneMaghrib:$('doneMaghrib').value,doneIsha:$('doneIsha').value}));
}
function makePlan(){
  const rem=parseInt($('remaining').textContent.replace(/,/g,''))||0;
  const months=Math.max(1,parseInt($('planMonths').value)||1);
  if(!rem){alert('પહેલા ઉપરથી ગણતરી કરો.');return}
  const days=Math.round(months*30.4375);
  const perMonth=Math.ceil(rem/months);
  const perDay=Math.ceil(rem/days);
  const perWeek=Math.ceil(rem/(months*4.345));
  $('planResult').classList.remove('hidden');
  $('planResult').innerHTML=`<div class="results">
  <div class="stat"><small>બાકી કઝા</small><div class="n">${fmt(rem)}</div></div>
  <div class="stat"><small>દર મહિને જરૂરી</small><div class="n">${fmt(perMonth)}</div></div>
  <div class="stat"><small>દરરોજ જરૂરી</small><div class="n">${fmt(perDay)}</div></div></div>
  <p><b>${months} મહિના</b>ના લક્ષ્ય માટે અંદાજે <b>${perMonth}</b> કઝા પ્રતિ મહિનો, <b>${perWeek}</b> પ્રતિ અઠવાડિયું અથવા <b>${perDay}</b> પ્રતિ દિવસ પઢવી પડશે.</p>
  <div class="notice">પ્લાન તમારા બાકી કઝાના આંકડા પરથી બને છે. રોજની પાંચ વક્તની વર્તમાન નમાઝ અલગથી સમયસર અદા કરવી જરૂરી છે.</div>`;
}
function addProgress(){
  const n=Math.max(0,parseInt($('todayDone').value)||0), note=$('note').value.trim();
  const arr=JSON.parse(localStorage.getItem('qazaProgress')||'[]');
  arr.push({date:new Date().toLocaleDateString('en-IN'),n,note}); localStorage.setItem('qazaProgress',JSON.stringify(arr)); renderProgress();
}
function renderProgress(){
  const arr=JSON.parse(localStorage.getItem('qazaProgress')||'[]'), sum=arr.reduce((a,x)=>a+x.n,0);
  $('progressBox').innerHTML=arr.length?`<b>કુલ ટ્રેક થયેલી કઝા: ${fmt(sum)}</b><table class="table"><thead><tr><th>તારીખ</th><th>કઝા</th><th>નોંધ</th></tr></thead><tbody>${arr.slice().reverse().slice(0,30).map(x=>`<tr><td>${x.date}</td><td>${fmt(x.n)}</td><td>${x.note||'—'}</td></tr>`).join('')}</tbody></table>`:'હજુ કોઈ પ્રગતિ સેવ નથી.';
}
function clearProgress(){if(confirm('બધી ટ્રેકર પ્રગતિ કાઢી નાખવી છે?')){localStorage.removeItem('qazaProgress');renderProgress()}}
function resetAll(){['age','puberty','pubDate','done'].forEach(id=>$(id).value=''); ['doneFajr','doneZuhr','doneAsr','doneMaghrib','doneIsha'].forEach(id=>$(id).value=0);$('excluded').value=0;$('resultCard').classList.add('hidden');}
(function(){const d=JSON.parse(localStorage.getItem('qazaData')||'null');if(d){$('age').value=d.age||'';$('puberty').value=d.pub||'';$('done').value=d.done||'';$('excluded').value=d.excluded||0;$('pubDate').value=d.pubDate||''; ['doneFajr','doneZuhr','doneAsr','doneMaghrib','doneIsha'].forEach(id=>$(id).value=d[id]||0)}renderProgress()})();
</script>
</body>
</html>
