import { Formik, Form, Field } from "formik";
import css from "./RegistrationForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(register(values)).unwrap();
      navigate("/contacts");
      actions.resetForm();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Name
          <Field type="text" name="name" />
        </label>
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" autoComplete="new-password" />
        </label>
        <button type="submit" className={css.button}>
          Register
        </button>
      </Form>
    </Formik>
  );
}
