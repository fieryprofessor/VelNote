const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://ninjaplays792020:letsgowithatlas@omsinghatlas.wi2ab.mongodb.net/velnote";

const connectToMongo =  () => {
        mongoose.connect(mongoURI);  
        console.log("Connected to MongoDB Database successfully!");
};   

module.exports = connectToMongo;




