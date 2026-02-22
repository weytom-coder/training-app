
const CACHE='tf-app-v6_1';
const SHELL=['./','./index.html','./style.css','./app.js','./training.html','./training_mo.html','./training_do.html','./training_sa.html','./details.html','./settings.html','./ernaehrung.html','./progress.html','./manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});
