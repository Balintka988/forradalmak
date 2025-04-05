class Area {//létrehozunk egy osztályt
    #div;// privét változó, osztályon belül látható csak

    get div(){// getter metódus hogy el lehessen érni a privát div-et
        return this.#div;// visszaadja a #div értékét
    }

    constructor(className) { // konstruktor, kap egy class nevet
        let containerDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container
        if (!containerDiv) { // ha nincs ilyen, akkor csinál egyet
            containerDiv = document.createElement('div'); // létrehoz egy új divet
            containerDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containerDiv); // hozzáadja a bodyhoz
        }
        this.#div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        this.#div.className = className; // beállítja a class nevet amit paraméterként kapott
        containerDiv.appendChild(this.#div); // berakja az új divet a containeroop divbe
    }
}

class Table extends Area { // létrehozunk egy Table nevű osztályt, ami az Area ősosztályból öröklődik
    constructor(cssClass){ // konstruktor, kap egy css class nevet
        super(cssClass); // meghívjuk az Area osztály konstruktorát vele
        
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
    }
}
