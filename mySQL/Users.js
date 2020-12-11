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

// const idEmpty = async ()=>{
//   const Users = await users();
//   console.log( Users);
//   let b = false;
//   for (let i = 1; i < Users.length+1; i++) {
//     console.log("1");
//     b = false
//     for (let j = 0; j < Users.length; j++) {
//       console.log(b,i,Users[j].User_Id);
//       if(Users[j].User_Id==i){
//         b=true;
//         break;
//       }
//     }
//     if(!b) return i;
//   }
//   return 1;
// }

const users = async()=>{
  try {
    const result = await conection.execute(`SELECT 'UserId', 'Email', 'UserName', 'UserSurname', 'Level', 'ImageId', 'Mobile' FROM smarthome_user`)
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
module.exports.lookForUserByName = async(name)=>{
  try {
    const result = await conection.execute(`SELECT * FROM \`smarthome_user\` WHERE \`UserName\` = '${name}'`);
    return result[0][0];
  } catch (e) {
    console.log("Error",e);
    return;
  }
}
module.exports.lookForUserById = async(id)=>{
  try {
    const result = await conection.execute(`SELECT \`UserId\`, \`Email\`,\`UserName\`, \`UserSurname\`, \`Mobile\`, \`Level\`, \`ImageId\` FROM \`smarthome_user\` WHERE \`UserId\` = '${id}'`);
    return result[0][0];
  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.lookForConfigUserById = async(id)=>{
  try {
    const result = await conection.execute(`SELECT \`Style\` FROM \`smarthome_user\` WHERE \`UserId\` = '${id}'`);
    return result[0][0];
  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.addUser = async function(data){
  try {
    if(!data.name||!data.password) return;
    await conection.execute(
      "INSERT INTO `smarthome_user`(`Email`, `Password`, `UserName`, `UserSurname`, `Mobile`, `Level`) VALUES (?,?,?,?,?,?)",
      [data.email, data.password, data.name,data.surname, data.mobile,data.level]
    )
    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}

module.exports.updata = async function (data) {
  try {
    if(!data.name) return;
    await conection.execute("UPDATE `smarthome_user` SET `Email`=?,`UserName`=?,`UserSurname`=?,`Mobile`=?,`ImageId`=? WHERE `UserId`=?",
    [data.email, data.name, data.surname, data.mobile, data.imageId,data.id]
    )
    return true;
  } catch (e) {
    console.log("Error",e);
    return
  }
}
module.exports.updataStyle = async function (data) {
  try {
    if(!data.id) return;
    await conection.execute("UPDATE `smarthome_user` SET `Style`=? WHERE `UserId`=?",
    [data.style,data.id]
    )
    return true;
  } catch (e) {
    console.log("Error",e);
    return
  }
}
module.exports.style = async function (data) {
  try {
    if(!data.id) return;
    const res =  await conection.execute("SELECT `Style` FROM `smarthome_user` WHERE `UserId`=?",
    [data.id]
    )
    return res[0];
  } catch (e) {
    console.log("Error",e);
    return
  }
}
