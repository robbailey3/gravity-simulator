import { Canvas, GameEngine, Planet, Sun, Vector } from './packages';
import './styles/styles.scss';

const canvas = new Canvas();
const engine = new GameEngine(canvas);
canvas.setCanvasSize(window.innerWidth, window.innerHeight);

const planetMassInput = document.getElementById(
  'planet-mass'
) as HTMLInputElement;

const planetMassDisplay = document.getElementById('planet-mass-exp');

const planetRadiusInput = document.getElementById(
  'planet-radius'
) as HTMLInputElement;

const planetRadiusDisplay = document.getElementById('planet-radius-value');

const planetTrailInput = document.getElementById(
  'planet-trail'
) as HTMLInputElement;

const planetTrailDisplay = document.getElementById('planet-trail-value');

const planetColorInput = document.getElementById(
  'planet-color'
) as HTMLInputElement;

const planetColorDisplay = document.getElementById('planet-color-value');

const sunMassInput = document.getElementById('sun-mass') as HTMLInputElement;

const sunMassDisplay = document.getElementById('sun-mass-exp');

const sunRadiusInput = document.getElementById(
  'sun-radius'
) as HTMLInputElement;

const sunRadiusDisplay = document.getElementById('sun-radius-value');

const gravityVisToggle = document.getElementById(
  'gravity-vis'
) as HTMLInputElement;

const forceVectorToggle = document.getElementById(
  'force-vector'
) as HTMLInputElement;

const createDefaultPlanets = (cv: Canvas) => {
  const sun = new Sun(
    new Vector(window.innerWidth / 2, window.innerHeight / 2, 0),
    15,
    1.989e30,
    cv
  );
  const earth = new Planet(
    new Vector(window.innerWidth / 2 - 200, window.innerHeight / 2, 0),
    5,
    5e12,
    new Vector(0, 5.159, 0),
    cv,
    '#0077be'
  );
  earth.trailLength = 2;
  engine.gameObjects.push(earth);

  const jupiter = new Planet(
    new Vector(window.innerWidth / 2 + 250, window.innerHeight / 2, 0),
    10,
    5e14,
    new Vector(0, 4.122, 0),
    cv,
    '#cc1142'
  );
  jupiter.trailLength = 2;
  engine.gameObjects.push(sun, earth, jupiter);
};

createDefaultPlanets(canvas);

planetMassInput.addEventListener('change', () => {
  planetMassDisplay.innerText = planetMassInput.value;
});

planetRadiusInput.addEventListener('change', () => {
  const scale = 5e4;
  const num = parseInt(planetRadiusInput.value, 10) * scale;
  planetRadiusDisplay.innerHTML = `${num.toExponential(1)}m`;
});

planetTrailInput.addEventListener('change', () => {
  planetTrailDisplay.innerText = planetTrailInput.value;
});

planetColorInput.addEventListener('change', () => {
  planetColorDisplay.innerText = planetColorInput.value;
});

sunMassInput.addEventListener('change', () => {
  sunMassDisplay.innerText = sunMassInput.value;
});

gravityVisToggle.addEventListener('change', () => {
  engine.showGravityVisualisation = gravityVisToggle.checked;
});

sunRadiusInput.addEventListener('change', () => {
  const scale = 5e4;
  const num = parseInt(sunRadiusInput.value, 10) * scale;
  sunRadiusDisplay.innerHTML = `${num.toExponential(1)}m`;
});

forceVectorToggle.addEventListener('change', () => {
  engine.showForceVector = forceVectorToggle.checked;
});

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
  const planetMass = Math.pow(10, parseInt(planetMassInput.value, 10));
  const sunRadius = parseInt(sunRadiusInput.value, 10);
  const sunMass = Math.pow(10, parseInt(sunMassInput.value, 10));

  engine.isDragging = false;
  engine.dragPosition = undefined;

  const deltaX = ($event.clientX - clickPosition.x) / 10;
  const deltaY = ($event.clientY - clickPosition.y) / 10;

  // Check if the user is pressing the CTRL key
  if ($event.ctrlKey) {
    const sun = new Sun(
      new Vector($event.clientX, $event.clientY, 0),
      sunRadius,
      sunMass,
      canvas
    );
    engine.gameObjects.push(sun);
  } else {
    const planet = new Planet(
      new Vector($event.clientX, $event.clientY, 0),
      planetRadius,
      planetMass,
      new Vector(deltaX, deltaY, 0),
      canvas,
      planetColorInput.value
    );
    planet.trailLength = parseInt(planetTrailInput.value, 10);
    engine.gameObjects.push(planet);
  }
});
