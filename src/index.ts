import { Canvas, GameEngine, Planet, Vector } from './packages';
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

canvas.el.addEventListener('click', ($event) => {
  const planet = new Planet(
    new Vector($event.clientX, $event.clientY, 0),
    5,
    200,
    new Vector(5, 5, 0),
    canvas
  );
  engine.gameObjects.push(planet);
  console.log(engine.gameObjects);
});
