import { expect } from 'chai';
import Node from '../lib/Node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  });

  it('should be a thing', () => {
    expect(node).to.exist;
  });

  it('should default children to an empty object', () => {
    expect(node.children).to.deep.equal({});
  });

  it('should default endWord to null', () => {
    expect(node.endWord).to.equal(null);
  });

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza');
  });
  
});