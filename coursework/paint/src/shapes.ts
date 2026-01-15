export abstract class Shape {
  constructor(protected svgContainer: SVGSVGElement, protected start: Point) {}
}

export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export class Circle extends Shape {
  private center: Point = { x: 0, y: 0 };
  private radius = 100;

  constructor(svgContainer: SVGSVGElement, protected start: Point) {
    super(svgContainer, start);
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleElement.setAttribute('r', `100`);
    circleElement.setAttribute('cx', `${start.x}`);
    circleElement.setAttribute('cy', `${start.y}`);
    circleElement.setAttribute('fill', 'red');
    svgContainer.appendChild(circleElement);
  }
}

export class Rectangle extends Shape {
  private position: Point = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };

  constructor(svgContainer: SVGSVGElement, protected start: Point) {
    super(svgContainer, start);
    const circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    circleElement.setAttribute('x', `${start.x}`);
    circleElement.setAttribute('y', `${start.y}`);
    circleElement.setAttribute('width', `${100}`);
    circleElement.setAttribute('height', `${100}`);

    svgContainer.appendChild(circleElement);
  }
}
