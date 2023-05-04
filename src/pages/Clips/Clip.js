import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Storage } from 'aws-amplify';

function Clip() {
    const { id } = useParams();
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        async function fetchVideoUrl() {
            const url = await Storage.get(id, { level: 'private' });
            setVideoUrl(url);
        }
        fetchVideoUrl();
    }, [id]);

    if (!videoUrl) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>Single Clip Page: {id}</h1>
            <div>
                <video controls src={videoUrl}></video>
            </div>
        </>
    )
}

export default Clip