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

const idEmpty = (elements)=>{
  let b = false;
  for (let i = 1; i <= elements.length+1; i++) {
    b = false

    for (let j = 0; j < elements.length; j++) {
      if(elements[j].UserId==i){
        b=true;
        break;
      }
    }
    if(!b) return i;
  }
  return 1;
}

const users = async()=>{
  try {
    const result = await conection.execute("SELECT `UserId`, `Email`, `UserName`, `UserSurname`, `Mobile`, `Level`, `ImageId`, `Style` FROM `smarthome_user`")
    return result[0];

  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.users = users;

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
    console.log("3");
    const result = await conection.execute(`SELECT * FROM \`smarthome_user\` WHERE \`UserName\` = '${name}'`);
    console.log("4",result[0][0]);
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
    if(!data.surname)data.surname=""
    if(!data.level)data.level="1"
    let id = idEmpty(await users())
    console.log(id,data);
    await conection.execute(
      "INSERT INTO `smarthome_user`(`UserId`,`Email`, `Password`, `UserName`, `UserSurname`, `Mobile`, `Level`) VALUES (?,?,?,?,?,?,?)",
      [id,data.email, data.password, data.name,data.surname, data.mobile,data.level]
    )
    console.log("9");
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
