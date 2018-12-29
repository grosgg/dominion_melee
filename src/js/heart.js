class Heart {
  constructor(status) {
    this.status = status;
    this.sprite = kontra.sprite({
      x: this.status.x,
      y: this.status.hearts.length * TILE_SIZE,
      image: kontra.assets.images.heart,
      type: 'heart',
      player_id: this.status.player.id
    });

    sprites.push(this);
  }

  isAlive() {
    return this.sprite.isAlive();
  }

  render() {
    this.sprite.render();
  }

  update() {
    this.sprite.update();
  }

}