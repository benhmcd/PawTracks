import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Clips.css'
// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Session } from '../../models';
import { Storage } from '@aws-amplify/storage';
import { Card, Divider, Expander, ExpanderItem, Badge, Theme, ThemeProvider } from '@aws-amplify/ui-react';
import DeleteSession from '../../controllers/DeleteSession';

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
        const getVideoURLs = async (clips) => {
            const urls = {};
            for (const clip of clips) {
                const fileName = clip.fileName;
                try {
                    const url = await Storage.get(fileName, { level: "private" });
                    console.log(url);
                    const response = await fetch(url);
                    const blob = await response.blob();
                    urls[fileName] = URL.createObjectURL(blob);
                } catch (error) {
                    console.error(`Error fetching video URL for ${fileName}:`, error);
                }
            }
            setVideoData((prevURLs) => ({
                ...prevURLs,
                ...urls,
            }));
        };
        clip.forEach((session) => {
            const clips = session.clip.Clips;
            getVideoURLs(clips);
        });
    }, [clip]);

    return (
        <>
            <h1> All Clips </h1>
            <br />
            <div className="cards">
                <Expander type='single' isCollapsible={true}>
                    {clip.map((session) => (
                        <Expander type='multiple' isCollapsible={true} key={session.id}>
                            <ExpanderItem title={`Session ${session.id}: ${session.start} - ${session.end}`} value='session-expander'>
                                {session.clip.Clips.map((clip) => (
                                    <Expander type='multiple' isCollapsible={true} key={clip.fileName}>
                                        <ExpanderItem title={`Clip: ${clip.start} - ${clip.end}`} value='clip-expander'>
                                            <Link to={`/clips/${clip.fileName}`}>
                                                <Card className="pet-card">
                                                    {videoData && videoData[clip.fileName] && (
                                                        <video controls src={videoData[clip.fileName]} className="clip-video" />
                                                    )}
                                                    <Badge className='petOnBedBadge' variation='warning'>Alert Type</Badge>
                                                </Card>
                                            </Link>
                                        </ExpanderItem>
                                    </Expander>
                                ))}
                                <DeleteSession session={session} />
                            </ExpanderItem>
                        </Expander>
                    ))}
                </Expander>
            </div>
            <br />
        </>
    );
}
export default Clips


