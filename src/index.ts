import { Canvas, GameEngine, Planet, Vector, BlackHole } from './packages';
import './styles/styles.scss';

const canvas = new Canvas();
const engine = new GameEngine(canvas);
canvas.setCanvasSize(window.innerWidth, window.innerHeight);
canvas.fillBackground();

// canvas.fillCircle(window.innerWidth / 2, window.innerHeight / 2, 25, '#000', {
//   shadowBlur: 10,
//   shadowColor: '#fff',
//   shadowOffsetX: 0,
//   shadowOffsetY: 0
// });
let mouseStart;
canvas.el.addEventListener('mousedown', ($event) => {
  mouseStart = { x: $event.clientX, y: $event.clientY };
});
canvas.el.addEventListener('mouseup', ($event) => {
  const deltaX = ($event.clientX - mouseStart.x) / 10;
  const deltaY = ($event.clientY - mouseStart.y) / 10;
  console.log(deltaX, deltaY);
  const planet = new Planet(
    new Vector($event.clientX, $event.clientY, 0),
    3,
    1000,
    new Vector(deltaX, deltaY, 0),
    canvas
  );

  engine.gameObjects.push(planet);
});
