const { Router } = require('express');
const express = require('express');
const router = Router();
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const fs = require('fs');
const path = require('path');
var multer = require ('multer')

router.get('/fonImage/:weather/:season/:time', async (req, res)=> {
  try {
    if(req.params.weather != "goodWeather"&&req.params.weather != "mainlyCloudy"&&req.params.weather != "precipitation"&&req.params.weather != "base"){
      req.params.weather = "base";
    }
    if(req.params.season != "fall"&&req.params.season != "spring"&&req.params.season != "summer"&&req.params.season != "winter"){
      req.params.season = "base";
    }
    if(req.params.time != "day"&&req.params.time != "night"&&req.params.time != "sunrise"&&req.params.time != "twilight"){
      req.params.time = "base";
    }
    const weather = req.params.weather;
    const season = req.params.season;
    const time = req.params.time;

    let filePath = path.join(__dirname,"../img/backGroundFon/",`${weather}/`,`${season}/`,`fon-${time}.jpg`)
    console.log(filePath);
    if(!fs.existsSync(filePath)){
      filePath = path.join(__dirname,"../img/backGroundFon/",`base/`,`fon-day.jpg`)
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
    console.log("Error register",e);
    return res.status(404).json({message: e.message})
  }
})

router.post('/fonImage/set',async (req,res)=>{
    return res.status(202).json(req.body.photo)
})

module.exports = router;
