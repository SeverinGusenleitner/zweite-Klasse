abstract class Circle {
  protected circleElement: SVGCircleElement;
  private canvas: SVGSVGElement;
  constructor(
    protected x: number,
    protected y: number,
    protected rad: number,
    canvasId = 'canvas',
  ) {
    this.canvas = document.getElementById(canvasId) as unknown as SVGSVGElement;
    this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circleElement.setAttribute('cx', `${this.x}`);
    this.circleElement.setAttribute('cy', `${this.y}`);
    this.circleElement.setAttribute('r', `${this.rad}`);
    this.canvas.appendChild(this.circleElement);
  }
  public changePos(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.circleElement.setAttribute('cx', `${this.x}`);
    this.circleElement.setAttribute('cy', `${this.y}`);
  }
  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }
  public getR(): number {
    return this.rad;
  }
}
class PlayerCircle extends Circle {
  constructor(x: number, y: number, rad: number) {
    super(x, y, rad);
    this.circleElement.classList.add('normal');
  }
  public isPointInside(x: number, y: number): boolean {
    const dx = this.x - x;
    const dy = this.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < this.rad;
  }
  public addClass(classname: string) {
    this.circleElement.classList = '';
    this.circleElement.classList.add(classname);
  }
  public isCirclePartiallyInside(x: number, y: number, rad: number): boolean {
    const dx = this.x - x;
    const dy = this.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    return dist < this.rad + rad;
  }
}
class GoalCircle extends Circle {
  constructor(x: number, y: number, rad: number) {
    super(x, y, rad);
    this.circleElement.classList.add('goal');
  }
  public isCircleFullyInside(circle: Circle): boolean {
    const x = circle.getX();
    const y = circle.getY();
    const r = circle.getR();
    const dx = this.x - x;
    const dy = this.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist + r < this.rad;
  }
}
export { PlayerCircle, GoalCircle };
