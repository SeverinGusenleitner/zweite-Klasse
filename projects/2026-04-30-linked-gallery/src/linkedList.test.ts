import { describe, it, expect, beforeEach } from "vitest";
import { LinkedList, Node, Image } from "./linkedList";

describe("LinkedList", () => {
  let list: LinkedList<Image>;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe("a fresh list", () => {
    it("has no head", () => {
      expect(list.head).toBeNull();
    });

    it("returns an empty array from toArray()", () => {
      expect(list.toArray()).toEqual([]);
    });
  });

  describe("insertAtBeginning", () => {
    it("returns true when the item is new", () => {
      const node = new Node<Image>({ title: "A", imageUrl: "xy", creationTime: { hours: 0, minutes: 0 } });
      expect(list.insertAtBeginning(node)).toBe(true);
    });

    it("places the new item at the head", () => {
      const nodeA = new Node<Image>({ title: "A", imageUrl: "xy", creationTime: { hours: 0, minutes: 0 } });
      const nodeB = new Node<Image>({ title: "B", imageUrl: "xy", creationTime: { hours: 0, minutes: 1 } });

      list.insertAtBeginning(nodeA);
      list.insertAtBeginning(nodeB);

      expect(list.head?.data.title).toBe("B");
    });

    it("links the new node to the previous head", () => {
      const nodeA = new Node<Image>({ title: "A", imageUrl: "xy", creationTime: { hours: 0, minutes: 0 } });
      const nodeB = new Node<Image>({ title: "B", imageUrl: "xy", creationTime: { hours: 0, minutes: 1 } });

      list.insertAtBeginning(nodeA);
      list.insertAtBeginning(nodeB);

      expect(list.toArray()).toEqual([
        { title: "B", imageUrl: "xy", creationTime: { hours: 0, minutes: 1 } },
        { title: "A", imageUrl: "xy", creationTime: { hours: 0, minutes: 0 } },
      ]);
    });

    it("rejects duplicates and returns false", () => {
      const node = new Node<Image>({ title: "A", imageUrl: "xy", creationTime: { hours: 0, minutes: 0 } });

      list.insertAtBeginning(node);

      const duplicate = new Node<Image>({ title: "A", imageUrl: "xy", creationTime: { hours: 0, minutes: 0 } });
      expect(list.insertAtBeginning(duplicate)).toBe(false);
      expect(list.toArray().length).toBe(1);
    });
  });

  describe("insertBefore (sorted by creationTime)", () => {
    it("inserts nodes keeping ascending time order", () => {
      const nodeA = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 30 } });
      const nodeB = new Node<Image>({ title: "B", imageUrl: "u", creationTime: { hours: 0, minutes: 20 } });
      const nodeC = new Node<Image>({ title: "C", imageUrl: "u", creationTime: { hours: 0, minutes: 10 } });

      list.insertBefore(nodeA);
      list.insertBefore(nodeB);
      list.insertBefore(nodeC);

      expect(list.toArray().map((s) => s.title)).toEqual(["C", "B", "A"]);
    });

    it("rejects duplicates when inserting by title", () => {
      const node = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 10 } });

      list.insertBefore(node);
      const dup = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 5 } });
      list.insertBefore(dup);

      expect(list.toArray().length).toBe(1);
      expect(list.toArray()[0].creationTime.minutes).toBe(10);
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      // Build: A -> B -> C (by inserting at beginning)
      const nodeC = new Node<Image>({ title: "C", imageUrl: "u", creationTime: { hours: 0, minutes: 2 } });
      const nodeB = new Node<Image>({ title: "B", imageUrl: "u", creationTime: { hours: 0, minutes: 1 } });
      const nodeA = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 0 } });

      list.insertAtBeginning(nodeC);
      list.insertAtBeginning(nodeB);
      list.insertAtBeginning(nodeA);
    });

    it("removes the head", () => {
      const ok = list.delete("A");

      expect(ok).toBe(true);
      expect(list.toArray().map((s) => s.title)).toEqual(["B", "C"]);
    });

    it("removes a middle node", () => {
      list.delete("B");

      expect(list.toArray().map((s) => s.title)).toEqual(["A", "C"]);
    });

    it("removes the last node", () => {
      list.delete("C");

      expect(list.toArray().map((s) => s.title)).toEqual(["A", "B"]);
    });

    it("returns false when the title is not in the list", () => {
      expect(list.delete("ZZZ")).toBe(false);
      expect(list.toArray().length).toBe(3);
    });

    it("returns false on an empty list", () => {
      const empty = new LinkedList<Image>();
      expect(empty.delete("A")).toBe(false);
    });

    it("makes the list empty when the only element is removed", () => {
      const tiny = new LinkedList<Image>();
      const only = new Node<Image>({ title: "only", imageUrl: "u", creationTime: { hours: 0, minutes: 0 } });
      tiny.insertAtBeginning(only);

      tiny.delete("only");

      expect(tiny.head).toBeNull();
      expect(tiny.toArray().length).toBe(0);
    });
  });

  describe("find", () => {
    it("returns null on an empty list", () => {
      expect(list.find("A")).toBeNull();
    });

    it("returns the matching node", () => {
      const node = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 0 } });
      list.insertAtBeginning(node);

      const found = list.find("A");

      expect(found).toBeInstanceOf(Node);
      expect(found?.data).toEqual({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 0 } });
    });

    it("returns null when no node matches", () => {
      const node = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 0 } });
      list.insertAtBeginning(node);

      expect(list.find("ZZZ")).toBeNull();
    });
  });

  describe("counting nodes via toArray", () => {
    it("counts every node in the list", () => {
      const a = new Node<Image>({ title: "A", imageUrl: "u", creationTime: { hours: 0, minutes: 0 } });
      const b = new Node<Image>({ title: "B", imageUrl: "u", creationTime: { hours: 0, minutes: 1 } });
      const c = new Node<Image>({ title: "C", imageUrl: "u", creationTime: { hours: 0, minutes: 2 } });

      list.insertAtBeginning(a);
      list.insertAtBeginning(b);
      list.insertAtBeginning(c);

      expect(list.toArray().length).toBe(3);
    });
  });
});
