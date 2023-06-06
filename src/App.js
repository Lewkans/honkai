import React from 'react';
import './App.css';
// You have to import image to use it
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Honkai from './components/Honkai';

import { Box, Button, Container, Tab, Tabs, Typography } from '@mui/material';

const App = () => {
  const navigate = useNavigate();
  const [width, setWidth] = React.useState(window.innerWidth);
  const [tab, setTab] = React.useState(0)
  const resize = () => {
    setWidth(window.innerWidth);
  }
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(e, n) => {setTab(n)}}>
          <Tab label={width <= 800 ? 'H' : 'Home'} onClick={() => navigate("/")}/>
          <Tab label={width <= 800 ? 'H' : 'Honkai'} onClick={() => navigate("/honkai")}/>
        </Tabs>
      </Box>
      <Container>
        <Routes>
          <Route
            path="/honkai"
            element={
              <Honkai />
            }
          />
          <Route
            path="/"
            element={
              <Box sx={{ width: '100%'}}>
                <Typography sx={{ color: 'red' }}>
                  Please choose an option from the nav bar
                </Typography>
              </Box>
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
