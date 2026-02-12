export abstract class Shape {
  protected list: HTMLUListElement
  protected element: HTMLLIElement;
  
  constructor(shapesListId:string = "shapes-list") {
    this.element = document.createElement('li') as HTMLLIElement;
    this.list = document.getElementById(shapesListId) as HTMLUListElement;
    this.list.appendChild(this.element);
  }

  abstract get description(): string;
  public calculateArea(): number {
    return 0;
  }
}

export class Rectangle extends Shape {
  constructor(private width: number, private height: number,shapesListId:string = "shapes-list") {
    super(shapesListId);
    this.element.textContent = this.description;
  }

  override get description(): string {
    return `Rectangle(width: ${this.width}, height: ${this.height}) with Area: ${this.calculateArea()}`;
  }

  calculateArea(): number {
    return this.width * this.height;
  }
}

export class Square extends Rectangle {
  constructor(private size: number,shapesListId:string = "shapes-list") {
    super(size, size);
    this.element.textContent = this.description;
  }

  override get description(): string {
    return `Square(size: ${this.size}) with Area: ${this.calculateArea()}`;
  }
}

export class Ellipse extends Shape {
  constructor(private Xrad: number, private Yrad: number) {
    super();
    this.element.textContent = this.description;
  }

  override get description(): string {
    return `Ellipse(Xrad: ${this.Xrad}, Yrad: ${this.Yrad}) with Area: ${this.calculateArea()}`;
  }

  calculateArea(): number {
    return Math.round(this.Xrad * this.Yrad * Math.PI);
  }
}

export class Circle extends Ellipse {
  constructor(private rad: number) {
    super(rad, rad);
    this.element.textContent = this.description;
  }

  override get description(): string {
    return `Circle(rad: ${this.rad}) with Area: ${this.calculateArea()}`;
  }
}

export class Line extends Shape {
  constructor(private length: number) {
    super();
    this.element.textContent = this.description;
  }

  override get description(): string {
    return `Line(length: ${this.length}) with Area: ${this.calculateArea()}`;
  }

  calculateArea(): number {
    return this.length;
  }
}
