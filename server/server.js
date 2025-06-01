const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// try {
//     const authRoutes = require('./routes/auth');
//     console.log('Auth routes loaded successfully');
    
//     const app = express();
    
//     const PORT = process.env.PORT || 3000;
    
    // Middleware
    // app.use(cors());
    // app.use(bodyParser.json()); 
    // app.use(express.static(path.join(__dirname, '../client/dist/')));
    
    // Basic routes
    // app.get("/", (req, res) => {
    //     res.send("Welcome to the API server!");
    // });
    
    // app.get("/api", (req, res) => {
    //     console.log("GET /api hit");
    //     res.json({ users: ["userOne", "userTwo", "userThree"] });
    // });
    
    // Auth routes
//     app.use('/api/auth', authRoutes);
    
//     // Static file fallback
//     app.get(/^\/(?!api).*/, (req, res) => {
//         res.sendFile(path.join(__dirname, '../client/dist/', 'index.html'));
//     });
    
//     // Error handler
//     app.use((err, req, res, next) => {
//         console.error('Express error handler triggered:', err.stack);
//         res.status(500).json({ message: 'Something went wrong!', error: err.message });
//     });
    
//     // Start server
//     app.listen(PORT, () => {
//         console.log(`Server started on port ${PORT}`);
//     });
// } catch (error) {
//     console.error('Server initialization error:', error);
// }

// process.on('exit', (code) => {
//   console.log(`Process exiting with code: ${code}`);
// });

// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err);
// });

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });

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
