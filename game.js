class Game {
  constructor() {
    this.canvas = document.getElementById("asteroids-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ship = new Ship();
  }

  play() {
    setInterval(() => {
      this.resetCanvas();
      this.setBackground();
      this.ship.draw(this.ctx);
    }, 33);
  }

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setBackground() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Ship {
  constructor() {
    this.x = 250;
    this.y = 250;
    this.shape = [
      [0, -10],
      [-4, 3],
      [4, 3],
    ];
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.25;

    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.moveTo(this.shape[0][0], this.shape[0][1]);
    ctx.lineTo(this.shape[1][0], this.shape[1][1]);
    ctx.lineTo(this.shape[2][0], this.shape[2][1]);
    ctx.lineTo(this.shape[0][0], this.shape[0][1]);

    ctx.stroke();
    ctx.restore();
  }
}

const game = new Game();
game.play();
