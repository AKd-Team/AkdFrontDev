let crt = new Date();
let week = [];
for (let i = 1; i <= 7; i++) {
    let first = crt.getDate() - crt.getDay() + i
    let day = new Date(crt.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
}

let weekDays=["Luni","Marti","Miercuri","Joi","Vineri"];
function getData(initialData){
    console.log(initialData);
    let result=[];
    for(let i=0;i<initialData.length;i++){
        let appointment={
            id:i,
            title: initialData[i].numeMaterie+" "+initialData[i].formatie+" "+initialData[i].numeSala+" "+initialData[i].frecventa,
            startDate:week[weekDays.indexOf(initialData[i].ziuaSaptamanii)]+"T"+initialData[i].oraInceput,
            endDate:week[weekDays.indexOf(initialData[i].ziuaSaptamanii)]+"T"+initialData[i].oraSfarsit,
        }
        console.log(week[weekDays.indexOf(initialData[0].ziuaSaptamanii)])
        result.push(appointment);
    }
    return result;
}
export default getData;