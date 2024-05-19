const express = require("express");
const { getAllEntity, getAllAttribute, createEntity, addAttribute, updateEntity, updateAttributeName, deleteAttribute, deleteEntity, getTableData, insertTableData, updateTableData, deleteTableData } = require("../controller/content");

const router= express.Router();

router.post("/entity",createEntity);
router.get("/entity",getAllEntity);
router.put("/entity",updateEntity);
router.delete("/entity",deleteEntity);
router.post("/entity/attribute",addAttribute);
router.get("/entity/attribute/:name",getAllAttribute);
router.put("/entity/attribute",updateAttributeName);
router.delete("/entity/attribute",deleteAttribute);
router.get("/entity/attribute/data/:name",getTableData);
router.post("/entity/attribute/data",insertTableData);
router.put("/entity/attribute/data",updateTableData);
router.delete("/entity/attribute/data",deleteTableData);

module.exports= router;