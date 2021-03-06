import Tone, { Master, Part, AudioNode } from "tone";
import fakeData from "./fake-data";
import Soundfont from "soundfont-player";

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
    // const ServerURL = 'https://developer.ailabs.tw/ai-music-jazzrnn-demo/api/';
    // const ServerURL = 'http://140.113.225.164:5000/api/';
    // const ServerURL = "http://140.109.16.227:9487/api/";
    const ServerURL = "http://musicai.citi.sinica.edu.tw/jazzrnn/api/";

    const APIS = {
      META: "getStaticMeta",
      CHRD: "getStaticChordProgression",
      ALL: "getStaticIntegration",
      V_META: "getMetaData",
      V_CHRD: "postVarianceChordProgression",
      V_ALL: "postIntegration"
    };

    const Instruments = {
      CHRD: 0,
      MLDY: 1,
      BASS: 2,
      DRUM: 3
    };

    const ToneInstruments = [
      Instruments.CHRD,
      Instruments.MLDY,
      Instruments.BASS
    ];
    const DrumInstruments = [Instruments.DRUM];

    const AllInstruments = [
      Instruments.CHRD,
      Instruments.MLDY,
      Instruments.BASS,
      Instruments.DRUM
    ];

    this.constants = {
      ServerURL,
      APIS,
      Instruments,
      ToneInstruments,
      DrumInstruments,
      AllInstruments
    };
  }

  initServerConnection() {
    const getStaticMeta = async () => {
      const url = this.constants.ServerURL + this.constants.APIS.META;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      return data;
    };
    const getStaticIntegration = async (id = 0) => {
      const url = this.constants.ServerURL + this.constants.APIS.ALL;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ChordIdx: id
        })
      });
      const data = await response.json();
      return data;
    };

    const postVarianceMeta = async () => {
      const url = this.constants.ServerURL + this.constants.APIS.V_META;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        }
      });
      const data = await response.json();
      return data;
    };

    const postVarianceChordProgression = async (id = 0) => {
      const url = this.constants.ServerURL + this.constants.APIS.V_CHRD;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ChordIdx: id
        })
      });
      const data = await response.json();
      return data;
    };

    const postVarianceIntegration = async (id = 0, temp = 1, density = 1) => {
      const url = this.constants.ServerURL + this.constants.APIS.V_ALL;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          ChordIndex: id,
          DrumsIndex: 0,
          NumberOfSample: 10,
          MelodyNoteDensity: density,
          BassNoteDensity: density,
          UseDrumFillin: false
        })
      });
      const data = await response.json();
      return data;
    };

    this.server = {
      getStaticMeta,
      getStaticIntegration,
      postVarianceMeta,
      postVarianceChordProgression,
      postVarianceIntegration
    };
  }

  initSounds() {
    this.tone = Tone;
    const ac = Tone.context;

    const dataToNotes = (data, beatResolution = 220, octave = 0, shift = 0) => {
      const bpm = 120;
      return data.map(n => {
        const { end, pitch, start, velocity } = n;
        const time =
          (start + beatResolution * 4 * 8 * shift) *
          (60 / bpm / beatResolution);
        const duration = (end - start) * (60 / bpm / beatResolution);
        const note = Tone.Frequency(pitch + octave * 12, "midi").toNote();
        const vel = velocity / 128;
        return {
          time,
          note,
          duration,
          vel
        };
      });
    };

    const initParts = async (id = 0) => {
      // const data = fakeData[id];
      const data = await this.server.getStaticIntegration(id);
      console.log(`[ id: ${id} ] loaded!`);
      // console.log(data);
      const bassNotes = dataToNotes(data.ProgressionsData.Bass, 220, -1);
      const bassPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.bassSound.play(note, time, { gain: vel, duration });
      }, bassNotes);
      bassPart.loop = true;
      bassPart.loopEnd = 16;

      const melodyNotes = dataToNotes(data.ProgressionsData.Melody, 220);
      const melodyPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.melodySound.play(note, time, { gain: vel, duration });
      }, melodyNotes);
      melodyPart.loop = true;
      melodyPart.loopEnd = 16;

      const chordsNotes = dataToNotes(data.ProgressionsData.Chord, 220);
      const chordsPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.chordsSound.play(note, time, { gain: vel, duration });
      }, chordsNotes);
      chordsPart.loop = true;
      chordsPart.loopEnd = 16;

      this.parts = {
        data,
        bassPart,
        chordsPart,
        melodyPart
      };
    };

    const initVarianceParts = async (
      id = 0,
      temp = 1,
      dense = 1,
      melodyId = 0
    ) => {
      console.log("Data start loading...");
      const response = await this.server.postVarianceIntegration(
        id,
        temp,
        dense
      );
      console.log(
        `Data loaded: single [ id: ${id}, melodyId: ${melodyId}, dense: ${dense}, temp: ${temp} ]`
      );

      console.log(response);
      const data = response.Data[melodyId];
      const bassNotes = dataToNotes(
        data.Bass.Notes,
        data.Bass.BeatResolutions,
        -1
      );
      const bassPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.bassSound.play(note, time, { gain: vel, duration });
      }, bassNotes);
      bassPart.loop = true;
      bassPart.loopEnd = 16;

      const melodyNotes = dataToNotes(
        data.Melody.Notes,
        data.Melody.BeatResolutions
      );
      const melodyPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.melodySound.play(note, time, { gain: vel, duration });
      }, melodyNotes);
      melodyPart.loop = true;
      melodyPart.loopEnd = 16;

      const chordsNotes = dataToNotes(
        data.Chord.Notes,
        data.Chord.BeatResolutions
      );
      const chordsPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.chordsSound.play(note, time, { gain: vel, duration });
      }, chordsNotes);
      chordsPart.loop = true;
      chordsPart.loopEnd = 16;

      this.parts = {
        response,
        data,
        bassPart,
        chordsPart,
        melodyPart
      };
    };

    const changeMelodyId = (melodyId = 0) => {
      const response = this.parts.response;
      const data = response.Data[melodyId];
      const bassNotes = dataToNotes(
        data.Bass.Notes,
        data.Bass.BeatResolutions,
        -1
      );
      const bassPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.bassSound.play(note, time, { gain: vel, duration });
      }, bassNotes);
      bassPart.loop = true;
      bassPart.loopEnd = 16;

      const melodyNotes = dataToNotes(
        data.Melody.Notes,
        data.Melody.BeatResolutions
      );
      const melodyPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.melodySound.play(note, time, { gain: vel, duration });
      }, melodyNotes);
      melodyPart.loop = true;
      melodyPart.loopEnd = 16;

      const chordsNotes = dataToNotes(
        data.Chord.Notes,
        data.Chord.BeatResolutions
      );
      const chordsPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.chordsSound.play(note, time, { gain: vel, duration });
      }, chordsNotes);
      chordsPart.loop = true;
      chordsPart.loopEnd = 16;

      this.parts = {
        response,
        data,
        bassPart,
        chordsPart,
        melodyPart
      };
    };

    const initVarianceProgression = async (
      id = 0,
      temp = 1,
      dense = 1,
      progressionLength = 3
    ) => {
      // TODO: adjustable length

      const data = await this.server.postVarianceIntegration(id, temp, dense);
      console.log(
        `Data loaded: progression (1/3) [ id: ${id}, dense: ${dense}, temp: ${temp} ]`
      );
      const data2 = await this.server.postVarianceIntegration(
        id,
        temp,
        dense + 0.75
      );
      console.log(
        `Data loaded: progression (2/3) [ id: ${id}, dense: ${dense +
          0.75}, temp: ${temp} ]`
      );
      const data3 = await this.server.postVarianceIntegration(
        id,
        temp,
        dense - 0.25
      );
      console.log(
        `Data loaded: progression (3/3) [ id: ${id}, dense: ${dense -
          0.25}, temp: ${temp} ]`
      );
      // console.log(data);
      const bassNotes = dataToNotes(
        data.Data[0].Bass.Notes,
        data.Data[0].Bass.BeatResolutions,
        -1
      )
        .concat(
          dataToNotes(
            data2.Data[0].Bass.Notes,
            data.Data[0].Bass.BeatResolutions,
            -1,
            1
          )
        )
        .concat(
          dataToNotes(
            data3.Data[0].Bass.Notes,
            data.Data[0].Bass.BeatResolutions,
            -1,
            2
          )
        );
      const bassPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.bassSound.play(note, time, { gain: vel, duration });
      }, bassNotes);
      bassPart.loop = true;
      bassPart.loopEnd = 48;

      const melodyNotes = dataToNotes(
        data.Data[0].Melody.Notes,
        data.Data[0].Melody.BeatResolutions
      )
        .concat(
          dataToNotes(
            data2.Data[0].Melody.Notes,
            data.Data[0].Melody.BeatResolutions,
            0,
            1
          )
        )
        .concat(
          dataToNotes(
            data3.Data[0].Melody.Notes,
            data.Data[0].Melody.BeatResolutions,
            0,
            2
          )
        );
      const melodyPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.melodySound.play(note, time, { gain: vel, duration });
      }, melodyNotes);
      melodyPart.loop = true;
      melodyPart.loopEnd = 48;

      const chordsNotes = dataToNotes(
        data.Data[0].Chord.Notes,
        data.Data[0].Chord.BeatResolutions
      )
        .concat(
          dataToNotes(
            data2.Data[0].Chord.Notes,
            data.Data[0].Chord.BeatResolutions,
            0,
            1
          )
        )
        .concat(
          dataToNotes(
            data3.Data[0].Chord.Notes,
            data.Data[0].Chord.BeatResolutions,
            0,
            2
          )
        );
      const chordsPart = new Part((time, values) => {
        const { note, duration, vel } = values;
        this.sounds.chordsSound.play(note, time, { gain: vel, duration });
      }, chordsNotes);
      chordsPart.loop = true;
      chordsPart.loopEnd = 48;

      this.parts = {
        data,
        datas: [data, data2, data3],
        bassPart,
        chordsPart,
        melodyPart
      };
    };

    const stopAll = () => {
      this.parts.chordsPart.stop();
      this.parts.melodyPart.stop();
      this.parts.bassPart.stop();

      this.sounds.chordsSound.stop();
      this.sounds.melodySound.stop();
      this.sounds.bassSound.stop();
    };

    const startAll = () => {
      this.parts.bassPart.start();
      this.parts.melodyPart.start();
      this.parts.chordsPart.start();
    };

    const loadSoundFonts = async () => {
      const sendReverbGain = new Tone.Gain(0.3);
      const sendReverb = new Tone.Freeverb(0.7, 1000); // Tone.JCReverb();

      const melodyEQ = new Tone.EQ3(0, -5, 0);
      const melodyGain = new Tone.Gain(0.6);
      const melodySound = await Soundfont.instrument(
        ac,
        "acoustic_grand_piano",
        {
          soundfont: "MusyngKite",
          destination: melodyEQ,
          adsr: [0.02, 0.3, 0.9, 1.5]
        }
      );

      melodyEQ.chain(melodyGain, sendReverb, sendReverbGain, Master);
      melodyEQ.chain(melodyGain, Master);
      console.log("Melody sounds loaded!");

      const chordsEQ = new Tone.EQ3(-10, -2, -5);
      const chordsGain = new Tone.Gain(1.0);
      const chordsSound = await Soundfont.instrument(ac, "electric_piano_1", {
        soundfont: "MusyngKite",
        destination: chordsEQ
      });

      chordsEQ.chain(chordsGain, sendReverb, sendReverbGain, Master);
      chordsEQ.chain(chordsGain, Master);
      console.log("Chords sounds loaded!");

      const bassEQ = new Tone.EQ3(0, 0, 0);
      const bassGain = new Tone.Gain(0.4);
      const bassSound = await Soundfont.instrument(ac, "acoustic_bass", {
        soundfont: "MusyngKite",
        destination: bassEQ
      });

      bassEQ.chain(bassGain, Master);
      console.log("Bass sounds loaded!");

      const changeMasterVolume = v => {
        this.sounds.volume = v * 0.01;
        const dB = 20 * Math.log(v * 0.01);
        Master.volume.value = dB;
      };

      this.sounds = {
        volume: 1.0,
        sendReverb,
        sendReverbGain,
        changeMasterVolume,
        melodySound,
        melodyGain,
        chordsSound,
        chordsGain,
        bassSound,
        bassGain
      };

      // initParts();
      // startAll();
    };

    const changeScores = (id = 0) => {
      // todo
    };

    this.scores = {
      initParts,
      initVarianceParts,
      initVarianceProgression,
      changeMelodyId,
      loadSoundFonts,
      stopAll,
      startAll,
      changeScores
    };
  }
}
