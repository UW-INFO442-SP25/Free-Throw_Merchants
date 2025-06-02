const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

try {
  const authRoutes = require('./routes/auth');
  console.log('Auth routes loaded successfully');
  app.use('/api/auth', authRoutes);
} catch (error) {
  console.error('Failed to load auth routes:', error);
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

// fallback
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error('Express error handler triggered:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
