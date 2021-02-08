import React from "react";
import { Redirect } from "react-router-dom";

import { useProfile } from "../../../../hooks/useProfile";

export const AdminOnly = ({ children }) => {
  const { profile } = useProfile();

  if (profile.role !== "admin") return <Redirect to="/dashboard/admin" />;

  return children;
};

export const AdminDisplay = ({ children }) => {
  const { profile } = useProfile();

  if (profile.role !== "admin") return null;
  return children;
};
