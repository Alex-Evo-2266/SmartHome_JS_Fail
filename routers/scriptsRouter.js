const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const scripts = require('../mySQL/Scripts');

router.post('/add',
  [
    check('name', "wrong name device").isLength({min:2}),
    check('script', "wrong no Script").isLength({min:3})
  ],
  auth,
  async (req, res)=> {
   try {
     //---------------------validation--------------------//
           const errors = validationResult(req);
           if(!errors.isEmpty()){
             res.status(400).json({
               errors: errors.array(),
               message: 'wrong input data'
             })
           }
     //---------------------------------------------------//
     const {name, typeConnect, typeDevice,systemName, config} = req.body;
     console.log(req.body);
     await devices.connect();
     const condidate = await devices.lookForDeviceByName(name)
     if(condidate.length !== 0){
       throw new Error("device with the same name already exists.")
     }
     const condidate2 = await devices.lookForDeviceBySystemName(req.body.DeviceSystemName)
     if(condidate2&&condidate2[0]&&condidate2[0].DeviceId!==req.body.DeviceId){
       throw new Error("device with the same system name already exists.")
     }
     await devices.addDevice({
       name,
       systemName,
       typeDevice,
       typeConnect,
       config
     })
     await devices.desconnect();
     mqtt.desconnect()
     mqtt.connect()
     return res.status(201).json({message: "ok"})
   }
   catch(e){
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

module.exports = router;
