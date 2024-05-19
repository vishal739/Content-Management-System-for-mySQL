import  { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import "./content.css"
import { useDispatch, useSelector } from "react-redux"
import { createEntityAsync, fetchEntityAsync, deleteEntityAsync, selectEntity, updateEntityAsync } from '../Entity/entitySlice';
import { createAttributeAsync, deleteAttributeAsync, fetchAttributeAsync, selectAttribute, updateAttributeAsync } from '../Attribute/attributeSlice';
import { createTableDataAsync, deleteTableDataAsync, fetchTableDataAsync, selectTableData, updateTableDataAsync } from '../tableData/tableDataSlice';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Content() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [entityName, setEntityName] = useState('');
  const [openUpdateEntity, setOpenUpdateEntity] = useState('');
  const [openAddAttribute, setOpenAddAttribute] = useState('');
  const [openAttributeDetails, setOpenAttributeDetails] = useState('');
  const [updateAttributeIndex, setUpdateAttributeIndex] = useState(-1);
  const [openUpdateAttribute, setOpenUpdateAttribute] = useState('');
  const [updateEntityName, setUpdateEntityName] = useState('');
  const [openInsert, setOpenInsert] = useState('');
  const [openData, setOpenData] = useState('');
  const [openUpdateTableData, setOpenUpdateTableData] = useState('');
  const [updateIndexTableData, setUpdateIndexTableData] = useState(-1);
  const entities = useSelector(selectEntity);
  const attributes = useSelector(selectAttribute);
  const tableData = useSelector(selectTableData);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("useEffect");
    dispatch(fetchEntityAsync());
    // reset()
  }, [dispatch]);


  const handleCancelBox = () => {
    setOpenAddAttribute('');
    setUpdateAttributeIndex(-1);
    setOpenUpdateAttribute('');
    setOpenInsert('');
    setOpenUpdateEntity('');
    setUpdateIndexTableData(-1);
    setOpenUpdateTableData('');
    reset();
  }

  //---------------------->Operations for Entity<--------------------------
  const handleCreateEntity = () => {
    const newData = {
      "entity": `${entityName}`
    }
    dispatch(createEntityAsync(newData));
    setEntityName('');
  };
  const HandleDeleteEntity = (name) => {
    const data = { "entity": name }
    dispatch(deleteEntityAsync(data));
  }
  const HandleUpdateEntity = () => {
    const data = { "oldName": openUpdateEntity, "newName": updateEntityName };
    dispatch(updateEntityAsync(data));
  }

  //---------------------->Operations for Attribute<--------------------------
  const handleAddAttribute = (entity) => {
    if (entity.Tables_in_vahan_db == openAddAttribute) {
      setOpenAddAttribute('');
    } else {
      setOpenAddAttribute(entity.Tables_in_vahan_db);
    }
    setOpenInsert('');
  }
  const typeFormater = (type) => {
    if (type == 'text') {
      //for now added a fixed size of varchar
      return 'varchar(50)';
    } else if (type == 'number') {
      return 'int';
    } else if (type == 'date') {
      return 'date';
    } else if (type == 'boolean') {
      return 'bool';
    }
  }
  const handleAttributeSubmit = (entity, data) => {
    const newData = {
      entity: entity.Tables_in_vahan_db,
      name: data.name,
      type: typeFormater(data.type)
    };
    console.log(newData);
    dispatch(createAttributeAsync(newData));
  }

  const handleAttributeUpdateSubmit = (entity, data) => {
    console.log("attributeUpdateSubmit: ", entity, data)
    const newData = {
      entity: entity.Tables_in_vahan_db,
      oldName: attributes[updateAttributeIndex].COLUMN_NAME,
      newName: data.name,
      type: typeFormater(data.type)
    };
    console.log(newData);
    dispatch(updateAttributeAsync(newData));
  }

  const handleFetchAttribute = (entityName) => {
    console.log("fetchingAttributeDetails: ", entityName);
    dispatch(fetchAttributeAsync(entityName));
    if (entityName == openAttributeDetails) {
      setOpenAttributeDetails('');
    } else {
      setOpenAttributeDetails(entityName);
    }
    setOpenAddAttribute('');
    setOpenInsert('');
  }

  const handleDeleteAttribute = (entity, index) => {
    const newData = {
      "entity": entity.Tables_in_vahan_db,
      "attribute": attributes[index].COLUMN_NAME
    }
    console.log(newData);
    dispatch(deleteAttributeAsync(newData));
  }

  const handleUpdateAttribute = (entity, index) => {
    setUpdateAttributeIndex(index);
    setOpenUpdateAttribute(entity.Tables_in_vahan_db);
  }
   //---------------------->Operations for TableData<--------------------------
  const handleInsertOpen = (entity) => {
    dispatch(fetchAttributeAsync(entity.Tables_in_vahan_db));
    if (entity.Tables_in_vahan_db == openInsert) {
      setOpenInsert('');
    } else {
      setOpenInsert(entity.Tables_in_vahan_db);
    }
    setOpenAddAttribute('');
    setOpenAttributeDetails('');
  }

  const handleInsertSubmit = (entity, data) => {
    console.log("data to be inserted: ", data);
    const newData = {
      entity: entity.Tables_in_vahan_db,
      data: data,
    }
    console.log("newDataInsert: ", newData)
    dispatch(createTableDataAsync(newData));
    reset();
  }
 
  const handleShowData = (entity) => {
    dispatch(fetchAttributeAsync(entity.Tables_in_vahan_db));
    dispatch(fetchTableDataAsync(entity.Tables_in_vahan_db));
    if (entity.Tables_in_vahan_db == openData) {
      setOpenData('');
    } else {
      setOpenData(entity.Tables_in_vahan_db);
    }
    setOpenAddAttribute('');
    setOpenAttributeDetails('');
  }

  const handleUpdateRow = (entity, rind,cind) => {
    console.log("updatetable: ", entity,  tableData[rind][cind]);
    setOpenUpdateTableData(entity.Tables_in_vahan_db);
    setUpdateIndexTableData({"rind": rind,"cind": cind});
  }
  const handleDeleteRow = (entity, data, index) => {
    console.log("deleteRow: ", entity, data, index);
    const newData = {
      "entity": entity.Tables_in_vahan_db,
      "condValue": data.id,
      "index": index
    }
    dispatch(deleteTableDataAsync(newData));
  }

  const handleTableDataUpdateSubmit = (entity, data) => {
    const val= Object.values(data);
    const len= val.length;
    const newData = {
      "entity": entity.Tables_in_vahan_db,
      "attribute": updateIndexTableData.cind,
      "value": val[len-1],
      "condValue": tableData[updateIndexTableData.rind].id,
      "index": updateIndexTableData.rind
    }
    dispatch(updateTableDataAsync(newData));
    reset()
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
          {entities ? entities.map((entity, index) => (
            <li key={index}>
              <div className='entity-title'>
                <h2>
                  {entity.Tables_in_vahan_db}
                </h2>
                <button onClick={() => setOpenUpdateEntity(entity.Tables_in_vahan_db)}>Edit Name</button>
                <button onClick={() => HandleDeleteEntity(entity.Tables_in_vahan_db)}>Delete Entity</button>
                <button onClick={() => handleAddAttribute(entity)}>Add Attribute</button>
                <button onClick={() => handleFetchAttribute(entity.Tables_in_vahan_db)}>Show Attribute</button>
                <button onClick={() => handleInsertOpen(entity)}>Insert data</button>
                <button onClick={() => handleShowData(entity)}>Show Data</button>
              </div>
              {openUpdateEntity == entity.Tables_in_vahan_db &&
                <div>
                  <h2>Update Name</h2>
                  <input
                    type="text"
                    placeholder="Entity Name"
                    value={updateEntityName}
                    onChange={(e) => setUpdateEntityName(e.target.value)}
                  />
                  <button onClick={HandleUpdateEntity}>save</button>
                  <button type="button" className="cancel-button" onClick={handleCancelBox}>
                      Cancel
                    </button>
                </div>
              }

              {openData == entity.Tables_in_vahan_db ?
                <div className="table-container">
                  <h3>Table Data</h3>
                  <table className="attribute-table">
                    <thead>
                      <tr>
                        {attributes.map((label, index) => (
                          <th key={index}>{label.COLUMN_NAME}</th>
                        ))}
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData && tableData.map((data, rind) => (
                        <tr key={rind}>
                          {attributes.map((key, cind) => {
                            return <td key={cind}><div className="cell-content">
                              <span>{data[key.COLUMN_NAME]}</span>
                              <i className="fas fa-edit" onClick={() => handleUpdateRow(entity, rind,key.COLUMN_NAME)}></i>
                            </div></td>
                          })}
                          <td>
                            {/* <button className="save-button" onClick={() => handleUpdateRow(entity, data)}>Update</button> */}
                            <button className="cancel-button" onClick={() => handleDeleteRow(entity, data, rind)}>Delete</button>
                          </td>
                        </tr>
                      ))}

                    </tbody>

                  </table>

                </div> : ''
              }

              {openInsert == entity.Tables_in_vahan_db &&
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
                        {/* {console.log("attributeIndexCheck: ", attributes)} */}
                        {attributes.map((attribute, index) => (
                          <tr key={index}>
                            <td>{attribute.COLUMN_NAME}</td>
                            <td>
                              <input
                                className="attribute-input"
                                placeholder={attribute.COLUMN_NAME}
                                type={attribute.DATA_TYPE}
                                {...register(`${attribute.COLUMN_NAME}`, { required: 'Please enter value' })}

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
                </div>
              }

              {openUpdateTableData == entity.Tables_in_vahan_db &&
                <div className="table-container">
                  <h3>Update TableData</h3>
                  <form noValidate onSubmit={
                    handleSubmit((data) => handleTableDataUpdateSubmit(entity, data))
                    } method="POST">
                    <table className="attribute-table">
                      <thead>
                        <tr>
                          <th>{updateIndexTableData["cind"]}</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {console.log("indexData: ",updateIndexTableData, tableData[updateIndexTableData])}
                          
                            <td>
                              <input
                                type="text"
                                // placeholder={label.COLUMN_NAME}
                                {...register(`${updateIndexTableData["cind"]}`)}
                              defaultValue={updateIndexTableData !== -1 ? tableData[updateIndexTableData.rind][updateIndexTableData.cind] : ''}
                              />
                            </td>
                          <td >
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
              {openAttributeDetails == entity.Tables_in_vahan_db ?
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
                      {attributes.map((attribute, index) => (
                        <tr key={index}>
                          <td>{attribute.COLUMN_NAME}</td>
                          <td>{attribute.DATA_TYPE}</td>
                          <td>
                            <button className="save-button" onClick={() => handleUpdateAttribute(entity, index)}>Update</button>
                            <button className="cancel-button" onClick={() => handleDeleteAttribute(entity, index)}>Delete</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> : ''
              }
              {/* {console.log("hello: ", openAddAttribute, entity.Tables_in_vahan_db)} */}

              {openAddAttribute == entity.Tables_in_vahan_db &&
                <div className="table-container">
                  <h3>Add attribute</h3>
                  <form noValidate onSubmit={handleSubmit((data) => handleAttributeSubmit(entity, data))} method="POST">
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
                              defaultValue={updateAttributeIndex !== -1 ? attributes[updateAttributeIndex].COLUMN_NAME : ''}
                            />
                          </td>
                          <td>
                            <select
                              name="type"
                              {...register("type")}
                              defaultValue={updateAttributeIndex !== -1 ? attributes[updateAttributeIndex].DATA_TYPE : ''}
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="date">Date</option>
                              <option value="boolean">Boolean</option>
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
              {openUpdateAttribute == entity.Tables_in_vahan_db &&
                <div className="table-container">
                  <h3>Update attribute</h3>
                  <form noValidate onSubmit={handleSubmit((data) => handleAttributeUpdateSubmit(entity, data))} method="POST">
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
                              defaultValue={updateAttributeIndex !== -1 ? attributes[updateAttributeIndex].COLUMN_NAME : ''}
                            />
                          </td>
                          <td>
                            <select
                              name="type"
                              {...register("type")}
                              defaultValue={updateAttributeIndex !== -1 ? attributes[updateAttributeIndex].DATA_TYPE : ''}
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="date">Date</option>
                              <option value="boolean">Boolean</option>
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
          )) : ''}
        </ul>
      </div>
    </div >
  );
}

export default Content;
