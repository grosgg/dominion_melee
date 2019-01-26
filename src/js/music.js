const ac = new AudioContext();

const shootSound = [
  'C5 e',
  'A6 q'
];

let shootSequence = new TinyMusic.Sequence( ac, 600, shootSound );

shootSequence.staccato = 0.05;
shootSequence.smoothing = 1;
shootSequence.gain.gain.value = 0.8;
shootSequence.loop = false;

function playShootSound() {
  shootSequence.play( ac.currentTime );
}

const hitWallSound = [
  'A1 s',
  'A2 e'
];

let hitWallSequence = new TinyMusic.Sequence( ac, 800, hitWallSound );

hitWallSequence.staccato = 1;
hitWallSequence.smoothing = 1;
hitWallSequence.gain.gain.value = 0.6;
hitWallSequence.loop = false;

function playHitWallSound() {
  hitWallSequence.play( ac.currentTime );
}

const dieSound = [
  'D2 q',
  'C1 q',
  'B0 q',
  'A0 w',
];

let dieSequence = new TinyMusic.Sequence( ac, 600, dieSound );

dieSequence.staccato = 0.1;
dieSequence.smoothing = 0;
dieSequence.gain.gain.value = 1.0;
dieSequence.loop = false;

function playDieSound() {
  dieSequence.play( ac.currentTime );
}

const potionSound = [
  'A6 q',
  'B0 q'
];

let potionSequence = new TinyMusic.Sequence( ac, 600, potionSound );

potionSequence.staccato = 0.15;
potionSequence.smoothing = 1;
potionSequence.gain.gain.value = 0.8;
potionSequence.loop = false;

function playPotionSound() {
  potionSequence.play( ac.currentTime );
}

const startSound = [
  'D3 q',
  'B3 q',
  'A3 h',
];

let startSequence = new TinyMusic.Sequence( ac, 600, startSound );

startSequence.staccato = 0.1;
startSequence.smoothing = 0;
startSequence.gain.gain.value = 0.8;
startSequence.loop = false;

function playStartSound() {
  startSequence.play( ac.currentTime );
}

const selectSound = [
  'A4 e',
];

let selectSequence = new TinyMusic.Sequence( ac, 600, selectSound );

selectSequence.staccato = 0.1;
selectSequence.smoothing = 0;
selectSequence.gain.gain.value = 0.8;
selectSequence.loop = false;

function playSelectSound() {
  selectSequence.play( ac.currentTime );
}