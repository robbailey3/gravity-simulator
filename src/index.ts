import { Canvas, GameEngine, Planet, Sun, Vector } from './packages';
import './styles/styles.scss';

const planetMassInput = document.getElementById(
  'planet-mass'
) as HTMLInputElement;

const planetRadiusInput = document.getElementById(
  'planet-radius'
) as HTMLInputElement;

const forceVectorToggle = document.getElementById(
  'force-vector'
) as HTMLInputElement;

forceVectorToggle.addEventListener('change', () => {
  engine.showForceVector = forceVectorToggle.checked;
});

const canvas = new Canvas();
const engine = new GameEngine(canvas);
canvas.setCanvasSize(window.innerWidth, window.innerHeight);
canvas.fillBackground();
const bh = new Sun(
  new Vector(window.innerWidth / 2, window.innerHeight / 2, 0),
  40,
  1.989e30,
  canvas
);
engine.gameObjects.push(bh);

let clickPosition;
canvas.el.addEventListener('mousedown', ($event) => {
  clickPosition = new Vector($event.clientX, $event.clientY, 0);
  engine.isDragging = true;
  engine.clickPosition = clickPosition;
});
canvas.el.addEventListener('mousemove', ($event) => {
  if (engine.isDragging) {
    engine.dragPosition = new Vector($event.clientX, $event.clientY, 0);
  }
});
canvas.el.addEventListener('mouseup', ($event) => {
  const planetRadius = parseInt(planetRadiusInput.value, 10);
  const planetMass = 1 * Math.pow(10, parseInt(planetMassInput.value, 10));

  engine.isDragging = false;
  engine.dragPosition = undefined;
  const deltaX = ($event.clientX - clickPosition.x) / 10;
  const deltaY = ($event.clientY - clickPosition.y) / 10;
  if ($event.ctrlKey) {
    const sun = new Sun(
      new Vector($event.clientX, $event.clientY, 0),
      50,
      1.989e30,
      canvas
    );
    engine.gameObjects.push(sun);
  } else {
    const planet = new Planet(
      new Vector($event.clientX, $event.clientY, 0),
      planetRadius,
      planetMass,
      new Vector(deltaX, deltaY, 0),
      canvas
    );

    engine.gameObjects.push(planet);
  }
});
