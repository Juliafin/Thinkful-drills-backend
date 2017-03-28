'use strict';

const express = require('express');
const morgan = require('morgan');
// this will load our .env file if we're
// running locally. On Gomix, .env files
// are automatically loaded.
require('dotenv').config();

const {sendEmail} = require('./emailer');

const {logger} = require('./utilities/logger');
// these are custom errors we've created
const {FooError, BarError, BizzError} = require('./errors');

const app = express();
const {SMTP_URL} = process.env;
const {ALERT_FROM_EMAIL, ALERT_FROM_NAME, ALERT_TO_EMAIL} = process.env
// this route handler randomly throws one of `FooError`,
// `BarError`, or `BizzError`
const russianRoulette = (req, res) => {
  const errors = [FooError, BarError, BizzError];
  throw new errors[
    Math.floor(Math.random() * errors.length)]('It blew up!');
};


app.use(morgan('common', {stream: logger.stream}));

// for any GET request, we'll run our `russianRoulette` function
app.get('/*', russianRoulette);




const emailErrorAlerts = (err, req, res, next) => {

  const emailData = 
{
 from: ALERT_FROM_EMAIL,
 to: ALERT_TO_EMAIL,
 subject: ALERT_FROM_NAME,
 text: "Plain text content",
 html: `
<h1>This email is to let you know that the server crashed the family car!</h1>
      
 <p>The error that was encountered was ${err.stack}.</p>`
};

  if (err instanceof BarError || err instanceof FooError) {
    sendEmail(emailData);
  
  }
  next();
  
  

}


app.use(emailErrorAlerts)




// YOUR MIDDLEWARE FUNCTION should be activated here using
// `app.use()`. It needs to come BEFORE the `app.use` call
// below, which sends a 500 and error message to the client

app.use((err, req, res, next) => {
  // console.log(SMTP_URL)
  // console.log(sendmail)
  logger.error(err);
  res.status(500).json({error: 'Something went wrong'}).end();
});

const port = process.env.PORT || 8080;

const listener = app.listen(port, function () {
  logger.info(`Your app is listening on port ${port}`);
});
