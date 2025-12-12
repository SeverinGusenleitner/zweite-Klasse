export  class Animal{
protected readonly outerDiv = document.getElementById("canvas");
protected animal:HTMLImageElement;
protected x:number;
protected y:number;
protected readonly width:number = 100;
protected readonly height:number = 100;
constructor(x:number,y:number,image:string){
 this.x = x;
 this.y = y;
    this.animal = document.createElement("img")
    this.animal.src = image;
    this.animal.style.width = `${this.width}px`;
    this.animal.style.height = `${this.height}px`;
    this.animal.classList.add("animal");
    this.animal.style.top = `${this.y}`
    this.animal.style.left = `${this.x}`
    this.animal.style.position = "absolute"
    this.outerDiv!.appendChild(this.animal);
}
draw():void{
    this.animal.style.top = `${this.y}px`
    this.animal.style.left = `${this.x}px`
}

}