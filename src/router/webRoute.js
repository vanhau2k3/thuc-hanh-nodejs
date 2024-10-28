import express from "express";
import getAboutPage from "../controllers/AboutController";
import HomePage from "../controllers/HomeController";
import getContactPage from "../controllers/ContactController";
import middleware from "../middleware";
const router = express.Router();
const initWebRoute = (app) => {
    router.get('/', HomePage.getHomePage);
    router.get('/sign-in', HomePage.getSignInPage);
    router.post('/sign-in', HomePage.signIn);
    router.get('/log-out', middleware.checkLogin, HomePage.logout);
    router.post('/', HomePage.createUser);
    router.get("/update-user/:id",middleware.checkUser, HomePage.getUpdateUser)
    router.get("/detail-user/:id", middleware.checkUser, HomePage.detailUser)
    router.post('/update-user/:id', middleware.checkUser, HomePage.updateUser);
    router.post('/delete-user/:id', middleware.checkUser, HomePage.deleteUser);
    
    router.get('/about', getAboutPage);
    router.get('/contact', getContactPage);
    return app.use('/', router);
}

export default initWebRoute