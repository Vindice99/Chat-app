import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    })

    //send jwt in cookie
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // in MS
        httpOnly: true, // prevent XSS attacks cross-stie scripting attacks
        sameStie: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
    return token;
}