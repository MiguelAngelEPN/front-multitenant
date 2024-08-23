"use client"
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [tenantId, setTenantId] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      const userData = JSON.parse(token);
      setTenantId(userData.tenantId);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {tenantId ? <p>Welcome, Tenant ID: {tenantId}</p> : <p>Please log in.</p>}
    </div>
  );
};

export default Dashboard;
