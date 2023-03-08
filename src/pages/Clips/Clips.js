import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Clips.css'
// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Session } from '../../models';
import { Storage } from '@aws-amplify/storage';
import { Card, Divider } from '@aws-amplify/ui-react';

function Clips() {
    const [clip, setClip] = useState([]);
    const [videoData, setVideoData] = useState(null);

    useEffect(() => {
        // an async function to fetch the data and subscribe to changes
        const getDate = async () => {
            // clear the DataStore before observing changes
            await DataStore.clear();
            // observe changes to the PetModel and update the state
            const subscription = DataStore.observeQuery(Session).subscribe(({ items }) => {
                setClip(items)
                console.log(items)
            });
        };
        // call the function to fetch the data
        getDate();
    }, []) //  added ", []" which should make the call go only once

    useEffect(() => {
        const getVideoURL = async (imageKey) => {
            console.log(imageKey)
            if (!imageKey) {
                console.error('Error: imageKey is null');
                return;
            }
            try {
                const url = await Storage.get(imageKey, { level: "private" });
                console.log(url);

                const response = await fetch(url);

                // Retrieve the binary data of the video as a blob object
                const blob = await response.blob();

                setVideoData((prevURLs) => ({
                    ...prevURLs,
                    [imageKey]: URL.createObjectURL(blob),
                }));
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        };
        clip.forEach((item) => getVideoURL(item.clip.Clips[0].fileName));
    }, [clip]);

    return (
        <>
            <h1> All Clips </h1>
            <br />
            <Link to="/clips/1"> Clip 1</Link>
            <div className="cards">
                {clip.map((items) => (
                    <Card className="pet-card">
                        {videoData && videoData[items.clip.Clips[0].fileName] && (
                            <video controls src={videoData[items.clip.Clips[0].fileName]} className="clip-video"/>
                        )}
                    </Card>
                ))}
            </div>
            <br />
        </>
    )
}
export default Clips