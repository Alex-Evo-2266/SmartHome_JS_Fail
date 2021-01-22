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
    await user.connect();
    const content = require('../serverConfig/config.json');
    res.status(201).json({
      user:await user.lookForConfigUserById(req.user.userId),
      server:content
    })
    await user.desconnect();
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    await user.desconnect();
    return res.status(500).json({message: e.message})
  }
})

router.post('/config/edit',
  auth,
  async (req, res)=>{
  try {
    const filePath = path.join(__dirname,'../serverConfig/config.json')
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

router.get('/usersConfig',auth,async (req, res)=>{
  try {
    const content = require('../serverConfig/usersConf.json');
    res.status(201).json(content)
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    return res.status(500).json({message: e.message})
  }
})

router.post('/usersConfig/edit',
  auth,
  async (req, res)=>{
  try {
    const filePath = path.join(__dirname,'../serverConfig/usersConf.json')
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
