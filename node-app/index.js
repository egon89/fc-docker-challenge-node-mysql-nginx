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

const insertRandomName = async () => {
  const randomName = Math.random().toString(36).substring(2,7) + ' ' + Math.random().toString(36).substring(2,7)
  const sql = `INSERT INTO people(name) values('${randomName}')`
  await doQuery(sql);
}

insertRandomName()
    .then(result => console.log('Random name inserted!'))
    .catch(error => console.error('Error to insert random name'))

app.get('/', async (req, res) => {
    try {
      insertRandomName();
      const result = await doQuery("SELECT * FROM people");
      const names = result.map(v => v.name).reduce((prev, curr) => `${prev} <li>${curr}</li>`, '')
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`)
    } catch (error) {
      res.json(error)
    }
})

app.listen(port, ()=> {
    console.log(`Running on port ${port}`)
})
