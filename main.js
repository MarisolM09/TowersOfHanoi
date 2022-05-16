'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // removes the last item in the startstack
  let lastItemStartstacks = stacks[startStack].pop();
  // adds removed item from startstack to endstack
  stacks[endStack].push(lastItemStartstacks)
  checkForWin()
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // You can't move a big piece onto a small piec***
  
  // checking for the last index in the array
  let lastIndexStart = stacks[startStack][stacks[startStack].length - 1];
  let lastIndexEnd = stacks[endStack][stacks[endStack].length - 1]
  // is checking to if there is anything in the endstack, if there is it will compare to see if startstack in less than 
  // the endstack it will allow move, if not it will not allow move.
  if(stacks[endStack].length === 0) {
    return true
  } else if (lastIndexStart < lastIndexEnd) {
    return true
  }
  else {
    return false
  }
}


// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // is checking to see if the the game is won, the complete stacks should be in either stack b or stack c.
  if(stacks.a.length === 0 && stacks.b.length === 4 || stacks.c.length === 4){
    return true
  } else {
    return false
  }
}


// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  // ****Game****Order****
  // 1 should check if the move is legal
  // 2 shoulder be able to move the piece if the move is legal
  // should check for win if the stacks are all in place in either stack b or c.
  
  // checking to see if the the move is legal.
  if(isLegal(startStack, endStack)) {
    // if the move is legal should be able to move a piece
    movePiece(startStack, endStack)
    } else {
    console.log("Invalid Move")
  }
  }

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
