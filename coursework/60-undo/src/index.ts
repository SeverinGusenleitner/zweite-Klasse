import { UndoStack,AddCommand,SubCommand,Command,ResetCommand } from "./linkedList";
import './styles.css';
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const subBtn = document.getElementById("subBtn") as HTMLButtonElement;
const inputEl = document.getElementById("inputEl") as HTMLInputElement;
const undoBtn = document.getElementById("undoBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const currentValueEl = document.getElementById("currentValueEl") as HTMLSpanElement;

const stack = new UndoStack<Command>();
let currentValue = 0;
inputEl.value = `0`;

addBtn.addEventListener("click", ()=>{
  const command = new AddCommand(inputEl.valueAsNumber);
  stack.push(command)
  currentValue = command.execute(currentValue);
  currentValueEl.textContent = `${currentValue}`;
})

subBtn.addEventListener("click", ()=>{
    const command = new SubCommand(inputEl.valueAsNumber);
    stack.push(command)
    currentValue = command.execute(currentValue);
    currentValueEl.textContent = `${currentValue}`;
})

undoBtn.addEventListener("click", ()=>{
  const command = stack.pop()
  if(command){
    currentValue = command.undo(currentValue);
    currentValueEl.textContent = `${currentValue}`
  }
})

resetBtn.addEventListener("click", ()=>{
  const command = new ResetCommand();
  stack.push(command);
  currentValue = command.execute(currentValue);
  currentValueEl.textContent = `${currentValue}`;
})
