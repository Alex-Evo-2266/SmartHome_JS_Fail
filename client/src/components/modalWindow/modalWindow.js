import React,{useState} from 'react'

export const ModalWindow = ({children,hide,width = 100,height = 200,title="window"})=>{
  const [point, setPoint] = useState({
    top:240,
    left:300
  })

  const mouseDown = (event)=>{
    if(event.target.className!=="modalHeader")
      return;
    var coords = getCoords(event.target);
    var shiftX = event.pageX - coords.left;
    var shiftY = event.pageY - coords.top;
    moveAt(event)

    function moveAt(e) {
      if(e.pageX < 65||e.pageX+width > document.body.clientWidth||e.pageY < 5||e.pageY > document.clientHeight){
        return
      }
      setPoint({
        left:e.pageX - shiftX,
        top:e.pageY - shiftY
      })

    }

    document.onmousemove = function(e) {
      moveAt(e);
    };

    document.onkeydown = function (e) {
      if(e.key==="Escape"){
        document.onmousemove = null;
        event.onmouseup = null;
        document.onkeydown = null;
      }
    }

    event.target.onmouseup = function() {
      document.onmousemove = null;
      event.onmouseup = null;
      document.onkeydown = null;
    };


    function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  }
  }

  return(
    <div className="modalWindow" style={{top:`${point.top}px`,left:`${point.left}px`}}>
      <div className="modalHeader" onMouseDown={mouseDown} onDragStart={()=>false}>
        <h4>{title}</h4>
        <button onClick = {hide}>&times;</button>
      </div>
      <div className="modalContent" style={{width:`${width}px`,height:`${height}px`}}>
        {children}
      </div>
    </div>
  )
}
