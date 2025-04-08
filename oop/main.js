const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator); // hozzáadjk a bodyhoz az elválasztó vonalat

const fieldsList = [{ // egy tömb objektumokkal, minden mezőről infó
    fieldid: 'forradalom', // ez lesz az input id-ja
    fieldLabel: 'forradalom' // ezt a szöveget látjuk a label-ben
},
{
    fieldid: 'evszam', // második mező id
    fieldLabel: 'evszám' // második mező felirat
},
{
    fieldid: 'sikeres', // harmadik mező id
    fieldLabel: 'sikeres' // harmadik mező felirat
}];

const manager = new Manager(); // manager példányosítása
const table = new Table('table', manager); // példányosítjuk a Table osztályt, 'table' class-szal, managert is megadjuk neki
const form = new Form('form', fieldsList, manager); // példányosítjuk a Form osztályt, 'form' class-szal, és egy listaval, és a managerrel
const fileUploader = new Upload('upload', manager); // a fájlfeltöltőnk példányosítása
// legalul kell lennie így hogy listet adunk at!