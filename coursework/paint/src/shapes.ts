export abstract class Shape {
  constructor(
    protected svgContainer: SVGSVGElement,
    protected start: Point,
  ) {}
  public abstract updatePosition(start: Point, end: Point): void;
  public abstract set tempMode(isTemp: boolean);
  public abstract contains(p: Point): boolean;
  public abstract set selected(isSelected:boolean);
  public abstract unselect():void;

  
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
  private circleElement: SVGCircleElement;

  constructor(
    svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.circleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    svgContainer.appendChild(this.circleElement);
  }
  public override updatePosition(start: Point, end: Point): void {
    this.radius = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y));
    this.center = start;
    this.circleElement.setAttribute('r', `${this.radius}`);
    this.circleElement.setAttribute('cx', `${this.center.x}`);
    this.circleElement.setAttribute('cy', `${this.center.y}`);
  }
  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.circleElement.classList.add('temp');
    } else {
      this.circleElement.classList.remove('temp');
    }
  }
  public override contains(p: Point): boolean {
    const dist = Math.sqrt((p.x - this.center.x) * (p.x - this.center.x) + (p.y - this.center.y) * (p.y - this.center.y));
    return dist <= this.radius;
  }
  public override set selected(isSelected:boolean){
    if(isSelected){
      this.circleElement.classList.add("selected");
    }
    else{
      this.circleElement.classList.remove("selected");
      
    }
  }
   public override unselect(): void {
     this.circleElement.classList.remove("selected")
   }
}

export class Rectangle extends Shape {
  private rectElement: SVGRectElement;
  private position: Point = { x: 0, y: 0 };
  private size: Size = { width: 0, height: 0 };

  constructor(
    svgContainer: SVGSVGElement,
    protected start: Point,
  ) {
    super(svgContainer, start);
    this.rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.rectElement.setAttribute('x', `${start.x}`);
    this.rectElement.setAttribute('y', `${start.y}`);
    this.rectElement.setAttribute('width', `${this.size.width}`);
    this.rectElement.setAttribute('height', `${this.size.height}`);

    svgContainer.appendChild(this.rectElement);
  }
  public override updatePosition(start: Point, end: Point): void {
    this.size.width = Math.max(end.x, start.x) - Math.min(end.x, start.x);
    this.size.height = Math.max(end.y, start.y) - Math.min(end.y, start.y);
    this.position.x = Math.min(start.x, end.x);
    this.position.y = Math.min(start.y, end.y);
    this.rectElement.setAttribute('x', `${this.position.x}`);
    this.rectElement.setAttribute('y', `${this.position.y}`);
    this.rectElement.setAttribute('width', `${this.size.width}`);
    this.rectElement.setAttribute('height', `${this.size.height}`);
  }
  public override set tempMode(isTemp: boolean) {
    if (isTemp) {
      this.rectElement.classList.add('temp');
    } else {
      this.rectElement.classList.remove('temp');
    }
  }

  public override contains(p: Point): boolean {
    return p.x >= this.position.x && p.x <= this.position.x + this.size.width && p.y > this.position.y && p.y < this.position.y + this.size.height;
  }
    public override set selected(isSelected:boolean){
    if(isSelected){
      this.rectElement.classList.add("selected");
    }
    else{
      this.rectElement.classList.remove("selected");
      
    }
  }
     public override unselect(): void {
     this.rectElement.classList.remove("selected")
   }
}
