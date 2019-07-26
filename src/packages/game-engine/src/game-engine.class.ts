import { GameObject } from '../../game-objects/';
import { Canvas } from '../../canvas';

export class GameEngine {
  public gameObjects: GameObject[] = [];
  constructor(public canvas: Canvas) {
    this.animate();
  }
  animate() {
    this.canvas.fillBackground('#000');
    this.gameObjects.forEach((gameObject) => {
      gameObject.move();
      gameObject.draw();
    });
    // requestAnimationFrame(() => {
    //   this.animate.apply(this);
    // });
    const interval = setInterval(() => {
      this.animate();
      clearInterval(interval);
    }, 5000);
  }
}
