kontra.init();

let scene = 'menu';
let world = null;
let sprites = [];
let bonusSpawner = null;

// Preload assets
kontra.assets.dataPath = "data";
kontra.assets.imagePath = "img";
kontra.assets
  .load(
    // Tilesets
    "font.png",
    "font.json",
    "world.png",
    "world.json",
    // Maps
    "menu.json",
    "luscious_grasslands.json",
    "plains_and_mountains.json",
    "medieval_town.json",
    // Sprites
    "archer_red_right.png",
    "archer_red_left.png",
    "archer_red_dead.png",
    "archer_blue_right.png",
    "archer_blue_left.png",
    "archer_blue_dead.png",
    "heart.png",
    "red_potion.png",
  )
  .then(() => {
    kontra.keys.bind('esc', () => { loadMenu() });
    loadMenu();
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
    if (world) {world.tileEngine.render()};
    sprites.map(sprite => sprite.render());
  }
});

function loadMenu() {
  sprites = [];
  world = new World('menu');
  new MenuSelector();
  clearInterval(bonusSpawner);
}

function loadMap(map) {
  sprites = [];
  new Player(0);
  new Player(1);
  world = new World(map);
  bonusSpawner = setInterval(() => { new Bonus(); }, BONUS_SPAWN_INTERVAL);

  kontra.keys.unbind([
    PLAYER_PRESETS[0].controls.up,
    PLAYER_PRESETS[0].controls.down,
    PLAYER_PRESETS[0].controls.shoot,
  ]);
}
