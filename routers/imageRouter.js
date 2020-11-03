const { Router } = require('express');
const express = require('express');
const router = Router();
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const fs = require('fs');
const path = require('path');

router.get('/fonImage/:type', async (req, res)=> {
  try {
    const type = req.params.type;
    const filePath = path.join(__dirname,"img",`fon-${type}.jpg`)
    switch (type) {
      case "sunrise":
        var s = fs.createReadStream(file);
        break;
      default:
      throw new Error('неверный тип');
    }
  } catch (e) {
    console.log("Error register",e);
    userbd.desconnect();
    return res.status(404).json({message: e.message})
  }

}


module.exports = router;
