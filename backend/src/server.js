  const express = require('express')
  const bodyParser = require('body-parser')
  const cors = require('cors')
  const sqlite3 = require('sqlite3').verbose();
  const multer = require('multer');

  // pieslēdzamies mūsu DB
  const database = new sqlite3.Database("./src/db/database.db");

  // inicializējam express appu
  const app = express()

  // ļaujam piekļūt serverim no citiem domēniem
  app.use(cors({
    origin: '*'
  }))

  // ļaujam no FE sūtīt jsonu
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

  // uz servera palaišanu
  database.serialize(() => {
    // create the menu table if it doesn't exist
    database.run(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY,
        dish_name VARCHAR(255) NOT NULL,
        dish_descr VARCHAR(255) NOT NULL,
        price INTEGER(64),
        dish_img BLOB
      );
    `);
  });


  // configure multer for handling image uploads
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit to 5 MB
  });
  

  // Atgriež visus ēdienus no DB
  app.get('/menu', (req: any, res: any) => {
    database.all('SELECT * FROM menu', (error: any, menu: any) => {
      res.json(menu)
    })
  })

  // POST http://localhost:3004/menu
  // pievieno jaunu ēdienu
  app.post('/menu', upload.single('dish_img'), (req: any, res: any) => {
    database.run(`
      INSERT INTO menu (dish_name, dish_descr, price, dish_img)
      VALUES (?, ?, ?, ?);
    `, [req.body.dish_name, req.body.dish_descr, req.body.price, req.file.buffer], (error: any) => {
      if (error) {
        console.error(error.message);
        res.status(500).send('Error adding dish to menu');
      } else {
        res.json('New dish added successfully!')
      }
    })
  })

  app.delete('/menu/:id', (req: any, res: any) => {
    database.run(`DELETE FROM menu WHERE id = ${req.params.id}`, () => {   
      res.json('Dish deleted!')
    })
  })

  // palaižam serveri ar 3004 portu
  app.listen(3004, () => {
    console.log(`Example app listening on port 3004`)
  })

