const express = require("express");
const Appointment = require("../models/Appointment");
const apiKeyAuth = require("../middleware/apiKeyAuth");

const router = express.Router();


router.get("/", async(req, res)=>{

    try{
        const appointments = await Appointment.find();

        res.status(200).json(appointments);
    } catch(error){
        res.status(500).json({ message: "Server error "})
    }
}); 

router.post("/", async (req, res) =>{
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).json(appointment);
    } catch(error){
        res.status(400).json({
            message: "Invalid appointment data"
        });
    }
});


router.put("/:id", apiKeyAuth, async (req, res) => {
  const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  res.status(200).json(updated);

});

router.delete("/:id", apiKeyAuth, async (req, res)=>{

  const deleted = await Appointment.findByIdAndDelete(req.params.id);

  if(!deleted){
    res.status(404).json({
      message : "The user id is not found"
    })
   
  }else{
    res.status(200).json({
      message: "The appointment has been canceled"
    })

  }
   
})
module.exports = router;