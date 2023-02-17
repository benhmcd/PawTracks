import React, { useState } from "react";
import { Storage } from "@aws-amplify/storage"

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        await Storage.put("pawtracks.png", file, {
            level: "private",
            contentType: file.type,
        });
        console.log("File uploaded successfully");
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
        </div>
    );
};
export default FileUpload;