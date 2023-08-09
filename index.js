const express = require('express');
const bookRoute = require('./src/routes/bookRoute');
//initialize middleware
const app = express();


//middleware
app.use(express.json());



//routes

app.use('/api/materials/', bookRoute)


app.listen(3000, () => {
    console.log("Server is listening on port 3000!");
})
