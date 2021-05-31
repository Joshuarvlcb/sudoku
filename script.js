const gridContainer = document.querySelector(".container");
let gridArr = new Array(9).fill("").map((_, i) => {
  return new Array(9).fill("").map((_, j, arr) => {
    return null;
  });
});

const _BOARD = [
  [" ", "9", " ", " ", "4", "2", "1", "3", "6"],
  [" ", " ", " ", "9", "6", " ", "4", "8", "5"],
  [" ", " ", " ", "5", "8", "1", " ", " ", " "],

  [" ", " ", "4", " ", " ", " ", " ", " ", " "],
  ["5", "1", "7", "2", " ", " ", "9", " ", " "],
  ["6", " ", "2", " ", " ", " ", "3", "7", " "],

  ["1", " ", " ", "8", " ", "4", " ", "2", " "],
  ["7", " ", "6", " ", " ", " ", "8", "1", " "],
  ["3", " ", " ", " ", "9", " ", " ", " ", " "],
];

const _COARDS = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],

  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],

  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
];
const _MED = [
  [" ", " ", "4", "6", " ", " ", "2", "7", "9"],
  ["6", "5", "7", "9", " ", " ", " ", " ", " "],
  ["2", " ", " ", "3", " ", " ", " ", "4", " "],

  ["1", " ", " ", " ", " ", "8", "5", "2", "4"],
  [" ", "2", "6", "1", "9", " ", " ", " ", "8"],
  [" ", "7", "5", " ", " ", "4", "9", " ", " "],

  ["5", "6", "2", " ", "1", " ", " ", " ", " "],
  ["9", "1", " ", " ", "7", " ", " ", "5", " "],
  [" ", " ", " ", "5", " ", "9", "8", " ", "1"],
]
const _HARD = [
  ["2", " ", " ", "6", "9", " ", "8", " ", "1"],
  [" ", " ", " ", " ", " ", "3", "6", " ", " "],
  [" ", "1", "3", "8", " ", "2", "5", "4", " "],

  ["7", " ", "5", " ", "8", " ", "3", "9", "6"],
  ["8", "3", " ", "4", " ", " ", " ", " ", " "],
  ["1", " ", "6", " ", " ", "5", " ", " ", " "],

  ["3", "7", " ", "9", " ", "6", " ", "1", " "],
  [" ", "2", "9", "1", " ", "8", " ", " ", " "],
  ["5", "6", " ", "3", " ", " ", " ", "2", " "],
]


const getRow = function (board, row) {
  //return an array with all the array elements from the row
  return board[row];
};

const getColumn = function (board, column) {
  //this return an array with all the array elements fom the column
  let inColumn = [];
  for (let row in board) {
    inColumn.push(board[row][column]);
  }
  return inColumn;
};
const getQuad = function (board, quadNumber) {
  //creates an array of all elements in the same quadrant
  let inQuad = [];
  //this cycles though all the rows
  for (row in board) {
    //this cycles though all the columns
    for (col in board[row]) {
      if (_COARDS[row][col] === quadNumber) {
        inQuad.push(board[row][col]);
      }
    }
  }
  return inQuad;
};
console.log(getQuad(_COARDS, 1));
//filter through all the possible values and return all of the used values and return only the possible values of that cell
const getPossible = function (board, row, col) {
  let inColumn = getColumn(board, col);
  let inRow = getRow(board, row);
  let inQuad = getQuad(board, _COARDS[row][col]);
  let possible = new Array(9).fill("").map((_, i) => {
    return i + 1;
  });

  let notPossible = [];

  //checking through the columns horizontally
  inRow.forEach((curr, r) => {
    let included = false;
    notPossible.forEach((curr, p) => {
      if (inRow[r] == notPossible[p]) {
        included = true;
      }
    });
    if (!included) {
      notPossible.push(inRow[r]);
    }
  });

  //checking through the columns vertically
  inColumn.forEach((curr, c) => {
    let included = false;
    notPossible.forEach((curr, p) => {
      if (inColumn[c] == notPossible[p]) {
        included = true;
      }
    });
    if (!included) {
      notPossible.push(inColumn[c]);
    }
  });

  // [(".", "9", "4", "2", "1", "3", "6", "5", "7")];  //checking quad
  inQuad.forEach((curr, q) => {
    let included = false;
    notPossible.forEach((curr, p) => {
      if (inQuad[q] == notPossible[p]) {
        included = true;
      }
    });
    if (!included) {
      notPossible.push(inQuad[q]);
    }
  });

  notPossible = notPossible.filter((curr) => curr !== " ");

  notPossible.forEach((_, n) => {
    possible.forEach((_, p) => {
      if (notPossible[n] == possible[p]) {
        possible.splice(p, 1);
      }
    });
  });
  return possible;
};
console.log(_BOARD);
console.log(gridArr);
const fillInCell = function (board, row, column) {
  let possible = getPossible(board, row, column);

  if (board[row][column] == " ") {
    if (possible.length == 1) {
      board[row][column] = possible[0];
    }
  }
};
let newAnswers = new Array(9).fill(0).map((row, i) => {
  return new Array(9).fill(9).map((col) => {
    return null;
  });
});
newAnswers.forEach((row, i) => {
  row.forEach((col, j) => {
    newAnswers[i][j] = _BOARD[i][j];
  });
});

let state = true;
while (state) {
  let counter = 0;
  for (row2 in newAnswers) {
    for (col2 in newAnswers[row2]) {
      fillInCell(newAnswers, row2, col2);
      if (newAnswers[row2][col2] !== " ") {
        counter++;
      }
      if (counter == 81) {
        state = false;
      }
    }
  }
}
console.table(newAnswers);

const sodokuSolver = function(board){
  let state = true;
  let newAnswers = new Array(9).fill(0).map((row, i) => {
    return new Array(9).fill(9).map((col) => {
      return null;
    });
  });
  newAnswers.forEach((row, i) => {
    row.forEach((col, j) => {
      newAnswers[i][j] = board[i][j];
    });
  });
  while (state) {
    let counter = 0;
    for (row2 in newAnswers) {
      for (col2 in newAnswers[row2]) {
        fillInCell(newAnswers, row2, col2);
        if (newAnswers[row2][col2] !== " ") {
          counter++;
        }
        if (counter == 81) {
          state = false;
        }
      }
    }
  }
  return newAnswers
}
let med = sodokuSolver(_MED)
let hard = sodokuSolver(_HARD)
console.table(med)
console.log(hard)
/**'
 *1st 
   create the board 
   im going to push 72 divs into my container with a class of con
   then i will create a 2d array of all the rows
 */

const gridItems = function () {
  new Array(81).fill("").forEach((_, i) => {
    let styleBorder = "";
    const div = document.createElement("div");
    div.setAttribute("class", "col");

    styleBorder +=
      "border-bottom:1px solid #e2e2e2;border-right:1px solid #e2e2e2;";

    div.style = styleBorder;

    gridContainer.append(div);
  });
};
gridItems();

/*
81 items
gridArr = [9 rows, 9 columns in each row ]
*/

let rowMultiplyer = 0;
let nodeArr = Array.from(gridContainer.querySelectorAll(".col"));

gridArr.forEach((_, i) => {
  gridArr.forEach((_, j) => {
    gridArr[i][j] = nodeArr[j + rowMultiplyer];
  });
  rowMultiplyer += 9;
});
const AddingCoardBorders = function () {
  gridArr
    .map((row, i) => {
      let columns;
      row.forEach((col, j) => {
        if (j == 8) {
          columns = col;
        }
      });
      return columns;
    })
    .forEach((curr) => {
      curr.style.borderRight = "none";
    });

  gridArr[8].forEach((curr) => {
    curr.style.borderBottom = "none";
  });

  gridArr
    .map((row, i) => {
      let arr = row.filter((col, j) => {
        if (j == 2 || j == 5) {
          return col;
        }
      });
      return arr;
    })
    .flat()
    .forEach((curr) => {
      curr.style.borderRight = "3px solid #d3d3d4";
    });

  gridArr
    .filter((row, i) => {
      return i == 2 || i == 5;
    })
    .flat()
    .forEach((curr) => {
      curr.style.borderBottom = "3px solid #d3d3d4";
    });
};
AddingCoardBorders();

let displayGame = function (board) {
  gridArr.forEach((row, i) => {
    row.forEach((col, j) => {
      col.textContent = board[i][j];
    });
  });
};
displayGame(_BOARD);

/**
 * 
 * click on a square and make the background color light pink and able to put a number
 * on the clicked square if it it correct display the correct number if it is incorrect make 
 * the background color of the square light red and dont display the number
 *   
 * 
 * 
add event listeners to all the empty squares

add a background color of light pink to know the square was selected and whenever you click 
on a new square changed the previous square to a white background

//click on a num check to see if it is incorrect or incorect if correct make the color pink and
add the number also make sure they cant rechange the number

if incorect make the background light red and remove number
*/
let gridTextcontent = gridArr.map((row, i) => {
  let currentRow = row.map((col, j) => {
    return col.textContent;
  });
  return currentRow;
});
let clicked = false;
let correct;
//this is giving is a array of the clickable squares
let emptySquares = gridArr.map((row, i) => {
  let columns = row.filter((col, j) => {
    if (col.textContent == " ") {
      return col;
    }
  });
  return columns;
});

const clickSquare = function () {
  emptySquares = gridArr.map((row, i) => {
    let columns = row.filter((col, j) => {
      if (col.textContent == " ") {
        return col;
      }
    });
    return columns;
  });
  //click == true
  //click ==false
  emptySquares.flat().forEach((curr) => {
    curr.addEventListener("mouseenter", (e) => {
      if (clicked == false) {

        gridArr.forEach((row, i) => {
          row.forEach((col, j) => {
             col.style.backgroundColor = 'white'
       });
     })
        emptySquares
          .flat()
          .forEach((current) => (current.style.backgroundColor = "white"));

        e.target.style.backgroundColor = "#ffd6ee";
      }
    });
  });

  function eventSquare(e) {
    emptySquares.flat().forEach((current) => {
      current.style.backgroundColor = "rgb(255, 255, 255)";
    });
    clicked == false ? (clicked = e.target) : (clicked = false);
    e.target.style.backgroundColor = "rgb(255, 204, 238)";
    //  correct =
    correct = checkSquare();
    seletNum();
  }

  emptySquares.flat().forEach((curr) => {
    curr.addEventListener("click", eventSquare);
  });
};

function keyDown(e) {
  console.log(e);
  console.log("hi");
}
function updateBoard(col, text) {
  let column = col;
  console.log(column);
  if (text) {
    return (gridTextcontent = gridTextcontent.map((row, i) => {
      if (column[0] == i) {
        return row.map((col, j) => {
          if (column[1] == j) {
            return text;
          }
          return col;
        });
      }
      return row;
    }));
  }
  //2 arrays for the cols and values
  //make the cols able to delete
  };
const btns = Array.from(document.querySelectorAll(".btn"));
//currentBoard
let currentBoard;
const seletNum = function () {
  if (clicked) {
    btns.forEach((curr) => {
      curr.addEventListener("click", function (e) {

       
        const num = e.target.textContent;
        if (clicked) {
          checkForIncorrect(checkSquare(false), num);
        }

        if (correct.includes(+num)) {
          clicked.textContent = num;
          clicked.style.color = "#d86b22";
          updateBoard(checkSquare(false), clicked.textContent);
          console.table(gridTextcontent);
        } else {
          8;
          clicked.style.backgroundColor = "#fa9e9e";
          console.log();
        }
      });
    });
    window.addEventListener("keydown", function (e) {
      if (clicked) {
        checkForIncorrect( checkSquare(false), e.key);
      }
      if (Number.parseInt(e.key)) {
        if (correct.includes(+e.key)) {
          clicked.textContent = e.key;
          clicked.style.color = "#d86b22";
          updateBoard(checkSquare(false), e.key);
        } else {
          clicked.style.backgroundColor = "#fa9e9e";
        }
      }
    });
  }
};

function checkSquare(answerArray = true) {
  let coards = [];
  gridArr.forEach((row, i) => {
    row.forEach((col, j) => {
      if (
        col.style.backgroundColor == "rgb(255, 204, 238)"
      ) {
        coards.push(i, j);
      }
    });
  });

  let answer = getPossible(gridTextcontent, coards[0], coards[1]);
  if (answerArray) {
    return answer;
  }
  return coards;
}
clickSquare();

function checkForIncorrect(coards, chekingAnswer) {
  let [rowNumber, column] = coards;


  //paramters will be the current board
  //where are we going to check? each time we click on a square
  //
  //loop through the current board and get the cooards for the incorrect column
  //loop throgh the row and find the incrrect number in the row
  //when i have found it set bg to red
  //loop trough column
  //
  //we will push the cols that are incorrect into array
  //we are going to turn then bg color red

  gridArr.forEach((row, i) => {
    if (row[column].textContent == chekingAnswer) {
      row[column].style.backgroundColor = '#fa9e9e'
        }
    });

  gridArr.forEach((row, i) => {
    if (i == rowNumber) {
       row.forEach((col, j) => {
        if (col.textContent == chekingAnswer) {
          console.log(true)
          col.style.backgroundColor = '#fa9e9e'
        }
      });
    }
  });
}

// //!!add the hover effect
// //!!add the unclick to the square
// //work on the the the board logoc
// /**
//  *!! instaed the user only selecting the correct answer i need to let him choose the options the the answer [8,2,1] he will find out later why that doesnt work
//  *
//  * if he chosses the inorect answer highlight the boxes to let him know it was incorrect
//  *
//  *
//  */
// //!!add key events to press keys


//add different boards create select
//add a timer
//solve the whole sudoku btn
//local storage
//create modal in html with the rules
