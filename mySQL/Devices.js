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

const device = async(id)=>{
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_devices WHERE DeviceId = ${id}`)
    if(result&&result[0][0]){
      result[0][0].DeviceConfig = JSON.parse(result[0][0].DeviceConfig)
      result[0][0].DeviceValue = JSON.parse(result[0][0].DeviceValue)
    }
    return result[0][0];

  } catch (e) {
    console.log("Error",e);
    return;
  }
}

module.exports.Device = device;

module.exports.addDevice = async function(data){
  try {
    if(!data.id){
      data.id = idEmpty(await devices());
    }
    if(!data.name) return;
    if(!data.config)data.config = {};
    console.log(data.id, data.name,data.systemName, data.typeConnect, data.typeDevice, data.config);
    await conection.execute(
      "INSERT INTO `smarthome_devices`(`DeviceId`, `DeviceName`,`DeviceSystemName`, `DeviceTypeConnect`, `DeviceType`, `DeviceConfig`) VALUES (?,?,?,?,?,?)",
      [data.id, data.name,data.systemName, data.typeConnect, data.typeDevice, data.config]
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

module.exports.lookForDeviceBySystemName = async function (systemname) {
  try {
    const result = await conection.execute(`SELECT * FROM smarthome_devices WHERE DeviceSystemName = '${systemname}'`)
    if(result[0][0])
      result[0][0].DeviceConfig = JSON.parse(result[0][0].DeviceConfig)
    if(result[0][0])
      result[0][0].DeviceValue = JSON.parse(result[0][0].DeviceValue)
    return result[0];
  } catch (e) {
    console.log("Error",e);
    return
  }
}

module.exports.updataDevice = async function(data){
  try {
    if(!data.id){
      return;
    }
    if(!data.name) return;
    if(!data.config)data.config = {};
    await conection.execute(
      "UPDATE `smarthome_devices` SET `DeviceName`=?, `DeviceSystemName`=?,`DeviceInformation`=?,`RoomId`=?,`DeviceTypeConnect`=?,`DeviceType`=?,`DeviceConfig`=? WHERE `DeviceId`=?" ,
      [data.name,data.systemName,data.info,data.idRoom, data.typeConnect, data.typeDevice, data.config,data.id]
    )

    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}
//device lamp1 color 3000
module.exports.setValue = async function (id,key,value) {
  console.log(id,key,value);
  try {
    if(!id)
      return
    let devicebuf = await device(id);
    let newValue = devicebuf.DeviceValue
    newValue[key] = value
    await conection.execute(
      "UPDATE `smarthome_devices` SET `DeviceValue`=? WHERE `DeviceId`=?" ,
      [newValue, id]
    )
    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}

module.exports.lookForDeviceByTopic = async function (topic) {
  try {
    const mqttDevicessqlreq = await conection.execute(`SELECT * FROM smarthome_devices WHERE DeviceTypeConnect = 'mqtt'`)
    let mqttDevices = mqttDevicessqlreq[0]
    let ret = []
    for (let i = 0; i < mqttDevices.length; i++) {
      mqttDevices[i].DeviceConfig = JSON.parse(mqttDevices[i].DeviceConfig)
      mqttDevices[i].DeviceValue = JSON.parse(mqttDevices[i].DeviceValue)
      for (let key in mqttDevices[i].DeviceConfig) {
        if(mqttDevices[i].DeviceConfig[key]===topic){
          let obj = {deviceId:mqttDevices[i].DeviceId,device:mqttDevices[i].DeviceSystemName,key,topic,value:mqttDevices[i].DeviceValue}
          ret.push(obj)
        }
      }
    }
    return ret;
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
      "DELETE FROM `smarthome_devices` WHERE `DeviceId`= ?" ,
      [id]
    )

    return true;
  }
  catch (e) {
    console.log("Error",e);
    return
  }
}
