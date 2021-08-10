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
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export function App() {
    const [contacts, setContacts] = useLocalStorage('contacts', {});
    const [filterName, setFilterName] = useState('');

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
        setFilterName(event.target.value);
    };

    const getVisibleContacts = () => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filterName.toLowerCase()),
        );
    };

    const getContacts = getVisibleContacts();

    return (
        <>
            <h1 className={s.title}>Phone book</h1>
            <Form submitMethod={getSubmitData} />
            <h2 className={s.title}>Contacts</h2>
            <Filter value={filterName} onChange={changeFilterValue} />
            <Contacts contacts={getContacts} deleteFunction={handelDelete} />
            <ToastContainer />
        </>
    );
}
