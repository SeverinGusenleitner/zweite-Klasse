export abstract class Shape{
    protected ulElement:HTMLUListElement;
    constructor(protected length:number,ul:string = "shape-list"){
        this.ulElement = document.getElementById(ul) as HTMLUListElement;
    }
    abstract get area():number;
    abstract get description():string;
}
export class Circle extends Shape{
    private li: HTMLLIElement;
    
    constructor(lenght:number,ul:string = "shape-list"){
        super(lenght,ul);

        this.li = document.createElement("li") as HTMLLIElement;
        this.li.textContent = this.description;
        this.ulElement.appendChild(this.li);
    }
    override  get area():number{
        return this.length*Math.PI*Math.PI;
    }
    override get description():string{
        return `Circle with area of ${Math.round(this.area)} & a radius of ${Math.round(this.length)}`;
    }




}
export class Square extends Shape{
    private li: HTMLLIElement;
    constructor(length:number,ul:string = "shape-list"){
        super(length,ul);
        this.li = document.createElement("li") as HTMLLIElement;
        this.li.textContent = this.description;
        this.ulElement.appendChild(this.li);
    }
    override  get area():number{
        return this.length*this.length;
    }
    override get description():string{
        return `Square with area of ${Math.round(this.area)} & a width of ${Math.round(this.length)}`;
    }

}