import { Canvas } from '../../canvas';
import { Vector } from '../../game-engine';
import { GameObject } from './game-object.class';

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
    console.log(this);
  }
  public draw() {
    this.canvas.fillCircle(
      this.position.x,
      this.position.y,
      this.radius,
      '#FDB813',
      {
        shadowBlur: 50,
        shadowColor: '#FDB813',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
    );
  }
  public move() {
    this.position = this.position.add(this.velocity);
  }
}
