const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const db = require("./db");

app.use(bodyParser.json());

// 테이블 생성
// db.pool.query(
//   `CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
//   )`,
//   (err, results, fields) => {
//     console.log("results", results);
//   }
// );

app.get("/api/values", function (req, res) {
  // db에서 모든 정보 가져오기
  db.pool.query("SELECT * FROM lists;", (err, results, fields) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// 클라이언트에서 입력한 값을 데이터베이스 lists 테이블에 넣어주기
app.post("/api/value", function (req, res, next) {
  // db에 값 넣어주기
  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}")`,
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      else return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log("애플리케이션 5000번 포트에서 시작됨!");
});
