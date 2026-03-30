import './styles.css';
import { Task } from './task';
const addButton = document.getElementById("add-btn") as HTMLButtonElement;
const input = document.getElementById("input") as HTMLInputElement;
addButton.addEventListener("click", ()=>{
    if(input.value === ""){
        console.warn("Please fill out the input field!")
        return
    }
    const task = new Task(input.value);
})
