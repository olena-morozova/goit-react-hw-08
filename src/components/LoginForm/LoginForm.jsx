import { Formik, Form, Field } from "formik";
import css from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(login(values)).unwrap();
      navigate("/contacts");
      actions.resetForm();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </label>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
}
