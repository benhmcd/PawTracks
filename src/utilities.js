import { setUncaughtExceptionCaptureCallback } from "process";

export const drawRectangle = (detections, canvas) => {
    detections.forEach(prediction=>{
        var [x, y, width, height] = prediction['bbox'];
        var text = prediction['class'];

        if (text == 'person'){
            text = text[0].toUpperCase() + text.slice(1).toLowerCase()
            var color = '#F7F9FB'
            setStyle(text, x, y, width, height, color, canvas);
        }
        if (prediction['class'] == 'bed'){
            text = text[0].toUpperCase() + text.slice(1).toLowerCase()
            var color = '#31708E'
            setStyle(text, x, y, width, height, color, canvas);
        }
        if (prediction['class'] == 'dog'){
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