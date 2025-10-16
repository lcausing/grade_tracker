const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const ANALYTICS_URL = process.env.ANALYTICS_SERVICE_URL || 'http://analytics_service:5003';

app.use(express.static('public'));
app.use(express.json());

app.get('/api/analytics', async (req, res) => {
  try {
    const response = await axios.get(`${ANALYTICS_URL}/analytics`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching analytics:', error.message);
    res.status(500).json({ message: 'Failed to fetch analytics data' });
  }
});

app.listen(PORT, () => {
  console.log(`Show Results service running on port ${PORT}`);
});
