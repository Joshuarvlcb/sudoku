const gridContainer = document.querySelector('.container');
let gridArr = new Array(9).fill('').map((_,i) => {
    return new Array(9).fill('').map((_,j,arr) => {
        return null
    })
})

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
    return possible
  };
  console.log(_BOARD)
  console.log(gridArr)
  const fillInCell = function (board, row, column) {
    let possible = getPossible(board, row, column);
   
    if (board[row][column] == ".") {
      if (possible.length == 1) {
        board[row][column] = possible[0];
      }
    }
  };
//   let state = true;
//   while (state) {
//     let counter = 0;
//     for (row2 in _BOARD) {
//       for (col2 in _BOARD[row2]) {
//         fillInCell(_BOARD, row2, col2);

//         if (typeof _BOARD[row2][col2] == "number") {
//           counter++;
//         }

//         if (counter == 81) {
//           state = false;
//         }
//       }
//     }
//   }
//   console.table(_BOARD);
   
   
   
  
  
/**'
 *1st 
   create the board 
   im going to push 72 divs into my container with a class of con
   then i will create a 2d array of all the rows
 */




const gridItems = function(){
    new Array(81).fill('').forEach((_,i) => {
        let styleBorder = ''
        const div = document.createElement('div')
        div.setAttribute('class','col');
   
         styleBorder +='border-bottom:1px solid #e2e2e2;border-right:1px solid #e2e2e2;'
 
        div.style = styleBorder
 
        gridContainer.append(div)
    })

}
gridItems()


/*
81 items
gridArr = [9 rows, 9 columns in each row ]
*/

let rowMultiplyer = 0;
let nodeArr = Array.from(gridContainer.querySelectorAll('.col'))

gridArr.forEach((_,i) => {
    gridArr.forEach((_,j) => {
        gridArr[i][j] = nodeArr[j + rowMultiplyer]
    })
    rowMultiplyer+=9

})
const removeBorders = function(){
    gridArr.map((row,i) => {
        let columns
         row.forEach((col,j) => {
            if(j == 8){
               columns = col
            }
        })
        return columns
    }).forEach(curr => {
        curr.style.borderRight = 'none'
    })

    gridArr[8].forEach(curr => {
        curr.style.borderBottom = 'none'
    })

     gridArr.map((row,i) => {
        let arr = row.filter((col,j) => {
            if(j ==2 || j ==5){
                return col
            }
        })
        return arr
    }).flat().forEach((curr) => {
        curr.style.borderRight = '3px solid #d3d3d4'

    })

     gridArr.filter((row,i) => {
        return i == 2 || i == 5;
    }).flat().forEach(curr => {
        curr.style.borderBottom = '3px solid #d3d3d4'
    })
}
removeBorders()

let displayGame = function(board){
    gridArr.forEach((row,i) => {
        row.forEach((col,j) => {
           col.textContent = board[i][j]            
        })
    })
}
displayGame(_BOARD)

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
const gridTextcontent = gridArr.map((row,i) => {
    let currentRow = row.map((col,j) => {
        return col.textContent
    });
    return currentRow
})
let clicked
const clickSquare = function(){
    let emptySquares = gridArr.map((row,i) => {
        let columns = row.filter((col,j) => {
            if(col.textContent == ' '){
                return col
            }
        })
        return columns
    })
    function eventSquare (e){
        emptySquares.flat().forEach(current => {
            current.style.backgroundColor = 'rgb(255, 255, 255)';
        });
        e.target.style.backgroundColor = 'rgb(247, 208, 215)';
        clicked = e.target
        console.log(e.target.textContent)
         seletNum()
         squareCorrect()

        
    }
  
    emptySquares.flat().forEach(curr => {
        curr.addEventListener('click',eventSquare);
    });
};
const btns = Array.from(document.querySelectorAll('.btn'));
const seletNum = function(){
    if(clicked){
        btns.forEach(curr => {
            curr.addEventListener('click',function(e){
                const num = e.target.textContent
                const possibles = squareCorrect()
                possibles.forEach(number => {
                    if(number == curr.textContent){
                        clicked.textContent = number
                    }else{
                        clicked.style.backgroundColor = 'red'
                    }
                })
            })
        })
    }
}
const squareCorrect = function(){
    let coards = []
     gridArr.forEach((row,i) => {
        row.forEach((col,j) => {
            if(col.style.backgroundColor == 'rgb(247, 208, 215)'){
                coards.push(i,j)
            }
        })
    })
    return getPossible(gridTextcontent,coards[0],coards[1])
}
clickSquare()
getPossible(_BOARD,0,2)