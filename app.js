const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const url = process.env.DB_CONNECTION;



const app = express();
//-------------------------------
//EJS
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');



//-------------------------------
app.use(cors());
app.use(bodyParser.json())
//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }))


//Import routes
const studiosRoute = require('./routes/studios');
const filmsRoute = require('./routes/films');
const authRoute = require('./routes/auth');
const favRoute = require('./routes/favoritos');




app.use('/auth', authRoute);
app.use('/studios', studiosRoute);
app.use('/films', filmsRoute);
app.use('/api/user', authRoute);
app.use('/api/favoritos', favRoute);






const API_PORT = process.env.API_PORT || 4000;
app.use(express.static("public"));


// Connection to DB!
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
})


//-----------------------



//Routes

//-----------------------
// Listening...
app.listen(API_PORT, () => console.log('Server up and running'));
