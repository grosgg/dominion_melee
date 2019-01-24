kontra.init();

let scene = 'menu';
let world = null;
let sprites = [];

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
    // Sprites
    "archer_red_right.png",
    "archer_red_left.png",
    "archer_red_dead.png",
    "archer_blue_right.png",
    "archer_blue_left.png",
    "archer_blue_dead.png",
    "heart.png",
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
}

function loadMap(map) {
  sprites = [];
  new Player(0);
  new Player(1);
  world = new World(map);

  kontra.keys.unbind(['up', 'down', 'space']);
}
