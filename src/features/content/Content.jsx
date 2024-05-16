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
  const [addAttributesOpen, setAddAttributesOpen] = useState('');
  const [openAttribute, setOpenAttribute] = useState('');
  const [updateAttributeIndex, setUpdateAttributeIndex] = useState(-1);
  const entities = useSelector(selectEntity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntityAsync());
  }, [dispatch]);


  const handleCancelBox = () => {
    setAddAttributesOpen('');
    setUpdateAttributeIndex(-1);
    reset();
  }
  const handleCreateEntity = () => {
    // createEntity();
    // setEntities([...entities, { name: entityName }]);
    const newData = {
      "id": "3",
      "name": `${entityName}`,
      "attributes": []
    }
    dispatch(createEntityAsync(newData));
    setEntityName('');
    // setAttributes([]);
  };

  const handleDeleteAttribute = (entity,index) =>{
    console.log("deleteattributeL: ",entity);
    const attribute= [...entity.attributes];
    attribute.splice(index,1);
    dispatch(updateEntityAsync({...entity, "attributes": [...attribute]}));
  }

  const handleUpdateAttribute = (entity, index) => {
    setUpdateAttributeIndex(index);
    setAddAttributesOpen(entity.name);
  }

  const handleFormSubmit = (entity, data) => {
    const attribute = { ...entity, "attributes": [...entity.attributes] }
    if (updateAttributeIndex != -1) {
      attribute.attributes[updateAttributeIndex] = data;
    } else {
      attribute.attributes.push(data);
    }
    console.log(attribute);
    dispatch(updateEntityAsync(attribute));
    reset();
    setAddAttributesOpen('');
  }
  const HandleDeleteEntity = (id) => {
    dispatch(deleteEntityAsync(id));
  }
  const handleShowAttribute = (entity) => {

    if (entity.name == openAttribute) {
      setOpenAttribute('');
    } else {
      setOpenAttribute(entity.name);

    }

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
          {console.log("entity: ", entities)}
          {entities.map((entity, index) => (
            <li key={index}>
              <div className='entity-title'>
                <h2>
                  {entity.name}
                </h2>
                <button onClick={() => handleShowAttribute(entity)}>Show Attribute</button>
                <button onClick={() => HandleDeleteEntity(entity.id)}>Delete Entity</button>
                <button onClick={() => setAddAttributesOpen(entity.name)}>Add Attribute</button>
              </div>

              {openAttribute == entity.name ?
                <div>
                  {/* <h2>{entity.name}</h2> */}
                  <table>
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
                            <button onClick={() => handleUpdateAttribute(entity, index)}>Update</button>
                            <button onClick={()=> handleDeleteAttribute(entity,index)}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> : ''}
              {addAttributesOpen == entity.name &&
                <form noValidate onSubmit={handleSubmit((data) => handleFormSubmit(entity, data))} method="POST">
                  <div>
                    <input
                      type="text"
                      placeholder="Attribute Name"
                      {...register("name")}
                      defaultValue={updateAttributeIndex !== -1 ? entity.attributes[updateAttributeIndex].name : ''}

                    />
                    <select
                      name="type"
                      {...register("type")}
                      defaultValue={updateAttributeIndex !== -1 ? entity.attributes[updateAttributeIndex].type : ''}
                    >
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                      <option value="bool">Boolean</option>
                    </select>
                    <button>Save</button>
                    <button onClick={handleCancelBox}>Cancel</button>
                  </div>
                </form>}
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
    </div>
  );
}

export default Content;
