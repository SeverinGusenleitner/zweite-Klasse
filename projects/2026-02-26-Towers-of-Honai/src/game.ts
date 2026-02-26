export class Game{
    private stack:number[][] =[];
    private svgElement:SVGSVGElement;
    private output:HTMLSpanElement;
    constructor(svgId:string = "gameCanvas",outId:string= "moves"){
        this.svgElement = document.getElementById(svgId)as unknown as SVGSVGElement;
        this.output = document.getElementById(outId) as HTMLSpanElement;

    }
    private createInitialStack(){

    }
    private drawStack(){

    }
    private createTowersAndBase(){

    }
    private checkWin(){

    }
    private checkValid(){

    }
    public handleInput(button:number){

    }
}