const PLAYER_SIZE = 8;
const PLAYER_SPEED = 1;
const PLAYER_MOVE_DELAY = 0.02;
const PLAYER_SHOOT_DELAY = 0.4;

const COLLIDES_WITH_PLAYER = ['Water', 'Walls', 'Trees', 'Buildings'];

const PLAYER_PRESETS = [
  {
    controls: {
      right: 'd',
      down: 's',
      left: 'a',
      up: 'w',
      shoot: 'r',
      strafe: 't',
    },
    position: { x: 0, y: 0 },
    images: {
      right: 'archer_red_right',
      left: 'archer_red_left',
      dead: 'archer_red_dead',
    }
  }, {
    controls: {
      right: 'right',
      down: 'down',
      left: 'left',
      up: 'up',
      shoot: 'p',
      strafe: 'o',
    },
    position: { x: kontra.canvas.width - PLAYER_SIZE , y: kontra.canvas.height - PLAYER_SIZE },
    images: {
      right: 'archer_blue_right',
      left: 'archer_blue_left',
      dead: 'archer_blue_dead',
    }
  }
];

class Player {
  constructor(number) {
    console.log(`Creating player ${number}`);
    this.id = number;

    this.controls = PLAYER_PRESETS[this.id].controls;
    this.images = PLAYER_PRESETS[this.id].images;

    this.sprite = kontra.sprite({
      x: PLAYER_PRESETS[this.id].position.x,
      y: PLAYER_PRESETS[this.id].position.y,
      prevX: PLAYER_PRESETS[this.id].position.x,
      prevY: PLAYER_PRESETS[this.id].position.y,
      type: 'player',
      image: kontra.assets.images[this.images.right],

      // directions: right, down, left, up
      direction: 'right',

      // delta time
      dtMove: 0,
      dtShoot: 0,

      dead: false,
    });
    sprites.push(this);
  }

  render() {
    this.sprite.render();
  }

  update() {
    this.savePreviousPosition();
    this.move();
    this.shoot();
    this.timePasses();
    this.sprite.update();
  }

  move() {
    if (this.sprite.dtMove < PLAYER_MOVE_DELAY || this.sprite.dead) { return null; }

    if (kontra.keys.pressed(this.controls.down)) {
      this.sprite.y += PLAYER_SPEED;
      this.sprite.direction = 'down';
    }
    if (kontra.keys.pressed(this.controls.up)) {
      this.sprite.y -= PLAYER_SPEED;
      this.sprite.direction = 'up';
    }

    // Direction priority for left and right
    if (kontra.keys.pressed(this.controls.right)) {
      this.sprite.x += PLAYER_SPEED;
      this.sprite.direction = 'right';
    }
    if (kontra.keys.pressed(this.controls.left)) {
      this.sprite.x -= PLAYER_SPEED;
      this.sprite.direction = 'left';
    }

    this.changeAim();
    this.handleCollisions();
    this.stopOnMapEdge();
    this.sprite.dtMove = 0;
  }

  changeAim() {
    if (kontra.keys.pressed(this.controls.strafe)) { return null; }
    this.sprite.aim = this.sprite.direction;

    if (this.sprite.aim == 'left') {
      this.sprite.image = kontra.assets.images[this.images.left];
    }
    if (this.sprite.aim == 'right') {
      this.sprite.image = kontra.assets.images[this.images.right];
    }
    
  }

  shoot() {
    if (this.sprite.dtShoot < PLAYER_SHOOT_DELAY || this.sprite.dead) { return null; }

    if (kontra.keys.pressed(this.controls.shoot)) {
      new Arrow(this);
      this.sprite.dtShoot = 0;
    }
  }

  die() {
    this.sprite.image = kontra.assets.images[this.images.dead];
    this.sprite.dead = true;
    playDieSound();
    console.log(`Player ${this.id} died!`);
  }

  handleCollisions() {
    let that = this;

    COLLIDES_WITH_PLAYER.forEach(function(layer) {
      ['upright', 'downright', 'downleft', 'upleft'].forEach(function(corner) {
        if (world.isLayerCollidingInCorner(that, layer, corner)) {
          that.handleSlide(corner, layer);
        }
      });
    });
  }

  moveBack() {
    this.sprite.x = this.sprite.prevX;
    this.sprite.y = this.sprite.prevY;
  }

  handleSlide(corner, layer) {
    let direction = this.movingDirection();
    let position = {x: this.sprite.x, y: this.sprite.y};
    // console.log('corner', corner);
    // console.log('direction', direction);
    
    this.moveBack();
    // Straight move don't slide
    if (['right', 'down', 'left', 'up'].indexOf(direction) >= 0) { return null }

    // Handle sliding against corners
    if (corner == 'upright') {
      switch(direction) {
        case 'downright': this.sprite.y += PLAYER_SPEED; break;
        case 'upleft': this.sprite.x -= PLAYER_SPEED; break;
        case 'upright':
          if (world.tileEngine.tileAtLayer(layer, {
            // position - collision_offset + width - next pixel
            x: position.x - 1 + this.sprite.width - 1,
            // position + height
            y: position.y
          })) {
            this.sprite.x += PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, {
            // position - collision_offset + width
            x: position.x - 1 + this.sprite.width,
            // position + next pixel
            y: position.y + 1
          })) {
            this.sprite.y -= PLAYER_SPEED;
          }
          break;
      }
    }
    if (corner == 'downright') {
      switch(direction) {
        case 'upright': this.sprite.y -= PLAYER_SPEED; break;
        case 'downleft': this.sprite.x -= PLAYER_SPEED; break;
        case 'downright': 
          if (world.tileEngine.tileAtLayer(layer, {
            // position - collision_offset + width - next pixel
            x: position.x - 1 + this.sprite.width - 1,
            // position - collision_offset + height
            y: position.y - 1 + this.sprite.height
          })) {
            this.sprite.x += PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, {
            // position - collision_offset + width
            x: position.x - 1 + this.sprite.width,
            // position - collision_offset + height - next pixel
            y: position.y - 1 + this.sprite.height - 1 })) {
            this.sprite.y += PLAYER_SPEED;
          }
          break;
      }
    }
    if (corner == 'downleft') {
      switch(direction) {
        case 'downright': this.sprite.x += PLAYER_SPEED; break;
        case 'upleft': this.sprite.y -= PLAYER_SPEED; break;
        case 'downleft':
          if (world.tileEngine.tileAtLayer(layer, {
            // position + next pixel
            x: position.x + 1,
            // position - collision_offset + height
            y: position.y - 1 + this.sprite.height
          })) {
            this.sprite.x -= PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, {
            x: position.x,
            // position - collision_offset + height - next pixel
            y: position.y - 1 + this.sprite.height - 1
          })) {
            this.sprite.y += PLAYER_SPEED;
          }
          break;
      }
    }
    if (corner == 'upleft') {
      switch(direction) {
        case 'upright': this.sprite.x += PLAYER_SPEED; break;
        case 'downleft': this.sprite.y += PLAYER_SPEED; break;
        case 'upleft':
          if (world.tileEngine.tileAtLayer(layer, {
            // position + next pixel
            x: position.x + 1,
            y: position.y
          })) {
            this.sprite.x -= PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, {
            x: position.x,
            // position + next pixel
            y: position.y + 1
          })) {
            this.sprite.y -= PLAYER_SPEED;
          }
          break;
      }
    }
  }

  movingDirection() {
    let direction = '';
    if (this.sprite.y < this.sprite.prevY) { direction = direction + 'up'; }
    if (this.sprite.y > this.sprite.prevY) { direction = direction +  'down'; }
    if (this.sprite.x > this.sprite.prevX) { direction = direction +  'right'; }
    if (this.sprite.x < this.sprite.prevX) { direction = direction +  'left'; }
    return direction;
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

  savePreviousPosition() {
    this.sprite.prevX = this.sprite.x;
    this.sprite.prevY = this.sprite.y;
  }

  isAlive() {
    return this.sprite.isAlive();
  }

}
