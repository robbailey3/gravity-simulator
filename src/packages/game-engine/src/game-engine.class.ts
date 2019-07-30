import { Canvas } from '../../canvas';
import { GameObject, Planet, Sun } from '../../game-objects/';
import { Vector } from './vector.class';

/**
 * The main wrapper class for the Game Engine (i.e. controls
 * the animation and moving of the game).
 * @export
 * @class GameEngine
 */
export class GameEngine {
  /**
   * An array containing the GameObjects
   */
  public gameObjects: GameObject[] = [];

  /**
   * Whether the user has clicked and is dragging
   * the cursor across the screen.
   */
  public isDragging: boolean = false;

  /**
   * The position of the user's click
   */
  public clickPosition: Vector;

  /**
   * The position the user has dragged the cursor to.
   */
  public dragPosition: Vector;

  /**
   * Whether we should render the Force Vector line
   * on the canvas.
   */
  public showForceVector: boolean = false;

  /**
   * An object containing some constants such as Newton's
   * Gravitational Constant (G).
   * @private
   */
  private constants = {
    G: 6.67e-11
  };
  constructor(public canvas: Canvas) {
    this.animate();
  }
  /**
   * This method controls the animation and is called via requestAnimationFrame.
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
  }
  /**
   * Draw a line to represent the net force currently
   * operating on an object
   * @param position
   * @param force
   */
  public drawForceVector(position: Vector, force: Vector) {
    this.canvas.drawLine(position, position.add(force), '#ff0000');
  }
  /**
   * This method checks
   * @private
   * @param a - The first Game Object to check
   * @param b - The second object to check
   * @returns
   */
  private detectCollision(a: GameObject, b: GameObject) {
    if (!a || !b) {
      return false;
    }
    if (
      a.position.x >= b.position.x - b.radius &&
      a.position.x <= b.position.x + b.radius &&
      a.position.y >= b.position.y - b.radius &&
      a.position.y <= b.position.y + b.radius
    ) {
      return true;
    }
    return false;
  }
  /**
   *
   * This method removes any objects which are no longer on the screen.
   * @private
   */
  private cleanUpCanvas() {
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

  /**
   * This method calculates the force applied on each object
   * by every other object. It removes the smaller of the two objects
   * when they collide and amends the object velocity if not.
   * @private
   * @returns {void} Nothing
   */
  private calculateObjectForces(): void {
    for (let i = 0; i < this.gameObjects.length; i += 1) {
      for (let j = 0; j < this.gameObjects.length; j += 1) {
        if (i === j) {
          // If i is the same object as j, the force would be infinite.
          // We don't want that, so we skip it.
          continue;
        }
        const a = this.gameObjects[i];
        const b = this.gameObjects[j];
        if (this.detectCollision(a, b)) {
          this.gameObjects.splice(
            this.gameObjects.indexOf(a.mass > b.mass ? b : a),
            1
          );
          return;
        }
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
        if (this.showForceVector) {
          if (a instanceof Planet) {
            this.drawForceVector(a.position, force.times(1000));
          }
        }
        a.velocity = a.velocity.add(force);
      }
    }
  }
}
