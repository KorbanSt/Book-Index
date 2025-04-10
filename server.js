// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to get stored data (we'll store it in a JSON file)
app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load data' });
    }
    res.json(JSON.parse(data));
  });
});

// Route to save data
app.post('/data', (req, res) => {
  const newData = req.body;

  // Read current data from the file
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load data' });
    }

    let dataObj = JSON.parse(data);
    dataObj.push(newData); // Add new data to the array

    // Save updated data back to file
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(dataObj, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save data' });
      }
      res.status(200).json({ message: 'Data saved successfully' });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
