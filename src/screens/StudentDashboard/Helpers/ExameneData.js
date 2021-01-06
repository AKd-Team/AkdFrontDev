function getData(initialData){
    let result=[];
    for(let i=0;i<initialData.length;i++){
        let appointment={
            id:i,
            title:initialData[i].titlu,
            startDate:initialData[i].data+"T"+initialData[i].oraInceput,
            endDate:initialData[i].data+"T"+initialData[i].oraSfarsit,
        }
        result.push(appointment);
    }
    //console.log(initialData[0].titlu);
    return result;
}
export default getData;