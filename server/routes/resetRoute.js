const {
    signup,
    requestPasswordReset,
    resetPassword,
} = require("../services/authService");
  
const signUpController = async (req, res, next) => {
    const signupService = await signup(req.body);
    return res.json(signupService);
};

const resetPasswordRequestController = async (req, res, next) => {
    try {
        const port = req.app.get('port');
        const requestPasswordResetService = await requestPasswordReset(
            req.body.email,
            req.protocol, req.hostname, port
        );
        return res.json(requestPasswordResetService);
    } catch (error) {
        if (error.message === "Email does not exist") {
            return res.status(400).json({ message: "Email does not exist" });
        } else {
            console.error(error.message);
            return res.status(500).json({ error: "An error occurred" });
        }
    }
};

const resetPasswordController = async (req, res, next) => {
    try {
        const resetPasswordService = await resetPassword(
            req.body.userId,
            req.body.token,
            req.body.password
        );
        return res.json(resetPasswordService);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "The Link has expired. Please request a new one." });
    }
};

const resetRoute = require("express").Router();

const path = require('path');

resetRoute.post("/requestResetPassword", resetPasswordRequestController);
resetRoute.post("/resetPassword", resetPasswordController);
resetRoute.get("/passwordReset", (req, res) => {
    const token = req.query.token;
    const userId = req.query.id;
    const filePath = path.join(__dirname, '..', 'public', 'authpage', 'resetPassword.html');
    res.sendFile(filePath);
});


module.exports = { resetRoute };