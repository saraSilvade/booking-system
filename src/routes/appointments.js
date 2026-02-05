const express = require("express");
const Appointment = require("../models/Appointment");
const apiKeyAuth = require("../middleware/apiKeyAuth");

const router = express.Router();

// Fetching all the posted appointment 
router.get("/", async(req, res)=>{

    try{
        const appointments = await Appointment.find();

       return res.status(200).json(appointments);
    } catch(error){
        return res.status(500).json({ message: "Server error" }); 
    }
}); 


// Fetching single appointment by it given ID
router.get("/:id", apiKeyAuth, async(req,res)=>{

  try{
    const appointment = await Appointment.findById(req.params.id)
    if(!appointment){
      return res.status(404).json({Message: "Appointment not found"});
    }else{
return res.status(200).json(appointment);
    }

  }catch(error){
   return res.status(500).json({ message: "Server error" }); 

  }
})


// Creating a new appointment

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

// Editing an appointment that's already exist by it ID

router.put("/:id", apiKeyAuth, async (req, res) => {



  try{
  const updated = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  return res.status(200).json(updated);
  } catch(error){
 return res.status(500).json({ message: "Server error" }); 
  }


});



// Delete/Cancel an appointment by it ID, it also requires an API KEY for authentication 

router.delete("/:id", apiKeyAuth, async (req, res)=>{


  try{

  const deleted = await Appointment.findByIdAndDelete(req.params.id);

  if(!deleted){
    return res.status(404).json({
      message : "The user id is not found"
    })
   
  }
  return res.status(200).json({
      message: "The appointment has been canceled"
    })
  

  } catch(error){
   
      return res.status(500).json({ message: "Server error" }); 

  }


  
   
})
module.exports = router;