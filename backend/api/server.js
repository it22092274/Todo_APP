const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const todoRoutes = require('./routes/todoRouters.js');
const authRouter = require('./routes/authRoute.js')
const collectionRouter = require('./routes/collectionRoute.js')
const errorHandler = require('./middleware/errorHandler.js');
const logger = require('./utils/logger.js');


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Log all requests
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
  });

// Routes
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRouter);
app.use('/api/collection', collectionRouter);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
