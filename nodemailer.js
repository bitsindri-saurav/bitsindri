const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

    // create reusable transporter object using the default SMTP transport
    var sendMail = (email, link , typeOfEmail) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false, // true for 465, false for other ports
        secure:true,
        auth: {
            user: 'bitsindri.saurav@gmail.com',
    		pass: 'sindri@123',

        },
        tls: {
          rejectUnauthorized: false
        }
    });

    console.log();

    if(typeOfEmail == "signup"){
        console.log("Signup mail triger");
        ejs.renderFile(path.join(__dirname,'views','mailTemplates','signupEmail.ejs'), {link:link}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mailOptions = {
                    from: '"Bit Sindri Registration " <bitsindri.saurav@gmail.com>', // sender address
    		        to: email, // list of receivers
    		        subject: 'Link for Registration', // Subject line
    		        text: 'Hello world?', // plain text body
    		        html: data
                };
                //console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mailOptions, (error, info) => {
    	        if (error) {
    	            return console.log(error);
    	        }
    	        console.log('Message sent: %s', info.messageId);
    	        // Preview only available when sending through an Ethereal account
    	        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    	        console.log('Message sent: ' + info.response);

    	        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    	        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    	       });
            }

        });
        ejs.renderFile(path.join(__dirname,'views','mailTemplates','signupMailToAdmin.ejs'), {email:email}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mailOptions = {
                    from: '"Signup link generation  " <bitsindri.saurav@gmail.com>', // sender address
                    to: 'sauravkumar329@gmail.com', // list of receivers
                    subject: 'Registration intiated by '+email, // Subject line
                    text: 'Hello world?', // plain text body
                    html: data
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            }

        });

    }
};

module.exports = {sendMail};