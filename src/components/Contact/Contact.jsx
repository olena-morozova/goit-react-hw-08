import { FaUser, FaPhoneAlt } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

function formatNumber(number) {
  const digits = number.replace(/\D/g, "").slice(0, 10);
  if (digits.length < 7) return number;

  return digits.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "($1) $2-$3-$4");
}

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      <div className={css.content}>
        <p className={css.line}>
          <FaUser className={css.icon} />
          {name}
        </p>
        <p className={css.line}>
          <FaPhoneAlt className={css.icon} />
          {formatNumber(number)}
        </p>
      </div>
      <button className={css.btnDel} onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
