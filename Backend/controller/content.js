const mySqlPool = require("../config/db");

const createEntity = async (req, res) => {
    try {
        const entityName = req.body.entity;
        const data = await mySqlPool.query(`CREATE TABLE ${entityName}(id INT)`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'unable to create entity'
            })
        }
        res.status(200).send({
            data: entityName,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in CreateStudent API',
            error
        })
    }
}
const updateEntity = async (req, res) => {
    try {
        const { oldName, newName } = req.body;
        const data = await mySqlPool.query(`RENAME TABLE ${oldName} TO ${newName}`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'update failed'
            })
        }
        res.status(200).send({
           oldName: oldName,
           newName: newName
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updateStudent API',
            error
        })
    }
}



const getAllEntity = async (req, res) => {
    try {
        const data = await mySqlPool.query('SHOW TABLES;');
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            data: data[0],
            length: data[0].length
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Entity API',
            error
        })
    }
}
const deleteEntity = async (req, res) => {
    try {
        const entity = req.body.entity;
        const data = await mySqlPool.query(`DROP TABLE ${entity};`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Deletion failed'
            })
        }
        res.status(200).send({
            data: entity
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in DeleteEntity API',
            error
        })
    }
}

const addAttribute = async (req, res) => {
    try {
        console.log("body: ", req.body);
        const { entity, name, type } = req.body;
        console.log
        const data = await mySqlPool.query(`ALTER TABLE ${entity} ADD COLUMN ${name} ${type}`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'unable to add attribute'
            })
        }
        const newData = {
            "COLUMN_NAME": name,
            "DATA_TYPE": type
        }
        res.status(200).send({
            success: true,
            message: 'attribute created',
            data: newData,
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in addAttribute API',
            error
        })
    }
}

const getAllAttribute = async (req, res) => {
    try {
        const entity = req.params.name;
        console.log("entity name: ",entity);
        const data = await mySqlPool.query(`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${entity}';`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        console.log("backend attributeFetchCheck: ",data[0]);
        res.status(200).send({
            success: true,
            message: 'Attribute names fetched',
            data: data[0],
            length: data[0].length
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Attribute API',
            error
        })
    }
}

const updateAttributeName = async (req, res) => {
    try {
        const { entity, oldName, newName, type } = req.body;
        const data = await mySqlPool.query(`ALTER TABLE ${entity} change ${oldName} ${newName} ${type}`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'unbale to update attribute'
            })
        }
        const newData = {
            "oldName": oldName,
            "COLUMN_NAME": newName,
            "DATA_TYPE": type
        }
        res.status(200).send({
            success: true,
            message: 'Attribute updated',
            data: newData
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updateStudent API',
            error
        })
    }
}

const deleteAttribute = async (req, res) => {
    try {
        const {entity,attribute} = req.body;
        const data = await mySqlPool.query(`ALTER TABLE ${entity} DROP COLUMN ${attribute};`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Attribute Delete failed'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Attribute Deleted Succesfully',
            data: data[0],
            length: data[0].length
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteAttribute API',
            error
        })
    }
}

const insertTableData = async (req, res) => {
    try {
        const entity= req.body.entity;
        const values= req.body.data;

        const columns= Object.keys(values);
        const rows= Object.values(values);
        
        let columnsString = columns.join(", ");
        let valuesString = rows.map(val => `'${val}'`).join(", ");
        let sql = `INSERT INTO ${entity} (${columnsString}) VALUES (${valuesString});`
        console.log(sql);
        const data = await mySqlPool.query(sql);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'unable to add attribute'
            })
        }
        res.status(200).send({
            success: true,
            message: 'attribute created',
            data: values
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in insertTable API',
            error
        })
    }
}

const getTableData = async (req, res) => {
    try {
        const entity = req.params.name;
        const data = await mySqlPool.query(`SELECT * from ${entity};`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'No Records found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'tableData fetched',
            data: data[0],
            length: data[0].length
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Attribute API',
            error
        })
    }
}

const updateTableData = async (req, res) => {
    try {
        const { entity, attribute, value,condValue } = req.body;
        const data = await mySqlPool.query(`UPDATE ${entity} SET ${attribute}='${value}' where id='${condValue}';`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'unbale to update attribute'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Attribute updated',
            data: {
                "index": req.body.index,
                "attribute": attribute,
                "value": value
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updateStudent API',
            error
        })
    }
}

const deleteTableData = async (req, res) => {
    try {
        const {entity,condValue} = req.body;
        const data = await mySqlPool.query(`DELETE FROM ${entity} where id='${condValue}';`);
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Attribute Delete failed'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Attribute Deleted Succesfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleteAttribute API',
            error
        })
    }
}
module.exports = { createEntity, getAllEntity, updateEntity, addAttribute, getAllAttribute, updateAttributeName, deleteEntity,deleteAttribute,getTableData, insertTableData,updateTableData, deleteTableData };