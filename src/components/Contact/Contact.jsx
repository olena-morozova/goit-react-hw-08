import { FaUser, FaPhoneAlt } from "react-icons/fa";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { useState } from "react";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [isEditintg, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newNumber, setNewNumber] = useState(number);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(id));
    closeModal();
  };

  const toggleEdit = () => {
    setIsEditing(!isEditintg);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const saveChanges = () => {
    dispatch(updateContact({ id, name: newName, number: newNumber }));
    setIsEditing(false);
  };

  return (
    <>
      {isEditintg ? (
        <div className={css.editForm}>
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
            className={css.editInput}
          />
          <input
            type="text"
            value={newNumber}
            onChange={handleNumberChange}
            className={css.editInput}
          />
          <div className={css.editButtons}>
            <button onClick={saveChanges}>Save</button>
            <button onClick={toggleEdit}>Cancel</button>
          </div>
        </div>
      ) : (
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
      )}

      <div className={css.buttons}>
        {!isEditintg && (
          <button className={css.btnEdit} onClick={toggleEdit}>
            Edit
          </button>
        )}
        <button className={css.btnDel} onClick={openModal}>
          Delete
        </button>
      </div>

      {showModal && (
        <div className={css.modal}>
          <div className={css.modalContent}>
            <p>Are you sure you want to delete this contact?</p>
            <div className={css.modalButtons}>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
