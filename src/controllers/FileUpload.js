import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { Storage } from "@aws-amplify/storage"

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const { id } = useParams();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(id);
    };

    const handleUpload = async () => {
        await Storage.put(`${id}.png`, file, {
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