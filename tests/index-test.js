import { expect } from 'chai';
import Node from '../lib/Node'
import Trie from '../lib/index';
import fs from 'fs';

// console.log(JSON.stringify(trie.root, null, '\t'));

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should be a thing', () => {
    expect(trie).to.exist;
  });

  it('should set its default root to null', () => {
    expect(trie.root.data).to.eq(null);
  });

  describe('INSERT', () => {
    it('should increase the count when a word is inserted', () => {
      expect(trie.counter).to.eq(0);

      trie.insert('pizza');
      trie.insert('pizzeria');
      trie.insert('apple');

      expect(trie.counter).to.eq(3);
    });

    it('should create new nodes for the each letter', () => {
      trie.insert('pizza');

      expect(trie.root.children.p).to.exist;
      expect(trie.root.children.p.data).to.eq('p');

      expect(trie.root.children.p.children.i).to.exist;
      expect(trie.root.children.p.children.i.data).to.eq('i');

      expect(trie.root.children.p.children.i.children.z).to.exist;
      expect(trie.root.children.p.children.i.children.z.data).to.eq('z');

      expect(trie.root.children.p.children.i.children.z.children.z).to.exist;
      expect(trie.root.children.p.children.i.children.z.children.z.data).to.eq('z');

      expect(trie.root.children.p.children.i.children.z.children.z.children.a).to.exist;
      expect(trie.root.children.p.children.i.children.z.children.z.children.a.data).to.eq('a');
    });

    it('should mark the end of a word as end', () => {
      trie.insert('pizza');

      expect(trie.root.children.p.endWord).to.eq(null);
      expect(trie.root.children.p.children.i.endWord).to.eq(null);
      expect(trie.root.children.p.children.i.children.z.endWord).to.eq(null);
      expect(trie.root.children.p.children.i.children.z.children.z.endWord).to.eq(null);
      expect(trie.root.children.p.children.i.children.z.children.z.children.a.endWord).to.eq(true);
    });
    // add in lower case testing
  });

  describe('SUGGEST', () => {

  });

  describe('POPULATE', () => {
    it('should push new words into the array from the dictionary', () => {
      expect(trie.counter).to.eq(0);

      const text = "/usr/share/dict/words";
      const dictionary = fs.readFileSync(text).toString().trim().split('\n');

      trie.populate(dictionary);

      expect(trie.counter).to.eq(235886);
    })
  })

  describe('SELECT', () => {
    it('should increase the frequency when selected', () => {
      trie.insert('hi');
      trie.insert('hello');
      trie.insert('howdy');

      expect(trie.root.children.h.children.i.frequency).to.eq(0);

      trie.select('hi');

      expect(trie.root.children.h.children.i.frequency).to.eq(1);
    })
  })

  describe('SORT', () => {
    it('should sort each suggestion by frequency', () => {
      trie.insert('hello');
      trie.insert('hi');
      trie.insert('hiya');
      trie.insert('howdy');

      trie.select('hi');
      trie.select('hi');
      trie.select('howdy');

      expect(trie.root.children.h.children.i.frequency).to.eq(2);
      expect(trie.root.children.h.children.o.children.w.children.d.children.y.frequency).to.eq(1);

      expect(trie.suggest('h')).to.deep.eq(['hi', 'howdy', 'hello', 'hiya']);
      // console.log(trie.suggest('h'));
    });
  });

  describe('DELETE', () => {
    it('should akagl', () => {
      trie.insert('hello');
      trie.insert('hi');
      trie.insert('hiya');
      trie.insert('howdy');

      expect(trie.count).to.eq(4);

      trie.delete('hi');

      expect(trie.count).to.eq(3);
      expect(trie.root.children.h.children.i.endWord).to.eq(null);
    })
  })
});