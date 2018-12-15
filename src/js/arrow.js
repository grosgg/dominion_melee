const ARROW_SPEED = 2;

class Arrow {
  constructor(shooter) {
    let x, y, dx, dy;
    switch(shooter.sprite.direction) {
      case 'right':
        x = shooter.sprite.x + shooter.sprite.width;
        y = shooter.sprite.y + shooter.sprite.height/2;
        dx = ARROW_SPEED;
        break;
      case 'down': 
        x = shooter.sprite.x + shooter.sprite.width/2;
        y = shooter.sprite.y + shooter.sprite.height;
        dy = ARROW_SPEED;
        break;
      case 'left': 
        x = shooter.sprite.x;
        y = shooter.sprite.y + shooter.sprite.height/2;
        dx = -ARROW_SPEED;
        break;
      case 'up': 
        x = shooter.sprite.x + shooter.sprite.width/2;
        y = shooter.sprite.y;
        dy = -ARROW_SPEED;
        break;
    }

    this.sprite = kontra.sprite({
      type: 'arrow',
      x: x,
      y: y,

      dx: dx || 0,
      dy: dy || 0,

      // live only for 2 sec
      ttl: 40,

      // arrows are small
      width: dx == undefined ? 1 : 4,
      height: dx == undefined ? 4 : 1,
      color: 'beige'
    });

    sprites.push(this);
  }

  render() {
    this.sprite.render();
  }

  update() {
    this.sprite.update();
  }

  isAlive() {
    return this.sprite.isAlive();
  }

}
