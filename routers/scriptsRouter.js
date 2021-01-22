const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const scripts = require('../mySQL/Scripts');
const mqtt = require('../mqtt/mqtt');
const runScript = require('../scriptsImplementation/runScript')
const deleteScriptFromHomePage = require('../sort/deleteScriptFromHomePage')


router.post('/add',
  [
    check('name', "wrong name device").isLength({min:2})
  ],
  auth,
  async (req, res)=> {
   try {
     //---------------------validation--------------------//
           const errors = validationResult(req);
           if(!errors.isEmpty()){
             return res.status(400).json({
               errors: errors.array(),
               message: 'wrong input data'
             })
           }
     //---------------------------------------------------//
     const data = req.body;
     console.log(req.body);
     await scripts.connect();
     const condidate = await scripts.lookForScriptByName(data.name)
     if(condidate.length !== 0){
       throw new Error("script with the same name already exists.")
     }
     await scripts.addScript({
       name:data.name,
       trigger:data.trigger,
       if:data.if,
       then:data.then,
       else:data.else
     })
     await scripts.desconnect();
     mqtt.desconnect()
     mqtt.connect()
     return res.status(201).json({message: "ok"})
   }
   catch(e){
     console.log("Error AddScript",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.post('/set/status',
   [
     check('ScriptId', "wrong id script").isLength({min:1})
   ],
   auth,
   async (req, res)=> {
    try {
      //---------------------validation--------------------//
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return res.status(400).json({
                errors: errors.array(),
                message: 'wrong input data'
              })
            }
      //---------------------------------------------------//
      const data = req.body;
      console.log(req.body);
      await scripts.connect();
      await scripts.setStatus(data.ScriptId,data.ScriptStatus)
      await scripts.desconnect();
      return res.status(201).json({message: "ok"})
    }
    catch(e){
      console.log("Error AddScript",e);
      return res.status(500).json({message: e.message})
    }
  })

 router.get('/all',auth,async (req, res)=>{
   try {
     await scripts.connect();
     res.status(201).json(await scripts.Scripts())
     await scripts.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.get('/get/:id',auth,async (req, res)=>{
   try {
     await scripts.connect();
     res.status(201).json(await scripts.Script(req.params.id))
     await scripts.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.post('/delete',auth,async (req, res)=>{
   try {
     const {ScriptId} = req.body
     await scripts.connect();
     res.status(201).json(await scripts.deleteScript(ScriptId))
     await scripts.desconnect();
     deleteScriptFromHomePage(ScriptId)
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

 router.get('/run/:id',auth,async (req, res)=>{
   try {
     await scripts.connect();
     res.status(201).json({result:await runScript(await scripts.Script(req.params.id))})
     await scripts.desconnect();
     return
   } catch (e) {
     console.log("Error AddDevices",e);
     return res.status(500).json({message: e.message})
   }
 })

module.exports = router;
