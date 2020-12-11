import React from 'react'

export const Terminal = ()=>{

  const end = (e)=>{
    setTimeout(()=>{
      let area = document.getElementById('area')
      var end = area.value.length;
      area.setSelectionRange(end,end);
      area.focus();
    },0)
  }
  const stop = (e)=>{
    if(e.keyCode === 37 || e.keyCode === 39||e.keyCode === 38||e.keyCode === 40)
        e.preventDefault();
    }

  return(
    <div>
      <textarea id="area" onClick={end} onKeyDown={stop}>
      
      </textarea>
    </div>
  )
}
