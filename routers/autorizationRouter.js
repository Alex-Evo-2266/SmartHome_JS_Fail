const { Router } = require('express');
const express = require('express');
const router = Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const userbd = require('../mySQL/Users.js')
const auth = require('../middleware/auth.middleware')

//-----authorization----//

  router.post('/login',
  [
    check('name', "wrong name user ").isLength({min:2}),
    check('password', "wrong password ").isLength({min:6})
  ]
   ,async (req, res)=> {
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
const {name, password} = req.body;
    userbd.connect();
    const user = await userbd.lookForUserByName(name);
    if(!user){
      throw new Error('Пользователь с таким именем не найден');
    }
    const isMatch = await bcrypt.compare(password, user.Password)
    if(!isMatch){
      throw new Error('Не верные входные данные');
    }

    const token = jwt.sign(
      { userId: user.UserId, userLevel: user.Level},
      config.get('secret'),
      { expiresIn: '1day' }
    )
    userbd.desconnect();
    return res.status(200).json({token, userId: user.UserId, userLavel:user.Level})
    } catch (e) {
      console.log("Error authorization",e);
      userbd.desconnect();
      return res.status(500).json({message: e.message})
    }
  })

//------register-------//

  router.post('/register',
  [
    check('email', 'wrong email').isEmail(),
    check('name', "wrong name user ").isLength({min:2}),
    check('password', "wrong password ").isLength({min:6}),
    //check('key', "некоректное имя пользователя ").isLength({min:1})
  ],
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

      const {email, password,name,surname,mobile} = req.body;

      const heshedPassword = await bcrypt.hash(req.body.password, 12)
      userbd.connect();
      if(userbd.lookForUserByName(name)){
        throw new Error('Пользователь с таким Email уже создан');
      }
      if(!userbd.addUser({
        email,
        password: heshedPassword,
        name,
        surname,
        mobile
      })){
        throw new Error('Пользователь с таким Email уже создан');
      }
      userbd.desconnect();
      return res.status(201).json({message: "Новый пользователь создан"})
    }
    catch (e) {
      console.log("Error register",e);
      userbd.desconnect();
      return res.status(500).json({message: e.message})
    }
  })
module.exports = router;
