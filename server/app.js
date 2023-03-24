const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const fs = require('fs');
const https = require('https');
const routes = require('./routes');
const erc20 = require('./services/web3.erc20.services');
const erc721 = require('./services/web3.erc721.services');
const dataStore = require('./services/web3.datastore.services');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

//init
(async() => {
  try {
    const re1 = await erc721.setToken(process.env.ERC20_CONTRACT_ADDRESS);
    const re2 = await erc20.setDataStore(process.env.DATASTORE_CONTRACT_ADDRESS);
    const re3 = await erc721.setDataStore(process.env.DATASTORE_CONTRACT_ADDRESS);
    const re4 = await dataStore.approve(process.env.ERC20_CONTRACT_ADDRESS);
    const re5 = await dataStore.approve(process.env.ERC721_CONTRACT_ADDRESS);
    if(!re1 || !re2 || !re3 || !re4 || !re5) throw new Error('init error!');
    console.log("init success!")
  } catch (e) {
    console.log(e);
  }
})();

//세션,쿠키설정
app.use(
  session({
    secret: '@8bbtoken',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 20 * 60 * 1000, 
      sameSite: "none",
      httpOnly: true,
      secure: true,
    },
  })
);

app.use(cookieParser());
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