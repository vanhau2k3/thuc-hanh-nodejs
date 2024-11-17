import express from "express"
import getAboutPage from "../controllers/AboutController"
import ApiUserController from "../controllers/ApiUserController"
import ApiGroupController from "../controllers/ApiGroupController"
import ApiProductController from "../controllers/ApiProductController"
import getContactPage from "../controllers/ContactController"
import middleware from "../middleware";
const router = express.Router();
const initApiRoute = (app) => {
    router.get('/get-all-users', ApiUserController.getAllUsers);
    router.get('/get-all-groups', ApiGroupController.getAllGroups);
    router.get('/get-detail-user', ApiUserController.detailUser);
    router.get('/get-list-product/:id', ApiProductController.getProductWithGroup);
    router.get('/get-detail-product/:id', ApiProductController.getDetailProduct);
    router.post('/sign-in', ApiUserController.signIn);
    router.post('/log-out', ApiUserController.logout);
    router.post('/sign-up', ApiUserController.addUser);
    router.put('/update-user/:id', middleware.checkUser, ApiUserController.updateUser);
    router.delete('/delete-user/:id', middleware.checkUser, ApiUserController.deleteUser);
    router.get('/get-all-users', ApiUserController.getAllUsers);
    return app.use('/api', router);
}

export default initApiRoute