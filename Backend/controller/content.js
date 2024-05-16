const mySqlPool = require("../config/db");



const createEntity = async (req,res) => {
    try{
        const entityName= req.body.entity;
        const data= await mySqlPool.query(`CREATE TABLE ${entityName}(id INT)`);
        if(!data){
            return res.status(404).send({
            success: false,
            message: 'unbale to create entity'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Entity created',
            data: data[0],
            length: data[0].length
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in CreateStudent API',
            error
        })
    }
}
const updateEntity = async (req,res) => {
    try{
        const {oldName, newName}= req.body;
        const data= await mySqlPool.query(`RENAME TABLE ${oldName} TO ${newName}`);
        if(!data){
            return res.status(404).send({
            success: false,
            message: 'unbale to create entity'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Entity created',
            data: data[0],
            length: data[0].length
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in CreateStudent API',
            error
        })
    }
}



const getAllEntity = async (req,res) => {
    try{
        const data= await mySqlPool.query('SHOW TABLES;');
        if(!data){
            return res.status(404).send({
            success: false,
            message: 'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Entity names fetched',
            data: data[0],
            length: data[0].length
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Student API',
            error
        })
    }
}

const addAttribute = async (req,res) => {
    try{
        console.log("body: ",req.body);
        const {entity,name,type}= req.body;
        console.log
        const data= await mySqlPool.query(`ALTER TABLE ${entity} ADD COLUMN ${name} ${type}`);
        if(!data){
            return res.status(404).send({
            success: false,
            message: 'unbale to create entity'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Entity created',
            data: data[0],
            length: data[0].length
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in CreateStudent API',
            error
        })
    }
}

const getAllAttribute = async (req,res) => {
    try{
        const entity= req.body.entity;
        const data= await mySqlPool.query(`SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${entity}';`);
        if(!data){
            return res.status(404).send({
            success: false,
            message: 'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Attribute names fetched',
            data: data[0],
            length: data[0].length
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get All Attribute API',
            error
        })
    }
}

const updateAttributeName = async (req,res) => {
    try{
        const {entity, oldName, newName,type}= req.body;
        const data= await mySqlPool.query(`ALTER TABLE ${entity} change ${oldName} ${newName} ${type}`);
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'unbale to create entity'
            })
        }
        res.status(200).send({
            success:true,
            message: 'Entity created',
            data: data[0],
            length: data[0].length
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in CreateStudent API',
            error
        })
    }
}
module.exports ={createEntity,getAllEntity,updateEntity, addAttribute, getAllAttribute,updateAttributeName};