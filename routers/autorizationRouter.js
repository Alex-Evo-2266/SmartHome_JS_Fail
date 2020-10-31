const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
//const auth = require('../middleware/auth.middleware')

//-----authorization----//

  router.post('/',
  [
    check('userName', "некоректное имя пользователя ").isLength({min:2}),
    check('password', "некоректное имя пользователя ").isLength({min:6})
  ]
   ,async (req, res)=> {
    try {

//---------------------validation--------------------//
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        res.status(400).json({
          errors: errors.array(),
          message: 'некоректные данные'
        })
      }
//---------------------------------------------------//

    } catch (e) {
      console.log("Error authorization",e);
      return res.status(400).json({message: e.message})
    }
  })

//------register-------//

  router.post('/register',
  [
    check('email', 'некоректный email').isEmail(),
    check('userName', "некоректное имя пользователя ").isLength({min:2}),
    check('password', "некоректное имя пользователя ").isLength({min:6}),
    check('key', "некоректное имя пользователя ").isLength({min:1})
  ]
  ,async (req, res)=> {
    try {

      //---------------------validation--------------------//
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              res.status(400).json({
                errors: errors.array(),
                message: 'некоректные данные'
              })
            }
      //---------------------------------------------------//

    }
    catch (e) {
      console.log("Error register",e);
      userList.disconnect();
      return res.status(400).json({message: e})
    }
  })

  //---work with users----//

  router.get('/UserData',auth, async function(req, res){
    try {

    } catch (e) {
      console.log("Error UserData",e);
      userList.disconnect();
      return res.status(400).json({message: e})
    }
  })

module.exports = router;
