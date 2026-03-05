//constants

let nConst;
let F;
let fontHeight = 20;

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
    "Z", "α", "β", "Γ", "δ", "ε", "ζ", "η", "θ", "ἵ'", "κ'", "λ", "μ", "ν'", "ξ", "ὀ", "π", "Ϸ", "ς", "τ'", "ύ", "φ", "χ'", "ψ", "ω",
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "£",
    "क", "ख", "ग", "घ", "ङ ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
    "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "अ", "ई", "ऊ", "ए", //100
    "ऋ", "$", "€", "¥", "%", "◲", "⋕", "ϡ", "Ͽ", "Δ", "Σ", "ϖ", "⫍", "∽", "◊", "§", "@", "¬", "个", "大",
    "山", "三", "义", "飞", "乡", "川", "九", "中", "日", "开", "水", "斗", "及"];
//133 symbols

const cardCanvasSize = 100;
const cardCenter = cardCanvasSize / 2;
const cardRadius = 40;
const miniRadius = [0, 0, 0, 15, 14, 13, 12, 11, 10, 9, 9, 9, 9];      // radius of circular region allocated for each symbol
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
[cardCenter + (cardRadius * 0.370), cardCenter + (cardRadius * 0.510)]],
//for level 6:
[[cardCenter, cardCenter - (cardRadius * 0.6) - verticalFudge],
[cardCenter - (cardRadius * 0.6), cardCenter - (cardRadius * 0.22) - verticalFudge],
[cardCenter + (cardRadius * 0.6), cardCenter - (cardRadius * 0.22) - verticalFudge],
[cardCenter - (cardRadius * 0.55), cardCenter + (cardRadius * 0.3)],
[cardCenter + (cardRadius * 0.55), cardCenter + (cardRadius * 0.3)],
[cardCenter, cardCenter + (cardRadius * 0.75) - verticalFudge]],
//no level 7
[],
//for level 8:
[[cardCenter, cardCenter - (cardRadius * 0.5) - verticalFudge],
[cardCenter - (cardRadius * 0.55), cardCenter - (cardRadius * 0.3) - verticalFudge],
[cardCenter + (cardRadius * 0.55), cardCenter - (cardRadius * 0.3) - verticalFudge],
[cardCenter, cardCenter],
[cardCenter - (cardRadius * 0.55), cardCenter + (cardRadius * 0.12)],
[cardCenter + (cardRadius * 0.55), cardCenter + (cardRadius * 0.12)],
[cardCenter - (cardRadius * 0.28), cardCenter + (cardRadius * 0.63)],
[cardCenter + (cardRadius * 0.28), cardCenter + (cardRadius * 0.63)]],
//for level 9, tba:
[],
//for level 10, tba:
[],
//for level 11, tba:
[],
//for level 12:
[[cardCenter - (cardRadius * 0.22), cardCenter - (cardRadius * 0.55) - verticalFudge], //1
[cardCenter + (cardRadius * 0.22), cardCenter - (cardRadius * 0.55) - verticalFudge], //2

[cardCenter - (cardRadius * 0.6), cardCenter - (cardRadius * 0.18) - verticalFudge], //3
[cardCenter - (cardRadius * 0.2), cardCenter - (cardRadius * 0.18) - verticalFudge], //4
[cardCenter + (cardRadius * 0.2), cardCenter - (cardRadius * 0.18) - verticalFudge], //5
[cardCenter + (cardRadius * 0.6), cardCenter - (cardRadius * 0.18) - verticalFudge], //6

[cardCenter - (cardRadius * 0.6), cardCenter + (cardRadius * 0.25) - verticalFudge], //7
[cardCenter - (cardRadius * 0.2), cardCenter + (cardRadius * 0.25) - verticalFudge], //8
[cardCenter + (cardRadius * 0.2), cardCenter + (cardRadius * 0.25) - verticalFudge], //9
[cardCenter + (cardRadius * 0.6), cardCenter + (cardRadius * 0.25) - verticalFudge], //10

[cardCenter - (cardRadius * 0.22), cardCenter + (cardRadius * 0.65) - verticalFudge], //11
[cardCenter + (cardRadius * 0.22), cardCenter + (cardRadius * 0.65) - verticalFudge]]]; //12

function inputLvl() {
    nConst = parseInt(document.getElementById("level").value) - 1;
    //nConst = 11;
    if (nConst == 4) {
        F = new FieldOfFour(nConst);
    }
    else if (nConst == 6) {
        document.getElementById("testprint").innerHTML = "Level 7 (order 6) Dobble does not exist. 6 is not a prime number or a power of a prime number."
        clearCanvas();
        return;
    }
    else {
        F = new PrimeField(nConst);
    }
    loadGeom();
}

function loadGeom() {
    const noOfPoints = F.noOfElems ** 2 + F.noOfElems + 1;
    let cards = geometry(F, characters);
    document.getElementById("testprint").innerHTML = "Level " + (nConst + 1) + " (order " + (nConst) + ") cards: <br><br>";
    for (let i = 0; i < noOfPoints; i++) {
        document.getElementById("testprint").innerHTML += "Card " + cards[i][0] + ": - " + cards[i][1] + "<br>";
    }
    document.getElementById("testprint").innerHTML += "<br>Number of cards/symbol: " + noOfPoints;
    clearCanvas();
    makeCards(cards);
}



function makeCards(allCards) {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    //make the cards fit in the canvas
    const noOfPoints = F.noOfElems ** 2 + F.noOfElems + 1;
    const cardsPerRow = Math.ceil(Math.sqrt(noOfPoints));
    const rows = Math.ceil(noOfPoints / cardsPerRow);

    canvas.setAttribute("width", (cardCanvasSize *cardsPerRow) + 20); // set canvas width to fit all cards with some padding
    canvas.setAttribute("height", (cardCanvasSize * rows) + 20); // set canvas height with some padding
    canvas._grid = {cardsPerRow, rows};

    //display cards with allCards by geometry function
    for (let i = 0; i < allCards.length; i++) {
        let card = allCards[i];
        let sym = card[0];
        let cardSyms = card[1];
        let col = (i % cardsPerRow) + 1;
        let row = Math.floor(i / cardsPerRow) + 1;

        //draw circle for each card
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(((col - 1) * cardCanvasSize + cardCenter), ((row - 1) * cardCanvasSize + cardCenter), cardRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        for (let j = 0; j < cardSyms.length; j++) {
            let symCard = cardSyms[j];
            writeSymbol(nConst + 1, i, j, symCard, col, row);
        }
    }
}

function writeSymbol(lev, cardNumber, slot, sym, col, row) {
    //make cards with one canvas and make circles for each symbol position. write symbol in circle.
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const offsetX = (col - 1) * cardCanvasSize;
    const offsetY = (row - 1) * cardCanvasSize;
    const X = miniCenters[lev][slot][0] + offsetX;
    const Y = miniCenters[lev][slot][1] + offsetY;
    if (lev == 12){
        fontHeight = 18;
    }
    ctx.fillStyle = "#f5eefaff";
    ctx.fillRect(X - (fontHeight / 2), Y - (fontHeight / 2), fontHeight, fontHeight);
    ctx.font = "" + fontHeight + "px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sym, X, Y);
}

function clearCanvas(){
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    c.setAttribute("width", 20);
    c.setAttribute("height", 20);
}



//p(prime)
//n = p^k (Dobble Level -1 )
//n finite field with:
//noOfElems
//add(x,y)
//neg(x)
//mult(x,y)
//inv(x)
function PrimeField(p) {
    this.p = p;
    this.noOfElems = p;
    this.add = function (x, y) {
        return (x + y) % this.p;
    }
    this.mult = function (x, y) {
        return (x * y) % this.p;
    }
}

function FieldOfFour() {
    this.noOfElems = 4;
    this.addition = [[0, 1, 2, 3], [1, 0, 3, 2], [2, 3, 0, 1], [3, 2, 1, 0]];
    this.add = function (x, y) {
        return this.addition[x][y];
    }
    this.multiplication = [[0, 0, 0, 0], [0, 1, 2, 3], [0, 2, 3, 1], [0, 3, 1, 2]];
    this.mult = function (x, y) {
        return this.multiplication[x][y];
    }
}
/*
function FiniteField(p, k) {
    this.p = p;
    this.k = k;
    this.noOfElems = Math.pow(p, k);
    this.add = function(x, y){
        if (this.noOfElems == 4) {
            if (x == 0) {
                return y;
            } else if (y == 0) {
                return x;
            } else if (x == 1) {
                if (y == 1) return 0;
                else if (y == 2) return 3;
                else if (y == 3) return 2; 
            } else if (x == 2) {
                if (y == 1) return 3;
                else if (y == 2) return 0;
                else if (y == 3) return 1;
            } else if (x == 3) {
                if (y == 1) return 2;
                else if (y == 2) return 1;
                else if (y == 3) return 0;
            }
        }
    }      
    this.neg = function(x) {
        return (this.noOfElems - x) % this.noOfElems;
    }
    this.mult = function(x, y){
        if (this.noOfElems == 4) {
            if (x == 0 || y == 0) {
                return 0;
            } else if (x == 1) {
                return y;
            } else if (y == 1) {
                return x;
            } else if (x == 2) {
                if (y == 2) return 3;
                else if (y == 3) return 1;
            } else if (x == 3) {
                if (y == 2) return 1;
                else if (y == 3) return 2;
            }
        }
    }
    this.inv = function(x) {
        for (let i = 1; i < this.noOfElems; i++) {
            if (this.mult(x, i) === 1) {
                return i;
            }
        }
        return undefined; // no inverse found/undefined for 0
    }
*/


//make list of non-origin points
//n^3 box with:
// 1 to n^3-1 vals
let nonOriginPoints = [];
for (let i = 1; i < F.noOfElems ** 3; i++) {
    nonOriginPoints.push(i);
}

//projective plane with:
//(n^3-1)/(n-1) = n^2+n+1
//div(n^2), div(n), mod(n)
//const noOfPoints = (F.noOfElems ** 3 - 1) / (F.noOfElems - 1);
function getPointCoords(pointNum, n) {
    let x = Math.floor((pointNum) / (n ** 2));
    let y = Math.floor(((pointNum) % (n ** 2)) / n);
    let z = (pointNum) % n;
    return [x, y, z];
}
function getPointNum(pointCoords, n) {
    return (pointCoords[0] * n * n) + (pointCoords[1] * n) + (pointCoords[2]);
}

function lineFor(pointNum, F) {
    let origPoint = getPointCoords(pointNum, F.noOfElems);
    //document.getElementById("orig").innerHTML += "orig point: " + origPoint;
    let line = [];
    for (let i = 1; i < F.noOfElems; i++) {
        let newPointNum = [F.mult(origPoint[0], i), F.mult(origPoint[1], i), F.mult(origPoint[2], i)];
        //document.getElementById("orig").innerHTML += "<br> newPointNum: " + newPointNum;
        line.push(getPointNum(newPointNum, F.noOfElems));
    }
    return line;
}

function findLines(F, chars) {
    // return an n^3 array where pointNums of a line = character representation
    let lineChar = new Array(F.noOfElems ** 3);
    lineChar[0] = "0";
    let charIndex = 0;
    for (let i = 1; i < F.noOfElems ** 3; i++) {
        if (lineChar[i] == null) {
            let lineI = lineFor(i, F);
            // assign same character to all points on this line
            let currentChar = chars[charIndex];
            for (let l = 0; l < lineI.length; l++) {
                lineChar[lineI[l]] = currentChar;
            }

            charIndex++;
            //document.getElementById("orig").innerHTML += "Line " + charIndex + ": " + lineI + " -> " + currentChar + "<br>";
        }
    }

    return lineChar;
}

function charToPoint(F, chars) {
    //make a dictionary to see where the chars are in the line.
    //e.g. A -> 1
    // B -> 5
    // C -> 6
    // D -> 7
    // ... 
    // ε -> 49
    let line = findLines(F, chars);
    let dict = [];
    let charIndex = 0;
    let pointNumChar = "";
    for (let i = 1; i < line.length; i++) {
        if (line[i] != pointNumChar && !dict.some(e => e[0] === line[i])) {
            pointNumChar = line[i];
            dict.push([pointNumChar, i]);
            charIndex++;
        }
    }
    return dict;
}

function dotProduct(F, pointA, pointB) {
    return F.add(F.add(F.mult(pointA[0], pointB[0]), F.mult(pointA[1], pointB[1])), F.mult(pointA[2], pointB[2]));
}

function geometry(F, chars) {
    //allCards = []
    //for c in chars
    //currCard =[]
    //for s in chars
    // if dot product of (getPointCoords(cDictionaryNum) and getPointCoords(sDictionaryNum)) == 0
    // add c to currCard
    // if n-1 char in currCard add currCard to allCards.
    let allCards = [];
    let dict = charToPoint(F, chars);

    for (let c = 0; c < dict.length; c++) {
        let currCard = [];

        let cSym = dict[c][0];
        let cDictNum = dict[c][1];
        let cCoords = getPointCoords(cDictNum, F.noOfElems);

        for (let s = 0; s < dict.length; s++) {
            let sSym = dict[s][0];
            let sDictNum = dict[s][1];
            let sCoords = getPointCoords(sDictNum, F.noOfElems);

            if (dotProduct(F, cCoords, sCoords) == 0) {
                currCard.push(sSym);
            }
        }
        //currCard = [...new Set(currCard)];
        allCards.push([cSym, (currCard)]);
    }
    return allCards;
}

function testFieldBtn() {
    document.getElementById("testbox").innerHTML = "Field of order " + F.noOfElems + "<br>";
    document.getElementById("testbox").innerHTML += "Add: 2 + 3 = " + F.add(2, 3) + "<br>";
    //document.getElementById("testbox").innerHTML += "Neg: -3 = " + F.neg(3) + "<br>";
    document.getElementById("testbox").innerHTML += "Mult: 2 * 3 = " + F.mult(2, 3) + "<br>";
    //document.getElementById("testbox").innerHTML += "Inv: 3^-1 = " + F.inv(3) + "<br>";
}
function testFieldBtnN3() {
    document.getElementById("testboxN3").innerHTML = "Non-origin points (n^3): " + "<br>" + nonOriginPoints;
}
function testFieldBtnPP() {
    document.getElementById("testboxPP").innerHTML = "Projective Plane of order " + F.noOfElems + "<br>";
    document.getElementById("testboxPP").innerHTML += "Total Points: " + nonOriginPoints.length + "<br>";
    for (let i = 1; i <= nonOriginPoints.length; i++) {
        let coords = getPointCoords(i, F.noOfElems);
        document.getElementById("testboxPP").innerHTML += "Point " + i + ": (" + coords + ") <br>";
    }
}
function testFieldBtnLine() {
    let newLine = findLines(F, characters);
    //document.getElementById("testboxLine").innerHTML += "new points: " + lineFor(8, F);
    document.getElementById("testboxLine").innerHTML += "Add characters lines to the pointNums: " + "<br>";
    for (let i = 1; i < F.noOfElems ** 3; i++) {
        //document.getElementById("testboxLine").innerHTML += i + ": " ;
        document.getElementById("testboxLine").innerHTML += newLine[i] + ", ";
    }
}
function testFieldBtnGeom() {
    let cards = geometry(F, characters);
    document.getElementById("testboxGeom").innerHTML += "Level " + (nConst + 1) + " (order " + (nConst) + ") cards: <br><br>";
    for (let i = 0; i < noOfPoints; i++) {
        document.getElementById("testboxGeom").innerHTML += "Card " + cards[i][0] + ": - " + cards[i][1] + "<br>";
    }
    document.getElementById("testboxGeom").innerHTML += "<br>Number of cards/symbol: " + noOfPoints;
    //document.getElementById("testboxGeom").innerHTML += geometry(F, characters) + "<br>";
}
function testFieldBtnDict() {
    document.getElementById("testboxDict").innerHTML += "Dictionary: " + "<br>"
    for (let i = 0; i < noOfPoints; i++) {
        document.getElementById("testboxDict").innerHTML += charToPoint(F, characters)[i][0] + " --> " + charToPoint(F, characters)[i][1] + ", ";
    }
}

//save canvas "canvas" as jpg image in the same folder.
function saveCanvas() {
    var canvas = document.getElementById("canvas");
    var link = document.createElement('a');
    link.download = 'dobble_cards.jpg';
    link.href = canvas.toDataURL("image/jpeg", 1.0);
    link.click();
}