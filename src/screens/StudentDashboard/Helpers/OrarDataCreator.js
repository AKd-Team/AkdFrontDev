let crt = new Date
let week = [];
for (let i = 1; i <= 7; i++) {
    let first = crt.getDate() - crt.getDay() + i
    let day = new Date(crt.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
}

let weekDays=["Luni","Marti","Miercuri","Joi","Vineri"];
let initialData=[
    {title:'LFTC Curs',startDate:'08:00',endDate:'09:50',formatie: 'MI',profesor: 'Guran',ziua:'Luni'},
    {title:'LFTC Seminar',startDate:'10:00',endDate:'11:50',formatie: '332',profesor: 'Miss R',ziua:'Luni'},
    {title:'Ecuatii derivate partiale Seminar',startDate:'18:00',endDate:'19:50',formatie: '332',profesor:'Nush',ziua:'Marti'},
    {title:'RPA Curs',startDate:'08:00',endDate:'09:50',formatie: 'MI',profesor: 'Camelia',ziua: 'Miercuri'},
    {title:'Statistica Seminar',startDate:'10:00',endDate:'11:50',formatie: '332',profesor: 'Natalia',ziua:'Miercuri'},
    {title:'Proiect Colectiv',startDate:'10:00',endDate:'11:00',formatie: '332',profesor: 'Adrian',ziua:'Joi'},
    {title:'Astronomie Curs',startDate:'08:00',endDate:'09:50',formatie: 'MI',profesor: 'Blaga',ziua:'Vineri'},
    {title:'Astronomie Laborator',startDate:'16:00',endDate:'18:00',formatie: 'MI',profesor: 'Blaga',ziua:'Vineri'},
];
function getData(){
    let result=[];
    for(let i=0;i<initialData.length;i++){
        let appointment={
            id:i,
            title: initialData[i].title+" "+initialData[i].formatie+" "+initialData[i].profesor,
            startDate:week[weekDays.indexOf(initialData[i].ziua)]+"T"+initialData[i].startDate,
            endDate:week[weekDays.indexOf(initialData[i].ziua)]+"T"+initialData[i].endDate,
        }
        result.push(appointment);
    }
    return result;
}
export default getData;