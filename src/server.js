
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require ("mongoose");

const app = require("./app");



const PORT = process.env.PORT || 3000;


// connecting mongodb

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDb successfully");
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
}) ;
})
.catch((error)=>{
    console.log("Mongodb connection error: ", error);
});