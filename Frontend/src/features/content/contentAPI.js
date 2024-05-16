// A mock function to mimic making an async request for data
export function fetchEntity() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/entities')
    const data = await response.json()
    console.log("fetchdata: ", data);
    resolve(({ data }))
  });
}
export function createEntity(entity) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/entities/', {
      method: 'POST',
      body: JSON.stringify(entity),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("createdata: ", data);
    resolve(({ data }))
  });
}
export function updateEntity(entity) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/entities/' + entity.id, {
      method: 'PUT',
      body: JSON.stringify(entity),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("updatedata: ", data);
    resolve(({ data }))
  });
}

export function deleteEntity(Id) {
  return new Promise(async (resolve) => {
    console.log("Deleting sync: ", Id)
    const response = await fetch('http://localhost:8080/entities/' + Id, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    })
    console.log("delete updated,", Id);
    const result = await response.json()
    resolve({ data: { id: Id } })
  });
}

// export function fetchTableData(entityName) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8000/entity/data/'+en)
//     const data = await response.json()
//     console.log("fetchdata: ", data);
//     resolve(({ data }))
//   });
// }