import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './configs/viewEngine'
import initWebRoute from './router/webRoute'
import initApiRoute from './router/apiRoute'
import bodyParser from 'body-parser'
import RedisStore from 'connect-redis'
import session from 'express-session'
import { createClient } from 'redis'

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
let redisClient = createClient();
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "keyboard cat",
  })
);

viewEngine(app);
initApiRoute(app);
initWebRoute(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});