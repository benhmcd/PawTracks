import './Test.css';
import React, { useRef, useEffect, useState } from 'react';

import * as cocossd from "@tensorflow-models/coco-ssd";
import { loadGraphModel } from '@tensorflow/tfjs';
import { Menu, MenuButton, MenuItem, View } from '@aws-amplify/ui-react';
import { AiOutlineDownCircle } from 'react-icons/ai';

function Test() {
    const canvasRef = useRef(null);
    const [records, setRecords] = useState([]);
    const videoElement = useRef(null);
    var width = useRef(null);
    var height = useRef(null);
    const lastDetectionsRef = useRef([]);
    const netRef = useRef(null);
    const detectionsRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState([]);
    const inputRef = useRef(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        let videoElement = document.getElementById('video');
        try {
            document.getElementById('video').addEventListener('loadedmetadata', function (e) {
                width = videoElement.videoWidth;
                height = videoElement.videoHeight;
            })
        } catch (error) {
            console.error(error);
        }

        const url = URL.createObjectURL(file);
        setVideoSrc(url);
    };

    async function prepare_video() {
        try {
            const net = await cocossd.load();
            netRef.current = net;
            setInterval(() => {
                liveDetections(net);
            },);
        } catch (error) {
            console.error(error);
        }
    }

    async function liveDetections() {
        // Sets the detection canvas properties to that of the videoElements
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        // Detects objects in our videoElement using our model
        const detections = await netRef.current.detect(document.getElementById('video')); //Should have minScore
        /*let filteredDetections = detections.filter(prediction => {
            return categories.includes(prediction.class);
        });
        detectionsRef.current = filteredDetections;*/
        detectionsRef.current = detections;
        console.debug(detections);

        // Draws the canvas
        const canvas = canvasRef.current.getContext("2d");

        // Calls the bbox drawing function, passing in our detections and canvas obj
        drawBbox(detections, canvas);
    }

    function drawBbox(detections, canvas) {
        detections.forEach(prediction => {
            var [x, y, width, height] = prediction['bbox'];
            var text = prediction['class'];
            var confidence = parseFloat(prediction['score'].toFixed(2));

            // Which objects to detect
            
                if (text === 'person') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#F7F9FB';
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] === 'bed') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#31708E'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] === 'couch') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#31708E'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] === 'chair') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#31708E'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] === 'dog') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#687864'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] === 'cat') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#687864'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] === 'bird') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#687864'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
            })
    };

    function setStyle(text, x, y, width, height, color, canvas, confidence) {
        // Draw Rectangles and text
        canvas.lineWidth = 10;
        canvas.font = '30px Arial'
        canvas.fillStyle = color
        canvas.strokeStyle = color
        canvas.beginPath()
        canvas.fillText(text + " " + confidence, x + 15, y + 30)
        canvas.rect(x, y, width, height)
        canvas.stroke()
    };

    return (
        <>
            <h1>Test Video Page: </h1>
            <div id="test-container">
                <Menu menuAlign="start"
                    trigger={
                        <MenuButton variation="primary" size="small">
                            Select A Testing Video <AiOutlineDownCircle id="dropdownArrow"></AiOutlineDownCircle>
                        </MenuButton>
                    }
                >
                    <MenuItem onClick={() => {
                        console.log('Test Video 1: Person');
                        setVideoSrc("/test-videos/temp-person.mp4");
                        let videoElement = document.getElementById('video');
                        try {
                            videoElement.addEventListener('loadedmetadata', function (e) {
                                width = videoElement.videoWidth;
                                height = videoElement.videoHeight;
                            })
                        } catch (error) {
                            console.error(error);
                        }
                        prepare_video();
                    }}>
                    Video One: Person
                    </MenuItem>
                    <MenuItem onClick={() => {
                        console.log('Dog On Bed');
                        setVideoSrc("/test-videos/koda-test-video.webm");
                        let videoElement = document.getElementById('video');
                        try {
                            videoElement.addEventListener('loadedmetadata', function (e) {
                                width = videoElement.videoWidth;
                                height = videoElement.videoHeight;
                            })
                        } catch (error) {
                            console.error(error);
                        }
                        prepare_video();
                    }}>
                    Video Two: Dog On Bed
                    </MenuItem>
                    <MenuItem onClick={() => {
                        console.log('Cat On Chair');
                        setVideoSrc("/test-videos/cat-on-chair.mp4");
                        let videoElement = document.getElementById('video');
                        try {
                            videoElement.addEventListener('loadedmetadata', function (e) {
                                width = videoElement.videoWidth;
                                height = videoElement.videoHeight;
                            })
                        } catch (error) {
                            console.error(error);
                        }
                        prepare_video();
                    }}>
                    Video Three: Cat On Chair
                    </MenuItem>
                </Menu>
                {/*<input ref={inputRef} className="videoInput_input" type="file" onInput={handleFileChange} accept=".mov,.mp4" />*/}
                <div id="videoContainer">
                    <canvas className="video=prop" id="video-canvas" ref={canvasRef} />
                    <video id="video" autoPlay loop muted src={videoSrc}></video>
                </div>
            </div>
        </>
    )
}

export default Test