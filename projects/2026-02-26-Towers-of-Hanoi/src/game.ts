import { Disk } from './disk';
export class Game {
  private stackOfStacks: Disk[][] = [];
  private moves: number = 0;
  private svgElement: SVGSVGElement;
  private output: HTMLSpanElement;
  private move = {
    start: -1,
    end: -1,
  };
  constructor(svgId: string = 'gameCanvas', outId: string = 'moves') {
    this.svgElement = document.getElementById(svgId) as unknown as SVGSVGElement;
    this.output = document.getElementById(outId) as HTMLSpanElement;
    this.createTowersAndBase();
    this.createInitialStack();
  }
  private createInitialStack() {
    const colors: string[] = ['#F97316', '#EAB308', '#22C55E', '#06B6D4', '#6366F1'];
    const stack = [];
    this.stackOfStacks = [];
    for (let i = 4; i >= 1; i--) {
      const disk = new Disk(i, colors[i]!);
      stack.push(disk);
    }
    this.stackOfStacks.push(stack);
    this.stackOfStacks.push([]);
    this.stackOfStacks.push([]);
  }
  private checkWin() {
    for(let i = 0; i<4; i++){
      if(this.stackOfStacks[2]![i] === undefined){
        return false;
      }
    }
    return true;
  }
  private createTowersAndBase() {
    const woodbase = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
    woodbase.setAttribute('height', '30px');
    woodbase.setAttribute('width', '1000px');
    woodbase.setAttribute('x', '0');
    woodbase.setAttribute('y', '430');
    woodbase.setAttribute('fill', '#5C4033');
    this.svgElement.appendChild(woodbase);
    for (let i = 0; i < 3; i++) {
      const pillar = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGRectElement;
      pillar.setAttribute('height', '380px');
      pillar.setAttribute('width', '15px');
      pillar.setAttribute('x', `${i * 250 + 250 - 7.5}px`);
      pillar.setAttribute('y', `${50}px`);
      pillar.setAttribute('fill', '#94A3B8');
      this.svgElement.appendChild(pillar);
    }
  }

  public handleInput(button: number) {
    if (this.move.start === -1) {
      const stack = this.stackOfStacks[button];
      if(stack?.length === 0){
        return
      }
      this.move.start = button;
      if (stack![stack!.length - 1]) {
        stack![stack!.length - 1]!.selected = true;
      }
    } else if (this.move.end === -1) {
      this.move.end = button;
    }

    if (this.move.start !== -1 && this.move.end !== -1) {
      const stack = this.stackOfStacks[this.move.start];

      if (stack![stack!.length - 1]) {
        stack![stack!.length - 1]!.selected = false;
      }
      this.moveDisk(this.move.start, this.move.end);
      this.move.start = -1;
      this.move.end = -1;
    }
  }
  private moveDisk(start: number, end: number) {
    if (typeof start !== 'number' || typeof end !== 'number' || this.stackOfStacks[start]?.length === 0) {
      alert('Invalid input or move!');
      return;
    }
    if(start===end){
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
    if (toStack.length !== 0 && fromStack.length !== 0) {
      if (toStack[toStack.length - 1]!.size < fromStack[fromStack.length - 1]!.size) {
        alert('Invalid move! You cannot place a larger disk on a smaller one.');
        return;
      }
    }

    fromStack.pop();
    toStack.push(disk); // Pop and push only if valid
    this.moves++;
    this.calculateNewPos(start, end, disk);
    this.output.textContent = `${this.moves}`;
    if(this.checkWin()){
      for(let i = 0; i<this.stackOfStacks[2]!.length;i++){
        this.stackOfStacks[2]![i]!.won = true;
      }
    }
  }
  private calculateNewPos(start: number, end: number, disk: Disk) {
    const length = this.stackOfStacks[end]?.length;
    const y = 430 - length! * 50;
    const xMovement = end - start;
    const x = xMovement * 250;
    disk.updatePos(x, y);  }
  public reset() {
    this.stackOfStacks = [];
    this.svgElement.innerHTML = '';
    this.createTowersAndBase();
    this.createInitialStack();
    this.moves = 0;
    this.output.textContent = 'Moves';
  }
}
