class Area {//létrehozunk egy osztályt
    #div;// privét változó, osztályon belül látható csak

    get div(){// getter metódus hogy el lehessen érni a privát div-et
        return this.#div;// visszaadja a #div értékét
    }

    constructor(className) { // konstruktor, kap egy class nevet
        const container = this.#getContainerDiv(); // itt hívjuk meg a privát metódust amit egy változóban tárolunk el
        this.#div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        this.#div.className = className; // beállítja a class nevet amit paraméterként kapott
        container.appendChild(this.#div); // berakja az új divet a containeroop divbe
    }

    #getContainerDiv(){
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
    constructor(cssClass){ // konstruktor, kap egy cssclass nevet
        super(cssClass); // meghívjuk az Area osztály konstruktorát vele
        const tabla =this.#makeTable(); // privat metodus hivas amit egy valtozoban tarolunk el
    }

    #makeTable(){
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
    constructor(cssClass, fieldsList){ // konstruktor, megkapja a cssclass nevet
        super(cssClass); // meghívjuk az ős (Area) konstruktorát
        const form = document.createElement('form'); // csinálunk egy form html elemet
        this.div.appendChild(form); // belerakjuk a formot az Area által létrehozott div-be
        
        for(const fieldElement of fieldsList){ // végigmegyünk az összes mező objektumon
            const field = makeDiv('field'); // csinálunk egy divet "field" class-szal
            form.appendChild(field); // hozzáadjuk a formhoz
        
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
                input = document.createElement('input'); // ha nem a "sikeres" mező, akkor sima input
                input.id = fieldElement.fieldid; // beállítjuk az id-t
            }
            field.appendChild(input); // végül belerakjuk az inputot is a field divbe
        }
        
        const buttonFormSim = document.createElement('button'); // létrehozunk egy gombot
        buttonFormSim.textContent = 'hozzáadás'; // a gomb szövege az lesz hogy "hozzáadás"
        form.appendChild(buttonFormSim); // hozzácsapjuk a formhoz
    }
}
