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

const formSim = document.createElement('form'); // létrehozunk egy form elemet
formDiv.appendChild(formSim); // belerakjuk a formDiv-be

const fieldElementList = [{ // egy tömb objektumokkal, minden mezőről infó
    fieldid: 'forradalom', // ez lesz az input id-ja
    fieldLabel: 'forradalom' // ezt a szöveget látjuk a label-ben
},
{
    fieldid: 'evszam', // második mező id
    fieldLabel: 'evszám' // második mező felirat
},
{
    fieldid: 'sikeres', // harmadik mező id
    fieldLabel: 'sikeres' // harmadik mező felirat
}];

for(const fieldElement of fieldElementList){ // végigmegyünk az összes mező objektumon
    const field = makeDiv('field'); // csinálunk egy divet "field" class-szal
    formSim.appendChild(field); // hozzáadjuk a formhoz

    const label = document.createElement('label'); // csinálunk egy label elemet
    label.htmlFor = fieldElement.fieldid; // beállítjuk hogy melyik inputhoz tartozik
    label.textContent = fieldElement.fieldLabel; // kiírjuk a label szövegét
    field.appendChild(label); // hozzácsapjuk a field divhez

    let input = document.createElement('input'); // létrehozunk egy input mezőt
    input.id = fieldElement.fieldid; // beállítjuk az id-ját
    field.appendChild(document.createElement('br')); // csinálunk egy sortörést, hogy az input új sorba kerüljön

    if (fieldElement.fieldid === 'sikeres') { // ha ez a sikeres mező...
        input = document.createElement('select'); // csinálunk egy legördülő listát
        input.id = fieldElement.fieldid; // beállítjuk az id-t

        const optionIgen = document.createElement('option'); // első opció
        optionIgen.value = 'igen';// belső érték
        optionIgen.innerText = 'igen';// megjelenő szöveg

        const optionNem = document.createElement('option'); // második opció
        optionNem.value = 'nem';// belső érték
        optionNem.innerText = 'nem';// megjelenő szöveg

        input.appendChild(optionIgen); // hozzáadjuk az "igen"-t
        input.appendChild(optionNem); // hozzáadjuk a "nem"-et
    }
    else{ // ha az if fentebb nem teljesül
        input = document.createElement('input'); // ha nem a "sikeres" mező, akkor sima input
        input.id = fieldElement.fieldid; // beállítjuk az id-t
    }
    field.appendChild(input); // végül belerakjuk az inputot is a field divbe
}

const buttonFormSim = document.createElement('button'); // létrehozunk egy gombot
buttonFormSim.textContent = 'hozzáadás'; // a gomb szövege az lesz hogy "hozzáadás"
formSim.appendChild(buttonFormSim); // hozzácsapjuk a formhoz


containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is
