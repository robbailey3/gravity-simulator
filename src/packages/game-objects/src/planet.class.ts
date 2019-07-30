import { Canvas } from '../../canvas';
import { Vector } from '../../game-engine';
import { GameObject } from './game-object.class';

/**
 * A class to describe the Planet GameObject
 * Planets are smaller than Suns and have movement trails
 * @export
 * @class Planet
 */
export class Planet extends GameObject {
  public previousPositions: Vector[] = [];
  public trailLength = 15;
  constructor(
    position: Vector,
    radius: number,
    mass: number,
    public velocity: Vector,
    canvas: Canvas,
    public color: string = '#e1a95f'
  ) {
    super(position, radius, mass, canvas);
    this.draw();
  }
  /**
   * Draw the object onto the canvas
   */
  public draw() {
    for (const pos of this.previousPositions) {
      this.canvas.fillCircle(pos.x, pos.y, 1, '#fff');
    }
    this.canvas.fillCircle(
      this.position.x,
      this.position.y,
      this.radius,
      this.color,
      {
        shadowBlur: 2,
        shadowColor: '#ddd',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
    );
  }
  /**
   * Move the object according to its current velocity vector
   */
  public move() {
    this.previousPositions.push(this.position);
    if (this.previousPositions.length > this.trailLength) {
      this.previousPositions.shift();
    }
    this.position = this.position.add(this.velocity);
  }
}
