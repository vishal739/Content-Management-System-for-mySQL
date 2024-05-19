// A mock function to mimic making an async request for data
export function fetchTableData(entity) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity/attribute/data/'+entity)
    const data = await response.json()
    console.log("fetchTabledata: ", data);
    resolve(({ data }))
  });
}

export function createTableData(tableData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity/attribute/data/', {
      method: 'POST',
      body: JSON.stringify(tableData),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("createdata: ", data);
    resolve(({ data }))
  });
}

export function updateTableData(tableData) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity/attribute/data/', {
      method: 'PUT',
      body: JSON.stringify(tableData),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("updatedata: ", data);
    resolve(({ data }))
  });
}

export function deleteTableData(tableData) {
  return new Promise(async (resolve) => {
    console.log("Deleting sync: ", tableData)
    const response = await fetch('http://localhost:8000/api/entity/attribute/data/', {
      method: 'DELETE',
      body: JSON.stringify(tableData),
      headers: { 'content-type': 'application/json' },
    })
    console.log("delete updated,", tableData);
    const result = await response.json()
    resolve({ data: { index: tableData.index } })
  });
}

// export function addAttribute(attributeName) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/api/tableData/attribute', {
//       method: 'POST',
//       body: JSON.stringify(attributeName),
//       headers: { 'content-type': 'application/json' },
//     })
//     const data = await response.json()
//     console.log("updatedata: ", data);
//     resolve(({ data }))
//   });
// }

// export function fetchTableData(tableDataName) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8000/api/tableData/attribute'+en)
//     const data = await response.json()
//     console.log("fetchdata: ", data);
//     resolve(({ data }))
//   });
// }