const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: compiledTemplate(payload),
            };
        };

        transporter.sendMail(options(), (error, info) => {
        if (error) {
            return error;
        } else {
            return res.status(200).json({
            success: true,
            });
        }
        });
    } catch (error) {
        return error;
    }
};

module.exports = sendEmail;