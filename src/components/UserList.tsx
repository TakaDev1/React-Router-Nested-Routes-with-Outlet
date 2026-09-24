import React from "react";
import { Link } from "react-router";
import UsersData from "../data/Users";

const UserList = () => {
  return (
    <div>
      <ul className="flex w-1/4 mx-auto justify-around my-10 gap-5">
        {UsersData.map((user) => (
          <li
            key={user.id}
            className="w-full bg-gray-500 text-white rounded-full cursor-pointer hover:opacity-80 hover:text-blue-600 transition"
          >
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
