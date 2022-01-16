import React from 'react';
import useState from 'react-usestateref';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

const textFieldStyle = {
    margin: '0.1em',
    fontSize: '2.5em',
    fontWeight: 'bolder',
    borderRadius: 0,
    '& input': {
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: '0.25em',
        color: 'white',
        width: '1em',
        height: '1em'
    }
};
const YELLOW = "#ffff9a";
const GREEN = "#6aaa64";
const YellowGreenSwitch = withStyles({
    switchBase: {
        color: YELLOW,
        '&$checked': {
            color: GREEN,
        },
        '&$checked + $track': {
            backgroundColor: GREEN,
        }
    },
    checked: {},
    track: {}
})(Switch);

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0 !important'
    },
    defaultTextField: {
        "& .MuiFilledInput-root": {
            ...textFieldStyle
        }
    },
    yellow: {
        "& .MuiFilledInput-root": {
            ...textFieldStyle,
            background: YELLOW
        },
    },
    green: {
        "& .MuiFilledInput-root": {
            ...textFieldStyle,
            background: GREEN
        },
    },
}))

const valueSplit = v => v ? v.split('') : [];

export const CharPerField = ({value, onChange, textFieldClassName}) => {
    const classes = useStyles();

    if (! textFieldClassName) textFieldClassName = classes.defaultTextField;

    const changeValue = event => {
        const newValue = event.target.value + value;
        onChange(newValue);
    }
    const onKeyUp = event => {
        if([8, 46].includes(event.keyCode)) { // backspace and delete
            onChange(value.substring(1));
        }
    }

    return (
    <>
        <TextField variant="filled" className={textFieldClassName} value={''} onKeyUp={onKeyUp} onChange={changeValue}/>
        {valueSplit(value).map((v, i) => (
            <TextField key={i} disabled variant="filled" className={textFieldClassName} value={v} />
        ))}
    </>);
};

export const YellowGreen = ({index, changeGreen, changeYellow, greenValue, yellowValue}) => {
    const classes = useStyles();
    const [isGreen, setIsGreen] = useState(false);

    const handleToggle = () => setIsGreen(!isGreen);

    const indexedChangeYellow = (value) => changeYellow(index, value);

    return (
        <Grid className={classes.root} item xs={2}>
            <YellowGreenSwitch className={classes.toggle} 
                    inputProps={{ 'aria-label': 'primary checkbox'}} 
                    onChange={handleToggle} />
            {isGreen 
                ? <TextField className={classes.green} 
                             variant="filled" 
                             value={greenValue} 
                             onChange={(e) => changeGreen(index, e.target.value)} />
                : <CharPerField textFieldClassName={classes.yellow} 
                                value={yellowValue} 
                                onChange={indexedChangeYellow} />
            }
        </Grid>
    );
};
