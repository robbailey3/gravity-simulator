import { Vector } from '../../game-engine';
import { Canvas } from '../../canvas';

export abstract class GameObject {
  public velocity: Vector;
  constructor(
    public position: Vector,
    public radius: number,
    public weight: number,
    public canvas: Canvas
  ) {}
  /**
   * Draw the object onto the canvas;
   * @abstract
   */
  public abstract draw();

  /**
   *
   * Move the object on the canvas.
   * @abstract
   */
  public abstract move();
}
