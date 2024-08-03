const isNonEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement)&& arrayElement.length > 0;
};

export const createTable = (columnsArray, dataArray, tableId) => {
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

    createTableHeader(tableElement, columnsArray);
    createTableBody(tableReference, dataArray, columnsArray);
};

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderReference = 
    tableReference.querySelector('thead') ?? createTheadElement(tableReference);
  const headerRow = document.createElement('tr');
  for (const tableColumnObject of columnsArray) {
    const headerElemt = `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerRow.innerHTML += headerElemt;
  }
  tableHeaderReference.appendChild(headerRow);
}
function createTableBody(tableReference, tableItems, columnsArray) {
  function createTbodyElement(tableReference) {
    const tbody = document.createElement('tbody');
    tableReference.appendChild(tbody);
    return tbody;
  }
  const tableBodyReference =
    tableReference.querySelector('tbody') ?? createTbodyElement(tableReference);

  for (const [iteIndex, tableItem] of tableItems.entries()) {
    const tableRow = document.createElement('tr');

    for (const tableColumn of columnsArray) {
      tableRow.innerHTML += `<td class="text-center">${tableItem[tableColumn.accessor]}</td>`;
    }
    tableBodyReference.appendChild(tableRow);
  }
}

