class Game {
  constructor() {
    this.canvas = document.getElementById("asteroids-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.shipHit = false;
    this.paused = false;
    this.startScreen = true;
    this.ship = new Ship();
    this.asteroids = [];
    this.points = 0;
    this.lives = 3;
    this.level = 1;
    this.startTime = null;
    this.elapsedTime = 0;
    this.lastTime = null;

    for (let i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid());
    }

    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 82) {
        //R key
        if (this.shipHit) {
          this.reset();
        }
      }

      if (event.keyCode === 80) {
        // P key
        if (!this.shipHit) {
          this.paused = !this.paused;
          if (this.paused) {
            this.elapsedTime += new Date() - this.lastTime;
          } else {
            this.lastTime = new Date();
          }
        }
      }

      if (event.keyCode === 13) {
        this.startScreen = false;
        this.startTime = new Date();
        this.lastTime = new Date();
      }
    });
  }

  updateTime() {
    if (!this.paused && !this.startScreen && !this.shipHit) {
      const now = new Date();
      this.elapsedTime += now - this.lastTime;
      this.lastTime = now;
    }
  }

  pauseTime() {}

  reset() {
    this.ship = new Ship();
    this.asteroids = [];
    this.points = 0;
    this.lives = 3;
    this.level = 1;
    this.shipHit = false;
    this.elapsedTime = 0;
    this.lastTime = new Date();

    for (let i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid());
    }
  }

  respawn() {
    let x = this.generateRandom();
    let y = this.generateRandom();
    this.ship = new Ship(x, y);
    this.asteroids.forEach((asteroid) => {
      if (this.ship.isHit(asteroid)) {
        this.respawn();
      }
    });
    // return;
  }

  generateRandom() {
    return Math.floor(Math.random() * 501);
  }

  play() {
    setInterval(() => {
      if (this.startScreen) {
        this.resetCanvas();
        this.setBackground();

        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.roundRect(120, 210, 260, 120, 5);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Press ENTER to start!", 130, 300);
      } else {
        if (!this.shipHit && !this.paused) {
          this.updateTime();
          this.resetCanvas();
          this.setBackground();
          this.ship.draw(this.ctx);

          this.asteroids.forEach((asteroid) => {
            asteroid.draw(this.ctx);
          });

          this.ship.bullets.forEach((bullet) => {
            bullet.draw(this.ctx);
          });
          // Points display
          this.ctx.fillStyle = "white";
          this.ctx.font = "22px Arial";
          this.ctx.fillText("Points: " + this.points, 15, 30);
          // Lives display
          this.ctx.fillStyle = "white";
          this.ctx.font = "22px Arial";
          this.ctx.fillText("Lives: " + this.lives, 415, 30);

          // Timer display
          const seconds = Math.floor(this.elapsedTime / 1000);
          const minutes = Math.floor(seconds / 60);
          const displaySeconds = seconds % 60;
          this.ctx.fillStyle = "white";
          this.ctx.font = "22px Arial";
          this.ctx.fillText(
            `Timer: ${minutes}:${
              displaySeconds < 10 ? "0" : ""
            }${displaySeconds}`,
            15,
            480
          );
        } else if (this.shipHit) {
          // Game Over
          this.ctx.fillStyle = "red";
          this.ctx.beginPath();
          this.ctx.roundRect(120, 210, 260, 120, 5);
          this.ctx.stroke();
          this.ctx.fill();

          this.ctx.fillStyle = "white";
          this.ctx.font = "30px Arial";
          this.ctx.fillText("Game Over", 170, 250);
          this.ctx.fillText("Press R to restart", 130, 300);
        } else if (this.paused) {
          this.ctx.fillStyle = "white";
          this.ctx.font = "30px Arial";
          this.ctx.fillText("PAUSED", 180, 250);
        }
      }

      this.update();
    }, 33);
  }

  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setBackground() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update() {
    this.ship.bullets.forEach((bullet) => {
      const bulletIndex = this.ship.bullets.indexOf(bullet);

      if (bullet.isOutOfBounds()) {
        this.ship.bullets.splice(bulletIndex, 1);
      }
    });

    this.asteroids.forEach((asteroid) => {
      const asteroidIndex = this.asteroids.indexOf(asteroid);

      this.ship.bullets.forEach((bullet) => {
        const bulletIndex = this.ship.bullets.indexOf(bullet);

        if (asteroid.isHit(bullet)) {
          this.points += asteroid.radius;
          // spawning smaller asteroids
          if (asteroid.radius > 12) {
            const numOfAsteroids = (asteroid.radius - 12) / 12;
            for (let h = 1; h < numOfAsteroids; h++) {
              this.asteroids.push(
                new Asteroid(asteroid.x, asteroid.y, asteroid.radius - 12)
              );
            }
          }

          this.asteroids.splice(asteroidIndex, 1);
          this.ship.bullets.splice(bulletIndex, 1);
        }
      });
    });

    this.asteroids.forEach((asteroid) => {
      if (this.ship.isHit(asteroid)) {
        if (this.lives === 1) {
          this.shipHit = true;
        } else {
          this.respawn();
          this.lives -= 1;
        }
      }
    });
  }
}

const game = new Game();
game.play();
