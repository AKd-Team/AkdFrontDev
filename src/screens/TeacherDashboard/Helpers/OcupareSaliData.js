let crt = new Date
let week = [];
for (let i = 1; i <= 7; i++) {
    let first = crt.getDate() - crt.getDay() + i
    let day = new Date(crt.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
}
let weekDays=["Luni","Marti","Miercuri","Joi","Vineri"];
// let initialData=[
//     {formatie:'I3',numeProfesor:'Guran',oraInceput:'08:00',oraSfarsit:'09:50',date:'2020-12-14'},
//     {formatie:'MI2',numeProfesor:'Adriana',oraInceput:'12:00',oraSfarsit:'13:50',date:'2020-12-15'},
//     {formatie:'I2',numeProfesor:'Buica',oraInceput:'14:00',oraSfarsit:'15:50',date:'2020-12-17'},
//     {formatie:'MI1',numeProfesor:'Blaga',oraInceput:'08:00',oraSfarsit:'09:50',date:'2020-12-16'}
// ]
function getData(initialData){
    let result=[];
    for(let i=0;i<initialData.length;i++){
        let appointment={
            id:i,
            title:initialData[i].titlu+" "+initialData[i].codSpecializare,
            startDate:initialData[i].data+"T"+initialData[i].oraInceput,
            endDate:initialData[i].data+"T"+initialData[i].oraSfarsit,
        }
        result.push(appointment);
    }
    //console.log(initialData[0].titlu);
    return result;
}
export default getData;