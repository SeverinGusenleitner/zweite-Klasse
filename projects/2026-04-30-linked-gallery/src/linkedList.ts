/**
 * The data payload stored in each node of the playlist.
 */
export type Image = {
  title: string;
  imageUrl: string;
  creationTime:Time;
};
export type Time = {
  hours:number,
  minutes:number,
}
/**
 * A single node in a singly-linked list.
 *
 * Think of it like a box that holds:
 *   - a Song as the data payload
 *   - a pointer to the NEXT box in the chain (or null if it is the last one)
 *
 *   [ data | next ] --> [ data | next ] --> null
 */
export class Node {
  data: Image;

  /**
   * The pointer to the next node in the list.
   * null means "there is no next node" — this is the last element.
   */
  next: Node | null = null;

  constructor(data: Image) {
    this.data = data;
  }
}

/**
 * A singly-linked list of songs.
 *
 * The list only keeps track of the FIRST node (the head).
 * To reach any other node you have to follow the chain of `next` pointers:
 *
 *   head --> [A] --> [B] --> [C] --> null
 *
 * There is no direct access by index — you always have to start at `head`
 * and walk forward, which is the fundamental traversal pattern for linked lists.
 */
export class LinkedList {
  /**
   * Pointer to the first node of the list.
   * null means the list is empty.
   */
  head: Node | null = null;

  // ---------------------------------------------------------------------------
  // find
  // ---------------------------------------------------------------------------

  /**
   * Searches the list for a node with the given title and returns it.
   *
   * This is the basic TRAVERSAL pattern:
   *   1. Start at the head.
   *   2. Check the current node.
   *   3. If it matches → done.
   *   4. Otherwise move to the next node and repeat.
   *   5. If we reach null the title was not in the list.
   *
   * @param title  The song title to search for.
   * @returns      The matching Node, or null if not found.
   */
  find(title: string): Node | null {
    let current = this.head;          // start at the beginning
    while (current !== null) {        // walk until the end of the list
      if (current.data.title === title) {
        return current;               // found it!
      }
      current = current.next;         // move one step forward
    }
    return null;                      // title was not in the list
  }

  // ---------------------------------------------------------------------------
  // insertAtBeginning
  // ---------------------------------------------------------------------------

  /**
   * Inserts a new song at the BEGINNING of the list.
   *
   * Before: head --> [A] --> [B] --> null
   * After:  head --> [NEW] --> [A] --> [B] --> null
   *
   * Steps:
   *   1. Create a new node.
   *   2. Make its `next` point to the current head (so it connects to the rest).
   *   3. Update `head` to point to the new node.
   *
   * Does nothing and returns false if a song with that title already exists.
   *
   * @param title   Song title.
   * @param url  Song artist.
   * @returns       true if inserted, false if title already exists.
   */
  insertAtBeginning(title: string, url: string,creationTime:Time): boolean {
    if (this.find(title) !== null) {
      return false;   // duplicate — reject
    }

    const newNode = new Node({ title, imageUrl: url ,creationTime});
    newNode.next = this.head;   // step 2: link new node to the old head
    this.head = newNode;        // step 3: new node becomes the head
    return true;
  }

  insertBefore(title: string, url: string, creationTime:Time){
    // title already exists
    if (this.find(title) !== null) {
      return;
    }
    
    // there is no head or the item at the head has a bigger creation time than the new element
    if (this.head === null || this.convertTimeToNumber(creationTime) < this.convertTimeToNumber(this.head.data.creationTime)) {
      this.insertAtBeginning(title,url,creationTime);
      return
    }
    
    let current: Node = this.head;
    while (current.next !== null && this.convertTimeToNumber(current.next.data.creationTime) < this.convertTimeToNumber(creationTime)) {
      current = current.next;
    }

    const newNode = new Node({ title, imageUrl: url, creationTime });

    newNode.next = current.next;
    current.next = newNode;
  }
  private convertTimeToNumber(time:Time):number{
    const total = time.hours*60+time.minutes;
    return total;
  }

  // ---------------------------------------------------------------------------
  // delete
  // ---------------------------------------------------------------------------

  /**
   * Removes the node with the given title from the list.
   *
   * The key idea: to remove a node we need to make the node BEFORE it
   * skip over it — we do that by keeping track of the previous node (`prev`).
   *
   * Case 1 – deleting the head:
   *   Before: head --> [A] --> [B] --> null
   *   After:  head --> [B] --> null
   *   (Just move head forward.)
   *
   * Case 2 – deleting a middle/last node:
   *   Before: head --> [A] --> [B] --> [C] --> null
   *   After:  head --> [A] --> [C] --> null
   *   (prev.next skips over [B] and points directly to [C].)
   *
   * @param title  Title of the picture to remove.
   * @returns      true if the node was found and removed, false otherwise.
   */
  delete(title: string): boolean {
    if (this.head === null) {
      return false;   // list is empty — nothing to delete
    }

    // Special case: the node to delete is the head.
    if (this.head.data.title === title) {
      this.head = this.head.next;   // move head one step forward
      return true;
    }

    // General case: walk the list, keeping track of the previous node.
    let prev = this.head;
    let current = this.head.next;

    while (current !== null) {
      if (current.data.title === title) {
        prev.next = current.next;   // skip over the node to be deleted
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;   // title was not found
  }

  // ---------------------------------------------------------------------------
  // toArray
  // ---------------------------------------------------------------------------

  /**
   * Traverses the list and returns all songs as a plain array.
   *
   * Useful for rendering — the DOM works well with arrays.
   * This is another example of the basic traversal pattern (see `find`).
   *
   * @returns  Array of Song objects in list order.
   */
  toArray(): Image[] {
    const result: Image[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}
