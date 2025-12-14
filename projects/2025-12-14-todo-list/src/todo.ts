export class Todo{
    private finished: boolean = false;
    private div;
    constructor(private textcontent:string,private readonly list:HTMLDivElement){
        this.div = document.createElement("div");
        this.div.textContent = textcontent;
        this.div.classList.add("todo-item");
        this.list.appendChild(this.div);
    }
    public changeStatus():void{
        if(!this.finished){
            this.div.classList.add("completed");
        }else{
            this.div.classList.remove("completed");
        }
            this.finished = !this.finished;
    }
    public getDivElement():HTMLDivElement{
        return this.div;
    }
}