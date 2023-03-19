import Vector from './utils/vector.js'

var canvas = document.querySelector('canvas');

var drawingSurface = canvas.getContext('2d');

class Sprite {
    constructor(
        image,
        x, y,
        frameCountX, frameCountY, 
        currentFrameX, currentFrameY, 
        offset, idleState
        ) {
            this.image = image;
            // this.spriteWidth = spriteWidth;
            // this.spriteHeight = spriteHeight;
            this.x = x;
            this.y = y;
            this.w = this.image.width / 12;
            this.h = this.image.height / 8;
            this.frameCountX = frameCountX;
            this.frameCountY = frameCountY;
            this.currentFrameX = currentFrameX;
            this.currentFrameY = currentFrameY;
            this.offset = offset;
            this.frameSkips = 10;
            this.time = 0;
            this.idle = false;
            this.elapsedFramesX = 1;
            this.state = {
                down: 0,
                left: 1,
                right: 2,
                up: 3
            }
            this.currentState = this.state.down;
            this.idleState = idleState;
        }
        
    updateSorceWidthX(params) {
        this.sx = this.currentFrameX * this.sw;
    }

    // animate2() {
    //     if(this.currentFrameX < this.frameCountX+3 - 1) { 
    //         ++this.currentFrameX;
    //         this.updateSorceWidthX();
    //         console.log(this.currentFrameX);
    //     }
    // }

    // animate() {
    //     if(!(this.idle)) {
    //         if(this.time % this.frameSkips == 0) {
    //             this.time = 0;
    //             if(this.currentFrameX < this.frameCountX - 1) {
    //                 ++this.currentFrameX;
    //                 this.sx = this.currentFrameX * this.sw;
    //             }
    //             else {
    //                 this.currentFrameX = 0;
    //                 this.sx = this.currentFrameX * this.sw;
    //             }
    //         }
    //         ++this.time;
    //     }
    //     if(this.idle) this.sx = this.
    // }

    animate() {
        if(this.time % this.frameSkips == 0) {
            if(this.currentFrameX < this.frameCountX - 1) {
                ++this.currentFrameX;
                ++this.elapsedFramesX;
                console.log(this.currentFrameX, this.elapsedFramesX)
                if(this.elapsedFramesX == 3) {
                    this.currentFrameX = this.idleState - 1;
                    this.elapsedFramesX = 0;
                }
                // console.log(this.currentFrameX)
            }
        }
        ++this.time;
    }
    
    update() {
        // this.animate();
        this.display();
    }

    display() {
        const cropbox = {
            position: {
                // x: this.w * this.frameCountX,
                x: this.w * this.currentFrameX,
                y: this.h * this.currentState
            },
            width: this.w,
            height: this.h
        }
        // console.log(this.image.width)
        // console.log(cropbox.height);

        //drawingSurface.strokeRect(this.x + this.offset.x, this.y + this.offset.y, this.w  - this.offset.x * 2, (this.offset.y / 2));
        drawingSurface.drawImage(this.image,
            cropbox.position.x, cropbox.position.y,
            cropbox.width, cropbox.height, 
            this.x, this.y, 
            this.w, this.h
        );
        
    }
}

export class Player extends Sprite {
    constructor(
        image, 
        // spriteWidth, spriteHeight, 
        x, y,
        frameCountX, frameCountY, 
        currentFrameX, currentFrameY, 
        offset, idleState
        ) {
        super(
            image,
            // spriteWidth, spriteHeight, 
            x, y,
            frameCountX, frameCountY, 
            currentFrameX, currentFrameY,
            offset, idleState
            );
        this.velocity = new Vector(0, 0);
    }

    switchSprite() {
        this.currentFrameX = 3;
    }

    move() {
        if(LEFT && lastKey == left) {
            // this.currentState = this.state.left
            this.animate();
            this.currentState = this.state.left;
            this.velocity.x = -2.5;
            this.x += this.velocity.x;
        }
        if(RIGHT && lastKey == right) {
            this.animate();
            this.currentState = this.state.right;
            this.velocity.x = 2.5;
            this.x += this.velocity.x;
        }
        if(UP && lastKey == up) {
            this.animate();
            this.currentState = this.state.up;
            this.velocity.y = -2.5;
            this.y += this.velocity.y;
        }
        if(DOWN && lastKey == down) {
            this.animate();
            this.currentState = this.state.down;
            this.velocity.y = 2.5;
            this.y += this.velocity.y;
        }
        if(noMoveX() && noMoveY()) {
            this.idle = true;
            this.currentFrameX = this.idleState;
            this.elapsedFramesX = 1;
        }
        else {
            this.idle = false;
        }
    }
    
    update() {
        this.move();

        // this.animate();
        // this.switchSprite();
        // this.animate2();
        //this.animate();
        // this.switchSprite();
        super.update();
    }
}