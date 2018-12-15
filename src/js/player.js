const PLAYER_1_KEY_RIGHT = 'd';
const PLAYER_1_KEY_DOWN = 's';
const PLAYER_1_KEY_LEFT = 'a';
const PLAYER_1_KEY_UP = 'w';
const PLAYER_1_KEY_SHOOT = 'r';
const PLAYER_1_KEY_STRAFE = 't';

const PLAYER_SPEED = 2;
const PLAYER_MOVE_DELAY = 0.1;
const PLAYER_SHOOT_DELAY = 0.4;

class Player {
  constructor() {
    this.sprite = kontra.sprite({
      x: 30,
      y: 20,

      // ttl: 300,

      // directions: right, down, left, up
      direction: 'left',

      // delta time
      dtMove: 0,
      dtShoot: 0,

      width: 8,
      height: 8,
      color: 'red'
    });
    sprites.push(this);
  }

  render() {
    this.sprite.render();
  }

  update() {
    this.move();
    this.shoot();
    this.timePasses();
    this.sprite.update();
  }

  move() {
    if (this.sprite.dtMove < PLAYER_MOVE_DELAY) { return null; }

    if (kontra.keys.pressed(PLAYER_1_KEY_RIGHT)) {
      this.sprite.x += PLAYER_SPEED;
      this.changeDirection('right');
    }
    if (kontra.keys.pressed(PLAYER_1_KEY_DOWN)) {
      this.sprite.y += PLAYER_SPEED;
      this.changeDirection('down');
    }
    if (kontra.keys.pressed(PLAYER_1_KEY_LEFT)) {
      this.sprite.x -= PLAYER_SPEED;
      this.changeDirection('left');
    }
    if (kontra.keys.pressed(PLAYER_1_KEY_UP)) {
      this.sprite.y -= PLAYER_SPEED;
      this.changeDirection('up');
    }

    this.stopOnMapEdge();
    this.sprite.dtMove = 0;
  }

  changeDirection(direction) {
    if (kontra.keys.pressed(PLAYER_1_KEY_STRAFE)) { return null; }
    this.sprite.direction = direction;
  }

  shoot() {
    if (this.sprite.dtShoot < PLAYER_SHOOT_DELAY) { return null; }

    if (kontra.keys.pressed(PLAYER_1_KEY_SHOOT)) {
      new Arrow(this);
      this.sprite.dtShoot = 0;
    }
  }

  stopOnMapEdge() {
    // right edge
    if (this.sprite.x > kontra.canvas.width - this.sprite.width) {
      this.sprite.x = kontra.canvas.width - this.sprite.width;
    }
    // down edge
    if (this.sprite.y > kontra.canvas.height - this.sprite.height) {
      this.sprite.y = kontra.canvas.height - this.sprite.height;
    }
    // left edge
    if (this.sprite.x < 0) {
      this.sprite.x = 0;
    }
    // up edge
    if (this.sprite.y < 0) {
      this.sprite.y = 0;
    }
  }

  timePasses() {
    this.sprite.dtMove += 1/60;
    this.sprite.dtShoot += 1/60;
  }

  isAlive() {
    return this.sprite.isAlive();
  }

}
