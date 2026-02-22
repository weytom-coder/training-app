
// Utilities
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// Settings storage
const Settings = {
  key:'tf_settings',
  get(){ try{return JSON.parse(localStorage.getItem(this.key)||'{}')}catch(e){return{}} },
  set(p){ const cur=this.get(); localStorage.setItem(this.key, JSON.stringify({...cur,...p})); this.apply(); },
  apply(){ const s=this.get();
    // font size scaling
    if(s.fontScale){ document.documentElement.style.setProperty('--fs', s.fontScale+'px'); }
    // theme
    const root=document.documentElement; root.classList.remove('light');
    if(s.theme==='light') root.classList.add('light');
    // haptics flag stored only
  }
}

// Haptics helper
function buzz(pattern=[180,100,180]){ const s=Settings.get(); if(s.haptics===false) return; try{ if(navigator.vibrate) navigator.vibrate(pattern); }catch(e){} }

// Rest timer with presets
class RestTimer{
  constructor(root){ this.root=root; const s=Settings.get(); this.sec = s.timerPreset||60; this.left=this.sec; this.t=null; this.render(); }
  render(){
    this.root.innerHTML = `
      <div class="row">
        <span class="badge">Rest</span>
        <time id="rt">${this.left}s</time>
        <button class="btn ghost" id="m10">-10s</button>
        <button class="btn ghost" id="p10">+10s</button>
        <button class="btn" id="start">Start</button>
        <button class="btn ghost" id="reset">Reset</button>
      </div>
      <div class="row">
        <span class="badge">Presets</span>
        <button class="btn ghost" data-preset="30">30s</button>
        <button class="btn ghost" data-preset="60">60s</button>
        <button class="btn ghost" data-preset="90">90s</button>
      </div>`;
    this.root.querySelector('#m10').onclick=()=>{this.left=Math.max(0,this.left-10);this.update()};
    this.root.querySelector('#p10').onclick=()=>{this.left=this.left+10;this.update()};
    this.root.querySelector('#start').onclick=()=>this.start();
    this.root.querySelector('#reset').onclick=()=>this.reset();
    this.root.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>{this.sec=parseInt(b.dataset.preset);this.left=this.sec;this.update();});
  }
  update(){ this.root.querySelector('#rt').textContent=`${this.left}s`; }
  start(){ if(this.t) return; this.t=setInterval(()=>{ this.left--; this.update(); if(this.left<=0){ clearInterval(this.t); this.t=null; buzz(); } },1000); }
  reset(){ clearInterval(this.t); this.t=null; this.left=this.sec; this.update(); }
}

// Apply settings on load
window.addEventListener('DOMContentLoaded', ()=> Settings.apply());
