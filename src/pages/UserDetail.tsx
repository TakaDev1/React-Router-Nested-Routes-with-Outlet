import React from "react";
import { useParams } from "react-router";

const UserDetail = () => {
  const { id } = useParams<"id">();
  return (
    <div>
      <p>Selected User ID: {id}</p>
    </div>
  );
};

export default UserDetail;
