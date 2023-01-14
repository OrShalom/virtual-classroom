
const express = require('express');
const { getReportById,getPatients,createPatient,getPatientById,updatePatient,deletePatient, getReports } = require('../controllers/patientsController');
const { protect } =require( "../middleware/authMiddleware.js");

const router = express.Router();

//get all patients
router.route('/').get(protect ,getPatients);

router.route('/reports/:id').get(getReports);

router.route('/report/:id').get(getReportById);

//create new patient
router.route('/create').post(protect,createPatient);

// // get/update/delete one patient
router.route('/:id')
    .get(getPatientById)
   .put(protect,updatePatient)
   .delete(protect,deletePatient)


module.exports = router;