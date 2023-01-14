const Patient = require("../models/patientModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Report = require("../models/reportModel");

const getPatients = asyncHandler(async (req, res) => {
  const user = await User.findOne({ user: req.user._id })
  if (user.isAdmin) {

    const patients = await Patient.find()
    res.json(patients);
  }
  else {
    const patients = await Patient.find({ user: req.user._id })
    res.json(patients);
  }
    
});

const getReports = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const reports = await Report.find({patient:id})
    res.json(reports);
    
});



const createPatient = asyncHandler(async (req, res) => {
    const {  firstName, lastName, id, dateOfBirth, gander, email, recommendation, report, medicines } = req.body;
    if (  !firstName || !lastName || !id  || !gander || !email)
    {
        res.status(400);
        throw new Error("Please Fill all the required fields");

    }
    const patientExists = await Patient.findOne({ id });

    if (patientExists) {
        res.status(404);
        throw new Error("Patient already exists");
      }
    else {
      
        const patient = new Patient({ user: req.user._id, firstName, lastName, id, dateOfBirth, gander, email, recommendation, report, medicines });
    
        const createPatient = await patient.save();
    
        res.status(201).json(createPatient);
      }
        
}); 

const getPatientById = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
  
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "patient not found" });
    }
  
    
});
const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (report) {
    res.json(report);
  } else {
    res.status(404).json({ message: "report not found" });
  }

  
});
  

const updatePatient = asyncHandler(async (req, res) => {
    const { firstName, lastName, id_p, dateOfBirth, gander, email, recommendation, report, medicines } = req.body;
    const patient = await Patient.findById(req.params.id);

    const user = await User.findById(req.user._id);
  

    if ((patient.user.toString() !== req.user._id.toString() ) && (user.isAdmin!==true ))
    {
        res.status(401);
        throw new Error("You can't perform this action");
    }
    
  if (patient) {
    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.id = id_p;
   patient.dateOfBirth = dateOfBirth;
      patient.gander = gander;
      patient.email= email;
      patient.recommendation = recommendation;
      patient.report = report;
      patient.medicines = medicines;

      const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } else {
    res.status(404);
    throw new Error("Patient not found");
  }

});  



const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id);
    const user = await User.findById(req.user._id);
  

    if ((patient.user.toString() !== req.user._id.toString() ) && (user.isAdmin!==true ))
    {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (patient) {
      await patient.remove();
      res.json({ message: "patient Removed" });
    } else {
      res.status(404);
      throw new Error("patient not Found");
    }

}); 
module.exports = { getReportById,getReports,getPatients ,createPatient,getPatientById,updatePatient,deletePatient};