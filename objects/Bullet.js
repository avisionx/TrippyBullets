class Bullet {

    constructor(x, speed) {
        this.x = x;
        this.y = -20;
        this.speed = speed;
    }

    launch() {
        noStroke();
        fill("#ff073a");
        rect(this.x, this.y, 10, 25, 0, 0, 5, 5);
        this.y += this.speed;
    }

    ended(maxH) {
        return this.y > maxH + 10;
    }

}