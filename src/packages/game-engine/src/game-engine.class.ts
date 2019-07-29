import { Canvas } from '../../canvas';
import { GameObject } from '../../game-objects/';
import { Vector } from './vector.class';

export class GameEngine {
  public gameObjects: GameObject[] = [];
  public isDragging: boolean = false;
  public clickPosition: Vector;
  public dragPosition: Vector;
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
    if (this.isDragging) {
      this.canvas.drawLine(
        this.clickPosition,
        this.dragPosition || this.clickPosition
      );
    }
    this.cleanUpCanvas();
    requestAnimationFrame(() => {
      this.animate();
    });
    // const interval = setInterval(() => {
    //   clearInterval(interval);
    //   this.animate();
    // }, 100);
  }
  cleanUpCanvas() {
    for (const gameObject of this.gameObjects) {
      if (
        gameObject.position.x > this.canvas.el.width ||
        gameObject.position.x < 0
      ) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
      }
      if (
        gameObject.position.y > this.canvas.el.height ||
        gameObject.position.y < 0
      ) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
      }
    }
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
          51470 *
          Math.sqrt(
            Math.pow(a.position.x - b.position.x, 2) +
              Math.pow(a.position.y - b.position.y, 2)
          );
        const BAUnitVector = b.position.minus(a.position).normalize();
        const force = BAUnitVector.times(
          (this.constants.G * b.mass) / scalarDistanceBetween ** 3
        );
        a.velocity = a.velocity.add(force);
      }
    }
  }
}
