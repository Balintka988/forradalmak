class Adat { // egy Adat nevű osztályt definiálunk, ez reprezentál egy adatbejegyzést
    /**
     * @type {string}
     */
    #forradalom; // privát változó, a forradalom nevét tárolja
    /**
     * @type {string}
     */
    #evszam; // privát változó, az évszámot tárolja
    /**
     * @type {string}
     */
    #sikeres; // privát változó, azt tárolja hogy sikeres volt-e

    /**
     * @returns {string} - a forradalom neve
     */
    get forradalom() { // getter a forradalom mezőhöz
        return this.#forradalom; // visszaadja a privát forradalom értékét
    }

    /**
     * @returns {string} - a forradalom évszáma
     */
    get evszam() { // getter az évszám mezőhöz
        return this.#evszam; // visszaadja a privát évszám értékét
    }

    /**
     * @returns {string} - a forradalom sikeressége
     */
    get sikeres() { // getter a sikeresség mezőhöz
        return this.#sikeres; // visszaadja a privát sikeres értékét
    }

    /**
     * @param {string} forradalom - a forradalom neve
     * @param {string} evszam - a forradalom évszáma
     * @param {string} sikeres - a forradalom sikeressége
     */
    constructor(forradalom, evszam, sikeres) { // konstruktor, ami létrehoz egy új példányt
        this.#forradalom = forradalom; // beállítja a privát forradalom értéket
        this.#evszam = evszam; // beállítja a privát évszám értéket
        this.#sikeres = sikeres; // beállítja a privát sikeres értéket
    }
}