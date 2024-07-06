import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router >
      <CssBaseline />
      <AppBar position="static" color="primary" sx={{background:"linear-gradient(to right top, #212123, #2a2f39, #2a4050, #215364, #076673)"}}>
        <Toolbar >
          <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: 'center',fontSize:"2em", fontWeight:500,paddingX:"2%",letterSpacing:"5px" }}>
            USER INFORMATION
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Container >
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/second" element={<SecondPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Box>
      <Box component="footer" sx={{  color: 'white', py: 2, textAlign: 'center',background:"linear-gradient(to right top, #212123, #2a2f39, #2a4050, #215364, #076673)" }}>
        <Typography variant="body1">© 2024 User Information</Typography>
      </Box>
    </Router>
  );
};

export default App;
