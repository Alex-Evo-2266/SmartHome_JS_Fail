const fs = require('fs');
const path = require('path');

const deleteEl = (id)=>{
  try {
    const homePage = require('../serverConfig/homePage.json');
    if(!homePage.carts)return
    for (var item of homePage.carts) {
      if(!item.children)continue
      let new1 = item.children.filter((item2)=>item2.IdDevice!==id)
      item.children = new1
    }
    const filePath = path.join(__dirname,'../serverConfig/homePage.json')
    let data = JSON.stringify(homePage);
    fs.writeFileSync(filePath, data);
    return
  } catch (e) {
    console.log("Error AddDevices",e);
  }
}

module.exports = deleteEl;
