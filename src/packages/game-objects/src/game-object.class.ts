import { Canvas } from '../../canvas';
import { Vector } from '../../game-engine';

/**
 * The parent class for all GameObjects
 * This class contains methods which will be
 * used in all derivative classes.
 *
 * @export
 * @abstract
 * @class GameObject
 */
export abstract class GameObject {
  /**
   * The velocity of the object (contains X, Y and Z components)
   * so direction is included.
   */
  public velocity: Vector;
  constructor(
    public position: Vector,
    public radius: number,
    public mass: number,
    public canvas: Canvas
  ) {}
  /**
   * Draw the object onto the canvas;
   * @abstract
   */
  public abstract draw(): void;

  /**
   *
   * Move the object on the canvas.
   * @abstract
   */
  public abstract move(): void;
}
