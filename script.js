import { Player } from "./sprite.js";
import collisionWalls from "./utils/collision.js";

var canvas = document.querySelector('canvas');

var drawingSurface = canvas.getContext('2d');

var wallpaper = {
    sx : 0,
    sy : 0,
    sw : 1440,
    sh : 1440,
    x : 0,
    y : 0,
    w : 900,
    h : 900,
};

var width = 800;
var height = 600;

canvas.setAttribute('width', width);
canvas.setAttribute('height', height);

var loaded = [];

var backgroundImage = new Image();
backgroundImage.src = 'sprites/dungeon.png';
backgroundImage.onload = loaded.push(backgroundImage);

var depthImage = new Image();
depthImage.src = 'sprites/depth.png';
depthImage.onload = loaded.push(depthImage);

var playerSprite = new Image();
playerSprite.src = 'sprites/bonus1_full.png';
playerSprite.onload = loaded.push(playerSprite);

var offset = {x : 8, y : 50};

var tile = new Tile(undefined, undefined, 30, 30, getCollisionTile(), 238, getDepth());

tile.makeCollisionMap();

tile.update();

if(loaded.length == 3) {
    var player = new Player(playerSprite, 624 / 4, 576 / 2, 0, 20, 52, 72, 3, 4, 1, 0, 1, 1, offset);
    // var player2 = new Player(playerSprite, 624 / 4, 576 / 2, 0, 20, 52, 72, 3, 4, 4, 0, 4, 1, offset);

    window.requestAnimationFrame(update);
}

var fps = Math.floor(1000 / 60);

var previousTime = 0;

function update(time) {
    if(!time) {
        time = 0;
        window.requestAnimationFrame(update)
        return;
    }
    var delta = time - previousTime;

    if(Math.ceil(delta) >= fps) {
        previousTime = time;
        display();
    }
    window.requestAnimationFrame(update);
}

var i = 0;

function display() {
    drawingSurface.clearRect(0, 0, width, height)
    
    drawingSurface.drawImage(backgroundImage, wallpaper.sx, wallpaper.sy, wallpaper.sw, wallpaper.sh, wallpaper.x, wallpaper.y, wallpaper.w, wallpaper.h);
    
    player.update();
    // player2.update();

    drawingSurface.drawImage(depthImage, 0, 0, wallpaper.w, wallpaper.h)

    collisionWalls(player, tile.walls)
    // collisionWalls(player2, tile.walls)
}

