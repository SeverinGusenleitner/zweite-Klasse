export abstract class Animal{
    protected element:HTMLDivElement = document.createElement("div");
    constructor(protected readonly canvas:HTMLDivElement){
        this.element.style.width = "100px";
        this.element.style.height = "20px"
        this.element.classList.add("message")
    }
    public getElement():HTMLDivElement{
        return this.element;
    }
    public appendChild(){
        this.canvas.appendChild(this.element);
    }
}
export class Dog extends Animal{
    constructor(canvas:HTMLDivElement){
        super(canvas)
        this.element.textContent = "woof";
    } 
}
export class Cat extends Animal{
        constructor(canvas:HTMLDivElement){
        super(canvas);
        this.element.textContent = "meow";
    } 
}