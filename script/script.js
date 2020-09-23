const canvas = document.querySelector('canvas');
const MOVE_STEP = 20;

const ctx = canvas.getContext(`2d`);

const {width, height} = canvas;
console.log(`${width} ${height}`);

let x = Math.floor((Math.random() * width));
let y = Math.floor((Math.random() * height));


let hue = 0;
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;


ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = 20;

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

function handleKeyDown(event) {
    
    if(event.key.includes(`Arrow`)) {
        event.preventDefault();

        draw({key: event.key});
    }
}

function draw({key}) {

    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = `hsl(${hue += 10}, 100%, 50%)`;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    if(key === `ArrowUp`) {
        y -= ((y - MOVE_STEP >= 0) ? MOVE_STEP : 0);
    }
    else if(key === `ArrowDown`) {
        y += ((y + MOVE_STEP <= height) ? MOVE_STEP : 0);
    }
    else if(key === `ArrowRight`) {
        x += ((x + MOVE_STEP <= width) ? MOVE_STEP: 0);
    }
    else if(key === `ArrowLeft`) {
        x -= ((x - MOVE_STEP >= 0) ? MOVE_STEP: 0);
    }

    

    ctx.lineTo(x,y);
    ctx.stroke();

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
  
    ctx.globalCompositeOperation = 'destination-over';

    ctx.fillStyle = 'white';

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.querySelector(`.download`).setAttribute('download', 'My_Etch_A_Sketch.jpeg');

    document.querySelector(`.download`).setAttribute('href', canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream"));
}



window.addEventListener(`keydown`, handleKeyDown);
document.querySelector(`.reset`).addEventListener(`click`, clearCanvas);
document.querySelector(`.download`).addEventListener(`click`, downloadImage);