
const express = require("express");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointments");

const app = express();

app.use(cors({
    origin: "https://book-api-system.netlify.app/", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "x-api-key"]
}));

app.use(express.json());

app.get('/', (req,res)=>{

    return res.status(200).json('Appointment Booking API');
});

app.use("/api/appointments", appointmentRoutes);
module.exports = app;