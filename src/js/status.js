const STATUS_X = [0, kontra.canvas.width - TILE_SIZE];
const FAST_SHOOT_DELAY = 0.1;
const FAST_SHOOT_DURATION = 6000;

class Status {
  constructor(player) {
    this.player = player
    this.x = STATUS_X[player.id];
    this.hearts = []

    for (var i = 0; i < PLAYER_MAX_HEALTH; i++) { this.addHeart() }
  }

  removeHeart() {
    if (this.hearts.length < 1) { return }
    const heart = this.hearts.pop();
    sprites.find((sprite) => sprite == heart).sprite.ttl = 0;
  }

  addHeart() {
    const heart = new Heart(this);
    this.hearts.push(heart);
  }

  shootUp() {
    this.player.shootingSpeed = FAST_SHOOT_DELAY;
    setTimeout(() => { this.player.shootingSpeed = PLAYER_SHOOT_DELAY }, FAST_SHOOT_DURATION);
  }

  isDead() {
    return (this.hearts.length < 1);
  }

}