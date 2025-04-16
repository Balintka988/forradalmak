class Area {//létrehozunk egy osztályt
    /**
     * @type {HTMLElement}
     */
    #div;// privét változó, osztályon belül látható csak
    /**
     * @type {Manager}
     */
    #manager;// privat változó, osztályon belül látható csak

    /**
     * @returns {Manager} visszaadja a #manager valtozó értékét
     */
    get manager(){ // getter metódus hogy el lehessen érni a privát managert-et
        return this.#manager; // visszaadja a #manager értékét
    }

    /**
     * @returns {HTMLElement} visszaadja a privát #div változóhoz tartozó értékét
     */
    get div(){// getter metódus hogy el lehessen érni a privát div-et
        return this.#div;// visszaadja a #div értékét
    }

    /**
     * 
     * @param {string} className - amit kreálni szeretnénk pl 'table'
     * @param {Manager} manager - a manager fájlunk
     */
    constructor(className, manager) { // konstruktor, kap egy class nevet és egy managert
        this.#manager = manager; // beállítjuk a privát #manager változót a kapott értékre
        const container = this.#getContainerDiv(); // itt hívjuk meg a privát metódus visszatérési értékét amit egy változóban tárolunk el
        this.#div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        this.#div.className = className; // beállítja a class nevet amit paraméterként kapott
        container.appendChild(this.#div); // berakja az új divet a containeroop divbe
    }

    /**
     * @returns {HTMLElement} containerDiv html elemmel tér vissza 
     */
    #getContainerDiv(){ // privát metódus
        let containerDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container
        if (!containerDiv) { // ha nincs ilyen, akkor csinál egyet
            containerDiv = document.createElement('div'); // létrehoz egy új divet
            containerDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containerDiv); // hozzáadja a bodyhoz
        }
        return containerDiv; // containerDivvel térünk vissza
    }
    
    /**
     * @param {string} label - a gomb szövege
     * @returns {HTMLButtonElement } - a gomb elemmel tér vissza
     */
    gombLetrehozas(label) { // itt hozzuk létre a gombot
        const gomb = document.createElement('button'); // létrehoz egy új button elemet
        gomb.textContent = label; // beállítja a gomb szövegét a megadott címkére
        return gomb; // visszaadja az elkészített gombot
    }
}

class Table extends Area { // létrehozunk egy Table nevű osztályt, ami az Area ősosztályból öröklődik
    /**
     * @param {string} cssClass - amit kreálni szeretnénk pl 'table'
     * @param {Manager} manager - a manager fájlunk így tudunk bele hivatkozni
     */
    constructor(cssClass, manager) { // konstruktor, kap egy cssclass nevet és egy managert
        super(cssClass, manager); // meghívjuk az Area osztály konstruktorát vele
        const tbody = this.#makeTable(); // privát metódus visszatérési értékét tároljuk el egy változóban
        
        this.manager.setAddAdatCallback(this.#addAdatCallback(tbody)); // beállítjuk az új adat hozzáadására szolgáló callback függvényt
        this.manager.setRenderTableCallback(this.#renderTableCallback(tbody)); // beállítjuk a táblázat újrarenderelésére szolgáló callback függvényt

    }
        /**
         * @param {HTMLElement} tbody megkapja a tbody-t
         * @returns {RenderTableCallback}
         */
        #renderTableCallback(tbody) { // táblázat újrarenderelése
            return (array) => { // visszaad egy callback függvényt, ami újrarendereli a táblázatot
                tbody.innerHTML = ''; // kiürítjük a táblázatot
                for (const adat of array) { // végigmegyünk az emberek listáján
                this.#adatSorra(adat, tbody); // új sorokat hozunk létre
            }
            }
        }
        
        /**
         * @param {HTMLElement} tbody megkapja a tbody-t
         * @returns {addAdatCallback}
         */
        #addAdatCallback(tbody) { // új adat hozzáadása a táblázathoz
            return(adat) => { // visszaad egy callback függvényt, ami egy új sort ad a táblázathoz
                this.#adatSorra(adat, tbody); // új sor hozzáadása
            }
        }
        
    /**
     * @param {Adat} adat az adott sor adatai
     * @param {string} tbody a táblázat tbody eleme
     */
    #adatSorra(adat, tbody){ // ezt hívjuk meg akkor amikor egy sort szeretnenk a tablazatunkba adatokkal
        const tbRow = document.createElement('tr'); // csinálunk egy új sort a táblába

        this.#createCella(tbRow, adat.forradalom) // hozzáadjuk a forradalom oszlop adatát
        this.#createCella(tbRow, adat.evszam) // hozzáadjuk a evszam oszlop adatát
        this.#createCella(tbRow, adat.sikeres) // hozzáadjuk a sikeres oszlop adatát

        tbody.appendChild(tbRow); // belerakjuk a tbody-be amivel a #makeTable metodus tér vissza
    }

    /**
     * @param {string} sor a táblázatsor amelyhez a cellát hozzáadjuk
     * @param {string} textContent a cella tartalma
     * @param {string} [type="td"] a cella típusa (alapértelmezetten "td")
     */
    #createCella(sor, textContent, type="td") { // cella létrehozása és hozzáadása egy sorhoz
        const cella = document.createElement(type); // létrehozunk egy cellát a megadott típussal
        cella.textContent = textContent; // beállítjuk a cella tartalmát
        sor.appendChild(cella); // hozzáadjuk a cellát a sorhoz
    }

    /**
     * @returns {HTMLElement} létrehozott tbody elem
     */
    #makeTable(){ // privat metódus ami a fejlecet és a tbody-t hozza létre
        const table = document.createElement('table'); // csinálunk egy table elemet
        this.div.appendChild(table); // hozzáadjuk a divhez amit az Area hozott létre

        const thead = document.createElement('thead'); // létrehozzuk a táblázat fejléce részét
        table.appendChild(thead); // hozzáadjuk a table-hez

        const theadRow = document.createElement('tr'); // létrehozunk egy sort a fejléchez
        thead.appendChild(theadRow); // hozzáadjuk a sort a thead-be

        const theadCells = ['forradalom', 'evszam', 'sikeres']; // fejléc mezők szövegeit tároljuk itt egy tömbben
        for(const cellContent of theadCells){ // végigmegyünk a tömb elemein
            this.#createCella(theadRow, cellContent, 'th');
        }
        
        const tbody = document.createElement('tbody'); // csinálunk egy üres tbody részt is
        table.appendChild(tbody); // hozzáadjuk a table-hez
        return tbody; // visszatér a tbodyval
    }
}

class Form extends Area {
    /**
     * @type {FormField[]}
     */
    #inputTomb; // privát változó, ebbe gyűjtjük az összes FormField objektumot

    /**
     * @param {string} cssClass a formhoz tartozó CSS osztály
     * @param {{fieldid:string,fieldLabel:string}[]} fieldsList a mezők listája
     * @param {Manager} manager a manager objektum
     */
    constructor(cssClass, fieldsList, manager) { // konstruktor, ami beállítja a form alapvető tulajdonságait
        super(cssClass, manager); // meghívjuk az ős (Area) konstruktorát
        this.#inputTomb = []; // inicializáljuk az inputTomb tömböt, ide kerülnek a mezők
        const form = this.#createForm(fieldsList); // helyesen használjuk a fieldsList-et
        form.addEventListener('submit', this.#formSubmitEventListener()); // helyesen átadjuk az event listener-t
    }

    /**
     * @param {{fieldid:string,fieldLabel:string}[]} fieldsList a mezők listája
     * @returns {HTMLElement} a létrehozott form elem
     */ 
    #createForm(fieldsList) { // létrehoz egy form HTML elemet a mezőkkel és a gombbal
        const form = document.createElement('form'); // létrehozunk egy form HTML elemet
        this.div.appendChild(form); // belerakjuk a formot az Area által létrehozott div-be

        for (const fieldElement of fieldsList) { // végigmegyünk az összes mező objektumon
            const formField = new FormField(fieldElement.fieldid, fieldElement.fieldLabel); // létrehozunk egy új FormField objektumot
            this.#inputTomb.push(formField); // eltároljuk a mezőt az inputTomb tömbben
            form.appendChild(formField.getDiv()); // hozzáadjuk a mezőhöz tartozó HTML elemeket a form-hoz
        }

        const gomb = this.#gombLetrehozas('Hozzáadás'); // létrehozzuk a gombot amire "Hozzáadás" lesz írva
        form.appendChild(gomb); // hozzácsapjuk a formhoz a gombot
        return form; // visszaadjuk a létrehozott form elemet
    }

    /**
     * @param {string} label a gomb szövege
     * @returns {HTMLElement} a létrehozott gomb elem
     */
    #gombLetrehozas(label) { // létrehoz egy submit tipusu gombot
        const button = document.createElement('button'); // létrehozunk egy gomb elemet
        button.type = 'submit'; // beállítjuk a típusát submit-ra
        button.textContent = label; // beállítjuk a gomb szövegét
        return button; // visszaadjuk a gombot
    }

    /**
     * @returns {EventListener} az event listener függvény
     */
    #formSubmitEventListener() { // létrehoz egy event listener-t a form submit eseményére
        return (e) => { // esemenykezelő a form elküldéséhez
            e.preventDefault(); // megakadályozzuk az oldal újratöltődését
            if (this.#errorKereses()) { // ha minden mező ki van töltve
                const valueObject = this.#getValueObject(); // lekérjük a mezők értékeit
                const adat = new Adat(valueObject.forradalom, valueObject.evszam, valueObject.sikeres); // új Adat példány létrehozása
                this.manager.addAdat(adat); // hozzáadjuk az adatot a managerhez
            }
        };
    }

    /**
     * @returns {boolean} true, ha nincs hiba különben false
     */
    #errorKereses() { // ellenőrzi, hogy minden mező ki van-e töltve
        let validE = true; // ideiglenes változó az ellenőrzéshez
        for (const errorformField of this.#inputTomb) { // végigmegyünk az összes mezőn
            errorformField.error = ''; // alapból töröljük a hibát
            if (errorformField.value === '') { // ha nincs kitöltve a mező
                errorformField.error = 'Add meg ezt is'; // hibaüzenet itt van megadva
                validE = false; // nem validE a form
            }
        }
        return validE; // visszaadjuk az ellenőrzés eredményét
    }

    /**
     * @returns {{forradalom:string, evszam: string, sikeres:string}} a mezők értékeit tartalmazó objektum
     */
    #getValueObject() { // összegyűjti a mezők értékeit egy objektumba
        const valueObject = {}; // létrehozunk egy üres objektumot
        for (const formField of this.#inputTomb) { // végigmegyünk az összes mezőn
            valueObject[formField.id] = formField.value; // hozzárendeljük az értékeket az objektumhoz
        }
        return valueObject; // visszaadjuk az objektumotí
    }
}


class UploadDownload extends Area { // létrehozunk egy UploadDownload nevű osztályt, ami az Area osztályból származik
    /** 
     * @param {string} cssClass az osztályhoz tartozó CSS osztály neve
     * @param {Manager} manager a manager peldany amely kezeli az adatokat
     */
    constructor(cssClass, manager) { // konstruktor, megkapja a css osztálynevet és egy managert
        super(cssClass, manager); // meghívjuk az ősosztály konstruktorát

        const fileInput = document.createElement('input'); // létrehozunk egy input elemet fájl feltöltéshez
        fileInput.id = 'fileinput'; // beállítjuk az input id-jét
        fileInput.type = 'file'; // megmondjuk hogy fájlt várjon ez az input
        this.div.appendChild(fileInput); // hozzáadjuk az inputot a divhez amit az Area biztosít
        fileInput.addEventListener('change', this.#importInputEventListener()); // eseménykezelő a fájl feltöltéshez

        const exportButton = this.gombLetrehozas('Letöltés'); // létrehozunk egy gombot a letöltéshez
        this.div.appendChild(exportButton); // hozzáadjuk a gombot a divhez
        exportButton.addEventListener('click', this.#exportGombEventlistener()); // eseménykezelő a letöltés gombhoz
    }
    /** 
     * @returns {EventListener}
     */
    #exportGombEventlistener() { // privát metódus a letöltési eseményhez
        return () => { // visszatérés
            const link = document.createElement('a'); // létrehozunk egy link HTML elemet
            const tartalom = this.manager.generateOutputString(); // generáljuk az exportálandó tartalmat
            const file = new Blob([tartalom]); // létrehozunk egy blob fájlt az adatokkal
            link.href = URL.createObjectURL(file); // generáljuk a fájl URL-jét
            link.download = 'newdataOop.csv'; // beállítjuk a letöltendő fájl nevét
            link.click(); // kattintunk a linkre, hogy megkezdjük a letöltést
            URL.revokeObjectURL(link.href); // felszabadítjuk az URL-t a memória érdekében
        };
    }
    /** 
     * @returns {EventListener} a fájl feltöltés eseménykezelője
     */
    #importInputEventListener() { // privát metódus a fájl feltöltési eseményhez
        return (e) => { // esemenykezelő a fajl feltöltéséhez
            const selectedFile = e.target.files[0]; // kivesszük az első kiválasztott fájlt
            if (!selectedFile) { // ellenőrizzük, hogy van-e fájl kiválasztva
                console.error('Nincs kiválasztva fájl!'); // hibaüzenet, ha nincs fájl
                return; // visszatérünk, hogy ne folytassuk a feldolgozást
            }
            const reader = new FileReader(); // létrehozunk egy új FileReader példányt
            reader.onload = () => { // ha betöltődött a fájl
                const sorok = reader.result.split('\n'); // sorokra bontjuk a fájl tartalmát
                const adatSorok = sorok.slice(1); // az első sort levágjuk (fejlécet elhagyjuk)
                for (const sor of adatSorok) { // végigmegyünk minden adatsoron
                    const tisztitottSor = sor.trim(); // eltávolítjuk a felesleges whitespace-eket
                    const mezok = tisztitottSor.split(';'); // felosztjuk a sort a pontosvesszők mentén
                    const adatok = new Adat( // létrehozunk egy új Adat példányt az adatokból
                        mezok[0], // forradalom neve
                        mezok[1], // évszám
                        mezok[2] // sima szöveg, igen/nem
                    );
                    this.manager.addAdat(adatok); // hozzáadjuk a létrehozott adatokat a managerhez
                }
            };
            reader.readAsText(selectedFile); // elindítjuk a fájl beolvasását szövegként
        };
    }
}



class FormField { // létrehozunk egy FormField nevű osztályt
    /**
     * @type {string}
     */
    #id; // privát változó azonosító tárolására
    /**
     * @type {HTMLInputElement}
     */
    #inputMezo; // privát változó az input vagy select mezőhöz
    /**
     * @type {HTMLElement}
     */
    #feliratElem; // privát változó a label (felirat) elemhez
    /**
     * @type {HTMLSpanElement}
     */
    #hibaElem; // privát változó a hibaüzenethez használt span elemhez

    /** 
     * @returns {string} a mező azonosítója
     */
    get id() { // getter metódus az id értékének lekérésére
        return this.#id; // visszaadjuk az id értékét
    }

    /** 
     * @returns {string} a mező értéke
     */
    get value() { // getter metódus az input értékének lekérésére
        return this.#inputMezo.value; // visszaadjuk az input mező (vagy select) aktuális értékét
    }

    /** 
     * @param {string} message a megjelenítendő hibaüzenet
     */
    set error(message) { // setter metódus a hibaüzenet beállítására
        this.#hibaElem.textContent = message; // beállítjuk a span szövegét a megadott üzenetre
    }

    /** 
     * @param {string} id a mező azonosítója
     * @param {string} feliratSzoveg a mezőhöz tartozó label szövege
     */
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

    /** 
     * @returns {HTMLDivElement} a mezőt tartalmazó div elem
     */
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