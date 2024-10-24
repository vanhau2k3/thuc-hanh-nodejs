import express from 'express'
import getHomePage from '../controllers/HomeController'
import getAboutPage from '../controllers/AboutController'
import contactPage from '../controllers/ContactController'
import AddUserPage from '../controllers/AddUserController'
const router = express.Router()
const initWebRoute = (app) =>{
    router.get('/', getHomePage)     
    router.get('/about', getAboutPage)
    router.get('/contact', contactPage)
    router.get('/addUser', AddUserPage.getAddUserPage)
    router.post('/addUser', AddUserPage.createUser)
    router.get('/detail-user/:usename', AddUserPage.detailUser)
    router.post('/delete-user', AddUserPage.deleteUser)
    return app.use('/', router)
}




export default initWebRoute
