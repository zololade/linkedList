//helper
interface Node<T> {
  key: string;
  value: T;
  next: Node<T> | null;
}

type BUCKET<T> = (null | Node<T>)[];

//the node of the last node is always null
function node<T>(key: string, value: T): Node<T> {
  return {
    key,
    value,
    next: null,
  };
}

function updateNode<T>(head: Node<T> | null, key: string, value: T) {
  let currentNode = head;

  while (currentNode) {
    if (currentNode.key === key) {
      currentNode.value = value;
      return true;
    }
    currentNode = currentNode.next;
  }
  return false;
}

function findNodeByKey<T>(head: Node<T> | null, key: string) {
  let currentNode = head;

  while (currentNode) {
    if (currentNode.key === key) {
      return currentNode.value;
    }
    currentNode = currentNode.next;
  }
  return null;
}

//main class
class HashMap<T> {
  public buckets: BUCKET<T>;
  private static LOAD_FACTOR = 0.75;
  private CAPACITY: number = 16;
  private size: number = 0;

  constructor() {
    this.buckets = new Array(this.CAPACITY).fill(null);
  }

  private static hash(key: string, capacity: number) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
    }
    return hashCode;
  }

  set(key: string, value: T) {
    if (this.size >= HashMap.LOAD_FACTOR * this.CAPACITY) {
      let oldBucket = [...this.buckets];
      this.CAPACITY = this.CAPACITY * 2;
      this.buckets = new Array(this.CAPACITY).fill(null);
      this.size = 0;

      oldBucket.forEach((value) => {
        while (value) {
          this.set(value.key, value.value);
          value = value.next;
        }
      });
    }

    let hashedKey = HashMap.hash(key, this.CAPACITY);

    if (hashedKey < 0 || hashedKey >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    let head = this.buckets[hashedKey];
    let newNode = node(key, value);

    //first, retrieve the hash in array
    if (!head) {
      this.size += 1;
      this.buckets[hashedKey] = newNode;
      return;
    }

    let currentNode = head;

    if (updateNode(head, key, value)) return;

    this.size += 1;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
    head = head;
  }

  get(key: string) {
    let hashedKey = HashMap.hash(key, this.CAPACITY);
    let head = this.buckets[hashedKey];

    if (!head) {
      return null;
    }
    return findNodeByKey(head, key);
  }

  has(key: string) {
    return this.get(key) !== null;
  }

  remove(key: string) {
    let hashedKey = HashMap.hash(key, this.CAPACITY);
    let head = this.buckets[hashedKey];

    if (!head) {
      return false;
    }

    if (head.key === key) {
      this.buckets[hashedKey] = head.next;
      this.size -= 1;
      return true;
    }

    let currentNode: Node<T> | null = head;
    let prevNode;

    while (currentNode) {
      if (currentNode.key === key && prevNode) {
        prevNode.next = currentNode.next;
        this.size -= 1;
        return true;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    return false;
  }

  get length() {
    return this.size;
  }

  clear() {
    this.CAPACITY = 16;
    this.buckets = new Array(this.CAPACITY).fill(null);
    this.size = 0;
  }

  entries() {
    let entriesArr: [string, T][] = [];

    this.buckets.forEach((element) => {
      while (element) {
        entriesArr.push([element.key, element.value]);
        element = element.next;
      }
    });

    return entriesArr;
  }

  keys() {
    return this.entries().map((el) => el[0]);
  }
  values() {
    return this.entries().map((el) => el[1]);
  }
}

let test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.buckets.length);
console.log(test.length);
