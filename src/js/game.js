kontra.init();

let world;
let sprites = [];

// Preload assets
kontra.assets.dataPath = "data";
kontra.assets.imagePath = "img";
kontra.assets
  .load(
    "world.png",
    "world.json",
    "luscious_grasslands.json",
    "archer_red_right.png",
    "archer_red_left.png",
    "archer_red_dead.png",
    "archer_blue_right.png",
    "archer_blue_left.png",
    "archer_blue_dead.png",
    "heart.png",
  )
  .then(() => {
    new Player(0);
    new Player(1);
    world = new World('luscious_grasslands');
    loop.start(); // start the game
  });

const loop = kontra.gameLoop({
  // create the main game loop
  update: () => {
    // update the game state
    sprites.map(sprite => sprite.update());
    sprites = sprites.filter(sprite => sprite.isAlive());
  },
  render: () => {
    // render the game state
    world.tileEngine.render();
    sprites.map(sprite => sprite.render());
  }
});




