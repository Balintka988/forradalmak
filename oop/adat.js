class Adat { // egy Adat nevű osztályt definiálunk, ez reprezentál egy adatbejegyzést
    #forradalom; // privát változó, a forradalom nevét tárolja
    #evszam; // privát változó, az évszámot tárolja
    #sikeres; // privát változó, azt tárolja hogy sikeres volt-e

    get forradalom() { // getter a forradalom mezőhöz
        return this.#forradalom; // visszaadja a privát forradalom értékét
    }

    get evszam() { // getter az évszám mezőhöz
        return this.#evszam; // visszaadja a privát évszám értékét
    }

    get sikeres() { // getter a sikeresség mezőhöz
        return this.#sikeres; // visszaadja a privát sikeres értékét
    }

    constructor(forradalom, evszam, sikeres) { // konstruktor, ami létrehoz egy új példányt
        this.#forradalom = forradalom; // beállítja a privát forradalom értéket
        this.#evszam = evszam; // beállítja a privát évszám értéket
        this.#sikeres = sikeres; // beállítja a privát sikeres értéket
    }
}