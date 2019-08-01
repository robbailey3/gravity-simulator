import { Canvas } from '../../canvas';
import { Vector } from '../../game-engine';
import { GameObject } from './game-object.class';

/**
 * Class for Sun Objects. Very similar to the Planet objects
 *
 * @export
 * @class Sun
 */
export class Sun extends GameObject {
  constructor(
    position: Vector,
    radius: number,
    weight: number,
    canvas: Canvas
  ) {
    super(position, radius, weight, canvas);
    this.draw();
    this.velocity = new Vector(0, 0, 0);
  }
  /**
   * Draws the object onto the canvas
   */
  public draw(): void {
    this.canvas.fillCircle(
      this.position.x,
      this.position.y,
      this.radius,
      '#FDB813'
      // {
      //   shadowBlur: 1,
      //   shadowColor: '#FDB813',
      //   shadowOffsetX: 0,
      //   shadowOffsetY: 0
      // }
    );
  }
  /**
   * Changes the position of the object.
   */
  public move(): void {
    this.position = this.position.add(this.velocity);
  }
}
