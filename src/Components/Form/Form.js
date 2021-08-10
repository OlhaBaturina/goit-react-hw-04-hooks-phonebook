import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import s from './Form.module.css';

export function Form({ submitMethod }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const id = uuidv4();

    const handleClickName = event => setName(event.currentTarget.value);
    const handleClickNumber = event => setNumber(event.currentTarget.value);

    const handleSubmit = event => {
        event.preventDefault();
        submitMethod({ id: id, name: name, number: number });
        resetState();
    };

    const resetState = () => {
        setNumber('');
        setName('');
    };

    return (
        <form className={s.thumb} onSubmit={handleSubmit}>
            <label>
                <span className={s.name}>Name</span>
                <input
                    className={s.input}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                    value={name}
                    onChange={handleClickName}
                />
            </label>

            <label>
                <span className={s.name}>Number</span>
                <input
                    type="tel"
                    className={s.input}
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                    onChange={handleClickNumber}
                    value={number}
                />
            </label>
            <button type="submit" className={s.button}>
                Save contact
            </button>
        </form>
    );
}

Form.propTypes = {
    submitMethod: PropTypes.func.isRequired,
};
