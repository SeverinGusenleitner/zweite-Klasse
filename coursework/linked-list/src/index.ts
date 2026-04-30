import './styles.css';
export type Song = {
  title: string;
  artist: string;
};
export class Node {
  next: Node | null = null;
  data: Song;
  constructor(data: Song) {
    this.data = data;
  }
}
export class LinkedList {
  head: Node | null = null;
  public insertAtBeginning(data: Song): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  public find(title: string): Node | null {
    let current = this.head;
    while (current !== null) {
      if (current.data.title === title) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
  public insertAfter(index:number,data:Song):boolean{
    if (index === 0) {
      this.insertAtBeginning(data);
      return true;
  }
    let current = this.head;
    let count = 0;
    while(current !== null&& count<index-1){
        count++;
        current = current.next;
    }
    if(current === null){
        return false;
    }
    const newNode = new Node(data);
    newNode.next = current.next;
    current.next = newNode;
    return true;
  }
  public logNodes():void{
    let current = this.head;
    while(current !== null){
        console.log(current)
        current = current.next;
    }
  }
}