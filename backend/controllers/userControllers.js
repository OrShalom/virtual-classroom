
const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const QueueHandler = require('../QueueHandler');
const Report = require('../models/reportModel');
//const Patient = require('../models/PatientModel');
const Patient = require("../models/patientModel");

const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404);
        throw new Error("User already exists");
      }
    
      const user = await User.create({
        firstName,
          lastName,
        email,
        password,
      });
    
      if (user) {
        res.status(201).json({
          _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
          email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
    
};
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName:user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Invalid Email or Password");
    }
});
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName:updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const StartScreening = async (req, res) => {
  let queueHandler = new QueueHandler()
  // const { patient: { firstName, lastName, email } } = req.body;
  const { patientID,SessionLengthInMin, LettersDelayInSec, DisturbanceTimeRangeMin, DisturbanceTimeRangeMax,AmountOfShouldPress,patient  } = req.body;
 const StartSessionMessage ={
    SessionConfiguration: {
      SessionLengthInMin: SessionLengthInMin,
      LettersDelayInSec: LettersDelayInSec,
      DisturbanceTimeRangeMin: DisturbanceTimeRangeMin,
      DisturbanceTimeRangeMax: DisturbanceTimeRangeMax,
      AmountOfShouldPress:AmountOfShouldPress,
   },
  
  // const StartSessionMessage ={
  //   SessionConfiguration: {
  //     SessionLengthInMin : 5,
  //     LettersDelayInSec : 1,
  //     DisturbanceTimeRangeMin : 5,
  //     DisturbanceTimeRangeMax :5,
  //     AmountOfShouldPress :12
  //     },
    Patient: 
    { 
      firstName:patient.firstName, 
      lastName:patient.lastName, 
      email:patient.email}
  }

  queueHandler.sendMessage('StartScreening', JSON.stringify(StartSessionMessage));
  queueHandler.receiveMessages('FinishScreening', async (msg) => {
    const rep = JSON.parse(msg)
    const report = await Report.create({
      Time: rep.Time,
      PatientId: rep.PatientId,
      WithoutlettersDataList: JSON.stringify(rep.SessionWithoutDisturbances.lettersDataList.join()),
      WithoutPressedAndshould: JSON.stringify(rep.SessionWithoutDisturbances.PressedAndshould.join()),
      WithoutPressedAndshouldNot: JSON.stringify(rep.SessionWithoutDisturbances.PressedAndshouldNot.join()),
      WithoutNotPressedAndshould: JSON.stringify(rep.SessionWithoutDisturbances.NotPressedAndshould.join()),
      WithoutHeadRotation: JSON.stringify(rep.SessionWithoutDisturbances.HeadRotation),
      WithoutTimesOfShouldPress: JSON.stringify(rep.SessionWithoutDisturbances.TimesOfShouldPress.join()),
      WithlettersDataList: JSON.stringify(rep.SessionWithDisturbances.lettersDataList.join()),
      WithPressedAndshould: JSON.stringify(rep.SessionWithDisturbances.PressedAndshould.join()),
      WithPressedAndshouldNot: JSON.stringify(rep.SessionWithDisturbances.PressedAndshouldNot.join()),
      WithNotPressedAndshould: JSON.stringify(rep.SessionWithDisturbances.NotPressedAndshould.join()),
      WithHeadRotation: JSON.stringify(rep.SessionWithDisturbances.HeadRotation),
      WithTimesOfShouldPress: JSON.stringify(rep.SessionWithDisturbances.TimesOfShouldPress.join()),
      DisturbancesMetadata: JSON.stringify(rep.DisturbancesMetadata),
      PatientName: rep.PatientName,
      SessionLengthInMin: JSON.stringify(rep.SessionConfiguration.SessionLengthInMin),
      LettersDelayInSec: JSON.stringify(rep.SessionConfiguration.LettersDelayInSec), 
      disturbanceTimeRangeMin: JSON.stringify(rep.SessionConfiguration.disturbanceTimeRangeMin), 
      disturbanceTimeRangeMax: JSON.stringify(rep.SessionConfiguration.disturbanceTimeRangeMax),
      amountOfShouldPress: JSON.stringify(rep.SessionConfiguration.amountOfShouldPress),
      patient:patientID,
    }
    
    );
    console.log(rep.Time)
    res.status(200);
    res.send();
  
  })
  // const patientM = await Patient.findById(patientID);
  // const report = new Report({ patient: patientM._id, firstName:"hu" });
    
  // const createPatient = await report.save();
  // res.json({
  //   firstName: "hi",
  //   lastName:"updatedUser.lastName",
  // });
  
};

const StopScreening = async (req, res) => {
  let queueHandler = new QueueHandler()
  queueHandler.sendMessage('StopScreening', '');
  res.status(200);
  res.send();
};

module.exports = { registerUser, authUser,updateUserProfile,StartScreening,StopScreening};


