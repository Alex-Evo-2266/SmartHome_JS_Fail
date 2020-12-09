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
      if(elements[j].DeviceId==i){
        b=true;
        break;
      }
    }
    if(!b) return i;
  }
  return 1;
}

const devices = async()=>{
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_devices`)
    if(result&&result[0]){
      for (var item of result[0]) {
        item.DeviceConfig = JSON.parse(item.DeviceConfig)
      }
    }
    return result[0];

  } catch (e) {
    console.log("Error",e);
    return;
  }
}
module.exports.Devices = devices;

module.exports.addDevice = async function(data){
  try {
    if(!data.id){
      data.id = idEmpty(await devices());
    }
    if(!data.name) return;
    if(!data.config)data.config = {};
    await conection.execute(
      "INSERT INTO `smarthome_devices`(`DeviceId`, `DeviceName`, `DeviceTypeConnect`, `DeviceType`, `DeviceConfig`) VALUES (?,?,?,?,?)",
      [data.id, data.name, data.typeConnect, data.typeDevice, data.config]
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
    const result = await conection.execute(`SELECT * FROM smarthome_devices WHERE DeviceName = '${name}'`)
    return result[0];
  } catch (e) {
    console.log("Error",e);
    return
  }
}
