# Jazz RNN Demo 

A flask-based backend for the demo webpage for the JazzRNN. 

## APIs 

### Per-generated samples : 

 - __/api/getMetaData__ : get the meta data of the chord progressions and instrument ranges. 
    - Output : a json contain the `MetaData` of the generated samples including `NumChordProgression`, `NumDrumsPattern` and the `Range` for each instruments. 
    - API Link: `https://developer.ailabs.tw/ai-music-jazzrnn-demo/api/getMetaData`
 
 - __/api/postChordProgression__ : get the pre-define chord progressions
    - Input : a json contain `ChordIndex` within `NumChordProgression` from `MetaData`.  
    - Output : a json contain a list of note event of the `ChordProgression` and the  `MetaData` for the `BeatResolution`. 
    - API Link : `https://developer.ailabs.tw/ai-music-jazzrnn-demo/api/postChordProgression`
 
 - __/api/postIntegration__ : get the pre-generate integration results
    - Input : a json contain :
      `ChordIndex`: an integer within `NumChordProgression` from `MetaData`.  
      `DrumsIndex`: an integer within `NumDrumsPattern` from `MetaData`. 
      `NumberOfSample`: an integer from 1 to 16. 
      `MelodyNoteDensity`: an floating point within -2 to 2 (included). 0 means the original note density.  
      `BassNoteDensity`: an floating point within -2 to 2 (included). 0 means the original note density.  
      `UseDrumFillin` : a boolen variable for the usage of drum fillins. Typically True is for connecting to the next music phrase. False is for ending the phrase. 
    - Output : a json contain a list of note events of the each instruments and the  `MetaData` for the `BeatResolution`. 
    - API Link : `https://developer.ailabs.tw/ai-music-jazzrnn-demo/api/postIntegration`

 - __/api/getReloadDirectory__ : get the pre-generate integration results 
   - Reload the pre-generated data path. 
   - API Link: `https://developer.ailabs.tw/ai-music-jazzrnn-demo/api/getReloadDirectory`