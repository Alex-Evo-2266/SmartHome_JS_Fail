import React,{useState,useEffect,useCallback,useContext} from 'react'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext.js'
import {Loader} from '../components/Loader'
import {ScriptElement} from '../components/scriptCarts/scriptElement'

export const ScriptsPage = () => {
  const [search, setSearch] = useState('')
  const [scripts, setScripts] = useState([])
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {loading, request, error, clearError} = useHttp();

  const searchout =()=>{

  }
  const searchHandler = event => {
    setSearch(event.target.value)
  }

  const updataScripts = useCallback(async()=>{
    const data = await request('/api/script/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    setScripts(data);
  },[])

  useEffect(()=>{
    updataScripts()
  },[])

  useEffect(()=>{
    console.log(scripts);
  },[scripts])

  return(
    <>
      <div className = "conteiner">
        <header>
          <h1>All Scripts</h1>
          <Link to = "/scripts/add" className="titleButtonAdd"><i onClick={()=>{}} className="fas fa-plus"></i></Link>
          <input type="search" name="search" id="searchDevices" onChange={searchHandler} onKeyDown={()=>{}} value={search}/>
          <button onClick={searchout} className="searchBtn">Search</button>
        </header>
        <div className = "Scripts">
          <div className="scriptsList">
            {
              (scripts&&scripts[0])?
              scripts.map((item,index)=>{
                return(
                  <ScriptElement key={index} script={item}/>
                )
              }):
              <Loader/>
            }
          </div>
        </div>
      </div>
    </>
  )
}
