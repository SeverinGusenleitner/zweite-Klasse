class Bar {
  private svgElement: SVGSVGElement;
  private barElement: SVGRectElement;
  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    svgId: string = 'canvas',
  ) {
    this.svgElement = document.getElementById(svgId) as unknown as SVGSVGElement;
    this.barElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.barElement.setAttribute('x', `${this.x}`);
    this.barElement.setAttribute('y', `${this.y}`);
    this.barElement.setAttribute('width', `${this.width}`);
    this.barElement.setAttribute('height', `${this.height}`);
    this.svgElement.appendChild(this.barElement);
  }
}
