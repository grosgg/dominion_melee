const STATUS_X = [0, kontra.canvas.width - TILE_SIZE];

class Status {
  constructor(player) {
    this.player = player
    this.x = STATUS_X[player.id];
    this.hearts = []

    for (var i = 0; i < PLAYER_MAX_HEALTH; i++) {
      const heart = new Heart(this);
      this.hearts.push(heart);
    }
  }

  removeHeart() {
    const heart = this.hearts.pop();
    sprites.find((sprite) => sprite == heart).sprite.ttl = 0;
  }

}