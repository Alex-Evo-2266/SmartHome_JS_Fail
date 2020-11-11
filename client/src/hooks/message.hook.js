import {useState, useCallback, useContext} from 'react'
import {AlertContext} from '../alert/alertContext'

export const useMessage = (type = 'error') => {
  const [Message, setMessage] = useState('');
  const alert = useContext(AlertContext);

  const message = useCallback((text, type) =>{
      if(text){
        setMessage(text)
        alert.show(text, type)
      }
      setTimeout(function () {
        setMessage('')
      }, 30000);
    },[alert])

  const clearMessage = () => {
    setMessage('')
  }
  return {message,Message,clearMessage}
}
