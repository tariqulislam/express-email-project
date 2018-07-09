Example Project for Sending the email to Client by with email templating.

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
GMAIL_USER_NAME = tariqul.islam.rony@gmail.com # email address
GMAIL_USER_PASSWORD = <password> # email address password
```
### For other smtp configuration

```
SMTP_SERVICE_NAME=
SMTP_SERVICE_HOST=
SMTP_SERVICE_SECURE=
SMTP_SERVICE_PORT=
SMTP_USER_NAME=
SMTP_USER_PASSWORD=
```

# Design Template and Send Email...



# Design Form and Send Email

