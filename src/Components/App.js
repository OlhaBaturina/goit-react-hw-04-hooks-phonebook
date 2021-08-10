import React, { useEffect, useState } from 'react';
import { Form } from './Form/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contacts from './Contact/Contact';
import Filter from './Filter/Filter';
import s from './App.css';

const useLocalStorage = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export function App() {
    const [contacts, setContacts] = useLocalStorage('contacts', {});

    const [filter, setFilter] = useState('');

    const getSubmitData = data => {
        if (
            contacts.find(
                contact =>
                    contact.name.toLowerCase() === data.name.toLowerCase(),
            )
        ) {
            toast.error('This name is also here!');
            return;
        }

        setContacts(prevState => [...prevState, data]);
    };

    const handelDelete = data =>
        setContacts(prevState =>
            prevState.filter(contact => contact.id !== data),
        );

    const changeFilterValue = event => {
        setFilter(event.target.value);
    };

    const getVisibleContacts = () => {
        contacts.includes(filter);
    };

    const visibleContacts = getVisibleContacts();

    return (
        <>
            <h1 className={s.title}>Phone book</h1>
            <Form submitMethod={getSubmitData} />
            <h2 className={s.title}>Contacts</h2>
            <Filter value={filter} onChange={changeFilterValue} />
            <Contacts contacts={contacts} deleteFunction={handelDelete} />
            <ToastContainer />
        </>
    );
}
