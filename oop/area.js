class Area {//létrehozunk egy osztályt
    #div;// privét változó, osztályon belül látható csak

    #manager;// privat változó, osztályon belül látható csak

    get manager(){ // getter metódus hogy el lehessen érni a privát managert-et
        return this.#manager; // visszaadja a #manager értékét
    }

    get div(){// getter metódus hogy el lehessen érni a privát div-et
        return this.#div;// visszaadja a #div értékét
    }

    constructor(className, manager) { // konstruktor, kap egy class nevet és egy managert
        this.#manager = manager; // beállítjuk a privát #manager változót a kapott értékre
        const container = this.#getContainerDiv(); // itt hívjuk meg a privát metódust amit egy változóban tárolunk el
        this.#div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        this.#div.className = className; // beállítja a class nevet amit paraméterként kapott
        container.appendChild(this.#div); // berakja az új divet a containeroop divbe
    }

    #getContainerDiv(){ // privát metódus
        let containerDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container
        if (!containerDiv) { // ha nincs ilyen, akkor csinál egyet
            containerDiv = document.createElement('div'); // létrehoz egy új divet
            containerDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containerDiv); // hozzáadja a bodyhoz
        }
        return containerDiv; // containerDivvel térünk vissza
    }
}

class Table extends Area { // létrehozunk egy Table nevű osztályt, ami az Area ősosztályból öröklődik
    constructor(cssClass, manager){ // konstruktor, kap egy cssclass nevet
        super(cssClass, manager); // meghívjuk az Area osztály konstruktorát vele
        const tabla = this.#makeTable(); // privat metodus hivas amit egy valtozoban tarolunk el
        
        this.manager.setAddAdatCallback((adatok) => { // arrow function 
            const tbRow = document.createElement('tr'); // csinálunk egy új sort a táblába
            tabla.appendChild(tbRow); // belerakjuk a tbody-be amivel a #makeTable metodus tér vissza
        
            const forradalomCell = document.createElement('td'); // forradalom nak létrehozunk egy cellát
            forradalomCell.textContent = adatok.forradalom; // cella szövegébe a forradalom
            tbRow.appendChild(forradalomCell); // hozzáadjuk a sorhoz
        
            const evszamCell = document.createElement('td'); // évhez cella
            evszamCell.textContent = adatok.evszam; // kiírjuk a beírt évet
            tbRow.appendChild(evszamCell); // hozzáadjuk a sorhoz
            
            const sikeresECell = document.createElement('td'); // sikeres-e cella létrehozása
            sikeresECell.textContent = adatok.sikeres; // szövegbe az igen vagy nem
            tbRow.appendChild(sikeresECell); // hozzáadjuk a sorhoz
        })
    }

    #makeTable(){ // privat metódus ami a fejlecet és a tbody-t hozza létre
        const table = document.createElement('table'); // csinálunk egy table elemet
        this.div.appendChild(table); // hozzáadjuk a divhez amit az Area hozott létre

        const thead = document.createElement('thead'); // létrehozzuk a táblázat fejléce részét
        table.appendChild(thead); // hozzáadjuk a table-hez

        const theadRow = document.createElement('tr'); // létrehozunk egy sort a fejléchez
        thead.appendChild(theadRow); // hozzáadjuk a sort a thead-be

        const theadCells = ['forradalom', 'evszam', 'sikeres']; // fejléc mezők szövegeit tároljuk itt egy tömbben
        for(const cellContent of theadCells){ // végigmegyünk a tömb elemein
            const thcell = document.createElement('th'); // csinálunk egy th elemet
            thcell.innerText = cellContent; // beleírjuk a szöveget
            theadRow.appendChild(thcell); // hozzáadjuk a sort a fejlécbe
        }
        
        const tbody = document.createElement('tbody'); // csinálunk egy üres tbody részt is
        table.appendChild(tbody); // hozzáadjuk a table-hez
        return tbody; // visszatér a tbodyval
    }
}

class Form extends Area { // létrehozunk egy Form nevű osztályt, ami az Area-ból öröklődik
    #inputTomb; // privát változó, ebbe gyűjtjük az összes FormField objektumot

    constructor(cssClass, fieldsList, manager) { // konstruktor, megkapja a css class nevet, mezőlistát és egy managert
        super(cssClass, manager); // meghívjuk az ős (Area) konstruktorát
        this.#inputTomb = []; // inicializáljuk az inputTomb tömböt, ide kerülnek a mezők
        const form = document.createElement('form'); // csinálunk egy form html elemet
        this.div.appendChild(form); // belerakjuk a formot az Area által létrehozott div-be

        for (const fieldElement of fieldsList) { // végigmegyünk az összes mező objektumon
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel); // létrehozunk egy új FormField objektumot az adott mező alapján
            this.#inputTomb.push(formField); // eltároljuk a mezőt az inputTomb tömbben
            form.appendChild(formField.getDiv()); // hozzáadjuk a mezőhöz tartozó HTML elemeket a form-hoz
        }
        
        const buttonFormSim = document.createElement('button'); // létrehozunk egy gombot
        buttonFormSim.textContent = 'hozzáadás'; // a gomb szövege az lesz hogy "hozzáadás"
        form.appendChild(buttonFormSim); // hozzácsapjuk a formhoz

        form.addEventListener('submit', (e)=> { // amikor a formot elküldik (submit), akkor ez lefut
            e.preventDefault(); // megakadályozzuk hogy az oldal újratöltődjön
            const valueObject = {}; // ebbe az objektumba fogjuk gyűjteni a mezők értékeit
        
            let validE = true; // ideiglenes változó az ellenőrzéshez true kezdeti paraméter
             for(const errorformField of this.#inputTomb){ // végigmegyünk az összes mezőn
                errorformField.error = ''; // alapból töröljük a hibát
                 if(errorformField.value === ''){ // ha nincs kitöltve a mezo
                    errorformField.error = 'Add meg ezt is'; // hibauzenet ha üres
                     validE = false; // nem validE a form
                 }
                 valueObject[errorformField.id] = errorformField.value; // eltároljuk a mező értékét
             }
            if(validE){ // ha minden mező ki van töltve
                const adat = new Adat(valueObject.forradalom, valueObject.evszam, valueObject.sikeres); // a form mezőkből létrehozunk egy új Adat példányt a megadott forradalom, évszám és sikeresség adatokkal
                this.manager.addAdat(adat); // hozzáadjuk az objektumot egy tömbhöz (feltételezzük hogy az array már létezik)
            }
        })
    }
}


class FormField { // létrehozunk egy FormField nevű osztályt
    #id; // privát változó azonosító tárolására
    #inputMezo; // privát változó az input vagy select mezőhöz
    #feliratElem; // privát változó a label (felirat) elemhez
    #hibaElem; // privát változó a hibaüzenethez használt span elemhez

    get id() { // getter metódus az id értékének lekérésére
        return this.#id; // visszaadjuk az id értékét
    }

    get value() { // getter metódus az input értékének lekérésére
        return this.#inputMezo.value; // visszaadjuk az input mező (vagy select) aktuális értékét
    }

    set error(message) { // setter metódus a hibaüzenet beállítására
        this.#hibaElem.textContent = message; // beállítjuk a span szövegét a megadott üzenetre
    }

    constructor(id, feliratSzoveg) { // konstruktor, ami az új mezőt létrehozza
        this.#id = id; // eltároljuk az id-t a privát változóban
        this.#feliratElem = document.createElement('label'); // létrehozunk egy label elemet
        this.#feliratElem.htmlFor = id; // beállítjuk, hogy melyik inputhoz tartozik a label
        this.#feliratElem.textContent = feliratSzoveg; // beállítjuk a label szövegét

        if (id === 'sikeres') { // ha az id "sikeres", akkor speciális mezőt csinálunk
            this.#inputMezo = document.createElement('select'); // létrehozunk egy legördülő (select) mezőt
            this.#inputMezo.id = id; // beállítjuk az id-t a select elemnek

            const opIgen = document.createElement('option'); // létrehozunk egy "igen" opciót
            opIgen.value = 'igen'; // beállítjuk az értékét "igen"-re
            opIgen.innerText = 'igen'; // beállítjuk a megjelenített szöveget is

            const opNem = document.createElement('option'); // létrehozunk egy "nem" opciót
            opNem.value = 'nem'; // beállítjuk az értékét "nem"-re
            opNem.innerText = 'nem'; // megjelenő szöveg "nem"

            this.#inputMezo.appendChild(opIgen); // hozzáadjuk az "igen" opciót a select-hez
            this.#inputMezo.appendChild(opNem); // hozzáadjuk a "nem" opciót is
        } else { // ha az id nem "sikeres", akkor sima input mezőt csinálunk
            this.#inputMezo = document.createElement('input'); // létrehozunk egy input mezőt
            this.#inputMezo.id = id; // beállítjuk az input mező id-ját
        }

        this.#hibaElem = document.createElement('span'); // létrehozunk egy span elemet a hibáknak
        this.#hibaElem.className = 'error'; // beállítjuk az osztályát "error"-ra (formázás miatt)
    }

    getDiv() { // metódus, ami visszaadja a teljes mezőt egy div-ben
        const kontener = makeDiv('field'); // létrehozunk egy div-et, amibe az elemek kerülnek
        const br1 = document.createElement('br'); // sortörés az input elé
        const br2 = document.createElement('br'); // sortörés az input után

        const elemek = [this.#feliratElem, br1, this.#inputMezo, br2, this.#hibaElem]; // tömbbe tesszük az összes elemet, amit hozzá akarunk adni a div-hez

        for (const elem of elemek) { // végigmegyünk az elemek tömbön
            kontener.appendChild(elem); // hozzáadjuk az aktuális elemet a div-hez
        }

        return kontener; // visszaadjuk a kész div-et, amiben benne van a label, input, br-ek és a hibaüzenet
    }
}
