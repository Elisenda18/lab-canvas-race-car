"use strict"
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();

  };

  //Canvas Context Variables
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext('2d');

  //Car Object
  let car = {
    x: 228,
    y: 615
  };

  //Obstacles array
  let obstacles = [
    { width: 50, height: 20, x: 80,  y: 0 }
  ];
  
  
  function startGame() {
    drawBoard();
    drawCar();
    createObstacles();
    window.requestAnimationFrame(update);
  }

  function drawBoard(){
    const roadImage = new Image();
    roadImage.src = "./images/road.png";
    let roadImg = {
      x: 0,
      y: 0
    }
    ctx.drawImage(roadImage, roadImg.x, roadImg.y, 500, 700);
  }

  function drawCar() {
    const carImage = new Image();
    carImage.src = "./images/car.png";
    ctx.drawImage(carImage, car.x, car.y, 40, 80);
  }

  function moveCar() {
    document.addEventListener("keydown", function(key) {
      switch(key.code){
        case "ArrowLeft":
          if (car.x > 60) {
            car.x = car.x - 0.1;
          }
          break;
        case "ArrowRight":
          if (car.x < 400) {
            car.x = car.x + 0.1;
          }
          break;
        default:
          break;
      }
    })
  }

  // Random width should be adjusted
  function createObstacles() {
    let newObstacle = {
      width: Math.floor(Math.random() * (360 - 40) + 40 ),
      height: 20, 
      x: Math.floor(Math.random() * (360 - 40) + 40 ),
      y: 0
    }

    obstacles.push(newObstacle);
  }

  function drawObstacles(arr) {
    arr.forEach(obstacle => {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    })
  }

  function moveObstacles() {
    obstacles.forEach((obstacle) => {
      if(obstacle.y === 700) {
        obstacles.slice(-1,1);
      } else {
        obstacle.y = obstacle.y + 1;
      }
    })
  }

  function cleanKH7() {
    ctx.clearRect(0,0, 500, 700 );
  }

  function update() {
    cleanKH7();
    moveObstacles();
    drawBoard();
    drawCar();
    moveCar();
    drawObstacles(obstacles);
    window.requestAnimationFrame(update);
  }

  setInterval(moveObstacles, 2000);
  setInterval(createObstacles, 4000);
}