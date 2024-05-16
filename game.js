class Game {
  constructor() {
    this.canvas = document.getElementById("asteroids-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ship = new Ship();
    this.asteroid = new Asteroid();
  }

  play() {
    setInterval(() => {
      this.resetCanvas();
      this.setBackground();
      this.ship.draw(this.ctx);
      this.asteroid.draw(this.ctx);
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
    this.angularVelocity = 0;
    this.angle = 0;
    this.velocity = { x: 0, y: 0 };
    this.power = false;

    document.addEventListener("keydown", (event) => {
      console.log(event.keyCode);
      if (event.keyCode === 37) {
        this.angularVelocity = -Math.PI / 30;
      }

      if (event.keyCode === 39) {
        this.angularVelocity = Math.PI / 30;
      }

      if (event.keyCode === 38) {
        this.power = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.keyCode === 37 || event.keyCode === 39) {
        this.angularVelocity = 0;
      }

      if (event.keyCode === 38) {
        this.power = false;
      }
    });
  }

  draw(ctx) {
    this.update();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.25;

    ctx.restore();
    ctx.save();
    ctx.beginPath();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.moveTo(this.shape[0][0], this.shape[0][1]);
    ctx.lineTo(this.shape[1][0], this.shape[1][1]);
    ctx.lineTo(this.shape[2][0], this.shape[2][1]);
    ctx.lineTo(this.shape[0][0], this.shape[0][1]);
    ctx.closePath();

    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.angle += this.angularVelocity;

    this.velocity.x *= 0.985;
    this.velocity.y *= 0.985;

    if (this.power) {
      this.velocity.x += Math.sin(this.angle) / 5;
      this.velocity.y += -Math.cos(this.angle) / 5;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x > 500) {
      this.x = 0;
    }

    if (this.x < 0) {
      this.x = 500;
    }

    if (this.y > 500) {
      this.y = 0;
    }

    if (this.y < 0) {
      this.y = 500;
    }
  }
}

class Asteroid {
  constructor() {
    this.x = Math.floor(Math.random() * 501);
    this.y = Math.floor(Math.random() * 501);
    this.radius = (Math.floor(Math.random() * 3) + 2) * 12;
    this.velocity = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 };
  }

  draw(ctx) {
    this.update();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.25;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.restore();
    ctx.stroke();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x > 500 + this.radius) {
      this.x = 0 - this.radius;
    }

    if (this.x < 0 - this.radius) {
      this.x = 500 + this.radius;
    }

    if (this.y > 500 + this.radius) {
      this.y = 0 - this.radius;
    }

    if (this.y < 0 - this.radius) {
      this.y = 500 + this.radius;
    }
  }
}

const game = new Game();
game.play();
