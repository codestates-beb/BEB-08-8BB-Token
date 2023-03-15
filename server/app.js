const express = require('express');
const cors = require('cors');
const session = require('express-session');
const fs = require('fs');
const https = require('https');
const routes = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

//쿠키설정
app.use(
  session({
    secret: '@8bbtoken',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors 설정
app.use(cors({
  methods: 'GET, POST, OPTIONS',  
  //cookie 전송시 필요 설정
  origin : true, //or 'https://localhost:PORT'
  credentials: true,
}));

//routes
app.use("/", routes);

//https 서버 설정
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app
    )
    .listen(PORT);
} else {
  server = app.listen(PORT)
}
module.exports = server;