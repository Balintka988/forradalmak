class Manager { // egy Manager nevű osztály, kezeli az adatokat
    #array; // privát tömb, amiben az Adat objektumokat tároljuk
    #addAdatCallback; // privát callback függvény, amit meghívunk új adat hozzáadásánál

    constructor() { // konstruktor, ami létrehozza az objektumot
        this.#array = []; // inicializáljuk a privát tömböt üresen
    }

    setAddAdatCallback(callback) { // beállítjuk a callback függvényt kívülről
        this.#addAdatCallback = callback; // eltároljuk a megadott callbacket privát változóban
    }

    addAdat(adat) { // új adatot adunk a listához
        this.#array.push(adat); // belerakjuk az új adatot a privát tömbbe
        this.#addAdatCallback(adat); // meghívjuk a callbacket az új adattal
    }

    generateOutputString() { // a letöltéshez szükséges szöveget generaljuk itt
        const eredmeny = ['forradalom;evszam;sikeres']; // létrehozunk egy tömböt amely a fejlécet tartalmazza
        for (const adat of this.#array) { // végigmegyünk a privat adattömb elemein
            eredmeny.push(`${adat.forradalom};${adat.evszam};${adat.sikeres}`); // hozzáadjuk az adatokat pontosvesszővel elválasztva
        }
        return eredmeny.join('\n'); // a sorokat egy szöveggé fűzzük össze sortöréssel elválasztva
    }
}