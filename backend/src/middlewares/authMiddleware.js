
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if(token) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            let user = await User.findOne({email:decodedData?.email});
            if(!user) {
                return res.status(404).json({message:"User doesn't exist"});
            }
            req.user =
            {
                email:decodedData.email,
                id:decodedData.id
            };
            next();

        }
        else {
            res.status(401).send({message:"Token is not valid"})
        }
    } catch (error) {
        res.status(401).send({message:"Token is not valid"})
    }
}

export default authMiddleware;