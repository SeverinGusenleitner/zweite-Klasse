
export type Image = {
  title: string;
  imageUrl: string;
  creationTime: Time;
};
export type Time = {
  hours: number;
  minutes: number;
};

export class Node<T> {
  data: T;

  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class LinkedList<T extends { title: string; creationTime: Time }> {
  head: Node<T> | null = null;

  find(title: string): Node<T> | null {
    let current = this.head; // start at the beginning
    while (current !== null) {
      // walk until the end of the list
      if (current.data.title === title) {
        return current; // found it!
      }
      current = current.next; // move one step forward
    }
    return null; // title was not in the list
  }

  insertAtBeginning(node: Node<T>): boolean {
    if (this.find(node.data.title) !== null) {
      return false; // duplicate — reject
    }

    node.next = this.head; // step 2: link new node to the old head
    this.head = node; // step 3: new node becomes the head
    return true;
  }

  insertBefore(node: Node<T>) {
    // title already exists
    if (this.find(node.data.title) !== null) {
      return;
    }

    // there is no head or the item at the head has a bigger creation time than the new element
    if (this.head === null || this.convertTimeToNumber(node.data.creationTime) < this.convertTimeToNumber(this.head.data.creationTime)) {
      this.insertAtBeginning(node);
      return;
    }

    let current: Node<T> = this.head;
    while (current.next !== null && this.convertTimeToNumber(current.next.data.creationTime) < this.convertTimeToNumber(node.data.creationTime)) {
      current = current.next;
    }

    node.next = current.next;
    current.next = node;
  }
  private convertTimeToNumber(time: Time): number {
    const total = time.hours * 60 + time.minutes;
    return total;
  }

  delete(title: string): boolean {
    if (this.head === null) {
      return false; // list is empty — nothing to delete
    }

    // Special case: the node to delete is the head.
    if (this.head.data.title === title) {
      this.head = this.head.next; // move head one step forward
      return true;
    }

    // General case: walk the list, keeping track of the previous node.
    let prev = this.head;
    let current = this.head.next;

    while (current !== null) {
      if (current.data.title === title) {
        prev.next = current.next; // skip over the node to be deleted
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false; // title was not found
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
