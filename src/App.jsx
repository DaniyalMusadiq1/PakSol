import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, telegramAuth } from "./store/userSlice";
import { UserStack } from "./routes/UserStack";
import { AdminStack } from "./routes/AdminStack";
import AppLoading from "./components/AppLoading";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const { selectedUser, loading } = useSelector((state) => state.users);

  /* -------------------------------
     Set Axios Token Header
  -------------------------------- */
  useEffect(() => {
    if (selectedUser?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${selectedUser.token}`;
    }
  }, [selectedUser?.token]);

  /* -------------------------------
     Telegram WebApp Auth
  -------------------------------- */
  useEffect(() => {
    if (!window.Telegram || !window.Telegram.WebApp) {
      console.error("Telegram WebApp not detected");
      return;
    }

    const tg = window.Telegram.WebApp;
    tg.ready();

    const tgUser = tg.initDataUnsafe?.user;

    if (!tgUser?.id) {
      console.error("Telegram user not found");
      return;
    }

    const telegramUser = {
      telegram_id: tgUser.id.toString(),
      username: tgUser.username || null,
      first_name: tgUser.first_name || null,
      last_name: tgUser.last_name || null,
      language_code: tgUser.language_code || null,
      photo_url: tgUser.photo_url || null,
    };

    dispatch(telegramAuth(telegramUser)).then((res) => {
      if (res?.payload?.id) {
        dispatch(fetchUserById(res.payload.id));
      }
    });
  }, [dispatch]);

  /* -------------------------------
     Loader
  -------------------------------- */
  if (loading || !selectedUser?.id) {
    return <AppLoading />;
  }

  /* -------------------------------
     Role-Based Routing
  -------------------------------- */
  return (
    <BrowserRouter>
      {selectedUser.role === 1 ? <AdminStack /> : <UserStack />}
    </BrowserRouter>
  );
}

export default App;
