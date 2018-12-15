kontra.init();

let tileEngine;
let player;

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
    loadWorld();
    createPlayer();
    loop.start(); // start the game
  });

function loadWorld() {
  console.log('Loading level');
  tileEngine =  kontra.tileEngine(kontra.assets.data.luscious_grasslands);
}

function createPlayer() {
  console.log('Creating player');
  player = new Player();
}

const loop = kontra.gameLoop({
  // create the main game loop
  update: () => {
    // update the game state
    sprites.map(sprite => sprite.update());
    sprites = sprites.filter(sprite => sprite.isAlive());
  },
  render: () => {
    // render the game state
    tileEngine.render();
    sprites.map(sprite => sprite.render());
  }
});




