import axios from "axios";
let crt = new Date
let week = [];
for (let i = 1; i <= 7; i++) {
    let first = crt.getDate() - crt.getDay() + i
    let day = new Date(crt.setDate(first)).toISOString().slice(0, 10)
    week.push(day)
}

let weekDays=["Luni","Marti","Miercuri","Joi","Vineri"];
async function getInitialData(id,token){
    let initialData=[];
    let URL=`http://localhost:4000/student/orar/${id}`;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    await axios.get(URL,config)
        .then(function (response) {
            //console.log(response.data);
            for(let i=0;i<response.data.length;i++){
                initialData.push(response.data[i])
            }
        })
        .catch(function (error) {
            console.log(error);
        });
   // console.log(initialData);
    return initialData;
}
function getData(initialData){
    console.log(initialData);
    let result=[];
    for(let i=0;i<initialData.length;i++){
        let appointment={
            id:i,
            title: initialData[i].titlu+" "+initialData[i].formatie+" "+initialData[i].numeProfesor+" "+initialData[i].numeSala,
            startDate:week[weekDays.indexOf(initialData[i].ziuaSaptamanii)]+"T"+initialData[i].oraInceput,
            endDate:week[weekDays.indexOf(initialData[i].ziuaSaptamanii)]+"T"+initialData[i].oraSfarsit,
        }
        result.push(appointment);
    }
    return result;
}
export default getData;