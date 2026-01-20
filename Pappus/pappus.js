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
        //select 2 symbols
        if (selectedSymbols.length < 2) {
            selectedSymbols.push(currentSelectedSymbol);
            document.getElementById(id).style.color = "blue";
            document.getElementById(id).style.borderColor = "#c9eaf4";
        }
        else if (selectedSymbols.length = 2) {
            //reset symbol 3 to symbol 1 when more than 2 symbols selected
            selectedSymbols = [currentSelectedSymbol];
            for (let i = 1; i <= currentSymbols.length; i++) {
                const symbol = document.getElementById("symbol5-" + i);
                symbol.style.color = "";
                symbol.style.border = "";
            }
            document.getElementById(id).style.color = "blue";
            document.getElementById(id).style.borderColor = "#c9eaf4";
        }
    } else {
        //unselect symbol when clicked twice
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
            //select 2 cards
            selectedCards.push(selectedCardContent);
            document.getElementById(card).style.border = "5px solid #9879b0";
        }
        else if (selectedCards.length = 2) {
            //reset card 3 to card 1 when more than 2 cards selected
            selectedCards = [selectedCardContent];
            for (let i = 1; i <= currentCardContents.length; i++) {
                const cardImg = document.getElementById("card5-" + i);
                cardImg.style.border = "";
                cardImg.style.boxShadow = "";
            }
            document.getElementById(card).style.border = "5px solid #9879b0";
        }
    } else {
        //unselect card when clicked twice
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
                        //document.getElementById("test").innerHTML = selectedCards;
                        const symbol = document.getElementById("symbol5-" + (j + 1));
                        symbol.style.color = "blue";
                        symbol.style.border = "5px solid red";
                    }
                }
            }
        })
    }
}

/*
//clear selected stuff
function clearList() {
    // Clear selected cards and symbols
    selectedCards = [];
    selectedSymbols = [];
    
    // Clear styling from all card elements
    for (let i = 1; i <= currentCardContents.length; i++) {
        const cardImg = document.getElementById("card5-" + i);
        cardImg.style.border = "";
        cardImg.style.boxShadow = "";
    }
    
    // Clear styling from all symbol elements
    for (let i = 1; i <= currentSymbols.length; i++) {
        const symbol = document.getElementById("symbol5-" + i);
        symbol.style.color = "";
        symbol.style.border = "";
    }
    
    // Update highlighting
    highlightCards();
    highlightSymbols();
}
*/
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
        existingCard.style.display = "none";
        const cardContainer = document.getElementById("card-container");
        cardContainer.appendChild(existingCard);
    }

    //make a copy of the card
    const cardClone = draggedCard.cloneNode(true);
    cardClone.id = data + "-clone";
    cardClone.style.border = "";
    cardClone.style.boxShadow = "";
    cardClone.style.width = "80px";
    cardClone.style.height = "80px";
    cardClone.style.position = "absolute";
    dropZone.appendChild(cardClone);
    checkLine();
    //event.target.appendChild(document.getElementById(data));
}
/*
//drop back to the card container
function dropBack(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const cardBack = document.getElementById(data);
    const cardContainer = (event.target.closest && event.target.closest("card-container")) || event.currentTarget;

    cardBack.style.width = "100px";
    cardBack.style.height = "100px";
    cardBack.style.position = "relative";
    if (cardBack.id.endsWith("-clone")) {
        cardBack.style.display = "none";
        cardContainer.appendChild(cardBack);
        return;
    }

    for (let i = pappusInput.length - 1; i >= 0; i--) {
        if (pappusInput[i][0] === data) pappusInput.splice(i, 1);
    }
    checkLine();
}
*/

function getZoneSymbols(zoneId) {
    const zone = document.getElementById(zoneId);
    if (!zone) return null;
    const img = zone.querySelector("img");
    if (!img) return null;
    const parts = img.id.split("-");
    const idx = parseInt(parts[1], 10) - 1;
    if (isNaN(idx) || !currentCardContents[idx]) return null;
    return currentCardContents[idx];
}

function setLineLabel(lineId, text, color) {
    const lbl = document.getElementById(lineId);
    //if (!lbl) return;
    lbl.textContent = text;
    lbl.style.color = color;
    lbl.style.fontWeight = "bold";
    return;
}

function checkLine() {
    setLineLabel("pStatus", "", "black")
    const groups = {
        top: ["top1", "top2", "top3"],
        intersection: ["intersection1", "intersection2", "intersection3"],
        bottom: ["bottom1", "bottom2", "bottom3"],
        int1line1: ["top1", "intersection1", "bottom2"],
        int1line2: ["top2", "intersection1", "bottom1"],
        int2line1: ["top1", "intersection2", "bottom3"],
        int2line2: ["top3", "intersection2", "bottom1"],
        int3line1: ["top2", "intersection3", "bottom3"],
        int3line2: ["top3", "intersection3", "bottom2"]
    };

    Object.keys(groups).forEach(line => {
        const zoneIds = groups[line];
        const symbols = zoneIds.map(getZoneSymbols);

        if (!symbols[0] || !symbols[1] || !symbols[2]) {
            setLineLabel(line, "", "#9879b0");
            return;
        }

        const inter12 = symbols[0].filter(s => symbols[1].includes(s));
        const commonAll = inter12.filter(s => symbols[2].includes(s));
        if (commonAll.length === 0) {
            //setLineLabel("pStatus", "!!! ERROR: NO COMMON SYMBOL on the line", "red");
            setLineLabel(line, "", "red");
            return;
        }
        else if (commonAll.length > 0) {
            if (line === "int1line1" || line == "int1line2") {
                setLineLabel(line, commonAll[0], "hotpink");
                setLineLabel("pStatus", "", "black");
            }
            else if (line === "int2line1" || line == "int2line2") {
                setLineLabel(line, commonAll[0], "green");
                setLineLabel("pStatus", "", "black");
            }
            else if (line === "int3line1" || line === "int3line2") {
                setLineLabel(line, commonAll[0], "orange");
                setLineLabel("pStatus", "", "black");
            }
            else {
                setLineLabel(line, commonAll[0], "#9625ecff");
                //setLineLabel("pStatus", "", "black");
            }
        }
    });
    //completed
    if (document.getElementById("top").textContent !== "" &&
        document.getElementById("bottom").textContent !== "" &&
        document.getElementById("intersection").textContent !== "" &&
        document.getElementById("int1line1").textContent !== "" &&
        document.getElementById("int1line2").textContent !== "" &&
        document.getElementById("int2line1").textContent !== "" &&
        document.getElementById("int2line2").textContent !== "" &&
        document.getElementById("int3line1").textContent !== "" &&
        document.getElementById("int3line2").textContent !== "") {
        setLineLabel("pStatus", "Well done! You have completed Pappus-Dobble!", "blue");
    }
}
function clearCardPappus() {
    //clear cards out of the drop zones
    pappusInput = [];
    const dropzones = document.getElementsByClassName("dropzone");
    for (let i = 0; i < dropzones.length; i++) {
        const zone = dropzones[i];
        const img = zone.querySelector("img");
        if (img) {
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.position = "relative";
            img.style.display = "none";
            const cardContainer = document.getElementById("card-container");
            cardContainer.appendChild(img);
        }
    }
    checkLine();
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

    //intersection1 lines
    ctx_papp.beginPath();
    ctx_papp.setLineDash([15, 7.5]);
    //t1->b2
    ctx_papp.moveTo(90, 180);
    ctx_papp.lineTo(320, 595);
    //t2->b1
    ctx_papp.moveTo(300, 167.5);
    ctx_papp.lineTo(120, 580);
    ctx_papp.strokeStyle = "hotpink";
    ctx_papp.stroke();

    //intersection2 lines
    ctx_papp.beginPath();
    //t2->b3
    ctx_papp.moveTo(300, 167.5);
    ctx_papp.lineTo(500, 605);
    //t3->b2
    ctx_papp.moveTo(515, 155);
    ctx_papp.lineTo(320, 595);
    ctx_papp.strokeStyle = "orange";
    ctx_papp.stroke();

    //intersection3 lines
    ctx_papp.beginPath();
    //t3->b1
    ctx_papp.moveTo(515, 155);
    ctx_papp.lineTo(120, 580);
    //t1->b3
    ctx_papp.moveTo(90, 180);
    ctx_papp.lineTo(500, 605);
    ctx_papp.strokeStyle = "green";
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
    ctx_papp.strokeStyle = "blue";
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

    const canvas_des = document.getElementById("desargeus_canvas");
    const ctx_des = canvas_des.getContext("2d");
    ctx_des.lineWidth = 2.5;

    //draw desargeus diagram
    //triangle1 x  + 75
    ctx_des.strokeStyle = "gold";
    ctx_des.fillStyle = "gold";
    ctx_des.setLineDash([]);
    ctx_des.beginPath();
    ctx_des.moveTo(259, 86);
    ctx_des.lineTo(294, 148);
    ctx_des.lineTo(260, 197);
    ctx_des.closePath();
    ctx_des.fill();
    ctx_des.stroke();
    //triangle2 x  + 75
    ctx_des.strokeStyle = "gold";
    ctx_des.fillStyle = "gold";
    ctx_des.beginPath();
    ctx_des.moveTo(67, 41);
    ctx_des.lineTo(170, 156);
    ctx_des.lineTo(145, 230);
    ctx_des.closePath();
    ctx_des.fill();
    ctx_des.stroke();

    //connect with axis of perspectivity
    ctx_des.beginPath();
    ctx_des.strokeStyle = "green";
    //first1
    ctx_des.moveTo(221, 0);
    ctx_des.lineTo(23, 600);
    //first2
    ctx_des.moveTo(398, 0);
    ctx_des.lineTo(0, 568);
    ctx_des.stroke();

    ctx_des.beginPath();
    ctx_des.strokeStyle = "purple";
    //mid1
    ctx_des.moveTo(48, 0);
    ctx_des.lineTo(299, 600);
    //mid2
    ctx_des.moveTo(258, 0);
    ctx_des.lineTo(263, 600);
    ctx_des.stroke();

    ctx_des.beginPath();
    ctx_des.strokeStyle = "hotpink";
    //last1
    ctx_des.moveTo(31, 0);
    ctx_des.lineTo(568, 600);
    //last2
    ctx_des.moveTo(208, 0);
    ctx_des.lineTo(554, 600);
    ctx_des.stroke();

    //lines from centre of perspectivity
    //1
    ctx_des.strokeStyle = "blue";
    ctx_des.setLineDash([7, 5]);
    ctx_des.beginPath();
    ctx_des.moveTo(0, 25);
    ctx_des.lineTo(600, 166);
    ctx_des.stroke();
    //2
    ctx_des.moveTo(0, 167);
    ctx_des.lineTo(600, 128);
    ctx_des.stroke();
    //3
    ctx_des.moveTo(0, 271);
    ctx_des.lineTo(600, 99);
    ctx_des.stroke();

    //centre of perspectivity and triangle points
    ctx_des.strokeStyle = "black";
    ctx_des.fillStyle = "black";
    ctx_des.beginPath();
    ctx_des.setLineDash([]);
    ctx_des.arc(473, 136, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(259, 86);
    ctx_des.arc(259, 86, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(294, 148);
    ctx_des.arc(294, 148, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(260, 197);
    ctx_des.arc(260, 197, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(67, 41);
    ctx_des.arc(67, 41, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(170, 156);
    ctx_des.arc(170, 156, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(145, 230);
    ctx_des.arc(145, 230, 20, 0, 2 * Math.PI);
    ctx_des.fill();
    ctx_des.stroke();

    //axis of perspectivity
    //line
    ctx_des.strokeStyle = "#c40707ff";
    ctx_des.setLineDash([]);
    ctx_des.beginPath();
    ctx_des.moveTo((0), 466);
    ctx_des.lineTo(600, 566);
    ctx_des.stroke();
    //points
    ctx_des.beginPath();
    ctx_des.fillStyle = "#c40707ff"
    ctx_des.moveTo(64, 477);
    ctx_des.arc(64, 477, 20, 0, 2 * Math.PI);
    ctx_des.moveTo(262, 510);
    ctx_des.arc(262, 510, 25, 0, 2 * Math.PI);
    ctx_des.moveTo(527, 554);
    ctx_des.arc(527, 554, 25, 0, 2 * Math.PI);
    ctx_des.fill();
    ctx_des.stroke();
}