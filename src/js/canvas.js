import utils from './utils'
import * as dat from "dat.gui";


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;

const gui = new dat.GUI();

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
})

const wave = {
  y:innerHeight/2,
  length: 0.01,
  amplitude: 100,
  frequency: 0.01,
}
const strokeColor = {
  h: 200,
  s: 50,
  l: 50
};
const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01,
};

const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, innerHeight);
waveFolder.add(wave, 'length', -0.03, 0.03);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.02, 0.02);

const strokeColorFolder = gui.addFolder('stroke color');
strokeColorFolder.add(strokeColor, 'h', 0, 255);
strokeColorFolder.add(strokeColor, 's', 0, 100);
strokeColorFolder.add(strokeColor, 'l', 0, 100);

const backgroundColorFolder = gui.addFolder('background color');
backgroundColorFolder.add(backgroundColor, 'r', 0, 255);
backgroundColorFolder.add(backgroundColor, 'g', 0, 255);
backgroundColorFolder.add(backgroundColor, 'b', 0, 255);
backgroundColorFolder.add(backgroundColor, 'a', 0, 0.02);

// Animation Loop
let increment = 0;
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  c.beginPath();
  c.moveTo(0, innerHeight/2);
  for (let i = 0; i < innerWidth; i++) {
    c.lineTo(i, wave.y + Math.sin(i*wave.length + increment)*wave.amplitude*Math.sin(increment));
  }

  c.strokeStyle = `hsl(${Math.abs(Math.sin(increment)*strokeColor.h)}, ${strokeColor.s}%, ${strokeColor.l}%)`;
  c.stroke();
  increment += wave.frequency;
}

animate()
