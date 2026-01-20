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
        const symbol = document.getElementById("des_symbol5-" + i);
        symbol.style.color = "";
        symbol.style.border = "";
    }

    //restore
    selectedSymbols.forEach(sym => {
        if (sym !== currentSelectedSymbol) {
            const symIndex = currentSymbols.indexOf(sym) + 1;
            const symElement = document.getElementById("des_symbol5-" + symIndex);
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
                const symbol = document.getElementById("des_symbol5-" + i);
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
        const cardImg = document.getElementById("des_card5-" + i);
        cardImg.style.border = "";
        cardImg.style.boxShadow = "";
    }

    //restore
    selectedCards.forEach(card => {
        if (card !== selectedCardContent) {
            const cardIndex = currentCardContents.indexOf(card) + 1;
            const cardElement = document.getElementById("des_card5-" + cardIndex);
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
                const cardImg = document.getElementById("des_card5-" + i);
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
        const cardImg = document.getElementById("des_card5-" + i);
        cardImg.style.border = "";
        cardImg.style.boxShadow = "";
    }
    if (selectedSymbols.length === 0) return;

    if (selectedSymbols.length === 1) {
        currentCardContents.forEach((symbols, j) => {
            if (symbols.includes(selectedSymbols[0])) {
                const cardImg = document.getElementById("des_card5-" + (j + 1));
                cardImg.style.border = "5px solid #9879b0";
                cardImg.style.boxShadow = "0 0 15px #f8f6faff";
            }
        });
    }
    if (selectedSymbols.length === 2) {
        currentCardContents.forEach((symbols, j) => {
            if ((symbols.includes(selectedSymbols[0])) && (symbols.includes(selectedSymbols[1]))) {
                const cardImg = document.getElementById("des_card5-" + (j + 1));
                cardImg.style.border = "5px solid #c9eaf4";
                cardImg.style.boxShadow = "0 0 15px #264751ff";
            }
        });
    }
}

function highlightSymbols() {
    for (let i = 1; i <= currentSymbols.length; i++) {
        const symbol = document.getElementById("des_symbol5-" + i);
        symbol.style.color = "";
        symbol.style.border = "";
    }
    if (selectedCards.length === 0) return;
    if (selectedCards.length === 1) {
        currentSymbols.forEach((symbolContent, j) => {
            for (let k = 0; k < currentLevel; k++) {
                if (symbolContent.includes(selectedCards[0][k])) {
                    const symbol = document.getElementById("des_symbol5-" + (j + 1));
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
                        const symbol = document.getElementById("des_symbol5-" + (j + 1));
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
        existingCard.style.display = "none"
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
/*
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
    if (!lbl) return;
    lbl.textContent = text;
    lbl.style.color = color;
    lbl.style.fontWeight = "bold";
}

function checkLine() {
    setLineLabel("dStatus", "", "black")
    const groups = {
        /*triangle1: ["t1p1", "t1p2", "t1p3"],
        triangle2: ["t2p1", "t2p2", "t2p3"],*/
        cop1: ["cop", "t1p1", "t2p1"],
        cop2: ["cop", "t1p2", "t2p2"],
        cop3: ["cop", "t1p3", "t2p3"],
        aop: ["aop1", "aop2", "aop3"],
        int1line1: ["aop1", "t2p2", "t2p3"],
        int1line2: ["aop1", "t1p2", "t1p3"],
        int2line1: ["aop2", "t2p1", "t2p3"],
        int2line2: ["aop2", "t1p1", "t1p3"],
        int3line1: ["aop3", "t2p1", "t2p2"],
        int3line2: ["aop3", "t1p1", "t1p2"]
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
            //setLineLabel("dStatus", "!!! ERROR: NO COMMON SYMBOL on the line", "red");
            setLineLabel(line, "", "red");
            return;
        }
        else if (commonAll.length > 0) {
            if (line === "cop1" || line === "cop2" || line === "cop3") {
                setLineLabel(line, commonAll[0], "blue");
                setLineLabel("dStatus", "", "black");
            }
            else if (line === "aop") {
                setLineLabel(line, commonAll[0], "#c40707ff");
                setLineLabel("dStatus", "", "black");
            }
            else if (line === "int1line1" || line === "int1line2") {
                setLineLabel(line, commonAll[0], "green");
                setLineLabel("dStatus", "", "black");
            }
            else if (line === "int2line1" || line === "int2line2") {
                setLineLabel(line, commonAll[0], "purple");
                setLineLabel("dStatus", "", "black");
            }
            else if (line === "int3line1" || line === "int3line2") {
                setLineLabel(line, commonAll[0], "hotpink");
                setLineLabel("dStatus", "", "hotpink");
            }
            else {
                setLineLabel(line, commonAll[0], "#9625ecff");
                setLineLabel("dStatus", "", "black");
            }
        }
    });
    //completed
    if (
        document.getElementById("cop1").textContent !== "" &&
        document.getElementById("cop2").textContent !== "" &&
        document.getElementById("cop3").textContent !== "" &&
        document.getElementById("aop").textContent !== "" &&
        document.getElementById("int1line1").textContent !== "" &&
        document.getElementById("int1line2").textContent !== "" &&
        document.getElementById("int2line1").textContent !== "" &&
        document.getElementById("int2line2").textContent !== "" &&
        document.getElementById("int3line1").textContent !== "" &&
        document.getElementById("int3line2").textContent !== "") {
        setLineLabel("dStatus", "Well done! You have completed Desargues-Dobble!", "blue");
    }
}

function clearCardDesargeus() {
    //clear cards out of the drop zones
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