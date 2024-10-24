import express from 'express'
import dotenv from 'dotenv/config'
import viewEngine from './configs/viewEngine'
import initWebRoute from './route/webRoute'
import bodyParser from "body-parser"
import path from 'path'
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))
viewEngine(app)
initWebRoute(app)
const port = process.env.PORT

app.listen(port, () =>{
    console.log(`Example app listening on port ${port}`)
})