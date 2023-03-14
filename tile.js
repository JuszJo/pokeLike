var canvas = document.querySelector('canvas');

var drawingSurface = canvas.getContext('2d');

class Tile {
    constructor(rows = 30, cols = 30, width, height, collisionTile, collisionID) {
        this.rows = rows;
        this.cols = cols;
        this.w = width;
        this.h = height;
        this.xSpace = 0;
        this.ySpace = 0;
        this.map = [];
        this.refinedMap = [];
        this.walls = [];
        this.collisionTile = collisionTile;
        this.collisionID = collisionID;
    }

    makeCollisionMap() {
        for(let i = 0; i < this.collisionTile.data.length; ++i) {
            this.map.push(this.collisionTile.data[i])
            if(this.map.length == this.rows) {
                this.refinedMap.push(this.map)
                this.map = [];
            }
        }
    }

    update() {
        this.displayCollision();
    }

    displayCollision() {
        this.xSpace = 0;
        this.ySpace = 0;
        for(let i = 0; i < this.rows; ++i) {
            for(let j = 0; j < this.cols; ++j) {
                if(this.refinedMap[i][j] == this.collisionID) {
                    this.walls.push({name : 32, x : this.xSpace, y : this.ySpace, w : this.w, h : this.h})
                }
                this.xSpace += this.w;
            }
            this.ySpace += this.h;
            this.xSpace = 0;
        }
        this.xSpace = 0;
        this.ySpace = 0;
    }
}