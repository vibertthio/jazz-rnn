# Jazz RNN Demo 

A flask-based backend for the demo webpage for the JazzRNN. 

## APIs 

### Per-generated samples : 
 - __/api/getStaticMeta__ : get the meta data of the chord progressions and instrument ranges. 

    - Input : a json contain the `MetaData` of the generated samples including `NumChordProgression` and the `Range` for each  instruments. 
    - API Link: `https://developer.ailabs.tw/ai-music-performancernn-demo/api/getStaticMeta`

 - __/api/getStaticChordProgression__ : get the pre-define chord progressions
    - Input : a json contain `ChordIdx` within `NumChordProgression` from `MetaData`.  
    - Output : a json contain a list of note event of the `ChordProgression` and the  `MetaData` for the `BeatResolution`. 
    - API Link : `https://developer.ailabs.tw/ai-music-performancernn-demo/api/getStaticChordProgression`

 - __/api/getStaticIntegration__ : get the pre-generate integration results
    - Input : a json contain `ChordIdx` within `NumChordProgression` from `MetaData`.  
    - Output : a json contain a list of note events of the each instruments and the  `MetaData` for the `BeatResolution`. 
    - API Link : `https://developer.ailabs.tw/ai-music-performancernn-demo/api/getStaticIntegration`

## Deployment Tutorial 

Deploy the docker container on the k8s :
```shell
fab ailabs_deploy
```
k8s commands :
```shell
kubectl get pod | grep jazzrnn # Get pod ID 
kubectl logs -f <Pod ID># Get log # Check the k8s server status 
kubectl describe svc -n ailabs-public ai-music-jazzrnn-demo # Check the service status 
```

