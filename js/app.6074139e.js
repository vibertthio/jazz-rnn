!function(t){function e(e){for(var r,s,i=e[0],c=e[1],u=e[2],d=0,p=[];d<i.length;d++)s=i[d],o[s]&&p.push(o[s][0]),o[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(l&&l(e);p.length;)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={0:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var l=c;a.push([122,1]),n()}({122:function(t,e,n){"use strict";n.r(e);n(43),n(38),n(55),n(60);var r=n(68),o=n.n(r),a=(n(89),n(90),n(0)),s=n.n(a),i=n(27),c=n.n(i);function u(t,e,n,r,o,a,s){try{var i=t[a](s),c=i.value}catch(t){return void n(t)}i.done?e(c):Promise.resolve(c).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function s(t){u(a,r,o,s,i,"next",t)}function i(t){u(a,r,o,s,i,"throw",t)}s(void 0)})}}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var p=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.constants={},this.server={},this.tone={},this.scores={},this.sounds={},this.parts={},this.initConstants(),this.initServerConnection(),this.initSounds()}var e,n,r;return e=t,(n=[{key:"initConstants",value:function(){var t={CHRD:0,MLDY:1,BASS:2,DRUM:3},e=[t.CHRD,t.MLDY,t.BASS],n=[t.DRUM],r=[t.CHRD,t.MLDY,t.BASS,t.DRUM];this.constants={ServerURL:"https://developer.ailabs.tw/ai-music-performancernn-demo/api/",APIS:{META:"getStaticMeta",CHRD:"getStaticChordProgression",ALL:"getStaticIntegration",V_META:"postVarianceMeta",V_CHRD:"postVarianceChordProgression",V_ALL:"postVarianceIntegration"},Instruments:t,ToneInstruments:e,DrumInstruments:n,AllInstruments:r}}},{key:"initServerConnection",value:function(){var t=this,e=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.constants.ServerURL+t.constants.APIS.META,e.next=3,fetch(n,{method:"GET",headers:{accept:"application/json","content-type":"application/json"}});case 3:return r=e.sent,e.next=6,r.json();case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),n=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o,a,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>0&&void 0!==s[0]?s[0]:0,r=t.constants.ServerURL+t.constants.APIS.ALL,e.next=4,fetch(r,{method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({ChordIdx:n})});case 4:return o=e.sent,e.next=7,o.json();case 7:return a=e.sent,e.abrupt("return",a);case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),r=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.constants.ServerURL+t.constants.APIS.V_META,e.next=3,fetch(n,{method:"GET",headers:{accept:"application/json","content-type":"application/json"}});case 3:return r=e.sent,e.next=6,r.json();case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),o=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o,a,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>0&&void 0!==s[0]?s[0]:0,r=t.constants.ServerURL+t.constants.APIS.V_CHRD,e.next=4,fetch(r,{method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({ChordIdx:n})});case 4:return o=e.sent,e.next=7,o.json();case 7:return a=e.sent,e.abrupt("return",a);case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),a=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o,a,s,i,c=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:0,r=c.length>1&&void 0!==c[1]?c[1]:1,o=c.length>2&&void 0!==c[2]?c[2]:1,a=t.constants.ServerURL+t.constants.APIS.V_ALL,e.next=6,fetch(a,{method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({ChordIdx:n,Temperature:r,NoteDensity:o})});case 6:return s=e.sent,e.next=9,s.json();case 9:return i=e.sent,e.abrupt("return",i);case 11:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();this.server={getStaticMeta:e,getStaticIntegration:n,postVarianceMeta:r,postVarianceChordProgression:o,postVarianceIntegration:a}}},{key:"initSounds",value:function(){var t=this;this.tone=s.a;var e=s.a.context,n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:220,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return t.map(function(t){var o=t.end,a=t.pitch,i=t.start,c=t.velocity,u=.5/e*(o-i);return{time:(i+4*e*8*r)*(.5/e),note:s.a.Frequency(a+12*n,"midi").toNote(),duration:u,vel:c/128}})},r=function(){var e=l(regeneratorRuntime.mark(function e(){var r,o,s,i,c,u,l,d,p=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=p.length>0&&void 0!==p[0]?p[0]:0,e.next=3,t.server.getStaticIntegration(r);case 3:o=e.sent,console.log("[ id: ".concat(r," ] loaded!")),s=n(o.ProgressionsData.Bass,220,-1),(i=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.bassSound.play(r,e,{gain:a,duration:o})},s)).loop=!0,i.loopEnd=16,c=n(o.ProgressionsData.Melody,220),(u=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.melodySound.play(r,e,{gain:a,duration:o})},c)).loop=!0,u.loopEnd=16,l=n(o.ProgressionsData.Chord,220),(d=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.chordsSound.play(r,e,{gain:a,duration:o})},l)).loop=!0,d.loopEnd=16,t.parts={data:o,bassPart:i,chordsPart:d,melodyPart:u};case 18:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),o=function(){var e=l(regeneratorRuntime.mark(function e(){var r,o,s,i,c,u,l,d,p,h,f=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=f.length>0&&void 0!==f[0]?f[0]:0,o=f.length>1&&void 0!==f[1]?f[1]:1,s=f.length>2&&void 0!==f[2]?f[2]:1,console.log("Data loaded: single [ id: ".concat(r,", dense: ").concat(s,", temp: ").concat(o," ]")),e.next=6,t.server.postVarianceIntegration(r,o,s);case 6:i=e.sent,c=n(i.Data.Bass.Notes,i.Data.Bass.BeatResolutions,-1),(u=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.bassSound.play(r,e,{gain:a,duration:o})},c)).loop=!0,u.loopEnd=16,l=n(i.Data.Melody.Notes,i.Data.Melody.BeatResolutions),(d=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.melodySound.play(r,e,{gain:a,duration:o})},l)).loop=!0,d.loopEnd=16,p=n(i.Data.Chord.Notes,i.Data.Chord.BeatResolutions),(h=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.chordsSound.play(r,e,{gain:a,duration:o})},p)).loop=!0,h.loopEnd=16,t.parts={data:i,bassPart:u,chordsPart:h,melodyPart:d};case 20:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),i=function(){var e=l(regeneratorRuntime.mark(function e(){var r,o,s,i,c,u,l,d,p,h,f,g,v=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=v.length>0&&void 0!==v[0]?v[0]:0,o=v.length>1&&void 0!==v[1]?v[1]:1,s=v.length>2&&void 0!==v[2]?v[2]:1,v.length>3&&void 0!==v[3]?v[3]:3,e.next=6,t.server.postVarianceIntegration(r,o,s);case 6:return i=e.sent,console.log("Data loaded: progression (1/3) [ id: ".concat(r,", dense: ").concat(s,", temp: ").concat(o," ]")),e.next=10,t.server.postVarianceIntegration(r,o,s+.75);case 10:return c=e.sent,console.log("Data loaded: progression (2/3) [ id: ".concat(r,", dense: ").concat(s+.75,", temp: ").concat(o," ]")),e.next=14,t.server.postVarianceIntegration(r,o,s-.25);case 14:u=e.sent,console.log("Data loaded: progression (3/3) [ id: ".concat(r,", dense: ").concat(s-.25,", temp: ").concat(o," ]")),l=n(i.Data.Bass.Notes,i.Data.Bass.BeatResolutions,-1).concat(n(c.Data.Bass.Notes,i.Data.Bass.BeatResolutions,-1,1)).concat(n(u.Data.Bass.Notes,i.Data.Bass.BeatResolutions,-1,2)),(d=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.bassSound.play(r,e,{gain:a,duration:o})},l)).loop=!0,d.loopEnd=48,p=n(i.Data.Melody.Notes,i.Data.Melody.BeatResolutions).concat(n(c.Data.Melody.Notes,i.Data.Melody.BeatResolutions,0,1)).concat(n(u.Data.Melody.Notes,i.Data.Melody.BeatResolutions,0,2)),(h=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.melodySound.play(r,e,{gain:a,duration:o})},p)).loop=!0,h.loopEnd=48,f=n(i.Data.Chord.Notes,i.Data.Chord.BeatResolutions).concat(n(c.Data.Chord.Notes,i.Data.Chord.BeatResolutions,0,1)).concat(n(u.Data.Chord.Notes,i.Data.Chord.BeatResolutions,0,2)),(g=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.chordsSound.play(r,e,{gain:a,duration:o})},f)).loop=!0,g.loopEnd=48,t.parts={data:i,datas:[i,c,u],bassPart:d,chordsPart:g,melodyPart:h};case 29:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),u=function(){var n=l(regeneratorRuntime.mark(function n(){var r,o,i,u,l,d,p,h,f,g,v,m;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=new s.a.Gain(.3),o=new s.a.Freeverb(.7,1e3),i=new s.a.EQ3(0,-5,0),u=new s.a.Gain(.6),n.next=6,c.a.instrument(e,"acoustic_grand_piano",{soundfont:"MusyngKite",destination:i,adsr:[.02,.3,.9,1.5]});case 6:return l=n.sent,i.chain(u,o,r,a.Master),i.chain(u,a.Master),console.log("Melody sounds loaded!"),d=new s.a.EQ3(-10,-2,-5),p=new s.a.Gain(1),n.next=14,c.a.instrument(e,"electric_piano_1",{soundfont:"MusyngKite",destination:d});case 14:return h=n.sent,d.chain(p,o,r,a.Master),d.chain(p,a.Master),console.log("Chords sounds loaded!"),f=new s.a.EQ3(0,0,0),g=new s.a.Gain(.4),n.next=22,c.a.instrument(e,"acoustic_bass",{soundfont:"MusyngKite",destination:f});case 22:v=n.sent,f.chain(g,a.Master),console.log("Bass sounds loaded!"),m=function(e){t.sounds.volume=.01*e;var n=20*Math.log(.01*e);a.Master.volume.value=n},t.sounds={volume:1,sendReverb:o,sendReverbGain:r,changeMasterVolume:m,melodySound:l,melodyGain:u,chordsSound:h,chordsGain:p,bassSound:v,bassGain:g};case 27:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}();this.scores={initParts:r,initVarianceParts:o,initVarianceProgression:i,loadSoundFonts:u,stopAll:function(){t.parts.chordsPart.stop(),t.parts.melodyPart.stop(),t.parts.bassPart.stop(),t.sounds.chordsSound.stop(),t.sounds.melodySound.stop(),t.sounds.bassSound.stop()},startAll:function(){t.parts.bassPart.start(),t.parts.melodyPart.start(),t.parts.chordsPart.start()},changeScores:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]}}}}])&&d(e.prototype,n),r&&d(e,r),t}(),h=(n(106),n(110),n(111),n(112),n(64),n(118),n(120),["rgba(53, 53, 53, 1)","rgba(60, 110, 113, 1)","rgba(255, 255, 255, 1)","rgba(217, 217, 217, 1)","rgba(40, 75, 99, 1)","rgba(80, 80, 80, 1)","#ff9e74"]),f=n(69),g=n.n(f);function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var m=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e,this.melody=[],this.loading=!0,this.currentPosition=0,this.canvas=document.getElementById(this.id),this.hoveringNotes=!0,this.hoveringSounds=!1,this.waiting=!1}var e,n,r;return e=t,(n=[{key:"updateMelody",value:function(t){this.loading=!1,this.melody=t}},{key:"draw",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.canvas=document.getElementById(this.id);var e=g()(this.canvas);this.canvas.width=0|e[0],this.canvas.height=0|e[1];var n=this.canvas.width,r=this.canvas.height,o=n-10,a=r-10,s=this.canvas.getContext("2d"),i=7040*t;if(s.save(),s.clearRect(0,0,n,r),s.translate(5,5),this.drawAnchorPoints(s,o,a,o/16),this.drawProgress(s,o,a,t),!this.loading&&!this.hoveringNotes){s.save();var c=o/7040,u=a/64,l=!0,d=!1,p=void 0;try{for(var f,v=this.melody[Symbol.iterator]();!(l=(f=v.next()).done);l=!0){var m=f.value,y=m.start,w=m.end,b=m.pitch,x=(m.velocity,w-y);s.save(),s.translate(y*c,(64-(b-28))*u),this.waiting?s.fillStyle=h[5]:s.fillStyle=h[3],i>=y&&i<w?(s.fillStyle=h[6],s.translate(-x*c*.1,-2.5),s.fillRect(0,0,x*c*1.1,2*u)):s.fillRect(0,0,x*c*.8,u),s.restore()}}catch(t){d=!0,p=t}finally{try{l||null==v.return||v.return()}finally{if(d)throw p}}s.restore()}s.restore()}},{key:"drawAnchorPoints",value:function(t,e,n,r){t.save();for(var o=e/r,a=n/r,s=0;s<=o;s+=1)for(var i=0;i<=a+1;i+=1){if(t.save(),t.fillStyle=h[5],t.translate(s*r,i*r),this.hoveringNotes){t.fillStyle=h[6];var c=3*Math.sin(.002*Date.now()-.1*s+.1*i);t.beginPath(),t.arc(0,0,Math.abs(2*c*.5),0,2*Math.PI),t.fill()}else t.fillRect(0,0,2,2);t.restore()}t.restore()}},{key:"drawProgress",value:function(t,e,n,r){t.save(),t.strokeStyle=h[6],t.fillStyle=h[6],t.translate(e*r,0),t.beginPath(),t.arc(0,0,.03*n,0,2*Math.PI),t.fill(),t.beginPath(),t.moveTo(0,0),t.lineTo(0,n),t.stroke(),t.translate(0,n),t.beginPath(),t.arc(0,0,.03*n,0,2*Math.PI),t.fill(),t.restore()}}])&&v(e.prototype,n),r&&v(e,r),t}();function y(t,e,n,r,o,a,s){try{var i=t[a](s),c=i.value}catch(t){return void n(t)}i.done?e(c):Promise.resolve(c).then(r,o)}function w(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function s(t){y(a,r,o,s,i,"next",t)}function i(t){y(a,r,o,s,i,"throw",t)}s(void 0)})}}var b=new p,x=new m("canvas-1"),P=new m("canvas-2"),R=new m("canvas-3"),S=b.tone,M=S.context,C=!0,N=!0,B=4,D=1,I=1,E=0,k=!0,A=0,V=function(){document.getElementById("play").firstChild.textContent="stop",N=!0,b.scores.startAll()},j=function(){document.getElementById("play").firstChild.textContent="play",N=!1,b.scores.stopAll()},T=function(t){S.Transport.bpm.value=t},L=function(t){var e=t.Data,n=e.Bass,r=e.Chord,o=(e.Drums,e.Melody);x.updateMelody(r.Notes),P.updateMelody(o.Notes),R.updateMelody(n.Notes)},O=function(){var t=w(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.server.postVarianceMeta();case 2:return e=t.sent,console.log("MetaData loaded!"),E=e.MetaData.NumChordProgression,t.next=7,b.scores.loadSoundFonts();case 7:return t.next=9,b.scores.initVarianceParts(B);case 9:b.scores.startAll(),console.log("Soundfonts loaded!"),T(120),S.Master.volume.value=20*Math.log(.8),S.Transport.start(),document.getElementById("play").firstChild.textContent="stop",C=!1,x.hoveringNotes=!1,P.hoveringNotes=!1,R.hoveringNotes=!1,L(b.parts.data);case 21:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}(),_=function t(){var e=function(){var t=0;if(b.parts.chordsPart&&!C)if(k)t=b.parts.chordsPart.progress;else{t=3*b.parts.chordsPart.progress;var e=Math.floor(t);A!=e&&(console.log("progress: ".concat(e+1,"/").concat(3)),A=e,document.getElementById("long").firstChild.textContent="".concat(A+1,"/3"),L(b.parts.datas[A])),t-=e}return t}();x.draw(e),P.draw(e),R.draw(e),requestAnimationFrame(function(){t()})};o()(M,"#play",function(){var t,e,n,r,o=document.getElementById("play");console.log("AudioContext started!"),console.log("start loading..."),o.firstChild.textContent="loading",console.log("%c Jazz RNN ","background: #222; color: #f70ec4; font-size: 15px;"),console.log("%c 2019-05-20 ","background: #fff; color: #f70ec4; font-size: 10px;"),console.log("%c made by Vibert Thio","background: #fff; color: #f70ec4; font-size: 10px;"),O(),document.getElementById("play").onclick=function(){C||(N?j():V())},document.getElementById("reload").onclick=w(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(C){t.next=20;break}return j(),C=!0,k=!0,x.hoveringNotes=!0,P.hoveringNotes=!0,R.hoveringNotes=!0,document.getElementById("play").firstChild.textContent="loading",document.getElementById("long").firstChild.textContent="long",B=Math.floor(Math.random()*E),t.next=14,b.scores.initVarianceParts(B,I,D);case 14:L(b.parts.data),C=!1,x.hoveringNotes=!1,P.hoveringNotes=!1,R.hoveringNotes=!1,V();case 20:case"end":return t.stop()}},t)})),document.getElementById("long").onclick=w(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(C){t.next=20;break}if(!k){t.next=20;break}return N&&b.scores.stopAll(),k=!1,C=!0,x.hoveringNotes=!0,P.hoveringNotes=!0,R.hoveringNotes=!0,document.getElementById("play").firstChild.textContent="loading",document.getElementById("long").firstChild.textContent="1/3",t.next=14,b.scores.initVarianceProgression(B,I,D);case 14:L(b.parts.data),C=!1,x.hoveringNotes=!1,P.hoveringNotes=!1,R.hoveringNotes=!1,V();case 20:case"end":return t.stop()}},t)})),document.getElementById("volume").onchange=function(t){b.sounds.changeMasterVolume(t.target.value)},document.getElementById("bpm").onchange=function(t){T(t.target.value)},document.getElementById("s1").onchange=function(t){var e=.01*t.target.value;b.sounds.sendReverbGain.gain.value=e},document.getElementById("s2").onchange=function(t){var e=.01*t.target.value;b.sounds.sendReverb.roomSize.value=e},document.getElementById("s3").onchange=(r=w(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(C){t.next=17;break}return D=.01*e.target.value,j(),C=!0,x.hoveringNotes=!0,P.hoveringNotes=!0,R.hoveringNotes=!0,document.getElementById("play").firstChild.textContent="loading",t.next=11,b.scores.initVarianceParts(B,I,D);case 11:L(b.parts.data),C=!1,x.hoveringNotes=!1,P.hoveringNotes=!1,R.hoveringNotes=!1,V();case 17:case"end":return t.stop()}},t)})),function(t){return r.apply(this,arguments)}),document.getElementById("s4").onchange=(n=w(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(C){t.next=17;break}return I=.01*e.target.value,j(),C=!0,x.hoveringNotes=!0,P.hoveringNotes=!0,R.hoveringNotes=!0,document.getElementById("play").firstChild.textContent="loading",t.next=11,b.scores.initVarianceParts(B,I,D);case 11:L(b.parts.data),C=!1,x.hoveringNotes=!1,P.hoveringNotes=!1,R.hoveringNotes=!1,V();case 17:case"end":return t.stop()}},t)})),function(t){return n.apply(this,arguments)}),document.getElementById("s5").onchange=(e=w(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=.01*e.target.value,b.sounds.melodyGain.gain.value=n;case 2:case"end":return t.stop()}},t)})),function(t){return e.apply(this,arguments)}),document.getElementById("s6").onchange=(t=w(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=.01*e.target.value,b.sounds.chordsGain.gain.value=n;case 2:case"end":return t.stop()}},t)})),function(e){return t.apply(this,arguments)}),requestAnimationFrame(function(){_()})})},89:function(t,e,n){}});
//# sourceMappingURL=app.6074139e.js.map