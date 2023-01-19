import { setUncaughtExceptionCaptureCallback } from "process";

export const drawRect = (detections, canvas) => {
    detections.forEach(prediction=>{
        var [x, y, width, height] = prediction['bbox'];
        var text = prediction['class'];

        // Set styling
        var color = '';
        if (text == 'person'){
            color = 'pink'
        }
        if (text == 'bed'){
            color = 'yellow'
        } 
        if (text == 'dog'){
            color = 'purple'
        }

        var properCaseText = text[0].toUpperCase() + text.slice(1).toLowerCase();
        canvas.lineWidth = 5;
        canvas.strokeStyle = color
        canvas.font = '18px Arial'
        canvas.fillStyle = color

        // Draw Rectangles and text
        canvas.beginPath()
        canvas.fillText(properCaseText, x, y)
        canvas.rect(x, y, width, height)
        canvas.stroke()
    })
}