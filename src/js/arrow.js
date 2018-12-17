const ARROW_SPEED = 2;
const ARROW_LENGTH = 5

const COLLIDES_WITH_ARROW = ['Walls', 'Trees', 'Buildings'];

class Arrow {
  constructor(shooter) {
    this.shooter = shooter
    let coordinates = this.calculateShot();
    playShootSound();

    this.sprite = kontra.sprite({
      x: coordinates.x,
      y: coordinates.y,
      prevX: coordinates.x,
      prevY: coordinates.y,
      type: 'arrow',

      dx: coordinates.dx,
      dy: coordinates.dy,

      ttl: 100,

      width: coordinates.dx == 0 ? 1 : ARROW_LENGTH,
      height: coordinates.dx == 0 ? ARROW_LENGTH : 1,
      color: 'beige'
    });

    sprites.push(this);
  }

  handleCollisions() {
    let that = this;

    COLLIDES_WITH_ARROW.forEach(function(layer) {
      if (world.tileEngine.layerCollidesWith(layer, that.sprite) && that.isMoving()) {
        that.stopMoving();
        playHitWallSound();
      }
    });

    sprites
      .filter(object => object.sprite.type == 'player')
      .forEach(player => {
        if (that.sprite.collidesWith(player.sprite) && that.isHurting(player)) {
          player.die();
          that.stopMoving();
        }
      });
  }

  stopMoving() {
    this.sprite.ttl = 400;
    this.sprite.dx = 0;
    this.sprite.dy = 0;
  }

  render() {
    this.sprite.render();
  }

  update() {
    this.savePreviousPosition();
    this.handleCollisions();
    this.sprite.update();
  }

  savePreviousPosition() {
    this.sprite.prevX = this.sprite.x;
    this.sprite.prevY = this.sprite.y;
  }

  calculateShot() {
    let coordinates = {x: 0, y:0, dx: 0, dy: 0};
    switch(this.shooter.sprite.aim) {
      case 'right':
        coordinates.x = this.shooter.sprite.x + this.shooter.sprite.width;
        coordinates.y = this.shooter.sprite.y + this.shooter.sprite.height/2;
        coordinates.dx = ARROW_SPEED;
        break;
      case 'down': 
        coordinates.x = this.shooter.sprite.x + this.shooter.sprite.width/2;
        coordinates.y = this.shooter.sprite.y + this.shooter.sprite.height;
        coordinates.dy = ARROW_SPEED;
        break;
      case 'left': 
        coordinates.x = this.shooter.sprite.x - ARROW_LENGTH;
        coordinates.y = this.shooter.sprite.y + this.shooter.sprite.height/2;
        coordinates.dx = -ARROW_SPEED;
        break;
      case 'up': 
        coordinates.x = this.shooter.sprite.x + this.shooter.sprite.width/2;
        coordinates.y = this.shooter.sprite.y - ARROW_LENGTH;
        coordinates.dy = -ARROW_SPEED;
        break;
    }
    return coordinates;
  }

  isMoving() {
    return this.sprite.dx != 0 || this.sprite.dy != 0;
  }

  isHurting(player) {
    return this.isMoving() && player != this.shooter;
  }

  isAlive() {
    return this.sprite.isAlive();
  }

}
