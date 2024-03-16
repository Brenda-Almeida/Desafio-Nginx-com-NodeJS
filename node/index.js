const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `CREATE TABLE IF NOT EXISTS people(id int auto_increment primary key, name varchar(100) not null);`;
connection.query(sql);
const sqlInsert = `INSERT INTO people(name) values('Brenda');`;
connection.query(sqlInsert);
connection.end();

app.get("/", (req, res) => {
  const connection = mysql.createConnection(config);

  const sqlSelect = `SELECT name FROM people;`;

  connection.query(sqlSelect, (error, results, fields) => {
    if (error) {
      return res.status(500).send("Erro ao buscar nomes no banco de dados");
    }

    const namesList = results.map((result) => result.name);

    const responseHTML = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
      ${namesList.map((name) => `<li>${name}</li>`).join("")}
    </ul>
    `;

    res.send(responseHTML);
  });
});
app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
