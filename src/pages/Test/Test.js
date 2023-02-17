import './Test.css';
import React, { useRef, useEffect, useState } from 'react';

import * as cocossd from "@tensorflow-models/coco-ssd";

function Test() {
    const canvasRef = useRef(null);
    const videoElement = document.getElementById('vid');
    const [records, setRecords] = useState([]);

    const lastDetectionsRef = useRef([]);
    const netRef = useRef(null);
    const detectionsRef = useRef(null);

    const [videoSrc, setVideoSrc] = useState([]);

    const inputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("File: " + file);
        const url = URL.createObjectURL(file);
        setVideoSrc(url);
        
        prepare_video();
    };

    async function prepare_video() {
        try{
            const net = await cocossd.load();
            netRef.current = net;
            setInterval(() => {
                liveDetections(net);
            }, 16.7);
        } catch(error) {
            console.error(error);
        }
    }

    async function liveDetections() {
        // Sets the detection canvas properties to that of the videoElement
        
        canvasRef.current.width = videoElement.width;
        canvasRef.current.height = videoElement.height;

        // Detects objects in our videoElement using our model
        const detections = await netRef.current.detect(videoSrc);
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
            if (confidence > 0.4) {
                if (text == 'person') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#F7F9FB'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] == 'bed') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#31708E'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
                if (prediction['class'] == 'dog') {
                    text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                    var color = '#687864'
                    setStyle(text, x, y, width, height, color, canvas, confidence);
                }
            }
        })
    };

    function setStyle(text, x, y, width, height, color, canvas, confidence) {
        // Draw Rectangles and text
        canvas.lineWidth = 5;
        canvas.font = '18px Arial'
        canvas.fillStyle = color
        canvas.strokeStyle = color
        canvas.beginPath()
        canvas.fillText(text + " " + confidence, x + 15, y + 30)
        canvas.rect(x, y, width, height)
        canvas.stroke()
    };

    return (
        <>
            <div id="test-container">
                <h1>Test Video Page: </h1>
                <div className='videoInput'>
                    <input ref={inputRef} className="videoInput_input" type="file" onInput={handleFileChange} accept=".mov,.mp4"/>
                    {/*<button onClick={handleChoose}>Choose</button>*/}
                    {/*<video className='video-prop' id="video" autoPlay playsInline muted src={videoSrc} />*/}
                    <canvas className="video=prop" id="video-canvas" ref={canvasRef} />
                    <video id="vid" width="640" height="480" controls autoPlay loop muted src={videoSrc}></video>
                    <div className="videoFooter">{videoSrc || "Nothing Selected"}</div>
                </div>
            </div>
        </>
    )
}

export default Test