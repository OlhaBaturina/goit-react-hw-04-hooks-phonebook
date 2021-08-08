import React, { Component } from 'react';
import Form from './Components/Form/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contacts from './Components/Contact/Contact';
import Filter from './Components/Filter/Filter';
import s from './App.css';

class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);

        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            console.log('Обновились контакты');
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts),
            );
        }
    }

    getSubmitData = data => {
        if (
            this.state.contacts.find(
                contact =>
                    contact.name.toLowerCase() === data.name.toLowerCase(),
            )
        ) {
            toast.error('This name is also here!');
            return;
        }

        this.setState(prevState => {
            return { contacts: [...prevState.contacts, data] };
        });
    };

    changeFilterValue = event => {
        this.setState({ filter: event.target.value });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    handelDelete = data => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== data),
        }));
    };

    render() {
        const { filter } = this.state;
        const visibleContacts = this.getVisibleContacts();

        return (
            <>
                <h1 className={s.title}>PhoneBook</h1>
                <Form submitMethod={this.getSubmitData} />
                <h2 className={s.title}>Contacts</h2>
                <Filter value={filter} onChange={this.changeFilterValue} />
                <Contacts
                    contacts={visibleContacts}
                    deleteFunction={this.handelDelete}
                />
                <ToastContainer />
            </>
        );
    }
}

export default App;
