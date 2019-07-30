import { Vector } from './vector.class';

describe('CLASS: Vector', () => {
  describe('Basic functionality', () => {
    let v0;
    beforeAll(() => {
      v0 = new Vector(1, 2, 3);
    });
    it('should be defined', () => {
      expect(Vector).toBeDefined();
      expect(Vector).not.toBeNull();
    });
  });
  describe('Method: Cross Product', () => {
    it('should have a cross product method', () => {
      expect(Vector.prototype.cross).toBeDefined();
    });
  });
});
