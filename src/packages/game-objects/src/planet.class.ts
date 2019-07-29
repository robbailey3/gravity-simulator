import { Canvas } from '../../canvas';
import { Vector } from '../../game-engine';
import { GameObject } from './game-object.class';

export class Planet extends GameObject {
  public previousPositions: Vector[] = [];
  constructor(
    position: Vector,
    radius: number,
    mass: number,
    public velocity: Vector,
    canvas: Canvas
  ) {
    super(position, radius, mass, canvas);
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
      '#fafafa',
      {
        shadowBlur: 10,
        shadowColor: '#ccc',
        shadowOffsetX: 0,
        shadowOffsetY: 1
      }
    );
    for (const pos of this.previousPositions) {
      this.canvas.fillCircle(pos.x, pos.y, 1, '#fff');
    }
  }
  /**
   * Move the object according to its current velocity vector
   */
  public move() {
    this.previousPositions.push(this.position);
    if (this.previousPositions.length > 100) {
      this.previousPositions.shift();
    }
    this.position = this.position.add(this.velocity);
    console.log(this);
  }
}
