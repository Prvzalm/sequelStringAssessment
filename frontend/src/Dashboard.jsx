import React from "react";
import RoleAView from "./RoleAView";
import RoleBView from "./RoleBView";

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Welcome, {user.role}</h1>
      <button onClick={onLogout}>Logout</button>
      {user.role === "RoleA" && <RoleAView />}
      {user.role === "RoleB" && <RoleBView />}
    </div>
  );
};

export default Dashboard;
