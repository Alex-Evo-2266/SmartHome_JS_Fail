const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const user = require('../mySQL/Users');
const fs = require('fs');
const path = require('path');

router.get('/config',auth,async (req, res)=>{
  try {
    const page = require('../serverConfig/homePage.json');
    res.status(201).json({
      homePage:page
    })
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    return res.status(500).json({message: e.message})
  }
})

router.post('/config/edit',
  auth,
  async (req, res)=>{
  try {
    const filePath = path.join(__dirname,'../serverConfig/homePage.json')
    let data = JSON.stringify(req.body);
    fs.writeFileSync(filePath, data);
    res.status(201).json({message:"ok"})
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    await user.desconnect();
    return res.status(500).json({message: e.message})
  }
})

module.exports = router;
