// Dependencies
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Serve the main HTML file
app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iraq Data Search</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #2c3e50;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      .container {
        background-color: #34495e;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
      }
      h1 {
        text-align: center;
      }
      form {
        display: flex;
        flex-direction: column;
      }
      input, select, button {
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        border: none;
        font-size: 16px;
      }
      button {
        background-color: #1abc9c;
        color: white;
        cursor: pointer;
      }
      button:hover {
        background-color: #16a085;
      }
      #results {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Iraq Data</h1>
      <form id="searchForm">
        <input type="text" id="fname" placeholder="First Name" required>
        <input type="text" id="fatherName" placeholder="Father Name" required>
        <input type="text" id="gfatherName" placeholder="Grandfather Name" required>
        <select id="city" required>
          <option value="erbil">Erbil</option>
          <option value="sulimane">sulimane</option>
          <option value="kirkuk">Kirkuk</option>
        </select>
        <input type="number" id="birthYear" placeholder="Birth Year" required>
        <button type="submit">Search</button>
      </form>
      <div id="loading" style="display:none;">Loading...</div>
      <div id="results"></div>
    </div>

    <script>
      document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('fname').value;
        const fatherName = document.getElementById('fatherName').value;
        const gfatherName = document.getElementById('gfatherName').value;
        const city = document.getElementById('city').value;
        const birthYear = document.getElementById('birthYear').value;

        document.getElementById('loading').style.display = 'block';

        fetch(\`/search?fname=\${firstName}&fatherName=\${fatherName}&gfatherName=\${gfatherName}&city=\${city}&birthYear=\${birthYear}\`)
          .then(response => response.json())
          .then(data => {
            document.getElementById('loading').style.display = 'none';
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.length > 0) {
              let resultsHtml = '<ul>';
              data.forEach(person => {
                resultsHtml += \`<li>\${person.fname} \${person.fatherName} \${person.gfatherName} - \${person.birthYear}, \${person.city}</li>\`;
              });
              resultsHtml += '</ul>';
              resultsDiv.innerHTML = resultsHtml;
            } else {
              resultsDiv.innerHTML = 'No results found.';
            }
          })
          .catch(error => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('results').innerHTML = 'Error occurred while fetching data.';
            console.error('Error:', error);
          });
      });
    </script>
  </body>
  </html>
  `);
});

// Function to select the right SQLite database
const getDatabaseForCity = (city) => {
  switch (city.toLowerCase()) {
    case 'erbil':
      return new sqlite3.Database('erbil.sqlite');
    case 'sulimane':
      return new sqlite3.Database('sulimane.sqlite');
    case 'kirkuk':
      return new sqlite3.Database('kirkuk.sqlite');
    default:
      return null;
  }
};

// Handle search request
app.get('/search', (req, res) => {
  const { fname, fatherName, gfatherName, city, birthYear } = req.query;
  const db = getDatabaseForCity(city);

  if (!db) {
    return res.status(400).json({ error: 'Invalid city selected' });
  }

  const query = `
    SELECT * FROM people WHERE 
      fname LIKE ? AND 
      fatherName LIKE ? AND 
      gfatherName LIKE ? AND 
      birthYear = ?`;

  db.all(query, [`%${fname}%`, `%${fatherName}%`, `%${gfatherName}%`, birthYear], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});