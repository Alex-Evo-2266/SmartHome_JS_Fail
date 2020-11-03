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
    const filePath = path.join(__dirname,"../img/baseImg",`fon-${type}.jpg`)
    console.log(filePath);
    var readableStream = fs.createReadStream(filePath);
    readableStream.on('open', function () {
      res.set('Content-Type', 'image/jpeg');
      readableStream.pipe(res);
    });
    readableStream.on('error', function () {
      throw new Error('Ошибка');
    });
  } catch (e) {
    console.log("Error register",e);
    return res.status(404).json({message: e.message})
  }
})


module.exports = router;
