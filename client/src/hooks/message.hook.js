import {useState, useCallback, useContext} from 'react'
import {AlertContext} from '../components/alert/alertContext'

export const useMessage = (type = 'error') => {
  const [Message, setMessage] = useState('');
  const {show,hide} = useContext(AlertContext);


  const message = useCallback((text, type) =>{
      if(text){
        setMessage(text)
        show(text, type)
      }
      // setTimeout(function () {
      //   setMessage('')
      //   hide()
      // }, 30000);
    },[show])

  const clearMessage = () => {
    setMessage('')
    hide()
  }
  return {message,Message,clearMessage}
}
