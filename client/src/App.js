import React from "react";
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx";
import LoginPage from "./scenes/loginPage/index.jsx";
import ProfilePage from "./scenes/profilePage/index.jsx";
import InboxPage from "./scenes/inboxPage/index.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline,ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import state from "./state/index.js";
import ChatBox from "./components/ChatBox.jsx";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/chats"
              element={isAuth ? <InboxPage /> : <Navigate to="/" />}
            />
            <Route
            path="/chats/:userId"
            element={isAuth ? <ChatBox /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;