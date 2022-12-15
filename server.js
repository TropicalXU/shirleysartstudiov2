if(process.env.NODE_ENV !== 'production') { //if we are running in development mode
    require('dotenv').config();//require dotenv which takes the variables defined in .env file
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoDBStore = require('connect-mongo');

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
 
});

const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
console.log('Database connected')
});

const paintingRouter = require('./routes/paintingRouter');
const checkoutRouter = require('./routes/checkoutRouter');

const app = express();

//APP MIDDLEWARE
//TO PARSE THE REQUEST BODY
app.use(express.urlencoded({extended:true}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const secret = process.env.SECRET
const store =  MongoDBStore.create({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60//IF NO DATA HAS CHANGED DONT UPDATE FOR 24HOURS
});

store.on('error', function(e){
    console.log('SESSION STORE ERROR',e)
});

//APP SESSIONS 
const sessionConfig = {
    store,
    name: 'session',//name used as cookie id so that it is not easy to identify if someone was to look for the session id-more secure
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        //httpOnly - used to protect cookie from client-side use
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }

}

app.use(session(sessionConfig));

app.use(helmet());

app.use('/api/paintings', paintingRouter);
app.use('/api/stripe/charge', checkoutRouter);

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
res.locals.success = req.flash('success');
res.locals.error = req.flash('error');
next();
});  

//DEFINING OUR MAIN ERROR MESSAGING FOR ALL PAGES
// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page Not Found!', 404));
// });

// app.use((err, req, res, next) => {
//     const {statusCode = 500} = err;
//    if(!err.message) err.message = 'Oh No, Something Went Wrong!'
//     res.status(statusCode).render('error', { err })
    
// });

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server starting on ${port}`)
});