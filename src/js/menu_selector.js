const SELECTOR_MOVE_DELAY = 0.15;

const MENU_POSITIONS = [
  { name: 'luscious_grasslands', x: 5*TILE_SIZE, y: 12*TILE_SIZE },
  { name: 'plains_and_mountains', x: 5*TILE_SIZE, y: 14*TILE_SIZE },
  { name: 'medieval_town', x: 5*TILE_SIZE, y: 16*TILE_SIZE },
];

class MenuSelector {
  constructor() {
    console.log('Creating menu selector');

    this.sprite = kontra.sprite({
      index: 0,
      x: MENU_POSITIONS[0].x,
      y: MENU_POSITIONS[0].y,
      type: 'menu_selector',
      image: kontra.assets.images['archer_red_right'],
      dtMove: 0,
    });
    sprites.push(this);
  }

  render() {
    this.sprite.render();
  }

  update() {
    this.move();
    this.select();
    this.timePasses();
    this.sprite.update();
  }

  move() {
    if (this.sprite.dtMove < SELECTOR_MOVE_DELAY) { return null; }

    if (kontra.keys.pressed(PLAYER_PRESETS[0].controls.down)) {
      this.sprite.index += 1;
      if (this.sprite.index === MENU_POSITIONS.length) { this.sprite.index = 0; }
    } else if (kontra.keys.pressed(PLAYER_PRESETS[0].controls.up)) {
      this.sprite.index -= 1;
      if (this.sprite.index === -1) { this.sprite.index = MENU_POSITIONS.length - 1; }
    } else {
      return;
    }

    playSelectSound();
    this.sprite.x = MENU_POSITIONS[this.sprite.index].x;
    this.sprite.y = MENU_POSITIONS[this.sprite.index].y;
    this.sprite.dtMove = 0;
  }

  select() {
    if (kontra.keys.pressed(PLAYER_PRESETS[0].controls.shoot)) {
      loadMap(MENU_POSITIONS[this.sprite.index].name);
    };
  }

  timePasses() {
    this.sprite.dtMove += 1/60;
  }

  isAlive() {
    return this.sprite.isAlive();
  }

}
