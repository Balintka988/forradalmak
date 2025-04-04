const makeDiv = (className) => { // csinál egy divet a megadott class névvel arrow functionnel
    const div = document.createElement('div'); // létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a divet
}

const containerDiv = makeDiv('container'); // container nevű divet csinál
document.body.appendChild(containerDiv); // hozzáadja a bodyhoz a container divet
const tableDiv = makeDiv('table'); // csinál egy table nevű divet

const tableSim = document.createElement('table'); // csinál egy table elemet
tableDiv.appendChild(tableSim); // belerakja a tableDiv-be (amit korábban csináltunk)

const tableHead = document.createElement('thead'); // létrehozza a fejléc részt
tableSim.appendChild(tableHead); // hozzáadja a táblázathoz a fejlécet

const tableHeadRow = document.createElement('tr'); // egy sor a thead részbe
tableHead.appendChild(tableHeadRow); // hozzáadjuk a sort a thead-hez

const theadCells = ['forradalom', 'evszam', 'sikeres']; // a fejléc cellák tartalma, tömbbe tároljuk el
for (const cellContent of theadCells) { // végigmegyünk a tömb elemein
    const thcell = document.createElement('th'); // csinálunk egy új th elemet
    thcell.innerText = cellContent; // beleírjuk a cellába az aktuális elemet
    tableHeadRow.appendChild(thcell); // hozzáadjuk a cellát a fejléchez
}

const tbody = document.createElement('tbody'); // létrehozzuk a table body részét
tableSim.appendChild(tbody); // berakjuk a table-be


const formDiv = makeDiv('form'); // form divet is csinálunk

containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is
