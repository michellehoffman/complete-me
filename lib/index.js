import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node(null);
    this.counter = 0;
  }

  createChild(node, data) {
    let child = new Node(data);

    node.children[data] = child;
  }

  insert(string) {
    let currNode = this.root;
    let stringArray = [...string];
    let keys;

    stringArray.forEach(letter => {
      keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if (!match) {
        this.createChild(currNode, letter);
        currNode = currNode.children[letter];
      } else {
        currNode = currNode.children[letter];
      }
    });
    this.counter++;
    currNode.endWord = true;
  }

  count() {
    return this.counter;
  }

  suggest(string) {
    let currNode = this.root;
    let stringArray = string.toLowerCase().split('');
    let suggestions = [];

    stringArray.forEach(letter => {
      let keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if (!match) {
        return currNode = null;
      } 

      currNode = currNode.children[letter];
    });
    this.suggestHelper(currNode, stringArray.join(''), suggestions);
    return this.sort(suggestions);
  }

  suggestHelper(node, arrayIn, arrayOut) {
    if (node === null) {
      return null;
    }

    let keys = Object.keys(node.children);
    let obj = {};
    let word;
    let childNode;

    keys.forEach(key => {
      childNode = node.children[key];
      word = arrayIn + key;

      if (childNode.endWord) {
        obj.word = word;
        obj.frequency = childNode.frequency;
        arrayOut.push(obj);
      } 
      this.suggestHelper(childNode, word, arrayOut);
    });
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  select(string) {
    let currNode = this.root;
    let stringArray = [...string];

    stringArray.forEach(letter => {
      let keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if (match && currNode.children) {
        currNode = currNode.children[letter];
      } else {
        return null;
      }
    });

    if (currNode.endWord) {
      currNode.frequency++;
    } 
  }

  sort(array) {
    array.sort((a, b) => b.frequency - a.frequency);

    return array.map(object => object.word);
  }

  delete(word) {
    let currNode = this.root;
    let stringArray = [...word];
    let keys;

    stringArray.forEach(letter => {
      keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if (match) {
        currNode = currNode.children[letter];
      } else {
        return; 
      }
    });
    this.counter--;
    currNode.endWord = null;
  }
}