
export default function setStyle () {
  let time = new Date().getHours();
  let date = new Date().getMonth();
  let nightTime = (date<3||date>8)?17:20;
  let twilightTime = (date<3||date>8)?15:18;
  let sunriseTime = (date<3||date>8)?5:3;
  let dayTime = (date<3||date>8)?10:7;
  console.log({
    time,date,nightTime,twilightTime,sunriseTime,dayTime
  });
}
