export abstract class Animal {
  protected readonly outerDiv = document.getElementById('canvas');
  protected animal: HTMLImageElement;
  protected x: number;
  protected y: number;
  protected readonly width: number = 100;
  protected readonly height: number = 100;
  constructor(x: number, y: number, image: string) {
    this.x = x;
    this.y = y;

    this.animal = document.createElement('img');
    this.animal.src = image;
    this.animal.style.width = `${this.width}px`;
    this.animal.style.height = `${this.height}px`;
    this.animal.classList.add('animal');
    this.animal.style.top = `${this.y}`;
    this.animal.style.left = `${this.x}`;
    this.animal.style.position = 'absolute';
    this.outerDiv!.appendChild(this.animal);
  }
  draw(): void {
    this.animal.style.top = `${this.y}px`;
    this.animal.style.left = `${this.x}px`;
  }
  abstract update(): void;
}

export class Dog extends Animal {
  private vx: number;
  constructor(x: number, y: number, image: string, vx: number) {
    super(x, y, image);
    this.vx = vx;
  }
  update() {
    const width = this.outerDiv?.clientWidth;
    this.x += this.vx;
    if (this.x > width!-this.width || this.x < 0) {
      this.vx = -this.vx;
    }
  }
}

export class Cat extends Animal {
  private vy: number;
  constructor(x: number, y: number, image: string, vy: number) {
    super(x, y, image);
    this.vy = vy;
  }

  update() {
    const height = this.outerDiv?.clientHeight;
    this.y += this.vy;
    if (this.y > height! -this.width|| this.y < 0) {
      this.vy = -this.vy;
    }
  }
}
