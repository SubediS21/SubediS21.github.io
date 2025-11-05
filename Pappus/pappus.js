/*
window.onload = function () {
    for (i = 1; i <= 13; i++) {
        var c = document.getElementById("circle1");
        var ctx = c.getContext("2d");
        // draw circle
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(50, 50, 40, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        // add card number in red
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.fillText("", 8, 16);
    }
    initialize(lev);
}
*/
/* level4
const currentCardContents = [['A', 'B', 'C', 'D'], ['A', 'E', 'F', 'G'], ['A', 'H', 'I', 'J'], ['A', 'K', 'L', 'M'],
['B', 'E', 'H', 'K'], ['B', 'F', 'I', 'L'], ['B', 'G', 'J', 'M'],
['C', 'E', 'I', 'M'], ['C', 'F', 'J', 'K'], ['C', 'G', 'H', 'L'],
['D', 'E', 'J', 'L'], ['D', 'F', 'H', 'M'], ['D', 'G', 'I', 'K']]

const currentSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']
*/

//level5
const currentLevel = 5

const currentCardContents = [['A', 'B', 'C', 'D', 'E'], ['A', 'F', 'G', 'H', 'I'], ['A', 'J', 'K', 'L', 'M'],
['A', 'N', 'O', 'P', 'Q'], ['A', 'R', 'S', 'T', 'U'], ['B', 'F', 'J', 'N', 'R'],
['B', 'G', 'K', 'P', 'S'], ['B', 'H', 'M', 'Q', 'T'], ['B', 'I', 'L', 'O', 'U'],
['C', 'F', 'K', 'O', 'T'], ['C', 'G', 'J', 'Q', 'U'], ['C', 'H', 'L', 'P', 'R'],
['C', 'I', 'M', 'N', 'S'], ['D', 'F', 'M', 'P', 'U'], ['D', 'G', 'L', 'N', 'T'],
['D', 'H', 'J', 'O', 'S'], ['D', 'I', 'K', 'Q', 'R'], ['E', 'F', 'L', 'Q', 'S'],
['E', 'G', 'M', 'O', 'R'], ['E', 'H', 'K', 'N', 'U'], ['E', 'I', 'J', 'P', 'T']]

const currentSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']


let selectedSymbols = [];
let selectedCards = [];
let pappusInput = [];

function selectSymbol(id) {

    selectedCards = []; //clear selected cards

    let symbolNumber = id.match(/\d+/g)[1];
    const currentSelectedSymbol = currentSymbols[symbolNumber - 1];
    const index = selectedSymbols.indexOf(currentSelectedSymbol);

    for (let i = 1; i <= currentSymbols.length; i++) {
        const symbol = document.getElementById("symbol5-" + i);
        symbol.style.color = "";
        symbol.style.border = "";
    }

    //restore
    selectedSymbols.forEach(sym => {
        if (sym !== currentSelectedSymbol) {
            const symIndex = currentSymbols.indexOf(sym) + 1;
            const symElement = document.getElementById("symbol5-" + symIndex);
            symElement.style.color = "blue";
            symElement.style.borderColor = "#c9eaf4";
        }
    }
    );

    if (index === -1) {
        if (selectedSymbols.length < 2) {
            selectedSymbols.push(currentSelectedSymbol);
            document.getElementById(id).style.color = "blue";
            document.getElementById(id).style.borderColor = "#c9eaf4";
        }
    } else {
        selectedSymbols.splice(index, 1);
        document.getElementById(id).style.color = "";
        document.getElementById(id).style.borderColor = "";
    }

    highlightCards();
}

function selectCard(card) {
    selectedSymbols = []; //clear selected symbols

    let cardNumber = card.match(/\d+/g)[1];
    const selectedCardContent = currentCardContents[cardNumber - 1];
    const index = selectedCards.indexOf(selectedCardContent);

    for (let i = 1; i <= currentCardContents.length; i++) {
        const cardImg = document.getElementById("card5-" + i);
        cardImg.style.border = "";
        cardImg.style.boxShadow = "";
    }

    //restore
    selectedCards.forEach(card => {
        if (card !== selectedCardContent) {
            const cardIndex = currentCardContents.indexOf(card) + 1;
            const cardElement = document.getElementById("card5-" + cardIndex);
            cardElement.style.border = "5px solid #9879b0";
        }
    }
    );

    if (index === -1) {
        if (selectedCards.length < 2) {
            selectedCards.push(selectedCardContent);
            document.getElementById(card).style.border = "5px solid #9879b0";
        }
    } else {
        selectedCards.splice(index, 1);
        document.getElementById(card).style.border = "";
    }

    highlightSymbols();
}

function highlightCards() {
    for (let i = 1; i <= currentCardContents.length; i++) {
        const cardImg = document.getElementById("card5-" + i);
        cardImg.style.border = "";
        cardImg.style.boxShadow = "";
    }
    if (selectedSymbols.length === 0) return;

    if (selectedSymbols.length === 1) {
        currentCardContents.forEach((symbols, j) => {
            if (symbols.includes(selectedSymbols[0])) {
                const cardImg = document.getElementById("card5-" + (j + 1));
                cardImg.style.border = "5px solid #9879b0";
                cardImg.style.boxShadow = "0 0 15px #f8f6faff";
            }
        });
    }
    if (selectedSymbols.length === 2) {
        currentCardContents.forEach((symbols, j) => {
            if ((symbols.includes(selectedSymbols[0])) && (symbols.includes(selectedSymbols[1]))) {
                const cardImg = document.getElementById("card5-" + (j + 1));
                cardImg.style.border = "5px solid #c9eaf4";
                cardImg.style.boxShadow = "0 0 15px #264751ff";
            }
        });
    }
}

function highlightSymbols() {
    for (let i = 1; i <= currentSymbols.length; i++) {
        const symbol = document.getElementById("symbol5-" + i);
        symbol.style.color = "";
        symbol.style.border = "";
    }
    if (selectedCards.length === 0) return;
    if (selectedCards.length === 1) {
        currentSymbols.forEach((symbolContent, j) => {
            for (let k = 0; k < currentLevel; k++) {
                if (symbolContent.includes(selectedCards[0][k])) {
                    const symbol = document.getElementById("symbol5-" + (j + 1));
                    symbol.style.color = "blue";
                    symbol.style.border = "5px solid green";
                }
            }
        })
    }
    if (selectedCards.length === 2) {
        currentSymbols.forEach((symbolContent, j) => {
            for (let k = 0; k < currentLevel; k++) {
                for (let l = 0; l < currentLevel; l++) {
                    if ((symbolContent.includes(selectedCards[0][k])) && (symbolContent.includes(selectedCards[1][l]))) {
                        //document.getElementById("test").innerHTML = selectedCards[0][k] + k + selectedCards[1][l] + l;
                        const symbol = document.getElementById("symbol5-" + (j + 1));
                        symbol.style.color = "blue";
                        symbol.style.border = "5px solid red";
                    }
                }
            }
        })
    }
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedCard = document.getElementById(data);
    const dropZone = (event.target.closest && event.target.closest(".dropzone")) || event.currentTarget;

    pappusInput.push([data, dropZone.id]);

    //allow only one card, if more back to card container
    const existingCard = dropZone.querySelector("img");
    if (existingCard && existingCard.id !== data) {
        existingCard.style.width = "100px";
        existingCard.style.height = "100px";
        existingCard.style.position = "relative";
        const cardContainer = document.getElementById("card-container");
        //removeFromLine(existingCard);
        cardContainer.appendChild(existingCard);
    }

    draggedCard.style.width = "80px";
    draggedCard.style.height = "80px";
    draggedCard.style.position = "absolute";

    dropZone.appendChild(draggedCard);
    checkLine();
    //event.target.appendChild(document.getElementById(data));
}

function dropBack(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const cardBack = document.getElementById(data);
    const cardContainer = (event.target.closest && event.target.closest("card-container")) || event.currentTarget;

    cardBack.style.width = "100px";
    cardBack.style.height = "100px";
    cardBack.style.position = "relative";
    cardContainer.appendChild(cardBack);
}

function checkLine() {
    document.getElementById("test").innerHTML = "Line " + pappusInput;
}

function removeFromLine(card){
    /*var i = 0;
    while (i < pappusInput.length){
        if (pappusInput[i] === card){
            pappusInput.splice(i, 1);
        } else{
            ++i;
        }
    }
    var j = 0;
    while (j < pappusInput.length){
        if (pappusInput[j] === card.id){
            pappusInput.splice(j, 1);
        } else{
            ++j;
        }
    }*/
}

window.onload = function () {
    const canvas_papp = document.getElementById("pappus_canvas");
    const ctx_papp = canvas_papp.getContext("2d");

    var papp_width = canvas_papp.width;
    var papp_height = canvas_papp.height;
    ctx_papp.lineWidth = 2.5;

    //lines
    ctx_papp.beginPath();
    ctx_papp.setLineDash([]);
    //top line
    ctx_papp.moveTo(0, papp_height / 4);
    ctx_papp.lineTo(papp_width, papp_height / 5);
    //bottom line
    ctx_papp.moveTo(0, papp_height * 3 / 4);
    ctx_papp.lineTo(papp_width, papp_height * 4 / 5);
    //style
    ctx_papp.stroke();

    //top1 lines
    ctx_papp.beginPath();
    ctx_papp.setLineDash([15, 7.5]);
    //t1->b2
    ctx_papp.moveTo(90, 180);
    ctx_papp.lineTo(320, 595);
    //t1->b3
    ctx_papp.moveTo(90, 180);
    ctx_papp.lineTo(500, 605);

    //top2 lines
    //t2->b1
    ctx_papp.moveTo(300, 167.5);
    ctx_papp.lineTo(120, 580);
    //t2->b3
    ctx_papp.moveTo(300, 167.5);
    ctx_papp.lineTo(500, 605);

    //top3 lines
    //t3->b1
    ctx_papp.moveTo(515, 155);
    ctx_papp.lineTo(120, 580);
    //t3->b2
    ctx_papp.moveTo(515, 155);
    ctx_papp.lineTo(320, 595);
    ctx_papp.strokeStyle = "blue";
    ctx_papp.stroke();

    //top points
    ctx_papp.beginPath();
    ctx_papp.setLineDash([]);
    ctx_papp.arc(90, 180, 40, 0, 2 * Math.PI);//top1
    ctx_papp.moveTo(310, 167.5);
    ctx_papp.arc(300, 167.5, 40, 0, 2 * Math.PI);//top2
    ctx_papp.moveTo(515, 155);
    ctx_papp.arc(515, 155, 40, 0, 2 * Math.PI);//top3
    ctx_papp.fillStyle = "black";
    ctx_papp.fill();
    ctx_papp.strokeStyle = "black";
    ctx_papp.stroke();

    //bottom points
    ctx_papp.beginPath();
    ctx_papp.setLineDash([]);
    ctx_papp.arc(120, 580, 40, 0, 2 * Math.PI);//b1
    ctx_papp.moveTo(320, 595);
    ctx_papp.arc(320, 595, 40, 0, 2 * Math.PI);//b2
    ctx_papp.moveTo(500, 605);
    ctx_papp.arc(500, 605, 40, 0, 2 * Math.PI);//b3
    ctx_papp.fillStyle = "black";
    ctx_papp.fill();
    ctx_papp.strokeStyle = "black";
    ctx_papp.stroke();

    //INTERSECTION LINE
    ctx_papp.beginPath();
    ctx_papp.setLineDash([10, 5])
    ctx_papp.moveTo(0, 374.25);
    ctx_papp.lineTo(600, 410);
    ctx_papp.strokeStyle = "red";
    ctx_papp.stroke();

    //intersection points
    ctx_papp.beginPath();
    ctx_papp.setLineDash([]);
    //t1->b2 --- t2->b1
    ctx_papp.arc(205, 385, 40, 0, 2 * Math.PI);
    //t1->b3 --- t3->b1
    ctx_papp.moveTo(295, 390);
    ctx_papp.arc(295, 390, 40, 0, 2 * Math.PI);
    //t2->b3 --- t3->b2
    ctx_papp.moveTo(405, 398);
    ctx_papp.arc(405, 398, 40, 0, 2 * Math.PI);
    ctx_papp.fillStyle = "black";
    ctx_papp.strokeStyle = "black";
    ctx_papp.fill();
    ctx_papp.stroke();

    ctx_papp.font = "12px Arial";
    ctx_papp.fillText("[line sym]", 550, 185);
    ctx_papp.fillText("[line sym]", 550, 435);
    ctx_papp.fillText("[line sym]", 550, 635);
}