import React, { useState } from "react";
import { Storage } from "@aws-amplify/storage"

//Call To Play Sounds
export function playAudio()
  {
    const  [downloadUrl, setDownloadUrl] = useState(null);

    // Define a function to handle the download of the file
    const handleDownload = async () => {
        const downloadUrl = await Storage.get('audio.mp3', { level: "private" });
        setDownloadUrl(downloadUrl);
        //console.log(downloadUrl);
        const audio = new Audio(downloadUrl);
        audio.play();
    };
    
    return(
        <div>
            <button onClick={handleDownload}>Play Audio</button>
        </div>
        );
  };
  export default playAudio;