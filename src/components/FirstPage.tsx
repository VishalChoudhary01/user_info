import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = () => {
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);

    if (name && isPhoneValid && isEmailValid) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/second');
    } else {
      setShowAlert(true);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(!validatePhone(value));
    setShowAlert(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
    setShowAlert(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      <Container maxWidth="sm" style={{ flexGrow: 1, borderRadius: '20%' }}>
        <Paper elevation={8} sx={{ py: 4, px: 10, background: '#EEE' }}>
          <Typography variant="h5" gutterBottom>
            User Information
          </Typography>
          {showAlert && (
            <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
              Please fill in all fields with valid information
            </Alert>
          )}
          <TextField
            id="name"
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            id="phone"
            label="Mobile No"
            variant="standard"
            value={phone}
            onChange={handlePhoneChange}
            error={phoneError}
            helperText={phoneError ? 'Please enter a valid 10-digit phone number' : ''}
            fullWidth
            margin="normal"
          />
          <TextField
            id="email"
            label="Email Id"
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? 'Please enter a valid email address' : ''}
            fullWidth
            margin="normal"
          />
          <Box sx={{ mt: 4 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default FirstPage;
