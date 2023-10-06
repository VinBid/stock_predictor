import React, { useState, useEffect } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/csrf/')  // Update the URL to your Django backend
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => console.error('Error fetching CSRF token:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, 
    };

    // Send registration data to the Django backend
    try {
      const response = await fetch('http://localhost:8000/register/', {  // Update the URL
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Registration successful
        console.log('Registration successful');
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
