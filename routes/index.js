var express = require('express');
var router = express.Router();

var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;
var smtpTransport = MailConfig.SMTPTransport;


router.get('/email/template', (req, res, next) => {
  MailConfig.ViewOption(gmailTransport,hbs);
  let HelperOptions = {
    from: '"Tariqul islam" <tariqul.islam.rony@gmail.com>',
    to: 'tariqul@itconquest.com',
    subject: 'Hellow world!',
    template: 'test',
    context: {
      name:"tariqul_islam",
      email: "tariqul.islam.rony@gmail.com",
      address: "52, Kadamtola Shubag dhaka"
    }
  };
  gmailTransport.sendMail(HelperOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.json(error);
    }
    console.log("email is send");
    console.log(info);
    res.json(info)
  });
});

router.get('/email/smtp/template', (req, res, next) => {
  MailConfig.ViewOption(smtpTransport,hbs);
  let HelperOptions = {
    from: '"Tariqul islam" <tariqul@falconfitbd.com>',
    to: 'tariqul.islam.rony@gmail.com',
    subject: 'Hellow world!',
    template: 'test',
    context: {
      name:"tariqul_islam",
      email: "tariqul.islam.rony@gmail.com",
      address: "52, Kadamtola Shubag dhaka"
    }
  };
  smtpTransport.verify((error, success) => {
      if(error) {
        res.json({output: 'error', message: error})
        res.end();
      } else {
        smtpTransport.sendMail(HelperOptions, (error,info) => {
          if(error) {
            res.json({output: 'error', message: error})
          }
          res.json({output: 'success', message: info});
          res.end();
        });
      }
  })
  
});

module.exports = router;
