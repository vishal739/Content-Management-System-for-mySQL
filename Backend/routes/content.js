const express = require("express");
const { getAllEntity, getAllAttribute, createEntity, addAttribute, updateEntity, updateAttributeName } = require("../controller/content");
const router= express.Router();

router.post("/entity",createEntity);
router.get("/entity",getAllEntity);
router.put("/entity",updateEntity);
router.post("/entity/attribute",addAttribute);
router.get("/entity/attribute",getAllAttribute);
router.put("/entity/attribute",updateAttributeName);


module.exports= router;