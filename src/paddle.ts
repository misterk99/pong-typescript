export class Paddle {
    canvasWidth: number;
    canvasHeight: number;
    width: number;
    height: number;
    y: number;
    speed: number;

    constructor(canvasWidth: number, canvasHeight: number, width: number, height: number, y: number, speed: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.width = width;
        this.height = height;
        this.y = y;
        this.speed = speed;
    }

    move(up: boolean) {
        if (up && this.y > 0) {
            this.y -= this.speed;
        }
        if (!up && this.y < this.canvasHeight - this.height) {
            this.y += this.speed;
        }
    }
}
