class Bullet {
  constructor(x, y, angle) {
    this.x = x + Math.sin(angle) * 10;
    this.y = y - Math.cos(angle) * 10;
    this.angle = angle;
    this.radius = 1;
  }

  draw(ctx) {
    this.update();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.25;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  update() {
    this.x += Math.sin(this.angle) * 8;
    this.y += -Math.cos(this.angle) * 8;
  }

  isOutOfBounds() {
    return this.x < 0 || this.x > 500 || this.y < 0 || this.y > 500;
  }
}
