import StartAudioContext from 'startaudiocontext';
import './index.scss';
import JazzRNN from './jazz-rnn';
import MelodyLine from './melody-line';
import { copyRight } from './utils';
import fakeData from './fake-data';

const jr = new JazzRNN();
const chordRenderer = new MelodyLine('canvas-1');
const melodyRenderer = new MelodyLine('canvas-2');
const bassRenderer = new MelodyLine('canvas-3');
const tone = jr.tone;
const ctx = tone.context;
let loading = true;
let playing = true;
let dataId = 0;

const start = () => {
  const playBtn = document.getElementById('play');
  playBtn.firstChild.textContent = 'stop';
  playing = true;
  jr.scores.startAll();
};

const stop = () => {
  const playBtn = document.getElementById('play');
  playBtn.firstChild.textContent = 'play';
  playing = false;
  jr.scores.stopAll();
};

const resumeTransport = () => {
  tone.Transport.start();
};

const pauseTransport = () => {
  jr.scores.stopAll();
  tone.Transport.pause();
};

const setBpm = (bpm) => {
  tone.Transport.bpm.value = bpm;
};

const updateMelodies = (data) => {
  const { Bass, Chord, Drums, Melody } = data.ProgressionsData;
  chordRenderer.updateMelody(Chord);
  melodyRenderer.updateMelody(Melody);
  bassRenderer.updateMelody(Bass);
};

const setup = async () => {
  // init jr
  await jr.scores.loadSoundFonts();
  jr.scores.initParts();
  jr.scores.startAll();
  console.log('Soundfonts loaded!');

  // set tempo
  setBpm(120);
  tone.Master.volume.value = 20 * Math.log(0.8);
  tone.Transport.start();

  // states
  const playBtn = document.getElementById('play');
  playBtn.firstChild.textContent = 'stop';
  loading = false;
  chordRenderer.hoveringNotes = false;
  melodyRenderer.hoveringNotes = false;
  bassRenderer.hoveringNotes = false;

  updateMelodies(jr.parts.data);
};

const setButtonEvents = () => {

  // play & stop
  const playBtn = document.getElementById('play');
  playBtn.onclick = () => {
    if (!loading) {
      if (playing) {
        stop();
      } else {
        start();
      }
    }
  };

  // reload
  document.getElementById('reload').onclick = async () => {
    stop();

    dataId = (dataId + 1) % fakeData.length;

    console.log(`[ID]: ${dataId}`);
    jr.scores.initParts(dataId);
    updateMelodies(jr.parts.data);

    start();
  };

  //volume
  document.getElementById('volume').onchange = (e) => {
    jr.sounds.volume = e.target.value * 0.01;
  };

  // bpm
  document.getElementById('bpm').onchange = (e) => {
    setBpm(e.target.value);
  };

};

const draw = () => {
  let p = 0;
  if (jr.parts.chordPart) {
    p = jr.parts.chordPart.progress;
  }
  chordRenderer.draw(p);
  melodyRenderer.draw(p);
  bassRenderer.draw(p);
  requestAnimationFrame(() => { draw(); });
};

StartAudioContext(ctx, '#play', () => {

  const playBtn = document.getElementById('play');
  console.log('AudioContext started!');
  console.log('start loading...');
  playBtn.firstChild.textContent = 'loading';

  copyRight();
  setup();
  setButtonEvents();
  requestAnimationFrame(() => { draw(); });
});
