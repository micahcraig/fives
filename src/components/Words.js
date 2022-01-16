import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import randomColor from 'randomcolor';

const useWordsStyles = makeStyles((theme) => ({
    root: {
        textTransform: 'uppercase'
    },
    word: {
        fontSize: '2em',
        fontWeight: 'bold',
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0.15em',
    }
}));

export const Words = ({words}) => {
    const classes = useWordsStyles();
    return (
        <div className={classes.root}>
            {words.map((w, i) => <span key={`${i}-${w}`} className={classes.word} style={{color: randomColor()}}>{w}</span>)}
        </div>
    );
}
