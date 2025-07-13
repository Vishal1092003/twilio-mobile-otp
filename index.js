const express= require("express")
const app=express()


const accountSid = '';
const authToken = '';

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'hack kar lengein',
    to: '+917292994406', // Text your number
    from: '+15183270051', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));







app.listen(8080,()=>{
    console.log("server runing at 8080");
})