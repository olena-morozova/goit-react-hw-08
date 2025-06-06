import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Базова URL-адреса бекенду
axios.defaults.baseURL = "https://connections-api.goit.global/";

// Допоміжна функція для додавання токена до заголовків запитів
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Допоміжна функція для видалення токена із заголовків (після логауту)
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// -----------------------------
// 1. Реєстрація нового користувача
// -----------------------------
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      // credentials — об’єкт з полями email та password
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token); // зберігаємо токен у заголовки
      return res.data; // повертаємо { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// -----------------------------
// 2. Логін користувача
// -----------------------------
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// -----------------------------
// 3. Вихід користувача
// -----------------------------
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout"); // просто викликаємо endpoint
    clearAuthHeader(); // очищаємо заголовки
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// -----------------------------
// 4. Оновлення користувача за токеном
// -----------------------------
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Дістаємо токен зі state (але не напряму, а через thunkAPI)
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    // Якщо токену нема — не виконуємо запит
    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(persistedToken); // встановлюємо токен у заголовок
      const res = await axios.get("/users/current"); // отримуємо поточного юзера
      return res.data; // повертаємо тільки user
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
