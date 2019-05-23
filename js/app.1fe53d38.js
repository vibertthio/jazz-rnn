!function(t){function e(e){for(var r,s,i=e[0],u=e[1],c=e[2],d=0,f=[];d<i.length;d++)s=i[d],o[s]&&f.push(o[s][0]),o[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(l&&l(e);f.length;)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={0:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var l=u;a.push([120,1]),n()}({120:function(t,e,n){"use strict";n.r(e);n(26),n(46),n(56);var r=n(65),o=n.n(r),a=(n(85),n(86),n(9)),s=n.n(a),i=n(25),u=n.n(i);function c(t,e,n,r,o,a,s){try{var i=t[a](s),u=i.value}catch(t){return void n(t)}i.done?e(u):Promise.resolve(u).then(r,o)}function l(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function s(t){c(a,r,o,s,i,"next",t)}function i(t){c(a,r,o,s,i,"throw",t)}s(void 0)})}}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var f=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.constants={},this.server={},this.tone={},this.scores={},this.sounds={},this.parts={},this.initConstants(),this.initServerConnection(),this.initSounds()}var e,n,r;return e=t,(n=[{key:"initConstants",value:function(){var t={CHRD:0,MLDY:1,BASS:2,DRUM:3},e=[t.CHRD,t.MLDY,t.BASS],n=[t.DRUM],r=[t.CHRD,t.MLDY,t.BASS,t.DRUM];this.constants={ServerURL:"https://developer.ailabs.tw/ai-music-performancernn-demo/api/",APIS:{META:"getStaticMeta",CHRD:"getStaticChordProgression",ALL:"getStaticIntegration"},Instruments:t,ToneInstruments:e,DrumInstruments:n,AllInstruments:r}}},{key:"initServerConnection",value:function(){var t=this,e=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.constants.ServerURL+t.constants.APIS.META,e.next=3,fetch(n,{method:"GET",headers:{accept:"application/json","content-type":"application/json"}});case 3:return r=e.sent,e.next=6,r.json();case 6:return o=e.sent,e.abrupt("return",o);case 8:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),n=function(){var e=l(regeneratorRuntime.mark(function e(){var n,r,o,a,s=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>0&&void 0!==s[0]?s[0]:0,r=t.constants.ServerURL+t.constants.APIS.ALL,e.next=4,fetch(r,{method:"POST",headers:{accept:"application/json","content-type":"application/json"},body:JSON.stringify({ChordIdx:n})});case 4:return o=e.sent,e.next=7,o.json();case 7:return a=e.sent,e.abrupt("return",a);case 9:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();this.server={getStaticMeta:e,getStaticIntegration:n}}},{key:"initSounds",value:function(){var t=this;this.tone=s.a;var e=s.a.context,n=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.map(function(t){var n=t.end,r=t.pitch,o=t.start,a=t.velocity,i=.5/220*(n-o);return{time:o*(.5/220),note:s.a.Frequency(r+12*e,"midi").toNote(),duration:i,vel:a/128}})},r=function(){var e=l(regeneratorRuntime.mark(function e(){var r,o,s,i,u,c,l,d,f=arguments;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=f.length>0&&void 0!==f[0]?f[0]:0,e.next=3,t.server.getStaticIntegration(r);case 3:o=e.sent,console.log("data [".concat(r,"] loaded!")),s=n(o.ProgressionsData.Bass,-1),(i=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.bassSound.play(r,e,{gain:a*t.sounds.volume*t.sounds.mixing.bass,duration:o})},s)).loop=!0,i.loopEnd=16,u=n(o.ProgressionsData.Melody),(c=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.pianoSound.play(r,e,{gain:a*t.sounds.volume*t.sounds.mixing.piano,duration:o})},u)).loop=!0,c.loopEnd=16,l=n(o.ProgressionsData.Chord),(d=new a.Part(function(e,n){var r=n.note,o=n.duration,a=n.vel;t.sounds.compSound.play(r,e,{gain:a*t.sounds.volume*t.sounds.mixing.comp,duration:o})},l)).loop=!0,d.loopEnd=16,t.parts={data:o,bassPart:i,chordPart:d,melodyPart:c};case 18:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),o=function(){var n=l(regeneratorRuntime.mark(function n(){var r,o,a,s;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.a.instrument(e,"acoustic_grand_piano",{soundfont:"MusyngKite"});case 2:return r=n.sent,console.log("Piano sounds loaded!"),n.next=6,u.a.instrument(e,"electric_piano_1",{soundfont:"MusyngKite"});case 6:return o=n.sent,console.log("Comp sounds loaded!"),n.next=10,u.a.instrument(e,"acoustic_bass",{soundfont:"MusyngKite"});case 10:a=n.sent,console.log("Bass sounds loaded!"),s={comp:1,bass:.5,piano:.3},t.sounds={volume:3,mixing:s,pianoSound:r,compSound:o,bassSound:a};case 14:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}();this.scores={initParts:r,loadSoundFonts:o,stopAll:function(){t.parts.bassPart.stop(),t.parts.melodyPart.stop(),t.parts.chordPart.stop()},startAll:function(){t.parts.bassPart.start(),t.parts.melodyPart.start(),t.parts.chordPart.start()},changeScores:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]}}}}])&&d(e.prototype,n),r&&d(e,r),t}(),p=(n(104),n(108),n(109),n(110),n(61),n(116),n(118),["rgba(53, 53, 53, 1)","rgba(60, 110, 113, 1)","rgba(255, 255, 255, 1)","rgba(217, 217, 217, 1)","rgba(40, 75, 99, 1)","rgba(80, 80, 80, 1)","#ff9e74"]),v=n(66),h=n.n(v);function g(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var m=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.id=e,this.melody=[],this.loading=!0,this.currentPosition=0,this.canvas=document.getElementById(this.id),this.hoveringNotes=!0,this.hoveringSounds=!1,this.waiting=!1}var e,n,r;return e=t,(n=[{key:"updateMelody",value:function(t){this.loading=!1,this.melody=t}},{key:"draw",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.canvas=document.getElementById(this.id);var e=h()(this.canvas);this.canvas.width=0|e[0],this.canvas.height=0|e[1];var n=this.canvas.width,r=this.canvas.height,o=n-10,a=r-10,s=this.canvas.getContext("2d"),i=7040*t;if(s.save(),s.clearRect(0,0,n,r),s.translate(5,5),this.drawAnchorPoints(s,o,a,o/16),this.drawProgress(s,o,a,t),!this.loading&&!this.hoveringNotes){s.save();var u=o/7040,c=a/64,l=!0,d=!1,f=void 0;try{for(var v,g=this.melody[Symbol.iterator]();!(l=(v=g.next()).done);l=!0){var m=v.value,y=m.start,b=m.end,w=m.pitch,P=(m.velocity,b-y);s.save(),s.translate(y*u,(64-(w-28))*c),this.waiting?s.fillStyle=p[5]:s.fillStyle=p[3],i>=y&&i<b?(s.fillStyle=p[6],s.translate(-P*u*.1,-2.5),s.fillRect(0,0,P*u*1.1,2*c)):s.fillRect(0,0,P*u*.8,c),s.restore()}}catch(t){d=!0,f=t}finally{try{l||null==g.return||g.return()}finally{if(d)throw f}}s.restore()}s.restore()}},{key:"drawAnchorPoints",value:function(t,e,n,r){t.save();for(var o=e/r,a=n/r,s=0;s<=o;s+=1)for(var i=0;i<=a+1;i+=1){if(t.save(),t.fillStyle=p[5],t.translate(s*r,i*r),this.hoveringNotes){t.fillStyle=p[6];var u=3*Math.sin(.002*Date.now()-.1*s+.1*i);t.beginPath(),t.arc(0,0,Math.abs(2*u*.5),0,2*Math.PI),t.fill()}else t.fillRect(0,0,2,2);t.restore()}t.restore()}},{key:"drawProgress",value:function(t,e,n,r){t.save(),t.strokeStyle=p[6],t.fillStyle=p[6],t.translate(e*r,0),t.beginPath(),t.arc(0,0,.03*n,0,2*Math.PI),t.fill(),t.beginPath(),t.moveTo(0,0),t.lineTo(0,n),t.stroke(),t.translate(0,n),t.beginPath(),t.arc(0,0,.03*n,0,2*Math.PI),t.fill(),t.restore()}}])&&g(e.prototype,n),r&&g(e,r),t}();function y(t,e,n,r,o,a,s){try{var i=t[a](s),u=i.value}catch(t){return void n(t)}i.done?e(u):Promise.resolve(u).then(r,o)}function b(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function s(t){y(a,r,o,s,i,"next",t)}function i(t){y(a,r,o,s,i,"throw",t)}s(void 0)})}}var w=new f,P=new m("canvas-1"),S=new m("canvas-2"),x=new m("canvas-3"),M=w.tone,C=M.context,R=!0,k=!0,I=0,A=0,D=function(){document.getElementById("play").firstChild.textContent="stop",k=!0,w.scores.startAll()},E=function(){document.getElementById("play").firstChild.textContent="play",k=!1,w.scores.stopAll()},B=function(t){M.Transport.bpm.value=t},N=function(t){var e=t.ProgressionsData,n=e.Bass,r=e.Chord,o=(e.Drums,e.Melody);P.updateMelody(r),S.updateMelody(o),x.updateMelody(n)},j=function(){var t=b(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.server.getStaticMeta();case 2:return e=t.sent,console.log("MetaData loaded!"),A=e.MetaData.NumChordProgression,t.next=7,w.scores.loadSoundFonts();case 7:return t.next=9,w.scores.initParts();case 9:w.scores.startAll(),console.log("Soundfonts loaded!"),B(120),M.Master.volume.value=20*Math.log(.8),M.Transport.start(),document.getElementById("play").firstChild.textContent="stop",R=!1,P.hoveringNotes=!1,S.hoveringNotes=!1,x.hoveringNotes=!1,N(w.parts.data);case 21:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}();o()(C,"#play",function(){var t=document.getElementById("play");console.log("AudioContext started!"),console.log("start loading..."),t.firstChild.textContent="loading",console.log("%c Jazz RNN ","background: #222; color: #f70ec4; font-size: 15px;"),console.log("%c 2019-05-20 ","background: #fff; color: #f70ec4; font-size: 10px;"),console.log("%c made by Vibert Thio","background: #fff; color: #f70ec4; font-size: 10px;"),j(),document.getElementById("play").onclick=function(){R||(k?E():D())},document.getElementById("reload").onclick=b(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(R){t.next=17;break}return E(),R=!0,P.hoveringNotes=!0,S.hoveringNotes=!0,x.hoveringNotes=!0,document.getElementById("play").firstChild.textContent="loading",I=Math.floor(Math.random()*A),t.next=11,w.scores.initParts(I);case 11:N(w.parts.data),R=!1,P.hoveringNotes=!1,S.hoveringNotes=!1,x.hoveringNotes=!1,D();case 17:case"end":return t.stop()}},t)})),document.getElementById("volume").onchange=function(t){w.sounds.volume=.01*t.target.value},document.getElementById("bpm").onchange=function(t){B(t.target.value)},requestAnimationFrame(function(){!function t(){var e=0;w.parts.chordPart&&(e=w.parts.chordPart.progress),P.draw(e),S.draw(e),x.draw(e),requestAnimationFrame(function(){t()})}()})})},85:function(t,e,n){}});
//# sourceMappingURL=app.1fe53d38.js.map