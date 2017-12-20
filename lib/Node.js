export default class Node {
  constructor(data) {
    this.data = data;
    this.children = {};
    this.endWord = null;
    this.frequency = 0;
  }
}