class FilterForm extends Area { // a FilterForm osztályunk az Area ősosztályból származik
    /**
     * @param {string} cssClass - a CSS osztálynév amelyet az ősosztály div eleméhez ad
     * @param {Manager} manager - a manager objektum amely a szűrési logika végrehajtásáért felel
     */
    constructor(cssClass, manager) { // konstruktor, megkapja a css osztálynevet és egy managert 
        super(cssClass, manager); // meghívja az Area ősosztály konstruktorát

        const form = document.createElement('form'); // létrehoz egy form elemet a szűréshez
        this.div.appendChild(form); // hozzáadja a formot a div-hez, amelyet az Area hozott létre

        const select = document.createElement('select'); // létrehoz egy legördülő menüt
        form.appendChild(select); // hozzáadja a legördülőt a formhoz

        const options = [ // opciók definiálása a legördülő menühöz
            { value: '', innerText: 'Válassz mezőt' }, // alapértelmezett opció
            { value: 'forradalom', innerText: 'Forradalom' }, // első szűrési opció
            { value: 'evszam', innerText: 'Évszám' }, // második szűrési opció
            { value: 'sikeres', innerText: 'Sikeres' }, // harmadik szűrési opció
        ];

        for (const option of options) { // végigmegy az opciók listáján
            const optionElement = document.createElement('option'); // létrehoz egy új opció elemet
            optionElement.value = option.value; // beállítja az opció értékét
            optionElement.innerText = option.innerText; // beállítja az opció szövegét
            select.appendChild(optionElement); // hozzáadja az opciót a legördülő menühöz
        }

        const input = document.createElement('input'); // létrehoz egy bemeneti mezőt
        input.id = 'filterInput'; // beállítja az input mező id-jét
        form.appendChild(input); // hozzáadja az input mezőt a formhoz

        const button = document.createElement('button'); // létrehoz egy gombot
        button.innerText = 'Szűrés'; // beállítja a gomb szövegét
        form.appendChild(button); // hozzáadja a gombot a formhoz

        const divElem = document.createElement('div'); // létrehoz egy új div elemet
        form.appendChild(divElem); // hozzáadja a div elemet a formhoz
            
        form.addEventListener('submit', (e) => { // eseményfigyelőt ad a form submit eseményéhez
            e.preventDefault(); // megakadályozza az oldal alapértelmezett újratöltését
            const szamlalo = manager.szamlalo(select.value, input.value); // meghívja a manager szamlalo függvényét a select és input értékekkel
            divElem.innerHTML = `A szűrésnek megfelelő dolgok száma: ${szamlalo}`; // beállítja a div elem tartalmát a szűrés eredményének megjelenítésére
        });

    }
}