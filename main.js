const array = []; // létrehozok egy array tömböt


const containerDiv = makeDiv('container'); // container nevű divet csinál
document.body.appendChild(containerDiv); // hozzáadja a bodyhoz a container divet

/**
 * letrehozza a tablazatot és vegrehajtja az összes szükséges funkciót mint a form létrehozása, fájlok feltöltése, 
 * letöltés és a szűrés
 * 
 * @param {HTMLElement} containerDiv - a konténer amely a táblázatot és a kapcsolodo funkciókat tárolja
 * @param {Function} bodyOfTable - a callback fuggveny amely a táblázat törzse (tbody) elemeit használja
 */
tablaKrealas(containerDiv, (bodyOfTable) => { // a tablaKrealas létrehozza a táblázatot, majd a kapott tbody-t használja tovább minden funkcióhoz
    createForm(bodyOfTable, containerDiv, array); // létrehozza az urlapot az új adatok beküldéséhez
    fajlFeltoltes(bodyOfTable, containerDiv, array); //fFeltölti a táblázatot a fajlból betöltött adatokkal
    fajlLetoltes(containerDiv, array); // lehetővé teszi a táblázat adatainak letöltését
    formSzures(containerDiv, bodyOfTable, array); // letrehozza a szűréshez kapcsolodo összes dolgot
});