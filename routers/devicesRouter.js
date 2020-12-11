const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const devices = require('../mySQL/Devices');

router.post('/add',
  [
    check('name', "wrong name device").isLength({min:2}),
    check('typeConnect', "wrong type connect").isLength({min:3}),
    check('typeDevice', "error input data").isLength({min:3})
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
     console.log(req.body);
     const {name, typeConnect, typeDevice, config} = req.body;

     await devices.connect();
     const condidate = await devices.lookForDeviceByName(name)
     if(condidate.length !== 0){
       throw new Error("device with the same name already exists.")
     }
     await devices.addDevice({
       name,
       typeDevice,
       typeConnect,
       config
     })
     await devices.desconnect();
     return res.status(201).json({message: "ok"})
   }
   catch(e){
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })
 router.get('/all',auth,async (req, res)=>{
   try {
     console.log('ergfb');
     await devices.connect();
     res.status(201).json(await devices.Devices())
     await devices.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.get('/get/:id',auth,async (req, res)=>{
   try {
     console.log(req.params.id);
     await devices.connect();
     res.status(201).json(await devices.Device(req.params.id))
     await devices.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.post('/edit',auth,async (req, res)=>{
   try {
     await devices.connect();
     const condidate = await devices.lookForDeviceByName(req.body.DeviceName)
     if(condidate.length !== 0){
       throw new Error("device with the same name already exists.")
     }
     res.status(201).json(await devices.updataDevice({
       id:req.body.DeviceId,
       name:req.body.DeviceName,
       info:req.body.DeviceInformation,
       idRoom:req.body.RoomId,
       typeConnect:req.body.DeviceTypeConnect,
       typeDevice:req.body.DeviceType,
       config:req.body.DeviceConfig
     }))
     await devices.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.post('/delete',auth,async (req, res)=>{
   try {
     const {DeviceId} = req.body
     await devices.connect();
     res.status(201).json(await devices.deleteDevice(DeviceId))
     await devices.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

module.exports = router;
