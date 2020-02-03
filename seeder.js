const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Opening = require('./models/Opening');

// Connect to DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const openings = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/openings.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Opening.create(openings);
    
    console.log('Data Imported...');

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Opening.deleteMany();
    
    console.log('Data Destroyed...');

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}