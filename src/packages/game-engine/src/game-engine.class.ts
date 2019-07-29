import { Canvas } from '../../canvas';
import { GameObject } from '../../game-objects/';
import { Vector } from './vector.class';

export class GameEngine {
  public gameObjects: GameObject[] = [];
  private constants = {
    G: 6.67e-11
  };
  constructor(public canvas: Canvas) {
    this.animate();
  }
  /**
   * This method controls the animation
   */
  public animate() {
    this.canvas.fillBackground();
    this.calculateObjectForces();
    for (const gameObject of this.gameObjects) {
      gameObject.move();
      gameObject.draw();
    }
    requestAnimationFrame(() => {
      this.animate.apply(this);
    });
    // const interval = setInterval(() => {
    //   this.animate();
    //   clearInterval(interval);
    // }, 100);
  }
  private calculateObjectForces() {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      for (let j = 0; j < this.gameObjects.length; j += 1) {
        if (i === j) {
          continue;
        }
        const a = this.gameObjects[i];
        const b = this.gameObjects[j];
        const scalarDistanceBetween =
          7.5e4 *
          Math.sqrt(
            Math.pow(a.position.x - b.position.x, 2) +
              Math.pow(a.position.y - b.position.y, 2)
          );
        const BAUnitVector = b.position.minus(a.position).normalize();
        const force = BAUnitVector.times(
          (this.constants.G * b.mass) / scalarDistanceBetween ** 3
        );
        a.velocity = a.velocity.add(force);
        console.log(a, b, force);
      }
    }
  }
}
