import React,{useState,useContext,useEffect} from 'react'
import userDefault from '../../img/userNuN.png'

export const UserElement = ({user,updata})=>{

  return(
    <div className="userElement">
      <div className="content">
        <p>Email: {user.Email}
        <br/>Mobile: {user.Mobile}</p>
        <img alt="user icon" src={userDefault} className="userImg"/>
        <h3>{user.UserName} {user.UserSurname}</h3>
      </div>
    </div>
  )
}
