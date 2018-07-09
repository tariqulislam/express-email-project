Email sending to client is requirment for every morden project. Sending email from node js application with template is most common feature now a days.In this project, i have build  functionality which will help the developer to configure the email sending functionality with template very easily. I have use the ```express js``` and ```nodemailer``` and my own custom mail configuration to sending the email through ```gmail smtp``` and shared hosting ```email smtp```.

# Prerequisites
1. nodemailer
2. nodemailer-express-handlebars
3. dotenv

# Installations

1. Clone the Git repository git clone https://github.com/tariqulislam/express-email-project
2. Run command: For npm ```npm install``` for yarn ```yarn install```

# Configure the smtp server or email Server

There is a ```.env``` file at root of the project, you just change the environment variable for email server

###For Gmail configuration
```
GMAIL_SERVICE_NAME = gmail # service name
GMAIL_SERVICE_HOST = smtp.gmail.com # service host name
GMAIL_SERVICE_SECURE = false # Service security
GMAIL_SERVICE_PORT = 587 # service port
GMAIL_USER_NAME = <email> # email address
GMAIL_USER_PASSWORD = <password> # email address password
```
### Add html Template for email templating to ```views/email/test.hbs``` file:
```html
<h1>You Node mailer is working</h1>
<p>
    Your Name: {{name}}
    <br/>
    Your address: {{address}}
    <br/>
    Your Email: {{email}}
</p>
```

# Send Email By with email template

For testing purpose, we will create ```get``` request for sending the email through ```Gmail``` smtp


### Configure the gmail to less secure for sending email through gmail account
1. Turn on the less secure app from this link https://myaccount.google.com/lesssecureapps

### Then add the ```express-nodmailer-handlebars``` to ```routes/index.js``` and ```email.js``` file from ```config->email.js```

```html
routes/index.js
```

```javascript
var MailConfig = require('../config/email');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;
```

```javascript
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
```
After that add html template support to when sending the email we will call the ```MailConfig.viewOption()``` function at express router ```get``` request function at ```routes/index.js``` file.

```javascript
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
```
```HelperOptions``` object is simple configuration object for email templating
1. ```form``` value will be, from which email address sends the email (sender name)
2. ```to``` value will be, Receiver email address
3. ```subject``` email subject
4. ```template``` this will be .hbs template which will be create in ``views/email/``` folder
5. ```context``` will the arguments or paramter to send the dynamic value to template

```javascript
gmailTransport.sendMail(HelperOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.json(error);
    }
    console.log("email is send");
    console.log(info);
    res.json(info)
  });
```
```gmailTransport.sendMail``` is the ```nodemailer``` default function to send email to sender address,
it takes two arguments:
1. HelperOptions (simple template configuration object)
2. ```error_first_callback``` function which contains (error, success) arguments

### we will use ```postman``` to test the function for mail sending by gmail smtp
1. From command line or cmd run command: for npm ```npm run start``` for yarn ```yarn start```
2. Hit the url at ```postman``` with ```get``` request http://localhost:3000/email/template
3. the result will be:
![alt text](https://github.com/tariqulislam/express-email-project/blob/master/gmailtest.jpg)

# Send email through the own SMTP server:

# Send Email By and Create Template

For testing purpose, we will create ```get``` request for sending the email through own smtp server

### For testing purpose i get the custom smtp information from my shared hosting site by ```cpanel```:
1. Go to Email account sections
![alt text](https://github.com/tariqulislam/express-email-project/blob/master/emailclient2.jpg)
2. Select Email and you will be option ```email client configuration```
![alt text](https://github.com/tariqulislam/express-email-project/blob/master/emailclient3.jpg)
3. Then get the shared hosting smtp account mail server information for account
![alt text](https://github.com/tariqulislam/express-email-project/blob/master/emailclient1.jpg)
4. After that configure the smtp email to ```.env``` file:

### For other smtp configuration

```
SMTP_SERVICE_HOST=<smtp host name>
SMTP_SERVICE_SECURE=<conection is secure or not>
SMTP_SERVICE_PORT=<smtp port>
SMTP_USER_NAME=<email Address>
SMTP_USER_PASSWORD=<password>
```
## Sample code for sending email by own smtp
```javascript
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
```
1. Configure the email template like ```gmailTransport``` by calling ```MailConfig.viewOption()``` method ```MailConfig.ViewOption(smtpTransport,hbs);```
2. Configure the email template Helper Option Object to sending the email through smtp email:
```javascript
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
```
```HelperOptions``` object is simple configuration object for email templating
  1. ```form``` value will be, from which email address sends the email (sender name)
  2. ```to``` value will be, Receiver email address
  3. ```subject``` email subject
  4. ```template``` this will be .hbs template which will be create in ``views/email/``` folder
  5. ```context``` will the arguments or paramter to send the dynamic value to template

```javascript
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
```

3. ```smtpTransport.verify()``` method will check the smtp sever connection is valid and ping to server to all is okay for server
4. ```smtpTransport.sendMail``` is work like ```gmailTransport.sendMail``` function

### we will use ```postman``` to test the function for mail sending by own smtp
1. From command line or cmd run command: for npm ```npm run start``` for yarn ```yarn start```
2. Hit the url at ```postman``` with ```get``` request http://localhost:3000/email/smtp/template
3. the result will be:
![alt text](https://github.com/tariqulislam/express-email-project/blob/master/emailclient5.jpg)





