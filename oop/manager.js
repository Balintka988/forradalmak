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
}