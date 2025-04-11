/**
 * @callback RenderTableCallback
 * @param {HTMLElement} tbody
 * @returns {void}
 * 
 * @callback addAdatCallback
 *  @param {HTMLElement} tbody megkapja a tbody-t
 * @returns {void}
 */
class Manager { // egy Manager nevű osztály, kezeli az adatokat
    /**
     * @type {Adat[]}
     */
    #array; // privát tömb, amiben az Adat objektumokat tároljuk
    /**
     * @type {addAdatCallback}
     */
    #addAdatCallback; // privát callback függvény, amit meghívunk új adat hozzáadásánál
    /**
     * @type {RenderTableCallback}
     */
    #renderTableCallback; // ez a függvény kerül meghívásra amikor a tablázatot újra kell renderelni peldaiul szures után

    constructor() { // konstruktor, ami létrehozza az objektumot
        this.#array = []; // inicializáljuk a privát tömböt üresen
    }

    /**
     * @param {Function} callback - a callback függvény amely az új adatot kezeli
     */
    setAddAdatCallback(callback) { // beállítjuk a callback függvényt kívülről
        this.#addAdatCallback = callback; // eltároljuk a megadott callbacket privát változóban
    }

    /**
     * @param {Adat} adat - az új adat objektum
     */
    addAdat(adat) { // új adatot adunk az adattömbhöz
        this.#array.push(adat); // belerakjuk az új adatot a privát tömbbe
        this.#addAdatCallback(adat); // meghívjuk a callbacket az új adattal
    }

    /**
    * @param {Function} callback - a callback függvény amely meghatározza, hogyan történjen az újrarenderelés
    */
    setRenderTableCallback(callback) { // beállítja a táblázat újrarenderelésére szolgalo callback függvényt
        this.#renderTableCallback = callback; // eltárolja a callback függvényt a privát változóban
    }

    /**
     * @returns {string} - a letöltési szöveg pontosvesszővel elválasztott értékekkel
     */
    generateOutputString() { // a letöltéshez szükséges szöveget generaljuk itt
        const eredmeny = ['forradalom;evszam;sikeres']; // létrehozunk egy tömböt amely a fejlécet tartalmazza
        for (const adat of this.#array) { // végigmegyünk a privat adattömb elemein
            eredmeny.push(`${adat.forradalom};${adat.evszam};${adat.sikeres}`); // hozzáadjuk az adatokat pontosvesszővel elválasztva
        }
        return eredmeny.join('\n'); // a sorokat egy szöveggé fűzzük össze sortöréssel elválasztva
    }

    /**
    * @param {Function} callback - a callback függvény amely meghatározza a szűrési feltételt
    */
    filter(callback) { // alkalmaz egy szűrési feltételt az adattömbre és meghívja a táblázat újrarenderelési függvényt
        const eredmeny = []; // létrehoz egy üres tömböt a szurt adatok tárolására
        for (const adat of this.#array) { // végigmegy az adattomb elemein
            if (callback(adat)) { // ha az adott elem megfelel a szűrési feltételnek
                eredmeny.push(adat); // hozzáadja a szűrt adatot az eredmeny tömbhöz
            }
        }
        this.#renderTableCallback(eredmeny); // meghívja a táblázat újrarenderelési függvényt a szurt adatokkal
    }
}