import React,{useState} from 'react'
import {Link} from 'react-router-dom'

export const ScriptsPage = () => {
  const [search, setSearch] = useState('')

  const searchout =()=>{

  }
  const searchHandler = event => {
    setSearch(event.target.value)
  }

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

        </div>
      </div>
    </>
  )
}
