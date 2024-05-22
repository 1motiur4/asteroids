class Game {
  constructor() {
    this.canvas = document.getElementById("asteroids-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.shipHit = false;
    this.ship = new Ship();
    this.asteroids = [];
    this.points = 0;

    for (let i = 0; i < 10; i++) {
      this.asteroids.push(new Asteroid());
    }
  }

  play() {
    setInterval(() => {
      if (!this.shipHit) {
        this.resetCanvas();
        this.setBackground();
        this.ship.draw(this.ctx);

        this.asteroids.forEach((asteroid) => {
          asteroid.draw(this.ctx);
        });

        this.ship.bullets.forEach((bullet) => {
          bullet.draw(this.ctx);
        });

        this.ctx.fillStyle = "white";
        this.ctx.font = "22px Arial";
        this.ctx.fillText("Points: " + this.points, 15, 30);
      } else {
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Game Over", 170, 250);
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
            console.log(numOfAsteroids);
            for (let h = 0; h < numOfAsteroids; h++) {
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
        this.shipHit = true;
      }
    });
  }
}

const game = new Game();
game.play();
