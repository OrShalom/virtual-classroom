const mongoose = require('mongoose');


const reportSchema = mongoose.Schema(
    {
        Time: {
            type: String,
            required: true,
        },
        PatientId: {
            type: String,
            required: false,
        },
        WithoutlettersDataList: {
            type: String,
            required: false,
        },
        WithoutPressedAndshould: {
            type: String,
            required: false,
        },
        WithoutPressedAndshouldNot: {
            type: String,
            required: false,
        },
        WithoutTimesOfShouldPress: {
            type: String,
            required: false,
        },
        WithoutHeadRotation: {
            type: String,
            required: false,
        },
        WithoutHeadRotation: {
            type: String,
            required: false,
        },
        WithlettersDataList: {
            type: String,
            required: false,
        },
        WithPressedAndshould: {
            type: String,
            required: false,
        },
        WithPressedAndshouldNot: {
            type: String,
            required: false,
        },
        WithTimesOfShouldPress: {
            type: String,
            required: false,
        },
        WithNotPressedAndshould: {
            type: String,
            required: false,
        },
        WithHeadRotation: {
            type: String,
            required: false,
        },
        DisturbancesMetadata: {
            type: String,
            required: false,
        },
        PatientName: {
            type: String,
            required: false,
        },
        SessionLengthInMin: {
            type: String,
            required: false,
        },
        LettersDelayInSec: {
            type: String,
            required: false,
        },
        disturbanceTimeRangeMin: {
            type: String,
            required: false,
        },
        disturbanceTimeRangeMax: {
            type: String,
            required: false,
        },
        amountOfShouldPress: {
            type: String,
            required: false,
        },
        
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Patient",
        },
    },
        {
          timestamps: true,
        }

);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;