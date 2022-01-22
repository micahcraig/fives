import React from 'react';
import useState from 'react-usestateref';
import { sampleSize as _sampleSize } from 'lodash';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';

import { Header } from './Header';
import { Words } from './Words';
import { CharPerField, YellowGreen } from './Letters';

import { fives } from '../lib/fives';
import { words as WORDS } from '../lib/wordlist';

const DEFAULT_GREY = '';
const DEFAULT_GREEN = ['', '', '', '', ''];
const DEFAULT_YELLOW = ['', '', '', '', ''];
const DEFAULT_RANDOM_WORDS = 500;

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'sans',
        display: 'flex',
        width: '100%',
        '& .MuiGrid-root': {
            paddingTop: '1em'
        }
    },
}));

const randomWords = (words = WORDS, n = DEFAULT_RANDOM_WORDS, ) => _sampleSize(words, n);

export const Fives = () => {
    const classes = useStyles();
    const [greyLetters, setGreyLetters, greyRef] = useState(DEFAULT_GREY);
    const [greenLetters, setGreenLetters, greenRef] = useState(DEFAULT_GREEN);
    const [yellowLetters, setYellowLetters, yellowRef] = useState(DEFAULT_YELLOW);

    const [matchedWords, setMatchedWords] = useState(randomWords());

    const reset = () => {
        setGreyLetters(DEFAULT_GREY);
        setGreenLetters(DEFAULT_GREEN);
        setYellowLetters(DEFAULT_YELLOW);
        setMatchedWords(randomWords());
    }

    const updateMatchedWords = () => setMatchedWords(
        fives(
            greyRef.current, 
            greenRef.current, 
            yellowRef.current
        )
    );

    const changeGrey = value => {
        setGreyLetters(value);

        updateMatchedWords();
    }

    const changeState = (setFn, collection) => (i, value) => {
        setFn(Object.assign([], collection, {[i]: value}));
        updateMatchedWords();
    }
    const changeGreen = changeState(setGreenLetters, greenLetters);
    const changeYellow = changeState(setYellowLetters, yellowLetters);

    return (
        <Grid className={classes.root} container>
            <Header reset={reset}/>
            <Grid item xs={12}>
                <CharPerField 
                    id="grey-letters" 
                    label="Grey Letters" 
                    value={greyLetters}
                    onChange={changeGrey} />
            </Grid>

            <Grid container justifyContent="center" spacing={2}>
                {[...greenLetters.keys()].map(i => 
                    <YellowGreen key={i} 
                                 index={i} 
                                 changeGreen={changeGreen} 
                                 changeYellow={changeYellow} 
                                 greenValue={greenLetters[i]} 
                                 yellowValue={yellowLetters[i]} />
                )}
            </Grid>

            <Grid item xs={12}>
                <Words words={randomWords(matchedWords)} />
            </Grid>
        </Grid>
    );
}

/*
                <TagCloud maxSize={60} minSize={60} tags={randomWords(DEFAULT_RANDOM_WORDS, matchedWords).map(w => ({value: w, count: 25}))}/>

*/