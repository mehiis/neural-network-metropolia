const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");



const width = canvas.width;
const height = canvas.height;
const size = 20;
const gameSpeed = 360; // milliseconds



let snake = [{x: Math.floor(49/2), y: Math.floor(18)}];

let food = {x: 5, y: 8};

let dx = 1, dy = 0;

let score = 0;

let running = false;

let haveDied = false;



document.addEventListener("keydown", event => {

if(event.key === "ArrowUp" && dy !== 1) {

dx=0; dy=-1;

}

if(event.key === "ArrowDown" && dy !== -1) {

dx=0; dy=1;

}

if(event.key === "ArrowLeft" && dx !== 1) {

dx=-1; dy=0;

}

if(event.key === "ArrowRight" && dx !== -1) {

dx=1; dy=0;

}

if(event.key === " " && dx !== -1) {

if(!running) { resetGame(); }

}



});



function update() {

if (!running) return;

let head = {

x: snake[0].x + dx,

y: snake[0].y + dy

};



if (

head.x < 0 || head.x >= 50 ||

head.y < 0 || head.y >= 25 ||

snake.some(p => p.x === head.x && p.y === head.y)

) {

running = false;

haveDied = true;

return;

}



snake.unshift(head);



if(head.x === food.x && head.y === food.y) {

score++;

document.getElementById("score").textContent =

"Pisteet: " + score;



food = {

x: Math.floor(Math.random()*10),

y: Math.floor(Math.random()*10)

};

} else {

snake.pop();

}

}



function resetGame(){

haveDied = false;

snake = [{x: Math.floor(49/2), y: Math.floor(18)}];

food = {x: 5, y: 8};

dx = 1; dy = 0;

score = 0;

running = true;



}



function draw() {

ctx.fillStyle = "#222";

ctx.fillRect(0 , 0, width, height);



ctx.fillStyle = "lime";

snake.forEach(p =>

ctx.fillRect(p.x*20,p.y*20,18,18)

);



ctx.fillStyle = "red";

ctx.fillRect(food.x*20,food.y*20,18,18);



if (!running && haveDied) {

ctx.fillStyle = "white";

ctx.font = "30px Arial";

ctx.fillText("GAME OVER, Press SPACE to restart", width/2 - 200, height/2 - 15);

} else if (!running) {

ctx.fillStyle = "white";

ctx.font = "30px Arial";

ctx.fillText("Press SPACE to start", width/2 - 150, height/2);

}

}



setInterval(() => {

update();

draw();

}, gameSpeed);



draw();