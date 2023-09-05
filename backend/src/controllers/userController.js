import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        let oldUser = await User.findOne({ userName });
        console.log(oldUser, password)
        if (!oldUser) {
            console.log("Usuario no encontrado")
            let hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({ userName, password:hashedPassword });
            const token = jwt.sign({ userName: newUser.userName, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            return res.status(200).json({ userName, token: token });
        }
        let isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Contraseña erronea" });
        }
        const token = jwt.sign({ userName: oldUser.userName, id: oldUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ userName, token: token });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Algo salió mal" });
    }
    
}

const addScore = async (req, res) => {
    const { userName, score } = req.body;
    try {
        let user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }
        user.score += score;
        user.totalGames += 1;
        await user.save();
        return res.status(200).json({ score: user.score });
    }
    catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
}

const getTopScores = async (req, res) => {
    try {
        let users = await User.find().sort({ score: -1 }).limit(5);
        users = users.map((user) => {
            return { userName: user.userName, score: user.score }
        })
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
}




export default { login, addScore, getTopScores }



