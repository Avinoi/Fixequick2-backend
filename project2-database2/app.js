const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

console.log(__dirname);  // Log the current directory path to check the path of authRoutes

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test if we can directly require authRoutes
try {
  const authRoutes = require('./routes/auth');
  console.log('authRoutes imported successfully');
} catch (error) {
  console.error('Error importing authRoutes:', error);
}

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
