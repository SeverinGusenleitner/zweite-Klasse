import './styles.css';
import { List } from './list';
const listElement = document.getElementById("todo-list") as HTMLDivElement;
const list = new List(listElement);

const button = document.getElementById("new-todo-btn") as HTMLButtonElement;
const input = document.getElementById("new-todo-input") as HTMLInputElement;

button?.addEventListener("click",()=>{
    if(input.value.trim() === ""){
        return  
    }
    list.createNewTodo(input.value);
})
// to make the button disabled if input field is empty
button.disabled = true;

input.addEventListener("input", () => {
    button.disabled = input.value.trim() === "";
});