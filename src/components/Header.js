import React from 'react';

import ReplayIcon from '@material-ui/icons/Replay';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textTransform: 'uppercase',
        width: '100%',
        padding: '1em',
        borderBottom: '1px solid grey',
        letterSpacing: '1em',
        '& h1': {
            fontSize: '2em',
            fontWeight: 'bold',
            display: 'block',
            textAlign: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            pointerEvents: 'none'
        },
        '& button': {
            display: 'flex',
            cursor: 'pointer',
            marginLeft: 'auto'
        },
    }
}));

export const Header = ({reset}) => {
    const classes = useStyles();

    return (
        <header className={classes.root}>
            <h1>Fives</h1>
            <button>
                <ReplayIcon onClick={reset}/>
            </button>
        </header>
    );
};