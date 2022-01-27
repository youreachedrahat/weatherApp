const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

//Port Assign
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));

// Import weatherRoute.js
const weatherRoute = require('./weatherRoute');



// View Engine EJS
app.set('view engine', 'ejs');




// Middleware
app.use('/', weatherRoute);

