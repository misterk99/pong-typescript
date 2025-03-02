import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    leftPaddle: Paddle;
    rightPaddle: Paddle;
    ball: Ball;
    keys: Record<string, boolean>;
    scoreLeft: number;
    scoreRight: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.leftPaddle = new Paddle(canvas.width, canvas.height, 10, 80, canvas.height / 2 - 40, 5);
        this.rightPaddle = new Paddle(canvas.width, canvas.height, 10, 80, canvas.height / 2 - 40, 5);
        this.ball = new Ball(canvas.width / 2, canvas.height / 2, 3, 3, 10);

        this.keys = { w: false, s: false, ArrowUp: false, ArrowDown: false };

        // Initialize scores
        this.scoreLeft = 0;
        this.scoreRight = 0;
   

        document.addEventListener("keydown", (event) => {
            if (event.key in this.keys) this.keys[event.key as keyof typeof this.keys] = true;
        });
        document.addEventListener("keyup", (event) => {
            if (event.key in this.keys) this.keys[event.key as keyof typeof this.keys] = false;
        });
    }

    handleScore()
    {
        if (this.ball.x <= 0) {
            this.scoreRight += 1;
            this.ball.reset(this.canvas.width, this.canvas.height);
        } else if (this.ball.x >= this.canvas.width) {
            this.scoreLeft += 1;
            this.ball.reset(this.canvas.width, this.canvas.height);
        }
    }

    update() {
        if (this.keys.w) this.leftPaddle.move(true);
        if (this.keys.s) this.leftPaddle.move(false);
        if (this.keys.ArrowUp) this.rightPaddle.move(true);
        if (this.keys.ArrowDown) this.rightPaddle.move(false);

        this.ball.move();
        this.ball.checkWallCollision(this.canvas.height);
        this.ball.checkPaddleCollision(this.leftPaddle, true, this.canvas.width);
        this.ball.checkPaddleCollision(this.rightPaddle, false, this.canvas.width);
        this.handleScore();

        
    }

    draw() {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(0, this.leftPaddle.y, this.leftPaddle.width, this.leftPaddle.height);
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(this.canvas.width - this.rightPaddle.width, this.rightPaddle.y, this.rightPaddle.width, this.rightPaddle.height);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.size, this.ball.size);
        this.ctx.fillStyle = "gray";

        this.ctx.font = "30px Arial";
        this.ctx.fillText(this.scoreLeft.toString(), this.canvas.width / 4, 50); // Left score
        this.ctx.fillText(this.scoreRight.toString(), this.canvas.width * 3 / 4, 50); // Right score
    }

    gameLoop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

}