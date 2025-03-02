import { Paddle } from "./paddle.js";
export class Ball {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    size: number;
    initialSpeedX: number;
    initialSpeedY: number;

    constructor(x: number, y: number, speedX: number, speedY: number, size: number) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.size = size;

        // Store the initial speeds for resetting
        this.initialSpeedX = speedX;
        this.initialSpeedY = speedY;
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    checkWallCollision(canvasHeight: number) {
        if (this.y <= 0 || this.y >= canvasHeight - this.size) {
            this.speedY *= -1;
        }
    }

    checkPaddleCollision(paddle: Paddle, isLeftPaddle: boolean, canvasWidth: number) {
        let paddleX = isLeftPaddle ? 0 : canvasWidth - paddle.width;

        if (
            this.x <= paddleX + paddle.width && 
            this.x + this.size >= paddleX && 
            this.y + this.size >= paddle.y && 
            this.y <= paddle.y + paddle.height
        ) {
            this.speedX *= -1;

            // Speed up the ball slightly after each bounce
            this.speedX *= 1.05;
            this.speedY *= 1.05;
        }
    }

    reset(canvasWidth: number, canvasHeight: number) {
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.speedX = this.initialSpeedX * (Math.random() > 0.5 ? 1 : -1);
        this.speedY = this.initialSpeedY * (Math.random() > 0.5 ? 1 : -1);
    }
}
