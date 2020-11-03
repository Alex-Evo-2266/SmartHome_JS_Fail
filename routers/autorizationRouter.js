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
    check('name', "некоректное имя пользователя ").isLength({min:2}),
    check('password', "некоректное имя пользователя ").isLength({min:6})
  ]
   ,async (req, res)=> {
    try {

//---------------------validation--------------------//
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        res.status(400).json({
          errors: errors.array(),
          message: 'некоректные данные при входе в систему'
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
    if(isMatch){
      return true;
    }

    const token = jwt.sign(
      { userId: user.UserId, userLavel: user.Level},
      config.get('secret'),
      { expiresIn: '1day' }
    )
    userbd.desconnect();
    return res.status(200).json({token, userId: await userList.id(req, res), userLavel:await userList.lavel(req, res)})
    } catch (e) {
      console.log("Error authorization",e);
      userbd.desconnect();
      return res.status(500).json({message: e.message})
    }
  })

//------register-------//

  router.post('/register',
  [
    check('email', 'некоректный email').isEmail(),
    check('name', "некоректное имя пользователя ").isLength({min:2}),
    check('password', "некоректное имя пользователя ").isLength({min:6}),
    //check('key', "некоректное имя пользователя ").isLength({min:1})
  ],
  async (req, res)=> {
    try {

      //---------------------validation--------------------//
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return res.status(400).json({
                errors: errors.array(),
                message: 'некоректные данные'
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
