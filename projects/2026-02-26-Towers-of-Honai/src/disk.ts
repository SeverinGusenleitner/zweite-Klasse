export class Disk{
    private rectElement:SVGRectElement;
    private svgElement:SVGSVGElement;
    private width: number = 100;
    private readonly HEIGHT:number = 50;
    private  x:number =  155;
    private  y:number =  180;
    
    constructor(public size:number,color:string,svgId:string = "gameCanvas"){
        this.svgElement = document.getElementById(svgId)as unknown as SVGSVGElement;
        this.rectElement = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.y += 100*size/2;
        this.width *= size*0.5;
        this.rectElement.setAttribute("x",`${this.x}`);
        this.rectElement.setAttribute("y",`${this.y}`);
        this.rectElement.setAttribute("width",`${this.width}`);
        this.rectElement.setAttribute("height",`${this.HEIGHT}`);
        this.rectElement.setAttribute("fill",`${color}`);
        this.svgElement.appendChild(this.rectElement);


    }
    public updatePos(x:number,y:number){
        this.x = x;
        this.y = y;
        this.rectElement.setAttribute("x", `${x}`);
        this.rectElement.setAttribute("y", `${y}`);
        
    }
}