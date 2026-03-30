export class Task{
    private taskListEl: HTMLDivElement;
    private taskEl: HTMLDivElement;
    constructor(text:string,taskListId = "task-list"){
        this.taskListEl = document.getElementById(taskListId) as HTMLDivElement;
        this.taskEl = document.createElement("div") as HTMLDivElement;
        this.taskEl.append(text);
        const checkBox = document.createElement("input") as HTMLInputElement;
        checkBox.type ="checkbox";
        checkBox.addEventListener("change", () => {
            this.changeFinished(checkBox);
        })
        this.taskEl.appendChild(checkBox);
        this.taskEl.classList.add("task");

        this.taskListEl.appendChild(this.taskEl);
    }
    private changeFinished(checkBox:HTMLInputElement){
        console.log(checkBox.checked);
        if(checkBox.checked){
        this.taskEl.className = "task checked";
        }
        else{
            this.taskEl.className ="task";
        }
    }
}