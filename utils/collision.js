function axisY(y1, y2) {
    if(Math.min(y1.overlap, y2.overlap) == y1.overlap) return y1;

    return y2;
}

function axisX(x1, x2) {
    if(Math.min(x1.overlap, x2.overlap) == x1.overlap) return x1;

    return x2;
}

function compareAxis(x, y) {
    if(Math.min(x.overlap, y.overlap) == x.overlap) return x.name;

    return y.name;
}

export default function collisionWalls(player, wall) {
    for(let tile in wall) {
        if(player.y + player.offset.y + (player.offset.y / 2) > wall[tile].y && player.y + player.offset.y < wall[tile].y + wall[tile].h) {
            if(player.x + player.offset.x + player.w - (player.offset.x * 2) > wall[tile].x && player.x + player.offset.x < wall[tile].x + wall[tile].w) {
                var top = {name : 'top', overlap : Math.abs((player.y + player.offset.y + (player.offset.y / 2)) - (wall[tile].y))};
                var bottom = {name : 'bottom', overlap : Math.abs((player.y + player.offset.y) - (wall[tile].y + wall[tile].h))};
                var left = {name : 'left', overlap : Math.abs((player.x + player.offset.x + player.w - (player.offset.x * 2)) - (wall[tile].x))};
                var right = {name : 'right', overlap : Math.abs((player.x + player.offset.x) - (wall[tile].x + wall[tile].w))};

                var collidedX = axisX(left, right);
                var collidedY = axisY(top, bottom);
                switch (compareAxis(collidedX, collidedY)) {
                    case 'top':
                        player.y = player.y - top.overlap;
                        player.velocity.y = 0;
                        break;
                    case 'bottom':
                        player.y = player.y + bottom.overlap;
                        player.velocity.y = 0;
                        break;
                    case 'left':
                        player.x = player.x - left.overlap;
                        player.velocity.x = 0;
                        break;
                    case 'right':
                        player.x = player.x + right.overlap;
                        player.velocity.x = 0;
                        break;
                
                    default:
                        break;
                }

            }
        }
    }
}


