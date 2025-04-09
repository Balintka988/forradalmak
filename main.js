const array = []; // létrehozok egy array tömböt

/**
 * @param {string} className - a div elemhez rendelendő CSS osztálynev
 * @returns {HTMLElement} a létrehozott div elem
 */
const makeDiv = (className) => { // csinál egy olyan divet amit a függvény hívasakor adunk, amit classNameként kezel a kód
    const div = document.createElement('div'); // létrehoz egy új div elemet
    div.className = className; // beállítja a class nevét
    return div; // visszaadja a divet
}

/**
 * @param {Array} adatokArray - A bemeneti tömb, amin végrehajtjuk a szűrést.
 * @param {Function} callback - Egy függvény, amely minden elemre lefut. 
 *                               Ha true értéket ad vissza, az elem bekerül az eredménybe.
 * @returns {Array} Egy új tömb, amely csak a callback szerint megfelelő elemeket tartalmazza.
 */
const filter = (adatokArray, callback) => { // Létrehozunk egy saját filter függvényt, ami egy tömböt és egy szűrőfüggvényt (callback) vár
    const eredmeny = []; // Ebbe a tömbbe fogjuk gyűjteni a szűrésnek megfelelő elemeket
    for (const elem of adatokArray) { // Végigiterálunk az eredeti tömb elemein
        if (callback(elem)) { // Meghívjuk a callback függvényt az aktuális elemre, és ha az true-t ad vissza
            eredmeny.push(elem); // akkor hozzáadjuk az eredmény tömbhöz
        }
    }
    return eredmeny; // Visszaadjuk a szűrés után kapott új tömböt
}

/**
 * @param {HTMLElement} containerDiv - az a div, amelybe a táblázatot helyezzük
 * @param {Function} callback - egy függvény amely a táblázat törzsével (tbody) dolgozik
 */
const tablaKrealas = (containerDiv, callback) => { // letrehoz egy táblázatot a megadott containerDiv-ben és visszaadja a tbody-t a callback függvényen keresztul, a fuggvény végén
    const tableDiv = makeDiv('table'); // csinál egy table nevű divet
    containerDiv.appendChild(tableDiv); // hozzaadjuk a tableDiv-et a containerDiv-hez

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
    callback(tbody); // meghívja a callback függvényt a létrehozott táblázat törzsével (tbody)
}

/**
 * @param {HTMLElement} tbody - a táblázat törzse amelyhez az adatokat hozzáadjuk
 * @param {HTMLElement} containerDiv - a div amelybe az inputot és a fájl feltöltés gombot helyezzük
 * @param {Array} array - a tömb amely tárolja az adatokat
 */
const fajlFeltoltes = (tbody, containerDiv, array) => { // betölti az adatokat fajlból, és hozzáadja őket a táblázat törzséhez (tbody)
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
                const adat = { // objektumot csinalunk a mezők alapján
                    forradalom: fields[0], // a forradalom az első mező
                    evszam: fields[1], // az évszám második mező
                    sikeres: fields[2] // az igen/nem a harmadik mező
                };

                array.push(adat); // hozzáadjuk a adatokat a már létező tömbhöz
                const tableRow = document.createElement('tr'); // új tablázat sor
                tbody.appendChild(tableRow); // hozzaadjuk a táblázat törzséhez

                const forradalomColumn = document.createElement('td'); // létrehozunk egy új cellát a forradalom
                forradalomColumn.textContent = adat.forradalom; // beállítjuk a cella szövegét a forradalomra
                tableRow.appendChild(forradalomColumn); // hozzaadjuk a forradalmat a sorhoz

                const evszamColumn = document.createElement('td'); // létrehozunk egy új cellát az évszámnak
                evszamColumn.textContent = adat.evszam; // beállítjuk a cella szövegét az évszámot
                tableRow.appendChild(evszamColumn); // hozzaadjuk az évszámot a sorhoz

                const sikeresColumn = document.createElement('td'); // létrehozunk egy új cellát az igen/nem döntésnek
                sikeresColumn.textContent = adat.sikeres; // beállítjuk a cella szövegét a választottra
                tableRow.appendChild(sikeresColumn); // hozzaadjuk a sorhoz
            }
        };
        fileReader.readAsText(selectedFile); // beolvassuk a fájlt szövegként
    });
}

/**
* @param {HTMLElement} tbody - a táblázat törzse ahová az új sorokat hozzáadjuk
* @param {HTMLElement} containerDiv - a konténer amely a formot tárolja
* @param {Array} array - a táblázat adatainak tömbje amibe új adatokat adunk
*/
const createForm = (tbody, containerDiv, array) => { // letrehoz egy űrlapot amely lehetővé teszi új adatok hozzáadását a táblázathoz
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
    
        sorHozzaadas(valueObject, tbody) // Egy új sort ad hozzá a táblázathoz a megadott objektum (valueObject) alapján
        }
    })
    
    
    //containerDiv.appendChild(tableDiv); // belerakjuk a table divet a containerbe
    containerDiv.appendChild(formDiv); // aztán berakjuk a form divet is
    
}

/**
 * hozzaad egy új sort a táblázathoz a megadott adatok alapján
 *
 * @param {Object} valueObject - az új sor adatai (forradalom, évszám, sikeresség)
 * @param {HTMLElement} tbody - a táblázat törzse ahová a sort hozzáadjuk
 */
const sorHozzaadas = (valueObject, tbody) => { // a függvény amely hozzáadja az új sort a tablázat torzséhez a kapott adatok alapján
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

/**
 * lehetőve teszi a táblázat adatainak letöltését CSV formátumban
 * 
 * @param {HTMLElement} containerDiv - a kontener ahol a letöltés gombját tároljuk
 * @param {Array} array - a tablazat adatainak tombje amit letöltünk
 */
const fajlLetoltes = (containerDiv, array) => { // a kreált táblázatot ez által tudjuk letölteni
    const letoltesGomb = document.createElement('button'); // létrehozunk egy új gomb elemet
    letoltesGomb.textContent = 'Letöltés'; // beállítjuk a gomb szövegét "Letöltés"-re
    containerDiv.appendChild(letoltesGomb); // hozzáadjuk a gombot a container divhez
    
    letoltesGomb.addEventListener('click', () => { // eseményfigyelő a gombra, ha rákattintanak
        const link = document.createElement('a'); // létrehozunk egy link elemet, amin keresztül letöltjük az adatokat
    
        const letoltesTaroloTomb = ['forradalom;evszam;sikeres']; // létrehozunk egy tömböt, aminek az első eleme a fejléc
    
        for (const data of array) { // végigmegyünk az adatokon
            letoltesTaroloTomb.push(`${data.forradalom};${data.evszam};${data.sikeres}`); // hozzáadjuk a sorokat a tömbhöz pontosvesszővel elválasztva
        }
    
        const content = letoltesTaroloTomb.join('\n'); // a tömböt szöveggé alakítjuk, soronként elválasztva
    
        const file = new Blob([content]); // létrehozunk egy új fájlt (Blob objektum) a tartalomból
    
        link.href = URL.createObjectURL(file); // létrehozunk egy ideiglenes letöltési URL-t a fájlhoz
        link.download = 'newdata.csv'; // beállítjuk a letöltendő fájl nevét
        link.click(); // automatikusan rákattintunk a linkre, így elindul a letöltés
    
        URL.revokeObjectURL(link.href); // felszabadítjuk az ideiglenes URL-t, hogy ne foglaljon memóriát
    });
}

/**
 *
 * @param {HTMLElement} containerDiv - a konténer amely a szűrési formot tárolja
 * @param {HTMLElement} tbody - a táblázat törzse amit szűrni szeretnénk
 * @param {Array} array - a táblázat adatait tartalmazó tömb
 */
const formSzures = (containerDiv, tbody, array) => { // // Itt hozzuk létre a szűrőfelületet az adatok szűréséhez
    const filterFormDiv = makeDiv('filterForm'); // létrehozunk egy divet a szűrési űrlapnak
    containerDiv.appendChild(filterFormDiv); // hozzáadjuk a containerhez
    
    const formForSzures = document.createElement('form'); // létrehozunk egy új formot
    filterFormDiv.appendChild(formForSzures); // hozzáadjuk a szurési divhez
    
    const select = document.createElement('select'); // létrehozunk egy legördülo mezőt
    formForSzures.appendChild(select); // hozzáadjuk a formhoz
    
    const options = [ // legördülő menü lehetőségei
        {
            value: '', // nincs érteke az első sornak, majd ez alapján kell őt keresni
            innerText: 'Válassz mezőt' // első sorban megjelenő szöveg
        },
        {
            value: 'forradalom', // masodik sor id
            innerText: 'Forradalom' // masodik sorban megjelenő szöveg
        },
        {
            value: 'evszam', // harmadik sor id
            innerText: 'Évszám' // harmadik sorban megjelenő szöveg
        },
        {
            value: 'sikeres', // negyedik sor id
            innerText: 'Sikeres' // negyedik sorban megjelenő szöveg
        }
    ];
    
    for(const opt of options){ // végigmegyünk a lehetőségeken
        const optElement = document.createElement('option'); // létrehozunk egy új opciót
        optElement.value = opt.value; // beállítjuk az értékét
        optElement.innerText = opt.innerText; // megjelenítendő szöveg
        select.appendChild(optElement); // hozzáadjuk a legördülőhöz
    }
    
    const bemenet =  document.createElement('input'); // létrehozunk egy input mezőt
    bemenet.id = 'filterInput'; // beállítjuk az id-t
    formForSzures.appendChild(bemenet); // hozzáadjuk a formhoz
    
    const button = document.createElement('button'); // létrehozunk egy gombot
    button.innerText = 'Szűrés'; // beállítjuk a szöveget
    formForSzures.appendChild(button); // hozzáadjuk a formhoz
    
    formForSzures.addEventListener('submit', (e) => { // eseményfigyelő a form submit eseményére
        e.preventDefault(); // ne töltse újra az oldalt
    
        const filterInput = e.target.querySelector('#filterInput'); // lekérjük az input mezőt
        const select = e.target.querySelector('select'); // lekérjük a legördülőt
    
        const szurtArray = filter(array, (element) => { // saját filter függvényt használunk, amit legfelül hoztunk létre
            const mezo = select.value; // kiválasztott mező
            if (mezo === '') return true; // ha nincs kiválasztva semmi, akkor ne szűrjön
            return element[mezo] === filterInput.value; // csak azokat adja vissza, ahol egyezik az érték
        });
    
        tbody.innerHTML = ''; // kiürítjük a jelenlegi táblázatot
    
        for (const adat of szurtArray) { // újra létrehozzuk a már szűrt sorokat
            sorHozzaadas(adat, tbody); // Új adatot ad a táblázathoz egy új sor formájában
        }
    });
}
const containerDiv = makeDiv('container'); // container nevű divet csinál
document.body.appendChild(containerDiv); // hozzáadja a bodyhoz a container divet

/**
 * letrehozza a tablazatot és vegrehajtja az összes szükséges funkciót mint a form létrehozása, fájlok feltöltése, 
 * letöltés és a szűrés
 * 
 * @param {HTMLElement} containerDiv - a konténer amely a táblázatot és a kapcsolodo funkciókat tárolja
 * @param {Function} bodyOfTable - a callback fuggveny amely a táblázat törzse (tbody) elemeit használja
 */
tablaKrealas(containerDiv, (bodyOfTable) => { // a tablaKrealas létrehozza a táblázatot, majd a kapott tbody-t használja tovább minden funkcióhoz
    createForm(bodyOfTable, containerDiv, array); // létrehozza az urlapot az új adatok beküldéséhez
    fajlFeltoltes(bodyOfTable, containerDiv, array); //fFeltölti a táblázatot a fajlból betöltött adatokkal
    fajlLetoltes(containerDiv, array); // lehetővé teszi a táblázat adatainak letöltését
    formSzures(containerDiv, bodyOfTable, array); // letrehozza a szűréshez kapcsolodo összes dolgot
});