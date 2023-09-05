import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.post('/login', (req, res) => {
    userController.login(req, res);
});

router.get ('/topScores', (req, res) => {
    userController.getTopScores(req, res);
    
})

router.post ('/addScore', (req, res) => {
    userController.addScore(req, res);
})

export default router;
