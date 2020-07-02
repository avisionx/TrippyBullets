class GamePad {

    constructor() {
        this.up = false;
        this.left = false;
        this.right = false;
    }

    press(key) {
        switch (key) {
            case LEFT_ARROW:
                this.left = true;
                break;
            case RIGHT_ARROW:
                this.right = true;
                break;
            case UP_ARROW:
                this.up = true;
                break;
        }
    }

    release(key) {
        switch (key) {
            case LEFT_ARROW:
                this.left = false;
                break;
            case RIGHT_ARROW:
                this.right = false;
                break;
            case UP_ARROW:
                this.up = false;
                break;
        }
    }
}