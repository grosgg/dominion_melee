const PLAYER_SPEED = 1;
const PLAYER_MOVE_DELAY = 0.05;
const PLAYER_SHOOT_DELAY = 1;

const COLLIDES_WITH_PLAYER = ['Water', 'Walls', 'Trees', 'Buildings'];

class Player {
  constructor(index, controls) {
    console.log(`Creating player ${index}`);
    this.controls = controls;
    this.sprite = kontra.sprite({
      x: 1,
      y: 1,
      prevX: 1,
      prevY: 1,
      type: 'player',

      // directions: right, down, left, up
      direction: 'right',

      // delta time
      dtMove: 0,
      dtShoot: 0,

      width: 6,
      height: 6,
      color: 'blue'
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
    if (this.sprite.dtMove < PLAYER_MOVE_DELAY) { return null; }

    if (kontra.keys.pressed(this.controls.right)) {
      this.sprite.x += PLAYER_SPEED;
      this.sprite.direction = 'right';
    }
    if (kontra.keys.pressed(this.controls.down)) {
      this.sprite.y += PLAYER_SPEED;
      this.sprite.direction = 'down';
    }
    if (kontra.keys.pressed(this.controls.left)) {
      this.sprite.x -= PLAYER_SPEED;
      this.sprite.direction = 'left';
    }
    if (kontra.keys.pressed(this.controls.up)) {
      this.sprite.y -= PLAYER_SPEED;
      this.sprite.direction = 'up';
    }

    this.changeAim();

    this.handleCollisions();
    this.stopOnMapEdge();
    this.sprite.dtMove = 0;
  }

  changeAim() {
    if (kontra.keys.pressed(this.controls.strafe)) { return null; }
    this.sprite.aim = this.sprite.direction;    
  }

  shoot() {
    if (this.sprite.dtShoot < PLAYER_SHOOT_DELAY) { return null; }

    if (kontra.keys.pressed(this.controls.shoot)) {
      new Arrow(this);
      this.sprite.dtShoot = 0;
    }
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
          if (world.tileEngine.tileAtLayer(layer, { x: position.x + this.sprite.width - 1, y: position.y })) {
            this.sprite.x += PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, { x: position.x + this.sprite.width, y: position.y + 1 })) {
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
          if (world.tileEngine.tileAtLayer(layer, { x: position.x + this.sprite.width - 1, y: position.y + this.sprite.height })) {
            this.sprite.x += PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, { x: position.x + this.sprite.width, y: position.y + this.sprite.height - 1 })) {
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
          if (world.tileEngine.tileAtLayer(layer, { x: position.x + 1, y: position.y + this.sprite.height })) {
            this.sprite.x -= PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, { x: position.x, y: position.y + this.sprite.height - 1 })) {
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
          if (world.tileEngine.tileAtLayer(layer, { x: position.x + 1, y: position.y })) {
            this.sprite.x -= PLAYER_SPEED;
          }
          if (world.tileEngine.tileAtLayer(layer, { x: position.x, y: position.y + 1 })) {
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
