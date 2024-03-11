import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import React from "react";

import "./App.css";

import { SignUp } from "./Pages/signUp/signUp";
import { Login } from "./Pages/Login/login";
import { ChatPage } from "./Pages/ChatPage/chatPage";
import { useAuth } from "./Context/authContext";

function App() {
  const { user } = useAuth();
  console.log(user);

  const Protect = ({ children }) => {
    if (!user) return <Navigate to="/" replace={true} />;

    return children;
  };

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/sign-up", element: <SignUp /> },
    {
      path: "/Home",
      element: (
        <Protect>
          <ChatPage />
        </Protect>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
