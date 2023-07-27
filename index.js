const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

const port = 3069;

app.listen(port);
app.use(express.json());
app.use(
  cors({
    Credential: true,
    origin: "http://localhost:3000",
  })
);

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_sekolah",
});

app.get("/admin", (req, res) => {
  let sqlQuery = `SELECT * FROM admin`;

  con.query(sqlQuery, (err, rows) => {
    try {
      res.json(rows);
    } catch (error) {
      res.json(err);
    }
  });
});

app.get("/admin/:id", (req, res) => {
  const id = req.params.id;

  let sqlQuery = `SELECT * FROM admin WHERE id_admin = ${id}`;

  con.query(sqlQuery, (err, rows) => {
    res.json(rows[0]);
  });
});

app.get("/mading", (req, res) => {
  const sqlQuery = `SELECT * FROM mading`;

  con.query(sqlQuery, (err, rows) => {
    res.json(rows);
  });
});

app.get("/mading/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = `SELECT * FROM mading WHERE id_mading = ${id}`;

  con.query(sqlQuery, (err, rows) => {
    res.json(rows[0]);
  });
});

app.post("/mading", (req, res) => {
  const judul_mading = req.body.judul_mading;
  const isi_mading = req.body.isi_mading;

  console.log(req.body);

  const sqlQuery = `INSERT INTO mading (judul_mading, isi_mading) VALUES ('${judul_mading}', '${isi_mading}')`;

  con.query(sqlQuery, (err, rows) => {
    try {
      res.json(rows);
    } catch (error) {
      res.json(err);
    }
  });
});

app.delete("/mading/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = `DELETE FROM mading WHERE id_mading = ${id}`;
  con.query(sqlQuery, (err, rows) => {
    res.json(rows);
  });
});

app.put("/mading", (req, res) => {
  const id = req.body.id_mading;
  const judul_mading = req.body.judul_mading;
  const isi_mading = req.body.isi_mading;

  console.log(req.body);
  const VALUES = {
    judul_mading,
    isi_mading,
  };

  const sqlQuery = `UPDATE mading SET ? WHERE id_mading = ${id}`;
  con.query(sqlQuery, VALUES, (err, rows) => {
    res.json();
  });
});

app.get("/komentar", (req, res) => {
  const sqlQuery = `SELECT * FROM komentar JOIN mading ON komentar.id_mading = mading.id_mading`;

  con.query(sqlQuery, (err, rows) => {
    res.json(rows);
  });
});

app.get("/komentar/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = `SELECT * FROM komentar WHERE id_mading = ${id}`;

  con.query(sqlQuery, (err, rows) => {
    try {
      res.json(rows);
    } catch (error) {
      res.json(err);
    }
  });
});

app.delete("/komentar/:id", (req, res) => {
  const id = req.params.id;

  const sqlQuery = `DELETE FROM komentar WHERE id_komentar = ${id}`;
  con.query(sqlQuery, (err, rows) => {
    res.json(rows);
  });
});

app.post("/komentar", (req, res) => {
  const id_mading = req.body.id_mading;
  const email_komen = req.body.email_komen;
  const nama_komen = req.body.nama_komen;
  const isi_komen = req.body.isi_komen;

  console.log(req.body);
  const sqlQuery = `INSERT INTO komentar (id_mading, email_komen, nama_komen, isi_komen) VALUES (${id_mading}, '${email_komen}', '${nama_komen}', '${isi_komen}')`;

  con.query(sqlQuery, (err, rows) => {
    try {
      res.json(rows);
    } catch (error) {
      res.json(err);
    }
  });
});

app.get("/laporan", (req, res) => {
  const sqlQuery = `SELECT * FROM mading`;

  con.query(sqlQuery, (err, rows) => {
    console.log({rows})
    
    // const queryKomen = `SELECT * FROM komentar WHERE id_mading = ${rows.id_mading}`
    // con.query(queryKomen, (err, rows) => {
    //   res.json(rows)
    // })
    
    res.json(rows);
  });
});

