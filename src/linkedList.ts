interface Node {
  value: string | number;
  next: Node | null;
}

//the node of the last node is always null
export function node(value: string | number): Node {
  return {
    value,
    next: null,
  };
}

export function linkedList() {
  let head: Node | null = null;

  let append = (value: string | number) => {
    let newNode = node(value);

    if (!head) {
      head = newNode;
      return;
    }

    let currentNode = head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = newNode;
  };

  let contains = (value: string | number) => {
    let currentNode = head;
    if (!currentNode) {
      return false;
    }

    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.next;
    }

    return false;
  };

  let prepend = (value: string | number) => {
    let newNode = node(value);

    if (!head) {
      head = newNode;
      return;
    }

    newNode.next = head;
    head = newNode;
  };

  let pop = () => {
    if (!head) {
      return undefined;
    }
    let value = head.value;
    let newNode = head.next;

    head = newNode;
    return value;
  };

  let toString = () => {
    if (!head) {
      console.log(null);
      return;
    }

    let currentNode: Node | null = head;
    let result = "";
    while (currentNode) {
      result += `( ${currentNode.value} )` + " -> ";
      currentNode = currentNode.next;
    }

    return (result += "null");
  };

  let size = () => {
    if (!head) {
      return 0;
    }

    let currentNode: Node | null = head;
    let result = 0;
    while (currentNode) {
      result += 1;
      currentNode = currentNode.next;
    }

    return result;
  };

  let at = (index: number) => {
    if (!head) {
      return undefined;
    }

    let currentNode: Node | null = head;
    let result = 0;
    while (currentNode) {
      if (index === result) {
        return currentNode?.value;
      }
      result += 1;
      currentNode = currentNode.next;
    }

    return undefined;
  };

  let insertAt = (index: number, ...arr: (number | string)[]) => {
    if (index < 0) throw RangeError("Index does not exit");
    let currentNode: Node | null = head;
    if (!currentNode) {
      console.error("no list found");
      return undefined;
    }

    let newList = linkedList();
    arr.forEach((value) => newList.append(value));

    let nextNode: Node | null = null;
    let prevNode: Node | null = null;
    let leftIndex = 0;

    while (currentNode) {
      if (index === leftIndex) {
        if (!prevNode) prevNode = currentNode;
        nextNode = currentNode;
        prevNode.next = newList.getList();
        break;
      }
      prevNode = currentNode;
      leftIndex += 1;
      currentNode = currentNode.next;
    }

    while (prevNode && nextNode) {
      if (!prevNode.next) {
        prevNode.next = nextNode;
        return;
      }
      prevNode = prevNode.next;
    }
    throw RangeError("Index does not exit");
  };

  let findIndex = (value: string | number) => {
    let currentNode = head;
    if (!currentNode) {
      return -1;
    }

    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.next;
      index++;
    }

    return -1;
  };

  let tail = () => {
    if (!head) {
      return undefined;
    }

    let currentNode: Node | null = head;
    let lastGuy;

    while (currentNode) {
      lastGuy = currentNode.value;
      currentNode = currentNode.next;
    }

    return lastGuy;
  };

  let headValue = () => {
    if (!head) {
      return undefined;
    }

    return head.value;
  };

  let getList = () => {
    if (!head) {
      return null;
    }

    return head;
  };

  let removeAt = (index: number) => {
    if (index < 0) throw RangeError("Index does not exit");
    let currentNode: Node | null = head;
    if (!currentNode) {
      console.error("no list found");
      return undefined;
    }

    let prevNode: Node | null = null;
    let leftIndex = 0;

    while (currentNode) {
      if (index === leftIndex) {
        if (!prevNode) {
          head = currentNode.next;
          return;
        }
        prevNode.next = currentNode.next;
        return;
      }
      prevNode = currentNode;
      leftIndex += 1;
      currentNode = currentNode.next;
    }
    throw RangeError("Index does not exit");
  };

  return {
    getList,
    head,
    append,
    toString,
    prepend,
    size,
    headValue,
    tail,
    at,
    pop,
    contains,
    findIndex,
    insertAt,
    removeAt,
  };
}

let list = linkedList();
list.append("1");
list.append("2");
list.append("3");
list.append("4");
list.insertAt(3, 10, 20, 30);
// list.append("5");
// list.append("6");
list.removeAt(0);
console.log(list.toString());
