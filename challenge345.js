
// File:   challenge345.js
// Author: John Longley
// Date:   May 2020 (during lockdown)

// Javascript code for Level 3,4,5 Dobble challenge (uniform implementation)

// GUI globals

const cardCanvasSize = 100;  // must match canvas width and height as set in CSS
const cardCenter = cardCanvasSize / 2;
const cardRadius = 40;
const miniRadius = [0, 0, 0, 15, 14, 13];      // radius of circular region allocated for each symbol
const verticalFudge = 3;
const miniCenters = [[], [], [],  // padding
// for level 3:
[[cardCenter, cardCenter - (cardRadius / 2) - verticalFudge],
[cardCenter - (cardRadius * 0.433), cardCenter + (cardRadius / 4) - verticalFudge],
[cardCenter + (cardRadius * 0.433), cardCenter + (cardRadius / 4) - verticalFudge]],
// for level 4:
[[cardCenter - (cardRadius * 0.354), cardCenter - (cardRadius * 0.354) - verticalFudge],
[cardCenter + (cardRadius * 0.354), cardCenter - (cardRadius * 0.354) - verticalFudge],
[cardCenter - (cardRadius * 0.354), cardCenter + (cardRadius * 0.354) - verticalFudge],
[cardCenter + (cardRadius * 0.354), cardCenter + (cardRadius * 0.354) - verticalFudge]],
// for level 5:
[[cardCenter, cardCenter - (cardRadius * 0.630) - verticalFudge],
[cardCenter - (cardRadius * 0.600) - 1, cardCenter - (cardRadius * 0.195) + 1],
[cardCenter + (cardRadius * 0.600) + 1, cardCenter - (cardRadius * 0.195) + 1],
[cardCenter - (cardRadius * 0.370), cardCenter + (cardRadius * 0.510)],
[cardCenter + (cardRadius * 0.370), cardCenter + (cardRadius * 0.510)]]];

const fontHeight = 20;
const defaultSymButtonStyle = ""; // "font-size: 25px; width: 30px; ";
const highlightedSymButtonStyle = defaultSymButtonStyle + "background-color: #848481;" + "color: #dfc00b;" + "border-radius: 5px;" + "font-weight: bold";
const numberNames = ['zero', 'one', 'two', 'three', 'four', 'five'];  // for error reporting

var currSymbol = '';
var active = true;
var symbolCount = [0, 0, 0, 0, 0, 0];
// total number of symbols currently on cards for each level 
// (to detect when cards are full)

// Logical model globals

const numberOfCards = [0, 1, 3, 7, 13, 21];
const totalSyms = [0, 1, 6, 21, 52, 105];

const solutions345 = [[], [], [],  // padding
// level 3 solution (padded for indexing from 1):
[[], ['A', 'B', 'C'], ['A', 'D', 'E'], ['A', 'F', 'G'], ['B', 'D', 'F'],
['B', 'E', 'G'], ['C', 'D', 'G'], ['C', 'E', 'F']],
// level 4 solution:
[[], ['A', 'B', 'C', 'D'], ['A', 'E', 'F', 'G'], ['A', 'H', 'I', 'J'], ['A', 'K', 'L', 'M'],
['B', 'E', 'H', 'K'], ['B', 'F', 'I', 'L'], ['B', 'G', 'J', 'M'],
['C', 'E', 'I', 'M'], ['C', 'F', 'J', 'K'], ['C', 'G', 'H', 'L'],
['D', 'E', 'J', 'L'], ['D', 'F', 'H', 'M'], ['D', 'G', 'I', 'K']],
// level 5 solution, tba:
[[], ['A', 'B', 'C', 'D', 'E'], ['A', 'F', 'G', 'H', 'I'], ['A', 'J', 'K', 'L', 'M'],
['A', 'N', 'O', 'P', 'Q'], ['A', 'R', 'S', 'T', 'U'], ['B', 'F', 'J', 'N', 'R'],
['B', 'G', 'K', 'P', 'S'], ['B', 'H', 'M', 'Q', 'T'], ['B', 'I', 'L', 'O', 'U'],
['C', 'F', 'K', 'O', 'T'], ['C', 'G', 'J', 'Q', 'U'], ['C', 'H', 'L', 'P', 'R'],
['C', 'I', 'M', 'N', 'S'], ['D', 'F', 'M', 'P', 'U'], ['D', 'G', 'L', 'N', 'T'],
['D', 'H', 'J', 'O', 'S'], ['D', 'I', 'K', 'Q', 'R'], ['E', 'F', 'L', 'Q', 'S'],
['E', 'G', 'M', 'O', 'R'], ['E', 'H', 'K', 'N', 'U'], ['E', 'I', 'J', 'P', 'T']]];

var currentCardContents = [[], [], [], // padding
// level 3 contents (padded for indexing from 1):
[[], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']],
// level 4 contents, tba:
[[], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''],
['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', ''],
['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
// level 5 contents, tba:
[[], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''],
['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''],
['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''],
['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''],
['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''],
['', '', '', '', '']]];
// can improve this, obviously!

// Card code

function square(x) {
  return x * x;
}

function isWithin(x, y, cx, cy, r) {
  return (square(x - cx) + square(y - cy) < square(r));
}

function writeSymbol(lev, cardNumber, slot, sym) {
  // note sym may be ''
  var c = document.getElementById("card" + lev + "-" + cardNumber);
  var ctx = c.getContext("2d");
  var CX = miniCenters[lev][slot][0];
  var CY = miniCenters[lev][slot][1];
  // delete previous symbol with filled rectangle
  ctx.fillStyle = "#f5eefaff";
  ctx.fillRect(CX - (fontHeight / 2), CY - (fontHeight / 2), fontHeight, fontHeight);
  // add new symbol
  ctx.font = "" + fontHeight + "px Arial";
  ctx.fillStyle = "#0202dbff";
  ctx.textAlign = "center";
  ctx.fillText(sym, CX, CY + (fontHeight / 2));
  // update program data
  if (currentCardContents[lev][cardNumber][slot] == '' && sym != '') {
    symbolCount[lev] += 1;
    if (symbolCount[lev] == totalSyms[lev]) {
      document.getElementById("check-btn" + lev).disabled = false;
    }
  }
  currentCardContents[lev][cardNumber][slot] = sym;
}

function writeCurrSymbol(lev, event, cardNumber) {
  if (active && currSymbol != '') {
    var c = document.getElementById("card" + lev + "-" + cardNumber);
    var ctx = c.getContext("2d");
    var X = event.offsetX;
    var Y = event.offsetY;
    for (i = 0; i < lev; i++) {
      var CX = miniCenters[lev][i][0];
      var CY = miniCenters[lev][i][1];
      if (isWithin(X, Y, CX, CY, miniRadius[lev])) {
        writeSymbol(lev, cardNumber, i, currSymbol);
      }
    }
  }
}

// Symbol button code

function resetSymbolButtons(lev) {
  for (j = 1; j <= numberOfCards[lev]; j++) {
    document.getElementById("btn" + lev + "-" + j).setAttribute("style", defaultSymButtonStyle);
  }
}

function setCurrSymbol(lev, sym, i) {
  if (active) {
    currSymbol = sym;
    resetSymbolButtons(lev);
    var btn = document.getElementById("btn" + lev + "-" + i);
    btn.setAttribute("style", highlightedSymButtonStyle);
  }
}

// Control button code

function initialize(lev) {
  document.getElementById("puzzle-message" + lev).innerHTML =
    'Level ' + lev + ' Dobble challenge';
  // padded to allow indexing from 1
  symbolCount[lev] = 0;
  writeSymbol(lev, 1, 0, 'A');
  writeSymbol(lev, 1, 1, 'B');
  writeSymbol(lev, 1, 2, 'C');
  if (lev >= 4) {
    writeSymbol(lev, 1, 3, 'D');
  }
  if (lev >= 5) {
    writeSymbol(lev, 1, 4, 'E');
  }
  for (i = 2; i <= numberOfCards[lev]; i++) {
    for (j = 0; j < lev; j++) {
      writeSymbol(lev, i, j, '');
    }
  }
  currSymbol = '';
  resetSymbolButtons(lev);
  active = true;
  document.getElementById("check-btn" + lev).disabled = true;
  document.getElementById("reveal-btn" + lev).disabled = false;
}

function raiseError(message) {
  alert('Not there yet! ' + message + '. Keep trying!');
}

function checkAnswer(lev) {
  var C = currentCardContents[lev];
  CheckBody: {
    // checking individual cards
    for (i = 1; i <= numberOfCards[lev]; i++) {
      for (j = 0; j < lev; j++) {
        if (C[i][j] == '') {
          raiseError('Card ' + i + ' not complete');
          break CheckBody;
        }
        for (k = j + 1; k < lev; k++) {
          if (C[i][j] == C[i][k]) {
            raiseError('Symbol ' + C[i][j] + ' appears more than once on card ' + i);
            break CheckBody;
          }
        }
      }
    }
    // checking pairs of cards
    for (i = 1; i <= numberOfCards[lev]; i++) {
      for (h = i + 1; h <= numberOfCards[lev]; h++) {
        var commonSyms = [];
        for (j = 0; j < lev; j++) {
          for (k = 0; k < lev; k++) {
            if (C[i][j] == C[h][k]) {
              commonSyms = commonSyms.concat([C[i][j]]);
            }
          }
        }
        if (commonSyms.length == 0) {
          raiseError('Cards ' + i + ' and ' + h + ' have no common symbol');
          break CheckBody;
        } else if (commonSyms.length > 1) {
          raiseError('Cards ' + i + ' and ' + h + ' share '
            + numberNames[commonSyms.length] + ' symbols: '
            + commonSyms.toString());
          break CheckBody;
        }
      }
    }
    // congrats message
    alert('Correct solution - WELL DONE!!');
  }
}

function revealSolution(lev) {
  document.getElementById("puzzle-message" + lev).innerHTML = 'One possible solution:';
  var solution = solutions345[lev];
  for (i = 1; i <= numberOfCards[lev]; i++) {
    for (j = 0; j < lev; j++) {
      writeSymbol(lev, i, j, solution[i][j]);
    }
  }
  resetSymbolButtons(lev);
  document.getElementById("reveal-btn" + lev).disabled = true;
  document.getElementById("check-btn" + lev).disabled = true;
  active = false;  // freeze everything until 'Start again' pressed
}

// Initial setup

window.onload = function () {
  for (lev = 3; lev <= 5; lev++) {
    for (i = 1; i <= numberOfCards[lev]; i++) {
      var c = document.getElementById("card" + lev + "-" + i);
      c.setAttribute("width", "100px");
      c.setAttribute("height", "100px");
      var ctx = c.getContext("2d");
      // draw circle
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cardCenter, cardCenter, cardRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      // add card number in red
      ctx.font = "15px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText("" + i, 8, 16);
    }
    initialize(lev);
  }
}

// EOF