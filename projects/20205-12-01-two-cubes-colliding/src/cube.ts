export class Cube{
    private x:number
    private readonly box:HTMLDivElement;
    private element:HTMLDivElement;
    private y:number
    private vx:number
    private size:number;
    constructor(x:number,y:number,size:number,vx:number,box:HTMLDivElement){
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.box = box;
        this.size = size;

        
        this.element = document.createElement("div") as HTMLDivElement;
        this.element.classList = "cube";
        this.element.style.width = `${this.size}px`
        this.element.style.height = `${this.size}px`
        this.element.style.backgroundColor = "gray";
        box.appendChild(this.element);
        this.updatePosition();
    }

    public update(){
        this.x += this.vx;
        if(this.x<0||this.x+this.size>this.box.clientWidth){
            this.vx = -this.vx;
        }
        this.updatePosition();
    }
  private updatePosition(): void {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  public getX():number{
    return this.x;
  }
  public getY():number{
    return this.y;
  }
  public getSize():number{
    return this.size;
  }
  public changeSpeed(){
    this.vx = -this.vx;
  }
}