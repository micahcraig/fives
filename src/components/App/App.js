import React from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';

import { Fives } from '../Fives';

function App() {
  return (
    <Container maxWidth="sm" className="App">
      <Paper>
        <Fives/>
      </Paper>
    </Container>
  );
}
export default App;
