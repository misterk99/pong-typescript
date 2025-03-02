import { Game } from "./gamesetup.js";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;
const game = new Game(canvas, ctx);
game.gameLoop();
