
export default function setStyle () {

  let time = new Date().getHours();
  let date = new Date().getMonth();
  let nightTime = (date<3||date>8)?17:20;
  let twilightTime = (date<3||date>8)?15:18;
  let sunriseTime = (date<3||date>8)?5:3;
  let dayTime = (date<3||date>8)?10:7;
  let background = "sunrise";
  if(time>=sunriseTime&&time<dayTime){
    background = "sunrise";
  }else if (time>=dayTime&&time<twilightTime) {
    background = "day";
  }else if (time>=twilightTime&&time<nightTime) {
    background = "twilight";
  }else if ((time>=0&&time<sunriseTime)||time>=nightTime) {
    background = "night";
  }
  document.body.style = `background: url(http://localhost:5000/api/base/fonImage/base/base/${background});`;

}
