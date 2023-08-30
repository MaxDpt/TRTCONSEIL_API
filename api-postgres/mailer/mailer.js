// import nodemailer
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const result = dotenv.config();

// ---> GET USER TOKEN :
exports.sendEmail  = async (req, emailText) => { 
        try {
          // ---> mailer paramatères : 
            const transporter = nodemailer.createTransport({
                host: process.env.MAILER_HOST,
                port: process.env.MAILER_PORT,
                secure: true,
                auth: {
                  user: process.env.MAILER_AUTH_USER,
                  pass: process.env.MAILER_AUTH_PASS
                }
              });
          // ---> mailer info : 
              const info = await transporter.sendMail({
                from: `"TRT Conseil" <${process.env.MAILER_AUTH_USER}>`, 
                to: `${process.env.MAILER_AUTH_USER}, 
                     ${req.body.email}`,
                subject: `${emailText.Obj}`, 
                html: `<body>
                        <p> ${emailText.Text_line01} </p>
                        <p> ${emailText.Text_line02} </p>
                        <p> ${emailText.Text_Sign01} </p>
                        <p> ${emailText.Text_Sign02} </p>
                       </body>`, 
              });
          // ---> Retour de la prommesse Resolve : 
              return new Promise( function (resolve, reject) {
                resolve({
                    status : "Email envoyé",
                    destinate : info.envelope})
              }) }
          // ---> Retour de la prommesse Reject : 
            catch (error){ return new Promise( function (resolve, reject) {
                reject(error)
              }) }
        
}