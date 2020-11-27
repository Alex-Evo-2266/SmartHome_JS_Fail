const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware')
const {check, validationResult} = require('express-validator')
const user = require('../mySQL/Users');

router.get('/',auth,async (req, res)=>{
  try {
    await user.connect();
    res.status(201).json(await user.lookForUserById(req.user.userId))
    await user.desconnect();
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    await user.desconnect();
    return res.status(500).json({message: e.message})
  }
})
router.post('/edit',
  [
    check('UserName', "wrong name user ").isLength({min:2}),
    check('Email', "wrong email ").isEmail()
  ],
  auth,
  async (req, res)=>{
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
    const {UserName,UserSurname,Mobile,Email} = req.body.newuser;
    await user.connect();
    await user.updata({
      name: UserName,
      surname: UserSurname,
      mobile: Mobile,
      email: Email,
      imageId:0,
      id: req.user.userId
    })
    res.status(201).json(await user.lookForUserById(req.user.userId))
    await user.desconnect();
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    await user.desconnect();
    return res.status(500).json({message: e.message})
  }
})

router.post('/config/style/edit',
  [
    check('style', "wrong style ").isLength({min:2}),
  ],
  auth,
  async (req, res)=>{
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
    const {style} = req.body;
    await user.connect();
    await user.updataStyle({
      style: style,
      id: req.user.userId
    })
    res.status(201).json(await user.style({id:req.user.userId}))
    await user.desconnect();
    return
  } catch (e) {
    console.log("Error AddDevices",e);
    await user.desconnect();
    return res.status(500).json({message: e.message})
  }
})

module.exports = router;
