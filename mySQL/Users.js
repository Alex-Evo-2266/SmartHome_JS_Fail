const mysql = require('mysql2')
const config = require('config');


let conection;
module.exports.connect = ()=>{
  conection = mysql.createPool(config.get('sqlConfDef')).promise();
}
module.exports.desconnect = async function(){
  await conection.end((err)=>{
    console.log('errr',err.message);
  })
}

const idEmpty = ()=>{
  const Users = users();
  let b = false;
  for (var i = 1; i < Users.length+1; i++) {
    b = false
    for (var j = 0; j < Users.length; j++) {
      if(Users[j].User_Id==i){
        b=true;
        break;
      }
    }
    if(!b) return i;
  }
}

const users = async()=>{
  try {
    const result = await conection.execute(`SELECT 'UserId', 'Email', 'UserName', 'UserSurname', 'Level', 'ImageId', 'Mobile' FROM 'smarthome_user'`)
    return result[0];
  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.lookForUserByEmail = async(email)=>{
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_user WHERE Email=${email}`);
    return result[0][0];
  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.addUser = async function(data){
  try {
    if(!data.email||!data.password) return;
    await conection.execute(`INSERT INTO user(UserId = ${idEmpty()}, Email = ${data.emali}, UserName = ${data.name},UserSurname = ${data.surname}, Password = ${data.password}, Mobile = ${data.mobile})`)
    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}
