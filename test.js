//constants
const nConst = 5;
const F = new PrimeField(nConst, 1);
const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "ς", "τ", "υ", "φ", "χ", "ψ", "ω",
    "1", "2", "3", "4", "5", "6", "7", "8", "9"]

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

function testFieldBtn() {
    document.getElementById("testbox").innerHTML = "Field of order " + F.noOfElems + "<br>";
    document.getElementById("testbox").innerHTML += "Add: 2 + 3 = " + F.add(2, 3) + "<br>";
    //document.getElementById("testbox").innerHTML += "Neg: -3 = " + F.neg(3) + "<br>";
    document.getElementById("testbox").innerHTML += "Mult: 2 * 3 = " + F.mult(2, 3) + "<br>";
    //document.getElementById("testbox").innerHTML += "Inv: 3^-1 = " + F.inv(3) + "<br>";
}

//make list of non-origin points
//n^3 box with:
// 1 to n^3-1 vals
let nonOriginPoints = [];
for (let i = 1; i < F.noOfElems ** 3; i++) {
    nonOriginPoints.push(i);
}
function testFieldBtnN3() {
    document.getElementById("testboxN3").innerHTML = "Non-origin points (n^3): " + "<br>" + nonOriginPoints;
}

//projective plane with:
//(n^3-1)/(n-1) = n^2+n+1
//div(n^2), div(n), mod(n)
const noOfPoints = (F.noOfElems ** 3 - 1) / (F.noOfElems - 1);
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
    let result = new Array(F.noOfElems ** 3);
    result[0] = "0";
    let charIndex = 0;
    for (let i = 1; i < F.noOfElems ** 3; i++) {
        if (result[i] == null) {
            let lineI = lineFor(i, F);
            // assign same character to all points on this line
            let currentChar = chars[charIndex];
            for (let l = 0; l < lineI.length; l++) {
                result[lineI[l]] = currentChar;
            }

            charIndex++;
            //document.getElementById("orig").innerHTML += "Line " + charIndex + ": " + lineI + " -> " + currentChar + "<br>";
        }
    }

    return result;
}

function geometry(F, chars) {
    //call findLines, group characters.
    //chars is a list of n^2+n+1 characters.
    //return list of cards which is list of n-1 characters. //list of list
    let lines = findLines(F, chars);
    let cards = [];
    let noOfCards = F.noOfElems ** 2 + F.noOfElems + 1;
    for (let i = 0; i < noOfCards; i++) {
        cards.push([]);
    }
    for (let i = 1; i <= lines.length; i++) {
        let lineChar = lines[i];
        //group lineindex when character changes to make a card with 4 symbols
        for (let c = 0; c < cards.length; c++) {
            if (cards[c].length < F.noOfElems - 1 && !cards[c].includes(lineChar)) {
                cards[c].push(lineChar);
                break;
            }
        }
    }
    return cards;
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
    document.getElementById("testboxLine").innerHTML += "<br> New line chars: " + newLine.slice(1, newLine.length);
}
function testFieldBtnGeom() {
    for (let i = 0; i < noOfPoints; i++) {
        document.getElementById("testboxGeom").innerHTML += "Card " + (i + 1) + ": " + geometry(F, characters)[i] + "<br>";
    }
}
