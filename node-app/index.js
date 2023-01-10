const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'docker-challenge-db',
    user: 'root',
    password: 'root',
    database:'docker_nginx_challenge_db'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Test Name')`
connection.query(sql)
connection.end()

const doQuery = (sql) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config)
    connection.query(sql, function (error, result, fields) {
      if (error) return reject(error);
      console.log(result);
      connection.end()
      resolve(result);
    });
  })
}

app.get('/', async (req, res) => {
    try {
      const result = await doQuery("SELECT * FROM people");
      const names = result.map(v => v.name).reduce((prev, curr) => `${prev} <li>${curr}</li>`, '')
      res.send(`<h1>Node App with MySQL</h1><ul>${names}</ul>`)
    } catch (error) {
      res.json(error)
    }
})

app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})
