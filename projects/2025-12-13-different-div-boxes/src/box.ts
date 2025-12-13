export abstract class Box{
    protected readonly canvas:HTMLDivElement = document.getElementById("canvas") as HTMLDivElement;
    protected readonly box:HTMLDivElement;
    protected readonly width = 100;
    protected readonly height = 100;

    constructor(protected x:number, protected y:number){
        this.box = document.createElement("div");
        this.canvas.appendChild(this.box);
        this.box.style.position = "absolute";
        this.box.classList.add("box");
    }
    draw():void{
        this.box.style.top = `${this.y}px`
        this.box.style.left = `${this.x}px`
    }

}
export class AlertBox extends Box{
    constructor(x:number,y:number,text:string){
        super(x,y);
        this.box.textContent = text;
        this.box.style.background = "salmon";
        this.box.addEventListener("click",()=>{
            alert("this is an Alert")
        })
    }

}
export class WarningBox extends Box{
        constructor(x:number,y:number,text:string){
        super(x,y);
        this.box.textContent = text;
        this.box.style.background = "khaki";
                this.box.addEventListener("click",()=>{
            alert("this is an Warning")
        })
    }

}