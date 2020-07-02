let PLAYER = new Player();
let GAME_PAD = new GamePad();
let bullets = [];
let base;
let score = 1;
let level = 1;
let fontRegular;
let dead = false;

function preload() {
  fontRegular = loadFont('./assets/notable.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  PLAYER.init(windowWidth, windowHeight);
  base = new Platform(0, windowWidth, windowHeight - 20);
}

function draw() {
  if(score % (level * level * 20 / 5) === 0) {
    level += 1;
    if(level > 5) {
      level = 5;
    } 
  }
  var diffic = min(level * 0.01, 0.05);
  background(color('rgba(20, 20, 20, 0.5)'));
  textSize(15);
  text('SCORE: ' + score, 15, 20);
  textFont(fontRegular);
  textSize(12);
  text('LEVEL: ' + level, 15, 35);
  textFont(fontRegular);
  if (random(1) < diffic) {
    var choicesBullet = Math.floor((Math.random() * 20) + 1);
    var bb = map(choicesBullet, 1, 20, 50, windowWidth - 60);
    bullets.push(new Bullet(bb, 7));
  }
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (PLAYER.shotBy(bullets[i])) {
      gameOver();
    }
    if (bullets[i].ended(windowHeight)) {
      bullets.splice(i, 1);
      score += 1;
    } else {
      bullets[i].launch();
    }
  }
  fill("#ff073a");
  var totalSpikesY = windowHeight / 10;
  for (let i = 0; i < totalSpikesY; i++) {
    var spikeYCord = i * windowHeight / totalSpikesY;
    triangle(0, spikeYCord, 0, spikeYCord - 10, 10, spikeYCord - 5);
    triangle(windowWidth, spikeYCord, windowWidth, spikeYCord - 10, windowWidth - 10, spikeYCord - 5);
  }
  PLAYER.connect(GAME_PAD);
  if (PLAYER.collideBoundary()) {
    gameOver();
  }
  base.show();
  PLAYER.checkPlatform(base);
}

function keyPressed() {
  GAME_PAD.press(keyCode);
}

function keyReleased() {
  GAME_PAD.release(keyCode);
}

function mouseClicked() {
  if(dead) {
    bullets = [];
    dead = false;
    PLAYER.init(windowWidth, windowHeight);
    level = 1;
    score = 1;
    textAlign(LEFT);
    loop();
  }
}

function gameOver() {
  dead = true;
  textAlign(CENTER);
  textSize(70);
  fill("#FF9933");
  text('Click to Restart', windowWidth/2, windowHeight/2);
  textFont(fontRegular);
  noLoop();
}