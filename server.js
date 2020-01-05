const express = require('express');
const dotenv = require('dotenv');

const openings = require('./routes/openings');

dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers
app.use('/api/v1/openings', openings);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));