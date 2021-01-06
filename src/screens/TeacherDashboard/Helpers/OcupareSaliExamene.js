function getData(initialData){
    let result=[];
    for(let i=0;i<initialData.length;i++){
        let appointment={
            id:i,
            date:new Date(`${initialData[i].data}T${initialData[i].oraInceput}:00`),
            day:new Date(`${initialData[i].data}T${initialData[i].oraInceput}:00`).getDate(),
            year:new Date(`${initialData[i].data}T${initialData[i].oraInceput}:00`).getFullYear(),
            month:new Date(`${initialData[i].data}T${initialData[i].oraInceput}:00`).getMonth(),
        }
        result.push(appointment);
    }

    return result;
}
export default getData;