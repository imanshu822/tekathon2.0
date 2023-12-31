const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  incidentType: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    // Required or not based on your needs
  },
  incidentId: {
    type: Number,
    required: true,
    unique: true,
  },
  incidentLocation: {
    type: String,
    required: true,
  },
  incidentLatitude: {
    type: String,
    required: true,
  },
  incidentLongitude: {
    type: String,
    required: true,
  },
  incidentDescription: {
    type: String,
    required: true,
  },
  incidentDate: {
    type: Date,
    default: Date.now,
  },
  incidentStatus: {
    type: String, // Corrected to "String"
    enum: ["Open", "Closed", "In Progress"],
    description: "Status of the incident",
  },
  incidentSeverity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  incidentReportAgencyID: {
    type: String,
    default: "None",
  },
  reporterName: {
    type: String, // Corrected to "String"
    description: "Name of the person reporting the incident",
  },
  reporterContact: {
    type: String, // Corrected to "String"
    description: "Contact information for the reporter",
  },
});

module.exports = mongoose.model("Incident", incidentSchema);
