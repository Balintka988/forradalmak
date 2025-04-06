const separator = document.createElement('hr'); // hogy a html-en egyszeruen megtalalhato legyen az elvalaszto oop es sima kozott
document.body.appendChild(separator); // hozzáadjk a bodyhoz az elválasztó vonalat

const table = new Table('table'); // példányosítjuk a Table osztályt, 'table' class-szal

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

const form = new Form('form', fieldsList); // példányosítjuk a Form osztályt, 'form' class-szal
//legalul kell lenni így hogy listet adunk at!