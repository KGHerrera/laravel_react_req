import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axiosClient'

const users = () => {

  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getUsers();
  }, [])


  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return(
        <div>
        <div>
          <h1>Users</h1>
          <Link className="" to="/users/new">Add new</Link>
        </div>
        <div className="">
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
            </thead>
            {loading &&
              <tbody>
              <tr>
                <td colSpan="" className="">
                  Loading...
                </td>
              </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Link className="" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="" onClick={ev => onDeleteClick(u)}>Delete</button>
                  </td>
                </tr>
              ))}
              </tbody>
            }
          </table>
        </div>
      </div>
    )
}

export default users