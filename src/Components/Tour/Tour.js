import React, { useReducer, useEffect } from 'react';
import JoyRide, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import s from './Tour.module.css';

const TOUR_STEPS = [
    {
        target: '.Form_input__3WVds',
        content: 'Write name of contact',
    },

    {
        target: '.Form_button__3VgmS',
        content: 'Save contact',
    },
    {
        target: '.Filter_input__ZGtJc',
        content: 'Filter contact by letter',
    },
    {
        target: '.Contact_button__2nCJ3',
        content: 'You can delete contact',
    },
];

const INITIAL_STATE = {
    key: new Date(),
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: TOUR_STEPS,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START':
            return { ...state, run: true };
        case 'RESET':
            return { ...state, stepIndex: 0 };
        case 'STOP':
            return { ...state, run: false };
        case 'NEXT_OR_PREV':
            return { ...state, ...action.payload };
        case 'RESTART':
            return {
                ...state,
                stepIndex: 0,
                run: true,
                loading: false,
                key: new Date(),
            };
        default:
            return state;
    }
};

const Tour = () => {
    const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);

    useEffect(() => {
        if (!localStorage.getItem('tour')) {
            dispatch({ type: 'START' });
        }
    }, []);

    const callback = data => {
        const { action, index, type, status } = data;

        if (
            action === ACTIONS.CLOSE ||
            (status === STATUS.SKIPPED && tourState.run) ||
            status === STATUS.FINISHED
        ) {
            dispatch({ type: 'STOP' });
        } else if (
            type === EVENTS.STEP_AFTER ||
            type === EVENTS.TARGET_NOT_FOUND
        ) {
            dispatch({
                type: 'NEXT_OR_PREV',
                payload: {
                    stepIndex: index + (action === ACTIONS.PREV ? -1 : 1),
                },
            });
        }
    };

    const startTour = () => {
        dispatch({ type: 'RESTART' });
    };

    return (
        <>
            <button className={s.btn_primary} onClick={startTour}>
                Start Tour
            </button>

            <JoyRide
                {...tourState}
                callback={callback}
                showSkipButton={true}
                showProgress={true}
                styles={{
                    tooltipContainer: {
                        textAlign: 'left',
                    },

                    buttonNext: {
                        backgroundColor: 'rgba(0, 139, 139, 0.845)',
                        color: 'bisque',
                    },

                    buttonBack: {
                        marginRight: 10,
                        color: 'rgb(0, 139, 139)',
                    },

                    beacon: {
                        position: 'absolute',
                        top: '0',
                    },

                    beaconOuter: {
                        backgroundColor: 'rgba(0, 139, 139, 0.345)',
                        border: '1px solid rgb(0, 139, 139)',
                    },

                    beaconInner: {
                        backgroundColor: 'rgba(0, 139, 139, 0.645)',
                    },

                    buttonClose: {
                        color: 'red',
                    },

                    buttonSkip: {
                        backgroundColor: 'bisque',
                        color: 'rgb(0, 139, 139)',
                    },
                }}
                locale={{
                    last: 'End tour',
                    skip: 'Close tour',
                }}
            />
        </>
    );
};

export default Tour;
