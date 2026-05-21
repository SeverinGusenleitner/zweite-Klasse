export abstract class Command {
  abstract execute(currentValue: number): number;
  abstract undo(currentValue: number): number;
}

export class AddCommand extends Command {
  private value:number;
  execute(currentValue: number) {
    return currentValue + this.value;
  }
  undo(currentValue: number): number {
    return currentValue - this.value;
  }
  constructor(value:number){
    super();
    this.value = value;
  }
}

export class ResetCommand extends Command{
  private savedValue:number = 0;
  execute(currentValue:number):number{
    this.savedValue = currentValue;
    return 0;
  }
  undo():number{
    return this.savedValue;
  }
}

export class SubCommand extends Command {
  private value:number;
  execute(currentValue: number) {
    return currentValue - this.value;
  }
  undo(currentValue: number): number {
    return currentValue + this.value;
  }
  constructor(value:number){
    super();
    this.value = value;
  }
}

export class Node<T>{
    next: Node<T> | null;
    data:T;
    constructor(data:T){
      this.next = null;
      this.data = data;
    }
}

export class UndoStack <T>{
  head: Node<T> | null = null;

  push(item: T): void {
    const node = new Node(item);
  
    node.next = this.head;
    this.head = node;
  }
  pop():T|null{
    if(this.head !== null){
      const temp = this.head.data
      this.head = this.head.next;
      return temp;
    }
    return null
  }
}
