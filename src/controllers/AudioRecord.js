import OpenMicSet from '../pages/Audio/Audio.js'
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Storage } from "@aws-amplify/storage"

const AudioRecord = () => {

    /*
    const handleUpload = async () => {
        // Use Amplify Storage to upload the file with the given ID as filename
        await Storage.put(`${id}.mp3`, file, {
            level: "private",
            contentType: file.type,
        });
        console.log("File uploaded successfully");
    };
    */

    return (
        <div>
            <button onClick={() => setButtonMic(true)}>Set Audio</button>
      <OpenMicSet trigger={buttonMic} setTrigger={setButtonMic}>
            <h3>Edit Audio</h3>
          </OpenMicSet>
        </div>
    );
};
export default AudioRecord;