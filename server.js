const express = require('express'); //Fast, unopinionated, minimalist web framework for node.
const dotenv = require('dotenv'); //loads environment variables from a .env file into process.env
const morgan = require('morgan'); //HTTP request logger middleware for node.js
const connectDB = require('./config/db');
const exphbs  = require('express-handlebars');

// Load env variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route
const openings = require('./routes/openings');

// Create an express application
const app = express();

// Include static files
app.use(express.static(__dirname + '/public'));

// Register a Handlebars view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/openings', openings);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, 
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
// 捕獲未處理的 Promise 錯誤方法
process.on('unhandledRejection', (err, promise) => {
    console.log(`Errors: ${err.message}`);
    // Close server
    server.close(() => process.exit(1));
});