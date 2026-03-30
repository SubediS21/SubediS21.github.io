
// File:   realproj.js
// Author: John Longley
// Date:   May 2020 (during lockdown)

// Javascript code for real projective plane applet

// globals

var lower = document.getElementById("projection-lower-canvas");
var mid = document.getElementById("projection-mid-canvas");
var higher = document.getElementById("projection-higher-canvas");
lower.setAttribute("width", "500px");
lower.setAttribute("height", "300px");
mid.setAttribute("width", "500px");
mid.setAttribute("height", "300px");
higher.setAttribute("width", "500px");
higher.setAttribute("height", "300px");
var lowerCtxt = lower.getContext("2d");
var midCtxt = mid.getContext("2d");
var higherCtxt = higher.getContext("2d");

var width = higher.width;
var height = higher.height;
var origX = 250;
var origY = 150;
var planeX1 = 100;
var planeX2 = 160;
var planeY11 = 50;
var planeY12 = 250;
var planeY21 = 90;
var planeY22 = 210;
var planeXmid = (planeX1 + planeX2) / 2;
var grd1 = (planeY21 - planeY11) / (planeX2 - planeX1);
var grd2 = (planeY22 - planeY12) / (planeX2 - planeX1);

// on initialization:
drawBackdrop();

function drawBackdrop() {
  // to do: use three canvases to get crossings right
  midCtxt.fillStyle = "#000000";  // black
  midCtxt.beginPath();
  midCtxt.arc(origX, origY, 5, 0, 2 * Math.PI);
  midCtxt.fill();
  midCtxt.strokeStyle = "#004400";
  midCtxt.lineWidth = 3;
  midCtxt.beginPath();
  midCtxt.moveTo(planeX1, planeY11 - 15);
  midCtxt.lineTo(planeX1, planeY12 + 15);
  midCtxt.moveTo(planeX1 - 15, planeY11 - (15 * grd1));
  midCtxt.lineTo(planeX2 + 9, planeY21 + (9 * grd1));
  midCtxt.moveTo(planeX2, planeY21 - 9);
  midCtxt.lineTo(planeX2, planeY22 + 9);
  midCtxt.moveTo(planeX1 - 15, planeY12 - (15 * grd2));
  midCtxt.lineTo(planeX2 + 9, planeY22 + (9 * grd2));
  midCtxt.stroke();
  // faint line marking vanishing of plane at infinity
  midCtxt.strokeStyle = "#9879b0";
  midCtxt.beginPath();
  midCtxt.moveTo(origX, 0);
  midCtxt.lineTo(origX, origY - 10);
  midCtxt.moveTo(origX, origY + 10);
  midCtxt.lineTo(origX, height);
  midCtxt.stroke();
}

// main code for points, rays, lines, planes

function withinWindow(x, y) {
  return (x > planeX1 && x < planeX2 && y > planeY11 && y < planeY12 &&
    (y - planeY11) / (x - planeX1) > (planeY21 - planeY11) / (planeX2 - planeX1) &&
    (y - planeY12) / (x - planeX1) < (planeY22 - planeY12) / (planeX2 - planeX1));
}

var mode = 0;
var displayChanged = false;
var storedX = 130;
var storedY = 150;  // for now

function hexString(z) {
  var s = Math.round(z).toString(16);
  if (s.length == 2) {
    return s;
  } else if (s.length == 1) {
    return "0" + s;
    //  } else if (s.length == 0) {
    //    return "00" ;
  }
}

function distanceFactor(X) {
  // takes X coord within trapezium, returns beta in [-1,1]
  return (X - planeXmid) / (planeX2 - planeXmid);
}

function blueShade(t) {
  // t=-1 darkest, t=1 lightest
  if (t >= 1) { t = 1; }
  if (t <= -1) { t = -1; }
  var RGcomp = (t + 1) * 96;
  var RGstr = hexString(RGcomp);
  var Bcomp = 143 + (t * 112);
  var Bstr = hexString(Bcomp)
  return "#" + RGstr + RGstr + Bstr;
}

function spotRadiusFor(X) {
  if (X < planeX1 / 2) {
    return 6;
  } else if (X < planeX1) {
    return 5;
  } else if (X < planeX2) {
    return 4;
  } else if (X < (planeX2 + origX) / 2) {
    return 3;
  } else if (X < (planeX2 + 3 * origX) / 4) {
    return 2;
  } else {
    return 1;
  }
}

function sq(x) {
  return x * x;
}

function drawRayAndSpot(X, Y) {
  // draw ray, with color gradient to suggest third dimension
  var k = 1.80;
  // var l = Math.sqrt(sq(origX-X) + sq(origY-Y)) ;
  // var k = origX / l ; 
  var dX = k * (origX - X);
  var dY = k * (origY - Y);
  var beta = distanceFactor(X);
  var blueGrad = higherCtxt.createLinearGradient(origX - dX, origY, origX + dX, origY);
  blueGrad.addColorStop(0, blueShade(beta));
  blueGrad.addColorStop(1, blueShade(-beta));
  higherCtxt.strokeStyle = blueGrad;
  higherCtxt.lineWidth = 2;
  higherCtxt.beginPath();
  higherCtxt.moveTo(X, Y);
  higherCtxt.lineTo(origX + dX, origY + dY);
  higherCtxt.stroke();
  lowerCtxt.strokeStyle = blueGrad;
  lowerCtxt.lineWidth = 2;
  lowerCtxt.beginPath();
  lowerCtxt.moveTo(X, Y);
  lowerCtxt.lineTo(origX - dX, origY - dY);
  lowerCtxt.stroke();
  // highlight point of intersection with plane
  higherCtxt.fillStyle = "#FF0000";   // red
  higherCtxt.beginPath();
  higherCtxt.arc(X, Y, spotRadiusFor(X), 0, 2 * Math.PI);
  higherCtxt.fill();
}

function dot(x1, y1, x2, y2) {
  return (x1 * x2) + (y1 * y2);
}

function avoidZero(z, d) {
  if (Math.abs(z) < 1) {
    return d;
  } else {
    return z;
  }
}

function showRay(event) {
  var X = event.offsetX;
  var Y = event.offsetY;
  if (mode == 2) {
    return;
  }
  if ((displayChanged && X < origX) || withinWindow(X, Y)) {
    higherCtxt.clearRect(0, 0, width, height);
    lowerCtxt.clearRect(0, 0, origX, height);
    if (mode == 1) {
      // computing color gradient for filled triangles
      var Xs = storedX, Ys = storedY;
      var beta = distanceFactor(X);
      var betas = distanceFactor(Xs);
      // shift to coordinates centered on origin
      var x = X - origX, xs = Xs - origX, y = Y - origY, ys = Ys - origY;
      // some linear algebra magic:
      var det = avoidZero((x * ys) - (y * xs), 1);
      var A = (ys * beta) - (y * betas), B = (x * betas) - (xs * beta);
      // so (A,B) is the grad vector for colour
      var xm, ym, betam;
      if (Math.abs(dot(A, B, x, y)) > Math.abs(dot(A, B, xs, ys))) {
        xm = x; ym = y; betam = beta;
      } else {
        xm = xs; ym = ys; betam = betas;
      }
      var ABlength = avoidZero(Math.sqrt((A * A) + (B * B)), 1);
      var a = A / ABlength, b = B / ABlength;
      var abDist = dot(xm, ym, a, b);
      var A1 = a * abDist, B1 = b * abDist;
      // now ready to set up the color gradient
      var blueAreaGrad =
        higherCtxt.createLinearGradient(origX + A1, origY + B1, origX - A1, origY - B1);
      blueAreaGrad.addColorStop(0, blueShade(betam));
      blueAreaGrad.addColorStop(1, blueShade(-betam));
      higherCtxt.fillStyle = blueAreaGrad;
      // first triangle:
      higherCtxt.beginPath();
      higherCtxt.moveTo(origX, origY);
      higherCtxt.lineTo(Xs, Ys);
      higherCtxt.lineTo(X, Y);
      higherCtxt.closePath();
      higherCtxt.fill();
      // alternate triangle:
      higherCtxt.beginPath();
      higherCtxt.moveTo(origX, origY);
      higherCtxt.lineTo(origX * 2 - Xs, origY * 2 - Ys);
      higherCtxt.lineTo(origX * 2 - X, origY * 2 - Y);
      higherCtxt.closePath();
      higherCtxt.fill();
      // two more blue lines to complete the parallelogram
      higherCtxt.strokeStyle = blueAreaGrad;
      higherCtxt.beginPath();
      higherCtxt.moveTo(X, Y);
      higherCtxt.lineTo(origX * 2 - Xs, origY * 2 - Ys);
      higherCtxt.moveTo(Xs, Ys);
      higherCtxt.lineTo(origX * 2 - X, origY * 2 - Y);
      higherCtxt.stroke();
      // add red line
      var redGrad = higherCtxt.createLinearGradient(planeX2, 0, origX, 0);
      redGrad.addColorStop(0, "#FF0000");
      redGrad.addColorStop(1, "#FFFFFF");
      higherCtxt.strokeStyle = redGrad;
      // higherCtxt.strokeStyle = "#FF0000" ;
      higherCtxt.lineWidth = 3;
      higherCtxt.beginPath();
      higherCtxt.moveTo(Xs, Ys);
      higherCtxt.lineTo(X, Y);
      higherCtxt.stroke();
      // continuations of red line
      if (Math.abs(Xs - X) > 4 || Math.abs(Ys - Y) > 4) {
        higherCtxt.lineWidth = 1;
        higherCtxt.beginPath();
        if (Ys == Y) {  // treated as special case
          var Xmax = Math.max(X, Xs), Xmin = Math.min(X, Xs);
          if (Xmax < origX - 10) {
            higherCtxt.moveTo(Xmax, Y);
            higherCtxt.lineTo(origX - 10, Y);
          }
          higherCtxt.moveTo(Xmin, Y);
          higherCtxt.lineTo(0, Y);
        } else {
          var Xhi, Yhi, Xlo, Ylo;
          if (Ys < Y) {
            Xhi = Xs; Yhi = Ys; Xlo = X; Ylo = Y;
          } else {
            Xhi = X; Yhi = Y; Xlo = Xs; Ylo = Ys;
          }
          var Ydiff = Ylo - Yhi, Xdiff = Xlo - Xhi;  // so Ydiff>0
          if (Xhi < origX - 10) {
            // add higher line
            higherCtxt.moveTo(Xhi, Yhi);
            var Xtop = Xhi - (Yhi * Xdiff / Ydiff);
            if (Xtop >= origX - 10) {
              higherCtxt.lineTo(origX - 10, Yhi + (origX - 10 - Xhi) * Ydiff / Xdiff);
            } else {
              higherCtxt.lineTo(Xtop, 0);  // won't matter if Xtop<0
            }
          }
          if (Xlo < origX - 10) {
            // add lower line
            higherCtxt.moveTo(Xlo, Ylo);
            var Xbot = Xlo + ((height - Ylo) * Xdiff / Ydiff);
            if (Xbot >= origX - 10) {
              higherCtxt.lineTo(origX - 10, Ylo + (origX - 10 - Xlo) * Ydiff / Xdiff);
            } else {
              higherCtxt.lineTo(Xbot, height); // again, ok if Xbot<0
            }
          }
        }
        higherCtxt.stroke();
      }
      drawRayAndSpot(Xs, Ys);

    }
    drawRayAndSpot(X, Y);
    displayChanged = true;
  } else if (displayChanged) {
    higherCtxt.clearRect(0, 0, width, height);
    lowerCtxt.clearRect(0, 0, origX, height);

    if (mode == 1) {
      drawRayAndSpot(storedX, storedY);
    }
    // displayChanged = false ;
  }
}

function switchMode(event) {
  var X = event.offsetX;
  var Y = event.offsetY;
  if (mode == 0) {
    if (X < origX && displayChanged) { // was: withinWindow(X,Y)
      mode = 1;
      storedX = X;
      storedY = Y;
    } else {
      displayChanged = false;
    }
  } else {
    mode = 0;
    if (withinWindow(X, Y)) {
      showRay(event);
    } else {
      higherCtxt.clearRect(0, 0, width, height);
      lowerCtxt.clearRect(0, 0, origX, height);
      displayChanged = false;
    }
  }
}

const cardCanvasSize = 100;  // must match canvas width and height as set in CSS
const cardCenter = cardCanvasSize / 2;
const cardRadius = 40;
const miniRadius = [0, 0, 0, 15, 14, 13, 12];      // radius of circular region allocated for each symbol
const verticalFudge = 3;
const miniCenters = [[], [], [], [], [], [],  // padding
//for level 6:
[[cardCenter, cardCenter - (cardRadius * 0.6) - verticalFudge],
[cardCenter - (cardRadius * 0.6), cardCenter - (cardRadius * 0.22) - verticalFudge],
[cardCenter + (cardRadius * 0.6), cardCenter - (cardRadius * 0.22) - verticalFudge],
[cardCenter - (cardRadius * 0.55), cardCenter + (cardRadius * 0.3)],
[cardCenter + (cardRadius * 0.55), cardCenter + (cardRadius * 0.3)],
[cardCenter, cardCenter + (cardRadius * 0.75) - verticalFudge]]];

const fontHeight = 20;
const defaultSymButtonStyle = ""; // "font-size: 25px; width: 30px; ";
const highlightedSymButtonStyle = defaultSymButtonStyle + "color: #9068aeff;" + "border-radius: 7px;";
const numberNames = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];  // for error reporting
var currSymbol = '';
var active = true;
var symbolCount = [0, 0, 0, 0, 0, 0, 0];
// total number of symbols currently on cards for each level 
// (to detect when cards are full)

// Logical model globals

const numberOfCards = [0, 1, 3, 7, 13, 21, 31];
const totalSyms = [0, 1, 6, 21, 52, 105, 186];

const solutions6 = [[], [], [], [], [], [], [[],
['A', 'F', 'L', 'P', 'W', 'γ'], ['B', 'F', 'M', 'Q', 'X', 'δ'], ['C', 'F', 'N', 'R', 'Y', 'Z'], ['D', 'F', 'O', 'S', 'U', 'α'], ['E', 'F', 'K', 'T', 'V', 'β'],
['A', 'G', 'M', 'T', 'Y', 'α'], ['B', 'G', 'N', 'P', 'U', 'β'], ['C', 'G', 'O', 'Q', 'V', 'γ'], ['D', 'G', 'K', 'R', 'W', 'δ'], ['E', 'G', 'L', 'S', 'X', 'Z'],
['A', 'H', 'N', 'S', 'V', 'δ'], ['B', 'H', 'O', 'T', 'W', 'Z'], ['C', 'H', 'K', 'P', 'X', 'α'], ['D', 'H', 'L', 'Q', 'Y', 'β'], ['E', 'H', 'M', 'R', 'U', 'γ'],
['A', 'I', 'O', 'R', 'X', 'β'], ['B', 'I', 'K', 'S', 'Y', 'γ'], ['C', 'I', 'L', 'T', 'U', 'δ'], ['D', 'I', 'M', 'P', 'V', 'Z'], ['E', 'I', 'N', 'Q', 'W', 'α'],
['A', 'J', 'K', 'Q', 'U', 'Z'], ['B', 'J', 'L', 'R', 'V', 'α'], ['C', 'J', 'M', 'S', 'W', 'β'], ['D', 'J', 'N', 'T', 'X', 'γ'], ['E', 'J', 'O', 'P', 'Y', 'δ'],
['Z', 'α', 'β', 'γ', 'δ', 'ε'], ['K', 'L', 'M', 'N', 'O', 'ε'], ['U', 'V', 'W', 'X', 'Y', 'ε'], ['F', 'G', 'H', 'I', 'J', 'ε'],
['A', 'B', 'C', 'D', 'E', 'ε'], ['P', 'Q', 'R', 'S', 'T', 'ε']]];

var currentCardContents = [[], [], [], [], [], [], [[],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''],
['', '', '', '', '', '']]];

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
  //document.getElementById("testbtn").innerHTML = currSymbol;
  if (active && currSymbol != '') {
    var c = document.getElementById("card" + lev + "-" + cardNumber);
    var ctx = c.getContext("2d");
    var X = event.offsetX;
    var Y = event.offsetY;
    console.log("Click at X=" + X + ", Y=" + Y);
    for (var i = 0; i < lev; i++) {
      var CX = miniCenters[lev][i][0];
      var CY = miniCenters[lev][i][1];
      console.log("position: " + i + "center=(" + CX + "," + CY + "), radius=" + miniRadius[lev]);

      if (isWithin(X, Y, CX, CY, miniRadius[lev])) {
        writeSymbol(lev, cardNumber, i, currSymbol);
      }
    }
  }
}

// Symbol button code

function resetSymbolButtons(lev) {
  for (var j = 1; j <= numberOfCards[lev]; j++) {
    document.getElementById("btn" + lev + "-" + j).setAttribute("style", defaultSymButtonStyle);
  }
}

function setCurrSymbol(lev, sym, i) {
  if (active) {
    currSymbol = sym;
    resetSymbolButtons(lev);
    var btn = document.getElementById("btn" + lev + "-" + i);
    btn.setAttribute("style", highlightedSymButtonStyle);
    //document.getElementById("testbtn").innerHTML = currSymbol;
  }
}

// Control button code

function initialize(lev) {
  document.getElementById("puzzle-message" + lev).innerHTML = "";
  // padded to allow indexing from 1
  symbolCount[lev] = 0;

  for (var i = 1; i <= numberOfCards[lev]; i++) {
    for (var j = 0; j < lev; j++) {
      writeSymbol(lev, i, j, '');
      writeSymbol(lev, 1, 0, 'A');
      writeSymbol(lev, 6, 0, 'A');
      writeSymbol(lev, 11, 0, 'A');
      writeSymbol(lev, 16, 0, 'A');
      writeSymbol(lev, 21, 0, 'A');
      writeSymbol(lev, 30, 0, 'A');
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
    for (var i = 1; i <= numberOfCards[lev]; i++) {
      for (var j = 0; j < lev; j++) {
        if (C[i][j] == '') {
          raiseError('Card ' + i + ' not complete');
          break CheckBody;
        }
        for (var k = j + 1; k < lev; k++) {
          if (C[i][j] == C[i][k]) {
            raiseError('Symbol ' + C[i][j] + ' appears more than once on card ' + i);
            break CheckBody;
          }
        }
      }
    }
    // checking pairs of cards
    for (var i = 1; i <= numberOfCards[lev]; i++) {
      for (var h = i + 1; h <= numberOfCards[lev]; h++) {
        var commonSyms = [];
        for (j = 0; j < lev; j++) {
          for (var k = 0; k < lev; k++) {
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
  var solution = solutions6[lev];
  for (var i = 1; i <= numberOfCards[lev]; i++) {
    for (var j = 0; j < lev; j++) {
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
  lev = 6;
  for (var i = 1; i <= numberOfCards[lev] - lev; i++) {
    var c = document.getElementById("card" + lev + "-" + i);
    c.setAttribute("width", "100px");
    c.setAttribute("height", "100px");
    var ctx = c.getContext("2d");
    // draw circle
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardCanvasSize, 0);
    ctx.lineTo(cardCanvasSize, cardCanvasSize);
    ctx.lineTo(0, cardCanvasSize);
    ctx.lineTo(0, 0);
    ctx.lineTo(cardCanvasSize, 0);
    ctx.fillStyle = "#fae351";
    ctx.fill();
    ctx.stroke();
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
    ctx.fillText("" + i, 10, 16);
  }
  const empty = document.getElementById("empty1");
  empty.setAttribute("width", "355px");
  empty.setAttribute("height", "80px");
  const empctx = empty.getContext("2d");
  empctx.font = "24px Arial";
  empctx.fillStyle = "#000000";
  empctx.textAlign = "center";
  empctx.fillText("Direction cards", 180, 70);

  // After initialize(lev); in window.onload

  // Get the canvases
  const empty2 = document.getElementById("empty2");
  const empty3 = document.getElementById("empty3");
  const empty4 = document.getElementById("empty4");

  // Get their bounding rectangles
  const rect2 = empty2.getBoundingClientRect();
  const rect3 = empty3.getBoundingClientRect();
  const rect4 = empty4.getBoundingClientRect();

  // Calculate the combined bounding box
  const minLeft = Math.min(rect2.left, rect3.left, rect4.left);
  const minTop = Math.min(rect2.top, rect3.top, rect4.top);
  const maxRight = Math.max(rect2.right, rect3.right, rect4.right);
  const maxBottom = Math.max(rect2.bottom, rect3.bottom, rect4.bottom);

  // Get the container's position for relative positioning
  const container = document.querySelector(".card-container2");
  const containerRect = container.getBoundingClientRect();

  // Create the image element
  const overlayImg = document.createElement("img");
  overlayImg.src = "dobble2_imgs/directions.png";
  overlayImg.style.position = "absolute";
  overlayImg.style.left = (minLeft - containerRect.left) + "px";
  overlayImg.style.top = (minTop - containerRect.top) + "px";
  overlayImg.style.width = (maxRight - minLeft - 10) + "px";
  overlayImg.style.height = (maxBottom - minTop + 10) + "px";
  //overlayImg.style.zIndex = "10";
  //overlayImg.style.objectFit = "cover";

  // Append to the container
  container.appendChild(overlayImg);

  /*const ctximg = document.getElementById("empty2").getContext("2d");
  const img = new Image();
  img.addEventListener("load", () => {
    ctximg.drawImage(img, 0, 0, 655, 684, 70, 0, 200, 300);
  });
  img.src = "directions.png";*/

  for (var j = numberOfCards[lev] - lev + 1; j <= numberOfCards[lev]; j++) {
    var c = document.getElementById("card" + lev + "-" + j);
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
    ctx.fillText("" + j, 10, 12);
  }
  initialize(lev);
}


//code reference fir scroll to top button: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_scroll_to_top
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}