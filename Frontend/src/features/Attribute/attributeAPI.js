// A mock function to mimic making an async request for data
export function fetchAttribute(entity) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity/attribute/'+entity);
    console.log('http://localhost:8000/api/entity/attribute/' +entity);
    const data = await response.json()
    console.log("fetchdata: ", data);
    resolve(({ data }))
  });
}

export function createAttribute(attribute) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity/attribute', {
      method: 'POST',
      body: JSON.stringify(attribute),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("createdata: ", data);
    resolve(({ data }))
  });
}

export function updateAttribute(attribute) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/api/entity/attribute', {
      method: 'PUT',
      body: JSON.stringify(attribute),
      headers: { 'content-type': 'application/json' },
    })
    const data = await response.json()
    console.log("updatedata: ", data);
    resolve(({ data }))
  });
}

export function deleteAttribute(attribute) {
  return new Promise(async (resolve) => {
    console.log("Deleting sync: ", attribute)
    const response = await fetch('http://localhost:8000/api/entity/attribute',{
      method: 'DELETE',
      body: JSON.stringify(attribute),
      headers: { 'content-type': 'application/json' },
    })
    console.log("delete updated,", attribute);
    const result = await response.json()
    resolve({ data: { name: attribute.attribute } })
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