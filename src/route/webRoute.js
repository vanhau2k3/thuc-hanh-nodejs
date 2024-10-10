import express from 'express'
import getHomePage from '../controllers/HomeController'
import aboutPage from '../controllers/AboutController'
import contactPage from '../controllers/ContactController'
const router = express.Router()
const initWebRoute = (app) =>{
    router.get('/', getHomePage)     
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    return app.use('/', router)
}
export default initWebRouter