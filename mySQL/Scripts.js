const mysql = require('mysql2')
const config = require('config');

let conection;
module.exports.connect = ()=>{
  conection = mysql.createPool(config.get('sqlConfDef')).promise();
}
module.exports.desconnect = async function(){
  await conection.end((err)=>{
    console.log('errr2',err.message);
  })
}

const idEmpty = (elements)=>{
  let b = false;
  for (let i = 1; i <= elements.length+1; i++) {
    b = false

    for (let j = 0; j < elements.length; j++) {
      if(elements[j].ScriptId==i){
        b=true;
        break;
      }
    }
    if(!b) return i;
  }
  return 1;
}

const scripts = async()=>{
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_scripts`)
    if(result&&result[0]){
      for (var item of result[0]) {
        item.ScriptIf = JSON.parse(item.ScriptIf)
        item.ScriptThen = JSON.parse(item.ScriptThen)
        item.ScriptElse = JSON.parse(item.ScriptElse)
      }
    }
    return result[0];

  } catch (e) {
    console.log("Error",e);
    return;
  }
}
module.exports.Scripts = scripts;

const script = async(id)=>{
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_scripts WHERE ScriptId = ${id}`)
    if(result&&result[0][0]){
      result[0][0].ScriptIf = JSON.parse(result[0][0].ScriptIf)
      result[0][0].ScriptThen = JSON.parse(result[0][0].ScriptThen)
      result[0][0].ScriptElse = JSON.parse(result[0][0].ScriptElse)
    }
    return result[0][0];

  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.Script = script;

module.exports.addScript = async function(data){
  try {
    if(!data.id){
      data.id = idEmpty(await scripts());
    }
    if(!data.name||!data.then) return;
    if(!data.status)data.status = "automatic"
    if(!data.if){
      data.status = "manual"
      data.if = {}
    }
    if(!data.else)data.else = [];
    console.log(data);
    await conection.execute(
      "INSERT INTO `smarthome_scripts`(`ScriptId`, ScriptName`,`ScriptStatus`, `ScriptIf`, `ScriptThen`, `ScriptElse`) VALUES (?,?,?,?,?,?)",
      [data.id, data.name,data.status, data.if, data.then, data.else]
    )

    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}
module.exports.lookForDeviceByName = async function (name) {
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_scripts WHERE ScriptName = '${name}'`)
    return result[0];
  } catch (e) {
    console.log("Error",e);
    return
  }
}

module.exports.deleteDevice = async function(id){
  try {
    console.log(id);
    if(!id){
      return;
    }
    await conection.execute(
      "DELETE FROM `smarthome_scripts` WHERE `ScriptId`= ?" ,
      [id]
    )

    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}
