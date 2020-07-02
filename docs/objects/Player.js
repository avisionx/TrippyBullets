class Player {

    constructor() {
        this.s = 30;
        this.vx = 0;
        this.vy = 0;
        this.g = 0.90;
        this.gV = 15;
        this.f = 0.9;
        this.jumping = false;
    }

    init(maxW, maxH) {
        this.x = maxW / 2 - this.s;
        this.y = maxH - 3 * this.s;
        this.maxW = maxW;
        this.maxH = maxH;
    }

    connect(gamePad) {
        this.show();
        this.addController(gamePad);
        this.y -= this.vy;
        this.vx *= this.f;
        this.vy *= this.g;
        if (this.vy <= 1.5) {
            this.vy = 0;
        }
        this.addGravity();
        this.move();
        if (this.y + this.s <= 0) {
            this.y = this.s;
        }
    }

    collideBoundary() {
        if (this.x - this.s <= 0) {
            return true;
        }
        if (this.x + this.s >= this.maxW) {
            return true;
        }
        if (this.y - this.s <= 0) {
            return true;
        }
        if (this.y + this.s >= this.maxH - 1) {
            return true;
        }
        return false;
    }

    checkPlatform(platform) {
        if (this.x < platform.x2 && this.x > platform.x1 && platform.y - this.s < this.y) {
            this.y = platform.y - this.s;
        }
    }

    shotBy(bullet) {
        if (bullet.y + 25 >= this.y - this.s) {
            if (dist(this.x, this.y, bullet.x + 5, bullet.y + 25) < this.s) {
                return true;
            }
        }
    }

    move() {
        var newX = this.x + this.vx;
        if (newX - this.s <= 0) {
            newX = this.s;
        } else if (newX + this.s >= this.maxW) {
            newX = this.maxW - this.s;
        }
        this.x = newX;
    }

    addGravity() {
        var newY = this.y + this.gV;
        if (newY + this.s >= this.maxH) {
            newY = this.maxH - this.s;
        }
        this.y = newY;
    }

    show() {
        noStroke();
        fill("#FF9933");
        ellipse(this.x, this.y, this.s * 2);
    }

    addController(gamePad) {
        if (gamePad.left) {
            this.vx = -10;
        }
        if (gamePad.right) {
            this.vx = 10;
        }
        if (gamePad.up && this.vy === 0) {
            this.vy = 50;
        }
    }
}