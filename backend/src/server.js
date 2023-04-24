const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();

// pieslēdzamies mūsu DB
const database = new sqlite3.Database("./src/db/database.db");

// inicializējam express appu
const app = express()

// ļaujam piekļūt serverim no citiem domēniem
app.use(cors({
  origin: '*'
}))

// ļaujam no FE sūtīt jsonu
app.use(bodyParser.json());

// uz servera palaišanu
database.serialize(() => {
  // create the projects table if it doesn't exist
  database.run(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY,
      dish_name VARCHAR(255) NOT NULL,
      dish_descr VARCHAR(255) NOT NULL,
      price INTEGER(64)
    );
  `);
  });


// Atgriež visus projektus no DB
app.get('/menu', (req, res) => {
    // database.get atgriež tikai vienu pirmo atrasto rezutlātu
      // database.all atgriež visus atrastos rezultātus
  database.all('SELECT * FROM menu', (error, menu) => {
    res.json(menu)
  })
})

// POST http://localhost:3004/menu
// pievieno jaunu edienu
app.post('/menu', (req, res) => {
  database.run(`
    INSERT INTO menu (dish_name, dish_descr, price)
    VALUES("${req.body.dish_name}", "${req.body.dish_descr}", "${req.body.price}");
  `, () => {
    res.json('New dish added successfully!')
  })
})


app.delete('/menu/:id', (req, res) => {
  database.run(`DELETE FROM menu WHERE id = ${req.params.id}`, () => {   
    res.json('Dish deleted!')
  })
})

// palaižam serveri ar 3004 portu
app.listen(3004, () => {
  console.log(`Example app listening on port 3004`)
})

