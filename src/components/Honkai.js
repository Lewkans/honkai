import React from 'react';
import {data} from '../data/honkaidata.js';
import { InputAdornment, TextField, Typography } from '@mui/material';

const Honkai = () => {
    // const MAX_CAPACITY = 180
    const FUEL = 60
    const IMMERSIFIER = 40
    const RATIO = 5
    
    const [currLevel, setCurrLevel] = React.useState(1);
    const [currExp, setCurrExp] = React.useState(0);
    const [currPower, setCurrPower] = React.useState(0);
    const [fuel, setFuel] = React.useState(0);
    const [immersifier, setImmersifier] = React.useState(0);
    const [goalLevel, setGoalLevel] = React.useState(2);
        
    const getEquilibriumLevel = (level) => {
        if (level >= 65) {
            return 6;
        }
        if (level < 20) {
            return 0;
        }
        return Math.floor(level/10) - 1;
    }
    
    const isValidLevel = (level) => {
        return level > 0 &&
            level <= data.exp.length && 
            Number.isInteger(parseInt(level));
    }
    
    const totalExp = (level) => {
        if (!isValidLevel(level)) {
            return 0;
        }
        return data.exp.slice(0, parseInt(level)).reduce((prev, curr) => prev + curr, 0);
    }
    
    const powerExp = (power) => {
        return power * RATIO;
    }
    
    const fuelExp = (n) => {
        return FUEL * n * RATIO;
    }
    
    const immersifierExp = (n) => {
        return IMMERSIFIER * n * RATIO;
    }
    
    const dailyExp = (level) => {
        return 24 * RATIO * 10 + 5 * data.daily[getEquilibriumLevel(level)];
    }
      
    return (
    <>
        <Typography variant='h4'>Trailblazer Experience Calculator</Typography>
        <Typography>Current Level: (Max {data.exp.length - 1})</Typography>
        <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => {
                (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && setCurrLevel(e.target.value)
            }}
            value={currLevel}
            error={!isValidLevel(currLevel)}
            placeholder='Enter your current level'
            onBlur={(e) => {
                (parseInt(e.target.value) >= parseInt(goalLevel)) && setGoalLevel(parseInt(currLevel) + 1)
            }}
        />
        <Typography>Equilibrium Level: {getEquilibriumLevel(currLevel)}</Typography>
        <Typography>Current xp:</Typography>
        <TextField
            InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                endAdornment: <InputAdornment position='end'>/{data.exp[parseInt(currLevel)]}</InputAdornment>
            }}
            onChange={(e) => {
                (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && setCurrExp(e.target.value)
            }}
            value={currExp}
            error={!(currExp >= 0 && currExp < data.exp[parseInt(currLevel)])}
            placeholder='Enter your current exp'
        />
        <Typography>Current power:</Typography>
        <TextField
            InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                endAdornment: <InputAdornment position='end'>/240</InputAdornment>
            }}
            onChange={(e) => {
                (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && setCurrPower(e.target.value)
            }}
            value={currPower}
            error={!(currPower >= 0 && currPower <= 240)}
            placeholder='Enter your current power'
        />
        <Typography>Goal Level: (Max {data.exp.length})</Typography>
        <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => {
                (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && setGoalLevel(e.target.value)
            }}
            value={goalLevel}
            error={!isValidLevel(goalLevel) || parseInt(currLevel) >= parseInt(goalLevel)}
            placeholder='Enter your goal level'
            onBlur={(e) => {
                (parseInt(e.target.value) <= parseInt(currLevel)) && setGoalLevel(parseInt(currLevel) + 1)
            }}
        />
        <Typography>Fuel:</Typography>
        <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => {
                (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && setFuel(e.target.value)
            }}
            value={fuel}
        />
        <Typography>Immersifier:</Typography>
        <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={(e) => {
                (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) && setImmersifier(e.target.value)
            }}
            value={immersifier}
        />
        <Typography>Total exp: {totalExp(goalLevel)}</Typography>
        <Typography>Diff exp: {totalExp(goalLevel) - totalExp(currLevel) - currExp}</Typography>
        <Typography>Daily exp gain (240 Energy + Daily): {dailyExp(currLevel)}</Typography>
        <Typography>Fuel exp: {fuelExp(fuel)}</Typography>
        <Typography>Immersifier exp: {immersifierExp(immersifier)}</Typography>
        <Typography>Time to reach level: ~{
            ((totalExp(goalLevel) - totalExp(currLevel) - currExp - powerExp(currPower) - fuelExp(fuel) - immersifierExp(immersifier))/dailyExp(currLevel) >= 0) ?
            (totalExp(goalLevel) - totalExp(currLevel) - currExp - powerExp(currPower) - fuelExp(fuel) - immersifierExp(immersifier))/dailyExp(currLevel) :
            0
        } days</Typography>
        <Typography variant='h6'>
            Note: Takes full day (24hrs) into account when calculating daily exp gain<br />
            Note2: Doesn't take into account jumping different equilibrium levels (e.g. lvl30 &gt; lvl60) yet
        </Typography>
    </>)
}

export default Honkai;