import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form"
import "./content.css"
import { createEntityAsync, deleteEntityAsync, fetchEntityAsync, selectEntity, updateEntityAsync } from './contentSlice';
import { useDispatch, useSelector } from "react-redux"
// const Entities = [
//   {
//     "id": "1",
//     "name": "Person",
//     "attributes": [
//       {
//         "name": "Name",
//         "type": "string"
//       },
//       {
//         "name": "Age",
//         "type": "number"
//       }
//     ]
//   },
//   {
//     "id": "2",
//     "name": "Student",
//     "attributes": [
//       {
//         "name": "Name",
//         "type": "string"
//       },
//       {
//         "name": "phone",
//         "type": "number"
//       }
//     ]
//   }
// ]

function Content() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [entityName, setEntityName] = useState('');
  const [openAddAttribute, setOpenAddAttribute] = useState('');
  const [openAttributeDetails, setOpenAttributeDetails] = useState('');
  const [updateAttributeIndex, setUpdateAttributeIndex] = useState(-1);
  const [openInsert, setOpenInsert] = useState('');
  const [openData, setOpenData] = useState('');
  const entities = useSelector(selectEntity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntityAsync());
  }, [dispatch]);


  const handleCancelBox = () => {
    setOpenAddAttribute('');
    setUpdateAttributeIndex(-1);
    reset();
  }
  const id = Math.floor(Math.random() * 1000000);

  const handleCreateEntity = () => {
    // createEntity();
    // setEntities([...entities, { name: entityName }]);
    const newData = {
      "id": `${id}`,
      "name": `${entityName}`,
      "attributes": [],
      "tableData": []
    }
    dispatch(createEntityAsync(newData));
    setEntityName('');
    // setAttributes([]);
  };

  const handleDeleteAttribute = (entity, index) => {
    console.log("deleteattributeL: ", entity);
    const attribute = [...entity.attributes];
    attribute.splice(index, 1);
    dispatch(updateEntityAsync({ ...entity, "attributes": [...attribute] }));
    reset();
  }

  const handleUpdateAttribute = (entity, index) => {
    setUpdateAttributeIndex(index);
    setOpenAddAttribute(entity.name);
  }

  const handleFormSubmit = (entity, data) => {
    console.log("handleForm: ", entity, data);
    const attribute = { ...entity, "attributes": [...entity.attributes] }
    console.log("handleAttribute: ", attribute);
    if (updateAttributeIndex != -1) {
      attribute.attributes[updateAttributeIndex] = data;
    } else {
      attribute.attributes.push(data);
    }
    console.log(attribute);
    dispatch(updateEntityAsync(attribute));
    reset();
    // setOpenAddAttribute('');
  }
  const handleInsertSubmit = (entity, data) => {
    console.log("data to be inserted: ", data);
    const entityData = { ...entity, "tableData": [...entity.tableData, data] }
    dispatch(updateEntityAsync(entityData));
  }
  const HandleDeleteEntity = (id) => {
    dispatch(deleteEntityAsync(id));
  }

  const handleOpen = (open, entity, index) => {
    if (open == "addAttribute") {
      if (entity.name == openAddAttribute) {
        setOpenAddAttribute('');
      } else {
        setOpenAddAttribute(entity.name);
      }
      // setOpenAttributeDetails('');
      setOpenInsert('');
    } else if (open == "showAttribute") {

      if (entity.name == openAttributeDetails) {
        setOpenAttributeDetails('');
      } else {
        setOpenAttributeDetails(entity.name);
      }
      setOpenAddAttribute('');
      setOpenInsert('');
    } else if (open == "insertData") {
      if (entity.name == openInsert) {
        setOpenInsert('');
      } else {
        setOpenInsert(entity.name);
      }
      setOpenAddAttribute('');
      setOpenAttributeDetails('');
    } else if (open == "showData") {
      if (entity.name == openData) {
        setOpenData('');
      } else {
        setOpenData(entity.name);
      }
      setOpenAddAttribute('');
      setOpenAttributeDetails('');
    }
  }

  const handleUpdateRow = (entity, index) => {

  }
  const handleDeleteRow = (entity, index) => {

  }
  return (
    <div className="App">
      <h1>Content Management System</h1>
      <div>
        <h2>Create Entity</h2>
        <input
          type="text"
          placeholder="Entity Name"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
        />
        <button onClick={handleCreateEntity}>Create Entity</button>
      </div>
      <div>
        <h2>Entities</h2>
        <ul>
          {/* {console.log("entity: ", entities)} */}
          {entities.map((entity, index) => (
            <li key={index}>
              <div className='entity-title'>
                <h2>
                  {entity.name}
                </h2>
                <button onClick={() => handleOpen("addAttribute", entity, index)}>Add Attribute</button>
                <button onClick={() => handleOpen("showAttribute", entity, index)}>Show Attribute</button>
                <button onClick={() => handleOpen("insertData", entity, index)}>Insert data</button>
                <button onClick={() => handleOpen("showData", entity, index)}>Show Data</button>
                <button onClick={() => HandleDeleteEntity(entity.id)}>Delete Entity</button>
              </div>
              {openInsert == entity.name &&
                <div className="table-container">
                  <h3>Insert Data</h3>
                  <form noValidate onSubmit={handleSubmit((data) => handleInsertSubmit(entity, data))} method="POST">
                    <table className="attribute-table">
                      <thead>
                        <tr>
                          <th>Attribute Name</th>
                          <th>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entity.attributes.map((attribute, index) => (
                          <tr key={index}>
                            <td>{attribute.name}</td>
                            <td>
                              <input
                                className="attribute-input"
                                placeholder={attribute.name}
                                type={attribute.type}
                                {...register(`${attribute.name}`)}
                                required
                              />
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button type="submit" className="save-button">Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancelBox}>
                      Cancel
                    </button>

                  </form>
                </div>}
              {openData == entity.name ?
                <div className="table-container">
                  <h3>Table Data</h3>
                  <table className="attribute-table">
                    <thead>
                      <tr>
                        {entity.attributes.map((label, index) => (
                          <th key={index}>{label.name}</th>
                        ))}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entity.tableData.map((data, rind) => (
                        <tr key={rind}>
                          {entity.attributes.map((key, cind) => {
                            { console.log(data[key.name]) }
                            return <td key={cind}>{data[key.name]}</td>
                          })}
                          <td>
                            <button className="save-button" onClick={() => handleUpdateRow(entity, index)}>Update</button>
                            <button className="cancel-button" onClick={() => handleDeleteRow(entity, index)}>Delete</button>
                          </td>
                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div> : ''}
              {openAttributeDetails == entity.name ?
                <div className="table-container">
                  <h3>Attribute Details</h3>
                  <table className="attribute-table">
                    <thead>
                      <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Type</th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entity.attributes.map((attribute, index) => (
                        <tr key={index}>
                          <td>{attribute.name}</td>
                          <td>{attribute.type}</td>
                          <td>
                            <button className="save-button" onClick={() => handleUpdateAttribute(entity, index)}>Update</button>
                            <button className="cancel-button" onClick={() => handleDeleteAttribute(entity, index)}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> : ''}
              {openAddAttribute == entity.name &&
                // <form noValidate onSubmit={handleSubmit((data) => handleFormSubmit(entity, data))} method="POST">
                //   <div>
                //     <input
                //       type="text"
                //       placeholder="Attribute Name"
                //       {...register("name")}
                //       defaultValue={updateAttributeIndex !== -1 ? entity.attributes[updateAttributeIndex].name : ''}

                //     />
                //     <select
                //       name="type"
                //       {...register("type")}
                //       defaultValue={updateAttributeIndex !== -1 ? entity.attributes[updateAttributeIndex].type : ''}
                //     >
                //       <option value="string">String</option>
                //       <option value="number">Number</option>
                //       <option value="date">Date</option>
                //       <option value="bool">Boolean</option>
                //     </select>
                //     <button>Save</button>
                //     <button onClick={handleCancelBox}>Cancel</button>
                //   </div>
                // </form>
                <div className="table-container">
                  <h3>Add attribute</h3>
                  <form noValidate onSubmit={handleSubmit((data) => handleFormSubmit(entity, data))} method="POST">
                    <table className="attribute-table">
                      <thead>
                        <tr>
                          <th>Attribute Name</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              placeholder="Attribute Name"
                              {...register("name")}
                              defaultValue={updateAttributeIndex !== -1 ? entity.attributes[updateAttributeIndex].name : ''}
                            />
                          </td>
                          <td>
                            <select
                              name="type"
                              {...register("type")}
                              defaultValue={updateAttributeIndex !== -1 ? entity.attributes[updateAttributeIndex].type : ''}
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="date">Date</option>
                              <option value="bool">Boolean</option>
                            </select>
                          </td>
                          <td>
                            <button type="submit" className="save-button">Save</button>
                            <button type="button" className="cancel-button" onClick={handleCancelBox}>
                              Cancel
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>

              }
            </li>
          ))}
        </ul>
      </div>
      {/* {selectedEntity && (
        <div>
          <h2>{selectedEntity.name}</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(selectedEntity.attributes).map((attribute) => (
                  <th key={attribute}>{attribute}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedEntity.data.map((dataItem, index) => (
                <tr key={index}>
                  {Object.values(dataItem).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div >
  );
}

export default Content;
