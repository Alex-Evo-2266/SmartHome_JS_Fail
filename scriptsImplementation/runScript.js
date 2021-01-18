const mqtt = require('../mqtt/mqtt')
const scripts = require('../mySQL/Scripts');
const devices = require('../mySQL/Devices');
const universalMqtt = require("../mqtt/mqttDevices/universal")

const run = async(script)=>{
  await devices.connect()
  let IfScript = await groupIf(script.ScriptIf)
  if(IfScript)
    await actDev(script.ScriptThen)
  else
    await actDev(script.ScriptElse)
  await devices.desconnect();
}

const actDev = async(act)=>{
  for (var item of act) {
    if(item.type==="device"){

      const device = await devices.Device(item.DeviseId)

        if((device.DeviceType==="light"||device.DeviceType==="switch"||device.DeviceType==="dimmer")&&item.property==="power"&&item.value&&item.value.type==="status"){
          if(item.value.value==="on") universalMqtt(device,"powerOn")
          if(item.value.value==="off") universalMqtt(device,"powerOff")
          if(item.value.value==="togle") universalMqtt(device,"powerTogle")
        }
        if((device.DeviceType==="light"||device.DeviceType==="switch"||device.DeviceType==="dimmer")&&item.property==="power"&&item.value&&item.value.type==="value"){
          if(item.value.value==="false"||item.value.value==="0"||item.value.value==="null"||item.value.value==="off"||item.value.value==="Off"||item.value.value==="OFF") universalMqtt(device,"powerOff")
          else universalMqtt(device,"powerOn")
        }
        if((device.DeviceType==="light"||device.DeviceType==="switch"||device.DeviceType==="dimmer")&&item.property==="power"&&item.value&&item.value.type==="DeviseValue"){
          if(item.value.value&&item.value.value.DeviceId&&item.value.value.property){
            let ret = await giveValueDevise(item.value.value.DeviceId,item.value.value.property)
            if(ret==="false"||ret==="0"||ret==="null"||ret==="off"||ret==="Off"||ret==="OFF") universalMqtt(device,"powerOff")
            else universalMqtt(device,"powerOn")
          }
        }
        if((device.DeviceType==="light"||device.DeviceType==="dimmer")&&item.property==="dimmer"&&item.value&&item.value.type==="status"){
          if(item.value.value==="on") universalMqtt(device,"dimmer",device.DeviceConfig.maxDimmer)
          else if(item.value.value==="off") universalMqtt(device,"dimmer",device.DeviceConfig.minDimmer)
          else if(item.value.value==="togle"&&device.DeviceValue.dimmer===device.DeviceConfig.maxDimmer) universalMqtt(device,"dimmer",device.DeviceConfig.minDimmer)
          else if(item.value.value==="togle"&&device.DeviceValue.dimmer===device.DeviceConfig.minDimmer) universalMqtt(device,"dimmer",device.DeviceConfig.maxDimmer)
          else if(item.value.value==="togle") universalMqtt(device,"dimmer",device.DeviceConfig.minDimmer)
        }
        if((device.DeviceType==="light"||device.DeviceType==="dimmer")&&item.property==="dimmer"&&item.value&&item.value.type==="value"){
          try {
            let n = Number(item.value.value)
            universalMqtt(device,"dimmer",String(n))
          } catch (e) {
            console.error(e);
          }
        }
        if((device.DeviceType==="light"||device.DeviceType==="dimmer")&&item.property==="dimmer"&&item.value&&item.value.type==="DeviseValue"){
          if(item.value.value&&item.value.value.DeviceId&&item.value.value.property){
            let ret = await giveValueDevise(item.value.value.DeviceId,item.value.value.property)
            universalMqtt(device,"dimmer",ret)
          }
        }
        if(device.DeviceType==="light"&&item.property==="color"&&item.value&&item.value.type==="status"){
          if(item.value.value==="on") universalMqtt(device,"color",device.DeviceConfig.maxColor)
          else if(item.value.value==="off") universalMqtt(device,"color",device.DeviceConfig.minColor)
          else if(item.value.value==="togle"&&device.DeviceValue.color===device.DeviceConfig.maxColor) universalMqtt(device,"color",device.DeviceConfig.minColor)
          else if(item.value.value==="togle"&&device.DeviceValue.color===device.DeviceConfig.minColor) universalMqtt(device,"color",device.DeviceConfig.maxColor)
          else if(item.value.value==="togle") universalMqtt(device,"color",device.DeviceConfig.minColor)
        }
        if(device.DeviceType==="light"&&item.property==="color"&&item.value&&item.value.type==="value"){
          try {
            let n = Number(item.value.value)
            universalMqtt(device,"dimmer",String(n))
          } catch (e) {
            console.error(e);
          }
        }
        if(device.DeviceType==="light"&&item.property==="color"&&item.value&&item.value.type==="DeviseValue"){
          if(item.value.value&&item.value.value.DeviceId&&item.value.value.property){
            let ret = await giveValueDevise(item.value.value.DeviceId,item.value.value.property)
            universalMqtt(device,"color",ret)
          }
        }
        if(device.DeviceType==="light"&&item.property==="mode"&&item.value&&item.value.type==="status"){
          if(item.value.value==="on") universalMqtt(device,"mode",device.DeviceConfig.countMode-1)
          if(item.value.value==="off") universalMqtt(device,"mode","0")
          if(item.value.value==="togle") universalMqtt(device,"mode")
        }
        if(device.DeviceType==="light"&&item.property==="mode"&&item.value&&item.value.type==="value"){
          if(item.value.value>=0&&item.value.value<=device.DeviceConfig.countMode-1){
            universalMqtt(device,"mode",item.value.value)
          }
        }
        if(device.DeviceType==="light"&&item.property==="mode"&&item.value&&item.value.type==="DeviseValue"){
          if(item.value.value&&item.value.value.DeviceId&&item.value.value.property){
            let ret = await giveValueDevise(item.value.value.DeviceId,item.value.value.property)
            universalMqtt(device,"mode",ret)
          }
        }
        if(device.DeviceType==="ir"&&item.property==="command"&&item.value&&(item.value.type==="value"||item.value.type==="status")){
          universalMqtt(device,"send",item.value.value)
        }
        if(device.DeviceType==="ir"&&item.property==="command"&&item.value&&item.value.type==="DeviseValue"){
          if(item.value.value&&item.value.value.DeviceId&&item.value.value.property){
            let ret = await giveValueDevise(item.value.value.DeviceId,item.value.value.property)
            universalMqtt(device,"send",ret)
          }
        }
        if(device.DeviceType==="variable"&&item.value&&(item.value.type==="value"||item.value.type==="status")){
          await devices.setValue(device.DeviceId,"value",item.value.value)
        }
        if(device.DeviceType==="variable"&&item.value&&item.value.type==="DeviseValue"){
          if(item.value.value&&item.value.value.DeviceId&&item.value.value.property){
            let ret = await giveValueDevise(item.value.value.DeviceId,item.value.value.property)
            await devices.setValue(device.DeviceId,"value",ret)
          }
        }
    }
  }
}

const giveValueDevise=async(id,param)=>{
  const device = await devices.Device(id)
  let value
  if((param==="value"||param==="battery")&&device.DeviceType!=="variable"){
    value = device.DeviceValue.status[param]
  }
  else {
    value = device.DeviceValue[param]
  }
  return value
}

const groupIf = async(group)=>{
  let returns = []
  for (var elements of group.ifElement) {
    if(elements.type==="ifClass"){
      let ret = await element(elements.subif)
      returns.push(ret)
    }
    if(elements.type==="groupIfClass"){
      let ret = await groupIf(elements.subif)
      returns.push(ret)
    }
  }
  if(group.oper === "and"&& returns.indexOf(false) !== -1)
    return false
  else if (group.oper === "or"&& returns.indexOf(true) === -1)
    return false
  return true
}

const element = async(item)=>{
  if(item.type==="device"&&item.DeviseId){
    // await devices.connect()
    const device = await devices.Device(item.DeviseId)
    // await devices.desconnect();
    let deviceValue = device.DeviceValue
    if((item.property==="value"||item.property==="battery")&&device.DeviceType!=="variable"){
      deviceValue = deviceValue.status
    }
    if(item.property==="power"){
      item.value = device.DeviceConfig.turnOnSignal
    }
    if(item.oper==="=="&&deviceValue[item.property]===item.value){
      return true;
    }
    if(item.oper==="!="&&deviceValue[item.property]!==item.value){
      return true;
    }
    if(item.oper===">="&&deviceValue[item.property]>=item.value){
      return true;
    }
    if(item.oper==="<="&&deviceValue[item.property]<=item.value){
      return true;
    }
    if(item.oper===">"&&deviceValue[item.property]>item.value){
      return true;
    }
    if(item.oper==="<"&&deviceValue[item.property]<item.value){
      return true;
    }
    return false
  }
}

module.exports = run;
