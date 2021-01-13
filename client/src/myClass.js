export class ifClass {
  constructor(deviceId,property,oper,value) {
    this.DeviseId=deviceId;
    this.property=property
    this.oper=oper
    this.value=value
  }
  changeHandler(key,value){
    this[key] = value
  }
}

export class groupIfClass {
  constructor(oper) {
    if(oper!=="and"&&oper!=="or")
      oper="and"
    this.oper=oper
    this.ifElement=[]
  }
  addif(subif){
    if(subif instanceof ifClass){
      this.ifElement.push({subif,type:"ifClass"})
      return
    }
    if(subif instanceof groupIfClass){
      this.ifElement.push({subif,type:"groupIfClass"})
      return
    }
    return
  }
  updataif(subif,index){
    if(subif instanceof ifClass){
      this.ifElement[index] = {subif,type:"ifClass"}
      return
    }
    return
  }
}
