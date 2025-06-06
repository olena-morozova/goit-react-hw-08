import { createSlice } from "@reduxjs/toolkit";
// Імпортуємо асинхронні операції, які ще створимо в operations.js
import { register, login, logout, refreshUser } from "./operations";

// Початковий стан auth-слайсу
const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null, // JWT токен після логіну/реєстрації
  isLoggedIn: false, // Чи залогінений користувач
  isRefreshing: false, // Чи триває оновлення користувача (для випадків, коли ми оновлюємо сесію з локального токена)
};

// Створюємо слайс
const authSlice = createSlice({
  name: "auth",
  initialState,
  // Тут ми не використовуємо reducers, бо всі дії — асинхронні
  extraReducers: (builder) =>
    builder
      // Коли реєстрація пройшла успішно
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user; // Зберігаємо ім’я та email
        state.token = action.payload.token; // Зберігаємо токен
        state.isLoggedIn = true; // Ставимо прапорець, що користувач залогінений
      })
      // Коли логін пройшов успішно — логіка аналогічна
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // Коли користувач вийшов із системи
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      // Коли ми оновлюємо користувача (наприклад, після перезавантаження сторінки)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true; // Встановлюємо прапорець, що йде перевірка токена
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload; // Оновлюємо користувача
        state.isLoggedIn = true; // Встановлюємо статус логіну
        state.isRefreshing = false; // Завершуємо процес оновлення
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false; // Якщо токен недійсний — не логінуємо
      }),
});

// Експортуємо редюсер, щоб підключити його до store.js
export const authReducer = authSlice.reducer;
