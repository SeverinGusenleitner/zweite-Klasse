import { bubbleSort } from "./SortMethod";
import { Bar } from "./Bar";
class Chart{
    private readonly svgElement: SVGSVGElement;
    private readonly WIDTH;
    private readonly HEIGHT;
    private bars:number[] = [];
    private amountOfBars : number = 50;
    private bubbleSort = new bubbleSort();
    constructor(svgId:string = "canvas"){
        this.svgElement = document.getElementById(svgId) as unknown as SVGSVGElement;
        this.WIDTH = this.svgElement.clientWidth;
        this.HEIGHT = this.svgElement.clientHeight;
        this.randomize();
        this.draw();
    }
    public randomize(){
        this.bars = [];
        while(this.bars.length !== this.amountOfBars){
            let randomNum;
            do{
                randomNum = Math.floor(Math.random()*this.HEIGHT);
            }while(this.isAlreadyUsed(randomNum))
            this.bars.push (randomNum);
        }

    }
    public sort(sortMethod:string){
        this.bubbleSort.sort(this.bars);
        console.log(this.bars);
        this.draw();
    }
    private draw(){
        this.svgElement.innerHTML = "";
        const barWidth = this.WIDTH/this.amountOfBars;
        for(let i = 0; i<this.bars.length;i++){
            new Bar(i*barWidth,400-this.bars[i]!,barWidth,this.bars[i]!)
        }
    }
    public set(amountOfBars:number){
        this.amountOfBars = amountOfBars;
        this.randomize();
        this.draw();
    }

    private isAlreadyUsed(height:number){
        for(let i = 0; i<this.bars.length; i++){
            if(this.bars[i] === height){
                return true;
            }
        }
        return false;
    }
}
export{Chart};