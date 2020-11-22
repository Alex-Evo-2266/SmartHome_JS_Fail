import React,{useState} from 'react'

export const Title = ({children})=>{

  const[position, setPosition] = useState(false);

  window.onscroll = ()=>{
    let title = document.getElementById('titlePage')
    let top = title.parentNode.getBoundingClientRect().y;
    if(top<=-100){
      setPosition(true);
    }
    else {
      setPosition(false);
    }
  }

  return (
    <div id="titlePage" className = {`titlePage ${(position)?"titleTop":"titleDefault"}`}>
      {children}
    </div>
  )
}
