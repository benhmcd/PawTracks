import './Home.css';
import React, { useRef, useEffect, useState } from 'react';

import * as cocossd from "@tensorflow-models/coco-ssd";

import { AiOutlineHome } from 'react-icons/ai';
import { BiCar } from 'react-icons/bi';
import { IoCameraReverse } from 'react-icons/io5';

function Home() {
    const canvasRef = useRef(null);

    //Clip Prototypes
    const [records, setRecords] = useState([]);

    const videoElement = useRef(null);
    /* Home = Start */
    const homeButtonElement = useRef(null);
    /* Away = Stop */
    const awayButtonElement = useRef(null);

    const shouldRecordRef = useRef(false);
    const recorderRef = useRef(null);
    const recordingRef = useRef(false);

    const lastDetectionsRef = useRef([]);

    const netRef = useRef(null);
    const detectionsRef = useRef(null);

    var cameraSelect = "user";
    
    async function prepare(cameraSelect) {
        //homeButtonElement.current.setAttribute("hidden", true);
        awayButtonElement.current.setAttribute("hidden", true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: { max: 640 },
                    height: { max: 480 },
                    facingMode: cameraSelect
                }
                });
                window.stream = stream;
                videoElement.current.srcObject = stream;

                const net = await cocossd.load();
                netRef.current = net;
                
                setInterval(() => {
                    liveDetections(net);
                }, 16.7);

                //homeButtonElement.current.removeAttribute("hidden");
            } catch (error) {
                console.error(error);
            }
        }
    }
        
    useEffect(() => { prepare(cameraSelect) }, []);

    async function liveDetections() {
        canvasRef.current.width = videoElement.current.srcObject.getVideoTracks()[0].getSettings().width;
        canvasRef.current.height = videoElement.current.srcObject.getVideoTracks()[0].getSettings().height;
        const detections = await netRef.current.detect(videoElement.current);
        detectionsRef.current = detections;
        console.debug(detections);

        // Draw mesh
        const canvas = canvasRef.current.getContext("2d");
        
        // Update drawing utilitiy
        drawRectangle(detections, canvas);
    }

    async function detectFrame() {
        if (!shouldRecordRef.current) {
            stopRecording();
            return;
        }

        let personFound = false;
        personFound = personInRoom(detectionsRef.current);

        if (personFound) {
            console.log("Alert Type: Person");
            startRecording();
            lastDetectionsRef.current.push(true);
        } else if (lastDetectionsRef.current.filter(Boolean).length) {
            startRecording();
            lastDetectionsRef.current.push(false);
        } else {
            stopRecording();
        }

        lastDetectionsRef.current = lastDetectionsRef.current.slice(
            Math.max(lastDetectionsRef.current.length - 10, 0)
        );
        
        requestAnimationFrame(() => {
            detectFrame();
        });
    }

    function petOnBed(detections) {
        var dogBox;
        var bedBox;
        detections.forEach(prediction => {
            if (prediction['class'] == 'dog') {
                dogBox = prediction['bbox']
            }
            if (prediction['class'] == 'bed') {
                bedBox = prediction['bbox']
            }
        })

        if ((!(dogBox == "undefined" || dogBox == null)) && (!(bedBox == "undefined" || bedBox == null))) {
            if (bedBox[0] < dogBox[0] && bedBox[1] < dogBox[1]) {
                if (((dogBox[0] + dogBox[2]) < (bedBox[0] + bedBox[2]))
                    && ((dogBox[1] + dogBox[3]) < (bedBox[1] + bedBox[3]))) {
                    //alert("THE DOG IS ON THE BED!!!!")
                    return true;
                }
            }
        }
        return false;
    };

    function personInRoom(detections) {
        var foundPerson = false;
        detections.forEach(prediction => {
            if (prediction['class'] == 'person') {
                foundPerson = true;
            }
        })
        return foundPerson;
    };

    function startRecording() {
        if (recordingRef.current) {
            return;
        }
        recordingRef.current = true;
        console.log("Clip Start: " + new Date());

        recorderRef.current = new MediaRecorder(window.stream)

        recorderRef.current.ondataavailable = function (e) {
            const title = new Date() + "";
            const href = URL.createObjectURL(e.data);
            console.log("Link to clip: " + href);
            setRecords(previousRecords => {
                return [...previousRecords, { href, title }];
            });
        };

        recorderRef.current.start();
    };

    function stopRecording() {
        if (!recordingRef.current) {
            return;
        }
        recordingRef.current = false;
        recorderRef.current.stop();
        console.log("Clip End: " + new Date());
        lastDetectionsRef.current = [];
    };

    function drawRectangle(detections, canvas) {
        detections.forEach(prediction => {
            var [x, y, width, height] = prediction['bbox'];
            var text = prediction['class'];


            if (text == 'person') {
                text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                var color = '#F7F9FB'
                setStyle(text, x, y, width, height, color, canvas);
            }
            if (prediction['class'] == 'bed') {
                text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                var color = '#31708E'
                setStyle(text, x, y, width, height, color, canvas);
            }
            if (prediction['class'] == 'dog') {
                text = text[0].toUpperCase() + text.slice(1).toLowerCase()
                var color = '#687864'
                setStyle(text, x, y, width, height, color, canvas);
            }
        })
    };

    function setStyle(text, x, y, width, height, color, canvas) {
        // Draw Rectangles and text
        canvas.lineWidth = 5;
        canvas.font = '18px Arial'
        canvas.fillStyle = color
        canvas.strokeStyle = color
        canvas.beginPath()
        canvas.fillText(text, x + 15, y + 30)
        canvas.rect(x, y, width, height)
        canvas.stroke()
    };

    return (
        <>
            <div id="home-container">
                <canvas className='video-prop' id="video-canvas" ref={canvasRef} />
                <video className='video-prop' id="webcam" autoPlay playsInline muted ref={videoElement} />
                <button id='home-btn' onClick={() => {
                    console.log("Session Start: " + new Date());
                    shouldRecordRef.current = true;
                    homeButtonElement.current.setAttribute("hidden", true);
                    awayButtonElement.current.removeAttribute("hidden");
                    detectFrame();
                }} ref={homeButtonElement}><AiOutlineHome /> Home</button>
                <button id='away-btn' onClick={() => {
                    console.log("Session End: " + new Date());
                    shouldRecordRef.current = false;
                    awayButtonElement.current.setAttribute("hidden", true);
                    homeButtonElement.current.removeAttribute("hidden");
                    stopRecording();
                }} ref={awayButtonElement}><BiCar /> Away</button>
                <button id="swap-cam" onClick={() => {
                    if(cameraSelect == "user") {
                    cameraSelect = "environment";
                    }
                    else if(cameraSelect == "environment") {
                        cameraSelect = "user";
                    }
                    prepare(cameraSelect)
                }}><IoCameraReverse /></button>
            </div>
            <div id="Recording">
                <h3>Records: </h3>
                {!records.length
                    ? null
                    : records.map(record => {
                        return (
                            <div key={record.title}>
                                <div>
                                    <h5 className="card-title">{record.title}</h5>
                                    <video controls src={record.href}></video>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    )
}

export default Home