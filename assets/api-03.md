# Jazz RNN Demo 

A flask-based backend for the demo webpage for the JazzRNN. 

## APIs 

### Per-generated samples : 

- __/api/getVarianceMeta__ : get the pre-generate integration results
- Output : a json contain the `MetaData` of the generated samples including `NumChordProgression` and the `Range` for  instruments of  `Melody`, `Bass`, `Drums`, and `Chord`. . 
- API Link : `http://140.113.225.164:5000/api/getDynamicMeta`

- __/api/postVarianceChordProgression__ : get the chord progression
- Input : a json contain `ChordIdx` within `NumChordProgression` from `MetaData`.  
- Output : a json contain a list of note events of the each instruments and the  `Data` for the `BeatResolution` and `Notes` for the note evenets. 
- API Link : `http://140.113.225.164:5000/api/postDynamicChordProgression`

- __/api/postVarianceIntegration__ : get the generated integration results
- Input : a json contains arguments of 
* `ChordIdx`: an integer within `NumChordProgression`
* `NumberOfSample`: the number of samples to be generated. 
* `MelodyNoteDensityPreset`: there are three modes for the note density 
1. 'random' : random select note density from presets. `MelodyNoteDensityValue` is a don't-care argument. 
2. 'constant': appply constant ration on the random-selected preset. 
3. 'array' : useraccept-defined note-density array for the generation. `MelodyNoteDensityValue` should a note density-time pair in a (time_step, 2) array format. the first column is the note density value from 0 to 11(included) and the second column is the bar (bar value can be floating. For example the 5th beat in 4/4 is 1.25) that the note density occur. 
* `MelodyNoteDensityValue` : Explained in `MelodyNoteDensityPreset`. 
* `BassNoteDensityPreset`: Same as `MelodyNoteDensityPreset`. 
* `BassNoteDensityValue` : Same as `MelodyNoteDensityPreset`. 
* `MelodyTemperature`: floating point type. Default to be 1.0. 
* `BassTemperature` : floating point type. Default to be 1.0. 
* `UseDrumFillIn` : a bool type idicator for whether the drum fillin in the end.

An example json arguments can be :
{   
"ChordIdx" : 82,
"NumberOfSample" : 4,

"MelodyNoteDensityPreset" : "constant", 
"MelodyNoteDensityValue": 1.0, 
"MelodyTemperature": 1.0,

"BassNoteDensityPreset": "random", 
"BassNoteDensityValue":1.0, 
"BassTemperature" : 1.0, 

"UseDrumFillIn" : false 
} 
- Output : a json contain a list of note events of the each instruments with `NumberOfSample` length and the  `Data` for the `BeatResolution` and `Notes` for the note evenets for `Melody`, `Bass`, `Drums`, and `Chord`. 
- API Link : `http://140.113.225.164:5000/api/postDynamicIntegration`

## Deployment Tutorial 

Deploy the docker container on the k8s :
```
fab ailabs_deploy
```
k8s commands :
```
kubectl get pod | grep jazzrnn # Get pod ID 
kubectl logs -f <Pod ID># Get log # Check the k8s server status 
kubectl describe svc -n ailabs-public ai-music-jazzrnn-demo # Check the service status 
```

