const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const user = require('../mySQL/Users');

router.get('/all',auth,async (req, res)=>{
  try {
    await user.connect();
    // console.log(await user.users());
    res.status(201).json(await user.users())
    await user.desconnect();
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    // await user.desconnect();
    return res.status(500).json({message: e.message})
  }
})

module.exports = router;
