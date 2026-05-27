import { UndoStack,AddCommand,SubCommand,Command,ResetCommand } from "./linkedList";
import './styles.css';
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const subBtn = document.getElementById("subBtn") as HTMLButtonElement;
const undoBtn = document.getElementById("undoBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const redoBtn = document.getElementById("redoBtn") as HTMLButtonElement;
const inputEl = document.getElementById("inputEl") as HTMLInputElement;
const currentValueEl = document.getElementById("currentValueEl") as HTMLSpanElement;

const undoStack = new UndoStack<Command>();
const redoStack = new UndoStack<Command>();

let currentValue = 0;
inputEl.value = `0`;
updateButtonState();
addBtn.addEventListener("click", ()=>{
  const command = new AddCommand(inputEl.valueAsNumber);
  undoStack.push(command)
  currentValue = command.execute(currentValue);
  currentValueEl.textContent = `${currentValue}`;
updateButtonState();
})

subBtn.addEventListener("click", ()=>{
    const command = new SubCommand(inputEl.valueAsNumber);
    undoStack.push(command)
    currentValue = command.execute(currentValue);
    currentValueEl.textContent = `${currentValue}`;
updateButtonState();

})

undoBtn.addEventListener("click", ()=>{
  const command = undoStack.pop()
  if(command){
    currentValue = command.undo(currentValue);
    currentValueEl.textContent = `${currentValue}`
    redoStack.push(command);
  }
  updateButtonState();
})

resetBtn.addEventListener("click", ()=>{
  const command = new ResetCommand();
  undoStack.push(command);
  currentValue = command.execute(currentValue);
  currentValueEl.textContent = `${currentValue}`;
updateButtonState();

})

redoBtn.addEventListener("click", ()=>{
  const command = redoStack.pop()
  if(command){
    currentValue = command.execute(currentValue);
    currentValueEl.textContent = `${currentValue}`
  }
updateButtonState();

})
function updateButtonState():void{
    if(undoStack.head){
    undoBtn.disabled = false;
  }else{
    undoBtn.disabled = true;
  }
    if(redoStack.head){
    redoBtn.disabled = false;
  }else{
    redoBtn.disabled = true;
  }
}