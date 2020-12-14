import React, {useContext,useEffect} from 'react'
import {useHttp} from '../../hooks/http.hook'
import {useMessage} from '../../hooks/message.hook'
import {AuthContext} from '../../context/AuthContext.js'
import {SocketContext} from '../../hooks/socket.hook'

export const Terminal = ()=>{
  const auth = useContext(AuthContext)
  const socket = useContext(SocketContext)
  const {message} = useMessage();
  const {request, error, clearError} = useHttp();

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  function getCursorPosition( ctrl ) {
        var CaretPos = 0;
        console.log(document.selection);
        if ( document.selection ) {
            ctrl.focus ();
            var Sel = document.selection.createRange();
            Sel.moveStart ('character', -ctrl.value.length);
            CaretPos = Sel.text.length;
        } else if ( ctrl.selectionStart || ctrl.selectionStart === '0' ) {
            CaretPos = ctrl.selectionStart;
        }
        return CaretPos;
    }


  const end = (e)=>{
    setTimeout(()=>{
      let area = document.getElementById('area')
      var end = area.value.length;
      area.setSelectionRange(end,end);
      area.focus();
    },0)
  }
  const keyd = async(e)=>{
    if(e.keyCode === 37 || e.keyCode === 39||e.keyCode === 38||e.keyCode === 40)
        e.preventDefault();
    if(e.keyCode === 13){
      let r = e.target.value.split("\n")
      let c = r.length;
      r = r[c-1]
      r = r.replace('>', '');
      e.target.readOnly = true
      socket.terminalMessage("test")
      e.target.value = e.target.value + "\n>"
      e.target.readOnly = false
      e.preventDefault();
    }
    if(e.keyCode === 8 && getCursorPosition(e.target)===1){
      e.preventDefault();
    }
  }

  return(
    <div className = "terminal">
      <textarea id="area" onClick={end} onKeyDown={keyd} defaultValue={">"}>
      </textarea>
    </div>
  )
}
