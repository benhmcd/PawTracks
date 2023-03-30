import React from 'react';
//import './Mini.css';
import localforage from "localforage";

const MicRecorder = require('mic-recorder-to-mp3');
const mp3Recorder = new MicRecorder({bitRate: 128});

function OpenMicSet(props) {
    return(props.trigger) ? (
        <div className="Mic-set-window">
            <div className="Mic-set-content">
                <button className='Close-Mic-set' 
                onClick={() => props.setTrigger(false)}>Exit</button>
                { props.children }
            <button id='Mic-Record-btn' onClick={startRecording}>Start Recording</button>
            <button id='Mic-Stop-btn' onClick={stopRecording} hidden>Stop Recording</button>
            </div>
        </div>
    ) : "";
}

export function startRecording() 
  {
    console.log("click");
    mp3Recorder.start().then(() => {
      
    }).catch((error) => {
      console.error(error);
    });

    document.getElementById("Mic-Record-btn").hidden = true;
    document.getElementById("Mic-Stop-btn").hidden = false;
  }

export function stopRecording()
  {
    mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
      console.log(buffer, blob);
      const file = new File(buffer, 'audio.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });
      
      localforage.setItem("currentFile", file);
    }).catch((error) => {
      console.error(error);
    });

    document.getElementById("Mic-Stop-btn").hidden = true;
    document.getElementById("Mic-Record-btn").hidden = false;
  }

export default OpenMicSet;