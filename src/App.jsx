import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";

import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={<RestrictedRoute component={<RegistrationPage />} />}
          />
          <Route
            path="login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route
            path="contacts"
            element={<PrivateRoute component={<ContactsPage />} />}
          />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

//import HomePage from "./pages/HomePage";
//import RegisterPage from "./pages/RegisterPage";
//import LoginPage from "./pages/LoginPage";
//import ContactsPage from "./pages/ContactsPage";
/*
/ - маршрут домашньої сторінки додатка, де можна розмістити інформацію про додаток чи його розробника. Рендерить компонент HomePage.
/register - публічний маршрут для реєстрації нового користувача, на якому рендериться компонент сторінки RegistrationPage з формою RegistrationForm.
/login - публічний маршрут для логіна існуючого користувача, на якому рендериться компонент сторінки LoginPage з формою LoginForm.
/contacts - приватний маршрут для роботи зі списком контактів користувача, на якому рендериться компонент сторінки ContactsPage.

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contacts/operations";

import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import css from "./App.module.css";

import { selectLoading, selectError } from "./redux/contacts/selectors";

export default function App() {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && !error && (
        <b className={css.loadingMessage}>
          Request in progress, please wait...
        </b>
      )}
      {error && (
        <p className={css.messageError}>
          Whoops, something went wrong! Please try reloading this page!
        </p>
      )}
      <ContactList />
    </div>
  );
}
*/
