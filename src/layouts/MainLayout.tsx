import { onAuthStateChanged, User } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase/connection";

import "./mainLayout.css";

export default function MainLayout() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });

  return (
    <>
      {user === null ? <Navigate to="/minimalist-todo/login" /> : undefined}
      <Outlet />
    </>
  );
}
