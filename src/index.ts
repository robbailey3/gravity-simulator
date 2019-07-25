import { Canvas, Vector } from './packages';
import './styles/styles.scss';

const canvas = new Canvas();
// canvas.setCanvasSize(window.innerWidth, window.innerHeight);
const v1 = new Vector(2, 3, 4);
console.log(v1.dot(new Vector(5, 6, 7)));
