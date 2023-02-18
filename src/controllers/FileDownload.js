import React, { useState } from "react";
import { Storage } from "@aws-amplify/storage";

const FileDownload = () => {
  const [imageData, setImageData] = useState(null);

  const handleDownload = async () => {
    const downloadUrl = await Storage.get("pawtracks.png", { level: "private" });
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    setImageData(URL.createObjectURL(blob));
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Image</button>
      {imageData && <img src={imageData} alt="Paw Tracks" />}
    </div>
  );
};

export default FileDownload;