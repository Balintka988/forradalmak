class Area {//létrehozunk egy osztályt
    constructor(className) { // konstruktor, kap egy class nevet
        let containerDiv = document.querySelector('.containeroop'); // megnézi van-e már ilyen nevű container
        if (!containerDiv) { // ha nincs ilyen, akkor csinál egyet
            containerDiv = document.createElement('div'); // létrehoz egy új divet
            containerDiv.className = 'containeroop'; // beállítja a class nevét
            document.body.appendChild(containerDiv); // hozzáadja a bodyhoz
        }
        const div = document.createElement('div'); // létrehoz egy új divet a kapott class-hoz
        div.className = className; // beállítja a class nevet amit paraméterként kapott
        containerDiv.appendChild(div); // berakja az új divet a containeroop divbe
    }
}