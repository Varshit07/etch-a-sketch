console.log(`Hello, World!`);
const canvas = document.querySelector('canvas');
console.log(canvas);
const ctx = canvas.getContext(`2d`);
console.log(ctx);
const {width, height} = canvas;
console.log(`${width} ${height}`);

let x = Math.floor((Math.random() * width));
let y = Math.floor((Math.random() * height));
console.log(`x = ${x}, y = ${y}`);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;


ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = 20;

ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x,y);
ctx.stroke();

function handleKeyDown(event) {
    console.log(event.key);
    if(event.key.includes(`Arrow`)) {
        event.preventDefault();
        console.log(`Arrow key pressed ${event.key}`);
        draw({key: event.key});
    }
}

function draw({key}) {
    console.log(`In draw key = ${key}`);
    
    ctx.strokeStyle = `hsl(${hue += 4}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    if(key === `ArrowUp`) {
        y -= 10;
    }
    else if(key === `ArrowDown`) {
        y += 10;
    }
    else if(key === `ArrowRight`) {
        x += 10;
    }
    else if(key === `ArrowLeft`) {
        x -= 10;
    }

    ctx.lineTo(x,y);
    ctx.stroke();
}

window.addEventListener(`keydown`, handleKeyDown);