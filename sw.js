const CACHE='tf-app-v6_4_images';const SHELL=[
'./','./index.html','./style.css','./app.js','./training.html','./training_mo.html','./training_do.html','./training_sa.html','./details.html','./settings.html','./progress.html','./ernaehrung.html','./manifest.json',
'./assets/img/Pectoral_Reverse_Fly.jpg',
'./assets/img/einarmiges_kurzhantelrudern.jpg',
'./assets/img/goblet_squat.jpg',
'./assets/img/cable_station.jpg',
'./assets/img/Synchro_with_Ramp.jpg',
'./assets/img/leg_curl.jpg',
'./assets/img/hammer_curls.jpg',
'./assets/img/kurzhantel_rdl.jpg',
'./assets/img/bike.jpg',
'./assets/img/Leg_Press_Reverse.jpg',
'./assets/img/Leg_Extension.jpg',
'./assets/img/seitenheben.jpg',
'./assets/img/schraegbankdruecken.jpg',
'./assets/img/Upper_Back_Selection.jpg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))) });
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request))) });
