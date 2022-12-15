if(process.env.NODE_ENV !== 'production') { //if we are running in development mode
    require('dotenv').config();//require dotenv which takes the variables defined in .env file
}
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);
const bodyParser = require('body-parser');
const cors = require('cors');
const Painting = require('../models/Painting');

const nodemailer = require('nodemailer');

const PASSWORD = process.env.NODEMAILER_APP_PASSWORD;
const USER = process.env.NODEMAILER_USER;
const RECIPIENT = process.env.NODEMAILER_RECIPIENT;
const checkoutRouter = express.Router();

checkoutRouter.use(bodyParser.json());

checkoutRouter.route('/')
.post(cors(), async(req, res) => {
    
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id, receipt_email, cartItems, _id, firstname, lastname, addressLine1, addressLine2, city, region, country, postal_code} = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id); 
  
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'EUR',
            description: "Shirley's Art Studio",
            payment_method: id,
            confirm: true,
            receipt_email: receipt_email,
 
            
        });

        console.log('stripe-routes.js 19 | payment', payment);
        res.json({
            message: 'Payment Successful',
            success: true,
        });
     
        if(cartItems) {
            await Painting.updateMany({_id: cartItems}, {$set: {"isAvailable": false}});
        
        }
        else {
        
            await Painting.updateOne({id: _id}, {$set: {'isAvailable': false}});
        
        }   
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: USER,
              pass: PASSWORD
            }
        });
          
        const mailOptions = {
            from: USER,
            to: RECIPIENT,
            subject: 'Customer Receipt',
            text: 'Customer Receipt',
            html: `<div><p><b>First Name:</b> ${firstname}</p></br>
                   <p><b>Last Name:</b> ${lastname}</p></br>
                   <p><b>Email:</b> ${receipt_email}</p></br>
                   <p><b>Address Line 1:</b> ${addressLine1}</p></br>
                   <p><b>Address Line 2:</b> ${addressLine2}</p></br>
                   <p><b>City:</b> ${city}</p></br>
                   <p><b>Region:</b> ${region}</p></br>
                   <p><b>Country:</b> ${country}</p></br>
                   <p><b>Postal Code:</b> ${postal_code}</p>
                   </div>`
        };
        
    
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                    return console.log(error);
            } else {
                    console.log('Email sent: ' + info.response);
                    res.render('Success!');
            }
        });

    }
    catch(error) {
        console.log('stripe-routes.js 17 | error', error);
        res.json({
            message: 'Payment Failed',
            success: false,
        });
    }

    
    
});

checkoutRouter.route('/')
.put(cors(), async(req, res) => {
    let { cartItems } = req.body;

    Painting.findOneAndUpdate({_id: cartItems}, {$set: {"isAvailable": false}})
});

module.exports = checkoutRouter;