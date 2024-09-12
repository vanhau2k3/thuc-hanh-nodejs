import express from 'express'
import dotenv from 'dotenv/config'
import date from "./date"
import getURL from "./getURL"
import viewEngine from './viewEngine'
const app = express()
const port = process.env.PORT
viewEngine(app)
app.get('/', (req,res) =>{
    res.send('Hello World!')
})
app.get('/about', (req,res) =>{
    res.send('Hello World!. Page about')
})
app.get('/date', (req,res) =>{
    res.send(date() + "<br>")
})
app.get('/geturl', (req,res) =>{
    
    res.send(getURL.getPath(req) + '<br>' + getURL.getParamsURL(req));
})
app.get('/ejs', (req,res) =>{
    res.render("test")
})
app.get('/', (req,res) =>{
    res.render("home")
})
app.get('/about', (req,res) =>{
    res.render("about")
})
app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})
