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

      if(!match) {
        this.createChild(currNode, letter);
        currNode = currNode.children[letter];
      } else {
        currNode = currNode.children[letter];
      }
    })
    this.counter++;
    currNode.endWord = true;
  }

  count() {
    console.log(this.counter);
  }

  suggest(string) {
    let currNode = this.root;
    let stringArray = [...string];
    let suggestions = [];
    let sorted = [];

    stringArray.forEach(letter => {
      let keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if(match && currNode.children) {
        currNode = currNode.children[letter];
      } else {
        console.log('No matches');
        return null;
      }
    })
    this.suggestHelper(currNode, stringArray, suggestions);
    // console.log(suggestions);
    return this.sort(suggestions);
  }

  suggestHelper(node, arrayIn, arrayOut) {
    let keys = Object.keys(node.children);
    let word;
    let childNode;

    keys.forEach(key => {
      childNode = node.children[key];
      word = arrayIn + key;

        if(childNode.endWord) {
          arrayOut.push({word: word, frequency: childNode.frequency});
        } 
      this.suggestHelper(childNode, word, arrayOut);
    })
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

  select(string) {
    let currNode = this.root;
    let stringArray = [...string];

    stringArray.forEach(letter => {
      let keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if(match && currNode.children) {
        currNode = currNode.children[letter];
      } else {
        console.log('No matches');
        return null;
      }
    })

    if(currNode.endWord) {
        currNode.frequency++;
      } 
  }

  sort(array) {
    array.sort((a,b) => b.frequency - a.frequency);

    return array.map(object => object.word);
  }

  delete(word) {
    let currNode = this.root;
    let stringArray = [...word];
    let keys;

    stringArray.forEach(letter => {
      keys = Object.keys(currNode.children);
      let match = keys.find(key => key === letter);

      if(match) {
        currNode = currNode.children[letter];
      } else{
        return 
      }
    })
    this.counter--;
    currNode.endWord = null;
  }
}