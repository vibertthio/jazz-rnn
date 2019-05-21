import Tone, { Transport, Part } from 'tone';
import fakeData from './fake-data';
import Soundfont from 'soundfont-player';


export default class NeuralDAW {
  constructor() {
    this.constants = {};
    this.server = {};
    this.tone = {};
    this.scores = {};
    this.sounds = {};
    this.parts = {};

    this.initConstants();
    this.initServerConnection();
    this.initSounds();
  }

  initConstants() {
    const ServerURL = 'https://developer.ailabs.tw/ai-music-performancernn-demo/api/';

    const APIS = {
      META: 'getStaticMeta',
      CHRD: 'getStaticChordProgression',
      ALL: 'getStaticIntegration',
    };

    const Instruments = {
      CHRD: 0,
      MLDY: 1,
      BASS: 2,
      DRUM: 3,
    };

    const ToneInstruments = [
      Instruments.CHRD,
      Instruments.MLDY,
      Instruments.BASS,
    ];
    const DrumInstruments = [
      Instruments.DRUM,
    ];

    const AllInstruments = [
      Instruments.CHRD,
      Instruments.MLDY,
      Instruments.BASS,
      Instruments.DRUM,
    ];

    this.constants = {
      ServerURL,
      APIS,
      Instruments,
      ToneInstruments,
      DrumInstruments,
      AllInstruments,
    };
  }

  initServerConnection() {

    const getStaticMeta = async () => {
      const url = this.constants.ServerURL + this.constants.APIS.META;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    };
    const getStaticIntegration = async (id = 0) => {
      const url = this.constants.ServerURL + this.constants.APIS.ALL;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          ChordIdx: id,
        }),
      });
      const data = await response.json();
      return data;
    };

    this.server = {
      getStaticMeta,
      getStaticIntegration,
    };
  }

  initSounds() {

    this.tone = Tone;
    const ac = Tone.context;

    const dataToNotes = (data) => {
      const bpm = 120;
      return data.map(n => {
        const { end, pitch, start, velocity } = n;
        const time = start * ((60 / bpm) / 220);
        const duration = (end - start) * ((60 / bpm) / 220);
        const note = Tone.Frequency(pitch, 'midi').toNote();
        const vel = velocity / 128;
        return {
          time,
          note,
          duration,
          vel,
        };
      });
    };

    const initParts = async (id = 0) => {
      // const data = fakeData[id];
      const data = await this.server.getStaticIntegration(id);
      console.log(`data [${id}] loaded!`);
      const bassNotes = dataToNotes(data.ProgressionsData.Bass);
      const bassPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.bassSound.play(note, time, { gain: vel * this.sounds.volume, duration });
      }, bassNotes);
      bassPart.loop = true;
      bassPart.loopEnd = 16;

      const melodyNotes = dataToNotes(data.ProgressionsData.Melody);
      const melodyPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.pianoSound.play(note, time, { gain: vel * this.sounds.volume, duration });
      }, melodyNotes);
      melodyPart.loop = true;
      melodyPart.loopEnd = 16;

      const chordNotes = dataToNotes(data.ProgressionsData.Chord);
      const chordPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.pianoSound.play(note, time, { gain: vel * this.sounds.volume, duration });
      }, chordNotes);
      chordPart.loop = true;
      chordPart.loopEnd = 16;

      this.parts = {
        data,
        bassPart,
        chordPart,
        melodyPart,
      };
    };

    const stopAll = () => {
      // todo
      this.parts.bassPart.stop();
      this.parts.melodyPart.stop();
      this.parts.chordPart.stop();
    };

    const startAll = () => {
      // todo
      this.parts.bassPart.start();
      this.parts.melodyPart.start();
      this.parts.chordPart.start();
    };

    const loadSoundFonts = async () => {
      const pianoSound = await Soundfont.instrument(ac, 'acoustic_grand_piano', { soundfont: 'MusyngKite' });
      console.log('Piano sounds loaded!');

      const bassSound = await Soundfont.instrument(ac, 'acoustic_bass', { soundfont: 'MusyngKite' });
      console.log('Bass sounds loaded!');

      this.sounds = {
        volume: 0.8,
        pianoSound,
        bassSound,
      };

      // initParts();
      // startAll();
    };

    const changeScores = (id = 0) => {
      // todo
    };

    this.scores = {
      initParts,
      loadSoundFonts,
      stopAll,
      startAll,
      changeScores,
    };
  }

}
