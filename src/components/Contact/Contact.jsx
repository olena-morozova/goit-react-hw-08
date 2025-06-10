import { FaUser, FaPhoneAlt } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";

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
          {number}
        </p>
      </div>
      <button className={css.btnDel} onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
