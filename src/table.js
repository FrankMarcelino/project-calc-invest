const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement)&& arrayElement.length > 0;
};

const createTable = (columnsArray, dataArray, tableId) => {
    if(
      !isNonEmptyArray(columnsArray) || 
      !isNonEmptyArray(dataArray) || 
      !tableId
    ){
      throw new Error(
        'Para a correeta execução, precisamos de um array com as conlunas e outro com as linhas.'
      );
    }
    const tableElement = document.createElement('tableId');
    if(!tableElement || tableElement.nodeName !== 'TABLE'){
      throw new Error(
        'Id informado nao corresponde a nenhum elemento table.'
      );
    }

    createTableHead(tableElement, columnsArray);
    createTableBody(tableElement, dataArray);
};

function createTableHead(tableElement, columnsArray) {
  const tableHead = document.createElement('thead');
  const tableHeadRow = document.createElement('tr');

  for (const column of columnsArray) {  