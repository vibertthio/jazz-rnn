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
let dataId = 4;
let density = 1;
let temperature = 1;
let numChordProgression = 0;
let single = true;
let progressionLength = 3;
let progressionCount = 0;

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
  const { Bass, Chord, Drums, Melody } = data.Data[0];
  chordRenderer.updateMelody(Chord.Notes);
  melodyRenderer.updateMelody(Melody.Notes);
  bassRenderer.updateMelody(Bass.Notes);
};

const setup = async () => {
  // get meta
  const meta = await jr.server.postVarianceMeta();
  console.log('MetaData loaded!');
  // console.log(`amount: ${meta.MetaData.NumChordProgression}`);
  numChordProgression = meta.MetaData.NumChordProgression;

  // init jr
  await jr.scores.loadSoundFonts();
  await jr.scores.initVarianceParts(dataId);
  // await jr.scores.initVarianceProgression(dataId);
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
  document.getElementById('play').onclick = () => {
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
    if (!loading) {
      stop();

      loading = true;
      single = true;
      chordRenderer.hoveringNotes = true;
      melodyRenderer.hoveringNotes = true;
      bassRenderer.hoveringNotes = true;

      const playBtn = document.getElementById('play');
      playBtn.firstChild.textContent = 'loading';

      const longBtn = document.getElementById('long');
      longBtn.firstChild.textContent = 'long';

      // random
      dataId = Math.floor(Math.random() * numChordProgression);
      await jr.scores.initVarianceParts(dataId, temperature, density);

      updateMelodies(jr.parts.data);

      loading = false;
      chordRenderer.hoveringNotes = false;
      melodyRenderer.hoveringNotes = false;
      bassRenderer.hoveringNotes = false;

      start();
    }
  };

  // long
  document.getElementById('long').onclick = async () => {
    if (!loading) {
      if (single) {
        if (playing) {
          jr.scores.stopAll();
        }
        single = false;

        loading = true;
        chordRenderer.hoveringNotes = true;
        melodyRenderer.hoveringNotes = true;
        bassRenderer.hoveringNotes = true;

        const playBtn = document.getElementById('play');
        playBtn.firstChild.textContent = 'loading';

        const longBtn = document.getElementById('long');
        longBtn.firstChild.textContent = '1/3';


        await jr.scores.initVarianceProgression(dataId, temperature, density);

        updateMelodies(jr.parts.data);

        loading = false;
        chordRenderer.hoveringNotes = false;
        melodyRenderer.hoveringNotes = false;
        bassRenderer.hoveringNotes = false;

        start();
      }
    }
  };

  //volume
  document.getElementById('volume').onchange = (e) => {
    jr.sounds.changeMasterVolume(e.target.value);
  };

  // bpm
  document.getElementById('bpm').onchange = (e) => {
    setBpm(e.target.value);
  };

  // sliders
  document.getElementById('s1').onchange = (e) => {
    const v = e.target.value * 0.01;
    jr.sounds.sendReverbGain.gain.value = v;
  };

  document.getElementById('s2').onchange = (e) => {
    const v = e.target.value * 0.01;
    jr.sounds.sendReverb.roomSize.value = v;
  };

  document.getElementById('s3').onchange = async (e) => {
    if (!loading) {
      density = e.target.value * 0.01;
      stop();

      loading = true;
      chordRenderer.hoveringNotes = true;
      melodyRenderer.hoveringNotes = true;
      bassRenderer.hoveringNotes = true;

      const playBtn = document.getElementById('play');
      playBtn.firstChild.textContent = 'loading';

      await jr.scores.initVarianceParts(dataId, temperature, density);

      updateMelodies(jr.parts.data);

      loading = false;
      chordRenderer.hoveringNotes = false;
      melodyRenderer.hoveringNotes = false;
      bassRenderer.hoveringNotes = false;

      start();
    }
  };

  document.getElementById('s4').onchange = async (e) => {
    if (!loading) {
      temperature = e.target.value * 0.01;
      stop();

      loading = true;
      chordRenderer.hoveringNotes = true;
      melodyRenderer.hoveringNotes = true;
      bassRenderer.hoveringNotes = true;

      const playBtn = document.getElementById('play');
      playBtn.firstChild.textContent = 'loading';

      await jr.scores.initVarianceParts(dataId, temperature, density);

      updateMelodies(jr.parts.data);

      loading = false;
      chordRenderer.hoveringNotes = false;
      melodyRenderer.hoveringNotes = false;
      bassRenderer.hoveringNotes = false;

      start();
    }
  };

  document.getElementById('s5').onchange = async (e) => {
    // piano gain
    const v = e.target.value * 0.01;
    jr.sounds.melodyGain.gain.value = v;
  };

  document.getElementById('s6').onchange = async (e) => {
    // chords gain
    const v = e.target.value * 0.01;
    jr.sounds.chordsGain.gain.value = v;
  };


};

const updateProgress = () => {
  let p = 0;

  if (jr.parts.chordsPart && !loading) {
    if (single) {
      p = jr.parts.chordsPart.progress;
    } else {
      p = jr.parts.chordsPart.progress * progressionLength;
      const pFloor = Math.floor(p);
      if (progressionCount != pFloor) {
        console.log(`progress: ${pFloor + 1}/${progressionLength}`);
        progressionCount = pFloor;
        document.getElementById('long').firstChild.textContent = `${progressionCount + 1}/3`;
        updateMelodies(jr.parts.datas[progressionCount]);
      }
      p = p - pFloor;
    }
  }
  return p;
};

const draw = () => {
  const p = updateProgress();
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
