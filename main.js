const array = []; // létrehozok egy array tömböt
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
        input = document.createElement('input'); // ha nem a "sikeres" mező, akkor sima inputot hozunk létre
        input.id = fieldElement.fieldid; // beállítjuk az id-t
    }
    field.appendChild(input); // végül belerakjuk az inputot is a field divbe

    field.appendChild(document.createElement('br')) // sortörés hozzaadasa a mezohoz
    const error = document.createElement('span'); // csinalunk egy span elemet hiba üzenetnek
    error.className = 'error'; // beállitjuk az osztályt hogy error legyen
    field.appendChild(error); // hozzafuzzuk a hiba üzenet span-t a mezohoz

}

const buttonFormSim = document.createElement('button'); // létrehozunk egy gombot
buttonFormSim.textContent = 'hozzáadás'; // a gomb szövege az lesz hogy "hozzáadás"
formSim.appendChild(buttonFormSim); // hozzácsapjuk a formhoz

formSim.addEventListener('submit', (e)=> { // amikor a formot elküldik (submit), akkor ez lefut
    e.preventDefault(); // megakadályozzuk hogy az oldal újratöltődjön
    const valueObject = {}; // ebbe az objektumba fogjuk gyűjteni a mezők értékeit

    const inputFields = e.target.querySelectorAll('input, select'); // lekérjük az összes input és select mezőt a formból
    let validE = true; // Érvényességet jelző logikai változó, kezdetben igaz

    for(const inputField of inputFields){ // Végigiterálunk az összes input mezőn
        const errorField = inputField.parentElement.querySelector('.error'); // Megkeressük a hozzá tartozó hibaüzenet mezőt

        if(!errorField){ // Ha nincs ilyen mező
            console.error('nincs errorfield'); // Hibaüzenet a konzolra
            return; // Megszakítjuk a feldolgozást
        }

        errorField.textContent = ''; // Alaphelyzetbe állítjuk (kiürítjük) a hibaüzenet mezőt
        if(inputField.value === ''){ // Ha az input mező üres
            errorField.textContent = 'Add meg ezt is!'; // Kiírjuk a megfelelő hibaüzenetet
            validE = false; // Az űrlapot érvénytelennek jelöljük
        }

        valueObject[inputField.id] = inputField.value; // Elmentjük az értéket: kulcs az input ID-je, érték a beírt adat
    }

    if(validE){ // hogyha a validE valtozonk true ertekkel ter visza akkor legeneráljuk a táblázatot
    array.push(valueObject); // hozzáadjuk az objektumot egy tömbhöz (feltételezzük hogy az array már létezik)

    const tbRow = document.createElement('tr'); // csinálunk egy új sort a táblába
    tbody.appendChild(tbRow); // belerakjuk a tbody-be

    const forradalomCell = document.createElement('td'); // forradalom nak létrehozunk egy cellát
    forradalomCell.textContent = valueObject.forradalom; // cella szövegébe a forradalom
    tbRow.appendChild(forradalomCell); // hozzáadjuk a sorhoz

    const evszamCell = document.createElement('td'); // évhez cella
    evszamCell.textContent = valueObject.evszam; // kiírjuk a beírt évet
    tbRow.appendChild(evszamCell); // hozzáadjuk a sorhoz

    
    const sikeresECell = document.createElement('td'); // sikeres-e cella létrehozása
    sikeresECell.textContent = valueObject.sikeres; // szövegbe az igen vagy nem
    tbRow.appendChild(sikeresECell); // hozzáadjuk a sorhoz
    }
})


containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is

const fileUploadInput = document.createElement('input'); // létrehozunk egy input elemet hogy fájlt lehessen választani
containerDiv.appendChild(fileUploadInput); // hozzáadjuk az inputot a containerDiv-hez hogy látszódjon
fileUploadInput.id = 'fileInput'; // beállítjuk az id-t hogy könnyebben lehessen hivatkozni rá
fileUploadInput.type = 'file'; // beállítjuk az input típusát fájl választásra
fileUploadInput.addEventListener('change', (e) => { // figyeljük a fájlválasztást, hogy mikor történik változás

    const selectedFile = e.target.files[0]; // kiválasztjuk az első fájlt
    const fileReader = new FileReader(); // új FileReader példányt készítünk hogy beolvassuk a fájlt

    fileReader.onload = () => { // amikor betöltődött a fájl
        const fileContent = fileReader.result.split('\n'); // sorokra bontjuk a fájl tartalmát
        const dataWithoutHeader = fileContent.slice(1); // levágjuk az első sort (fejlécet)

        for (const row of dataWithoutHeader) { // végigmegyünk a sorokon
            const cleanedRow = row.trim(); // eltavolítjuk a felesleges szóközöket
            const fields = cleanedRow.split(';'); // szétbontjuk a sorokat a pontosvesszők mentén
            const person = { // objektumot csinalunk a mezők alapján
                name: fields[0], // a név az első mező
                birth: fields[1], // a születési dátum a második mező
                zipcode: fields[2] // a kód a harmadik mező
            };

            array.push(person); // hozzáadjuk a személyt a már létező tömbhöz
            const tableRow = document.createElement('tr'); // új tablázat sor
            tbody.appendChild(tableRow); // hozzaadjuk a táblázat törzséhez
            
            const nameColumn = document.createElement('td'); // létrehozunk egy új cellát a névnek
            nameColumn.textContent = person.name; // beállítjuk a cella szövegét a névre
            tableRow.appendChild(nameColumn); // hozzaadjuk a nevet a sorhoz

            const birthColumn = document.createElement('td'); // létrehozunk egy új cellát a születési dátumnak
            birthColumn.textContent = person.birth; // beállítjuk a cella szövegét a születési dátumra
            tableRow.appendChild(birthColumn); // hozzaadjuk a születési dátumot a sorhoz

            const zipCodeColumn = document.createElement('td'); // létrehozunk egy új cellát a postaláda kódnak
            zipCodeColumn.textContent = person.zipcode; // beállítjuk a cella szövegét a postaláda kódra
            tableRow.appendChild(zipCodeColumn); // hozzaadjuk a postaláda kódot a sorhoz
        }
    };
    fileReader.readAsText(selectedFile); // beolvassuk a fájlt szövegként
});
