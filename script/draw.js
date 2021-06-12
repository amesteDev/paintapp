const canvas = document.querySelector("#drawcanvas");
const ctx = canvas.getContext("2d");

var painting;
var color = '#000000';
var thickness = 10;

window.addEventListener('load', () => {
    resize()
})

window.addEventListener('resize', () => {
    resize()
})

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPostion);
canvas.addEventListener('mousemove', draw);

const mouse = {
    x: 0, y: 0,                        // coordinates
    lastX: 0, lastY: 0,                // last frames mouse position 
    b1: false, b2: false, b3: false,   // buttons
    buttonNames: ["b1", "b2", "b3"],   // named buttons
}

function draw(event) {

    if (!painting) return;

    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect()

    mouse.x = event.pageX - rect.left - scrollX;
    mouse.y = event.pageY - rect.top - scrollY;

    // first normalize the mouse coordinates from 0 to 1 (0,0) top left
    // off canvas and (1,1) bottom right by dividing by the bounds width and height
    mouse.x /= rect.width;
    mouse.y /= rect.height;

    // then scale to canvas coordinates by multiplying the normalized coords with the canvas resolution

    mouse.x *= canvas.width;
    mouse.y *= canvas.height;


    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

}

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPostion() {
    painting = false;
    ctx.beginPath();
}

function resize() {
    canvas.width = window.innerWidth;
    var heightRatio = 0.5;
    canvas.height = canvas.width * heightRatio;

}

//blue
document.querySelector("#blue").addEventListener('click', () => {
    color = '#0000FF';
})

//red
document.querySelector("#red").addEventListener('click', () => {
    color = '#FF0000';
})

//green
document.querySelector("#green").addEventListener('click', () => {
    color = '#00FF00';
})

//black
document.querySelector("#black").addEventListener('click', () => {
    color = '#000000';
})

document.querySelector('#clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

document.querySelector('#white').addEventListener('click', () => {
    color = '#FFFFFF';
})


document.querySelector('#thick').addEventListener('change', (e) => {
    thickness = document.querySelector('#thick').value;
})