export abstract class Ball {
  protected readonly box: HTMLDivElement;
  protected element: HTMLDivElement;
  protected x: number;
  protected y: number;
  protected size: number;
  protected color: string;
  protected velocityY: number;

  constructor(box: HTMLDivElement, x: number, size: number, color: string) {
    this.box = box;
    this.x = x;
    this.size = size;
    this.color = color;
    this.size = 
    this.y = 0; // Start on top

    this.velocityY = 0; // Gravity will pull us down

    this.element = document.createElement('div');
    this.element.className = 'ball';
    this.element.style.width = `${size}px`;
    this.element.style.height = `${size}px`;
    this.element.style.backgroundColor = color;
    this.box.appendChild(this.element);

    this.updatePosition();
  }

  abstract get bounciness(): number;

  protected onReachedBottom(): boolean {
    return true;
  }

  public remove(): void {
    this.element.remove();
  }

  public update(): boolean {
    const gravity = 0.5; // Downward acceleration per frame
    const minVelocity = 0.5;

    this.velocityY += gravity;
    this.y += this.velocityY;

    const boxHeight = this.box.clientHeight;
    if (this.y + this.size > boxHeight) {
      this.y = boxHeight - this.size;
      if (Math.abs(this.velocityY) > minVelocity) {
        this.velocityY = -this.velocityY * this.bounciness;

        if (!this.onReachedBottom()) {
          return false;
        }
      } else {
        this.velocityY = 0;
      }
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocityY = -this.velocityY * this.bounciness;
    }

    this.updatePosition();
    return true;
  }

  private updatePosition(): void {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}

export class GummyBall extends Ball {
  constructor(box: HTMLDivElement, x: number, size: number) {
    super(box, x, size, '#ff6b6b');
  }

  get bounciness(): number {
    return 0.6;
  }

  protected onReachedBottom(): boolean {
    // Do whatever a gummy ball does when it reaches the bottom
    this.element.style.transform = 'scaleX(1.3) scaleY(0.7)';
    setTimeout(() => {
      this.element.style.transform = 'scaleX(1) scaleY(1)';
    }, 150);
    return true;
  }
}

export class SteelBall extends Ball {
  constructor(box: HTMLDivElement, x: number, size: number) {
    super(box, x, size, '#c0c0c0');
  }

  get bounciness(): number {
    return 0.9;
  }

  protected onReachedBottom(): boolean {
    // Do whatever a steel ball does when it reaches the bottom
    return true;
  }
}

export class SwitchBall extends Ball {
  private colorArray = ['blue', 'yellow', 'DarkGoldenRod', 'aqua', 'red', 'Crimson', 'CornflowerBlue'];
  constructor(box: HTMLDivElement, x: number, size: number) {
    super(box, x, size, 'black');
  }
  get bounciness(): number {
    return 0.9;
  }
  protected onReachedBottom(): boolean {
    this.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)]!;
    this.element.style.backgroundColor = this.color;
    return true;
  }
}

export class Egg extends Ball {
  private velocityX = Math.random()*10-5;
  constructor(box: HTMLDivElement, x: number, size: number) {
    super(box, x, size, '#f2ff00ff');
  }

  get bounciness(): number {
    return 0;
  }

  override update(): boolean {
    if (!super.update()) {
      return false;
    }
    this.x += this.velocityX;
    if (this.x + this.size > this.box.clientWidth ||this.x<0) {
      this.velocityX = -this.velocityX;
    }
    return true;
  }

  protected onReachedBottom(): boolean {
    // Do whatever a steel ball does when it reaches the bottom
    const yellow = document.createElement('div');
    yellow.className = 'yellow';
    yellow.style.borderRadius = '50%';
    yellow.style.width = `${15}px`;
    yellow.style.height = `${15}px`;
    yellow.style.backgroundColor = '#ff8400ff';

    this.box.appendChild(yellow);
    this.element.appendChild(yellow);
    this.element.style.backgroundColor = 'white';
    this.color = 'white';
    this.element.classList.add('eggWhite');
    this.velocityX = 0;
    setTimeout(() => {
      this.element.remove();
    }, 1000);
    return true;
  }
}

// ...
