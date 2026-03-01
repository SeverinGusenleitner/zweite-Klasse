import { Disk } from './disk';
export class Game {
  private stackOfStacks: Disk[][] = [];
  private moves: number = 0;
  private svgElement: SVGSVGElement;
  private output: HTMLSpanElement;
  private move = {
    start: -1,
    end: -1,
  }
  constructor(svgId: string = 'gameCanvas', outId: string = 'moves') {
    this.svgElement = document.getElementById(svgId) as unknown as SVGSVGElement;
    this.output = document.getElementById(outId) as HTMLSpanElement;
    this.createTowersAndBase();
    this.createInitialStack();

  }
  private createInitialStack() {
    const stack = [];
    for (let i = 4; i >= 1; i--) {
      const disk = new Disk(i, 'blue');
      stack.push(disk);
    }
    this.stackOfStacks.push(stack);
    this.stackOfStacks.push([]);
    this.stackOfStacks.push([]);
    this.stackOfStacks.push([]);
  }
  private checkWin() {}
  private createTowersAndBase() {
    const woodbase = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
    woodbase.setAttribute('height', '30px');
    woodbase.setAttribute('width', '800px');
    woodbase.setAttribute('x', '0');
    woodbase.setAttribute('y', '430');
    woodbase.setAttribute('fill', '#5C4033');
    this.svgElement.appendChild(woodbase);
    for (let i = 0; i < 3; i++) {
      const pillar = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
      pillar.setAttribute('height', '380px');
      pillar.setAttribute('width', '15px');
      pillar.setAttribute('x', `${240 * i + 155}px`);
      pillar.setAttribute('y', `${50}px`);
      pillar.setAttribute('fill', '#94A3B8');
      this.svgElement.appendChild(pillar);
    }
  }

  public handleInput(button:number) {

    if(this.move.start === -1){
      this.move.start = button;
    }
    else if(this.move.end ===-1){
      this.move.end = button;
    }
    
    if(this.move.start !== -1 && this.move.end !== -1){
      this.moveDisk(this.move.start,this.move.end);
      this.move.start = -1;
      this.move.end = -1;
    }
  }
  private moveDisk(start: number, end: number) {

    if (typeof start !== 'number' || typeof end !== 'number' || start === end || this.stackOfStacks[start - 1]?.length === 0) {
      alert('Invalid input or move!');
      return;
    }

    const fromStack = this.stackOfStacks[start];
    const toStack = this.stackOfStacks[end];

    if (!fromStack || !toStack) {
      alert('Invalid move! One of the stacks does not exist.');
      return;
    }

    const disk = fromStack[fromStack.length - 1]; // Peek at the top disk
    if (disk === null || disk === undefined) {
      alert('Invalid move! The disk is null or undefined.');
      return;
    }

    if (toStack.length && !(disk < (toStack[toStack.length - 1] ?? Infinity))) {
      alert('Invalid move! You cannot place a larger disk on a smaller one.');
      return;
    }

    fromStack.pop();
    toStack.push(disk); // Pop and push only if valid

  }
  public reset() {
    this.stackOfStacks = [];
    this.createInitialStack();
    this.moves = 0;
    this.output.textContent = 'Moves';
  }
}
