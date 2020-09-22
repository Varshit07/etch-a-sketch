const canvas = document.querySelector('canvas');
const MOVE_STEP = 20;
// console.log(canvas);
const ctx = canvas.getContext(`2d`);
// console.log(ctx);
const {width, height} = canvas;
console.log(`${width} ${height}`);

let x = Math.floor((Math.random() * width));
let y = Math.floor((Math.random() * height));
// console.log(`x = ${x}, y = ${y}`);

let hue = 0;
ctx.fillStyle = "#ffffff";
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;


ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = 20;

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

function handleKeyDown(event) {
    // console.log(event.key);
    if(event.key.includes(`Arrow`)) {
        event.preventDefault();
        // console.log(`Arrow key pressed ${event.key}`);
        draw({key: event.key});
    }
}

function draw({key}) {
    // console.log(`In draw key = ${key}`);
    
    ctx.strokeStyle = `hsl(${hue += 10}, 100%, 50%)`;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    if(key === `ArrowUp`) {
        y -= (( x <= width && x >= 0 && y >= 0) ? MOVE_STEP : 0);
    }
    else if(key === `ArrowDown`) {
        y += (( x <= width && x >= 0 && y <= height) ? MOVE_STEP : 0);
    }
    else if(key === `ArrowRight`) {
        x += ((y >= 0 && y <= height && x <= width) ? MOVE_STEP: 0);
    }
    else if(key === `ArrowLeft`) {
        x -= ((y >= 0 && y <= height && x >= 0) ? MOVE_STEP: 0);
    }

    

    ctx.lineTo(x,y);
    ctx.stroke();

    // console.log(`x = ${x}, y = ${y}`);
}


function clearCanvas() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    x = Math.floor((Math.random() * width));
    y = Math.floor((Math.random() * height));
    ctx.strokeStyle = `hsl(0, 100%, 50%)`;
    ctx.moveTo(x,y);
    ctx.lineTo(x,y);
    ctx.stroke();
}

function downloadImage() {
    document.querySelector(`.download`).setAttribute('download', 'My_Etch_A_Sketch.png');
    document.querySelector(`.download`).setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}



window.addEventListener(`keydown`, handleKeyDown);
document.querySelector(`.reset`).addEventListener(`click`, clearCanvas);
document.querySelector(`.download`).addEventListener(`click`, downloadImage);