export class Paddle {
    constructor(canvasWidth, canvasHeight, width, height, y, speed) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = width;
        this.height = height;
        this.y = y;
        this.speed = speed;
    }
    move(up) {
        if (up && this.y > 0) {
            this.y -= this.speed;
        }
        if (!up && this.y < this.canvasHeight - this.height) {
            this.y += this.speed;
        }
    }
}
