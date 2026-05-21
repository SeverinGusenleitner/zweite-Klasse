export abstract class Command {
  value:number
  abstract execute(currentValue: number): number;
  abstract undo(currentValue: number): number;
  constructor(value:number) {
    this.value = value;
  }
}
export class AddCommand extends Command {
  execute(currentValue: number) {
    return currentValue + this.value;
  }
  undo(currentValue: number): number {
    return currentValue - this.value;
  }

}
export class SubCommand extends Command {
  execute(currentValue: number) {
    return currentValue - this.value;
  }
  undo(currentValue: number): number {
    return currentValue + this.value;
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
