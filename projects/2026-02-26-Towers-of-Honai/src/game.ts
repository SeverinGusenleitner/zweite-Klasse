export class Game {
  private stack: number[][] = [];
  private svgElement: SVGSVGElement;
  private output: HTMLSpanElement;
  constructor(svgId: string = 'gameCanvas', outId: string = 'moves') {
    this.svgElement = document.getElementById(svgId) as unknown as SVGSVGElement;
    this.output = document.getElementById(outId) as HTMLSpanElement;
    this.createInitialStack();
    this.createTowersAndBase();
    this.drawStack();
  }
  private createInitialStack() {
    this.stack.push([4, 3, 2, 1]);
  }
  private checkWin() {
    if (
      this.stack[this.stack.length - 1]![0] === 4 &&
      this.stack[this.stack.length - 1]![1] === 3 &&
      this.stack[this.stack.length - 1]![2] === 2 &&
      this.stack[this.stack.length - 1]![3] === 1
    ) {
      return true;
    } else {
      return false;
    }
  }
  private drawStack() {}
  private createTowersAndBase() {
    const woodbase = document.createElementNS("http://www.w3.org/2000/svg","rect") as SVGRectElement;
    woodbase.setAttribute("height","30px");
    woodbase.setAttribute("width","800px");
    woodbase.setAttribute("x","0");
    woodbase.setAttribute("y","430");
    woodbase.setAttribute("fill","#5C4033");
    this.svgElement.appendChild(woodbase);
    for(let i = 0; i <3; i++){
        const pillar = document.createElementNS("http://www.w3.org/2000/svg","rect") as SVGRectElement;
        pillar.setAttribute("height","380px");
        pillar.setAttribute("width","15px");
        pillar.setAttribute("x",`${240*i+155}px`);
        pillar.setAttribute("y",`${50}px`);
        pillar.setAttribute("fill","#94A3B8");
        this.svgElement.appendChild(pillar);

    }
  }
  private checkValid() {}


  public handleInput(button: number) {}
  public reset() {}
}
