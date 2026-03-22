// test.js
const selectedCards = new Set();
const selectedSymbols = new Set();
let currentCards = [];

window.test = function () {
    //document.getElementById("test").innerHTML = "button pressed";
    let currLevel = document.getElementById("controls").value
    renderCards(currLevel);
};

function renderCards(lev) {
    const level = parseInt(lev);
    const nConst = level - 1;
    if (isNaN(nConst)) return;

    if (nConst === 4) {
        F = new FieldOfFour();
    } else if (nConst === 8) {
        F = new FieldOfEight();
    } else if (nConst === 9) {
        F = new FieldOfNine();
    } else if (nConst === 6 || nConst === 10) {
        setStatus("Level " + (nConst + 1) + " does not exist.");
        clearContainers();
        return;
    } else {
        F = new PrimeField(nConst);
    }

    currentCards = geometry(F, characters);
    selectedCards.clear();
    selectedSymbols.clear();
    renderCardGrid(currentCards, level);
    renderSymbolButtons(currentCards);
    setStatus("Level " + (nConst + 1) + " cards. Click cards or symbols.");
}

function renderCardGrid(cards, level) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const centers = miniCenters[level] || [];
    cards.forEach((card, i) => {
        const cardBox = document.createElement("div");
        cardBox.className = "card-box";
        cardBox.dataset.index = i;
        cardBox.onclick = () => toggleCard(i);
        cardBox.style.position = "relative";

        card[1].forEach((sym, slot) => {
            const center = centers[slot] || [cardCenter, cardCenter];
            const symbolEl = document.createElement("span");
            symbolEl.className = "card-symbol";
            symbolEl.textContent = sym;
            symbolEl.style.left = `${center[0]}px`;
            symbolEl.style.top = `${center[1]}px`;
            cardBox.appendChild(symbolEl);
        });

        cardContainer.appendChild(cardBox);

        /*
        const title = document.createElement("div");
        title.className = "card-title";
        title.textContent = `Card ${card[0]}`;
        cardBox.appendChild(title);
        
    
        const symbolGrid = document.createElement("div");
        symbolGrid.className = "card-symbols";
        card[1].forEach((sym) => {
            const spin = document.createElement("span");
            spin.textContent = sym;
            symbolGrid.appendChild(spin);
        });
        cardBox.appendChild(symbolGrid);
    
        cardContainer.appendChild(cardBox);*/
    });
}

function renderSymbolButtons(cards) {
    const symbolContainer = document.getElementById("symbol-container");
    symbolContainer.innerHTML = "";
    const usedSymbols = new Set(cards.flatMap((c) => c[1]));
    const orderedSymbols = characters.filter((sym) => usedSymbols.has(sym));
    orderedSymbols.forEach((sym) => {
        const btn = document.createElement("button");
        btn.textContent = sym;
        btn.dataset.sym = sym;
        btn.onclick = () => toggleSymbol(sym);
        symbolContainer.appendChild(btn);
    });
}

function toggleCard(cardIndex) {
    const cardSym = currentCards[cardIndex][1];
    const key = String(cardIndex);
    if (selectedCards.has(key)) {
        selectedCards.delete(key);
    } else {
        selectedCards.add(key);
    }
    highlightBySelection();
}

function toggleSymbol(sym) {
    if (selectedSymbols.has(sym)) {
        selectedSymbols.delete(sym);
    } else {
        selectedSymbols.add(sym);
    }
    highlightBySelection();
}

function highlightBySelection() {
    // Card highlighting
    document.querySelectorAll(".card-box").forEach((box) => {
        const i = Number(box.dataset.index);
        const cardSyms = currentCards[i][1];
        const common = [...selectedSymbols].every((s) => cardSyms.includes(s));
        if (selectedCards.has(String(i)) || (selectedSymbols.size > 0 && common)) {
            box.classList.add("selected");
        } else {
            box.classList.remove("selected");
        }
    });

    // Symbol button highlighting
    document.querySelectorAll("#symbol-container button").forEach((btn) => {
        const sym = btn.dataset.sym;
        const cardMatch = [...selectedCards].every((idx) => currentCards[idx][1].includes(sym));
        if (selectedSymbols.has(sym) || (selectedCards.size > 0 && cardMatch)) {
            btn.classList.add("selected");
        } else {
            btn.classList.remove("selected");
        }
    });

    updateStatusFromSelection();
}

function updateStatusFromSelection() {
    if (selectedCards.size === 0 && selectedSymbols.size === 0) {
        setStatus("Click any card or symbol.");
        return;
    }
    const cardText = [...selectedCards].map((i) => currentCards[i][0]).join(", ");
    const symbolText = [...selectedSymbols].join(", ");
    setStatus(`Selected cards: ${cardText || "none"} | symbols: ${symbolText || "none"}`);
}

function setStatus(text) {
    const s = document.getElementById("status");
    if (s) s.textContent = text;
}

function clearContainers() {
    document.getElementById("card-container").innerHTML = "";
    document.getElementById("symbol-container").innerHTML = "";
}