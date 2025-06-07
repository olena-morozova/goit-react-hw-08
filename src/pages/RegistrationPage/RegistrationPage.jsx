import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <div className={css.container}>
      <title className={css.title}>Register your account</title>
      <RegistrationForm />
    </div>
  );
}
