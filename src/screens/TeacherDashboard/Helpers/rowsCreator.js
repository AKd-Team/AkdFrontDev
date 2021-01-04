
function createRows(initialData){
    var newData=[];
    for(let i=0;i<initialData.length;i++){
        let row={id:initialData[i].idStudent,Nume:initialData[i].nume+" "+initialData[i].prenume,Grupa:initialData[i].grupa};
        newData.push(row);
    }
    return newData;
}

export default createRows;