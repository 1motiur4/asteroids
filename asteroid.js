class Asteroid {
  constructor(x, y, radius) {
    this.x = x ? x : this.generateRandom();
    this.y = y ? y : this.generateRandom();
    this.radius = radius ? radius : (Math.floor(Math.random() * 3) + 2) * 12;
    this.velocity = { x: Math.random() * 4 - 2, y: Math.random() * 4 - 2 };
  }

  //   generateRandom() {
  //     var num = Math.floor(Math.random() * 501);
  //     if (num > 50 && num < 450) {
  //       return this.generateRandom();
  //     }
  //     return num;
  //   }

  // From ChatGPT, more efficient, avoids issues with call stack limits
  generateRandom() {
    while (true) {
      var num = Math.floor(Math.random() * 501);
      if (num <= 150 || num >= 350) {
        return num;
      }
    }
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

  isHit(bullet) {
    return (
      Math.sqrt((this.x - bullet.x) ** 2 + (this.y - bullet.y) ** 2) <
      this.radius + bullet.radius
    );
  }
}
