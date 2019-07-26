import { Canvas } from '../../canvas';
import { Vector } from '../../game-engine';
import { GameObject } from './game-object.class';

export class Planet extends GameObject {
  constructor(
    position: Vector,
    radius: number,
    weight: number,
    public velocity: Vector,
    canvas: Canvas
  ) {
    super(position, radius, weight, canvas);
    this.draw();
  }
  /**
   * Draw the object onto the canvas
   */
  public draw() {
    this.canvas.fillCircle(
      this.position.x,
      this.position.y,
      this.radius,
      '#fff'
    );
  }
  move() {
    this.position = this.position.add(this.velocity);
  }
}
