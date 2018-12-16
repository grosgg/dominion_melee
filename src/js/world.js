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
