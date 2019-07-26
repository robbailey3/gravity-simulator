export class Canvas {
  /**
   * The Canvas element in the DOM
   */
  public el: HTMLCanvasElement;

  /**
   * The rendering context for canvas drawing
   * @private
   */
  private ctx: CanvasRenderingContext2D;

  /**
   * The default configuration of the class
   * @private
   */
  private defaults = { backgroundColor: '#111', fillColor: '#333' };

  constructor(hostElementSelector: string = 'body') {
    this.el = document.createElement('canvas');
    document.querySelector(hostElementSelector).appendChild(this.el);
    this.ctx = this.el.getContext('2d');
  }

  /**
   *
   * This method is used to set the size of the canvas element.
   * @param width The desired width (in pixels) of the canvas element
   * @param height The desired height (in pixels) of the canvas element
   * @returns this Enables function call chaining
   */
  public setCanvasSize(width: number, height: number): this {
    this.el.width = width;
    this.el.height = height;
    return this;
  }

  /**
   * This method fills in the background of the canvas.
   * @param [color=this.defaults.backgroundColor] The fill color of
   * the background
   */
  public fillBackground(color: string = this.defaults.backgroundColor) {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.el.width, this.el.height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.el.width, this.el.height);
    this.ctx.restore();
  }

  public fillCircle(
    x: number,
    y: number,
    radius: number,
    color: string = this.defaults.fillColor,
    shadow?: CanvasShadowStyles
  ) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    if (shadow) {
      this.ctx.shadowOffsetX = shadow.shadowOffsetX;
      this.ctx.shadowOffsetY = shadow.shadowOffsetY;
      this.ctx.shadowColor = shadow.shadowColor;
      this.ctx.shadowBlur = shadow.shadowBlur;
    }
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}
