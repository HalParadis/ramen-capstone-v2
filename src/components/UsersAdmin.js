import React, { useEffect } from "react";

const UsersAdmin = ({ allUsers, fetchUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-admin-page">
      {allUsers.map((users, idx) => {
        return (
          <div className="user" key={users.id ?? idx}>
            <h3>Name: {users.username}</h3>
            <p>Email: {users.email}</p>
            <p>Address: {users.address ?? "N/A"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default UsersAdmin;
