import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { TextField, Button, MenuItem, Typography, Grid } from '@mui/material';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const Application = () => {
  const [formData, setFormData] = useState({
    livestockType: '',
    quantity: '',
    feedType: '',
    drugType: '',
  });

  const [livestockTypes, setLivestockTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch available livestock types from the backend
  useEffect(() => {
    const fetchLivestockTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/applications/create'); // Adjust the endpoint as needed
        const availableTypes = response.data.map((product) => ({
          value: product.name.toLowerCase(),
          label: product.name,
        }));
        setLivestockTypes(availableTypes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching livestock types:', error);
        setLoading(false);
      }
    };

    fetchLivestockTypes();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/applications/', formData);
      if (response.status === 201) {
        alert('Application submitted successfully!');
        setFormData({
          livestockType: '',
          quantity: '',
          feedType: '',
          drugType: '',
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit the application. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Background Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />

      {/* Form Container */}
      <div className="flex-1 flex justify-center items-center relative z-10 p-6">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h5" className="text-center mb-6 text-gray-100">
            <Header title="Apply For Livestock" />
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                select
                label="Livestock Type"
                name="livestockType"
                value={formData.livestockType}
                onChange={handleChange}
                fullWidth
                className="bg-gray-700 text-gray-100 rounded-lg"
                disabled={loading}
              >
                {livestockTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value} className="text-gray-100">
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                className="bg-gray-700 text-gray-100 rounded-lg"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Feed Type"
                name="feedType"
                value={formData.feedType}
                onChange={handleChange}
                fullWidth
                className="bg-gray-700 text-gray-100 rounded-lg"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Drug Type"
                name="drugType"
                value={formData.drugType}
                onChange={handleChange}
                fullWidth
                className="bg-gray-700 text-gray-100 rounded-lg"
              />
            </Grid>

            <Grid item xs={12}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  className="bg-blue-600 text-white font-semibold rounded-lg"
                >
                  Submit Application
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </motion.form>
      </div>
    </div>
  );
};

export default Application;
