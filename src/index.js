const PLAYER_1_KEYS = {
  right: 'd',
  down: 's',
  left: 'a',
  up: 'w',
  shoot: 'r',
  strafe: 't',
};

const PLAYER_2_KEYS = {
  right: 'right',
  down: 'down',
  left: 'left',
  up: 'up',
  shoot: 'p',
  strafe: 'o',
};

kontra.init();

let world;
let sprites = [];

// Preload assets
kontra.assets.imagePath = "img";
kontra.assets.dataPath = "data";
kontra.assets
  .load(
    "world.png",
    "main.png",
    "world.json",
    "main.json",
    "luscious_grasslands.json"
  )
  .then(() => {
    world = new World('luscious_grasslands');
    new Player(1, PLAYER_1_KEYS);
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




