// A mock function to mimic making an async request for data
export function fetchEntity() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity')
    const data = await response.json()
    console.log("fetchdata: ", data);
    resolve(({ data }))
  });
}

export function createEntity(entity) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity', {
      method: 'POST',
      body: JSON.stringify(entity),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json();
    console.log("createdata: ", data);
    resolve(({ data }))
  });
}

export function updateEntity(entity) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity', {
      method: 'PUT',
      body: JSON.stringify(entity),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("update entity: ", data);
    resolve(({ data }))
  });
}

export function deleteEntity(entity) {
  return new Promise(async (resolve) => {
    console.log("Deleting Entity sync: ", entity)
    const response = await fetch('http://localhost:8000/api/entity/', {
      method: 'DELETE',
      body: JSON.stringify(entity),
      headers: { 'content-type': 'application/json' },
    })
    console.log("entity delete updated,", entity);
    const result = await response.json()
    resolve({ data: { entity: entity } })
  });
}

// export function addAttribute(attributeName) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8080/api/entity/attribute', {
//       method: 'POST',
//       body: JSON.stringify(attributeName),
//       headers: { 'content-type': 'application/json' },
//     })
//     const data = await response.json()
//     console.log("updatedata: ", data);
//     resolve(({ data }))
//   });
// }

// export function fetchTableData(entityName) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8000/api/entity/attribute'+en)
//     const data = await response.json()
//     console.log("fetchdata: ", data);
//     resolve(({ data }))
//   });
// }