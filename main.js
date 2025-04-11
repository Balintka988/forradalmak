/**
 * @typedef {{forradalom:String, evszam:string, sikeres:string}}Forradalom
 * 
 * @type {Forradalom[]} array
 */
const array = []; // létrehozok egy array tömböt


const containerDiv = makeDiv('container'); // container nevű divet csinál
document.body.appendChild(containerDiv); // hozzáadja a bodyhoz a container divet


tablaKrealas(containerDiv, (bodyOfTable) => { // a tablaKrealas létrehozza a táblázatot, majd a kapott tbody-t használja tovább minden funkcióhoz
    createForm(bodyOfTable, containerDiv, array); // létrehozza az urlapot az új adatok beküldéséhez
    fajlFeltoltes(bodyOfTable, containerDiv, array); //fFeltölti a táblázatot a fajlból betöltött adatokkal
    fajlLetoltes(containerDiv, array); // lehetővé teszi a táblázat adatainak letöltését
    formSzures(containerDiv, bodyOfTable, array); // letrehozza a szűréshez kapcsolodo összes dolgot
});