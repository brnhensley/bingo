//Backend Logic
// This is the Board constructor that creates an empty array and a place for the winner.
function Board() {
  this.spaces = [];
  this.usedNumbers = [0];
}

// Creates the board html with unique IDs
Board.prototype.createBoard = function () {
  var tableCell = ""
  for (var i = 0; i < 25; i++) {
    // these are the Space Id's where to begin new lines on the grid.
    if (i === 0 || i === 5 || i === 10 || i == 15 || i == 20) {
      tableCell += "<tr>"
    }
    
    if (i === 12) {
      tableCell += "<th class='bingoSquare marked free' id='" + i + "'>★</th>"
    } else {
      tableCell += "<th class='bingoSquare' id='" + i + "'>" + this.createSpaceValue(i) + "</th>"
    }
    
    // this part ends a row when it gets to space value 2, 5, 8
    if (i === 4 || i === 9 || i === 14 || i == 19 || i == 24) {
      tableCell += "</tr>"
    }
  }
  // This is the function to empty the board and immediately recreate it.
  $("#board").append(tableCell);
}

// This createhs the value for each space without duplicates.
Board.prototype.createSpaceValue = function (squareId) {
  let column = squareId % 5;
  let rowModifier = column * 15 + 1

  let randomNumber = 0;
  while (this.usedNumbers.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * Math.floor(14)) + rowModifier;
  }

  this.usedNumbers.push(randomNumber)
  return randomNumber;
};

// This checks all the winning conditions on every click
Board.prototype.checkWin = function () {
  var s = this.spaces;
  if ((s[0] && (s[0] === s[1] && s[1] === s[2])) ||
    (s[3] && (s[3] === s[4] && s[4] === s[5])) ||
    (s[6] && (s[6] === s[7] && s[7] === s[8])) ||
    (s[0] && (s[0] === s[3] && s[3] === s[6])) ||
    (s[1] && (s[1] === s[4] && s[4] === s[7])) ||
    (s[2] && (s[2] === s[5] && s[5] === s[8])) ||
    (s[0] && (s[0] === s[4] && s[4] === s[8])) ||
    (s[2] && (s[2] === s[4] && s[4] === s[6]))) {
    return true;
  }
};

//UI Logic
// On click background color changes and table cells get class to highlight the,
function addEventHandlers() {
  $("th").click(function () {
    $('body').animate({ "background-color": randomcolor() }, 200);
    $(`#${this.id}`).toggleClass("marked")
  });
}

var randomcolor = function () {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var color = "rgb(" + r + ", " + g + ", " + b + ")"
  return color;
}

var myBoard = new Board();

$(document).ready(function () {
  myBoard.createBoard()
  addEventHandlers();

  $("#clear-game").click(function () {
    $(".marked").removeClass("marked")
  });
})
