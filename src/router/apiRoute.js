import express from "express";
import getAboutPage from "../controllers/AboutController";
import ApiController from "../controllers/ApiUserController";
import getContactPage from "../controllers/ContactController";
import middleware from "../middleware";
const router = express.Router();
const initApiRoute = (app) => {
    router.get('/get-all-users', ApiController.getAllUsers);
    router.get('/get-detail-user/:id', ApiController.detailUser);
    router.post('/sign-in', ApiController.signIn);
    router.post('/log-out', middleware.checkLogin, ApiController.logout);
    router.post('/sign-up', ApiController.addUser);
    router.put('/update-user/:id', middleware.checkUser, ApiController.updateUser);
    router.delete('/delete-user/:id', middleware.checkUser, ApiController.deleteUser);
    return app.use('/api', router);
}


export default initApiRoute