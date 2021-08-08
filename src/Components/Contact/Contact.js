import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact.module.css';

const Contacts = ({ contacts, deleteFunction }) => {
    return (
        <div>
            <ul className={s.thumb}>
                {contacts.map(contact => {
                    return (
                        <li className={s.contactList} key={contact.id}>
                            {contact.name}: {contact.number}
                            <button
                                className={s.button}
                                type="button"
                                onClick={() => {
                                    deleteFunction(contact.id);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    deleteFunction: PropTypes.func.isRequired,
};

export default Contacts;
