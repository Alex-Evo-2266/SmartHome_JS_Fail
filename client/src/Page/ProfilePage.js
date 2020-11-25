import React,{useState} from 'react'

export const ProfilePage = () => {

const [page, setPage] = useState(1)

  return(
    <div className = "conteiner">
        <div className = "pages">
          <div className = {`page ${(page === 1)?"active":""}`}>
            <div className = "pagecontent">
              <h2>Profile</h2>
              <p>User name</p>

            </div>
          </div>
          <ul className = "page-nav">
            <li className = {(page === 1)?"active":""} onClick = {()=>setPage(1)}>
              <i className="fas fa-user"></i>
            </li>
            <li className = {(page === 2)?"active":""} onClick = {()=>setPage(2)}>
              <i className="fas fa-user-cog"></i>
            </li>
          </ul>
        </div>
      </div>
  )
}
