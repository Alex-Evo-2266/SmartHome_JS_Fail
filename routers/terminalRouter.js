const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const devices = require('../mySQL/Devices');

router.post('/message/send',
  [
    check('message', "wrong message ").isLength({min:1}),
    check('type', "wrong type ").isLength({min:1}),
  ],
  auth,
  async (req, res)=>{
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
    console.log(req.body);
    res.status(200).json({message: "ok"})
  }catch(e){
      console.log("Error AddDevices",e);
      return res.status(500).json({message: e.message})
    }
})

module.exports = router;
