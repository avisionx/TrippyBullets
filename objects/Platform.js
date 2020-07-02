class Platform {

    constructor(x1, x2, y) {
        this.x1 = x1;
        this.x2 = x2;
        this.y = y;
    }

    show() {
        noStroke();
        fill("#39ff14");
        rect(this.x1, this.y, this.x2 - this.x1, 20);
    }

}