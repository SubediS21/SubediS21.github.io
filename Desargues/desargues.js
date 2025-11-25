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

    //allow only one card, if more back to card container
    const existingCard = dropZone.querySelector("img");
    if (existingCard && existingCard.id !== data) {
        existingCard.style.width = "100px";
        existingCard.style.height = "100px";
        existingCard.style.position = "relative";
        const cardContainer = document.getElementById("card-container");
        cardContainer.appendChild(existingCard);
    }
    const cardClone = draggedCard.cloneNode(true);
    cardClone.id = data + "-clone";
    cardClone.style.border = "";
    cardClone.style.boxShadow = "";
    cardClone.style.width = "60px";
    cardClone.style.height = "60px";
    cardClone.style.position = "absolute";
    dropZone.appendChild(cardClone);
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
    if (cardBack.id.endsWith("-clone")) {
        cardBack.style.display = "none";
        cardContainer.appendChild(cardBack);
        return;
    }
    checkLine();
}
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
    if (!lbl) return;
    lbl.textContent = text;
    lbl.style.color = color;
    lbl.style.fontWeight = "bold";
}

function checkLine() {
    const groups = {
        top: ["triangle1"]
    };

    statusZone = document.getElementById("dStatus");
    Object.keys(groups).forEach(line => {
        const zoneIds = groups[line];
        const symbols = zoneIds.map(getZoneSymbols);

        if (!symbols[0] || !symbols[1]) {
            setLineLabel(line, "", "#9879b0");
            return;
        }

        const inter12 = symbols[0].filter(s => symbols[1].includes(s));
        const commonAll = inter12.filter(s => symbols[2].includes(s));
        if (commonAll.length === 0) {
            //setLineLabel("dStatus", "!!! ERROR: NO COMMON SYMBOL on the line", "red");
            setLineLabel(line, "", "red");
            return;
        }
        else if (commonAll.length > 0) {
            if (true) {
                setLineLabel(line, commonAll[0], "orange");
                setLineLabel("dStatus", "", "black");
            }
            else {
                setLineLabel(line, commonAll[0], "#9625ecff");
                setLineLabel("dStatus", "", "black");
            }
            //completed
            if (document.getElementById("top").textContent !== "") {
                setLineLabel("dStatus", "Well done! You have completed Desargues-Dobble!", "blue");
            }
        }
    });
}

window.onload = function () {
    const canvas_des = document.getElementById("desargeus_canvas");
    const ctx_des = canvas_des.getContext("2d");

    var des_width = canvas_des.width;
    var des_height = canvas_des.height;
    ctx_des.lineWidth = 2.5;

    //draw desargeus diagram
    //triangle1 x  + 75
    ctx_des.strokeStyle = "#7994b0ff";
    ctx_des.fillStyle = "#7994b0ff";
    ctx_des.setLineDash([]);
    ctx_des.beginPath();
    ctx_des.moveTo((234 + 75), 126);
    ctx_des.lineTo((269 + 75), 181);
    ctx_des.lineTo((211 + 75), 249);
    ctx_des.closePath();
    ctx_des.fill();
    ctx_des.stroke();
    //triangle2 x  + 75
    ctx_des.strokeStyle = "#b079a8ff";
    ctx_des.fillStyle = "#b079a8ff";
    ctx_des.beginPath();
    ctx_des.moveTo((16 + 75), 66);
    ctx_des.lineTo((122 + 75), 169);
    ctx_des.lineTo((78 + 75), 271);
    ctx_des.closePath();
    ctx_des.fill();
    ctx_des.stroke();
    //connect with axis of perspectivity
    ctx_des.strokeStyle = "#526254ff";
    ctx_des.beginPath();
    //first1
    ctx_des.moveTo((192 + 75), 0);
    ctx_des.lineTo((122 + 75), 169);
    ctx_des.lineTo((78 + 75), 271);
    ctx_des.lineTo((-30 + 75), 535);
    ctx_des.lineTo((-60 + 75), 600);

    //first2
    ctx_des.moveTo((423 + 75), 0);
    ctx_des.lineTo((269 + 75), 181);
    ctx_des.lineTo((211 + 75), 249);
    ctx_des.lineTo((-30 + 75), 535);
    ctx_des.lineTo((-89 + 75), 600);

    //mid1
    ctx_des.moveTo((-4 + 75), 0);
    ctx_des.lineTo((16 + 75), 66);
    ctx_des.lineTo((78 + 75), 271);
    ctx_des.lineTo((158 + 75), 533);
    ctx_des.lineTo((179 + 75), 600);

    //mid2
    ctx_des.moveTo((257 + 75), 0);
    ctx_des.lineTo((234 + 75), 126);
    ctx_des.lineTo((211 + 75), 249);
    ctx_des.lineTo((158 + 75), 533);
    ctx_des.lineTo((146 + 75), 600);

    //last1
    ctx_des.moveTo((-52 + 75), 0);
    ctx_des.lineTo((16 + 75), 66);
    ctx_des.lineTo((122 + 75), 169);
    ctx_des.lineTo((494 + 75), 530);
    ctx_des.lineTo((566 + 75), 600);

    //last2
    ctx_des.moveTo((151 + 75), 0);
    ctx_des.lineTo((234 + 75), 126);
    ctx_des.lineTo((269 + 75), 181);
    ctx_des.lineTo((494 + 75), 530);
    ctx_des.lineTo((539 + 75), 600);
    ctx_des.stroke();
    //centre of perspectivity and triangle points
    ctx_des.strokeStyle = "darkblue";
    ctx_des.fillStyle = "darkblue";
    ctx_des.beginPath();
    ctx_des.setLineDash([]);
    ctx_des.arc((500 + 75), 200, 25, 0, 2 * Math.PI);
    ctx_des.moveTo((16 + 75), 66);
    ctx_des.arc((16 + 75), 66, 25, 0, 2 * Math.PI);
    ctx_des.moveTo((234 + 75), 126)
    ctx_des.arc((234 + 75), 126, 25, 0, 2 * Math.PI);
    ctx_des.moveTo((122 + 75), 169);
    ctx_des.arc((122 + 75), 169, 25, 0, 2 * Math.PI);
    ctx_des.moveTo((269 + 75), 181);
    ctx_des.arc((269 + 75), 181, 25, 0, 2 * Math.PI);
    ctx_des.moveTo((78 + 75), 271);
    ctx_des.arc((78 + 75), 271, 25, 0, 2 * Math.PI);
    ctx_des.moveTo((211 + 75), 249);
    ctx_des.arc((211 + 75), 249, 25, 0, 2 * Math.PI);
    ctx_des.fill();
    ctx_des.stroke();
    //lines from centre of perspectivity
    //1
    ctx_des.strokeStyle = "darkblue";
    ctx_des.setLineDash([10, 5]);
    ctx_des.beginPath();
    ctx_des.moveTo((0), 41)
    ctx_des.lineTo((16 + 75), 66);
    ctx_des.lineTo((234 + 75), 126);
    ctx_des.lineTo((500 + 75), 200);
    ctx_des.lineTo((600 + 75), 228);
    ctx_des.stroke();
    //2
    ctx_des.moveTo((0), 153)
    ctx_des.lineTo((122 + 75), 169);
    ctx_des.lineTo((269 + 75), 181);
    ctx_des.lineTo((500 + 75), 200);
    ctx_des.lineTo((600 + 75), 208);
    ctx_des.stroke();
    //3
    ctx_des.moveTo((0), 297);
    ctx_des.lineTo((78 + 75), 271);
    ctx_des.lineTo((211 + 75), 249);
    ctx_des.lineTo((500 + 75), 200);
    ctx_des.lineTo((600 + 75), 183);
    ctx_des.stroke();
    //axis of perspectivity
    ctx_des.strokeStyle = "darkred";
    ctx_des.fillStyle = "darkred";
    ctx_des.setLineDash([]);
    ctx_des.beginPath();
    ctx_des.moveTo((0), 536);
    ctx_des.lineTo((-30 + 75), 535);
    ctx_des.arc((-30 + 75), 535, 25, 0, 2 * Math.PI);
    ctx_des.lineTo((158 + 75), 533);
    ctx_des.arc((158 + 75), 533, 25, 0, 2 * Math.PI);
    ctx_des.lineTo((494 + 75), 530);
    ctx_des.arc((494 + 75), 530, 25, 0, 2 * Math.PI);
    ctx_des.lineTo((600 + 75), 529)
    ctx_des.fill();
    ctx_des.stroke();
}