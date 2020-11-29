const { Router } = require('express');
const express = require('express');
const router = Router();
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const fs = require('fs');
const path = require('path');
const fon = require('../multerConfig/fon.js')

router.get('/fonImage/:time', async (req, res)=> {
  try {
    if(req.params.time != "day"&&req.params.time != "night"&&req.params.time != "sunrise"&&req.params.time != "twilight"){
      req.params.time = "base";
    }
    const time = req.params.time;

    let filePath = path.join(__dirname,"../img/backGroundFon/base/",`fon-${time}.jpg`)
    console.log(filePath);
    if(!fs.existsSync(filePath)){
      filePath = path.join(__dirname,"../img/backGroundFon/",`base/`,`fon-base.jpg`)
      if(!fs.existsSync(filePath)){
        throw new Error('Ошибка файл не найден');
      }
    }
    var readableStream = fs.createReadStream(filePath);
    readableStream.on('open', function () {
      res.set('Content-Type', 'image/jpeg');
      readableStream.pipe(res);
    });
    readableStream.on('error', function () {
      throw new Error('Ошибка');
    });
  } catch (e) {
    console.log("Error register",e.message);
    return res.status(404).json({message: e.message})
  }
})

router.post('/fonImage/set/base',fon("fon-base"),async (req,res)=>{
  console.log(req.file);
  return res.status(202).json(req.file)
})
router.post('/fonImage/set/day',fon("fon-day"),async (req,res)=>{
  console.log(req.file);
  return res.status(202).json(req.file)
})
router.post('/fonImage/set/night',fon("fon-night"),async (req,res)=>{
  console.log(req.file);
  return res.status(202).json(req.file)
})
router.post('/fonImage/set/sunrise',fon("fon-sunrise"),async (req,res)=>{
  console.log(req.file);
  return res.status(202).json(req.file)
})
router.post('/fonImage/set/twilight',fon("fon-twilight"),async (req,res)=>{
  console.log(req.file);
  return res.status(202).json(req.file)
})

module.exports = router;
