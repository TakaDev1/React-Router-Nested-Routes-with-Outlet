import React from "react";
import UserList from "./UserList";
import { Outlet } from "react-router";

const Users = () => {
  return (
    <div>
      <h2>Users</h2>

      <UserList />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Users;
