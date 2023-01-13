
const express = require('express');
const { getPatients,createPatient,getPatientById,updatePatient,deletePatient, getReports } = require('../controllers/patientsController');
const { protect } =require( "../middleware/authMiddleware.js");

const router = express.Router();

//get all patients
router.route('/').get(protect ,getPatients);

router.route('/report/:id').get(getReports);

//create new patient
router.route('/create').post(protect,createPatient);

// // get/update/delete one patient
router.route('/:id')
    .get(getPatientById)
   .put(protect,updatePatient)
   .delete(protect,deletePatient)


module.exports = router;