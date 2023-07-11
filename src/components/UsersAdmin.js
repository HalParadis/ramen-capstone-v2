import React, { useEffect } from "react";

const UsersAdmin = ({allUsers, fetchUsers}) =>{

  useEffect(() => {
    fetchUsers();
  }, [])

  return <>
  {allUsers.map((users, idx) => {
    return (
      <div key={users.id ?? idx}>
        <h3>Name: {users.username}</h3>
        <p>Email: {users.email}</p>
        <p>Address: {users.address}</p>
        {/* <h3>Picture:</h3> */}
        <hr></hr>
      </div>
    )
  })}
  </>
}

export default UsersAdmin;