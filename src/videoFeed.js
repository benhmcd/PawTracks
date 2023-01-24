import React, { useRef, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { setUncaughtExceptionCaptureCallback } from "process";
import * as tf from "@tensorflow/tfjs";

// Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

// Import Amplify Package's and Auth
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { LoginList } from './models';

Amplify.configure(awsconfig);
Amplify.configure(awsExports);

const webcamRef = useRef(null);
    const canvasRef = useRef(null);

export const runCoco = async (user) => {
    // Load network 
    const net = await cocossd.load();

    // Save login to database TODO:Remove, this is a poc of impimentation
    await DataStore.save(
        new LoginList({
            "UID": user.username
        })
    );

    // get login list TODO:Remove, this is a poc of impimentation
    const models = await DataStore.query(LoginList);
    console.log(models.length)

    //  Loop and detect
    setInterval(() => {
        detect(net);
    }, 16.7);
}

export const detect = async (net) => {
    

    // Check data is available
    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;
        //alert(videoWidth + " x " + videoHeight);

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        // Set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Make Detections
        const obj = await net.detect(video);
        console.debug(obj);

        // Draw mesh
        const canvas = canvasRef.current.getContext("2d");

        // Update drawing utility
        drawRectangle(obj, canvas);
    }
};

export const drawRectangle = (detections, canvas) => {
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
        }
    })
}
export const videoFeed = (user, signOut) => {
    return (
        <div className="App">
            <h1>
                <img src='/pawTracksLogo192.png' alt='logo' height='32px' width='32px' />
                Paw Tracks: Hello {user.username} v2
            </h1>
            <button onClick={signOut}>Sign out</button>
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    muted={true}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 8,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
}
