var express = require('express');
var router = express.Router();

var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;
MailConfig.ViewOption(gmailTransport,hbs);

var smtpTransport = MailConfig.SMTPTransport;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/email/template', (req, res, next) => {
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
        console.log('this is error',error);
        res.json(error)
        res.end();
      } else {
        smtpTransport.sendMail(HelperOptions, (error,info) => {
          if(error) {
            console.log(error);
            res.json(error);
          }
          console.log("email is send");
          console.log(info);
          res.json(info);
          res.end();
        });
      }
  })
  
});

module.exports = router;
