function createRows(initialData){
    var newData=[];
    for(let i=0;i<initialData.length;i++){
        let row={id:initialData[i].cod+initialData[i].nume,Nume:initialData[i].nume,Promovat:initialData[i].promovat};
        newData.push(row);
    }
    return newData;
}

export default createRows;