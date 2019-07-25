export class Canvas {
  /**
   * The Canvas element in the DOM
   */
  public el: HTMLCanvasElement;

  constructor(hostElementSelector: string = 'body') {
    this.el = document.createElement('canvas');
    document.querySelector(hostElementSelector).appendChild(this.el);
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
}
