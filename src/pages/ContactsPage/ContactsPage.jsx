import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";

import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";

import {
  selectLoading,
  selectError,
  selectContacts,
} from "../../redux/contacts/selectors";

export default function ContactsPage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <div className={css.topRow}>
        <div className={css.leftColumn}>
          <ContactForm />
        </div>
        <div className={css.rightColumn}>
          {contacts.length > 0 && <SearchBox />}
        </div>
      </div>
      <div className={css.contactList}>
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
    </div>
  );
}
