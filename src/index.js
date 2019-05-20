import StartAudioContext from 'startaudiocontext';
import './index.scss';
import JazzRNN from './jazz-rnn';
import DrumMachine from './drum-machine';
import MelodyLine from './melody-line';
import { copyRight } from './utils';

const jr = new JazzRNN();
const melodyOne = new MelodyLine('canvas-1');
const melodyTwo = new MelodyLine('canvas-2');
const drumMachine = new DrumMachine('canvas-3');
const tone = jr.tone;
const ctx = tone.context;
const { Instruments, DrumInstruments } = jr.constants;
let loading = true;
let playing = true;
let trio = {};
let beatToNotes = {};
let beat = 0;

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

const updateTrio = async (newTrioPromise) => {
  trio = await newTrioPromise;
  const trioNotes = trio.notes;

  beatToNotes = {};
  for (let i = 0; i < trioNotes.length; ++i) {
    const note = trioNotes[i];
    const s = (note.quantizedStartStep) % 64;
    if (!(s in beatToNotes)) {
      beatToNotes[s] = [];
    }
    beatToNotes[s].push(note);
  }

  const melodyOneNotes = trioNotes.filter(n => n.instrument === 0);
  const melodyTwoNotes = trioNotes.filter(n => n.instrument === 1);
  const drumNotes = trioNotes.filter(n => n.isDrum);
  melodyOne.updateMelody(melodyOneNotes);
  melodyTwo.updateMelody(melodyTwoNotes);
  drumMachine.updateNotes(drumNotes);
};

const setup = async () => {
  await jr.scores.loadSoundFonts();
  console.log('Soundfonts loaded!');

  setBpm(120);
  tone.Master.volume.value = 20 * Math.log(0.8);
  tone.Transport.start();

  const playBtn = document.getElementById('play');
  playBtn.firstChild.textContent = 'stop';
  loading = false;
  drumMachine.hoveringNotes = Array(9).fill(false);
  melodyOne.hoveringNotes = false;
  melodyTwo.hoveringNotes = false;
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

    // TODO

    start();
  };


  //volume
  document.getElementById('volume').onchange = (e) => {
    const value = 20 * Math.log(e.target.value * 0.01);
    tone.Master.volume.value = value;
  };

  // bpm
  document.getElementById('bpm').onchange = (e) => {
    setBpm(e.target.value);
  };

};

const draw = () => {
  melodyOne.draw(beat);
  melodyTwo.draw(beat);
  drumMachine.draw(beat);
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
