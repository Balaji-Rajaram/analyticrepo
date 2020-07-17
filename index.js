
const express = require("express");
const app = express(); 
const path = require("path"); 
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
// var io = require('socket.io').listen(port)
const router = require("./routes/router");
const mongoose = require("mongoose")

app.use(bodyParser());
app.use(express.static("public"));
const MONGO_URI = "mongodb://localhost:27017/Analytics";


// io.sockets.on('connection', function (socket) {
//     console.log("sdf")

//     socket.on('message', function (message) {
//         console.log("Got message: " + message);
//         io.sockets.emit('pageview', { 'url': message });
//     });

// });


app.use(bodyParser());

app.use("/", router);

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${MONGO_URI}`))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log("App is starting at port http://localhost:"+port);
}); 





// var io = require('socket.io').listen(3000);

// io.sockets.on('connection', function (socket) {

//     socket.on('message', function (message) {
//         console.log("Got message: " + message);
//         io.sockets.emit('pageview', { 'url': message });
//     });

// });



