import { Todo } from "./todo";
export class List{
    
    private todos: Todo[] = [];
    constructor(private readonly list:HTMLDivElement){
    }
    public createNewTodo(text:string){
        const todo = new Todo(text, this.list);
        
        const divElement = todo.getDivElement();
        divElement.addEventListener("click",()=>todo.changeStatus());
        this.todos.push(todo);
    }
}