var up = 'w';
var down = 's';
var left = 'a'; 
var right = 'd';
var shoot = 'f';
var space = ' ';
var previousKey;
var lastKey;

var UP = false;
var DOWN = false;
var LEFT = false;
var RIGHT = false;
var SHOOT = false;
var JUMP = false
var fired = false;

function getPrevKey() {
    switch (previousKey) {
        case up:
            if(UP) lastKey = up;
            break;
        case down:
            if(DOWN) lastKey = down;
            break;
        case left:
            if(LEFT) lastKey = left;
            break;
        case right:
            if(RIGHT) lastKey = right;
            break;
    
        default:
            break;
    }
}

shootDown = window.addEventListener('keypress', e => {
    if((e.key).toLowerCase() == shoot) {
        SHOOT = true;
    }
})

window.addEventListener('keyup', e => {
    if((e.key).toLowerCase() == shoot) {
        SHOOT = false;
    }
})

keyDown = window.addEventListener('keypress', e => {
    switch ((e.key).toLowerCase()) {
        case up:
            UP = true;
            if(!(lastKey == up)) previousKey = lastKey;
            lastKey = up;
            break;
        case down:
            DOWN = true;
            if(!(lastKey == down)) previousKey = lastKey;
            lastKey = down;
            break;
        case left:
            LEFT = true;
            if(!(lastKey == left)) previousKey = lastKey;
            lastKey = left;
            break;
        case right:
            RIGHT = true;
            if(!(lastKey == right)) previousKey = lastKey;
            lastKey = right;
            break;
    
        default:
            break;
    }
})

keyUp = window.addEventListener('keyup', e => {
    switch ((e.key).toLowerCase()) {
        case up:
            UP = false;
            getPrevKey();
            break;
        case down:
            DOWN = false;
            getPrevKey();
            break;
        case left:
            LEFT = false;
            getPrevKey();
            break;
        case right:
            RIGHT = false;
            getPrevKey();
            break;
    
        default:
            break;
    }
})

jumpEvent = window.addEventListener('keypress', e => {
    switch(e.key) {
        case space:
            if(!(fired)) {
                JUMP = true;
                fired = true;
            }
            break;
        default:
            break;
    }
})

noJumpEvent = window.addEventListener('keyup', e => {
    switch (e.key) {
        case space:
            JUMP = false;
            fired = false
            break;
    
        default:
            break;
    }
})

function checkUp() {
    if(UP && !(DOWN)) {
        return true;
    }
    else {
        return false;
    }
}

function checkDown() {
    if(DOWN && !(UP)) {
       return true; 
    }
    else {
        return false;
    }
}

function checkLeft() {
    if(LEFT && !(RIGHT)) {
        //lastKey = left;
        return true;
    }
    else {
        return false;
    }
}

function checkRight() {
    if(RIGHT && !(LEFT)) {
        //lastKey = right;
        return true;
    }
    else {
        return false;
    }
}

function bothX() {
    if(LEFT && RIGHT) {
        return true;
    }
    return false;
}

function noMoveX() {
    if(!(LEFT) && !(RIGHT)) {
        return true;
    }
    else {
        return false;
    }
}

function noMoveY() {
    if(!(UP) && !(DOWN) && !(JUMP)) {
        return true;
    }
    else {
        return false;
    }
}