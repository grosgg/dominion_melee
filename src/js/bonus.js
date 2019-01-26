// TODO: Add more bonus types
const BONUS_CHANCE = [
  'red_potion',
  'blue_potion',
];

const BONUS_SPAWN_INTERVAL = 10000;
const COLLIDES_WITH_BONUS = ['Water', 'Walls', 'Mountains', 'Trees', 'Buildings'];

class Bonus {
  constructor() {
    this.bonusType = BONUS_CHANCE[Math.floor(Math.random() * BONUS_CHANCE.length)];

    let tile;
    let spotFound = false;

    while (!spotFound) {
      tile = world.getRandomTile();
      spotFound = true;

      COLLIDES_WITH_BONUS.forEach(layer => {
        if (world.tileEngine.tileAtLayer(layer, {x: tile.x, y: tile.y})) {
          spotFound = false;
        }
      });
    }

    console.log(`New bonus: ${this.bonusType}`);
    this.sprite = kontra.sprite({
      x: tile.x,
      y: tile.y,
      image: kontra.assets.images[this.bonusType],
      type: 'bonus',
      ttl: 480,
    });
    sprites.push(this);
  }

  render() {
    this.sprite.render();
  }

  update() {
    sprites
      .filter(object => object.sprite.type == 'player')
      .forEach(player => {
        if (this.sprite.collidesWith(player.sprite)) {
          this.affect(player);
        }
      });
    this.sprite.update();
  }

  isAlive() {
    return this.sprite.isAlive();
  }

  affect(player) {
    console.log(`Affecting player ${player.id}`);
    playPotionSound();
    this.sprite.ttl = 0;

    switch(this.bonusType) {
      case 'red_potion': player.status.addHeart(); break;
      case 'blue_potion': player.status.shootUp(); break;
    }
  }
}