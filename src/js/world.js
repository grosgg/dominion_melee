const TILE_SIZE = 8;
const FIRST_PLAYABLE_TILE_X = 1;
const LAST_PLAYABLE_TILE_X = 30;
const FIRST_PLAYABLE_TILE_Y = 0;
const LAST_PLAYABLE_TILE_Y = 19;

class World {
  constructor(levelName) {
    console.log(`Loading level ${levelName}`);
    this.tileEngine = kontra.tileEngine(kontra.assets.data[levelName]);
  }

  isLayerCollidingInCorner(object, layer, corner) {
    switch (corner) {
      case 'upright':
        return !!this.tileEngine.tileAtLayer(layer, {
          x: object.sprite.x + object.sprite.width - 1, y: object.sprite.y
        });
      case 'downright':
        return !!this.tileEngine.tileAtLayer(layer, {
          x: object.sprite.x + object.sprite.width - 1, y: object.sprite.y + object.sprite.height - 1
        });
      case 'downleft':
        return !!this.tileEngine.tileAtLayer(layer, {
          x: object.sprite.x, y: object.sprite.y + object.sprite.height - 1
        });
      case 'upleft':
        return !!this.tileEngine.tileAtLayer(layer, {
          x: object.sprite.x, y: object.sprite.y
        });
    }
  }

}

function getRandomTile() {
  return({
    x: (Math.floor(Math.random() * (LAST_PLAYABLE_TILE_X - FIRST_PLAYABLE_TILE_X + 1)) + FIRST_PLAYABLE_TILE_X) * TILE_SIZE,
    y: (Math.floor(Math.random() * (LAST_PLAYABLE_TILE_Y - FIRST_PLAYABLE_TILE_Y + 1)) + FIRST_PLAYABLE_TILE_Y) * TILE_SIZE,
  });
}
