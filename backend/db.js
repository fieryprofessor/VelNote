const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/velnote?directConnection=true&tls=false&readPreference=primary";

const connectToMongo =  () => {
        mongoose.connect(mongoURI);  
        console.log("Connected to MongoDB Database successfully!");
};   

module.exports = connectToMongo;




