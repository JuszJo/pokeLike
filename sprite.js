import Vector from './utils/vector.js'

var canvas = document.querySelector('canvas');

var drawingSurface = canvas.getContext('2d');

class Sprite {
    constructor(
        image, spriteWidth, spriteHeight, 
        x, y, width, height, 
        frameCountX, frameCountY, currentFrameX, currentFrameY, 
        defaultFrameX, defaultFrameY,
        offset
        ) {
        this.image = image;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.frameCountX = frameCountX;
        this.frameCountY = frameCountY;
        this.currentFrameX = currentFrameX;
        this.currentFrameY = currentFrameY;
        this.sw = spriteWidth / frameCountX;
        this.sh = spriteHeight / frameCountY;
        this.sx = currentFrameX * this.sw;
        this.sy = currentFrameY * this.sh;
        this.defaultFrameX = defaultFrameX;
        this.defaultFrameY = defaultFrameY;
        this.offset = offset;
        this.frameSkips = 12;
        this.time = 0;
        this.idle = false;
    }

    animate() {
        if(!(this.idle)) {
            if(this.time % this.frameSkips == 0) {
                this.time = 0;
                if(this.currentFrameX < this.frameCountX - 1) {
                    ++this.currentFrameX;
                    this.sx = this.currentFrameX * this.sw;
                }
                else {
                    this.currentFrameX = 0;
                    this.sx = this.currentFrameX * this.sw;
                }
            }
            ++this.time;
        }
        if(this.idle) this.sx = this.defaultFrameX * this.sw;
    }

    update() {
        this.animate();
        this.display();
    }

    display() {
        //drawingSurface.strokeRect(this.x + this.offset.x, this.y + this.offset.y, this.w  - this.offset.x * 2, (this.offset.y / 2));
        drawingSurface.drawImage(this.image, this.sx, this.sy,
            this.sw, this.sh, 
            this.x, this.y, 
            this.w, this.h
        );
    }
}

export class Player extends Sprite {
    constructor(
        image, spriteWidth, spriteHeight, 
        x, y, width, height, 
        frameCountX, frameCountY, currentFrameX, currentFrameY, 
        defaultFrameX, defaultFrameY,
        offset
        ) {
        super(image, spriteWidth, spriteHeight, 
            x, y, width, height, 
            frameCountX, frameCountY, currentFrameX, currentFrameY, 
            defaultFrameX, defaultFrameY,
            offset
            );
        this.velocity = new Vector(0, 0);
    }

    move() {
        if(LEFT && lastKey == left) {
            this.currentFrameY = 1;
            this.sy = this.currentFrameY * this.sh;
            this.velocity.x = -2.5;
            this.x += this.velocity.x;
        }
        if(RIGHT && lastKey == right) {
            this.currentFrameY = 2;
            this.sy = this.currentFrameY * this.sh;
            this.velocity.x = 2.5;
            this.x += this.velocity.x;
        }
        if(UP && lastKey == up) {
            this.currentFrameY = 3;
            this.sy = this.currentFrameY * this.sh;
            this.velocity.y = -2.5;
            this.y += this.velocity.y;
        }
        if(DOWN && lastKey == down) {
            this.currentFrameY = 0;
            this.sy = this.currentFrameY * this.sh;
            this.velocity.y = 2.5;
            this.y += this.velocity.y;
        }
        if(noMoveX() && noMoveY()) {
            this.idle = true;
        }
        else {
            this.idle = false;
        }
    }
    
    update() {
        this.move();
        //this.animate();
        super.update();
    }
}