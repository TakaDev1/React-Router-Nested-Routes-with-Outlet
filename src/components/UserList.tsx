import React from "react";
import { Link } from "react-router";
import UsersData from "../data/Users";

const UserList = () => {
  return (
    <div>
      <ul>
        {UsersData.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
